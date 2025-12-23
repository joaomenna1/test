import { db } from "@/db";
import {
  createServiceOrderTx,
  createServiceOrderChecklistsTx,
} from "@/repositories/service-orders-repository";
import { validateChecklistIds } from "@/services/checklist-service";

type CreateServiceOrderInput = {
  description: string;
  photoUrl: string;
  userId: string;
  checklists: {
    checklistId: string;
    checked: boolean;
  }[];
};

export async function createServiceOrder(
  input: CreateServiceOrderInput
) {
  await validateChecklistIds(
    input.checklists.map(c => c.checklistId)
  );

  return db.transaction(async (tx) => {
    const order = await createServiceOrderTx(tx, {
      description: input.description,
      photoUrl: input.photoUrl,
      userId: input.userId,
    });

    await createServiceOrderChecklistsTx(
      tx,
      input.checklists.map(item => ({
        serviceOrderId: order.id,
        checklistId: item.checklistId,
        checked: item.checked,
      }))
    );

    return order;
  });
}