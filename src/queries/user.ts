import { db } from "@/db"

export const getUserFromDb = async (email: string) => {
    console.log('getting user...')
    const user = await db.user.findFirst({
        where: {
            email,
        }
    })
    return user;
}