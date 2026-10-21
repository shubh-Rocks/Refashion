"use client";
import { useState } from "react";
import { authService } from "@/services/auth.service";
import { useAuthStore } from "@/store/authStore";
import { registerSchema } from "@/validations/auth.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Link from "next/link";
import Logo from "@/components/landing/Logo";

export default function RegisterPage() {
  const router = useRouter();
  const { setLoading, isLoading, setUser } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await authService.register(data);
      setUser(res.data.user);
      router.push(`/verify-otp?email=${encodeURIComponent(data.email)}`);
    } catch (err) {
      setError("root", {
        message: err.response?.data?.message || "Registration failed",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between px-6 py-10">
      {/* Top Navbar */}

      <div className="w-full flex items-center justify-between relative ">
        {" "}
        <div className="absolute">
          <Logo />
        </div>
        <div className="absolute right-30">
          <Link
            href="/"
            className="text-sm font-medium text-[#134e2c] hover:underline"
          >
            ← Back to ReFashion
          </Link>
        </div>
      </div>

      {/* Main Container */}
      <div className="w-full max-w-md mx-auto space-y-5 my-auto py-4">
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#134e2c]">
            Join ReWear
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1a2e22] tracking-tight">
            Start your next clothing story.
          </h1>
          <p className="text-sm text-gray-600">
            Create a simple account to join a community keeping good clothes in
            motion.
          </p>
        </div>

        {/* Google Signup Button */}
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
        <div className="relative flex py-1 items-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="flex-shrink mx-4 text-xs font-medium text-gray-400 uppercase tracking-wider">
            Or use email
          </span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1"></label>
            <input
              type="fullname"
              placeholder="Enter you fullname"
              className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#134e2c] bg-white"
              {...register("fullname")}
            />
            {errors.fullname && (
              <p className="text-sm text-red-500 mt-1">
                {errors.fullname.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#134e2c] bg-white"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <input
              type="phone"
              placeholder="Enter you 10 digit number"
              className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#134e2c] bg-white"
              {...register("phone")}
            />
            {errors.phone && (
              <p className="text-sm text-red-500 mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                placeholder="At least 8 characters"
                className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#134e2c] bg-white pr-10"
                {...register("password")}
              />
            </div>
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm password
            </label>
            <input
              type="password"
              placeholder="Repeat your password"
              className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#134e2c] bg-white"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="text-sm text-red-500 mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {errors.root && (
            <p className="text-sm text-red-500">{errors.root.message}</p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#134e2c] hover:bg-[#0e3b21] text-white rounded-lg py-3 text-sm font-semibold transition disabled:opacity-60 shadow-sm"
          >
            {isLoading ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600">
          Already a member?{" "}
          <Link
            href="/login"
            className="text-[#134e2c] font-semibold hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>

      {/* Footer Disclaimer */}
      <div className="text-center text-xs text-gray-400 max-w-sm mx-auto">
        By continuing, you agree to help keep the ReWear community thoughtful
        and respectful.
      </div>
    </div>
  );
}
