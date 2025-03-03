import { Prisma } from "@prisma/client";

export type ClientWithAddress = Prisma.ClientGetPayload<{
  include: { address: true };
}>;
