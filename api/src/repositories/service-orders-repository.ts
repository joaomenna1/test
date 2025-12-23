import { DbClient } from "@/db/index";
import {
  serviceOrders,
  serviceOrderChecklists,
  checklists,
} from "@/db/schema/orders";
import { eq, and} from "drizzle-orm";

export async function createServiceOrderTx(
  client: DbClient,
  data: {
    description: string;
    photoUrl: string;
    userId: string;
  }
) {
  const [order] = await client
    .insert(serviceOrders)
    .values(data)
    .returning();

  return order;
}

export async function createServiceOrderChecklistsTx(
  client: DbClient,
  values: {
    serviceOrderId: string;
    checklistId: string;
    checked: boolean;
  }[]
) {
  await client.insert(serviceOrderChecklists).values(values);
}


export async function findServiceOrdersByUserId(
  client: DbClient,
  userId: string
) {
  return client
    .select({
      orderId: serviceOrders.id,
      description: serviceOrders.description,
      photoUrl: serviceOrders.photoUrl,
      createdAt: serviceOrders.createdAt,
      checklistId: checklists.id,
      checklistDescription: checklists.description,
      checked: serviceOrderChecklists.checked,
    })
    .from(serviceOrders)
    .innerJoin(
      serviceOrderChecklists,
      eq(serviceOrderChecklists.serviceOrderId, serviceOrders.id)
    )
    .innerJoin(
      checklists,
      eq(checklists.id, serviceOrderChecklists.checklistId)
    )
    .where(eq(serviceOrders.userId, userId))
        .orderBy(serviceOrders.createdAt);

}

export async function findServiceOrderById(
  client: DbClient,
  orderId: string,
  userId: string
) {
  return client
    .select({
      orderId: serviceOrders.id,
      description: serviceOrders.description,
      photoUrl: serviceOrders.photoUrl,
      createdAt: serviceOrders.createdAt,
      checklistId: checklists.id,
      checklistDescription: checklists.description,
      checked: serviceOrderChecklists.checked,
    })
    .from(serviceOrders)
    .innerJoin(
      serviceOrderChecklists,
      eq(serviceOrderChecklists.serviceOrderId, serviceOrders.id)
    )
    .innerJoin(
      checklists,
      eq(checklists.id, serviceOrderChecklists.checklistId)
    )
    .where(
      and(
        eq(serviceOrders.id, orderId),
        eq(serviceOrders.userId, userId)
      )
    );
}

export async function updateChecklistChecked(
  client: DbClient,
  data: {
    serviceOrderId: string;
    checklistId: string;
    userId: string;
    checked: boolean;
  }
) {
  await client
    .update(serviceOrderChecklists)
    .set({ checked: data.checked })
    .where(
      and(
        eq(serviceOrderChecklists.serviceOrderId, data.serviceOrderId),
        eq(serviceOrderChecklists.checklistId, data.checklistId)
      )
    );
}