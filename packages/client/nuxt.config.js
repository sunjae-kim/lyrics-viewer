import * as path from 'path';
import colors from 'vuetify/es5/util/colors';
const { NODE_ENV } = process.env;
console.log(`current env: ${NODE_ENV}`);

export default {
  target: 'static',
  /*
   ** Headers of the page
   */
  head: {
    title: 'Lyrics Viewer',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'description', content: 'Music lyrics viewer' },
      { name: 'author', content: 'Jason' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://sunjae.kim' },
      { property: 'og:description', content: 'Music lyrics viewer' },
      { property: 'og:title', content: 'Lyrics Viewer' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  ssr: false,
  alias: { '#': path.resolve(__dirname, '..', 'shared') },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['@/assets/css/main.css'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ['@nuxtjs/vuetify', '@nuxt/typescript-build'],
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
  ],
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {},
  dotenv: { filename: NODE_ENV === 'production' ? '.env' : `.env.${NODE_ENV}` },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
  },
};
