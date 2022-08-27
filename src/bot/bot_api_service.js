import { telegramIdsStrToArray } from "./utils";
import { $fetch } from "ohmyfetch";

/**
 * Env
 *  */
const ADMINISTRATORS_IDS = process.env.ADMINISTRATORS_IDS;
const SYSTEM_ADMINISTRATOR_IDS = process.env.SYSTEM_ADMINISTRATOR_IDS;
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
/**
 * Globals
 */
var subscribers = null;
var beacon_subscribers = null;
var bot_token = null;
var tb_api_send_msg_url = null;

/**
 * Loads Env for bot api calls
 */
function configure() {
  subscribers = telegramIdsStrToArray(ADMINISTRATORS_IDS);
  beacon_subscribers = telegramIdsStrToArray(SYSTEM_ADMINISTRATOR_IDS);
  bot_token = TELEGRAM_BOT_TOKEN;
  tb_api_send_msg_url = `https://api.telegram.org/bot${bot_token}/sendMessage`;

  console.log("Ready to notify to ", subscribers);
}

async function send_message(chat_id, message) {
  return $fetch(tb_api_send_msg_url, {
    method: "POST",
    // parseResponse: JSON.parse,
    body: {
      chat_id,
      text: message,
      parse_mode: "Markdown",
    },
  });
}

async function send_mass_message(subscribers_ids, message) {
  const send_promises = subscribers_ids.map((id) => {
    return send_message(id, message);
  });

  try {
    await Promise.all(send_promises);
  } catch (error) {
    throw error;
  }
}

async function notify_business_administrators(message) {
  return send_mass_message(subscribers, message);
}

async function notify_beacon() {
  const beacon = [`*aa-meals-api.beacon*`, `[ ${new Date()} ]`].join("\n");
  return send_mass_message(beacon_subscribers, beacon);
}

export const bot = {
  configure,
  notify_business_administrators,
  notify_beacon,
};
