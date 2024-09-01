import bcrypt from "bcrypt";
import { prisma } from "../../utils/db";
import { RefreshToken, User } from "@prisma/client";

export const findUserByEmail = (email: string) => {
    return prisma.user.findUnique({
        where: {
            email,
        }
    });
};

export const createUser = (user: User) => {
    user.password = bcrypt.hashSync(user.password, 12);
    return prisma.user.create({
        data: user,
    });
};

export const findUserById = (id: string) => {
    return prisma.user.findUnique({
        where: {
            id,
        }
    });
};
