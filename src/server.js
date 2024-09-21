import express from "express";
import "dotenv/config";
import { PrismaClient } from "@prisma/client";
const app = express();
const port = process.env.PORT || 5000;
const prisma = new PrismaClient();

app.use(express.json());
app.get("/", (req, res) => {
  return res.json({ message: "welcome our server" });
});

app.get("/user", async (req, res) => {
  const user = await prisma.user.findMany();
  return res.json({ message: "all user", user });
});

app.post("/user", async (req, res) => {
  try {
    const body = await req.body;
    const result = await prisma.user.create({
      data: body,
      select: {
        id: true,
        name: true,
      },
    });
    return res.json({ message: "success", data: result });
  } catch (error) {
    console.error(error);
    return res.json({ message: error.message });
  }
});

app.listen(port, () => {
  console.log(`server is listening on ${port}`);
});
