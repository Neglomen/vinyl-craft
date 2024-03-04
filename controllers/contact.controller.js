const nodeMailer = require("nodemailer");
require("dotenv").config();

const transporter = nodeMailer.createTransport({
  host: "poczta23157.e-kei.pl",
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.PASSWORD,
  },
});

transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages");
  }
});

exports.send = (req, res) => {
  const mail = {
    sender: `mail`,
    to: process.env.EMAIL,
    subject: req.body.title,
    text: `Imię i nazwisko: ${req.body.name}\nE-mail: ${req.body.email}\nNumer Telefonu: ${req.body.tel}\nWiadomości:\n ${req.body.message}`,
  };
  transporter.sendMail(mail, (err, data) => {
    if (err) {
      console.log(err);
      //res.status(500).send("Wiadomości nie została wysłana!");
      res.render("contact", {
        title: "Vinyl craft",
        result: "error",
        msg: "Wiadomości nie została wysłana!",
      });
    } else {
      //res.status(200).send("Wiadomości została poprawnie wysłana!");

      res.render("contact", {
        title: "Vinyl craft",
        result: "success",
        msg: "Wiadomości została poprawnie wysłana!",
      });
    }
  });
};
