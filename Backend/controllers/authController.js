import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "./../helpers/authHelper.js";
import JWT from "jsonwebtoken";
import dotenv from "dotenv";
// import nodemailer from "nodemailer";
// import Mailgen from "mailgen";
dotenv.config();
const EMAIL = process.env.EMAIL;
const PASSWORD = process.env.PASSWORD;
export const registerController = async (req, res) => {
  try {
    const { firstName, lastName, email, password, mobileNo, address } =
      req.body;
    //validations
    if (!firstName) {
      return res.send({ message: "First Name is Required" });
    }
    if (!lastName) {
      return res.send({ message: "Last Name is Required" });
    }
    if (!email) {
      return res.send({ message: "Email is Required" });
    }
    if (!password) {
      return res.send({ message: "Password is Required" });
    }
    if (!mobileNo) {
      return res.send({ message: "Mobile no is Required" });
    }
    if (!address) {
      return res.send({ message: "Address is Required" });
    }
    //check user
    const exisitingUser = await userModel.findOne({ email });
    //exisiting user
    if (exisitingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Register please login",
      });
    }
    //register user
    const hashedPassword = await hashPassword(password);
    //save
    const user = await new userModel({
      firstName,
      lastName,
      email,
      mobileNo,
      address,
      password: hashedPassword,
    }).save();

    res.status(201).send({
      success: true,
      message: "User Register Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registeration",
      error,
    });
  }
};

//POST LOGIN
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    //check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registerd",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }
    //token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        mobileNo: user.mobileNo,
        adddress: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

export const forgotPasswordController = (req, res) => {
  // const { email } = req.body;
  // User.findOne({ email }).then((user) => {
  //   if (!user) {
  //     return res.status(400).json({ message: "User not found" });
  //   }
  //   // Generate a random 6-digit OTP
  //   const otp = Math.floor(100000 + Math.random() * 900000).toString();
  //   // Save the OTP and its expiry time in the user document
  //   user.otp = otp;
  //   user.otpExpiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes
  //   user.save().then(() => {
  //     // Send the OTP to the user's email address
  //     const transporter = nodemailer.createTransport({
  //       service: "gmail",
  //       auth: {
  //         user: process.env.GMAIL_USER,
  //         pass: process.env.GMAIL_PASSWORD,
  //       },
  //     });
  //     const mailOptions = {
  //       from: process.env.GMAIL_USER,
  //       to: email,
  //       subject: "Your OTP to reset your password",
  //       text: `Your OTP to reset your password is ${otp}. It will expire in 10 minutes.`,
  //     };
  //     transporter.sendMail(mailOptions, (err, info) => {
  //       if (err) {
  //         console.error(err);
  //         return res.status(500).json({ message: "Failed to send OTP" });
  //       }
  //       console.log(`OTP sent to ${email}: ${otp}`);
  //       res.status(200).json({ message: "OTP sent successfully" });
  //     });
  //   });
  // });
};

//reset-password
export const resetPasswordController = (req, res) => {
  const { email, otp, newPassword } = req.body;

   User.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (user.otp !== otp || user.otpExpiresAt < Date.now()) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // Hash the new password
    bcrypt.hash(newPassword, 10, (err, hash) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Failed to hash password" });
      }

      // Update the user's password
      user.password = hash;
      user.save().then(() => {
        res.status(200).json({ message: "Password reset successfully" });
      });
    });
  });
};

//test controller
export const testController = (req, res) => {
  try {
    res.send("Protected Routes");
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};
