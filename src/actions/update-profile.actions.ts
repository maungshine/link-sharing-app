"use server";
import { z } from "zod";

import fs from "fs";
import path from "path";
import { revalidatePath } from "next/cache";
import crypto from "crypto";
import { db } from "@/db";
import { User } from "@prisma/client";
import { auth } from "@/auth";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const UserProfileSchema = z.object({
  firstName: z.string().trim().min(1, { message: "Required" }),
  lastName: z.string().trim().min(1, { message: "Required" }),
  username: z
    .string()
    .trim()
    .min(1, { message: "Required" })
    .refine((n) => /^[a-zA-Z0-9_.-]+$/.test(n), {
      message: "Only number and characters are allowed.",
    }),
  email: z.string().email("Invalid email"),
  image: z
    .any()
    .refine((file) => {
      if (!file) return true;

      return file?.size <= MAX_FILE_SIZE;
    }, `Max image size is 5MB.`)
    .refine((file) => {
      if (!file) return true;
      return (
        ACCEPTED_IMAGE_TYPES.includes(file?.type),
        `Accepted image types are ${ACCEPTED_IMAGE_TYPES.join(", ")}.`
      );
    }),
});

export type ProfileFormState = {
  errors: {
    firstName?: string[];
    lastName?: string[];
    username?: string[];
    email?: string[];
    image?: string[];
  };
  success?: string;
};

export const getUserProfile = async (email: string): Promise<User | null> => {
  const user = await db.user.findFirst({ where: { email } });
  return user;
};

export const updateProfile = async (
  formData: FormData
): Promise<ProfileFormState> => {
  const session = await auth();
  const userProfile = await getUserProfile(session?.user?.email as string);

  if (!userProfile) {
    return { errors: { email: ["Email doesn't exist"] } };
  }


  const result = UserProfileSchema.safeParse({
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
    username: formData.get("username") as string,
    email: formData.get("email") as string,
    image: formData.get("image") as File | null,
  });

  // Validate form data
  if (!result.success) {
    console.log(result.error.issues);
    return { errors: result.error.flatten().fieldErrors };
  }

  if (userProfile.email !== result.data.email) {
    const existingEmail = await db.user.findFirst({
      where: {
        email: result.data.email as string,
      },
    });

    if (existingEmail) {
      return { errors: { email: ["Email already exists!"] } };
    }
  }

  if (userProfile.username !== result.data.username) {
    const user = await db.user.findFirst({
      where: {
        username: result.data.username as string,
      },
    });

    if (user) {
      return { errors: { username: ["Username already exists!"] } };
    }
  }

  let profilePictureUrl = userProfile.image;

  // Only upload image if there is no existing profile picture
  if (!profilePictureUrl && result.data.image) {
    const uniqueName = `${crypto.randomUUID()}-${result.data.image.name}`;
    const buffer = Buffer.from(await result.data.image.arrayBuffer());
    const filePath = path.join(process.cwd(), "public", "uploads", uniqueName);
    fs.writeFileSync(filePath, buffer);
    profilePictureUrl = `/uploads/${uniqueName}`;
  }

  if (!result.data.image) {
    const updatedUserProfile = await db.user.update({
      where: { id: userProfile.id },
      data: {
        first_name: result.data.firstName,
        last_name: result.data.lastName,
        username: result.data.username,
        email: result.data.email,
      },
    });
  } else {
    // Update user profile (mock implementation)
    const updatedUserProfile = await db.user.update({
      where: { id: userProfile.id },
      data: {
        first_name: result.data.firstName,
        last_name: result.data.lastName,
        username: result.data.username,
        email: result.data.email,
        image: profilePictureUrl,
      },
    });
  }

  // Revalidate the page or redirect (optional)
  revalidatePath("/profile");

  return { errors: {}, success: "Your changes have been successfully saved!" };
};
