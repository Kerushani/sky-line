import express from "express";
import auth from "./api/auth/auth.routes";
import user from "./api/users/users.routes";
import * as dotenv from 'dotenv';
// import cors from "cors";

dotenv.config();
const app = express();
// app.use(cors)
const PORT = process.env.PORT || 4000;
app.use(express.json());
app.use("/users", user);
app.use("/auth", auth);
app.listen(PORT, () => console.log(`Yayyy server running on port ${PORT} :0`));

// import express from "express";
// const PrismaClient = require("@prisma/client");

// const prisma = new PrismaClient.PrismaClient();
// const app = express();

// app.use(express.json());

// app.use((req, res, next) => {
//   res.setHeader(`Access-Control-Allow-Origin`, `*`);
//   res.setHeader(`Access-Control-Allow-Methods`, `GET, POST, PUT, DELETE`);
//   res.setHeader(`Access-Control-Allow-Headers`, `Content-Type`);
//   next();
// });

// app.get("/test", (req, res) => {
//   try {
//     res.status(200).json({ message: "API is working" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// //get all users
// app.get("/users", async (req, res) => {
//   try {
//     const users = await prisma.user.findMany();
//     res.status(200).json(users);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// //get single user with id
// app.get("/users/:id", async (req, res) => {
//   try {
//     const user = await prisma.user.findUnique({
//       where: {
//         id: Number(req.params.id),
//       },
//     });
//     res.status(200).json(user);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// //create user
// app.post("/users", async (req, res) => {
//   try {
//     const user = await prisma.user.create({
//       data: {
//         name: req.body.name,
//         email: req.body.email,
//       },
//     });
//     res.status(201).json(user);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// //update an existing user
// app.put("/users/:id", async (req, res) => {
//   try {
//     const user = await prisma.user.update({
//       where: {
//         id: Number(req.params.id),
//       },
//       data: {
//         name: req.body.name,
//         email: req.body.email,
//       },
//     });
//     res.status(200).json(user);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// //delete user
// app.delete("/user/:id", async (req, res) => {
//   try {
//     const user = await prisma.user.delete({
//       where: {
//         id: Number(req.params.id),
//       },
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// //start the server
// const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => console.log(`Yayyy server running on port ${PORT} :0`));
