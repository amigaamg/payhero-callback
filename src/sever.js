const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// PayHero Callback URL
app.post("/callback", (req, res) => {
  console.log("Received M-Pesa Callback:", req.body);

  // Send back success to Safaricom
  res.json({ ResultCode: 0, ResultDesc: "Callback received successfully" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
