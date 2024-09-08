import express from "express";
import { v4 as uuidv4 } from "uuid";
import { generateTokens } from "../../utils/jwt";
import { createUser, findUserByEmail, findUserById } from "../users/users.services";
import {
  addRefreshTokenToWhiteList,
  deleteRefreshToken,
  findRefreshTokenById,
  revokeTokens,
} from "./auth.services";
import bcrypt from "bcrypt";
import { hashToken } from "../../utils/hashToken";
import jwt, { JwtPayload } from "jsonwebtoken";

const router = express.Router();

router.post("/register", async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
      res.status(400);
      throw new Error("Please provide an email, name, and password");
    }
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      res.status(400);
      throw new Error("Email already in use");
    }
    const user = await createUser({
      email,
      password,
      id: uuidv4(),
      name,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const jti: any = uuidv4();
    const { accessToken, refreshToken } = generateTokens(user, jti);
    await addRefreshTokenToWhiteList({ jti, refreshToken, userId: user.id });

    res.json({
      accessToken,
      refreshToken,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400);
      throw new Error("You must provide an email and a password.");
    }

    const existingUser = await findUserByEmail(email);

    if (!existingUser) {
      res.status(403);
      throw new Error("Invalid login credentials.");
    }

    const validPassword = await bcrypt.compare(password, existingUser.password);
    if (!validPassword) {
      res.status(403);
      throw new Error("Invalid login credentials.");
    }

    const jti = uuidv4();
    const { accessToken, refreshToken } = generateTokens(existingUser, jti);
    await addRefreshTokenToWhiteList({
      jti,
      refreshToken,
      userId: existingUser.id,
    });

    res.json({
      accessToken,
      refreshToken,
    });
  } catch (err) {
    next(err);
  }
});

router.post("/refreshToken", async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      res.status(400);
      throw new Error("Refresh token is missing");
    }
    const payload = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET!
    ) as JwtPayload;
    const savedRefreshToken = await findRefreshTokenById(payload.jti);

    //if user does not have a refresh token
    if (!savedRefreshToken || savedRefreshToken.revoked === true) {
      res.status(401);
      throw new Error("Unauthorized");
    }

    //case where hashToken might have been tampered with
    const hashedToken = hashToken(refreshToken);
    if (hashedToken !== savedRefreshToken.hashedToken) {
      res.status(401);
      throw new Error("Unauthorized");
    }

    const user = await findUserById(payload.userId);
    if(!user){
      res.status(401);
      throw new Error("Unauthorized")
    }

    await deleteRefreshToken(savedRefreshToken.id);
    const jti = uuidv4();
    const {accessToken, refreshToken: newRefreshToken} = generateTokens(user, jti);
    await addRefreshTokenToWhiteList({jti, refreshToken: newRefreshToken, userId: user.id});

    res.json({
      accessToken,
      refreshToken: newRefreshToken
    })
  } catch (error) {
    next(error);
  }
});

//use for password reset - don't let refreshtoken be exposed in the api
router.post("/revokeRefreshToken", async (req, res, next) => {
  try {
    const {userId} = req.body;
    await revokeTokens(userId);
    res.json({message: `User with id ${userId} has their tokens revoked. Please try logging in again.`})
  } catch (err){
    next(err);
  }
})

export default router;
