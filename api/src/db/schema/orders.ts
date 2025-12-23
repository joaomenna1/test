import {
  pgTable,
  text,
  boolean,
  timestamp
} from "drizzle-orm/pg-core";
import { uuidv7 } from "uuidv7";


export const users = pgTable("users", {
  id: text().primaryKey().$defaultFn(() => uuidv7()),
  email: text().notNull().unique(),
  passwordHash: text().notNull(),
  createdAt: timestamp().defaultNow(),
});

export const serviceOrders = pgTable("service_orders", {
  id: text().primaryKey().$defaultFn(() => uuidv7()),
  description: text().notNull(),
  photoUrl: text().notNull(),
  createdAt: timestamp().defaultNow(),

  userId: text()
    .notNull()
    .references(() => users.id),
});

export const checklists = pgTable("checklists", {
  id: text().primaryKey().$defaultFn(() => uuidv7()),
  description: text().notNull(),
});

export const serviceOrderChecklists = pgTable(
  "service_order_checklists",
  {
    id: text().primaryKey().$defaultFn(() => uuidv7()),

    serviceOrderId: text()
      .notNull()
      .references(() => serviceOrders.id),

    checklistId: text()
      .notNull()
      .references(() => checklists.id),

    checked: boolean().notNull(),
  }
);
