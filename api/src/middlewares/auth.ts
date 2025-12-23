import { FastifyRequest, FastifyReply } from "fastify";
import { verifyJwt } from "@/lib/jwt";

export async function authMiddleware(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return reply.status(401).send({ message: "Unauthorized" });
  }

  const [, token] = authHeader.split(" ");

  try {
    const payload = verifyJwt(token);

    request.user = payload; 
    return;
  } catch {
    return reply.status(401).send({ message: "Invalid token" });
  }
}
