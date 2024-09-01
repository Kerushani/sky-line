import { prisma } from "../../utils/db";
import { hashToken } from "../../utils/hashToken";

interface AddRefreshTokenParams {
  jti: string;
  refreshToken: string;
  userId: string;
}

export const addRefreshTokenToWhiteList = ({ jti, refreshToken, userId}: AddRefreshTokenParams) => {
  return prisma.refreshToken.create({
    data: {
      id: jti,
      hashedToken: hashToken(refreshToken),
      userId,
    },
  });
};

export const findRefreshTokenById = (id: string) => {
  return prisma.refreshToken.findUnique({
    where: {
      id,
    },
  });
};

export const deleteRefreshToken = (id: any) => {
  return prisma.refreshToken.delete({
    where: {
      id,
    },
    data: {
      revoked: true,
    },
  });
};

export const revokeTokens = (userId: string) => {
  return (
    prisma.refreshToken.updateMany({
      where: {
        userId,
      },
      data: {
        revoked: true,
      },
    })
  );
};
