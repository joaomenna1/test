import { db } from "@/db";
import { findServiceOrderById } from "@/repositories/service-orders-repository";

export async function getServiceOrderById(
  orderId: string,
  userId: string
) {
  const rows = await findServiceOrderById(db, orderId, userId);

  if (rows.length === 0) {
    throw new Error("Service order not found");
  }

  const order = {
    id: rows[0].orderId,
    description: rows[0].description,
    photoUrl: rows[0].photoUrl,
    createdAt: rows[0].createdAt,
    checklists: rows.map(row => ({
      id: row.checklistId,
      description: row.checklistDescription,
      checked: row.checked,
    })),
  };

  return order;
}
