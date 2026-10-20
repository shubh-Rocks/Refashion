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
          {" "}
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
          className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition shadow-sm"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
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
