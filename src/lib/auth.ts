import { AuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";

import { db } from "./prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";

interface User {
  id: string;
  name: string;
  email: string;
}

export const authOptions: AuthOptions = {
  secret: process.env.NEXT_AUTH_SECRET,
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_AUTH_CLIENT_ID as string,
      clientSecret: process.env.NEXT_AUTH_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      session.user = { ...session.user, id: user.id } as User;

      return session;
    },
  },
};
