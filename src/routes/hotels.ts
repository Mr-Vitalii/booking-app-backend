import express from "express";
import * as ctrl from "../controllers/hotels";

const router = express.Router();

router.get("/:id", ctrl.hotelValidators, ctrl.getHotel);

router.get("/search", ctrl.searchHotels);

export default router;
