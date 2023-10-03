import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import tokenGenerate from "../utils/tokenGenerate";

const authRouter = Router();
const db = new PrismaClient();

const EMAIL_TOKEN_EXPIRATION_MINUTES = 10;

authRouter.post("/login", async (req, res) => {
  const { email } = req.body;


  const emailToken = tokenGenerate();
  const expiration = new Date(new Date().getTime() + EMAIL_TOKEN_EXPIRATION_MINUTES * 60 * 1000);

  try {
    const createdToken = await db.token.create({
      data: {
        type: "EMAIL",
        emailToken,
        expiration,
        user: {
          connectOrCreate: {
            where: {
              email
            },
            create: {
              email
            },
          },
        },
      },
    });

    console.log(createdToken, `token`)
    res.sendStatus(200);
  } catch (error) {
    res.status(400).json({ error: "Authentication process failed" });
  }

});

authRouter.post("/authenticate", async (req, res) => {

});

export default authRouter;