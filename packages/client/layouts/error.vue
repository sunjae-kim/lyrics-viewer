<template>
  <v-app>
    <h1 v-if="error.statusCode === 404">
      {{ pageNotFound }}
    </h1>
    <h1 v-else>
      {{ otherError }}
    </h1>
    <NuxtLink to="/"> Home page </NuxtLink>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  layout: 'empty',
  props: {
    error: { type: Object, default: null },
  },
  data() {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred',
    };
  },
  head() {
    switch (this.error.statusCode) {
      case 404:
        return { title: this.$data.pageNotFound };
      default:
        return { title: this.$data.otherError };
    }
  },
});
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
