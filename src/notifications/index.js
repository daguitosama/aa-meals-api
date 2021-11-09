/**
 * The notification logic service
 * Starup Secuences of Bot and 
 * Bot send handling
 * Emails error send hanlding
 */



import { bot, initBot, sendBotNotification, botSendBeacon } from 'bot';



export async function initNotifier() {
    try {
        await initBot();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

export async function notify({ userName, userPhone, userAddress }) {
    var sendBotRes;
    sendBotRes = await sendBotNotification({ userName, userPhone, userAddress });
    // bot notification failure
    if (!sendBotRes.ok) {
        throw sendBotRes.error;
    }
}

export async function sendBeacon() {
    var sendBotRes;
    sendBotRes = await botSendBeacon();
    // bot notification failure
    if (!sendBotRes.ok) {
        throw sendBotRes.error;
    }
}