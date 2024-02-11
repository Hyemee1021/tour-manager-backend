import express from "express";

import {
  createTour,
  updateTour,
  deleteTour,
  getSingleTour,
  getAllTour,
  getTourBySearch,
  getFeaturedTour,
  getTourCount,
} from "../controllers/tourController.js";

import { adminAuth } from "../utils/verifyToken.js";

//axios
const router = express.Router();

router.post("/", adminAuth, createTour);

// update  tour
router.put("/:id", adminAuth, updateTour);

// delete tour
router.delete("/:id", adminAuth, deleteTour);

// get single tour
router.get("/:id", getSingleTour);

// get all tours
router.get("/", getAllTour);

//get tour by serach
router.get("/search/getTourBySearch", getTourBySearch);
router.get("/search/getFeaturedTours", getFeaturedTour);
router.get("/search/getTourCount", getTourCount);

export default router;
