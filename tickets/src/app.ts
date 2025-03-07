import express from 'express';
import 'express-async-errors'
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

import { errorHandler, NotFoundError } from '@tkt2025/common';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
    cookieSession({
        signed: false,
        secure: process.env.NODE_ENV !== 'test' // if true, cookie shared only thru https. 
    })
);

app.all('*', async () => {
    throw new NotFoundError();
})

app.use(errorHandler);

export { app };