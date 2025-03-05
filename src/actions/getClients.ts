"use server";

import { getServerSession } from "next-auth";

import { db } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

interface GetClientsProps {
  search: string;
}

export const getClients = async ({ search }: GetClientsProps) => {
  const user = await getServerSession(authOptions);

  if (!user) throw new Error("Usuário não autenticado");

  return db.client.findMany({
    where: {
      userId: (user.user as any).id,
      OR: [
        { name: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
      ],
    },
    include: {
      address: true,
    },
  });
};
