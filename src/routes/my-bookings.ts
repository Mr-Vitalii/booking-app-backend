import express from "express";
import { verifyToken } from "../middleware/auth";
import * as ctrl from "../controllers/my-bookings";

const router = express.Router();

router.get("/", verifyToken, ctrl.getMyBooking);

export default router;
