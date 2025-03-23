import { Umzug, SequelizeStorage } from "umzug";
import { Sequelize } from "sequelize-typescript";
import config from "../../config/database.cjs";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sequelize = new Sequelize(config);

export const migrator = new Umzug({
  migrations: {
    glob: ["*.ts", { cwd: __dirname, ignore: ["**/migrator.ts", "**/cli.ts"] }],
    resolve: (params: { name: string; path: string }) => ({
      name: params.name,
      path: params.path,
      up: async () => {
        const migration = await import(`file://${params.path}`);
        return migration.up({ context: sequelize.getQueryInterface() });
      },
      down: async () => {
        const migration = await import(`file://${params.path}`);
        return migration.down({ context: sequelize.getQueryInterface() });
      },
    }),
  },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
});

// Types for migration files
export type Migration = typeof migrator._types.migration;
