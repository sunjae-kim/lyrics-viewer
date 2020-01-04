<template>
  <v-card
    @click="onRedirectToTrackDetail(track)"
    dark
    class="mb-3 track-list-item"
  >
    <div class="d-flex flex-no-wrap justify-space-between">
      <div>
        <v-card-title
          class="track-list-title font-weight-regular"
          v-text="track.trackTitle"
        ></v-card-title>
        <v-card-subtitle>
          {{ track.artists[0].artistName }}
          <span v-if="track.artists.length > 1">
            외 {{ track.artists.length - 1 }}명
          </span>
        </v-card-subtitle>
      </div>
      <v-avatar class="ma-3" size="125" tile>
        <v-img :src="track.album.imageUrl"></v-img>
      </v-avatar>
    </div>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'TrackListItem',
  props: {
    track: Object,
  },
  methods: {
    ...mapActions({
      onRedirectToTrackDetail: 'tracks/onRedirectToTrackDetail',
    }),
  },
};
</script>

<style>
.track-list-item {
  cursor: pointer;
}
.track-list-title {
  word-break: break-word;
  font-size: calc(80% + 0.2vw);
}
</style>
