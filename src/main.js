import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { sync } from "vuex-router-sync";
import i18n from "./i18n";
import "./importBaseComponents";

import dayjs from "dayjs";
import "dayjs/locale/fr";
dayjs.locale("fr");

const unsync = sync(store, router);

import VueProgressiveImage from "vue-progressive-image";
Vue.use(VueProgressiveImage);

import "./assets/styles/index.css";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");
