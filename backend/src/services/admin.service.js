import { itemRepository } from "../repository/items.repository.js";
import { userRepository } from "../repository/user.repository.js";

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

  async getUsers(page = 1, limit = 10) {
    const pageNum = Math.max(1, Number(page) || 1);
    const listNum = Math.min(50, Math.max(1, Number(limit) || 10));
    const skip = (pageNum - 1) * listNum;

    const [users, total] = await Promise.all([
      userRepository.findAllForAdmin({
        skip,
        take: listNum,
      }),
    ]);

    return {
      users,
      pagination: {
        page: pageNum,
        limit: listNum,
        total,
        totalPages: Math.ceil(total / listNum) || 1,
      },
    };
  }

  async blockUser(id, adminId) {
    const user = await userRepository.findById(id);

    if (!user) {
      throw new Error("user not found");
    }

    if (user.id === adminId) {
      throw new Error("You cannot block yourself");
    }

    if (user.role === "ADMIN") {
      throw new Error("Cannot block an admin user");
    }

    if (user.isBlocked) {
      throw new Error("User is already blocked");
    }

    return userRepository.updateBlockStatus(id, true);
  }

  async unBlockUser(id) {
    const user = await userRepository.findById(id);
    if (!user) {
      throw new Error("User not found");
    }

    if (!user.isBlocked) {
      throw new Error("User is not blocked");
    }

    return userRepository.updateBlockStatus(id, false);
  }
}

export const adminServices = new AdminService();
