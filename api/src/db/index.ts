import { drizzle } from "drizzle-orm/node-postgres";
import { NodePgDatabase } from "drizzle-orm/node-postgres";

import { env } from "@/env";
import * as schema from "./schema";
export type DbClient = NodePgDatabase<typeof schema>;

export const db = drizzle(env.DATABASE_URL, {
    schema,
    casing: 'snake_case'
})