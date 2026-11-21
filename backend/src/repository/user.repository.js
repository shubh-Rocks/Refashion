import prisma from "../configs/prisma.js";

class UserRepository {
  findByEmail(email) {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  findByPhone(phone) {
    return prisma.user.findUnique({
      where: {
        phone,
      },
    });
  }

  createUser(data) {
    return prisma.user.create({
      data,
    });
  }

  verifyUser(email) {
    return prisma.user.update({
      where: {
        email,
      },
      data: {
        isVerified: true,
      },
    });
  }

  createLoginHistory(data) {
    return prisma.loginHistory.create({
      data,
    });
  }

  async findAllForAdmin(filters = {}) {
    const { role, status, search, searchQuery, page = 1, limit = 10 } = filters;

    const finalSearch = searchQuery || search;

    const pageNumber = Number(page) || 0;
    const pageSize = Number(limit) || 10;

    const skip = (pageNumber - 1) * pageSize;

    const where = {};

    if (role && role !== "all") {
      where.role = role;
    }

    if (status && status !== "all") {
      const lowerStatus = status.toLowerCase();
      if (lowerStatus === "blocked") {
        where.isBlocked = true;
      } else if (lowerStatus === "active") {
        where.isBlocked = false;
      }
    }

    if (finalSearch) {
      where.OR = [
        { fullname: { contains: finalSearch, mode: "insensitive" } },
        { email: { contains: finalSearch, mode: "insensitive" } },
      ];
    }

    const [users, totalCount, totalBlockUser] = await Promise.all([
      prisma.user.findMany({
        where,
        skip: skip,
        take: pageSize,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          fullname: true,
          email: true,
          points: true,
          isBlocked: true,
          isVerified: true,
          avatar: true,
          createdAt: true,
        },
      }),
      prisma.user.count({ where }),
      prisma.user.count({
        where: { isBlocked: true },
      }),
      prisma.user.count.apply({
        where:{
          
        }
      })
    ]);

    return {
      users,
      totalBlockUser,
      pagination: {
        total: totalCount,
        page: pageNumber,
        limit: pageSize,
        totalPages: Math.ceil(totalCount / pageSize),
      },
    };
  }

  countAll() {
    return prisma.user.count();
  }

  findById(id) {
    return prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        fullname: true,
        email: true,
        role: true,
        isBlocked: true,
        isVerified: true,
        points: true,
        createdAt: true,
      },
    });
  }

  updateBlockStatus(id, isBlocked) {
    return prisma.user.update({
      where: { id },
      data: { isBlocked },
      select: {
        id: true,
        fullname: true,
        email: true,
        role: true,
        isBlocked: true,
      },
    });
  }
}

export const userRepository = new UserRepository();
