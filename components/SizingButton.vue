<template>
  <div class="sizing-btns" @click="sheet = !sheet">
    <v-btn :small="isMobile" dark fab>
      <v-icon :small="isMobile">mdi-format-letter-case</v-icon>
    </v-btn>
    <v-bottom-sheet v-model="sheet">
      <v-sheet class="text-center" height="11rem">
        <v-row class="pt-3">
          <v-col>
            <h3 class="py-3">Text Size</h3>
            <v-btn
              @click="fontSize > -20 && setFontSize(fontSize - 5)"
              :small="isMobile"
              dark
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
              dark
              fab
            >
              <v-icon :small="isMobile">mdi-format-letter-case</v-icon>
            </v-btn>
          </v-col>

          <v-col>
            <h3 class="py-3">Line Spacing</h3>
            <v-btn
              @click="marginBottom > -20 && setMarginBottom(marginBottom - 5)"
              :small="isMobile"
              dark
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
              dark
              fab
            >
              <v-icon :small="isMobile">mdi-format-line-spacing</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapState } from 'vuex';

export default {
  name: 'SizingButtons',
  data() {
    return {
      sheet: false,
    };
  },
  computed: {
    ...mapState({
      track: state => state.tracks.currentTrack,
      fontSize: state => state.sizes.fontSize,
      marginBottom: state => state.sizes.marginBottom,
    }),
    ...mapGetters({
      isMobile: 'sizes/isMobile',
    }),
  },
  methods: {
    ...mapMutations({
      setFontSize: 'sizes/setFontSize',
      setMarginBottom: 'sizes/setMarginBottom',
    }),
  },
};
</script>

<style>
.sizing-btns {
  display: flex;
  justify-content: center;
  flex-flow: column;
  align-items: center;
  position: fixed;
  bottom: 10px;
  z-index: 5;
}
</style>
