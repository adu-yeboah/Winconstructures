import { transporter } from "../config/mail";

export const sendLoginAlert = async (email: string) => {
  await transporter.sendMail({
    from: process.env.MAIL_USER,
    to: email,
    subject: "New Admin Login",
    html: `
      <h2>Admin Login Successful</h2>
      <p>Your admin account was just accessed.</p>
    `,
  });
};