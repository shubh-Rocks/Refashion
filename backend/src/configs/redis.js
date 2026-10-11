import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379", {
  maxRetriesPerRequest: null,
  enableReadyCheck: false,
});

const originalSet = redis.set.bind(redis);
redis.set = function (key, value, ...args) {
  if (args.length === 1 && typeof args[0] === "object" && args[0] !== null) {
    if (args[0].EX) return originalSet(key, value, "EX", args[0].EX);
    if (args[0].PX) return originalSet(key, value, "PX", args[0].PX);
  }
  return originalSet(key, value, ...args);
};

redis.on("connect", () => {
  console.log("redis connected sucessfully");
});

redis.on("error", (err) => {
  console.log("redis not connected:", err.message);
});

export default redis;
