import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client.ts";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });
const passwordHash = await bcrypt.hash("password123", 12);

const TEST_EMAILS = [
  "maya@test.com",
  "leo@test.com",
  "eva@test.com",
  "nina@test.com",
  "omar@test.com",
  "sofia@test.com",
  "jake@test.com",
  "aisha@test.com",
  "ryan@test.com",
  "lily@test.com",
  "marcus@test.com",
  "zara@test.com",
  "ben@test.com",
  "priya@test.com",
];

const usersData = [
  {
    fullname: "Maya Green",
    email: "maya@test.com",
    role: "USER",
    points: 120,
    isVerified: true,
    isBlocked: false,
    bio: "Love thrift fashion",
  },
  {
    fullname: "Leo Carter",
    email: "leo@test.com",
    role: "USER",
    points: 80,
    isVerified: true,
    isBlocked: false,
  },
  {
    fullname: "Eva Brooks",
    email: "eva@test.com",
    role: "USER",
    points: 200,
    isVerified: true,
    isBlocked: false,
  },
  {
    fullname: "Nina Shah",
    email: "nina@test.com",
    role: "USER",
    points: 50,
    isVerified: true,
    isBlocked: false,
  },
  {
    fullname: "Omar Reyes",
    email: "omar@test.com",
    role: "USER",
    points: 90,
    isVerified: true,
    isBlocked: false,
  },
  {
    fullname: "Sofia Khan",
    email: "sofia@test.com",
    role: "USER",
    points: 150,
    isVerified: true,
    isBlocked: false,
  },
  {
    fullname: "Jake Miller",
    email: "jake@test.com",
    role: "USER",
    points: 40,
    isVerified: true,
    isBlocked: false,
  },
  {
    fullname: "Aisha Patel",
    email: "aisha@test.com",
    role: "USER",
    points: 110,
    isVerified: true,
    isBlocked: false,
  },
  {
    fullname: "Ryan Cooper",
    email: "ryan@test.com",
    role: "USER",
    points: 70,
    isVerified: true,
    isBlocked: true,
  },
  {
    fullname: "Lily Chen",
    email: "lily@test.com",
    role: "USER",
    points: 180,
    isVerified: true,
    isBlocked: false,
  },
  {
    fullname: "Marcus Lee",
    email: "marcus@test.com",
    role: "USER",
    points: 30,
    isVerified: false,
    isBlocked: false,
  },
  {
    fullname: "Zara Ahmed",
    email: "zara@test.com",
    role: "USER",
    points: 95,
    isVerified: true,
    isBlocked: false,
  },
  {
    fullname: "Ben Torres",
    email: "ben@test.com",
    role: "USER",
    points: 60,
    isVerified: true,
    isBlocked: false,
  },
  {
    fullname: "Priya Nair",
    email: "priya@test.com",
    role: "USER",
    points: 140,
    isVerified: true,
    isBlocked: false,
  },
];

const img = {
  blazer: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600",
  denim: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600",
  knit: "https://images.unsplash.com/photo-1576564171120-8f288f3f288f?w=600",
  scarf: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=600",
  navy: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600",
  dress: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600",
  shirt: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600",
  jacket: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600",
  sneakers: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600",
  hoodie: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600",
  skirt: "https://images.unsplash.com/photo-1583490170043-6b2450c0c0c0?w=600",
  coat: "https://images.unsplash.com/photo-1539533113208-f6df8cc3b4c1?w=600",
};

