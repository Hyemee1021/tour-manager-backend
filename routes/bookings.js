import express from "express";

import { adminAuth, userAuth } from "../utils/verifyToken.js";
import {
  createBooking,
  getAllBooking,
  getBooking,
} from "../controllers/bookingController.js";

const router = express.Router();
//router
router.post("/", userAuth, createBooking);
router.get("/:id", userAuth, getBooking);
router.get("/", adminAuth, getAllBooking);

export default router;
