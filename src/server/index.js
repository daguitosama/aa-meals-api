const PORT = process.env.PORT || 3010;
import Express from 'express';
const app = Express();
import router from '~/server/router';

app.use('/api/', router);

export function spinUpServer() {
    app.listen(PORT, () => { console.log('app listening at port:' + PORT) })
}


