import nodemailer from "nodemailer";

const createTransporter = () =>
  nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.GOOGLE_USER,
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
    },
  });

export const sendEmail = async (to, subject, text, html) => {
  const transporter = createTransporter();

  return transporter.sendMail({
    from: `"refashion" <${process.env.GOOGLE_USER}>`,
    to,
    subject,
    text,
    html,
  });
};

export const sendOTPEmail = async (email, otp) => {
  const subject = "Your Refashion OTP";
  const text = `Your OTP is ${otp}. Valid for 10 minutes.`;
  const html = `
    <div style="font-family: Arial, sans-serif; color: #0E3B53;">
      <h2>Verify your email</h2>
      <p>Your refashion verification code is:</p>
      <p style="font-size: 28px; font-weight: 700; letter-spacing: 6px;">${otp}</p>
      <p>This code will expire in 10 minutes.</p>
    </div>
  `;

  return sendEmail(email, subject, text, html);
};
