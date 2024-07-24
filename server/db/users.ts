import { pgTable, serial, text } from 'drizzle-orm/pg-core';
import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { eq } from 'drizzle-orm';

export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    username: text("username").notNull(),
    email: text("email").notNull(),
    password: text("password").notNull(),
    salt: text("salt"),
    sessiontoken: text("sessiontoken"),
});

export type User= InferSelectModel<typeof users>;
export type NewUser = InferInsertModel<typeof users>;

const pool = new Pool({
    connectionString: process.env.DB,
});

const db = drizzle(pool);

export const getUsers = async () => await db.select({ id: users.id, username: users.username, email: users.email}).from(users);
export const getUserByEmail = async (email:string) =>
    await db.select().from(users).where(eq(users.email,email));
export const getUserBySessionToken = async (sessionToken: string) =>
    await db.select().from(users).where(eq(users.sessiontoken, sessionToken));
export const createUser = async (newUser: NewUser) => 
    await db
        .insert(users)
        .values(newUser)
        .returning({id: users.id, username: users.username, email: users.email})