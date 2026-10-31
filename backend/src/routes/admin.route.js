import express from "express";
import { authorize, isAuthenticated } from "../middlewares/auth.middleware.js";
import { adminController } from "../controller/admin.controller.js";

const router = express.Router();

router.use(isAuthenticated, authorize("ADMIN"));

router.get("/items/pending", adminController.getPendingItems);
router.patch("/api/admin/items/:id/reject", adminController.rejectItem);

export default router;
