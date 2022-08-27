import { spinUpServer } from "server";
import { bot } from "~/bot/bot_api_service";
spinUpServer();
bot.configure();
