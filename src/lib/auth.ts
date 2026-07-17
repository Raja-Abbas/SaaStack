import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { prisma } from "./db";

export async function getSession() {
  const session = await getServerSession();
  if (!session?.user) redirect("/login");
  return session;
}

export async function getUserOrg(userId: string) {
  const membership = await prisma.membership.findFirst({
    where: { userId },
    include: { organization: true },
  });
  return membership;
}
