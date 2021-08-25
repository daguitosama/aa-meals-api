import Express from 'express';
const router = Express.Router();
import {
    singUpHandler,
    singUpValidation,
    singUpSanitation,
    ipLog
} from '~/server/services/SingUp'

// router.use('singup',singUpMiddleware,singUpHandler);
router.route('/singup/')
    // .get((req, res, next) => { res.end('sing up handling') })
    .get(singUpSanitation, singUpValidation, singUpHandler)
    .post(singUpSanitation, singUpValidation, singUpHandler);

router.route('/ip/')
    .get(ipLog);



export default router;