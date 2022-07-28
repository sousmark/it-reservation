import "reflect-metadata";
import { DataSource } from "typeorm";
import { Event } from "./entity/event";
import { Service } from "./entity/service";

const dbHelper = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "oyak",
  database: "postgres",
  entities: [Event, Service],
  logging: true,
  logger: "file"
})

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

export default dbHelper;