import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379", {
  maxRetriesPerRequest: null,
  enableReadyCheck: false,
});

const originalSet = redis.set.bind(redis);
redis.set = function (key, value, ...args) {
  if (typeof args[0] === "object" && args[0] !== null) {
    const opts = args[0];
    const cb = typeof args[1] === "function" ? args[1] : undefined;
    const extra = [];

    if (opts.EX) extra.push("EX", opts.EX);
    if (opts.PX) extra.push("PX", opts.PX);
    if (cb) extra.push(cb);

    return originalSet(key, value, ...extra);
  }
  return originalSet(key, value, ...args);
};

redis.on("connect", () => {
  console.log("redis connected successfully");
});

redis.on("error", (err) => {
  console.log("redis not connected:", err.message);
});

export default redis;
