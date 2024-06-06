"use server";

import { signIn } from "@/auth";
import { signInSchema } from "@/lib/zod";
import { getUserFromDb } from "@/queries/user";
import { compare } from "bcryptjs";

export const handleLogin = async (formData: FormData) => {
  const result = signInSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (result.success === false) {
    console.log(result.error.issues);
    return null;
  }

  const user = await getUserFromDb(result.data.email as string)

  if (!user) {
    return null
  }

  const success = await compare(result.data.password as string, user.password)

  if (!success) {
    return null
  }

  await signIn("credentials", {email: result.data.email, redirectTo: '/links'});
};
