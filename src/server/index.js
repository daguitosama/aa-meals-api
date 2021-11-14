const PORT = process.env.API_PORT || 3010;
import Express from 'express';
const app = Express();
import router from '~/server/router';
import { apiLimiter } from '~/server/middleware/index.js';
import helmet from 'helmet';
import morgan from 'morgan';

if(process.env.NODE_ENV != 'production'){
    console.log('env development detected')
    app.use(morgan(':method :url :status  - :response-time ms'))
}

// app settings 
app.set('trust proxy', 1); // behind proxy setting
// general middlewares
app.use(apiLimiter,helmet());
app.use(Express.json());
// api routes
app.use('/api/', router);

export function spinUpServer() {
    app.listen(PORT, () => { console.log('app listening at port:' + PORT) })
}


