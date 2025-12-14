import User from "../models/userModel.mjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { OAuth2Client } from "google-auth-library";
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

let GoogleLogin = async (req, res) => {
  try {
    const { token } = req.body;

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, picture } = payload;

    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        username: name,
        email: email,
        image: picture,
        password: bcrypt.hashSync(Math.random().toString(36), 10),
        isGoogleUser: true,
      });
      await user.save();
    }

    // ✅ BAS YE LINE CHANGE KARO - "checkUser" use karo
    const jwtToken = jwt.sign({ checkUser: user }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      message: "Google login successful",
      user: user,
      token: jwtToken,
    });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ message: "Google login failed", error: error.message });
  }
};

// Sigun up
let Signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user exists
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      return res.status(200).json({
        message: "User already exists with this email. Please login.",
      });
    }

    // Hash password
    const hashPassword = bcrypt.hashSync(password, 10);

    // Image from CloudinaryStorage
    let imageUrl = "";
    if (req.file) {
      imageUrl = req.file.path; // Cloudinary secure_url
      console.log("Uploaded Image URL:", imageUrl);
    }

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashPassword,
      image: imageUrl,
    });

    const savedUser = await newUser.save();

    res.status(200).json({
      message: "Registration successful.",
      user: savedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
//login
let Login = async (req, res) => {
  try {
    const { email, password, rememberMe } = req.body; // ✅ rememberMe add kiya

    let checkUser = await User.findOne({ email: email });
    if (checkUser) {
      const checkPassword = bcrypt.compareSync(password, checkUser.password);
      console.log(checkPassword);
      console.log(checkUser);

      if (checkPassword) {
        // ✅ Remember me ke basis pe expiry set karo
        const expiresIn = rememberMe ? "7d" : "1h";

        const token = await jwt.sign({ checkUser }, process.env.JWT_SECRET, {
          expiresIn: expiresIn,
        });
        console.log(token);
        res.status(200).json({
          message: "Login success...!",
          user: checkUser,
          token: token,
        });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    } else {
      res.status(404).json({ message: "User not found. Please Signup..!" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// ----------------------------- Forgot Password -----------------------------

let ForgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Create a JWT token for password reset
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Send reset password email
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // FRONTEND LINK (React page) with query param
    const resetLink = `http://localhost:5173/reset-password?token=${token}`;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Reset Your Fitlytics Password",
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Reset Password</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: 'Inter', sans-serif;
    }

    body {
      background: #EFEFF1;
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px;
    }

    .card {
      max-width: 500px;
      width: 100%;
      background: #ffffff;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      border: 1px solid #f1f5f9;
    }

    .header {
      background: linear-gradient(135deg, #a3e635 0%, #84cc16 100%);
      padding: 30px;
      text-align: center;
    }

    .logo-container {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 12px;
      margin-bottom: 8px;
    }

    .logo-container img {
      width: 32px;
      height: 32px;
      filter: brightness(0) saturate(100%) invert(15%) sepia(8%) saturate(1433%) hue-rotate(187deg) brightness(95%) contrast(92%);
    }

    .logo-text {
      font-size: 28px;
      font-weight: 700;
      color: #1e293b;
      letter-spacing: -0.5px;
    }

    .header-subtitle {
      color: #475569;
      font-size: 14px;
      font-weight: 400;
    }

    .content {
      padding: 50px 40px;
      text-align: center;
    }

    .icon-wrapper {
      width: 100px;
      height: 100px;
      background: linear-gradient(135deg, #a3e635 0%, #84cc16 100%);
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 auto 30px;
      box-shadow: 0 4px 12px rgba(163, 230, 53, 0.3);
    }

    .icon-wrapper img {
      width: 50px;
      height: 50px;
      filter: brightness(0) invert(1);
    }

    h2 {
      font-size: 28px;
      color: #1e293b;
      margin-bottom: 16px;
      font-weight: 700;
      letter-spacing: -0.5px;
    }

    .description {
      color: #64748b;
      font-size: 15px;
      line-height: 1.7;
      margin-bottom: 35px;
    }

    .btn {
      background: linear-gradient(135deg, #a3e635 0%, #84cc16 100%);
      color: #1e293b;
      padding: 16px 48px;
      border-radius: 10px;
      display: inline-block;
      text-decoration: none;
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 25px;
      transition: all 0.3s ease;
      box-shadow: 0 2px 8px rgba(163, 230, 53, 0.3);
      letter-spacing: 0.3px;
    }

    .btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(163, 230, 53, 0.4);
      background: linear-gradient(135deg, #84cc16 0%, #65a30d 100%);
    }

    .help-text {
      font-size: 13px;
      color: #94a3b8;
      line-height: 1.6;
      margin-top: 25px;
      padding-top: 25px;
      border-top: 1px solid #e2e8f0;
    }

    .help-text strong {
      color: #64748b;
      font-weight: 600;
    }

    .footer {
      background: #f8fafc;
      padding: 25px 40px;
      text-align: center;
      border-top: 1px solid #e2e8f0;
    }

    .footer-links {
      margin-bottom: 12px;
    }

    .footer-links a {
      color: #0ea5e9;
      text-decoration: none;
      font-size: 13px;
      font-weight: 500;
      margin: 0 12px;
      transition: color 0.3s ease;
    }

    .footer-links a:hover {
      color: #0284c7;
    }

    .footer-text {
      font-size: 12px;
      color: #94a3b8;
      margin-top: 12px;
    }

    @media (max-width: 500px) {
      .content {
        padding: 40px 25px;
      }

      h2 {
        font-size: 24px;
      }

      .btn {
        padding: 14px 36px;
        font-size: 15px;
      }
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <div class="logo-container">
        <img src="https://cdn-icons-png.flaticon.com/512/1828/1828479.png" alt="Fitlytics Logo" />
        <span class="logo-text">Fitlytics</span>
      </div>
      <p class="header-subtitle">Your Fitness Journey Partner</p>
    </div>

    <div class="content">
      <div class="icon-wrapper">
        <img src="https://cdn-icons-png.flaticon.com/512/3064/3064197.png" alt="Lock Icon" />
      </div>

      <h2>Reset Your Password</h2>

      <p class="description">
        We received a request to reset your password. Click the button below to create a new password for your Fitlytics account.
      </p>

      <a href=${resetLink} class="btn">Reset Password</a>

      <div class="help-text">
        <strong>Need help?</strong><br>
        If you didn't request a password reset, please ignore this email or contact our support team at <strong>support@fitlytics.com</strong>
      </div>
    </div>

    <div class="footer">
      <div class="footer-links">
        <a href="#">Privacy Policy</a>
        <span style="color: #cbd5e1;">•</span>
        <a href="#">Terms of Service</a>
        <span style="color: #cbd5e1;">•</span>
        <a href="#">Help Center</a>
      </div>
      <p class="footer-text">
        © 2024 Fitlytics. All rights reserved.
      </p>
    </div>
  </div>
</body>
</html>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({
      success: true,
      message: "Password reset email sent successfully",
    });
  } catch (error) {
    console.log("Error in ForgotPassword:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send password reset email",
    });
  }
};

// ----------------------------- Reset Password -----------------------------

let ResetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    const hashedPassword = bcrypt.hashSync(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Invalid or expired token" });
  }
};

// Authentication Middleware

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ SAHI: User object ko directly set karo
    req.user = decoded.checkUser; // Ya decoded.user (jo bhi JWT mein hai)

    console.log("✅ User set:", req.user._id); // Ab _id milega

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    next();
  } catch (error) {
    console.error("❌ Auth error:", error.message);
    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};
// =======================================================
//           PROFILE: GET CURRENT USER
// =======================================================
const getProfile = async (req, res) => {
  try {
    const userId = req.user;
    // console.log(userId);
    if (!userId) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // frontend "fullname" use kar raha hai, yahan username map kar diya
    res.status(200).json({
      fullname: user.username,
      email: user.email,
      image: user.image,
      role: user.role,
    });
  } catch (err) {
    console.error("Get profile error:", err);
    res
      .status(500)
      .json({ message: "Error loading profile", error: err.message });
  }
};

// =======================================================
//           PROFILE: UPDATE CURRENT USER
// =======================================================
const updateProfile = async (req, res) => {
  try {
    const userId = req.user;
    if (!userId) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const { fullname, email, password } = req.body;
    const updateData = {};

    if (fullname) updateData.username = fullname;

    if (email) {
      // ensure email unique
      const exists = await User.findOne({ email, _id: { $ne: userId } });
      if (exists) {
        return res
          .status(400)
          .json({ message: "Another account already uses this email." });
      }
      updateData.email = email;
    }

    if (password && password.trim().length > 0) {
      updateData.password = bcrypt.hashSync(password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    });

    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });

    res.status(200).json({
      message: "Profile updated successfully",
      fullname: updatedUser.username,
      email: updatedUser.email,
      image: updatedUser.image,
      role: updatedUser.role,
    });
  } catch (err) {
    console.error("Update profile error:", err);
    res
      .status(500)
      .json({ message: "Error updating profile", error: err.message });
  }
};
const userController = {
  Signup,
  Login,
  ForgotPassword,
  GoogleLogin,
  ResetPassword,
  authMiddleware,
  getProfile,
  updateProfile,
};

export default userController;
