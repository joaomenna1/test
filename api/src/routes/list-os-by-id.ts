import { authMiddleware } from "@/middlewares/auth";
import { getServiceOrderById } from "@/services/get-os-by-id";
import { errorResponseSchema, ServiceOrderByIdParams } from "@/validations";
import { FastifyInstance } from "fastify";

export async function serviceOrderByIdRoutes(app: FastifyInstance) {
  app.get<{
    Params: ServiceOrderByIdParams;
  }>(
    "/service-orders/:id",
    {
        schema: {
            summary: "Get service order by id",
            tags: ["Service Orders"],
            params: {
                type: "object",
                properties: {
                    id: { type: "string" },
                },
                required: ["id"],
            },
            response: {
                404: errorResponseSchema
            }
        },
        preHandler: authMiddleware,
    },
    async (request, reply) => {
      try {
        const order = await getServiceOrderById(
          request.params.id,
          request.user.sub
        );

        return order;
      } catch {
        return reply.status(404).send({
            error: "ERROR", 
            message: "Service order not found" 
        });
      }
    }
  );
}
