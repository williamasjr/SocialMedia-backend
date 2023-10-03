import jwt from "jsonwebtoken";

const JWT_SECRET = "MY SECRET";

export default function jwtGenerate(tokenId: number): string {
  const jwtPayload = { tokenId }

  return jwt.sign(jwtPayload, JWT_SECRET, {
    algorithm: "HS256",
    noTimestamp: true,
  });
}