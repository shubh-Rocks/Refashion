import z from "zod";

export const registerSchema = z
  .object({
    fullname: z
      .string()
      .min(3, "Name must be at least 3 characters")
      .max(50, "Name is too long"),
    email: z.email("invalid email format"),
    phone: z.string().min(10, "phone number must be at least 10 digits"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(100, "Password is too long")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "password and confirm password don't match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z.email({ message: "Please enter a valid email" }),
  password: z.string().min(1, "Password is required"),
});

export const verifyOtpSchema = z.object({
  email: z.email(),
  otp: z
    .string()
    .trim()
    .regex(/^\d{6}$/, "OTP must be 6 digits"),
});

export const resendOtpSchema = z.object({
  email: z.email(),
});
