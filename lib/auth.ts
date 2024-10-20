import { auth } from "@/auth";
import { db } from "./db";

export const currentUser = async () => {
  const session = await auth();
  if (!session?.user?.email) return null;

  const user = db.user.findUnique({ where: { email: session.user.email } });

  if (!user) return null;
  return user;
};

export type userType = Awaited<ReturnType<typeof currentUser>>;

export const currentRole = async () => {
  const session = await auth();
  return session?.user?.role;
};

export const UserId = async () => {
  const session = await auth();
  return session?.user?.id;
};
