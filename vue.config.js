module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],

  pwa: {
    name: "Dom24x7",
    themeColor: "#1A76D2",
    msTileColor: "#1A76D2",
    appleMobileWebAppCapable: "yes",
    manifestOptions: {
      background_color: "#FFFFFF"
    },
    workboxOptions: {
      skipWaiting: true,
      clientsClaim: true,
    },
  },

  pluginOptions: {
    i18n: {
      locale: 'ru',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: true
    }
  }
}
