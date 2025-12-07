import User from "../models/userModel.mjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { OAuth2Client } from "google-auth-library";
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Google Login
let GoogleLogin = async (req, res) => {
  try {
    const { token } = req.body; // React se token aayega

    // Token verify karo Google se
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, picture } = payload;

    // Check karo user exist karta hai ya nahi
    let user = await User.findOne({ email });

    if (!user) {
      // Naya user banao
      user = new User({
        username: name,
        email: email,
        image: picture,
        password: bcrypt.hashSync(Math.random().toString(36), 10), // Random password
        isGoogleUser: true, // Optional field
      });
      await user.save();
    }

    // JWT token banao
    const jwtToken = jwt.sign({ user }, process.env.JWT_SECRET, {
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
    const { email, password } = req.body;
    // checking if the user doesn't exist
    let checkUser = await User.findOne({ email: email });
    if (checkUser) {
      // hashing the password

      const checkPassword = bcrypt.compareSync(password, checkUser.password); // true/false
      console.log(checkPassword);
      console.log(checkUser);

      if (checkPassword) {
        const token = await jwt.sign({ checkUser }, process.env.JWT_SECRET, {
          expiresIn: "1h",
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
      subject: "Password Reset Request",
      html: `
        <h2>Fitlytics Password Reset</h2>
        <p>Click the link below to reset your password:</p>
        <a href="${resetLink}">Reset Password</a>
        <p>This link will expire in 1 hour.</p>
      `,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) return res.status(500).json({ message: err.message });
      res
        .status(200)
        .json({ message: "Password reset email sent successfully" });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
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

const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ msg: "Authorization token missing or malformed" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Optionally attach decoded data to request for downstream use
    req.user = decoded;

    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ msg: "Invalid or expired token" });
  }
};

const userController = {
  Signup,
  Login,
  ForgotPassword,
  GoogleLogin,
  ResetPassword,
  auth,
};

export default userController;
