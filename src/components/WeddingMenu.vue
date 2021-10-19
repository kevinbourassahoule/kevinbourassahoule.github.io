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
  <div id="nav" class="text-heading text-center px-3 text-lg">
    <router-link
      v-for="link in links"
      :key="link.routeName"
      :to="{ name: link.routeName }"
      v-slot="{ href, navigate, isExactActive }"
    >
      <SkLink
        :href="href"
        @click="navigate"
        class="inline-block text-white text-opacity-50 hover:text-opacity-75 px-5 py-3 border-b-2 border-transparent hover:border-white"
        :class="isExactActive && 'active text-opacity-100 border-white'"
      >
        {{ link.label }}
      </SkLink>
    </router-link>
    <!-- <SkLink
      v-if="locale === 'fr'"
      href="#"
      @click="setLocale('en')"
      class="inline-block text-white px-5 py-3"
    >
      English
    </SkLink>
    <SkLink
      v-if="locale === 'en'"
      href="#"
      @click="setLocale('fr')"
      class="inline-block text-white px-5 py-3"
    >
      Français
    </SkLink> -->
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "WeddingMenu",
  data() {
    return {
      links: [
        {
          routeName: "wedding-home",
          label: this.$t("ourWedding")
        },
        {
          routeName: "wedding-location",
          label: this.$t("location")
        },
        {
          routeName: "wedding-schedule",
          label: this.$t("schedule")
        },
        {
          routeName: "wedding-details",
          label: this.$t("details")
        }
      ]
    };
  },
  computed: {
    ...mapState(["locale"])
  },
  methods: {
    ...mapActions(["setLocale"])
  }
};
</script>

<style scoped lang="scss"></style>
