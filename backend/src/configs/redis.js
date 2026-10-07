import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379", {
  maxRetriesPerRequest: null,
  enableReadyCheck: false,
});

redis.on("connect", () => {
  console.log("redis connected sucessfully");
});

redis.on("error", (err) => {
  console.log("redis not connected:", err.message);
});

export default redis;
