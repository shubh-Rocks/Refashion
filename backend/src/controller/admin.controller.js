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
      const item = await adminServices.rejectItems(id, rejectReason);
      res.status(200).json({
        message: "Item rejected successfully",
        item,
      });
    } catch (error) {
      next(error);
    }
  }
}

export const adminController = new AdminController();
