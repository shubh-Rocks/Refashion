import prisma from "../configs/prisma.js";

class ReportRepository {
  async findAllForAdmin({ filters } = {}) {
    const safeFilters = filters ?? {};
    const {
      sort,
      sortOrder,
      search,
      searchQuery,
      startDate,
      endDate,
      page = 1,
      limit = 10,
    } = safeFilters;

    const finalSearch = (searchQuery || search || "").trim();
    const finalSort = sortOrder || sort;

    const where = { status: "PENDING" };

    if (finalSearch) {
      where.OR = [
        { reason: { contains: finalSearch, mode: "insensitive" } },
        { description: { contains: finalSearch, mode: "insensitive" } },
      ];
    }

    const hasStartDate =
      typeof startDate === "string" &&
      startDate.trim() !== "" &&
      startDate !== "undefined" &&
      startDate !== "null";

    const hasEndDate =
      typeof endDate === "string" &&
      endDate.trim() !== "" &&
      endDate !== "undefined" &&
      endDate !== "null";

    if (hasStartDate || hasEndDate) {
      where.createdAt = {};

      if (hasStartDate) {
        where.createdAt.gte = new Date(`${startDate.trim()}T00:00:00+05:30`);
      }

      if (hasEndDate) {
        where.createdAt.lte = new Date(`${endDate.trim()}T23:59:59.999+05:30`);
      }
    }

    const sortDirection = finalSort === "Oldest" ? "asc" : "desc";
    const rawPage =
      typeof page === "string" || typeof page === "number" ? Number(page) : 1;
    const rawLimit =
      typeof limit === "string" || typeof limit === "number"
        ? Number(limit)
        : 10;

    const pageNum = Math.max(1, Number.isFinite(rawPage) ? rawPage : 1);
    const take = Math.max(1, Number.isFinite(rawLimit) ? rawLimit : 10);
    const skip = (pageNum - 1) * take;

    const [reports, total] = await Promise.all([
      prisma.report.findMany({
        where,
        orderBy: { createdAt: sortDirection },
        skip,
        take,
        include: {
          reporter: {
            select: {
              id: true,
              fullname: true,
              email: true,
            },
          },
        },
      }),
      prisma.report.count({ where }),
    ]);

    return {
      reports,
      pagination: {
        total,
        totalPages: Math.ceil(total / take),
        currentPage: pageNum,
        limit: take,
      },
    };
  }

  findById(id) {
    return prisma.report.findUnique({
      where: { id },
      include: {
        reporter: {
          select: {
            id: true,
            fullname: true,
            email: true,
          },
        },
        item: true,
      },
    });
  }

  updateStatus(id, data) {
    return prisma.report.update({
      where: { id },
      data,
    });
  }
}

export const reportRepository = new ReportRepository();
