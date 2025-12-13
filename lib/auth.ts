import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { connectDB } from "@/lib/mongodb";
import Admin from "@/lib/models/Admin";
import bcrypt from "bcrypt";

export const { auth, signIn, signOut, handlers } = NextAuth({
  session: { strategy: "jwt" },

  providers: [
    Credentials({
      async authorize({ email, password }) {
        await connectDB();

        const admin = await Admin.findOne({ email });
        if (!admin) return null;

        // Compare entered password with hashed password
        const ok = await bcrypt.compare(password, admin.password);
        if (!ok) return null;

        return {
          id: admin._id.toString(),
          email: admin.email,
        };
      },
    }),
  ],

  pages: {
    signIn: "/admin/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
});
