import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          await dbConnect();
          const existingUser = await User.findOne({ email: user.email });
          if (!existingUser) {
            await User.create({
              name: user.name,
              email: user.email,
              role: "user",
              providerAccountId: account.providerAccountId,
              provider: account.provider,
              image: user.image,
            });
          }
        } catch (err) {
          console.error("Google SignIn error:", err);
          return false;
        }
      }
      return true;
    },
    async session({ session, token }) {
      if (token) {
        session.user.email = token.email;
        session.user.role = token.role || "user";
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
        token.role = user.role || "user";
      }
      return token;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
  debug: true,
};
