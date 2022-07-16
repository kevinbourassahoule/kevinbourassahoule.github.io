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
    weddingDate: "2022-08-21T16:30-0400",
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
    ],
    actors: [
      {
        id: "sah",
        name: "Sarah",
        gender: "f",
        plusOne: null,
        rehearsalName: "Saraz",
        rehearsalId: "b137026c-2a6e-4d16-9c36-01e83aa837bf"
      },
      {
        id: "kbh",
        name: "Kevin",
        gender: "m",
        plusOne: null,
        rehearsalId: "a52b185f-7126-4abf-8268-2ce0275c43ed"
      },
      {
        id: "guylou",
        name: "Guylou",
        gender: "f",
        plusOne: null,
        rehearsalId: "b01b018d-6020-4ee9-b0f4-a0fd7bb0eeb6"
      },
      {
        id: "ren",
        name: "René",
        gender: "m",
        plusOne: null,
        rehearsalId: "61094af1-2f99-4873-840a-0d3457580d8d"
      },
      {
        id: "bouboue",
        name: "Geneviève",
        gender: "f",
        plusOne: null,
        rehearsalName: "Genny from the Block",
        rehearsalId: "61094af1-2f99-4873-840a-0d3457580d8d"
      },
      {
        id: "friloux",
        name: "David",
        gender: "m",
        plusOne: null,
        rehearsalName: "Friloux",
        rehearsalId: "07e06a08-e79b-4769-b9d7-ca65c7157e26"
      },
      {
        id: "flo",
        name: "Florence",
        gender: "f",
        plusOne: null,
        rehearsalName: "Floppie Bird",
        rehearsalId: "5733524c-c91a-45d3-bd79-f5ed79205ee6"
      },
      {
        id: "camou",
        name: "Camille",
        gender: "f",
        plusOne: "Jacou",
        rehearsalName: "Camou",
        rehearsalId: "d271f9be-71dd-4211-8f96-e9e1618c38a7"
      },
      {
        id: "eli",
        name: "Élisabeth",
        gender: "f",
        plusOne: null,
        rehearsalName: "Lizzy",
        rehearsalId: "403e6043-eb65-40da-b052-f2cff7bf0e0e"
      },
      {
        id: "jenn",
        name: "Jennifer",
        gender: "f",
        plusOne: null,
        rehearsalName: "Jennicool",
        rehearsalId: "dd3986e4-6fc4-4161-8227-b5de296508ae"
      },
      {
        id: "julie",
        name: "Julie",
        gender: "f",
        plusOne: null,
        rehearsalName: "Jolie",
        rehearsalId: "1b70a8fe-6295-4361-854b-64ac7fd1d218"
      },
      {
        id: "vache",
        name: "Vachon",
        gender: "m",
        plusOne: null,
        rehearsalName: "Monsemoiseau Alexander Vaychin",
        rehearsalId: "3b100d4f-799a-4e45-a41b-b0af04019076"
      },
      {
        id: "pirrrz",
        name: "Pierre-Michel",
        gender: "f",
        plusOne: null,
        rehearsalName: "Pirrrz Le Boi",
        rehearsalId: "7e890237-66cf-4491-914c-0afd35cd0bda"
      },
      {
        id: "fres",
        name: "Frédéric",
        gender: "m",
        plusOne: null,
        rehearsalName: "Monsemoiseau Frestopher",
        rehearsalId: "994dc7be-7be4-405d-8a1d-a569c3761945"
      },
      {
        id: "lus",
        name: "Ludovic",
        gender: "m",
        plusOne: null,
        rehearsalName: "Monsemoiseau Lus LeCao",
        rehearsalId: "4e50379a-727d-4eb2-aae5-885dc7a83f5c"
      },
      {
        id: "frank",
        name: "François-Maxime",
        gender: "m",
        plusOne: "Cocobongo",
        rehearsalName: "Flançois LeGacci",
        rehearsalId: "4e4829ba-4784-4da8-824c-60b849803da4"
      },
      {
        id: "dave",
        name: "David",
        gender: "m",
        plusOne: null,
        rehearsalId: "75ce2b65-1c17-4452-9767-c3230c2aee32"
      },
      {
        id: "ant",
        name: "Anthony",
        gender: "m",
        plusOne: "Pris",
        rehearsalId: "b0bdf9f2-d81f-40c8-893f-34d743cacff1"
      },
      {
        id: "aaj",
        name: "Andrée-Anne Joly"
      },
      {
        id: "mf",
        name: "Mario"
      },
      {
        id: "caro",
        name: "Carolyne"
      },
      {
        id: "france",
        name: "France"
      },
      {
        id: "2g",
        name: "Deux Gourmandes"
      },
    ],
    actorGroups: [
      {
        id: "tous",
        actorIds: ["sah", "kbh", "guylou", "ren", "bouboue", "friloux"]
      }
    ]
  },
  getters: {
    weddingDate: state => {
      return dayjs(state.weddingDate).format("LL");
    },
    areMarried: state => {
      return dayjs().isAfter(state.weddingDate);
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
