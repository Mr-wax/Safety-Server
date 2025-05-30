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


const generateStyledContactAlert = (contactName, user, alertType, latitude, longitude, message) => {
  return `
  <div style="font-family: Arial, sans-serif; background-color: #f0f4f8; padding: 20px; border-radius: 10px; color: #333;">
    <h2 style="color: #e63946;">🚨 Emergency Alert</h2>
    
    <p>Hi <strong>${contactName}</strong>,</p>
    
    <p>
      <strong>${user.firstName || user.firstname || ''} ${user.lastName || user.lastname || ''}</strong> has triggered an emergency alert on the safety platform.
    </p>

    <table style="width: 100%; margin-top: 15px; font-size: 15px; border-collapse: collapse;">
      <tr>
        <td style="padding: 8px; font-weight: bold;">Alert Type:</td>
        <td style="padding: 8px;">${alertType}</td>
      </tr>
      <tr style="background-color: #e9ecef;">
        <td style="padding: 8px; font-weight: bold;">Email:</td>
        <td style="padding: 8px;">
          <a href="mailto:${user.email}" style="color: #007bff;">${user.email}</a>
        </td>
      </tr>
      <tr>
        <td style="padding: 8px; font-weight: bold;">Location:</td>
        <td style="padding: 8px;">
          <a href="https://maps.google.com/?q=${latitude},${longitude}" target="_blank" style="color: #28a745;">
            View on Google Maps
          </a>
        </td>
      </tr>
      <tr style="background-color: #e9ecef;">
        <td style="padding: 8px; font-weight: bold;">Message:</td>
        <td style="padding: 8px;">${message || "No message provided"}</td>
      </tr>
    </table>

    <p style="margin-top: 25px; font-size: 13px; color: #6c757d;">
      This message was automatically generated by the <strong>Safety App</strong>. Please try to contact them or take appropriate action immediately.
    </p>
  </div>
  `.trim();
};

