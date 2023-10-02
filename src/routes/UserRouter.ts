import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const useRouter = Router();
const db = new PrismaClient();

// crude for user

// create user
useRouter.post("/", async (req, res) => {
  const { email, name, username, image, bio, isVerified } = req.body;

  try {

    const newUser = await db.user.create({
      data: {
        email,
        name,
        username,
        bio,
        image,
        isVerified,
      },
    });
    res.status(201).jsonp(newUser);
  } catch (error) {
    res.status(400).json({ error: "Username and email should be unique" })
  }
})

// get users
useRouter.get("/", async (req, res) => {
  const getAll = await db.user.findMany();
  res.status(501).jsonp(getAll);
});

useRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const userId = await db.user.findUnique({
    where: {
      id: +id
    },
    include: {
      tweets: true,
    }
  });

  if (!userId) {
    return res.status(401).json({ error: "Invalid ID" });
  }

  res.status(501).jsonp(userId);
});

useRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { bio, name, username, image } = req.body;

  try {
    const result = await db.user.update({
      where: { id: +id },
      data: {
        bio,
        name,
        username,
        image
      },
    });

    return res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: `Failed to update ${id}` })
  }
});

useRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await db.user.delete({
    where: {
      id: +id
    },
  });
  res.status(200).json({ message: "User deleted" });
});

export default useRouter; 