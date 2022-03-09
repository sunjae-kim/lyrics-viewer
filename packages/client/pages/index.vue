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

<script>
import { mapState, mapActions } from 'vuex';
import TrackListItemLoader from '@/components/TrackListItemLoader';
import TrackListItem from '@/components/TrackListItem';

export default {
  components: {
    TrackListItemLoader,
    TrackListItem,
  },
  computed: {
    numOfLoader() {
      return this.trackList.length || 5;
    },
    ...mapState({
      query: state => state.tracks.query,
      loading: state => state.tracks.loading,
      trackList: state => state.tracks.trackList,
    }),
  },
  methods: {
    ...mapActions({ onSearchInput: 'tracks/onSearchInput' }),
  },
};
</script>

<style>
.v-toolbar__content {
  justify-content: center;
}
</style>
