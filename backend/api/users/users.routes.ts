import express from "express";
import bcrypt from "bcrypt";
import { prisma } from "../../utils/db";

const app = express.Router();

// app.use(express.json());

//get all users
app.get("/users", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//get single user with id
app.get("/users/:id", async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//create user
app.post("/users", async (req, res) => {
  try {
    const user = await prisma.user.create({
      data: {
        name: req.body.name,
        email: req.body.email,
      },
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//update an existing user
app.put("/users/:id", async (req, res) => {
  try {
    const user = await prisma.user.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        name: req.body.name,
        email: req.body.email,
      },
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//delete user
app.delete("/user/:id", async (req, res) => {
  try {
    const user = await prisma.user.delete({
      where: {
        id: Number(req.params.id),
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default app
