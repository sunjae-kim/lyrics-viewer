<template>
  <div class="sizing-btns">
    <v-row>
      <v-col cols="6">
        <v-speed-dial v-model="show.fontSize" direction="top">
          <template v-slot:activator>
            <v-btn :small="isMobile" dark fab>
              <v-icon :small="isMobile" v-if="show.fontSize">mdi-close</v-icon>
              <v-icon :small="isMobile" v-else>mdi-format-letter-case</v-icon>
            </v-btn>
          </template>
          <v-slider
            @input="setFontSize"
            @drag.stop
            @click.stop
            @click:append.stop="setFontSize(fontSize + 4)"
            @click:prepend.stop="setFontSize(fontSize - 4)"
            prepend-icon="mdi-minus"
            append-icon="mdi-plus"
            :value="fontSize"
            vertical
            max="20"
            min="-20"
          ></v-slider>
        </v-speed-dial>
      </v-col>

      <v-col class="pl-1" cols="6">
        <v-speed-dial v-model="show.lineHeight" direction="top">
          <template v-slot:activator>
            <v-btn :small="isMobile" dark fab>
              <v-icon :small="isMobile" v-if="show.lineHeight"
                >mdi-close</v-icon
              >
              <v-icon :small="isMobile" v-else>mdi-format-line-spacing</v-icon>
            </v-btn>
          </template>
          <v-slider
            @input="setLineHeight"
            @drag.stop
            @click.stop
            @click:append.stop="setLineHeight(lineHeight + 4)"
            @click:prepend.stop="setLineHeight(lineHeight - 4)"
            :value="lineHeight"
            prepend-icon="mdi-minus"
            append-icon="mdi-plus"
            vertical
            max="20"
            min="-20"
          ></v-slider>
        </v-speed-dial>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';

export default {
  name: 'SizingButtons',
  data() {
    return {
      show: {
        fontSize: false,
        lineHeight: false,
      },
    };
  },
  computed: {
    ...mapState({
      track: state => state.tracks.currentTrack,
      fontSize: state => state.sizes.fontSize,
      lineHeight: state => state.sizes.lineHeight,
    }),
    ...mapGetters({
      isMobile: 'sizes/isMobile',
    }),
  },
  methods: {
    ...mapMutations({
      setFontSize: 'sizes/setFontSize',
      setLineHeight: 'sizes/setLineHeight',
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
