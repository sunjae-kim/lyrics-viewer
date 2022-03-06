import type { CorsOptions } from 'cors';

const whitelist = ['https://sunjae.kim', 'http://localhost:3000'];

export const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};
