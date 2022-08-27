import Express from "express";
import { on_lean_singup, on_singup } from "server/handlers/singup";
const router = Express.Router();

import {
  singUpFilters,
  singUpHandler,
  ipLog,
  reqLogger,
} from "~/server/services/SingUp";

import { satusFilter, statusRequestHanlder } from "~/server/services/Status";

router.route("/singup/").post(on_singup);

router.route("/singup-lean/").post(on_lean_singup);


// status monitoring
router.route("/status/").get(satusFilter, statusRequestHanlder);

// test only
// router.route('/ip/')
//     .get(ipLog);

export default router;
