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

// base error send
async function sendErrorMailNotification(error) {

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

        return newReplay(null, "OK", reponse);
    } catch (error) {
        return newReplay(error, "FAIL", null);
    }

}

/**
 * 
 * @param {Object} singUpError 
 * @returns {Object} jsonReplay
 * Sends an email with the costumer data and the error.
 */
export async function sendSingUpErrorMail(singUpError  /*  { error, userData } */) {


    let tranporter = TRANSPORT;
    let mailOptions = {
        from: GOOGLE_GMAIL_USER,
        to: RECIPIENTS,
        subject: 'AA Meals Sing Up Error',
        html: errorToHTML(singUpError),
        text: errorToText(singUpError),
    }
    try {
        const reponse = await tranporter.sendMail(mailOptions);
        return newReplay(null, "OK", reponse);

    } catch (error) {
        return newReplay(error, "FAIL", null);
    }

}

export function errorToHTML(singUpError) {
    var html = `
    <h1>
        Sing Up Error
    </h1>
    <p> 
        ${new Date()}  
    </p> 

    <h2> Costumer Data </h2>
    <p>
        <b> Name: <b>
    </p> 
    <p>
        ${singUpError.userData.userName}
    </p>
    <p>
        <b> Phone: <b>
    </p> 
    <p>
        ${singUpError.userData.userPhone}
    </p>
    <p>
        <b> Address: <b>
    </p> 
    <p>
        ${singUpError.userData.userAddress}
    </p> 
    

    <h2> Error </h2>
    <p>
        <b> Message: <b>
    </p> 
    <p>
        ${singUpError.error}
    </p> 
    `

    return html;
}

export function errorToText(singUpError) {

    var text = `
    Sing Up Error  
       
    ${new Date()} 

    Costumer Data:

    Name:
        ${singUpError.userData.userName}
    Phone:
        ${singUpError.userData.userPhone}
    Address:
        ${singUpError.userData.userAddress}

        
    Error:

    Message:
        ${singUpError.error}
    `

    return text;
}