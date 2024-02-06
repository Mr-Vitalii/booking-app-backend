import express from "express";
import * as ctrl from "../controllers/hotels";

const router = express.Router();

router.get("/search", ctrl.searchHotels);

router.get("/:id", ctrl.hotelValidators, ctrl.getHotel);

export default router;
