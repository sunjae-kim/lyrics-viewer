<template>
  <v-app v-cloak v-resize="onResize">
    <nuxt />
    <v-footer class="text-center" fixed>
      <v-spacer></v-spacer>
      <v-tooltip v-model="showTooltip" top>
        <template v-slot:activator="{ on }">
          <div v-on="on">
            <span @click="showTooltip = !showTooltip" class="mr-1"
              >&copy; Jason Kim</span
            >
          </div>
        </template>
        <span>kimsj9484@gmail.com</span>
      </v-tooltip>
    </v-footer>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return { showTooltip: false };
  },
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
    width: 750px;
  }
}
</style>
