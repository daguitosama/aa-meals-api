import { body, validationResult } from 'express-validator';

const filterUserName = body('userName', 'bad user name').not().isEmpty().escape();
const fitlerUserPhone = body('userPhone', 'bad user phone').isMobilePhone();
const filterUserAddress = body('userAddress', 'bad user address').not().isEmpty().escape();

export  const singUpFilters = [
    filterUserName,
    fitlerUserPhone,
    filterUserAddress,
]

/** @type RequestHandler */
export function singUpHandler(req, res, next) {
    const { userName, userPhone, userAddress } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    res.status(200).json({ result: 'OK', userName, userPhone, userAddress });
}


// test only
/** @type RequestHandler */
export function ipLog(req, res, next) {
    res.end(req.ip)
}