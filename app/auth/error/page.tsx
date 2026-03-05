"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const messages: Record<string, string> = {
  invalid_magic_link: "This magic link is invalid or has already been used.",
};

function ErrorContent() {
  const params = useSearchParams();
  const reason = params.get("reason");
  const message = (reason && messages[reason]) ?? "Something went wrong during sign-in.";

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-6">
      <div className="text-center max-w-sm">
        <p className="text-5xl mb-4">😕</p>
        <h1 className="text-2xl font-extrabold text-gray-800 mb-2">Sign-in failed</h1>
        <p className="text-gray-500 text-sm mb-6">{message}</p>
        <Link
          href="/login"
          className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-3 rounded-xl transition-all"
        >
          Try again
        </Link>
      </div>
    </div>
  );
}

export default function AuthError() {
  return (
    <Suspense>
      <ErrorContent />
    </Suspense>
  );
}
