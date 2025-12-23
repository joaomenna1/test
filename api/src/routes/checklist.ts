import { FastifyInstance } from "fastify";
import { z } from "zod";
import { getAllChecklistsService } from "@/services/checklist-service";
import { authMiddleware } from "@/middlewares/auth";

export async function checklistRoutes(app: FastifyInstance) {
  app.get(
    "/checklists",
    {
      schema: {
        summary: "Get all checklists",
        tags: ["Checklists"],
        response: {
          200: z.array(
            z.object({
              id: z.string(),
              description: z.string(),
            })
          ),
        },
      },
      preHandler: authMiddleware,
    },
    async () => {
      return getAllChecklistsService();
    }
  );
}
