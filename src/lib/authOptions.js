import dbConnect from "@/lib/dbConnect";
import User from "@/Models/User";
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
        await dbConnect();

        let existingUser = await User.findOne({ email: user.email });

        if (!existingUser) {
          existingUser = await User.create({
            name: user.name,
            email: user.email,
            username: user.email.split("@")[0],
            role: "user",
            providerAccountId: account.providerAccountId,
            provider: account.provider,
            image: user.image,
          });
        }
      }
      return true;
    },

    async jwt({ token }) {
      // ✅ Fetch role from DB
      if (token.email) {
        await dbConnect();
        const dbUser = await User.findOne({ email: token.email });

        if (dbUser) {
          token.role = dbUser.role;
        }
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.email = token.email;
        session.user.role = token.role;
      }
      return session;
    },
  },

  pages: {
    signIn: "/auth/login",
  },

  debug: true,
};
