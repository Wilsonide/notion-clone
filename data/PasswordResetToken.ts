import { db } from "@/lib/db";

export const getPasswordTokenByToken = async (token: string) => {
  try {
    const verifyToken = await db.passordResetToken.findUnique({
      where: { token },
    });
    return verifyToken;
  } catch (error) {
    return null;
  }
};

export const getPasswordTokenByEmail = async (email: string) => {
  try {
    const verifyToken = await db.passordResetToken.findFirst({
      where: { email },
    });
    return verifyToken;
  } catch (error) {
    return null;
  }
};
