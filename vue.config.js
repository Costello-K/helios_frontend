import vueI18n from '@intlify/vite-plugin-vue-i18n'
const { defineConfig } = require('@vue/cli-service')
const Dotenv = require('dotenv-webpack')
const path = require('path')

module.exports = defineConfig({
  transpileDependencies: true,

  configureWebpack: {
    plugins: [
      new Dotenv(),
    ],
  },

  pluginOptions: {
    vuetify: {},
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableLegacy: false,
      runtimeOnly: false,
      compositionOnly: false,
      fullInstall: true
    }
  },

  plugins: [
    vueI18n({
      include: path.resolve(__dirname, 'src/locales/en.json'),
      compositionOnly: false,
    }),
  ],
});
