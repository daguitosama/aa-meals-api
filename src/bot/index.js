
/**
 * I need to decompose bot functionalities to injected in the rest handlers.
 * 
 * So lets:
 * 
 * Spin up a bot singleton instance [DONE]
 * Wrap a in sendNotification  function the bot send message funtionality.
 */



import TelegramBot from "node-telegram-bot-api";
import { telegramIdsStrToArray } from './utils'
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const ADMINISTRATORS_IDS = process.env.ADMINISTRATORS_IDS;

/**
 * The bot singleton instance oulet
 */
export var bot = null;

/**
 * The administrators reference
 */
var administrators = null;

export function initBot() {
    // populate administrators
    administrators = telegramIdsStrToArray(ADMINISTRATORS_IDS);
    // spin up the bot
    bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: true });
    console.log('Bot ready to notify to: ', administrators);
}



export async function notify({ userName = "", userPhone = "", userAddress = "" }) {

    console.log({ location: 'notify', userName, userPhone, userAddress })
    // scape data strings
    userName = scape(userName);
    userPhone = scape(userPhone);
    userAddress = scape(userAddress);
    // create the message
    var message = toClientMessage({ userName, userPhone, userAddress });
    // send message to administrators
    const sendPromises = administrators.map((administratorId) => {
        return sendPromise(administratorId, message);
    });

    // send messages to administators
    try {
        await Promise.all(sendPromises);
    } catch (error) {
        console.log(error)
    }
}

function sendPromise(chatId, message) {
    return new Promise(
        (resolve, reject) => {

            bot.sendMessage(chatId, message, { parse_mode: 'Markdown' })
                .then(_ => {
                    resolve();
                })
                .catch(error => {
                    if (error.code == 'EFATAL') {
                        // handle fatal error
                        // console.log(error)
                    }
                    if (error.code == 'ETELEGRAM') {
                        // handle message error
                        // console.log(error.code, error.message)
                    }
                    reject(error.message)
                })


        }
    )

}


function scape(str, replacer = " ") {
    if (typeof str != "string") {
        str = String(str);
    }
    var unsafeCharsExp = /[_*`\[]/g;

    return str.replace(unsafeCharsExp, replacer);
}

function toClientMessage({ userName, userPhone, userAddress }) {
    return [
        '*New Client*',
        userName,
        userPhone,
        userAddress
    ].join('\n');
}







// defer(
//     () => {
//         bot.on('polling_error', (error) => {
//             console.log(error);  // => 'EFATAL'
//         });
//     }
// )


function defer(fn) {
    if (typeof fn == 'function') {
        setTimeout(fn, 0)
    }

}



// bot.on('message', (msg) => {
//     const chatId = msg.chat.id;
//     console.log({ msg })
//     // send a message to the chat acknowledging receipt of their message
//     // bot.sendMessage(chatId, 'Received your message');
//     const phone = 52558306;
//     const address = '2161 Carriage Lane Sugar Notch PA 	18706';
//     const name = "Lolo Rodriguez";
//     var message = [
//         `*New CLient*`,
//         '😌 -' + name,
//         '📱  ' + phone,
//         '🏠  ' + address,
//     ].join('\n');
//     const markdownUnsafeChars = ['_', '*', '`', '['];
//     function scape(string, charsToScape = []) {

//     }

//     // console.log(message);
//     bot.sendMessage(
//         chatId,
//         msg.text,
//         { parse_mode: 'Markdown' }
//     ).catch(error => {
//         if (error.code == 'EFATAL') {
//             // handle fatal error
//         }
//         if (error.code == 'ETELEGRAM') {
//             // handle message error
//             console.log(error.code, error.message)
//         }
//     });
// });
