const functions = require('firebase-functions');
const app = require('express')();
const axios = require('axios');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const whitelist = ['http://localhost:3000', 'https://sunjae.kim'];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

const SEARCH_URL =
  'https://apis.naver.com/vibeWeb/musicapiweb/v3/search/track?sort=RELEVANCE&query=';
const GET_TRACK_INFO_URL = trackId =>
  `https://apis.naver.com/vibeWeb/musicapiweb/track/${trackId}/info`;

app.use(helmet());
app.use(morgan('combined'));

app.get('/', (req, res) => {
  res.send('server is alive');
});

app.get('/getTrackList', cors(corsOptions), async (req, res) => {
  const { query } = req.query;
  const response = await axios.get(encodeURI(SEARCH_URL + query));
  const trackList = response.data.response.result.tracks;
  res.send(trackList);
});

app.get('/getTrackLyrics', cors(corsOptions), async (req, res) => {
  const { trackId } = req.query;
  const response = await axios.get(GET_TRACK_INFO_URL(trackId));
  res.send(response.data.response.result.trackInformation);
});

exports.app = functions.https.onRequest(app);
