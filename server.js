// server.js
const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const path = require("path");

const app = express();
app.use(bodyParser.json());
// Serve from root
app.use(express.static(path.join(__dirname, 'public')));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

app.post("/sendData", async (req, res) => {
  const { address, phone, qty, notes, email ,image} = req.body;

  // configure your email here
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "meenaKumar7667@gmail.com",
      pass: "chxr khis mgwn biun",
    },
  });

  const message = `
    New Order:
    Address: ${address}
    Phone: ${phone}
    Quantity: ${qty}
    Notes: ${notes}
    image: ${image}
  `;
  const message1 = `Thank you for placing order in InCraftSent
                    Happy Shopping !!`

  try {
    await transporter.sendMail({
      from: "meenaKumar7667@gmail.com",
      to: "meenaKumar7667@gmail.com",
      subject: "New Handmade Gift Order",
      text: message,
    });

    await transporter.sendMail({
      from:"meenaKumar7667@gmail.com",
      to:email,
      subject:"InCraftSent",
      text:message1
    })
    
    res.send("Order placed successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to send order.");
  }
});

const PORT = process.env.PORT || 3000;
process.env.PORT
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
