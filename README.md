# aa_meals notification api

## Instalation
```bash
#install 
yarn 

# build
yarn build

# start
yarn start

```

## TODOS
- [] Safe RegExp api protection
- [] Bot disconnection and other errors handling
- [] Fallback queque to save user data requests to prevent losing  when bot fails
- [] Set a bot.sendMessage timer to reject when connection errors take to long to fix,so it's necesary to falback to email error reporting and replay to front-end quickly.
- [] Refactor Email Falback errors reporting as an standalone endpoind.
- [Done] Set a status check endpoind (to monitoring sending beacons)
## Structure
### Arquitecture
-   Api rest interface
-   Telegram Bot notification delivery
-   Emails notifications falback and bot-notifications-failure notifications

### Api Rest
Express based server with the enpoints: 

#### Singup

POST : `/singup/` 


Expecting a json payload anatomy like
```js
    {
        userPhone:''   // valid phone number
        userEmail:''   // valid email
        userAddress:'' // address 
    }
```

Replays:

On success 200 
```js
{
    result:'OK'
}
```

On bad request 400 
```js
{
    errors:[] // request especific errors
}
```

On internals error 500 
```js
{
    error:'' // request especific errors
}
```


#### Status

GET : `/status/?password=pass`

Password to protect the endpoint. (env variable)

Replays with 

on bad request `400`
on bad password `401`

if authorized trys to send a beacon
and if 

Success returns `200` , `{ status : 'ok' }`
Fails returns `500` , `{ errors : errors }`



## Telegram Bot

Sends notifications messages to specified service administrators `ADMINISTRATORS` env variable.


## Notes

bot message anatomy
```js

var msg: {
    message_id: 9,
    from: {
      id: 974077462,
      is_bot: false,
      first_name: 'Dago',
      username: 'dago_d_havana',
      language_code: 'en'
    },
    chat: {
      id: 974077462,
      first_name: 'Dago',
      username: 'dago_d_havana',
      type: 'private'
    },
    date: 1630178557,
    text: 'hey'
  }
```