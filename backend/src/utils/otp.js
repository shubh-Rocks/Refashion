import redis from "../configs/redis.js";

const OTP_EXPIRY = 600;
const MAX_ATTEMTS = 5;

export const genrateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const saveOTP = async (email, otp) => {
  const key = `otp:${email}`;
  console.log("🟢 [REDIS SAVE] Saving key:", key, "with OTP:", otp);
  await redis.setex(key, OTP_EXPIRY, JSON.stringify({ otp, attempts: 0 }));
};

export const verifyOTP = async (email, userOtp) => {
  const key = `otp:${email}`;
  console.log("🔍 [REDIS SEARCH] Checking key:", key);
  const data = await redis.get(key);
  console.log("📦 [REDIS DATA FOUND]:", data);
  if (!data) {
    return { success: false, message: "OTP expired or not found " };
  }

  const parsed = JSON.parse(data);

  if (parsed.attempts >= MAX_ATTEMTS) {
    await redis.del(key);
    return { success: false, message: "Too many attempts. Request a new OTP" };
  }

  if (parsed.otp !== userOtp) {
    parsed.attempts += 1;
    const ttl = await redis.ttl(key);
    await redis.setex(key, ttl > 0 ? ttl : OTP_EXPIRY, JSON.stringify(parsed));
    return { success: false, message: "invalid OTP" };
  }

  await redis.del(key);
  return { success: true, message: "OTP verified" };
};
