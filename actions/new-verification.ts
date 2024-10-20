"use server";

import { getUserByEmail } from "@/data/user";
import { getTokenByToken } from "@/data/verifytoken";
import { db } from "@/lib/db";

export const newVerification = async (token: string) => {
  const existingToken = await getTokenByToken(token);
  if (!existingToken) {
    return { error: "token not found" };
  }
  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: "token expired" };
  }
  const existingUser = await getUserByEmail(existingToken.email);
  if (!existingUser) return { error: "token not found" };

  await db.user.update({
    where: { id: existingUser.id },
    data: {
      emailVerified: new Date(),
      email: existingToken.email,
    },
  });
  await db.verificationToken.delete({ where: { id: existingToken.id } });
  return { success: "email verified" };
};
