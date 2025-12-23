import jwt, { JwtPayload } from "jsonwebtoken";
import { env } from "@/env";

export type AppJwtPayload = JwtPayload & {
  sub: string;
  email: string;
};

const JWT_SECRET = env.JWT_SECRET!;


export function signJwt(payload: AppJwtPayload) {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "1d",
  });
}


export function verifyJwt(token: string): AppJwtPayload {
  const decoded = jwt.verify(token, JWT_SECRET);

  if (typeof decoded === "string") {
    throw new Error("Invalid token payload");
  }

  return decoded as AppJwtPayload;
}
