import { localStorageInterface } from '@/utils';

type LocalStorageState = {
  theme: 'auto' | 'dark' | 'light';
  searchHistory: { [query: string]: number };
};

export const localStorageState = localStorageInterface<LocalStorageState>(
  'asenjdsau',
  {
    theme: 'auto',
    searchHistory: {},
  },
);
