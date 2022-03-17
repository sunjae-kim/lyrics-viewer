<template>
  <v-app v-resize="onResize">
    <nuxt v-if="isMounted" />
    <Loader v-else />
  </v-app>
</template>

<script lang="ts">
import Loader from '@/components/Loader.vue';
import { localStorageState } from '@/store';
import { debounce } from 'lodash';
import Vue from 'vue';

export default Vue.extend({
  components: { Loader },
  data() {
    return { isMounted: false };
  },
  created() {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', () => {
      if (localStorageState.theme !== 'auto') return;
      this.$vuetify.theme.dark = mediaQuery.matches;
    });

    switch (localStorageState.theme) {
      case 'auto': {
        this.$vuetify.theme.dark = mediaQuery.matches;
        return;
      }
      case 'light': {
        this.$vuetify.theme.dark = false;
        return;
      }
      case 'dark': {
        this.$vuetify.theme.dark = true;
        return;
      }
    }
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
