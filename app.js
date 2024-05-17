const express = require('express');
const nodemailer = require("nodemailer");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.static('./'))

app.post('/submit', (req,res) => {
    const body = req.body;
    main(body)
.catch((err) => {
  console.log(err);
  return res.send(`failure`);
});
res.send(`success`);
})

//Main Function

async function main(body) {

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "israrsilver@gmail.com",
      pass: "hbyr rcmw iury ruem",
    },
  });
  

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
    <p><b>Canadian:</b> ${body.canadian}</p>
    <p><b>Message:</b> ${body.message}</p>
    `,
  });

  console.log(info.messageId);
}

const PORT = process.env.port || 3000;

app.listen(PORT, () => {
  console.log(`App.js is listening to PORT: ${PORT}`)
});



/* Meassage
firstName=ISRAR&lastName=ILYAS&email=israrsilver%40gmail.com&phone=03204108963&time=21%3A38&lang=Urdu&canadian=Yes&message=canadian
*/