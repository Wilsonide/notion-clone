"use server";
import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";
import { sendResetPasswordEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/tokens";
import { resetSchema } from "@/schemas";
import * as z from "zod";

export const reset = async (values: z.infer<typeof resetSchema>) => {
  const validatedFields = resetSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid email" };
  }
  const { email } = validatedFields.data;
  const existingUser = await getUserByEmail(email);
  if (!existingUser) {
    return { error: "Email not found" };
  }
  const passordResetToken = await generatePasswordResetToken(email);
  await sendResetPasswordEmail(
    passordResetToken.email,
    passordResetToken.token,
  );

  return { success: "Reset email sent" };
};
