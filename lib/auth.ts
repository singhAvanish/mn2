import Credentials from "next-auth/providers/credentials";
import { connectDB } from "./mongodb";
import Admin from "./models/Admin";
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: { email: {}, password: {} },

      async authorize(credentials: any) {
        await connectDB();
        const admin = await Admin.findOne({ email: credentials.email });
        if (!admin) return null;

        const isValid = await bcrypt.compare(credentials.password, admin.password);
        if (!isValid) return null;

        return { id: admin._id, email: admin.email };
      },
    }),
  ],
  session: { strategy: "jwt" },
};
