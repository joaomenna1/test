import "fastify";
import { AppJwtPayload } from "@/lib/jwt";

declare module "fastify" {
  interface FastifyRequest {
    user: AppJwtPayload;
  }
}
