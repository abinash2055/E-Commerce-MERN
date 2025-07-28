import nodemailer from "nodemailer";

export const sendMail = async (subject, receiver, body) => {
  const transporter = nodemailer.createTransport({
    host: process.env.NODEMAILER_HOST,
    port: Number(process.env.NODEMAILER_PORT),
    secure: false,
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const options = {
    from: `"Personal Signature" <${process.env.NODEMAILER_EMAIL}>`,
    to: receiver,
    subject,
    html: body,
  };

  try {
    const info = await transporter.sendMail(options);
    console.log("Email sent:", info.messageId);
    return { success: true };
  } catch (error) {
    console.error("SendMail error:", error);
    return { success: false, message: error.message };
  }
};
