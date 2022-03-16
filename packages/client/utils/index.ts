import { reactive, watch } from '@nuxtjs/composition-api';

const reactiveWithoutType = reactive as <T>(x: T) => T;
export function localStorageInterface<T extends {}>(k: string, default_: T) {
  let got: T = JSON.parse(localStorage.getItem(k) || JSON.stringify(default_));
  const ra: T = reactiveWithoutType(got);
  watch(
    () => ra,
    v => localStorage.setItem(k, JSON.stringify(v)),
    { deep: true },
  );
  return ra;
}
