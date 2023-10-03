import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import tokenGenerate from "../utils/tokenGenerate";
import jwtGenerate from "../utils/jwtGenerate";

const authRouter = Router();
const db = new PrismaClient();

const EMAIL_TOKEN_EXPIRATION_MINUTES = 10;
const AUTHENTICATION_EXPIRATION_HOURS = 12;


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
  const { email, emailToken } = req.body;


  const dbEmailToken = await db.token.findUnique({
    where: {
      emailToken,
    },
    include: {
      user: true,
    },
  });

  console.log(dbEmailToken)
  if (!dbEmailToken || !dbEmailToken.valid) {
    return res.status(401).json({ error: "Invalid Token" })
  }

  if (dbEmailToken.expiration < new Date()) {
    return res.status(401).json({ error: "Token expired" })
  }

  if (dbEmailToken?.user?.email !== email) {
    return res.sendStatus(401);
  }

  const expiration = new Date(new Date().getTime() + AUTHENTICATION_EXPIRATION_HOURS * 60 * 60 * 1000);

  const apiToken = await db.token.create({
    data: {
      type: "API",
      expiration,
      user: {
        connect: {
          email,
        },
      },
    },
  });

  await db.token.update({
    where: {
      id: dbEmailToken.id
    },
    data: {
      valid: false
    },
  });

  const authToken = jwtGenerate(apiToken.id);

  res.json({ authToken });
});

export default authRouter;