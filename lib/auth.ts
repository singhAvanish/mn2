import NextAuth, { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/lib/mongodb";
import Admin from "@/lib/models/Admin";
import bcrypt from "bcrypt";

// Fix for strict mongoose typing
const AdminModel = Admin as unknown as {
  findOne: (query: any) => Promise<any>;
};

export const authOptions: NextAuthConfig = {
  session: { strategy: "jwt" },

  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: { label: "Email", type: "email", required: true },
        password: { label: "Password", type: "password", required: true },
      },

      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password) {
          return null;
        }

        await connectDB();

        // find admin safely
        const admin = await AdminModel.findOne({ email: credentials.email });
        if (!admin) return null;

        // ensure password is a string
        const hashedPassword = admin.password as string;

const isValid = await bcrypt.compare(
  credentials.password as string,
  hashedPassword as string
);

        if (!isValid) return null;

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
};

// Export for Next.js App Router
export const { auth, handlers, signIn, signOut } = NextAuth(authOptions);
