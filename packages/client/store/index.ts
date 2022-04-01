import { localStorageInterface } from '@/utils';

type LocalStorageState = {
  theme: 'auto' | 'dark' | 'light';
  query: string;
  searchHistory: { [query: string]: number };
};

export const localStorageState = localStorageInterface<LocalStorageState>(
  'asenjdsau',
  {
    theme: 'auto',
    query: '',
    searchHistory: {},
  },
);
