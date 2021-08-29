import { spinUpServer } from "server";
import { bot, initBot, notify } from 'bot';

// spinUpServer();
initBot();


var testClientData = {
    userName: 'dago',
    userPhone: 52558306,
    userAddress: '314 Lolapalluza Ave Miami Florida'
};



bot.on('message', onMessage);

function onMessage(msg) {
    notify(testClientData);
}


function defer(fn) {
    if (typeof fn == 'function') {
        setTimeout(fn, 0)
    }
}
