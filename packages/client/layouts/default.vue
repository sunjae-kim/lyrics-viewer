<template>
  <v-app v-resize="onResize">
    <nuxt v-if="isMounted" />
    <Loader v-else />
  </v-app>
</template>

<script>
import { mapActions } from 'vuex';
import Loader from '@/components/Loader';

export default {
  components: { Loader },
  data() {
    return { isMounted: false };
  },
  methods: {
    ...mapActions({ onResize: 'sizes/onResize' }),
  },
  mounted() {
    this.onResize();
    this.isMounted = true;
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
