import User from "../models/user.schema.js";
import bcrypt from "bcryptjs";
import CustomError from "../utils/customError.js";
import asyncHandler from "../services/asyncHandler.js";

import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
export const signup = async (req, res, next) => {
  try {
    const { email, password, username } = req.body;
    const existingUserByEmail = await User.findOne({ email });
    const existingUserByUsername = await User.findOne({ username });

    if (existingUserByEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    if (existingUserByUsername) {
      return res.status(400).json({ message: "Username already exists" });
    }

    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);

    const newUser = new User({ ...req.body, password: hash });

    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
    res.status(200).json({ token : token,  message: "User created successfully!!" });
    console.log("User created successfully");
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // validation
    if (!email || !password) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Email doesn't exist" });
    }

    const pass = await bcrypt.compare(password, user.password);
    if (!pass) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    const { ...otherDetails } = user._doc;

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({ token, ...otherDetails });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
export const logout = asyncHandler(async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged out",
  });
});
export const getAllUser = asyncHandler(async (req, res) => {
  try {
    const users = await User.find();
    if (User.length === 0) {
      throw new CustomError("User not found", 400);
    } else {
      res.status(200).json(users);
    }
  } catch (error) {
    // console.log("Error:", error);
    // res.status(500).json({ message: "Internal server error" });
    next(error);
  }
});
export const getProfile = asyncHandler(async (req, res) => {
  const { user } = req;

  if (!user) {
    throw new CustomError("User not found", 400);
  }

  res.status(200).json({
    success: true,
    user,
  });
});
export const delUser = asyncHandler(async (req, res) => {
  // const { user } = req;
  try {
    const user = await User.findById(req.params.id);
    if (!user) throw new CustomError("User not found", 400);
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User Removed Sucessfully!!");
    } catch (error) {
      throw new CustomError("User not found", 400);
    }
  } catch (error) {
    throw new CustomError("OOps error occured", 500);
  }
});
export const delAll = asyncHandler(async (req, res) => {
  // const { user } = req;
  try {
    // const user = await User.findById(req.params.id);
    // if (!user) throw new CustomError("User not found", 400);
    try {
      await User.deleteMany();
      res.status(200).json("User Removed Sucessfully!!");
    } catch (error) {
      throw new CustomError("User not found", 400);
    }
  } catch (error) {
    next(error);
  }
});
export const getUser = asyncHandler(async (req, res) => {
  // const { user } = req;
  try {
    const user = await User.findById(req.params.id);
    if (!user) throw new CustomError("User not found", 400);
    else {
      res.status(200).json(user);
    }
  } catch (error) {
    throw new CustomError("User not found", 400);
  }
});
export const updateUser = asyncHandler(async (req, res) => {
  // const { user } = req;
  try {
    // Get product id
    const userId = req.params.id;

    const updateUser = await User.findByIdAndUpdate(
      userId,
      { $set: req.body },
      { new: true } // Return modified document
    );

    if (updateUser) {
      res.status(200).json({
        success: true,
        message: "User Details Updated Successfully",
        data: updateUser,
      });
    } else {
      res.status(404).json({ success: false, message: "Product not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: error.message || "Internal Server Error",
    });
  }
});

// export { signin, signup, getProfile, logout, getAllUser };
