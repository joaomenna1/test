import { FastifyInstance } from "fastify";
import { getAllChecklistsService } from "@/services/checklist-service";
import { authMiddleware } from "@/middlewares/auth";
import { checklistBodyResponseSchema, errorResponseSchema } from "@/validations";

export async function checklistRoutes(app: FastifyInstance) {
  app.get(
    "/checklists",
    {
      schema: {
        summary: "Get all checklists",
        tags: ["Checklists"],
        response:{ 
          201: checklistBodyResponseSchema,
          401: errorResponseSchema
        },
      },
      preHandler: authMiddleware,
    },
    async (request, reply) => {
      try {
        await getAllChecklistsService();
      } catch {
        return reply.status(401).send({
          error: "ERROR",
          message: "Something wrong in consult database in checklist!"
        })        
      }
    }
  );
}
