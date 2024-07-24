import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";

const client = new Client({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: ";)",
    database: "idontknow"
});

client.connect().then(() => {
    console.log("DB connected :o")
})
.catch

const db = drizzle(client);

export default db;