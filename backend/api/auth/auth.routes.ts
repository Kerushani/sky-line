import express from "express";
import { uuid4 } from "uuid";
import { generateTokens } from "../../utils/jwt";
import { createUser, findUserByEmail } from "../users/users.services";
import { addRefreshTokenToWhiteList } from "./auth.services";

const router = express.Router();

router.post("/register", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400);
      throw new Error("Please provide an email and password");
    }
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      res.status(400);
      throw new Error("Email already in use");
    }
    const user = await createUser({
      email,
      password,
      id: "",
      name: "",
      refreshTokens: [],
      createdAt: "",
      updatedAt: "",
    });
    const jti : any = uuid4();
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

export default router;
