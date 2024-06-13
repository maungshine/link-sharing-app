import { v4 as uuidv4 } from "uuid";
import { db } from "@/db";


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



export const getVerificationTokenByToken = async (token: string) => {
    const verificationToken = db.verificationToken.findFirst({
        where: {
            token,
        }
    })

    return verificationToken;
}



