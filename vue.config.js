const { defineConfig } = require('@vue/cli-service')
const Dotenv = require('dotenv-webpack')

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
  }
})
