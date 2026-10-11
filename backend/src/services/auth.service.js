import { userRepository } from "../repository/user.repository.js";
import { genrateOTP, saveOTP, verifyOTP } from "../utils/otp.js";
import { sendOTPEmail } from "./email.service.js";
import bcrypt from "bcryptjs";

class AuthService {
  async register({ fullname, email, password, phone }) {
    const userEmail = await userRepository.findByEmail(email);
    if (userEmail) {
      throw new Error("Email already registered");
    }

    const userPhone = await userRepository.findByPhone(phone);
    if (userPhone) {
      throw new Error("Phone already registerd");
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await userRepository.createUser({
      fullname,
      email,
      password: hashedPassword,
      phone,
    });

    const otp = genrateOTP();
    await saveOTP(email, otp);
    await sendOTPEmail(email, otp);

    return {
      message: "Registerd successfully. please verify OTP is sent to email.",
      email: user.email,
    };
  }

  async verifyUserOTP(email, otp) {
    const result = await verifyOTP(email, otp);
    if (!result.success) {
      throw new Error(result.message);
    }
    const user = await userRepository.verifyUser(email);
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      points: user.points,
    };
  }

  async login({ email, password }, meta = {}) {
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new Error("Invalid email or password");
    }

    if (user.isBlocked) {
      throw new Error("Your account has been blocked");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      await userRepository.createLoginHistory({
        userId: user.id,
        ipAddress: meta.ipAddress || null,
        userAgent: meta.userAgent || null,
        status: "FAILED",
      });

      throw new Error("Invalid email or password");
    }

    if (!user.isVerified) {
      const otp = genrateOTP();
      await saveOTP(user.email, otp);
      await sendOTPEmail(user.email, otp);
      throw new Error("Email is not verified. OTP sent again");
    }

    await userRepository.createLoginHistory({
      userId: user.id,
      ipAddress: meta.ipAddress || null,
      userAgent: meta.userAgent || null,
      status: "SUCCESS",
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      points: user.points,
    };
  }

  async resendOtp(email) {
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }

    if (user.isVerified) {
      throw new Error("User already verified");
    }
    const otp = genrateOTP();
    await saveOTP(email, otp);
    await sendOTPEmail(email, otp);

    return {
      message: "OTP resent successfully",
    };
  }
}

export const authService = new AuthService();
