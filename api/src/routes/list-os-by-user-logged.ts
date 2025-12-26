import { authMiddleware } from "@/middlewares/auth";
import { listServiceOrders } from "@/services/list-os-service";
import { errorResponseSchema } from "@/validations";
import { FastifyInstance } from "fastify";

export async function listServiceOrderRoutes(app: FastifyInstance) {
  app.get(
    "/service-orders",
    {
      schema: {
        summary: "List service orders of logged user",
        tags: ["Service Orders"],
        response: {
            401: errorResponseSchema
        }
      },
      preHandler: authMiddleware,
    },
    async (request, reply) => {
      try {
        const userId = request.user.sub;
        
        return listServiceOrders(userId);
      } catch {
        return reply.status(401).send({
            error: "ERROR",
            message: "Somethin wrong list os"
        })
        
      }
    }
  );
}
