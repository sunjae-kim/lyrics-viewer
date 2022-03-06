import './utils/resolveModulePath';
import cors from 'cors';
import express from 'express';
import * as functions from 'firebase-functions';
import helmet from 'helmet';
import morgan from 'morgan';
import { corsOptions } from './middlewares/cors';
import router from './routes';

const app = express();

app.use(helmet());
app.use(morgan('combined'));
app.use(cors(corsOptions));
app.get('/', (_, res) => res.status(200).send('server is alive'));
app.use('/api', router);

exports.app = functions.region('asia-northeast3').https.onRequest(app);
