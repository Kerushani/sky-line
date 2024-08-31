import bcrypt from "bcrypt";
import { prisma } from "../../utils/db";

export const findUserByEmail = (email) => {
    return prisma.user.findUnique({
        where: {
            email,
        }
    })
}

export const createUser = (user) => {
    user.password = bcrypt.hashSync(user.password, 12);
    return prisma.user.create({
        data: user,
    })
}

export const findUserById = (id) => {
    return prisma.user.findUnique({
        where: {
            id,
        }
    })
}