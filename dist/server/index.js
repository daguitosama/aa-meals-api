"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.spinUpServer = spinUpServer;

var _express = _interopRequireDefault(require("express"));

var _router = _interopRequireDefault(require("./router"));

var PORT = process.env.PORT || 3010;
var app = (0, _express["default"])();
app.use('/api/', _router["default"]);

function spinUpServer() {
  app.listen(PORT, function () {
    console.log('app listening at port:' + PORT);
  });
}