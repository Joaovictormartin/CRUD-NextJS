"use server";

import { getServerSession } from "next-auth";

import { db } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

interface CreateClientParams {
  name: string;
  email: string;
  phone: string;
  birthDate: Date;
  address?: {
    zipCode: string;
    number: string;
    street: string;
    complement?: string | undefined;
    neighborhood: string;
    city: string;
    state: string;
  };
}

export const createClient = async (params: CreateClientParams) => {
  const user = await getServerSession(authOptions);

  if (!user) throw new Error("Usuário não autenticado");

  const clientCreated = await db.client.create({
    data: {
      name: params.name,
      email: params.email,
      phone: params.phone,
      userId: (user.user as any).id,
      birthDate: params.birthDate.toString(),
    },
  });

  await db.address.create({
    data: { ...params.address, clientId: clientCreated.id },
  });
};
