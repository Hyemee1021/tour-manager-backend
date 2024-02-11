import express from "express";
import { createReview } from "../controllers/reviewController.js";
import { userAuth } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/:tourId", userAuth, createReview);

export default router;
