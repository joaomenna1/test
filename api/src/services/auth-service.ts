import bcrypt from "bcryptjs";
import { findUserByEmail } from "@/repositories/users-repository";
import { signJwt } from "@/lib/jwt";

export async function loginService(email: string, password: string) {
  const user = await findUserByEmail(email);

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const passwordMatch = await bcrypt.compare(
    password,
    user.passwordHash
  );

  if (!passwordMatch) {
    throw new Error("Invalid credentials");
  }

  const token = signJwt({
    sub: user.id,
    email: user.email,
  });

  return {
    token,
  };
}
