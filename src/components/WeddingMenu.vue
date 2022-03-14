<i18n>
{
  "en": {
    "details": "Details",
    "location": "Location",
    "ourWedding": "Our wedding",
    "schedule": "Schedule"
  },
  "fr": {
    "details": "Détails",
    "location": "Lieu",
    "ourWedding": "Notre mariage",
    "schedule": "Horaire"
  }
}
</i18n>

<template>
  <div id="nav" class="flex items-center justify-center text-heading text-center px-3 py-2 text-xl backdrop-blur">
    <router-link
      v-for="link in leftLinks"
      :key="link.routeName"
      :to="{ name: link.routeName }"
      v-slot="{ href, navigate, isExactActive }"
    >
      <SkLink
        :href="href"
        @click="navigate"
        class="olive relative inline-block uppercase text-white text-opacity-50 hover:text-opacity-75 px-5 py-3 w-48"
        :class="isExactActive && 'active text-opacity-100'"
        :style="isExactActive ? { color: pageColor } : null"
      >
        {{ link.label }}
      </SkLink>
    </router-link>
    <img src="../assets/img/monogram-white.png" class="px-5 h-10" />
    <router-link
      v-for="link in rightLinks"
      :key="link.routeName"
      :to="{ name: link.routeName }"
      v-slot="{ href, navigate, isExactActive }"
    >
      <SkLink
        :href="href"
        @click="navigate"
        class="olive relative inline-block uppercase text-white text-opacity-50 hover:text-opacity-75 px-5 py-3 w-48"
        :class="isExactActive && 'active text-opacity-100'"
        :style="isExactActive ? { color: pageColor } : null"
      >
        {{ link.label }}
      </SkLink>
    </router-link>
    <a
      href="https://form.simplesurvey.com/f/l/rsvp-sk"
      class="inline-block uppercase text-white text-opacity-50 hover:text-opacity-75 px-5 py-3 w-48"
    >
      RSVP
    </a>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  name: "WeddingMenu",
  data() {
    return {
      leftLinks: [
        {
          routeName: "wedding-home",
          label: this.$t("ourWedding")
        },
        {
          routeName: "wedding-location",
          label: this.$t("location")
        }
      ],
      rightLinks: [
        {
          routeName: "wedding-details",
          label: this.$t("details")
        }
      ]
    };
  },
  computed: {
    ...mapState(["locale"]),
    ...mapGetters(["pageColor"])
  },
  methods: {
    ...mapActions(["setLocale"])
  }
};
</script>

<style scoped lang="scss">
  .olive.active::after {
    content: " ";
    position: absolute;
    top: 0;
    background-image: url('../assets/img/olive-branches/ob-04.svg');
    background-repeat: no-repeat;
    transform: rotate(-90deg);
    width: 3rem;
    height: 4rem;
    left: calc(50% - 1.5rem);
  }
</style>
