<template>
  <v-card @click="onClick" dark class="mb-3 track-list-item">
    <div class="d-flex flex-no-wrap">
      <v-avatar class="ma-3" size="125" tile>
        <v-img :src="track.album.imageUrl"></v-img>
      </v-avatar>
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
    </div>
  </v-card>
</template>

<script>
export default {
  name: 'TrackListItem',
  props: { track: Object },
  methods: {
    onClick: function () {
      const { trackId } = this.track;
      const trackTitle = this.track.trackTitle.replace(/\?/g, '');
      this.$router.push(`/${trackTitle}/${trackId}`);
    },
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
