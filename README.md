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