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
  <div
    id="nav"
    class="fixed top-0 left-0 right-0 text-center px-3 bg-black bg-opacity-50 text-white"
  >
    <router-link
      v-for="link in links"
      :key="link.routeName"
      :to="{ name: link.routeName }"
      v-slot="{ href, navigate, isActive }"
    >
      <SkLink
        :href="href"
        @click="navigate"
        class="inline-block text-white hover:text-primary px-5 py-3"
        :class="{ active: isActive }"
      >
        {{ link.label }}
      </SkLink>
    </router-link>
    <SkLink
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
      class="block text-white px-5 py-3"
    >
      Français
    </SkLink>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "TheMenu",
  data() {
    return {
      links: [
        {
          routeName: "home",
          label: this.$t("ourWedding")
        },
        {
          routeName: "location",
          label: this.$t("location")
        },
        {
          routeName: "schedule",
          label: this.$t("schedule")
        },
        {
          routeName: "details",
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
