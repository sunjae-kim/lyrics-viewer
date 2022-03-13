<template>
  <div class="loader" :style="{ background: isDarkMode ? 'black' : 'white' }">
    <v-progress-circular
      :size="50"
      :color="isDarkMode ? '#f0f0f0' : '#333'"
      indeterminate
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Loader',
  data() {
    return {
      isDarkMode: window.matchMedia('(prefers-color-scheme: dark)').matches,
    };
  },
});
</script>

<style>
.loader {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.8;
  z-index: 5;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
}
</style>
