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
    weddingDate: "2022-08-21",
    weddingScheduleItems: [
      {
        from: "16 h 00",
        to: "",
        description: "Arrivée"
      },
      {
        from: "16 h 30",
        to: "",
        description: "Cérémonie"
      },
      {
        from: "2 h 00",
        to: "",
        description: "Dernier départ"
      }
    ]
  },
  getters: {
    weddingDate: state => {
      return dayjs(state.weddingDate).format("LL");
    },
    rehearsalDate: () => dayjs().format("LL"),
    durationUntilWedding: state => {
      return dayjs().to(state.weddingDate);
    },
    pageColor: state => {
      switch (state.route.name) {
        case "wedding-home": return "#ffe462";
        case "wedding-location": return "#fbcdac";
        case "wedding-details": return "#ffdafa";
        case "wedding-schedule": return "#ad8352"; // #be9b74
        case "wedding-rehearsal": return "#ffe462";
        default: return "#fff";
      }
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
