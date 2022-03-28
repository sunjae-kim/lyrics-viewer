<template>
  <v-container>
    <v-app-bar fixed>
      <div style="width: 726px">
        <v-combobox
          class="mt-7"
          label="가수 및 노래 제목으로 검색"
          :value="query"
          @input="onSearchInput"
          :loading="loading"
          clearable
          :items="searchHistory"
          :search-input="query"
        ></v-combobox>
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
      <p v-if="query && query.length">검색 결과가 없습니다.. 😢</p>
      <p v-else>입력창에 검색어를 입력해주세요 😀</p>
    </section>
  </v-container>
</template>

<script lang="ts">
import TrackListItem from '@/components/TrackListItem.vue';
import TrackListItemLoader from '@/components/TrackListItemLoader.vue';
import { localStorageState } from '@/store';
import type { TrackState } from '@/store/tracks';
import { debounce } from 'lodash';
import Vue from 'vue';

export default Vue.extend({
  components: { TrackListItemLoader, TrackListItem },
  mounted() {
    if (localStorageState.query) {
      this.$store.dispatch('tracks/onSearchInput', localStorageState.query);
    }
  },
  computed: {
    numOfLoader() {
      return this.trackList.length || 5;
    },
    trackList(this: Vue): TrackState['trackList'] {
      return this.$store.state.tracks.trackList;
    },
    loading(this: Vue): TrackState['loading'] {
      return this.$store.state.tracks.loading;
    },
    query() {
      return localStorageState.query;
    },
    searchHistory() {
      return localStorageState.searchHistory;
    },
  },
  methods: {
    onSearchInput: debounce(function (this: Vue, query: string) {
      localStorageState.query = query;
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
