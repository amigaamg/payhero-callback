const express = require("express");
const app = express();

app.use(express.json());

app.post("/payhero/callback", (req, res) => {
  console.log("✅ Callback received:", JSON.stringify(req.body, null, 2));
  res.json({ status: "ok" });
});

app.get("/", (req, res) => res.send("Callback server running"));

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
