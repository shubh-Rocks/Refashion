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
}

export const userRepository = new UserRepository();
