"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.singUpHandler = singUpHandler;
exports.singUpValidation = singUpValidation;
exports.singUpSanitation = singUpSanitation;

function singUpHandler(req, res, next) {
  console.log('singUpHandler Hit');
}

function singUpValidation() {
  console.log('singUpValidation Hit');
}

function singUpSanitation(params) {
  console.log('singUpSanitation Hit');
}