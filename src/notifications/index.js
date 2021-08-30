/**
 * The notification logic service
 * Starup Secuences of Bot and Mailer
 * Bot send handling
 * Emails error send hanlding
 */



import { bot, initBot, notify as sendBotNotification } from 'bot';
import { initMailer, sendSingUpErrorMail } from 'mail'



export async function initNotifier() {
    try {
        await initBot();
        await initMailer();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

export async function notify({ userName, userPhone, userAddress }) {

    try {
        const sendBotRes = await sendBotNotification({ userName, userPhone, userAddress });
        console.log({ sendBotRes })
        // bot notification failure
        if (!sendBotRes.ok) {
            await sendSingUpErrorMail({ error: sendBotRes.error, userData: sendBotRes.payload.userData });
        }
    } catch (error) {
        console.error(error);
    }

}