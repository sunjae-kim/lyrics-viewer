import { localStorageInterface } from '@/utils';

type LocalStorageState = {
  theme: 'auto' | 'dark' | 'light';
  query: string;
  searchHistory: string[];
};

export const localStorageState = localStorageInterface<LocalStorageState>(
  'ejd73h2sd',
  {
    theme: 'auto',
    query: '',
    searchHistory: [],
  },
);
