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
    class="w-full text-center p-3 bg-black bg-opacity-50 text-white"
  >
    <router-link :to="{ name: 'home' }" v-slot="{ href, navigate }">
      <sk-link :href="href" @click="navigate" class="text-white px-5">
        {{ $t("ourWedding") }}
      </sk-link>
    </router-link>
    <router-link :to="{ name: 'location' }" v-slot="{ href, navigate }">
      <sk-link :href="href" @click="navigate" class="text-white px-5">
        {{ $t("location") }}
      </sk-link>
    </router-link>
    <router-link :to="{ name: 'schedule' }" v-slot="{ href, navigate }">
      <sk-link :href="href" @click="navigate" class="text-white px-5">
        {{ $t("schedule") }}
      </sk-link>
    </router-link>
    <router-link :to="{ name: 'details' }" v-slot="{ href, navigate }">
      <sk-link :href="href" @click="navigate" class="text-white px-5">
        {{ $t("details") }}
      </sk-link>
    </router-link>
    <sk-link
      v-if="locale === 'fr'"
      href="#"
      @click="setLocale('en')"
      class="text-white px-5"
    >
      English
    </sk-link>
    <sk-link
      v-if="locale === 'en'"
      href="#"
      @click="setLocale('fr')"
      class="text-white px-5"
    >
      Français
    </sk-link>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "TheMenu",
  computed: {
    ...mapState(["locale"])
  },
  methods: {
    ...mapActions(["setLocale"])
  }
};
</script>

<style scoped lang="scss"></style>
