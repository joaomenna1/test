import { FastifyInstance } from "fastify";
import { loginService } from "@/services/auth-service";
import { errorResponseSchema, loginBodySchema, loginSuccessResponseSchema } from "@/validations";

export async function authRoutes(app: FastifyInstance) {
  app.post(
    "/login",
    {
      schema: {
        tags: ["Route Auth"],
        summary: "Authentication user",

        body: loginBodySchema,

        response: {
          200: loginSuccessResponseSchema,
          401: errorResponseSchema,
        },
      },
    },
    async (request, reply) => {
    
      const { email, password }: any = request.body;

      try {
        const result = await loginService(email, password);
        return reply.status(200).send(result);
      } catch {
        return reply.status(401).send({
          error: "INVALID_CREDENTIALS",
          message: "Invalid email or password",
        });
      }
    }
  );
}
