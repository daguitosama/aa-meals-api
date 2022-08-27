import Express from "express";
import { on_singup } from "server/handlers/singup";
const router = Express.Router();

import {
  singUpFilters,
  singUpHandler,
  ipLog,
  reqLogger,
} from "~/server/services/SingUp";

import { satusFilter, statusRequestHanlder } from "~/server/services/Status";



router
  .route("/singup/")
  // .get((req, res, next) => { res.end('sing up handling') })
  .post(
    // reqLogger,
    // singUpFilters,
    singUpHandler
  );

router
  .route("/singup-v2/")
  .post(
    on_singup
  );

// status monitoring
router.route("/status/").get(satusFilter, statusRequestHanlder);

// test only
// router.route('/ip/')
//     .get(ipLog);

export default router;
