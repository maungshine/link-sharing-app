'use server'

import { signOut } from "@/auth"
import { revalidatePath } from "next/cache";

export const handleSignOut = async () => {
    await signOut({redirectTo: '/login'});

}