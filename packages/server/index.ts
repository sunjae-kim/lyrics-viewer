import * as functions from 'firebase-functions';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import router from './routes';
import { corsOptions } from './middlewares/cors';

const app = express();

app.use(helmet());
app.use(morgan('combined'));
app.use(cors(corsOptions));
app.get('/', (_, res) => res.status(200).send('server is alive'));
app.use('/api', router);

exports.app = functions.region('asia-northeast3').https.onRequest(app);
