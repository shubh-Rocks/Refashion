import redis from "../configs/redis.js";

const tokenBucketScript = `
local key = KEYS[1]
local capacity = tonumber(ARGV[1])
local refillRate = tonumber(ARGV[2])
local now = tonumber(ARGV[3])

local bucket = redis.call('HMGET', key, 'tokens', 'lastRefill')
local tokens = tonumber(bucket[1])
local lastRefill = tonumber(bucket[2])

if tokens == nil then
  tokens = capacity
  lastRefill = now
end

local elapsed = now - lastRefill
local refill = elapsed * refillRate
tokens = math.min(capacity, tokens + refill)
lastRefill = now

local allowed = 0
if tokens >= 1 then
  tokens = tokens - 1
  allowed = 1
end

redis.call('HSET', key, 'tokens', tokens, 'lastRefill', lastRefill)
redis.call('EXPIRE', key, 3600)

return { allowed, tokens }
`;

/**
 * @param {number} capacity
 * @param {number} windowSeconds
 */
export const ratelimitter = (capacity = 5, windowSeconds = 60) => {
  const refillRate = capacity / windowSeconds;

  return async (req, res, next) => {
    try {
      // 1. Correct header spelling:
      const ip = req.headers["x-forwarded-for"]?.split(",")[0] || req.ip;
      const key = `req:${req.path}:${ip}`;
      const now = Date.now() / 1000;

      const result = await redis.eval(
        tokenBucketScript,
        1,
        key,
        capacity,
        refillRate,
        now,
      );

      const allowed = result[0] == 1;
      const remaining = Math.floor(result[1]);

      // 3. 'res.setHeader' use kiya:
      res.setHeader("X-RateLimit-Remaining", remaining);

      if (!allowed) {
        return res.status(429).json({
          message: "Too many requests. Please try again later.",
          remaining: 0,
        });
      }

      next();
    } catch (error) {
      console.error("Rate Limitter error:", error.message);
      next();
    }
  };
};
