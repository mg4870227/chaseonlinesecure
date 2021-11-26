import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";

export const sendEmail = async (
  to: string,
  html: string,
  subject: string,
  attachments?: Mail.Attachment[] | undefined
) => {
  let transporter = nodemailer.createTransport({
    host: process.env.SMTP,
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.PASSWORD,
    },
  });

  let info = await transporter.sendMail({
    from: `"Fred Foo 👻" ${process.env.EMAIL_ADDRESS}`,
    to,
    subject,
    html,
    attachments,
  });

  console.log("Message sent: %s", info.messageId);
};
