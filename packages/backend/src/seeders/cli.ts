import { seeder } from "./seeder.js";

const command = process.argv[2];

async function main() {
  try {
    switch (command) {
      case "seed":
        await seeder.up();
        console.log("All seeders completed successfully");
        break;
      case "unseed":
        await seeder.down();
        console.log("Last seeder reverted successfully");
        break;
      case "unseed:all":
        await seeder.down({ to: 0 });
        console.log("All seeders reverted successfully");
        break;
      case "status":
        const pending = await seeder.pending();
        const executed = await seeder.executed();
        console.log("Pending seeders:", pending.length);
        console.log("Executed seeders:", executed.length);
        console.log("\nPending:");
        pending.forEach((m) => console.log(`- ${m.name}`));
        console.log("\nExecuted:");
        executed.forEach((m) => console.log(`- ${m.name}`));
        break;
      default:
        console.error(
          "Unknown command. Use: seed, unseed, unseed:all, or status",
        );
        process.exit(1);
    }
    process.exit(0);
  } catch (error) {
    console.error("Seeder failed:", error);
    process.exit(1);
  }
}

main();
