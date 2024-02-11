import express from "express";
import {
  deleteUser,
  getAllUser,
  getSingleUser,
  updateUser,
} from "../controllers/userController.js";

import { adminAuth, userAuth } from "../utils/verifyToken.js";

//axios

const router = express.Router();

// update  user
router.put("/:id", userAuth, updateUser);

// delete user
router.delete("/:id", adminAuth, deleteUser);

// get single user
router.get("/:id", userAuth, getSingleUser);

// get all users
router.get("/", adminAuth, getAllUser);

export default router;
