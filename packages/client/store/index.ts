import { localStorageInterface } from '@/utils';

export const localStorageState = localStorageInterface('dsha323', {
  theme: 'auto' as 'auto' | 'dark' | 'light',
  query: '',
});
