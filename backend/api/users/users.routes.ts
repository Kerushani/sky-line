import bcrypt from "bcrypt";
import express, { Request, Response } from "express";
import { prisma } from "../../utils/db";
import { User } from "@prisma/client";
import { findUserById } from "./users.services";
import { isAuthenticated } from "../../middlewares";

const app = express.Router();

interface UserWithoutPassword extends Omit<User, "password"> {}

// get all users
app.get("/users", async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// get single user with id
app.get("/users/:id", async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: String(req.params.id),
      },
    });
    res.status(200).json(user);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// create user
app.post("/users", async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.create({
      data: {
        id: req.body.id,
        name: req.body.name,
        email: req.body.email,
        refreshTokens: req.body.refreshTokens,
        password: req.body.password,
        createdAt: req.body.createdAt,
        updatedAt: req.body.updatedAt,
      },
    });
    res.status(201).json(user);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// update an existing user
app.put("/users/:id", async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.update({
      where: {
        id: String(req.params.id),
      },
      data: {
        name: req.body.name,
        email: req.body.email,
      },
    });
    res.status(200).json(user);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// delete user
app.delete("/user/:id", async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.delete({
      where: {
        id: String(req.params.id),
      },
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

//a protected route
app.get("/profile", isAuthenticated, async (req, res, next) => {
  try {
    const userId = req.headers["payload"];
    console.log(userId);

    let user: User;
    if (typeof userId === "string") {
      user = await findUserById(userId);
    }
    if (typeof userId === "object") {
      user = await findUserById(userId[0]);
    } else {
      throw new Error("User data is undefined");
    }
    //delete password to prevent it being sent in the response
    if (user) {
      const userWithoutPassword: UserWithoutPassword = {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };
      res.json(userWithoutPassword);
    } else {
      res.status(404).json({ message: "User not found" });
    }
    // delete user.password;
    res.json(user);
  } catch (err) {
    next(err);
  }
});

export default app;
