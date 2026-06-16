"use client";

import Link from "next/link";

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="w-full max-w-md border rounded-2xl p-8 bg-card">
        <h1 className="text-3xl font-bold mb-2">
          Admin Login
        </h1>

        <p className="text-muted-foreground mb-6">
          Access the CulturalVault dashboard
        </p>

        <form className="space-y-4">
          <input
            placeholder="Email"
            className="w-full border rounded-xl px-4 py-3 bg-background"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border rounded-xl px-4 py-3 bg-background"
          />

          <button
            className="w-full bg-primary text-white py-3 rounded-xl"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-sm">
          New Admin?{" "}
          <Link
            href="/admin/signup"
            className="text-primary font-semibold"
          >
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
}