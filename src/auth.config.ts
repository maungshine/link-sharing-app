import type { NextAuthConfig } from "next-auth"
import credentials from "next-auth/providers/credentials";
import { saltAndHashPassword } from "./lib/utils";
import { getUserFromDb } from "./queries/user";

// Notice this is only an object, not a full Auth.js instance
export default {
    providers: [
        credentials({

          authorize: async (credentials) => {

            // logic to verify if user exists
            let user = await getUserFromDb(credentials.email as string)

            if (!user) {
              console.log("User not found");
              // No user found, so this is their first attempt to login
              // meaning this is also the place you could do registration
              return null
            }

            // return user object with the their profile data
            return user
          },
        }),
      ],
} satisfies NextAuthConfig