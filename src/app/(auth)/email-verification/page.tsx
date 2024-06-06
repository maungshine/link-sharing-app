"use client";
import { verifyEmailResponse } from "@/types/response";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";

function page() {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (!token) {
      setError("Missing Token");
      return;
    }
    fetch("/api/verify-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    })
      .then((data) => data.json())
      .then((data: verifyEmailResponse) => {
        if (data.success) {
          setSuccess(data.success);
        } else {
          setError(data.error);
        }
      })
      .catch(() => {
        setError("Something Went Wrong");
      });
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <main className="flex-1 flex items-center justify-center">
      <div className="flex flex-col gap-8">
        <div>
          {!success && !error && (
            <p className="text-center">
              Verifying your email
              <BeatLoader className="inline-block mr-2" />
            </p>
          )}
        </div>

        {error && (
          <div className="bg-red-200 text-red-600 border-2 border-red-300 py-3 px-2 rounded-lg">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-200 text-green-600 border-2 border-green-300 py-3 px-2 rounded-lg">
            {success}
          </div>
        )}
        <div className="flex flex-col items-center">
          <Link href="/login" className="px-4 py-2 bg-primary text-white">
            Go To Login Page
          </Link>
        </div>
      </div>
    </main>
  );
}

export default page;
