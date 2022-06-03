import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.MAILER,
    pass: process.env.MAILPASS,
  },
});

export const sendMail: (
  email: string,
  message: string,
  subject: string
) => void = (email, message, subject) => {
  try {
    transport.sendMail({
      from: process.env.MAILER,
      to: email,
      subject: subject,
      html: message,
    });
  } catch (error) {
    console.log(error);
  }
};
