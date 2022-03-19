<template>
  <div class="sizing-btns" @click="sheet = !sheet">
    <v-btn :small="isMobile" :dark="$vuetify.theme.dark" fab>
      <v-icon :small="isMobile">mdi-tune</v-icon>
    </v-btn>
    <v-bottom-sheet v-model="sheet">
      <v-sheet class="text-center" height="11rem">
        <v-row class="pt-3">
          <v-col v-if="onLyricsViewer">
            <h4 class="py-3">Text Size</h4>
            <v-btn
              @click="fontSize > -20 && setFontSize(fontSize - 5)"
              :small="isMobile"
              :dark="$vuetify.theme.dark"
              fab
            >
              <v-icon :small="!isMobile" :x-small="isMobile"
                >mdi-format-letter-case</v-icon
              >
            </v-btn>
            <v-btn
              :class="{ 'ml-3': !isMobile }"
              @click="fontSize < 20 && setFontSize(fontSize + 5)"
              :small="isMobile"
              :dark="$vuetify.theme.dark"
              fab
            >
              <v-icon :small="isMobile">mdi-format-letter-case</v-icon>
            </v-btn>
          </v-col>

          <v-col v-if="onLyricsViewer">
            <h4 class="py-3">Line Spacing</h4>
            <v-btn
              @click="marginBottom > -20 && setMarginBottom(marginBottom - 5)"
              :small="isMobile"
              :dark="$vuetify.theme.dark"
              fab
            >
              <v-icon :small="!isMobile" :x-small="isMobile"
                >mdi-format-line-spacing</v-icon
              >
            </v-btn>
            <v-btn
              :class="{ 'ml-3': !isMobile }"
              @click="marginBottom < 20 && setMarginBottom(marginBottom + 5)"
              :small="isMobile"
              :dark="$vuetify.theme.dark"
              fab
            >
              <v-icon :small="isMobile">mdi-format-line-spacing</v-icon>
            </v-btn>
          </v-col>

          <v-col>
            <h4 class="py-3">Change Mode</h4>
            <v-btn
              @click="toggleDarkMode"
              :small="isMobile"
              :dark="$vuetify.theme.dark"
              fab
            >
              <v-icon :small="isMobile">mdi-theme-light-dark</v-icon>
            </v-btn>
            <v-btn
              @click="setAutoMode"
              :small="isMobile"
              :dark="$vuetify.theme.dark"
              fab
            >
              auto
            </v-btn>
          </v-col>
        </v-row>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>

<script lang="ts">
import { localStorageState } from '@/store';
import { SizeState } from '@/store/sizes';
import Vue from 'vue';
import { mapMutations, mapGetters } from 'vuex';

export default Vue.extend({
  mounted() {
    console.log(this.$route);
  },
  name: 'SizingButtons',
  data() {
    return { sheet: false };
  },
  computed: {
    ...mapGetters({ isMobile: 'sizes/isMobile' }),
    fontSize(this: Vue): SizeState['fontSize'] {
      const { fontSize } = this.$store.state.sizes;
      return this.$store.state.sizes.fontSize;
    },
    marginBottom(this: Vue): SizeState['marginBottom'] {
      return this.$store.state.sizes.marginBottom;
    },
    onLyricsViewer() {
      return !!this.$route.params.trackId;
    },
  },
  methods: {
    ...mapMutations({
      setFontSize: 'sizes/setFontSize',
      setMarginBottom: 'sizes/setMarginBottom',
    }),
    toggleDarkMode() {
      localStorageState.theme = this.$vuetify.theme.dark ? 'light' : 'dark';
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },
    setAutoMode() {
      localStorageState.theme = 'auto';
      this.$vuetify.theme.dark = window.matchMedia(
        '(prefers-color-scheme: dark)',
      ).matches;
    },
  },
});
</script>

<style>
.sizing-btns {
  display: flex;
  justify-content: center;
  flex-flow: column;
  align-items: center;
  position: fixed;
  bottom: 20px;
  left: 20px;
  z-index: 5;
}
</style>
