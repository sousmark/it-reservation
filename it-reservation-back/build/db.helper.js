"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const mqDetail_1 = require("./entity/mqDetail");
const process_1 = require("./entity/process");
const status_1 = require("./entity/status");
const users_1 = require("./entity/users");
const dbHelper = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "oyak",
    database: "reservation",
    entities: [mqDetail_1.MqDetail, process_1.Process, status_1.Status, users_1.Users],
    logging: true,
    logger: "file"
});
dbHelper.initialize()
    .then(() => {
    console.info("Connected to database.");
})
    .catch((err) => console.error(err));
// dbHelper.destroy()
//   .then(() => {
//     console.info("Disconnected from database.");
//   })
//   .catch((err) => console.error(err));
exports.default = dbHelper;
