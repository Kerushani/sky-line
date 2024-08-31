import { prisma } from "../../utils/db";
import { hashToken } from "../../utils/hashToken";

export const addRefreshTokenToWhiteList = ({ jti, refreshToken, userId }) => {
  return prisma.refreshToken.create({
    data: {
      id: jti,
      hashedToken: hashToken(refreshToken),
      userId,
    },
  });
};

export const findRefreshTokenById = (id) => {
  return prisma.refreshToken.findUnique({
    where: {
      id,
    },
  });
};

export const deleteRefreshToken = (id) => {
  return prisma.refreshToken.delete({
    where: {
      id,
    },
    data: {
      revoked: true,
    },
  });
};

export const revokeTokens = (userId) => {
  return (
    prisma.refreshToken.updateMany({
      where: {
        userId,
      },
      data: {
        revoke: true,
      },
    })
  );
};
