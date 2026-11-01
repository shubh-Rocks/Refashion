import express from "express";
import { authorize, isAuthenticated } from "../middlewares/auth.middleware.js";
import { adminController } from "../controller/admin.controller.js";

const router = express.Router();

router.use(isAuthenticated, authorize("ADMIN"));

// items routes
router.get("/items/pending", adminController.getPendingItems);
router.patch("/items/:id/reject", adminController.rejectItem);
router.patch("/items/:id/approve", adminController.approveItem);

// users routes
router.get("/users", adminController.getUsers);
router.patch("/users/:id/block", adminController.blockUser);
router.patch("/users/:id/unblock", adminController.unBlockUser);

// reports routes
router.get("/reports", adminController.getReports);
router.patch("/reports/:id/resolve", adminController.reportResolve);
router.patch("/reports/:id/dismiss", adminController.reportDismiss);

export default router;
