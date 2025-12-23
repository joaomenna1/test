import { FastifyInstance } from "fastify";
import { z } from "zod";
import { createServiceOrder } from "@/services/create-os-service";
import { listServiceOrders } from "@/services/list-os-service";

import { authMiddleware } from "@/middlewares/auth";
import { getServiceOrderById } from "@/services/get-os-by-id";
import { updateServiceOrderChecklist } from "@/services/update-os-service";


const createServiceOrderBody = z.object({
  description: z.string().min(1),
  photoUrl: z.string().url(),
  checklists: z
    .array(
      z.object({
        checklistId: z.string().uuid(),
        checked: z.boolean(),
      })
    )
    .min(1),
});

type CreateServiceOrderBody = z.infer<
  typeof createServiceOrderBody
>;


const updateChecklistBody = z.object({
  checklistId: z.string().uuid(),
  checked: z.boolean(),
});

export async function CreateServiceOrderRoutes(app: FastifyInstance) {
  app.post(
    "/service-orders",
    {
      preHandler: authMiddleware,
      schema: {
        summary: "Create service order",
        tags: ["Service Orders"],
        body: createServiceOrderBody,
      },
    },
    async (request, reply) => {
    const body = request.body as CreateServiceOrderBody;
    const userId = request.user.sub;

    const order = await createServiceOrder({
        ...body,
        userId,
    });

  return reply.status(201).send(order);
    }
  );
}

export async function listServiceOrderRoutes(app: FastifyInstance) {
  app.get(
    "/service-orders",
    {
      preHandler: authMiddleware,
      schema: {
        summary: "List service orders of logged user",
        tags: ["Service Orders"],
      },
    },
    async (request) => {
      const userId = request.user.sub;
      return listServiceOrders(userId);
    }
  );
}

type ServiceOrderByIdParams = {
  id: string;
};

export async function serviceOrderByIdRoutes(app: FastifyInstance) {
  app.get<{
    Params: ServiceOrderByIdParams;
  }>(
    "/service-orders/:id",
    {
      preHandler: authMiddleware,
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
      },
    },
    async (request, reply) => {
      try {
        const order = await getServiceOrderById(
          request.params.id, // ✅ agora é string
          request.user.sub
        );

        return order;
      } catch {
        return reply.status(404).send({ message: "Service order not found" });
      }
    }
  );
}

type UpdateChecklistParams = {
  id: string;
};

type UpdateChecklistBody = z.infer<typeof updateChecklistBody>;


export async function updatedCheckListRoutes(app: FastifyInstance) {
  app.patch<{
    Params: UpdateChecklistParams;
    Body: UpdateChecklistBody;
  }>(
    "/service-orders/:id/checklist",
    {
      preHandler: authMiddleware,
      schema: {
        summary: "Update checklist item",
        tags: ["Service Orders"],
        body: updateChecklistBody,
      },
    },
    async (request, reply) => {
      await updateServiceOrderChecklist({
        serviceOrderId: request.params.id,     
        checklistId: request.body.checklistId,  
        checked: request.body.checked,          
        userId: request.user.sub,
      });

      return reply.status(204).send();
    }
  );
}
