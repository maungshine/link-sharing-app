import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { NextResponse } from "next/server";

export const { auth } = NextAuth(authConfig);

const pretected = ["/links", "/profile", "/preview"];

export default auth(async (req) => {
  const nextUrl = req.nextUrl;
  const isLoggedIn = !!req.auth;
  const isProtected = pretected.includes(nextUrl.pathname);
  const unAuthorized = !isLoggedIn && isProtected;

  if (isLoggedIn && ["/login", "/register"].includes(nextUrl.pathname)) {
    return Response.redirect(new URL("/links", nextUrl));
  }

  if (unAuthorized) {
    return Response.redirect(new URL("/login", nextUrl));
  }
});

export const config = {
  matcher: [
    // Exclude files with a "." followed by an extension, which are typically static files.
    // Exclude files in the _next directory, which are Next.js internals.
    "/((?!.+\\.[\\w]+$|_next).*)",
    // Re-include any files in the api or trpc folders that might have an extension
    "/(api|trpc)(.*)",
  ],
};
