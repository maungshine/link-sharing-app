import { v4 as uuidv4 } from "uuid";
import { Resend } from "resend";
import { db } from "@/db";

const resend = new Resend(process.env.RESEND_API_KEY);

export const generateVerificationCode = async (
  identifier: string
): Promise<string> => {
  // Delete any existing verification token for the given identifier
  await db.verificationToken.deleteMany({
    where: {
      identifier,
    },
  });
  //generate verification code
  const token = uuidv4();

  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + 1); // Set expiration to 1 hour from now

  // Insert the new verification token into the database
  await db.verificationToken.create({
    data: {
      identifier,
      token,
      expires: expiresAt,
    },
  });


  //return the verification code
  return token;
};



export const sendVerificationEmail = async (email: string, token: string) => {
    const confirmLink = `http://localhost:3000/email-verification?token=${token}`;

    await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: 'Sending Email Verification link',
        html: `<p>Here is the code to verify your email</p><h2>${confirmLink}</h2>`
    })
}


export const getVerificationTokenByToken = async (token: string) => {
    const verificationToken = db.verificationToken.findFirst({
        where: {
            token,
        }
    })

    return verificationToken;
}



