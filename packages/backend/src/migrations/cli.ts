import { migrator } from "./migrator.js";

const command = process.argv[2];

async function main() {
  try {
    switch (command) {
    case "up":
      await migrator.up();
      console.log("All migrations completed successfully");
      break;
    case "down":
      await migrator.down();
      console.log("Last migration reverted successfully");
      break;
    case "down-all":
      await migrator.down({ to: 0 });
      console.log("All migrations reverted successfully");
      break;
    case "status":
      const pending = await migrator.pending();
      const executed = await migrator.executed();
      console.log("Pending migrations:", pending.length);
      console.log("Executed migrations:", executed.length);
      console.log("\nPending:");
      pending.forEach((m) => console.log(`- ${m.name}`));
      console.log("\nExecuted:");
      executed.forEach((m) => console.log(`- ${m.name}`));
      break;
    default:
      console.error("Unknown command. Use: up, down, down-all, or status");
      process.exit(1);
    }
    process.exit(0);
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  }
}

main();
