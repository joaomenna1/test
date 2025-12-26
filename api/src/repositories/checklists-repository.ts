import { db } from "@/db";
import { checklists } from "@/db/schema/orders";
import { inArray } from "drizzle-orm";


export async function findChecklistsByIds(ids: string[]) {
  if (ids.length === 0) return [];

  return db
    .select({ id: checklists.id })
    .from(checklists)
    .where(inArray(checklists.id, ids));
}

export async function getAllChecklists() {
  
   const data = await db
    .select({
      id: checklists.id,
      description: checklists.description,
    })
    .from(checklists);

    return data;
}
