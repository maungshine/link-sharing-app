"use server";

import { signIn } from "@/auth";
import { wait } from "@/lib/utils";
import { signInSchema } from "@/lib/zod";
import { getUserFromDb } from "@/queries/user";
import { loginFormState } from "@/types/form-states";
import { compare } from "bcryptjs";

export const handleLogin = async (
  formState: loginFormState,
  formData: FormData
): Promise<loginFormState> => {
  const result = signInSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!result.success) {
    console.log(result.error.issues);
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const user = await getUserFromDb(result.data.email as string);

  if (!user) {
    return {
      errors: { _form: ["Login failed!"] },
    };
  }

  const success = await compare(result.data.password as string, user.password);

  if (!success) {
    return {
      errors: {
        _form: ["Login failed!"],
      },
    };
  }

  await signIn("credentials", {
    email: result.data.email,
    redirectTo: "/links",
  });

  return { errors: {} };
};
