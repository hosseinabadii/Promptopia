import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import User from "@/models/user";
import { connectToDB } from "@/lib/database";

connectToDB().catch((err) => console.error("Failed to connect to DB", err));

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [Google],
  callbacks: {
    async session({ session }) {
      try {
        const sessionUser = await User.findOne({
          email: session.user?.email ?? "",
        }).exec();

        if (!sessionUser) {
          console.log("User not found in database");
          return session;
        }

        if (session.user) {
          session.user.id = sessionUser._id.toString();
        }

        return session;
      } catch (error) {
        console.error("Error in session callback: ", error.message);
        return session;
      }
    },
    async signIn({ profile }) {
      try {
        const userExists = await User.findOne({ email: profile.email }).exec();

        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            displayName: profile.name,
            image: profile.picture,
          });
        }

        return true;
      } catch (error) {
        console.log("Error checking if user exists: ", error.message);
        return false;
      }
    },
  },
});
