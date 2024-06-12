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


export const getUserByUsername = async (username: string) => {
    console.log('getting user...')
    const user = await db.user.findFirst({
        where: {
            username,
        }
    })

    return user;
}
