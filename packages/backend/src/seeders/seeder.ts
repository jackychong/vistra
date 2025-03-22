import { Umzug, SequelizeStorage } from "umzug";
import { Sequelize } from "sequelize-typescript";
import config from "../../config/database.cjs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { User } from "../models/User.js";
import { Folder } from "../models/Folder.js";
import { File } from "../models/File.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sequelize = new Sequelize(config);

// Initialize models
sequelize.addModels([User, Folder, File]);

export const seeder = new Umzug({
  migrations: {
    glob: ["*.ts", { cwd: __dirname, ignore: ["**/seeder.ts", "**/cli.ts"] }],
    resolve: (params) => {
      return {
        name: params.name,
        path: params.path,
        up: async () => {
          const seeder = await import(`file://${params.path}`);
          return seeder.up({ context: sequelize });
        },
        down: async () => {
          const seeder = await import(`file://${params.path}`);
          return seeder.down({ context: sequelize });
        },
      };
    },
  },
  context: sequelize,
  storage: new SequelizeStorage({
    sequelize,
    modelName: "SeederMeta", // Different table than migrations
  }),
  logger: console,
});

// Types for seeder files
export type Seeder = typeof seeder._types.migration;
