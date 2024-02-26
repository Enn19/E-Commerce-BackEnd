import nodemailer from "nodemailer";

const sendEmail = async ({ from = process.env.Email, to, subject, text, cc, bcc, html, attachments } = {}) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: process.env.EMAIL,
      pass: process.env.PASSWORD_GAMIL,
    },
    tls: {
      rejectUnauthorized:false
    }
  });
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: `"ROUTE 👻" <${from}>`, // sender address
    to, // list of receivers
    subject, // Subject line
    text, // plain text body
    cc,
    bcc,
    attachments,
    html, // html body
  });

  return info.rejected.length ? false : true
}
export default sendEmail

