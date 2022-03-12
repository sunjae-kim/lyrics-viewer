<template>
  <v-app v-resize="onResize">
    <nuxt v-if="isMounted" />
    <Loader v-else />
  </v-app>
</template>

<script lang="ts">
import Loader from '@/components/Loader.vue';
import { debounce } from 'lodash';
import Vue from 'vue';

export default Vue.extend({
  components: { Loader },
  data() {
    return { isMounted: false };
  },
  mounted() {
    this.onResize();
    this.isMounted = true;
  },
  methods: {
    onResize: debounce(function (this: Vue) {
      this.$store.dispatch('sizes/onResize');
    }, 200),
  },
});
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
