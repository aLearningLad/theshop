import { connectToDB } from "@/lib/mongodb";
import Employee from "@/models/employeemodel";
import { AuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider, {
  CredentialsConfig,
} from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text", placeholder: "email" },
        password: { label: "password", type: "password" },
      },

      async authorize(credentials: any) {
        const { email, password } = credentials;
        try {
          await connectToDB();
          const user = await Employee.findOne({ email });

          if (!user) {
            return null;
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (!passwordsMatch) {
            return null;
          }
          return user;
        } catch (error) {
          console.log(`Cannot find user.Error:${error}`);
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
