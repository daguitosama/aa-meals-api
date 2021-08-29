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
- 
## Structure
### Arquitecture
-   Api rest interface
-   Telegram Bot notification delivery
-   Emails notifications falback and bot-notifications-failure notifications

### Api Rest
Express based server with the enpoint: 

`/singup/` 

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