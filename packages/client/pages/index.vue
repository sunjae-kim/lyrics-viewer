<template>
  <v-container>
    <v-app-bar fixed>
      <div style="width: 726px">
        <v-text-field
          class="mt-7"
          id="search-input"
          label="가수 및 노래 제목으로 검색"
          @input="onSearchInput"
          :value="query"
          :loading="loading"
          clearable
        ></v-text-field>
      </div>
    </v-app-bar>

    <section v-if="loading">
      <TrackListItemLoader
        v-for="n in numOfLoader"
        :key="n"
      ></TrackListItemLoader>
    </section>
    <section v-else-if="trackList.length">
      <TrackListItem
        v-for="track in trackList"
        :key="track.trackId"
        :track="track"
      ></TrackListItem>
    </section>
    <section v-else>
      <p v-if="query.length">검색 결과가 없습니다.. 😢</p>
      <p v-else>입력창에 검색어를 입력해주세요 😀</p>
    </section>
  </v-container>
</template>

<script lang="ts">
import TrackListItem from '@/components/TrackListItem.vue';
import TrackListItemLoader from '@/components/TrackListItemLoader.vue';
import type { TrackState } from '@/store/tracks';
import { debounce } from 'lodash';
import Vue from 'vue';
import { mapState } from 'vuex';

export default Vue.extend({
  components: { TrackListItemLoader, TrackListItem },
  data() {
    return { query: '' };
  },
  computed: {
    numOfLoader() {
      return this.trackList.length || 5;
    },
    ...mapState('tracks', {
      loading: state => (state as TrackState).loading,
      trackList: state => (state as TrackState).trackList,
    }),
  },
  methods: {
    onSearchInput: debounce(function (this: Vue, query: string) {
      this.$store.dispatch('tracks/onSearchInput', query);
    }, 300),
  },
});
</script>

<style>
.v-toolbar__content {
  justify-content: center;
}
</style>
