import { getAllChecklists } from "@/repositories/checklists-repository";
import { findChecklistsByIds } from "@/repositories/checklists-repository";

export async function getAllChecklistsService() {
  getAllChecklists();
}

export async function validateChecklistIds(checklistIds: string[]) {
  const existing = await findChecklistsByIds(checklistIds);

  if (existing.length !== checklistIds.length) {
    throw new Error("One or more checklist items are invalid");
  }
}