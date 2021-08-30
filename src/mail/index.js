/**
 * Nodemailer + Gmail Google API integration service
 * 
 * Tutorial 
 * https://alexb72.medium.com/how-to-send-emails-using-a-nodemailer-gmail-and-oauth2-fe19d66451f9
 */



import { newReplay } from '@d4g0/utils';
const nodemailer = require('nodemailer');
import { google } from 'googleapis'
const OAuth2 = google.auth.OAuth2
const {
    GOOGLE_GMAIL_USER,
    GOOGLE_OATUH_CLIENT_ID,
    GOOGLE_OAUTH_CLIENT_SECRET,
    GOOGLE_AUTH_REFRESH_TOKEN,
    ERROR_NOTIFICATIONS_RECIPIENTS_LIST } = process.env

const RECIPIENTS = [ERROR_NOTIFICATIONS_RECIPIENTS_LIST.split(',')]


/**
 * Nodemailer Transporter Oulet
 */
var TRANSPORT;

export async function initMailer() {

    try {
        const myOAuth2Client = new OAuth2(
            GOOGLE_OATUH_CLIENT_ID,
            GOOGLE_OAUTH_CLIENT_SECRET,
            "https://developers.google.com/oauthplayground"
        );
    
        myOAuth2Client.setCredentials(
            { refresh_token: GOOGLE_AUTH_REFRESH_TOKEN }
        );
        const myAccessToken = await myOAuth2Client.getAccessToken();
    
        TRANSPORT = nodemailer.createTransport({
            logger: process.env.NODE_ENV === 'development' ? true : false,
            socketTimeout: 1e4,
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: GOOGLE_GMAIL_USER, //your gmail account you used to set the project up in google cloud console"
                clientId: GOOGLE_OATUH_CLIENT_ID,
                clientSecret: GOOGLE_OAUTH_CLIENT_SECRET,
                refreshToken: GOOGLE_AUTH_REFRESH_TOKEN,
                accessToken: myAccessToken
            }
        });
    } catch (error) {
        throw error;
    }

    console.log('Transporter up and runing with recipients', RECIPIENTS);
}

export async function sendErrorMailNotification(error) {
    console.log('Sending error...')

    let tranporter = TRANSPORT;
    let mailOptions = {
        from: GOOGLE_GMAIL_USER,
        to: RECIPIENTS,
        subject: 'AA Meals Notifications',
        html: errorToHTML(error),
        text: errorToText(error)
    }
    try {
        const reponse = await tranporter.sendMail(mailOptions);
        console.log('Sended');

        return newReplay(null, "OK", reponse);
    } catch (error) {
        console.log('Send Fail');
        return newReplay(error, "FAIL", null);
    }

}

export function errorToHTML(error) {
    var html = `
    <h1>Error</h1>
    <p> ${new Date()}  </p> <p><b> Message: <b></p> <p>${error.message}</p> <p><b> Code: <b></p> <p>${error.code}</p> <p><b> Stack: <b></p> <p>${error.stack}</p>`

    return html;
}

export function errorToText(error) {
    var text = `
    Error  
       
    ${new Date()} 
    
    Message:
    ${error.message}
    
    Code:
    ${error.code}
    
    Stack:
    ${error.stack}
    
    `

    return text;
}