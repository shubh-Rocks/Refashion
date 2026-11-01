import prisma from "../configs/prisma.js";

class ReportRepository {
  findAllForAdmin({ skip, take, status } = {}) {
    return prisma.report.findMany({
      where: status ? { status } : undefined,
      skip,
      take,
      orderBy: { createdAt: "desc" },
      include: {
        reporter: {
          select: { id: true, name: true, email: true },
        },
        item: {
          select: {
            id: true,
            title: true,
            status: true,
            images: true,
          },
        },
      },
    });
  }

  countAll(status) {
    return prisma.report.count({
      where: status ? { status } : undefined,
    });
  }

  findById(id) {
    return prisma.report.findUnique({
      where: { id },
      include: {
        reporter: {
          select: {
            id: true,
            name: true,
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
