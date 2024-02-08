import express from "express";
import * as ctrl from "../controllers/hotels";
import { verifyToken } from "../middleware/auth";

const router = express.Router();

router.get("/search", ctrl.searchHotels);

router.get("/:id", ctrl.hotelValidators, ctrl.getHotel);

router.post(
  "/:hotelId/bookings/payment-intent",
  verifyToken,
  ctrl.paymentIntent
);

router.post("/:hotelId/bookings", verifyToken, ctrl.bookingHotel);

export default router;
