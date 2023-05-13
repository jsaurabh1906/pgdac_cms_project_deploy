import nodemailer from "nodemailer";
import Mailgen from "mailgen";

const EMAIL = process.env.Email;
const PASSWORD = process.env.PASSWORD;

export const registerMail = (req, res) => {
  const { userName, userEmail } = req.body;

  let config = {
    service: "gmail",
    auth: {
      user: EMAIL,
      pass: PASSWORD,
    },
  };

  let transporter = nodemailer.createTransport(config);

  let MailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "ASP Couriers",
      link: "https://AspCouriers.com/",
    },
  });

  let response = {
    body: {
      name: userName,
      intro:
        "Thank You for registering with us!!! Book Your first Consignment Now",
      // table: {
      //   data: [
      //     {

      //       item: "ASP SERVICE EMAIL TESTING",
      //       description: "EMAIL TESTING",
      //       price: "NULL",
      //     },
      //   ],
      // },
      outro: "Visit Now @ ASP COURIER",
    },
  };

  let mail = MailGenerator.generate(response);

  let message = {
    from: EMAIL,
    to: userEmail,
    subject: "Succesfully Registered to ASP Couriers!!!",
    html: mail,
  };

  transporter
    .sendMail(message)
    .then(() => {
      return res.status(201).json({
        msg: "you should receive an email",
      });
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });

  // res.status(201).json("getBill Successfully...!");
};
