import express from "express";
import cors from "cors";
import bodyParser from "body-parser";


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "20mb" }));
let otpStore = {};
let tokenStore = {};

/* Trigger OTP */
app.post("/trigger-otp", (req, res) => {
  console.log(req.body);
  const { phone, dob } = req.body;

  if (!phone || !dob) {
    return res.status(400).json({ success: false });
  }

  const otp = "123456"; // static for demo
  otpStore[phone] = otp;

  res.json({
    success: true,
    message: "OTP sent",
    otp
  });
});

/* Verify OTP */
app.post("/verify-otp", (req, res) => {
  const { phone, otp } = req.body;
  console.log("/verify-otp",req.body);
  if (otpStore[phone] == otp) {
    const token = "demo-jwt-token";
    tokenStore[token] = phone;

    return res.json({
      success: true,
      token
    });
  }

  res.status(401).json({ success: false });
});

/* Get Loans */
app.get("/loans", (req, res) => {
  // const token = req.headers.authorization?.split(" ")[1];

  // if (!tokenStore[token]) {
  //   return res.status(401).json({ success: false });
  // }

  res.json({
    loans: [
      { loanId: "LN001", type: "Home Loan", amount: 2500000 }
    ]
  });
});


app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});
