<template>
  <v-container class="track-detail text-center">
    <v-app-bar fixed>
      <v-skeleton-loader v-if="loading" width="300" type="sentences" />
      <v-toolbar-title v-else
        ><span>{{ track.info.trackTitle }}</span>
        <span class="mx-2">-</span>
        <span
          v-for="artist in track.info.artists"
          class="artist-name"
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

    <Loader v-if="loading" />
    <div
      class="lyrics"
      v-else-if="!track.info.isAdult"
      :style="{ fontSize: style.fontSize }"
    >
      <p
        v-for="(line, index) in track.lyrics.lyric.split('\n')"
        :key="`${index}|${line}`"
        :style="{ marginBottom: style.marginBottom }"
      >
        {{ line }}
      </p>
    </div>
    <div v-else class="fixed-center alert">
      <p>청소년 청취불가 노래의 가사는</p>
      <p>현재 지원하지 않습니다 😭</p>
      <p class="mt-4"><a @click="$router.push('/')">돌아가기</a></p>
    </div>
  </v-container>
</template>

<script lang="ts">
import Loader from '@/components/Loader.vue';
import type { TrackState } from '@/store/tracks';
import { mapGetters } from 'vuex';

export default {
  components: { Loader },
  async created(this: Vue) {
    const { trackTitle, trackId } = this.$route.params;
    this.$store.dispatch('tracks/setTrack', { trackTitle, trackId });
  },
  computed: {
    ...mapGetters({ style: 'sizes/style' }),
    track(this: Vue): TrackState['currentTrack'] {
      return this.$store.state.tracks.currentTrack;
    },
    loading(this: Vue): TrackState['loading'] {
      return this.$store.state.tracks.loading;
    },
  },
};
</script>

<style>
/* Override Vuetify */
.v-application p {
  margin: 0;
}

.lyrics > p,
.alert > p {
  font-family: sans-serif;
  word-break: keep-all;
  opacity: 0.8;
}

.alert {
  width: 100%;
  max-width: 80%;
}

.artist-name:not(:last-child)::after {
  display: inline-block;
  content: ',';
}
</style>