async function main() {
  console.log("Seeding database...");

  // Child tables first
  await prisma.report.deleteMany();
  try {
    await prisma.pointsTransaction.deleteMany();
  } catch (_) {}
  try {
    await prisma.swapRequest.deleteMany();
  } catch (_) {}
  try {
    await prisma.notification.deleteMany();
  } catch (_) {}
  try {
    await prisma.loginHistory.deleteMany();
  } catch (_) {}
  try {
    await prisma.message.deleteMany();
  } catch (_) {}
  try {
    await prisma.conversationParticipant.deleteMany();
  } catch (_) {}
  try {
    await prisma.conversation.deleteMany();
  } catch (_) {}

  await prisma.item.deleteMany();

  // Only remove previous seed users — keep your real admin
  await prisma.user.deleteMany({
    where: { email: { in: TEST_EMAILS } },
  });

  const users = [];
  for (const [index, u] of usersData.entries()) {
    const user = await prisma.user.create({
      data: {
        fullname: u.fullname,
        email: u.email,
        phone: `+120255501${String(index + 1).padStart(2, "0")}`,
        password: passwordHash,
        role: u.role,
        points: u.points,
        isVerified: u.isVerified,
        isBlocked: u.isBlocked,
        bio: u.bio || null,
      },
    });
    users.push(user);
  }
  console.log(`Created ${users.length} test users`);

  const id = (i) => users[i].id;

  const itemsData = [
    {
      title: "Oversized Wool Blazer",
      description: "Warm wool blazer, barely worn. Great for formal wear.",
      category: "Women",
      type: "Blazer",
      size: "M",
      condition: "Like New",
      tags: ["wool", "formal", "winter"],
      images: [img.blazer],
      pointsValue: 80,
      status: "PENDING",
      userId: id(0),
    },
    {
      title: "Raw Denim Trousers",
      description: "Classic raw denim, rigid fit.",
      category: "Men",
      type: "Pants",
      size: "32",
      condition: "Good",
      tags: ["denim", "casual"],
      images: [img.denim],
      pointsValue: 60,
      status: "PENDING",
      userId: id(1),
    },
    {
      title: "Chunky Mohair Knit",
      description: "Soft mohair sweater, cozy and stylish.",
      category: "Women",
      type: "Sweater",
      size: "S",
      condition: "Like New",
      tags: ["knit", "winter"],
      images: [img.knit],
      pointsValue: 55,
      status: "PENDING",
      userId: id(2),
    },
    {
      title: "Vintage Silk Scarf",
      description: "Lightweight silk scarf with floral print.",
      category: "Accessories",
      type: "Scarf",
      size: "One Size",
      condition: "Good",
      tags: ["silk", "vintage"],
      images: [img.scarf],
      pointsValue: 25,
      status: "PENDING",
      userId: id(3),
    },
    {
      title: "Classic Navy Blazer",
      description: "Navy blazer for office and events.",
      category: "Men",
      type: "Blazer",
      size: "L",
      condition: "Good",
      tags: ["formal", "navy"],
      images: [img.navy],
      pointsValue: 70,
      status: "PENDING",
      userId: id(4),
    },
    {
      title: "Summer Floral Dress",
      description: "Light floral dress, perfect for summer.",
      category: "Women",
      type: "Dress",
      size: "M",
      condition: "Like New",
      tags: ["summer", "floral"],
      images: [img.dress],
      pointsValue: 45,
      status: "PENDING",
      userId: id(5),
    },
    {
      title: "Oxford Cotton Shirt",
      description: "White oxford shirt, slim fit.",
      category: "Men",
      type: "Shirt",
      size: "M",
      condition: "Good",
      tags: ["shirt", "office"],
      images: [img.shirt],
      pointsValue: 35,
      status: "APPROVED",
      userId: id(6),
    },
    {
      title: "Leather Biker Jacket",
      description: "Black leather jacket, gently used.",
      category: "Men",
      type: "Jacket",
      size: "L",
      condition: "Good",
      tags: ["leather", "biker"],
      images: [img.jacket],
      pointsValue: 120,
      status: "APPROVED",
      userId: id(7),
    },
    {
      title: "White Sneakers",
      description: "Clean white sneakers, size UK 9.",
      category: "Men",
      type: "Shoes",
      size: "9",
      condition: "Like New",
      tags: ["sneakers", "casual"],
      images: [img.sneakers],
      pointsValue: 50,
      status: "APPROVED",
      userId: id(9),
    },
    {
      title: "Oversized Hoodie",
      description: "Grey oversized hoodie, soft fleece.",
      category: "Unisex",
      type: "Hoodie",
      size: "XL",
      condition: "Good",
      tags: ["hoodie", "casual"],
      images: [img.hoodie],
      pointsValue: 40,
      status: "APPROVED",
      userId: id(11),
    },
    {
      title: "Pleated Midi Skirt",
      description: "Black pleated midi skirt.",
      category: "Women",
      type: "Skirt",
      size: "S",
      condition: "Like New",
      tags: ["skirt", "formal"],
      images: [img.skirt],
      pointsValue: 40,
      status: "REJECTED",
      rejectReason: "Images are unclear. Please reupload clearer photos.",
      userId: id(12),
    },
    {
      title: "Wool Winter Coat",
      description: "Long wool coat for cold weather.",
      category: "Women",
      type: "Coat",
      size: "M",
      condition: "Good",
      tags: ["coat", "winter"],
      images: [img.coat],
      pointsValue: 100,
      status: "APPROVED",
      userId: id(13),
    },
    {
      title: "Striped Casual Shirt",
      description: "Blue striped casual shirt.",
      category: "Men",
      type: "Shirt",
      size: "M",
      condition: "Fair",
      tags: ["casual", "striped"],
      images: [img.shirt],
      pointsValue: 20,
      status: "PENDING",
      userId: id(1),
    },
    {
      title: "Denim Jacket",
      description: "Light wash denim jacket.",
      category: "Unisex",
      type: "Jacket",
      size: "M",
      condition: "Good",
      tags: ["denim", "jacket"],
      images: [img.jacket],
      pointsValue: 55,
      status: "APPROVED",
      userId: id(0),
    },
    {
      title: "Knit Beanie Bundle",
      description: "Two knit beanies, soft wool blend.",
      category: "Accessories",
      type: "Hat",
      size: "One Size",
      condition: "Like New",
      tags: ["beanie", "winter"],
      images: [img.knit],
      pointsValue: 15,
      status: "PENDING",
      userId: id(3),
    },
  ];

  const items = [];
  for (const item of itemsData) {
    const created = await prisma.item.create({ data: item });
    items.push(created);
  }
  console.log(`Created ${items.length} items`);

  const reportsData = [
    {
      reason: "Inappropriate photos",
      description: "Images do not match clothing guidelines.",
      status: "PENDING",
      reporterId: id(1),
      itemId: items[0].id,
    },
    {
      reason: "Spam listing diff",
      description: "Looks like a duplicate spam post.",
      status: "PENDING",
      reporterId: id(2),
      itemId: items[1].id,
    },
    {
      reason: "Wrong category",
      description: "Item tagged incorrectly.",
      status: "PENDING",
      reporterId: id(4),
      itemId: items[4].id,
    },
    {
      reason: "Prohibited item",
      description: "Suspicious condition claims.",
      status: "RESOLVED",
      reporterId: id(5),
      itemId: items[10].id,
    },
    {
      reason: "Misleading description",
      description: "Description does not match photos.",
      status: "DISMISSED",
      reporterId: id(6),
      itemId: items[6].id,
    },
    {
      reason: "Counterfeit concern",
      description: "Brand authenticity unclear.",
      status: "PENDING",
      reporterId: id(7),
      itemId: items[7].id,
    },
  ];

  for (const r of reportsData) {
    await prisma.report.create({ data: r });
  }
  console.log(`Created ${reportsData.length} reports`);

  console.log("\nSeed completed.");
  console.log("--------------------------------");
  console.log("Admin: your existing admin account (unchanged)");
  console.log("Test user: maya@test.com / password123");
  console.log("Blocked:    ryan@test.com / password123");
  console.log("--------------------------------");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
