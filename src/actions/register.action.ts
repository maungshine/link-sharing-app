'use server'

import { db } from "@/db"
import { saltAndHashPassword } from "@/lib/utils"
import { generateVerificationCode, sendVerificationEmail } from "@/lib/verification"
import { registerSchema } from "@/lib/zod"
import { registerFormState } from "@/types/form-states"




export const register = async (formState  : registerFormState, formData: FormData) : Promise<registerFormState> => {
    const result = registerSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
        confirmPassword: formData.get('confirmPassword')
    })

    if(!result.success) {
        return {
            errors: result.error.flatten().fieldErrors
        }
    }

    const { email, password } = result.data;

    const existingEmail = await db.user.findFirst({
        where: {
            email: result.data.email,
        }
    })

    if (existingEmail) {
        return {
            errors: {
                _form: ['Email already exists!']
            },
        }
    }

    const hashedPassword = await saltAndHashPassword(password);

    if(!hashedPassword) {
        return {
            errors: {
                _form: ['Something went wrong']
            }
        }
    }

    try {

        await db.user.create({
            data: {
                email,
                password: hashedPassword,
            }
        })
    } catch (error) {
        console.log(error)
        return {
            errors: {
                _form: ['Something went wrong']
            }
        }
    }

    const token = await generateVerificationCode(email);

    await sendVerificationEmail(email, token);

    return {
        errors: {
            _form: ['Verification email sent!']
        }
    }
}