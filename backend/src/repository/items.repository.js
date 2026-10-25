import prisma from "../configs/prisma.js";

class ItemRepository {
  findPendingItems() {
    return prisma.item.findMany({
      where: { status: "PENDING" },
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: {
            id: true,
            fullname: true,
            email: true,
          },
        },
      },
    });
  }

  findById(id) {
    return prisma.item.findUnique({ where: { id } });
  }

  updateStatus(id, data) {
    return prisma.item.update({
      where: { id },
      data,
    });
  }
}

export const itemRepository = new ItemRepository();
