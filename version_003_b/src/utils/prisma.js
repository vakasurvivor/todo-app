// ./src/utlis/prisma.js
import path from "path";
import { PrismaBetterSQLite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../generated/prisma/index.js";

const dbFile = path.resolve("./prisma/tasks.db");
const adapter = new PrismaBetterSQLite3({ url: `file:${dbFile}` });
const prisma = new PrismaClient({ adapter });

export default prisma;
