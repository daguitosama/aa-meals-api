"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _SingUp = require("../services/SingUp");

var router = _express["default"].Router();

// router.use('singup',singUpMiddleware,singUpHandler);
router.route('/singup/') // .get((req, res, next) => { res.end('sing up handling') })
.post(function (req, res, next) {
  res.end('sing up handling');
});
var _default = router;
exports["default"] = _default;