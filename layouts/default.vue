<template>
  <v-app v-resize="onResize">
    <nuxt />
    <v-footer class="text-center" fixed>
      <v-spacer></v-spacer>
      <v-tooltip top>
        <template v-slot:activator="{ on }">
          <div v-on="on">
            <span class="mr-1">&copy; Jason Kim</span>
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
}
@media (min-width: 768px) {
  .container {
    width: 750px;
  }
}
</style>
