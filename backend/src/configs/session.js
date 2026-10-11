import session from "express-session";
import redis from "./redis.js";
import { RedisStore } from "connect-redis";

const sessionMiddleware = session({
  store: new RedisStore({ client: redis }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  name: "refashion.sid",
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV,
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  },
});

export default sessionMiddleware;
