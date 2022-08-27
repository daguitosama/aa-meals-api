import rateLimit from "express-rate-limit";
import { $fetch } from "ohmyfetch";

// env
const CAPTCHA_SECRET_KEY = process.env.CAPTCHA_SECRET_KEY;

// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
// app.set('trust proxy', 1);

/**
 * The limiter middleware
 */
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
});

/** @type RequestHandler */
export async function is_valid_captcha_token(req, res, next) {
  const { token } = req.body;
  const GOOGLE_VERIFY_ENDPOINT = `https://www.google.com/recaptcha/api/siteverify`;
  // validate token
  gcRes = await $fetch(GOOGLE_VERIFY_ENDPOINT, {
    method: "POST",
    params: {
      secret: CAPTCHA_SECRET_KEY,
      response: token,
    },
  });
  // throw if validation fails
  if (!gcRes.success) {
    return res
      .status(400)
      .json({ ok: false, error: gcRes["error-codes"].join("\n") });
  }

  next();
}
