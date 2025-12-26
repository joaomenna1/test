import { authMiddleware } from "@/middlewares/auth";
import { createServiceOrder } from "@/services/create-os-service";
import { CreateServiceOrderBody, createServiceOrderResponseSchema, errorResponseSchema } from "@/validations";
import { FastifyInstance } from "fastify";

export async function CreateServiceOrderRoutes(app: FastifyInstance) {
  app.post(
    "/service-orders",
  {
    schema: {
      summary: "Create Service Order",
      tags: ["service-order"],
      response: {
        201: createServiceOrderResponseSchema,
        401: errorResponseSchema
      }
    },
    preHandler: authMiddleware,
  },
    async (request, reply) => {
      try {
        const body = request.body as CreateServiceOrderBody;
        const userId = request.user.sub;

        const order = await createServiceOrder({
            ...body,
            userId,
        });

        return reply.status(201).send(order);
      } catch  {
        return reply.status(401).send({
          error: "ERROR",
          message: "Something wrong create service order in database"
        })
      }
    }
  );
}