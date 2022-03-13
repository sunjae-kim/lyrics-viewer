import { SizeState } from '@/store/sizes';
import { TrackState } from '@/store/tracks';
import Vue from 'vue';
import { Store } from 'vuex';
import { Framework } from 'vuetify';

type RootState = {
  sizes: SizeState;
  tracks: TrackState;
};

export default RootState;

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    store?: Store<RootState>;
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $store: Store<RootState>;
    $vuetify: Framework;
  }
}
