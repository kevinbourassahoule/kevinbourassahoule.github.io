<i18n>
{
  "en": {
    "dressCode": "Dress code",
    "dressCodeDetails": "Black tie optional.",
    "photography": "Photography",
    "photographyDetails": "Do not use your phones during the ceremony",
    "schedule": "Schedule"
  },
  "fr": {
    "dressCode": "Code vestimentaire",
    "dressCodeDetails": "Cravate noire facultative.",
    "photography": "Photographie",
    "photographyDetails": "Une photographe sera sur place tout au long de la soirée.  Les photos seront partagées ici-mêmes dans les semaines suivant le mariage.  On se rencontre en ligne avec le hashtag #SarahEtKevin2022 suite à l'événement!",
    "schedule": "Horaire"
  }
}
</i18n>

<template>
  <div class="flex flex-col md:flex-row justify-between w-full">
    <div class="w-full md:w-1/2 lg:w-1/3">
      <div class="text-center uppercase text-5xl my-12">
        <h2 class="text-heading">{{ $t("schedule") }}</h2>
      </div>
      <div class="">
        <div class="text-4xl">
          <div
            v-for="item in weddingScheduleItems"
            :key="item.from"
            class="flex flex-col lg:flex-row items-center lg:items-baseline mb-12"
          >
            <div class="lg:w-1/2 text-center lg:text-right lg:mr-10">
              {{ item.from }}
            </div>
            <div class="lg:w-1/2 text-center lg:text-left">
              {{ item.description }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full md:w-0 lg:w-1/3">
      <div
        class="md:hidden ob-12-mask max-w-sm w-28 h-24 sm:h-36 mx-auto -mt-12 -rotate-90"
        :style="{ 'backgroundColor': pageColor }"
      />
    </div>
    <div class="flex flex-col items-center w-full md:w-1/2 lg:w-1/3 px-12">
      <div class="text-center my-12">
        <h2 class="text-heading uppercase text-3xl mb-3">{{ $t("dressCode") }}</h2>
        <p class="text-2xl">{{ $t("dressCodeDetails") }}</p>
      </div>
      <div
        class="ob-12-mask max-w-sm w-28 h-24 sm:h-36 -mt-12 -rotate-90"
        :style="{ 'backgroundColor': pageColor }"
      />
      <div class="text-center my-12">
        <h2 class="text-heading uppercase text-3xl mb-3">{{ $t("photography") }}</h2>
        <p class="text-justify text-2xl">{{ $t("photographyDetails") }}</p>
      </div>
      <div
        class="ob-08-mask max-w-sm w-28 h-24 sm:h-36 -mt-12 -rotate-90"
        :style="{ 'backgroundColor': pageColor }"
      />
      <div class="text-center my-12">
        <h2 class="text-heading uppercase text-3xl mb-3">{{ $t("dressCode") }}</h2>
        <p class="text-justify text-2xl">{{ $t("dressCodeDetails") }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "WeddingDetails",
  computed: {
    ...mapState(["weddingScheduleItems"]),
    ...mapGetters(["pageColor"])
  }
};
</script>

<style lang="scss">
  .ob-12-mask {
    mask-image: url('../assets/img/olive-branches/ob-12.svg');
    mask-repeat: no-repeat;
  }
  .ob-08-mask {
    mask-image: url('../assets/img/olive-branches/ob-08.svg');
    mask-repeat: no-repeat;
  }
</style>
