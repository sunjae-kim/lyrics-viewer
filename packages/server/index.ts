import * as functions from 'firebase-functions';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import VibeAPI from './library/vibe';

const app = express();
const whitelist = ['https://sunjae.kim'];
const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(helmet());
app.use(morgan('combined'));
app.use(cors(corsOptions));

app.get('/', (req, res) => {
  res.send('server is alive');
});

app.get('/getTrackList', async (req, res) => {
  const { query } = req.query;
  if (!query) {
    res.status(400).send('query is required');
    return;
  }

  if (typeof query !== 'string') {
    res.status(400).send('trackId must be string');
    return;
  }

  const trackList = await VibeAPI.getTrackList(query);

  res.status(200).send(trackList);
});

app.get('/getTrackInfo/:trackId', async (req, res) => {
  const { trackId } = req.params;

  if (!trackId) {
    res.status(400).send('trackId is required');
    return;
  }

  const trackInfo = await VibeAPI.getTrackInfo(trackId);

  res.status(200).send(trackInfo);
});

exports.app = functions.region('asia-northeast3').https.onRequest(app);
