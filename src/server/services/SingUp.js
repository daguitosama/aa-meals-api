import { body, validationResult } from 'express-validator';
import { notify } from 'notifications';
import { $fetch } from 'ohmyfetch'


// ENV

const CAPTCHA_SECRET_KEY = process.env.CAPTCHA_SECRET_KEY || '';



// token filter
const validateToken = body('token', 'bad token').not().isEmpty();

// client data
const filterUserName = body('userName', 'bad user name').not().isEmpty().escape();
const fitlerUserPhone = body('userPhone', 'bad user phone').isMobilePhone();
const filterUserAddress = body('userAddress', 'bad user address').not().isEmpty().escape();

export const singUpFilters = [
    validateToken,
    filterUserName,
    fitlerUserPhone,
    filterUserAddress,
]

/** @type RequestHandler */
export async function singUpHandler(req, res, next) {
    var gcRes;
    const { token, userName, userPhone, userAddress } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const GOOGLE_VERIFY_ENDPOINT = `https://www.google.com/recaptcha/api/siteverify`;
    try {
        // validate token
        gcRes = await $fetch(GOOGLE_VERIFY_ENDPOINT, {
            method: 'POST',
            params: {
                secret: CAPTCHA_SECRET_KEY,
                response: token,
            }
        });
        // throw if validation fails
        if (!gcRes.success) {
            throw new Error(gcRes['error-codes'].join('\n'));
        }
        // notify when is valid
        await notify({ userName, userAddress, userPhone });
        return res.status(200).json({ result: 'OK', payload: gcRes });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}


export function reqLogger (req,res,next){
    console.log(req.body);
    next()
}



// test only
/** @type RequestHandler */
export function ipLog(req, res, next) {
    res.end(req.ip)
}