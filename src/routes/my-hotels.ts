import express from "express";
import { upload } from "../middleware";
import * as ctrl from "../controllers/my-hotels";
import { verifyToken } from "../middleware/auth";

const router = express.Router();

router.post(
  "/",
  verifyToken,
  ctrl.myHotelValidators,
  upload.array("imageFiles", 6),
  ctrl.myHotels
);

router.get("/", verifyToken, ctrl.getMyHotels);

router.get("/:id", verifyToken, ctrl.editMyHotels);

export default router;
