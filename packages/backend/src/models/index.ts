import { Sequelize } from "sequelize-typescript";
import { config } from "../config/database.js";
import { User } from "./User.js";
import { Folder } from "./Folder.js";
import { File } from "./File.js";

// Initialize Sequelize with models
const sequelize = new Sequelize(config);
sequelize.addModels([User, Folder, File]);

export { sequelize, User, Folder, File };
