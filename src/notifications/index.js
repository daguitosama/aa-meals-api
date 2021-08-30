/**
 * The notification logic service
 * Starup Secuences of Bot and Mailer
 * Bot send handling
 * Emails error send hanlding
 */



import { bot, initBot, notify as botNotify } from 'bot';
import { errorToHTML, errorToText, initMailer, sendErrorMailNotification } from 'mail'



export async function initNotifier(params) {
    try {
       await initBot();
       await initMailer();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

export async function notify() { }