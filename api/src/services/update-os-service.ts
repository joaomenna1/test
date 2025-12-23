import { db } from "@/db";
import { updateChecklistChecked } from "@/repositories/service-orders-repository";

type UpdateChecklistInput = {
  serviceOrderId: string;
  checklistId: string;
  userId: string;
  checked: boolean;
};


export async function updateServiceOrderChecklist(
  input: UpdateChecklistInput
) {
  await updateChecklistChecked(db, input);
}