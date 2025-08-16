const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3000; // Render requires process.env.PORT

app.use(bodyParser.json());

// Callback endpoint for PayHero
app.post("/callback", async (req, res) => {
  console.log("Received callback:", req.body);

  // Later: save to Firebase
  res.status(200).send("Callback received");
});

// Health check (optional)
app.get("/", (req, res) => {
  res.send("PayHero Callback Server is running ✅");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
