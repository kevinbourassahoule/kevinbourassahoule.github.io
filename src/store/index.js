import Vue from "vue";
import Vuex from "vuex";
import i18n from "../i18n";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import localizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    locale: i18n.locale.substring(0, 2),
    weddingDate: "2021-08-22"
  },
  getters: {
    weddingDate: state => {
      return dayjs(state.weddingDate).format("LL");
    },
    durationUntilWedding: state => {
      return dayjs().to(state.weddingDate);
    }
  },
  mutations: {
    LOCALE_SET: (state, locale) => {
      state.locale = locale;

      // Force reset the wedding date
      const weddingDate = state.weddingDate;
      state.weddingDate = "";
      state.weddingDate = weddingDate;
    }
  },
  actions: {
    setLocale({ commit }, locale) {
      commit("LOCALE_SET", locale);
      i18n.locale = locale;
      dayjs.locale(locale);
    }
  },
  modules: {}
});
