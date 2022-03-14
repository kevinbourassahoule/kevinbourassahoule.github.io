const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  publicPath: "/",
  outputDir: "docs",
  chainWebpack: config => {
    config.module
      .rule("i18n")
      .resourceQuery(/blockType=i18n/)
      .type("javascript/auto")
      .use("i18n")
        .loader("@kazupon/vue-i18n-loader")
        .end();
  },
  transpileDependencies: true,
});
