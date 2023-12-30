import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { DefaultSession, NextAuthOptions, getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { compare } from "bcrypt";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password required");
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user.hashedPassword) {
          throw new Error("Email does not exist");
        }

        const isCorrectPassword = await compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isCorrectPassword) {
          throw new Error("Incorrect password");
        }

        return user;
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      // tokenは現在のJWTトークンオブジェクトです。最初のサインイン時はJWTの一部だけです。
      // user はサインイン時に取得されるユーザー情報です。最初のサインイン時以外は空オブジェクトです
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session: ({ session, token }) => {
      // sessionは現在のSessionオブジェクトです。ユーザーのセッション情報として使われます
      // tokenはjwtコールバックで生成されたtokenです。
      if (token) {
        session.user.id = token.id;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth",
  },
  // debug: process.env.NODE_ENV === "development",
  debug: false,
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  jwt: {
    // jwtの署名と検証に使われる
    secret: process.env.NEXTAUTH_SECRET,
  },
  // セッショントークンの署名に使われる。セッション管理用
  secret: process.env.NEXTAUTH_SECRET,
};

export const getAuthSession = async () => {
  return getServerSession(authOptions);
};
