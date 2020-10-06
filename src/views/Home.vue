<i18n>
{
  "en": {
    "gettingMarried": "We're getting married {duration},<br /> on {date}."
  },
  "fr": {
    "gettingMarried": "On se marie {duration},<br /> le {date}."
  }
}
</i18n>

<template>
  <div
    class="home-container text-white text-center font-light px-4 mt-32 pt-64"
  >
    <div
      class="text-4xl"
      v-html="
        $t('gettingMarried', {
          duration: durationUntilWedding,
          date: weddingDate
        })
      "
    ></div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Home",
  computed: {
    ...mapGetters(["weddingDate", "durationUntilWedding"])
  }
};
</script>

<style lang="scss" scoped></style>
