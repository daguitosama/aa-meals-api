import Express from 'express';
const router = Express.Router();
import {
    singUpHandler,
    singUpValidation,
    singUpSanitation
} from '~/server/services/SingUp'

// router.use('singup',singUpMiddleware,singUpHandler);
router.route('/singup/')
    // .get((req, res, next) => { res.end('sing up handling') })
    .get(singUpSanitation, singUpValidation, singUpHandler)
    .post(singUpSanitation, singUpValidation, singUpHandler);



export default router;