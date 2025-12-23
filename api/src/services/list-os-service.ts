import { db } from "@/db";
import { findServiceOrdersByUserId } from "@/repositories/service-orders-repository";

export async function listServiceOrders(userId: string) {
  const rows = await findServiceOrdersByUserId(db, userId);

  const ordersMap = new Map<string, any>();

  for (const row of rows) {
    if (!ordersMap.has(row.orderId)) {
      ordersMap.set(row.orderId, {
        id: row.orderId,
        description: row.description,
        photoUrl: row.photoUrl,
        createdAt: row.createdAt,
        checklists: [],
      });
    }

    ordersMap.get(row.orderId).checklists.push({
      id: row.checklistId,
      description: row.checklistDescription,
      checked: row.checked,
    });
  }

  return Array.from(ordersMap.values());
}
