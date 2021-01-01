const fs = require("fs");

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
  // devServer: {
  //   https: {
  //     key: fs.readFileSync("./certs/localhost+2-key.pem"),
  //     cert: fs.readFileSync("./certs/localhost+2.pem"),
  //     ca: fs.readFileSync('./certs/rootCA.pem'),
  //   }
  // }
}