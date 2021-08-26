"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.apiLimiter = void 0;

var _expressRateLimit = _interopRequireDefault(require("express-rate-limit"));

// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
// app.set('trust proxy', 1);

/**
 * The limiter middleware
 */
var apiLimiter = (0, _expressRateLimit["default"])({
  windowMs: 15 * 60 * 1000,
  // 15 minutes
  max: 100
});
exports.apiLimiter = apiLimiter;