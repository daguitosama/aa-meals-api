import Express from 'express';
const router = Express.Router();

import {
    singUpFilters,
    singUpHandler,
    ipLog
} from '~/server/services/SingUp'

// router.use('singup',singUpMiddleware,singUpHandler);
router.route('/singup/')
    // .get((req, res, next) => { res.end('sing up handling') })
    .post(singUpFilters, singUpHandler);














// test only
router.route('/ip/')
    .get(ipLog);



export default router;