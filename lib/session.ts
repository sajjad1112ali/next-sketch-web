import { getServerSession } from "next-auth/next";
import { NextAuthOptions, User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";
import jsonwebtoken from "jsonwebtoken";
import { JWT } from "next-auth/jwt";
import { SessionInterface } from "@/common.types";
import { createUser, getUserByEmail } from "./db/user";
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, JWT_SECRET } = process.env;

console.log(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET);
export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID!,
      clientSecret: GOOGLE_CLIENT_SECRET!,
    }),
  ],
  jwt: {
    encode: ({ secret, token }) => {
      const encodedToken = jsonwebtoken.sign(
        {
          ...token,
          //iss: "grafbase",
          exp: Math.floor(Date.now() / 1000) + 60 * 60,
        },
        secret
      );
      return encodedToken;
    },
    decode: async ({ secret, token }) => {
      const decodedToken = jsonwebtoken.verify(token!, secret);
      return decodedToken as JWT;
    },
  },
  callbacks: {
    async session({ session }) {
      const email: string = session?.user?.email as string
      try {
        const data = await getUserByEmail(email)
        const updatedSession = {
          ...session,
          user: {
            ...session.user,
            ...data,
          }
        }
        return updatedSession;

      } catch (error) {
        console.log(`Error retrieving user data `, error)
        return session;
      }
    },
    async signIn({ user }: { user: AdapterUser | User }) {
      const email: string = user?.email as string
      try {
        const userExist = await getUserByEmail(email)
        if (!userExist) {
          const user = await createUser(email);
        }
        return true;
      } catch (error: any) {
        return false;
      }
    },
  },
  secret: JWT_SECRET,
};

export async function getCurrentUser() {
  const session = (await getServerSession(authOptions)) as SessionInterface;
   return session;
}
