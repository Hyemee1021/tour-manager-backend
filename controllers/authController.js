import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//user Registeration
export const register = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash, //store hashing pw in data
      photo: req.body.photo,
    });

    await newUser.save();

    res.status(200).json({
      success: true,
      message: "Successfully created",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to  create",
    });
  }
};

//user login
export const login = async (req, res) => {
  const email = req.body.email;
  console.log(email);

  try {
    const user = await User.findOne({ email });

    //if user doesnt exist
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    //if use is exist, then check the password with hash password
    console.log(user);

    const checkCorrectPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    //psaaword is not correct
    if (!checkCorrectPassword) {
      return res.status(401).json({
        success: false,
        message: "Incorrect email or password",
      });
    }

    const { password, role, ...rest } = user._doc;

    //create jwt token
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "15d" }
    );

    //set token  in the browser
    res
      .cookie("accessToken", token, {
        httpOnly: true,
        expires: token.expiresIn,
      })
      .status(200)
      .json({
        token,

        role,

        data: { ...rest },
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
