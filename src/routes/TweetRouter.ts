import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const tweetRouter = Router();

const db = new PrismaClient();


tweetRouter.post("/", async (req, res) => {
  const { userId, content, image } = req.body;
  console.log(userId)

  try {

    const newTweet = await db.tweet.create({
      data: {
        userId,
        content,
        image,
      },
    });
    res.status(201).jsonp(newTweet);
  } catch (error) {
    res.status(400).json({ error: "UserId not found" })
  }
})

tweetRouter.get("/", async (req, res) => {
  const getAll = await db.tweet.findMany()
  res.status(200).jsonp(getAll);
});

tweetRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const tweetId = await db.tweet.findUnique({
    where: {
      id: +id
    }
  });
  if (!tweetId) {
    return res.status(401).json({ error: "Invalid ID" })
  }
  res.status(200).jsonp(tweetId);
});

tweetRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { content, image, } = req.body;

  try {
    const result = await db.tweet.update({
      where: { id: +id },
      data: {
        content,
        image
      },
    });

    return res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: "Invalid ID" });
  }
});

tweetRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await db.tweet.delete({
    where: {
      id: +id
    },
  });
  res.status(200).json({ message: "Tweet deleted" });
});

export default tweetRouter;