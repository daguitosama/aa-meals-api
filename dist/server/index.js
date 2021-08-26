"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.spinUpServer = spinUpServer;

var _express = _interopRequireDefault(require("express"));

var _router = _interopRequireDefault(require("./router"));

var _index = require("./middleware/index.js");

var _helmet = _interopRequireDefault(require("helmet"));

var PORT = process.env.PORT || 3010;
var app = (0, _express["default"])();
// general middlewares
app.use(_index.apiLimiter, (0, _helmet["default"])()); // api routes

app.use('/api/', _router["default"]);

function spinUpServer() {
  app.listen(PORT, function () {
    console.log('app listening at port:' + PORT);
  });
}