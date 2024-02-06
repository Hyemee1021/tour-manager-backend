import express from "express";
import { insertUser } from "../../models/user/UserModel.js";
import { compairPassword, hashPassword } from "../../utils/bcrypt.js";
import { getUserByEmail } from "../../models/user/UserModel.js";
import { signJWTs } from "../../utils/jwtHelper.js";
const router = express.Router();

//user-signup
router.post("/", async (req, res, next) => {
  try {
    req.body.password = hashPassword(req.body.password);

    const user = await insertUser(req.body);

    if (user?._id) {
      return res.json({
        status: "success",
        message: "The  user has been created successfully",
      });
    }

    res.json({
      status: "error",
      message: "Unable to create the user, try again later",
    });
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error collection")) {
      error.message = "There is already an user used this meail in our system";
      error.errorCode = 200;
    }
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // get user by email
    const user = await getUserByEmail(email);

    if (user?._id) {
      //check if passsword from db and plaintext matches

      const isMatched = compairPassword(password, user.password);

      if (isMatched) {
        // jwts

        const jwts = signJWTs(user.email);

        return res.json({
          status: "success",
          message: "Logined in successfully",
          jwts,
        });
      }
    }

    res.json({
      status: "error",
      message: "Invalid login details",
    });
  } catch (error) {
    next(error);
  }
});
export default router;
