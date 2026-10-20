"use client";
import { useState, useRef } from "react";
import { authService } from "@/services/auth.service";
import { useAuthStore } from "@/store/authStore";
import { verifyOtpSchema } from "@/validations/auth.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import Link from "next/link";

export default function VerifyOtpPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "your email";

  const { setLoading, isLoading, setUser } = useAuthStore();
  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
  const [resendLoading, setResendLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const inputRefs = useRef([]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    setError,
  } = useForm({
    resolver: zodResolver(verifyOtpSchema),
    defaultValues: {
      otp: "",
    },
  });

  const handleChange = (index, value) => {
    if (isNaN(value)) return;
    const newOtpValues = [...otpValues];
    newOtpValues[index] = value.substring(value.length - 1);
    setOtpValues(newOtpValues);

    const combinedOtp = newOtpValues.join("");
    setValue("otp", combinedOtp, { shouldValidate: true });

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim().slice(0, 6);
    if (/^\d+$/.test(pastedData)) {
      const newOtpValues = ["", "", "", "", "", ""];
      pastedData.split("").forEach((char, idx) => {
        if (idx < 6) newOtpValues[idx] = char;
      });
      setOtpValues(newOtpValues);

      const combinedOtp = newOtpValues.join("");
      setValue("otp", combinedOtp, { shouldValidate: true });

      if (pastedData.length <= 6) {
        inputRefs.current[Math.min(pastedData.length, 5)].focus();
      }
    }
  };

  const handleResendOtp = async () => {
    setResendLoading(true);
    setSuccessMsg("");
    try {
      await authService.resendOtp({ email });
      setSuccessMsg("New OTP sent successfully in your email ");
    } catch (error) {
      setError("root", {
        message: error.response?.data?.message || "Failed to send OTP",
      });
    } finally {
      setResendLoading(false);
    }
  };

 
  const onSubmit = async (data) => {
    console.log("Form submitted data:", data);
    setLoading(true);

    try {
      const res = await authService.verifyOtp({ email, otp: data.otp });
      setUser(res.data.user);
      router.push("/");
    } catch (err) {
      setError("root", {
        message:
          err.response?.data?.message || "Invalid OTP. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col justify-between px-6 py-6">
      {/* Top Navbar */}
      <div className="max-w-xl w-full mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#e8f5e9] flex items-center justify-center text-[#134e2c]">
            🌿
          </div>
          <span className="font-bold text-xl tracking-tight text-[#134e2c]">
            REWEAR
          </span>
        </Link>
        <Link
          href="/register"
          className="text-sm font-medium text-[#134e2c] hover:underline"
        >
          ← Back to Register
        </Link>
      </div>

      {/* Main Container */}
      <div className="w-full max-w-md mx-auto space-y-6 my-auto py-8">
        <div className="space-y-2 text-center sm:text-left">
          <span className="text-xs font-bold uppercase tracking-wider text-[#134e2c]">
            Security Verification
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1a2e22] tracking-tight">
            Enter verification code.
          </h1>
          <p className="text-sm text-gray-600">
            We've sent a 6-digit code to{" "}
            <span className="font-medium text-[#1a2e22]">{email}</span>. Enter
            it below to verify your account.
          </p>
        </div>

        {/* OTP Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <input type="hidden" {...register("otp")} />
          <input type="hidden" value={email} {...register("email")} />
          <div
            className="flex justify-between gap-2 sm:gap-3"
            onPaste={handlePaste}
          >
            {otpValues.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 sm:w-14 sm:h-14 text-center text-xl font-bold border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#134e2c] bg-white shadow-sm"
              />
            ))}
          </div>

          {/* Zod validation error for OTP */}
          {errors.otp && (
            <p className="text-sm text-red-500 text-center">
              {errors.otp.message}
            </p>
          )}

          {/* Root/API error */}
          {errors.root && (
            <p className="text-sm text-red-500 text-center">
              {errors.root.message}
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#134e2c] hover:bg-[#0e3b21] cursor-pointer text-white rounded-lg py-3 text-sm font-semibold transition disabled:opacity-60 shadow-sm"
          >
            {isLoading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        <div className="text-center text-sm text-gray-600">
          Didn't receive the code?
          <button
            type="button"
            onClick={handleResendOtp}
            disabled={resendLoading}
            className="text-[#134e2c] font-semibold hover:underline bg-transparent border-none cursor-pointer"
          >
            {resendLoading ? "Resending..." : "Resend"}
          </button>
        </div>
      </div>

      {/* Footer Disclaimer */}
      <div className="text-center text-xs text-gray-400 max-w-sm mx-auto">
        By continuing, you agree to help keep the ReWear community thoughtful
        and respectful.
      </div>
    </div>
  );
}
