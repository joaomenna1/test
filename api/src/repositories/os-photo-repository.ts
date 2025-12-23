import { DbClient } from "@/db/index";
import { serviceOrders } from "@/db/schema/orders";
import { eq, and } from "drizzle-orm";

export async function updateServiceOrderPhotoTx(
  client: DbClient,
  data: {
    serviceOrderId: string;
    userId: string;
    photoUrl: string;
  }
) {
  return client
    .update(serviceOrders)
    .set({ photoUrl: data.photoUrl })
    .where(
      and(
        eq(serviceOrders.id, data.serviceOrderId),
        eq(serviceOrders.userId, data.userId)
      )
    )
    .returning();
}
