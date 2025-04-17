import { Router } from "express";
import { protect } from "../Middlewares/authMiddleware.js";
import { getCafeLocations } from "../controllers/cafeController.js";
const router = Router();

router.post("/water", protect, getCafeLocations);
router.post("/HydraTracking");

export default router;
