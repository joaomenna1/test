import { FastifyInstance } from "fastify";
import { authMiddleware } from "@/middlewares/auth";
import { updateServiceOrderChecklist } from "@/services/update-os-service";
import { errorResponseSchema, UpdateChecklistBody, updateChecklistBody, UpdateChecklistParams } from "@/validations";


export async function updatedCheckListRoutes(app: FastifyInstance) {
  app.patch<{
    Params: UpdateChecklistParams;
    Body: UpdateChecklistBody;
  }>(
    "/service-orders/:id/checklist",
    {
      schema: {
        summary: "Update checklist item",
        tags: ["Service Orders"],
        body: updateChecklistBody,
        response: {
          204: { message: "Update checklist"},
          401: errorResponseSchema
        }
      },
      preHandler: authMiddleware,
    },
    async (request, reply) => {
     try {
       await updateServiceOrderChecklist({
        serviceOrderId: request.params.id,     
        checklistId: request.body.checklistId,  
        checked: request.body.checked,          
        userId: request.user.sub,
      });

      return reply.status(204).send({ message: "Update checklist"});
     } catch {
        reply.status(401).send({
          error: "ERROR",
          message: "Error update checklist"
        })
     }
    }
  );
}
