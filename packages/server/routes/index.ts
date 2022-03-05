import express from 'express';
import VibeAPI from '../libraries/vibe';
const router = express.Router();

router.get('/getTrackList', async (req, res) => {
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

router.get('/getTrackInfo/:trackId', async (req, res) => {
  const { trackId } = req.params;

  if (!trackId) {
    res.status(400).send('trackId is required');
    return;
  }

  const trackInfo = await VibeAPI.getTrackInfo(trackId);

  res.status(200).send(trackInfo);
});

export default router;
