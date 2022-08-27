import { spinUpServer } from "server";
import { initNotifier } from "notifications";
import { bot } from "~/bot/bot_api_service";
spinUpServer();
// initNotifier();
bot.configure();
