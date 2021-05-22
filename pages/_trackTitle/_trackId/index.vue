<template>
  <v-container class="track-detail text-center">
    <v-app-bar fixed>
      <v-skeleton-loader v-if="loading" width="300" type="sentences" />
      <v-toolbar-title v-else
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
    <div v-if="!loading" :style="{ fontSize: style.fontSize }">
      <p
        v-for="(line, index) in track.lyrics.lyric.split('\n')"
        class="lyrics"
        :key="`${index}|${line}`"
        :style="{ marginBottom: style.marginBottom }"
      >
        {{ line }}
      </p>
    </div>
    <SizingButton />
    <Loader v-if="loading" />
  </v-container>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import Loader from '@/components/Loader';
import SizingButton from '@/components/SizingButton';

export default {
  async created() {
    const { trackTitle, trackId } = this.$route.params;
    this.$store.dispatch('tracks/setTrack', { trackTitle, trackId });
  },
  components: {
    SizingButton,
    Loader,
  },
  computed: {
    ...mapState({
      track: state => state.tracks.currentTrack,
      loading: state => state.tracks.loading,
    }),
    ...mapGetters({
      style: 'sizes/style',
    }),
  },
};
</script>

<style>
.lyrics {
  font-family: sans-serif;
  color: rgba(255, 255, 255, 0.8);
  word-break: keep-all;
}
</style>
