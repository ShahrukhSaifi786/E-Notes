import UserModel from "../model/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config.js";

//* ROUTE 1 : Create a User using: POST "/api/auth/signup". No login required

export const signUpUser = async (req, res) => {
  //* data comimg from body(frontend)

  const { name, password, email } = req.body;
  try {
    //* Validation

    if (name && password && email) {
      //* Email Validation

      if (!email.includes("@")) {
        return res.status(400).json({ message: "Enter a valid email" });
      }
      //* Find Unique User with email

      const userExits = await UserModel.findOne({ email });
      if (userExits) {
        return res.status(200).json({ message: "User already exits !" });
      }
      //   Generate salt
      const salt = await bcrypt.genSalt(10);
      //   password Hashed
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = await UserModel({
        name,
        email,
        password: hashedPassword,
      });

      //* Save Data into database

      await newUser.save();
      res.status(201).json({ message: "SignUp Successfully!", newUser });
    } else {
      return res.status(400).json({ message: "All Field are required" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error !!" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (email && password) {
      const user = await UserModel.findOne({ email });
      if (!email.includes("@")) {
        return res.status(400).json({ message: "Invalid Email !" });
      }
      if (!user) {
        return res.status(400).json({ message: "User Not Ragistered !" });
      }
      const isCompare = await bcrypt.compare(password, user.password);
      if (isCompare) {
        const token = jwt.sign(
          { userId: user.id },
          "" + process.env.JWT_SECRET,
          {
            expiresIn: "7d",
          }
        );
        return res
          .status(200)
          .json({ message: "Login Successfully", token, name: user.name });
      } else {
        return res.status(400).json({ message: "Incorrect Password !" });
      }
    } else {
      return res.status(400).json({ message: "All Field are required !" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error !!" });
  }
};

export const getUser = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await UserModel.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error !" });
  }
};
