<i18n>
{
  "en": {
    "gettingMarried": "<span class=''>SARAH and KEVIN</span><br />are getting married {duration}, on<br />{date}."
  },
  "fr": {
    "gettingMarried_line1": "SARAH et KEVIN",
    "gettingMarried_line2": "se marient {duration}, le",
    "gettingMarried_line2_after": "se sont mariés {duration} le",
    "gettingMarried_line3": "{date}"
  }
}
</i18n>

<template>
  <div class="flex items-center justify-center mt-20 sm:mt-2 md:mt-8 xl:mt-20">
    <div
      class="ob-10-mask max-w-sm w-14 sm:w-28 h-24 sm:h-48"
      :style="{ 'backgroundColor': pageColor }"
    />
    <div class="text-center px-2 sm:px-12" :style="{ color: pageColor }">
      <div class='text-heading text-2xl sm:text-6xl'>{{ $t('gettingMarried_line1') }}</div>
      <div v-if="!areMarried" class='tracking-wide my-2 sm:text-3xl sm:my-6'>{{ $t('gettingMarried_line2', { duration: durationUntilWedding }) }}</div>
      <div v-else class='tracking-wide my-2 sm:text-3xl sm:my-6'>{{ $t('gettingMarried_line2_after', { duration: durationUntilWedding }) }}</div>
      <div class='text-heading uppercase text-xl sm:text-5xl'>{{ $t('gettingMarried_line3', { date: weddingDate }) }}</div>
    </div>
    <div
      class="ob-10-mask max-w-sm w-14 sm:w-28 h-24 sm:h-48"
      :style="{ 'backgroundColor': pageColor, transform: 'scaleX(-1)' }"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "WeddingPage",
  computed: {
    ...mapGetters(["weddingDate", "durationUntilWedding", "areMarried", "pageColor"])
  }
};
</script>

<style lang="scss">
</style>
