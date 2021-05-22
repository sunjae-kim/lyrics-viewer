const functions = require('firebase-functions');
const app = require('express')();
const axios = require('axios');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const SEARCH_URL =
  'https://apis.naver.com/vibeWeb/musicapiweb/v3/search/track?sort=RELEVANCE&query=';
const GET_TRACK_INFO_URL = trackId =>
  `https://apis.naver.com/vibeWeb/musicapiweb/track/${trackId}/info`;

app.use(helmet());
app.use(cors());
app.use(morgan('combined'));

app.get('/', (req, res) => {
  res.send('server is alive');
});

app.get('/getTrackList', async (req, res) => {
  const { query } = req.query;
  const response = await axios.get(encodeURI(SEARCH_URL + query));
  const trackList = response.data.response.result.tracks;
  res.send(trackList);
});

app.get('/getTrackLyrics', async (req, res) => {
  const { trackId } = req.query;
  const response = await axios.get(GET_TRACK_INFO_URL(trackId));
  res.send(response.data.response.result.trackInformation);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`the server is listening on PORT ${PORT}.`);
});

exports.app = functions.https.onRequest(app);
