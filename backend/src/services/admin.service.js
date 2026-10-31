import { itemRepository } from "../repository/items.repository.js";

class AdminService {
  async getPendingItems() {
    const items = await itemRepository.findPendingItems();
    return items;
  }

  async rejectItem(id, rejectReason) {
    const item = await itemRepository.findById(id);
    if (!item) {
      throw new Error("Item not found");
    }

    if (item.status !== "PENDING") {
      throw new Error("Only pending items can be rejected");
    }

    const updated = await itemRepository.updateStatus(id, {
      status: "REJECTED",
      rejectReason,
    });
    return updated;
  }

  async approveItem(id) {
    const item = await itemRepository.findById(id);
    if (!item) {
      throw new Error("item not found");
    }

    if (item.status !== "PENDING") {
      throw new Error("Only pending items can be approved");
    }

    const updated = await itemRepository.updateStatus(id, {
      status: "APPROVED",
    });
    return updated;
  }
}

export const adminServices = new AdminService();
