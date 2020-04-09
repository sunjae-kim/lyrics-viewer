<template>
  <v-app v-resize="onResize">
    <nuxt />
  </v-app>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  methods: {
    ...mapActions({
      onResize: 'sizes/onResize',
    }),
  },
  mounted() {
    this.onResize();
  },
};
</script>

<style>
.container {
  margin-bottom: 36px;
  margin-top: 64px;
}
@media (min-width: 768px) {
  .container {
    width: 750px !important;
  }
}
</style>
