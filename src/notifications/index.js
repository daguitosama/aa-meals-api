/**
 * The notification logic service
 * Starup Secuences of Bot and Mailer
 * Bot send handling
 * Emails error send hanlding
 */



import { bot, initBot, sendBotNotification } from 'bot';
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
    var sendBotRes, sendEmailRes;
    sendBotRes = await sendBotNotification({ userName, userPhone, userAddress });
    // bot notification failure
    if (!sendBotRes.ok) {
        sendEmailRes = await sendSingUpErrorMail({ error: sendBotRes.error, userData: sendBotRes.payload.userData });
        if (!sendEmailRes.ok) {
            // log if send emails fails too
            console.error(
                '(send singup error) ',
                ` [${new Date()}] \n`,
                `mailer error: `,
                sendEmailRes.error,
                '\n',
                'bot send error: ',
                sendBotRes.error,
                '\n',
            );
        }

        // pass error up to notification consumers
        // send email errors is a fallback that migth be noticed with a delay
        // client must get errors if bot send fails
        // and show them other way to contact the company on front end
        throw sendBotRes.error;
    }

}