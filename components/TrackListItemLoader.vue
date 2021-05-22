<template>
  <v-sheet class="d-flex flex-no-wrap mb-3">
    <v-skeleton-loader
      class="ma-3"
      min-width="125"
      height="125"
      type="image"
    ></v-skeleton-loader>
    <v-skeleton-loader
      class="ma-3"
      width="500"
      type="sentences"
    ></v-skeleton-loader>
  </v-sheet>
</template>

<script>
export default {
  name: 'TrackListItemLoader',
};
</script>
