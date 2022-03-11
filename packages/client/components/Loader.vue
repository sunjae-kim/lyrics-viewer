<template>
  <div class="loader">
    <v-progress-circular :size="50" color="white" indeterminate />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({ name: 'Loader' });
</script>

<style>
.loader {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.8;
  background: black;
  z-index: 5;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
}
</style>
