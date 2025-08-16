const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// ✅ Root endpoint (test if server works)
app.get("/", (req, res) => {
  res.send("PayHero Callback Server is running 🚀");
});

// ✅ Endpoint to receive PayHero callback
app.post("/payhero/callback", async (req, res) => {
  console.log("📩 Callback received:", req.body);

  // Example: Extract transaction info
  const { transactionId, status, amount, phone } = req.body;

  try {
    // 🔥 Save to Firebase (Firestore REST API)
    await axios.post(
      "https://firestore.googleapis.com/v1/projects/bynexproject/databases/(default)/documents/orders",
      {
        fields: {
          transactionId: { stringValue: transactionId || "N/A" },
          status: { stringValue: status || "UNKNOWN" },
          amount: { integerValue: amount || 0 },
          phone: { stringValue: phone || "N/A" },
          createdAt: { timestampValue: new Date().toISOString() }
        }
      }
    );

    console.log("✅ Order saved to Firestore!");
    res.json({ success: true });
  } catch (error) {
    console.error("❌ Error saving to Firestore:", error.response?.data || error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
