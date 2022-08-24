/**
 * I need to decompose bot functionalities to injected in the rest handlers.
 *
 * So lets:
 *
 * Spin up a bot singleton instance [DONE]
 * Wrap a in sendNotification  function the bot send message funtionality.
 */

import { newReplay } from "@d4g0/utils";
import TelegramBot from "node-telegram-bot-api";
import { telegramIdsStrToArray } from "./utils";
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const ADMINISTRATORS_IDS = process.env.ADMINISTRATORS_IDS;
const SYSTEM_ADMINISTRATOR_IDS = process.env.SYSTEM_ADMINISTRATOR_IDS;

/**
 * The bot singleton instance oulet
 */
export var bot = null;

/**
 * The administrators reference
 */
var administrators = null;
var systemAdministrators = null;
export function initBot() {
  // populate administrators
  administrators = telegramIdsStrToArray(ADMINISTRATORS_IDS);
  // populate sys admins
  systemAdministrators = telegramIdsStrToArray(SYSTEM_ADMINISTRATOR_IDS);
  // spin up the bot
  bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: true });
  console.log("Bot ready to notify to: ", administrators);
}

export async function sendBotNotification(form_data) {
  // create the message
  var message = toClientMessage(form_data);
//   console.log({ message });
  // send message to administrators
  const sendPromises = administrators.map((administratorId) => {
    return sendPromise(administratorId, message);
  });
  // send messages to administators
  try {
    await Promise.all(sendPromises);
    return newReplay(null, "OK", null);
  } catch (error) {
    return newReplay(error, "FAIL", { form_data });
  }
}

/**
 *
 * @param {Number} chatId
 * @param {String} message
 * @returns
 *
 * **Hot**
 *
 * This is the functions that wraps the promise with the `bot.sendMessage` one
 */
function sendPromise(chatId, message) {
  return new Promise((resolve, reject) => {
    bot
      .sendMessage(chatId, message, { parse_mode: "Markdown" })
      .then((_) => {
        resolve();
      })
      .catch((error) => {
        // it looks like as default the bot api holds the disconnection errors
        // and resume sending when connection available

        // reject all errors
        reject(error.message);

        // TODO - OLD MENTAL MODEL - INVESTIGATE
        // old mental model
        // // just log non send message errors
        // if (error.code != 'ETELEGRAM') {
        //     // handle fatal error
        //     console.error(error, new Date());
        // }
        // // just reject message related telegram send message api errors ( 400 Bad requests )
        // if (error.code == 'ETELEGRAM') {
        //     // handle message error
        //     // console.log(error.code, error.message)
        //     reject(error.message)
        // }
      });
  });
}

function scape(str, replacer = " ") {
  if (typeof str != "string") {
    str = String(str);
  }
  var unsafeCharsExp = /[_*`\[]/g;
  // to provoque telegram send messages api 400 errors caused by char '_'
  var unsafeCharsExpForErrorTest = /[*`\[]/g;

  return str.replace(unsafeCharsExp, replacer);
}

function toClientMessage(form_data) {
  const nots_str = form_data.menu.nots.reduce((acc, item) => {
    acc = `${acc} ${item},`;
    return acc;
  }, "");

  return `
*New Sing Up*
*Plan:*
${form_data.plan_type}

*Meals:*,
${form_data.meals.frecuence}
${form_data.meals.meals_per_week}

*Not in Menu:*
${nots_str ? nots_str : '---'}


*Costumer:*
${form_data.costumer.name}
${form_data.costumer.phone}
${form_data.costumer.delivery_address}

*Checkout:*

Name
${form_data.checkout.name_on_card}

Card
${form_data.checkout.card_number}

Exp
${form_data.checkout.expiration_date}

CVV
${form_data.checkout.cvv}

ZIP
${form_data.checkout.billing_zip_code}

`;
}

/**
 * Notifies all system administrators with a beacon
 * Thinked for status checks monitoring
 * @returns
 */
export async function botSendBeacon() {
  const beaconMessage = [`*aa-meals-api.beacon*`, `[ ${new Date()} ]`].join(
    "\n"
  );
  // send message to administrators
  const sendPromises = systemAdministrators.map((id) => {
    return sendPromise(id, beaconMessage);
  });
  // send messages to administators
  try {
    await Promise.all(sendPromises);
    return newReplay(null, "OK", null);
  } catch (error) {
    return newReplay(error, "FAIL", null);
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
