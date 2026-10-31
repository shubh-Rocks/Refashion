import express from "express";
import { authorize, isAuthenticated } from "../middlewares/auth.middleware.js";
import { adminController } from "../controller/admin.controller.js";

const router = express.Router();

router.use(isAuthenticated, authorize("ADMIN"));

router.get("/items/pending", adminController.getPendingItems);
router.patch("/items/:id/reject", adminController.rejectItem);
router.patch("/items/:id/approve", adminController.approveItem);

router.get("/users", adminController.getUsers);
router.patch("/users/:id/block", adminController.blockUser);

export default router;
