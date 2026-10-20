"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { loginSchema } from "@/validations/auth.validation";
import { useAuthStore } from "@/store/authStore";
import { authService } from "@/services/auth.service";
import Logo from "@/components/landing/Logo";

export default function LoginPage() {
  const router = useRouter();
  const { setUser, setLoading, isLoading } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await authService.login(data);
      setUser(res.data.user);
      router.push("/user");
    } catch (err) {
      setError("root", {
        message: err.response?.data?.message || "Login failed",
      });
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (hasError) =>
    `w-full rounded border-2 px-3.5 py-2.5 text-base outline-none transition ${
      hasError
        ? "border-[#b3392b] bg-[#b3392b]/5 focus:ring-1 focus:ring-[#b3392b]"
        : "border-[#cdd8c6] bg-transparent focus:border-[#14603c]"
    }`;

  return (
    <div className="flex min-h-screen flex-col bg-[#fffef7] font-[family-name:var(--font-figtree)] text-[#14603c]">
      {/* Header */}
      <header className="flex items-center justify-between px-5 py-4 sm:px-12">
        <Logo />

        <Link
          href="/"
          className="flex items-center gap-2 font-medium text-[#6f9a7e] hover:text-[#14603c]"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5M11 6l-6 6 6 6" />
          </svg>
          Back
        </Link>
      </header>

      {/* Main */}
      <main className="mx-auto w-full max-w-[560px] flex-1 px-5 pb-8 pt-4">
        <div className="text-center mb-6">
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-[#6f9a7e]">
            Welcome back
          </p>
          <h1 className="mb-2 font-[family-name:var(--font-outfit)] text-[clamp(40px,8vw,60px)] text-3xl font-extrabold tracking-tight leading-[1.2]">
            Return to your wardrobe.
          </h1>
          <p className="text-sm text-[#6f9a7e] sm:text-base">
            Continue swapping quality clothing and finding pieces worth passing
            on.
          </p>
        </div>

        {/* Google Button */}
        <button
          type="button"
          className="flex h-12 w-full items-center justify-center gap-2.5 rounded border-2 border-[#14603c] bg-transparent text-base font-semibold text-[#14603c] transition hover:bg-[#14603c] hover:text-[#fffef7]"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5">
            <path
              fill="currentColor"
              d="M21.6 12.2c0-.7-.1-1.4-.2-2H12v3.8h5.4a4.6 4.6 0 0 1-2 3v2.5h3.2c1.9-1.7 3-4.3 3-7.3zM12 22c2.7 0 5-.9 6.6-2.4l-3.2-2.5c-.9.6-2 1-3.4 1-2.6 0-4.8-1.8-5.6-4.1H3.1v2.6A10 10 0 0 0 12 22zM6.4 14a6 6 0 0 1 0-3.9V7.5H3.1a10 10 0 0 0 0 9zM12 6c1.5 0 2.8.5 3.8 1.5l2.9-2.9A10 10 0 0 0 3.1 7.5L6.4 10C7.2 7.8 9.4 6 12 6z"
            />
          </svg>
          Continue with Google
        </button>

        {/* Divider */}
        <div className="my-5 flex items-center gap-4 text-xs font-medium uppercase tracking-wide text-[#6f9a7e]">
          <span className="h-px flex-1 bg-[#cdd8c6]" />
          Or use email
          <span className="h-px flex-1 bg-[#cdd8c6]" />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
              Email address
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              {...register("email")}
              className={inputClass(errors.email)}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-[#b3392b]">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <div className="flex items-baseline justify-between mb-1.5">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <button
                type="button"
                className="border-b-2 border-[#b2c26b] pb-0.5 text-xs font-semibold hover:bg-[#b2c26b]/30"
              >
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <input
                id="password"
                placeholder="At least 8 characters"
                autoComplete="current-password"
                {...register("password")}
                className={`${inputClass(errors.password)} pr-12`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-[#6f9a7e] hover:text-[#14603c]"
              ></button>
            </div>
            {errors.password && (
              <p className="mt-1 text-xs text-[#b3392b]">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Root Error */}
          {errors.root && (
            <div className="rounded-lg bg-[#b3392b]/10 px-3 py-2 text-xs font-medium text-[#b3392b]">
              {errors.root.message}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="mt-2 flex h-12 w-full items-center justify-center rounded border-2 border-[#14603c] bg-[#14603c] text-base font-semibold text-[#fffef7] transition hover:brightness-110 disabled:opacity-60"
          >
            {isLoading ? "Logging in..." : "Log in"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[#6f9a7e]">
          New to ReWear?{" "}
          <Link
            href="/register"
            className="border-b-2 border-[#b2c26b] pb-0.5 font-semibold text-[#14603c] hover:bg-[#b2c26b]/30"
          >
            Create an account
          </Link>
        </p>
      </main>

      {/* Footer */}
      <footer className="px-5 py-4 text-center text-xs text-[#6f9a7e]">
        By continuing, you agree to help keep the ReWear community thoughtful
        and respectful.
      </footer>
    </div>
  );
}
