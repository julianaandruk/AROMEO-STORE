const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/send-email", async (req, res) => {
  const { name, email, phone, whatsapp, address, comment, cartItems } = req.body;

  // Užsakymo turinys
  const orderDetails = cartItems
    .map(item => {
      const quantity = item.quantity || 1;
      const itemTotal = item.price !== "индивидуально"
        ? (item.price * quantity).toFixed(2) + " ₽"
        : "индивидуально";

      return `• ${item.name} — ${quantity} шт. — ${itemTotal}`;
    })
    .join("\n");

  const mailText = `
Новый заказ с сайта Aromeo

Контактная информация:
Имя: ${name}
Email: ${email}
Телефон: ${phone}
WhatsApp: ${whatsapp}
Адрес: ${address}
Комментарий: ${comment}

Товары:
${orderDetails}
`;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "Новый заказ с сайта Aromeo",
      text: mailText,
    };

    await transporter.sendMail(mailOptions);
    console.log("Успешно отправлено письмо");
    res.status(200).json({ success: true, message: "Письмо успешно отправлено" });
  } catch (error) {
    console.error("Ошибка отправки письма:", error);
    res.status(500).json({ success: false, message: "Ошибка при отправке письма" });
  }
});

app.post("/api/send-form", async (req, res) => {
    const { name, phone, whatsapp, email, orderDescription, comment } = req.body;
  
    const message = `
  Новая заявка с главной страницы сайта Aromeo
  
  Имя: ${name}
  Телефон: ${phone}
  WhatsApp: ${whatsapp}
  Email: ${email}
  Описание заказа: ${orderDescription}
  Комментарий: ${comment}
  `;
  
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
  
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: "Заявка с главной страницы Aromeo",
        text: message,
      };
  
      await transporter.sendMail(mailOptions);
      console.log("Заявка успешно отправлена");
      res.status(200).json({ success: true, message: "Заявка отправлена" });
    } catch (error) {
      console.error("Ошибка отправки формы:", error);
      res.status(500).json({ success: false, message: "Ошибка при отправке формы" });
    }
  });
  
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Backend работает на http://localhost:${PORT}`);
});
