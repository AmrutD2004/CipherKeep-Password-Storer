import {google} from 'googleapis'

const googleClientID = process.env.GOOGLE_CLIENT_ID
const googleSecretID = process.env.GOOGLE_CLIENT_SECRET

export const oauth2client = new google.auth.OAuth2(
    googleClientID,
    googleSecretID,
    'postmessage'
)