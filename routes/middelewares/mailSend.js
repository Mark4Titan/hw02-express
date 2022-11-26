const sgMail = require("@sendgrid/mail");
const { SENDGRID_API_KEY, fromMail } = process.env;

const mailSend = async (email, verificationToken) => {
  const url = `localhost:3000/api/users/verify/${verificationToken}`;

  sgMail.setApiKey(SENDGRID_API_KEY);

  const emailBody = {
    from: fromMail,
    to: email,
    subject: "Please verify your email",
    html: `<a href="http://${url}"><button>Click to confirm the email</button></a>`,
    text: `Please open this link: ${url} to verify your email`,
  };

  return await sgMail.send(emailBody);
};

module.exports = {
  mailSend,
};