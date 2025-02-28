import cloudinary from "../libs/cloudinary.js";
import { generateToken } from "../libs/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "password must be atleast 6 characters" });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "email already exist" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashPassword,
    });

    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        profile: newUser.profile,
      });
    } else {
      res.status(400).json({ message: "invalid user data" });
    }
  } catch (error) {
    console.log("error in signing up ", error.message);
    res.status(500).json({ message: "internal server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "invalid credentials" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "invalid credentials" });
    }

    generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profile: user.profile,
    });
  } catch (error) {
    console.log({ error });

    console.log("error in in login controller", error.message);
    res.status(500).json({ message: "internal server error" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "logged out successfully" });
  } catch (error) {
    console.log("error in logging out");
  }
};


export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    const userId = req.user?._id; // Ensure req.user exists

    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    if (!profilePic) {
      return res.status(400).json({ message: "Profile picture is required" });
    }

    console.log("Uploading image to Cloudinary..."); // Debug log
    const uploadResponse = await cloudinary.uploader.upload(profilePic, {
      folder: "profile_pictures",
    });

    if (!uploadResponse.secure_url) {
      return res.status(500).json({ message: "Failed to upload image" });
    }

    console.log("Cloudinary Upload Successful:", uploadResponse.secure_url);

    console.log("Updating user profile in the database..."); // Debug log
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true } // Ensure it returns updated user
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found in database" });
    }

    console.log("User profile updated successfully:", updatedUser);

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("error in checking auth");
  }
};