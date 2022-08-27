import { bot } from "~/bot/bot_api_service";
import { query, validationResult } from 'express-validator';
const STATUS_END_POINT_PASSWORD = process.env.STATUS_END_POINT_PASSWORD;

/** @type RequestHandler */
export const satus_filter = query('password').not().isEmpty().trim().escape();

/** @type RequestHandler */
export function queryLogger(req, res, next) {
    console.log(req.query);
    next();
}

/** @type RequestHandler */
export async function on_status_request(req, res, next) {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }


    const password = req.query['password'];
    if (!(password == STATUS_END_POINT_PASSWORD)) {
        return res.status(401).end('Fuck you motherfucker');
    }

    try {
        await bot.notify_beacon();
        return res.status(200).json({ status: 'ok' });
    } catch (error) {
        return res.status(500).json({ status: 'down', beaconError: error })
    }
}