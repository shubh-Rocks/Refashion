import { authService } from "../services/auth.service.js";

class AuthController {
  async register(req, res, next) {
    try {
      const result = await authService.register(req.body);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  async verifyOtp(req, res, next) {
    try {
      const { email, otp } = req.body;
      const user = await authService.verifyUserOTP(email, otp);
      req.session.user = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      };

      res.status(200).json({
        message: "OTP verified successfully",
        user,
      });
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const meta = {
        ipAddress: req.headers["x-forwarded-for"]?.split(",")[0] || req.ip,
        userAgent: req.headers["user-agent"],
      };

      const user = await authService.login(req.body, meta);

      req.session.user = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      };
      res.status(200).json({
        message: "Login successefully",
        user,
      });
    } catch (error) {
      next(error);
    }
  }

  async resendOtp(req, res, next) {
    try {
      const result = await authService.resendOtp(req.body.email);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res, next) {
    req.session.destroy((err) => {
      if (err) return next(err);
      res.clearCookie("refashion.sid");
      res.status(200).json({ message: "Logged out sucessfully" });
    });
  }

  async getMe(req, res) {
    if (!req.session.user) {
      return res.status(401).json({ message: "not logged in" });
    }
    res.status(200).json({ user: req.session.user });
  }
}

export const authController = new AuthController();
