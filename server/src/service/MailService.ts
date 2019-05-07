import * as nodemailer from 'nodemailer';
import config from 'config';

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
  private static instance: MailService;
  private constructor() {}
  static getInstance(): MailService {
    if (!MailService.instance) {
      MailService.instance = new MailService();
    }
    return MailService.instance;
  }

  async sendMail(mailOptions: {
    from: string;
    to: string;
    subject: string;
    html: string;
  }) {
    return transporter.sendMail(mailOptions);
  }
}

export default MailService;
