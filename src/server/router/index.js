import Express from "express";
import { on_lean_singup, on_singup } from "server/handlers/singup";
const router = Express.Router();
import { satus_filter, on_status_request } from "server/handlers/status";
import { ipLog } from "server/handlers/utils";

// temporaly disable full singup flow
router.route("/singup/").post(on_singup);
router.route("/singup-lean/").post(on_lean_singup);

// status monitoring
router.route("/status/").get(satus_filter, on_status_request);

// test only
router.route('/ip/')
    .get(ipLog);

export default router;
