const express = require('express');
const nodemailer = require("nodemailer");
// Import NodeMailer (after npm install)

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.static('./'))

app.post('/submit', (req,res) => {
    const body = req.body;
    main(body)
.catch(err => console.log(err));
})

async function main(body) {
// Async function enables allows handling of promises with await

  // First, define send settings by creating a new transporter: 
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // SMTP server address (usually mail.your-domain.com)
    port: 465, // Port for SMTP (usually 465)
    secure: true, // Usually true if connecting to port 465
    auth: {
      user: "israrsilver@gmail.com", // Your email address
      pass: "hbyr rcmw iury ruem", // Password (for gmail, your app password)
      // ⚠️ For better security, use environment variables set on the server for these values when deploying
    },
  });
  
  // Define and send message inside transporter.sendEmail() and await info about send from promise:
  let info = await transporter.sendMail({
    from: 'israrsilver@gmail.com',
    to: "superstuff8963@gmail.com",
    subject: `${body.firstName} wants to Book A Free CONSULTATION`,
    html: `
    <h1>The Request Submitted has following Data:</h1>
    <p><b>First Name:</b> ${body.firstName}</p>
    <p><b>Last Name:</b> ${body.lastName}</p>
    <p><b>Email:</b> ${body.email}</p>
    <p><b>Phone no.:</b> ${body.phone}</p>
    <p><b>Preffered Time to Contact:</b> ${body.time}</p>
    <p><b>Preffered Language:</b> ${body.lang}</p>
    <p><b>Message:</b> ${body.message}</p>
    `,
  });

  console.log(info.messageId); // Random ID generated after successful send (optional)
}


app.listen(3000);