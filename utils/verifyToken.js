import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authenticate = (role) => async (req, res, next) => {
  // Get token from header
  const authToken = req.headers.authorization;

  console.log(authToken);

  //   check if token exist
  if (!authToken || !authToken.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    // Verify token
    const token = authToken.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Check if user has the specified role-find user first

    const user = await User.findById(decoded.id);

    if (user.role !== role) {
      return res
        .status(401)
        .json({ success: false, message: "You're not authorized" });
    }

    req.user = decoded.user;

    next();
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

// Middleware to authenticate admin access
export const adminAuth = authenticate("admin");

// Middleware to authenticate patient access
export const userAuth = authenticate("user");

// const verifyToken = (req, res, next) => {
//   const token = req.cookies.accessToken;

//   if (!token) {
//     return res.status(401).json({
//       success: false,
//       message: "You are not authorized.",
//     });
//   }

//   jwt.verify(token, process.env.JWT_SECRET_KEY, (error, user) => {
//     if (error) {
//       return res.status(401).json({
//         success: false,
//         message: "Token is invalid",
//       });
//     }

//     req.user = user;
//     next();
//   });
// };

// export const verifyUser = (req, res, next) => {
//   verifyToken(req, res, next, () => {
//     if (req.user.id === req.params.id || req.user.role === "admin") {
//       next();
//     } else {
//       return res.status(401).json({
//         success: false,
//         message: "You are not authenticated.",
//       });
//     }
//   });
// };

// export const verifyAdmin = (req, res, next) => {
//   verifyToken(req, res, next, () => {
//     if (req.user.role === "admin") {
//       next();
//     } else {
//       return res.status(401).json({
//         success: false,
//         message: "You are not authorized.",
//       });
//     }
//   });
// };
