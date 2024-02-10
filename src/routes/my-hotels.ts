import express from "express";
import { upload } from "../middleware";
import * as ctrl from "../controllers/my-hotels";
import { verifyToken } from "../middleware/auth";

const router = express.Router();

router.post(
  "/",
  verifyToken,
  ctrl.myHotelValidators,
  upload.array("imageFiles", 10),
  ctrl.myHotels
);

router.get("/", verifyToken, ctrl.getMyHotels);

router.get("/:id", verifyToken, ctrl.editMyHotels);

router.put(
  "/:hotelId",
  verifyToken,
  upload.array("imageFiles"),
  ctrl.updateHotelImages
);

export default router;
