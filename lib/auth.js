import CredentialsProvider from "next-auth/providers/credentials";
import { pool } from "./db";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Usuario", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const result = await pool.query(
          "SELECT * FROM users WHERE username = $1 LIMIT 1",
          [credentials?.username]
        );

        const user = result.rows[0];

        if (!user) return null;
        if (credentials?.password !== user.password) return null;

        return {
          id: String(user.id),
          name: user.username,
          role: user.role
        };
      }
    })
  ],
  pages: {
    signIn: "/login"
  },
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }) {
      if (session.user) session.user.role = token.role;
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET
};
