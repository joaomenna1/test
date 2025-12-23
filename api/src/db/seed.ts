import { db } from "./index";
import { users, checklists } from "./schema/orders";
import bcrypt from "bcryptjs";

type SeedUser = {
  email: string;
  password: string;
};

const seedUsers: SeedUser[] = [
  { email: "admin@test.com", password: "123456" },
  { email: "user1@test.com", password: "123456" },
  { email: "user2@test.com", password: "123456" },
  { email: "tech@test.com", password: "123456" },
];

const checklistItems = [
  { description: "Equipment inspected" },
  { description: "Cleaning performed" },
  { description: "Adjustments made" },
  { description: "Functional test performed" },
  { description: "Client instructed" },
  { description: "Workspace organized" },
];

async function seed() {
  console.log("🌱 Seeding users...");
  for (const user of seedUsers) {
    const passwordHash = await bcrypt.hash(user.password, 10);

    await db
      .insert(users)
      .values({
        email: user.email,
        passwordHash,
      })
      .onConflictDoNothing();

    console.log(`✅ User created: ${user.email}`);
  }

  console.log("🌱 Seeding checklists...");
  for (const item of checklistItems) {
    await db
      .insert(checklists)
      .values(item)
      .onConflictDoNothing();

    console.log(`✅ Checklist item: ${item.description}`);
  }

  console.log("🚀 Seed finished successfully");
}

seed()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Seed error:", error);
    process.exit(1);
  });
