<template>
  <v-container class="track-detail text-center">
    <v-app-bar fixed>
      <v-toolbar-title
        ><span class="mr-2">{{ track.info.trackTitle }}</span> ⎯
        <span
          class="ml-2"
          v-for="artist in track.info.artists"
          :key="artist.artistId"
        >
          {{ artist.artistName }}
        </span></v-toolbar-title
      >
      <v-spacer></v-spacer>
      <v-btn @click="$router.push('/')" icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-app-bar>
    <div :style="{ fontSize: style.fontSize }">
      <p
        v-for="(line, index) in track.lyrics.lyric.split('\n')"
        class="lyrics"
        :key="`${index}|${line}`"
        :style="{ marginBottom: style.marginBottom }"
      >
        {{ line }}
      </p>
    </div>
    <SizingButton></SizingButton>
  </v-container>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { getTrackInfo, getTrackLyrics } from '@/api';
import SizingButton from '@/components/SizingButton';

export default {
  components: {
    SizingButton,
  },
  computed: {
    ...mapState({
      track: state => state.tracks.currentTrack,
      windowSize: state => state.sizes.windowSize,
    }),
    ...mapGetters({
      style: 'sizes/style',
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
  color: rgba(255, 255, 255, 0.8);
  word-break: keep-all;
}
</style>
