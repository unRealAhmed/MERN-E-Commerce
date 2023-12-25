const nodemailer = require('nodemailer');
const EventEmitter = require('events');

const emailEventEmitter = new EventEmitter();

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.fullname.split(' ')[0];
    this.url = url;
    this.from = 'E-Commerce Team <ahmed@ECommerce.io>';
  }

  async send(subject, message, html) {
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      text: message || '',
      html
    };

    emailEventEmitter.emit('sendEmail', mailOptions);
  }

  async sendWelcomeEmail() {
    const subject = 'Welcome To E-Commerce Family 🚀';
    const message = `Hello ${this.firstName}! 🎉

    Welcome to E-Commerce! We're excited to have you as a valued member of our E-Commerce community. Get ready to explore a wide range of products, enjoy exclusive offers, and immerse yourself in a delightful shopping experience. Together, let's make your shopping journey with E-Commerce a resounding success! 🌟
    
    Happy shopping!
    The E-Commerce Team 🌐`;

    await this.send(subject, message, null);
  }

  async sendPasswordResetEmail(html) {
    const subject = "Password Reset Request for Your E-Commerce Account 🛡️"
    const message = 'hi'
    await this.send(subject, message, html);
  }
};

emailEventEmitter.on('sendEmail', async (mailOptions) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GOOGLE_EMAIL,
      pass: process.env.GOOGLE_PASS_KEY,
    },
  });

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
});
