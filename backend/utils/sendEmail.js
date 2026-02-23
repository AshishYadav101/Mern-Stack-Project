const nodemailer = require('nodemailer');

/**
 * Send email. If EMAIL_USER/EMAIL_PASS are not set in .env, returns false (caller can log to console).
 */
async function sendEmail({ to, subject, text, html }) {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  if (!user || !pass) {
    return { sent: false, reason: 'Email not configured' };
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass },
  });

  await transporter.sendMail({
    from: user,
    to,
    subject,
    text: text || html,
    html: html || text,
  });
  return { sent: true };
}

module.exports = { sendEmail };
