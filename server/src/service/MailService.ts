import * as nodemailer from 'nodemailer';
import config from '../config';

const transportOptions = config.nodeMailer;

const transporter = nodemailer.createTransport({
  host: transportOptions.host, // hostname
  secure: true, // use SSL
  port: transportOptions.port, // port for secure SMTP
  auth: {
    user: transportOptions.username,
    pass: transportOptions.password,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

class MailService {
  async sendMail(mailOptions: {
    from: string;
    to: string;
    subject: string;
    html: string;
  }) {
    return transporter.sendMail(mailOptions);
  }
}

export default new MailService();
