<i18n>
{
  "en": {
    "gettingMarried": "Sarah and Kevin are getting married {duration},<br /> on {date}."
  },
  "fr": {
    "gettingMarried": "Sarah et Kevin se marient {duration},<br /> le {date}."
  }
}
</i18n>

<template>
  <div>
    <div class="text-white text-center font-light px-4 mt-24">
      <div
        class="text-4xl"
        style="font-family: 'Amiri', cursive;"
        v-html="
          $t('gettingMarried', {
            duration: durationUntilWedding,
            date: weddingDate
          })
        "
      ></div>
    </div>
    <img
      src="img/flourish-1.svg"
      class="max-w-sm mx-auto mt-12 text-white"
      style="filter:invert(1)"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "WeddingPage",
  computed: {
    ...mapGetters(["weddingDate", "durationUntilWedding"])
  }
};
</script>

<style lang="scss">
body {
  font-family: "Amiri", serif;
}
</style>
