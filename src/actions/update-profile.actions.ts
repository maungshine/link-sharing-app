"use server";
import { z } from "zod";

import fs from "fs";
import path from "path";
import { revalidatePath } from "next/cache";
import crypto from "crypto";
import { db } from "@/db";
import { User } from "@prisma/client";
import { auth } from "@/auth";
import { deleteImage, getSignedURL } from "./image-upload.action";
import { getUserFromDb } from "@/queries/user";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpg", "image/png"];

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
});

const imageUploadSchema = z.object({
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
  });

  // Validate form data
  if (!result.success) {
    console.log(result.error.issues);
    return { errors: result.error.flatten().fieldErrors };
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
  
  const updatedUserProfile = await db.user.update({
    where: { id: userProfile.id },
    data: {
      first_name: result.data.firstName,
      last_name: result.data.lastName,
      username: result.data.username,
      email: result.data.email,
    },
  });

  // Revalidate the page or redirect (optional)
  revalidatePath("/profile");

  return { errors: {}, success: "Your changes have been successfully saved!" };
};

export const handleImageUpload = async (
  formData: FormData
): Promise<string | null> => {
  const result = imageUploadSchema.safeParse({
    image: formData.get("image") as File | null,
  });

  if (!result.success) {
    return null;
  }

  const file = result.data.image;

  const session = await auth();

  if (!session) {
    return null;
  }

  const user = await getUserFromDb(session.user?.email as string);

  if (!user) {
    return null;
  }

  try {
    //fetch signdedUrl from server
    const signedUrl = await getSignedURL();
    if (signedUrl.failure) {
      throw new Error("Fail to upload!");
    }
    const url = signedUrl.success?.url as string;

    const response = await fetch(url, {
      method: "PUT",
      body: file,
      headers: {
        "Content-type": file.type,
        "Access-Control-Allow-Origin":
          process.env.NODE_ENV === "production"
            ? "https://link-sharing-app-sigma-mauve.vercel.app/"
            : "http://localhost:3000",
      },
    });

    return response.url.split("?")[0];
  } catch (error) {
    console.log(error);
  }

  return null;
};

export const saveImage = async (url: string) => {
  const session = await auth();
  if (!session) {
    return null;
  }
  await db.user.update({
    where: { email: session.user?.email as string },
    data: { image: url.split("?")[0] },
  });

  return;
};
