import { db } from "@/lib/db";

export const getTokenByToken = async (token: string) => {
  try {
    const verifyToken = await db.verificationToken.findUnique({
      where: { token },
    });
    return verifyToken;
  } catch (error) {
    return null;
  }
};

export const getTokenByEmail = async (email: string) => {
  try {
    const verifyToken = await db.verificationToken.findFirst({
      where: { email },
    });
    return verifyToken;
  } catch (error) {
    return null;
  }
};
