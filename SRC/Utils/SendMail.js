import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USERNAME, // e.g. yourname@gmail.com
    pass: process.env.EMAIL_PASSWORD, // app password, not your Gmail password
  },
});

const sendMail = async (to, subject, html) => {
  try {
    const mailOptions = {
      from: `"Safety App" <${process.env.EMAIL_USERNAME}>`,
      to,
      subject,
      html,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent to:", to);
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

export default sendMail;
