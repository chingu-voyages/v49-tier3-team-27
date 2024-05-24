import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import dbConnect from "./lib/mongo";
import User from "./lib/models/User";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

async function getUser(email: string) {
  try {
    await dbConnect();
    const user = await User.findOne({
      email,
    });

    return user;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  ...authConfig,
  providers: [
    Credentials({      
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;

          const user = await getUser(email);

          if (!user) {            
            return null;
          }

          const match = await bcrypt.compare(password, user.password);
          if (!match) {
            return null;
          }
          
          return user;
        }

        return null;
      },
    }),
  ],
});
