"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.singUpHandler = singUpHandler;
exports.singUpValidation = singUpValidation;
exports.singUpSanitation = singUpSanitation;
exports.ipLog = ipLog;

/** @type RequestHandler */
function singUpHandler(req, res, next) {
  console.log('singUpHandler Hit');
  res.end('lo');
}

function singUpValidation(req, res, next) {
  console.log('singUpValidation Hit');
  next();
}

function singUpSanitation(req, res, next) {
  console.log('singUpSanitation Hit');
  next();
}
/** @type RequestHandler */


function ipLog(req, res, next) {
  res.end(req.ip);
}