<template>
  <v-container class="text-center">
    <div :style="style">
      <h2 class="font-weight-regular">{{ track.info.trackTitle }}</h2>
      <div class="artists mt-3 mb-10">
        <span
          class="pr-3"
          v-for="artist in track.info.artists"
          :key="artist.artistId"
        >
          {{ artist.artistName }}
        </span>
      </div>
      <span class="lyrics font-weight-light">{{ track.lyrics.lyric }}</span>
    </div>

    <div class="fixed-btns">
      <v-btn
        :small="windowSize.x < 768"
        class="fixed-btn mr-1"
        fab
        @click="scaleUp"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <v-btn
        :small="windowSize.x < 768"
        class="fixed-btn"
        fab
        @click="scaleDown"
      >
        <v-icon>mdi-minus</v-icon>
      </v-btn>
    </div>
  </v-container>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import { getTrackInfo, getTrackLyrics } from '@/api';

export default {
  computed: {
    ...mapState({
      track: state => state.tracks.currentTrack,
      windowSize: state => state.sizes.windowSize,
    }),
    ...mapGetters({
      style: 'sizes/style',
    }),
  },
  methods: {
    ...mapActions({
      scaleUp: 'sizes/scaleUp',
      scaleDown: 'sizes/scaleDown',
    }),
  },
  async middleware({ store, params }) {
    if (process.server) {
      const { trackTitle, trackId } = params;
      const info = await getTrackInfo(trackTitle, trackId);
      const lyrics = await getTrackLyrics(trackId);
      const [setCurrentTrack] = store._mutations['tracks/setCurrentTrack'];
      setCurrentTrack({ info, lyrics });
    }
  },
};
</script>

<style scoped>
.lyrics {
  font-family: sans-serif;
  white-space: pre-wrap;
  color: rgba(255, 255, 255, 0.8);
}
.artists {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.artists > span:last-child {
  padding: 0px !important;
}
.fixed-btns {
  position: fixed;
  bottom: 15px;
  z-index: 5;
}
</style>
