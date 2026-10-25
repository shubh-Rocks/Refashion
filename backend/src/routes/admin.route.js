import express from "express";
import { authorize, isAuthenticated } from "../middlewares/auth.middleware.js";
import { adminController } from "../controller/admin.controller.js";

const router = express.Router();

router.use(isAuthenticated, authorize("ADMIN"));

router.get("/items/pending", adminController.getPendingItems);

export default router;
