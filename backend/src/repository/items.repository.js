import prisma from "../configs/prisma.js";

class ItemRepository {
  async findPendingItems(filters = {}) {
    const {
      category,
      condition,
      search,
      searchQuery,
      sort,
      sortOrder,
      startDate,
      endDate,
      page = 1,
      limit = 10,
    } = filters;

    const finalSearch = searchQuery || search;
    const finalSort = sortOrder || sort;

    const where = { status: "PENDING" };

    if (category && category !== "all") {
      where.category = category;
    }

    if (condition && condition !== "all") {
      const normalizedCondition = condition.replace(/-/g, " ");

      where.condition = {
        equals: normalizedCondition,
        mode: "insensitive",
      };
    }

    if (finalSearch && finalSearch.trim() !== "") {
      where.OR = [
        { title: { contains: finalSearch, mode: "insensitive" } },
        { description: { contains: finalSearch, mode: "insensitive" } },
      ];
    }

    if (
      (startDate &&
        startDate !== "undefined" &&
        startDate !== "null" &&
        startDate.trim() !== "") ||
      (endDate &&
        endDate !== "undefined" &&
        endDate !== "null" &&
        endDate.trim() !== "")
    ) {
      where.createdAt = {};

      if (
        startDate &&
        startDate !== "undefined" &&
        startDate !== "null" &&
        startDate.trim() !== ""
      ) {
        where.createdAt.gte = new Date(`${startDate}T00:00:00+05:30`);
      }

      if (
        endDate &&
        endDate !== "undefined" &&
        endDate !== "null" &&
        endDate.trim() !== ""
      ) {
        where.createdAt.lte = new Date(`${endDate}T23:59:59.999+05:30`);
      }
    }

    const sortDirection = finalSort === "Oldest" ? "asc" : "desc";
    const skip = (Number(page) - 1) * Number(limit);
    const take = Number(limit);
    const [items, total] = await Promise.all([
      prisma.item.findMany({
        where,
        orderBy: { createdAt: sortDirection },
        skip,
        take,
        include: {
          user: {
            select: {
              id: true,
              fullname: true,
              email: true,
            },
          },
        },
      }),
      prisma.item.count({ where }),
    ]);

    return {
      items,
      pagination: {
        total,
        totalPages: Math.ceil(total / take),
        currentPage: Number(page),
        limit: take,
      },
    };
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
