module.exports = {
  chainWebpack: config => {
    config.module
      .rule("i18n")
      .resourceQuery(/blockType=i18n/)
      .type("javascript/auto")
      .use("i18n")
      .loader("@kazupon/vue-i18n-loader")
      .end();
  },
  pwa: {
    name: "Le mariage à Sarah et Kevin",
    themeColor: "#BF9D73"
  }
};
