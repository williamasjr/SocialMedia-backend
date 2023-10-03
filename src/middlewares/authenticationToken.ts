import { Request, Response, NextFunction } from "express";
import { PrismaClient, User } from "@prisma/client";
import jwt from "jsonwebtoken";

const db = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET || "batatinha";

type AuthRequest = Request & { user?: User }

export default async function authenticationToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const auth = req.headers['authorization'];
  const jwtToken = auth?.split(" ")[1];

  if (!jwtToken) {
    return res.sendStatus(401);
  }


  try {
    const payload = await jwt.verify(jwtToken, JWT_SECRET) as { tokenId: number };

    const dbToken = await db.token.findUnique({
      where: {
        id: payload.tokenId,
      },
      include: {
        user: true,
      },
    });

    if (!dbToken?.valid || dbToken.expiration < new Date()) {
      return res.status(401).json({ error: "API token expired" });
    }

  } catch (error) {
    return res.status(400).json(error);
  }

  return next();
}