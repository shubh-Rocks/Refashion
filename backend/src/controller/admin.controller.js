import { adminServices } from "../services/admin.service.js";

class AdminController {
  async getPendingItems(req, res, next) {
    try {
      const items = await adminServices.getPendingItems();
      res.status(200).json({
        message: "Pending items fetched successfully",
        count: items.length,
        items,
      });
    } catch (error) {
      next(error);
    }
  }

  async rejectItem(req, res, next) {
    try {
      const { id } = req.params;
      const { rejectReason } = req.body;
      const item = await adminServices.rejectItem(id, rejectReason);
      res.status(200).json({
        message: "Item rejected successfully",
        item,
      });
    } catch (error) {
      next(error);
    }
  }

  async approveItem(req, res, next) {
    try {
      const { id } = req.params;
      const item = await adminServices.approveItem(id);
      res.status(200).json({
        message: "Item approved successfully",
        item,
      });
    } catch (error) {
      next(error);
    }
  }

  async getUsers(req, res, next) {
    try {
      const { page, limit } = req.query;
      const result = await adminServices.getUsers(page, limit);
      res.status(200).json({
        message: "Users fetched successfully",
        ...result,
      });
    } catch (error) {
      next(error);
    }
  }

  async blockUser(req, res, next) {
    try {
      const { id } = req.params;
      const adminId = req.session.user.id;

      const user = await adminServices.blockUser(id, adminId);

      res.status(200).json({
        message: "User blocked successfully",
        user,
      });
    } catch (error) {
      next(error);
    }
  }

  async unBlockUser(req, res, next) {
    try {
      const { id } = req.params;
      const user = await adminServices.unBlockUser(id);

      res.status(200).json({
        message: "User unblocked successfully",
        user,
      });
    } catch (error) {
      next(error);
    }
  }

  async getReports(req, res, next) {
    try {
      const { page, limit } = req.query;
      const report = await adminServices.getRepots(page, limit);
      res.status(200).json({
        message: "reports fetched successfully",
        ...report,
      });
    } catch (error) {
      next(error);
    }
  }

  async reportResolve(req, res, next) {
    try {
      const { id } = req.params;
      const report = await adminServices.reportResolve(id);
      res.status(200).json({
        message: "Report resolved successfully",
        report,
      });
    } catch (error) {
      next(error);
    }
  }
  async reportDismiss(req, res, next) {
    try {
      const { id } = req.params;
      const report = await adminServices.reportDismiss(id);
      res.status(200).json({
        message: "Report dismissed successfully",
        report,
      });
    } catch (error) {
      next(error);
    }
  }
}

export const adminController = new AdminController();
