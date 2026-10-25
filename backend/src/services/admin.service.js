import { itemRepository } from "../repository/items.repository.js";

class AdminService {
  async getPendingItems() {
    const items = await itemRepository.findPendingItems();
    return items;
  }
}

export const adminServices = new AdminService();
