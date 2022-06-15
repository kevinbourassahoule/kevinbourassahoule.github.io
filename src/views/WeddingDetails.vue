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
    "dressCodeDetails": "Tenues de cocktail semi-formelles sont les bienvenues.",
    "gifts": "Cadeaux",
    "giftsDetails": "Votre présence pour notre journée spéciale sera votre plus généreux cadeau!  Nous serons aussi très reconnaissants de cadeaux en argent, qui nous aideront à couvrir une partie de l'hospitalité promise.",
    "photography": "Photographie",
    "photographyDetails": "Andrée-Anne Joly sera notre photographe pour la soirée. Pour la laisser faire son travail dans les meilleures conditions, veuillez laisser vos appareils photos avec flash de côté.  Les photos seront partagées ici-même dans les semaines suivant le mariage.  On se rencontre en ligne avec le hashtag #SarahEtKevin2022 suite à l'événement!",
    "schedule": "Horaire",
    "transportation": "Déplacements",
    "transportationDetails": "Un autobus partira à 15 h 45 de l'Auberge vers le Vignoble. Des départs du Vignoble vers l'Auberge se feront à 22 h 00, 24 h 00 et 2 h 00."
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
            class="flex flex-col md:flex-row items-center md:items-baseline mb-12"
          >
            <div class="md:w-1/2 text-center md:text-right md:mr-10">
              {{ item.from }}
            </div>
            <div class="md:w-1/2 text-center md:text-left">
              {{ item.description }}
            </div>
          </div>
        </div>
      </div>
      <div
        class="ob-20-mask max-w-sm w-8 h-16 -mt-6 mb-6 mx-auto"
        :style="{ 'backgroundColor': pageColor }"
      />
      <div class="text-center text-2xl mx-12 mb-12">
        Plus de détails suivront au fur et à mesure qu'ils se concrétisent.
      </div>
    </div>
    <div class="md:hidden w-full lg:w-1/3">
      <div
        class="ob-04-mask max-w-sm w-28 h-24 sm:h-36 mx-auto -mt-12 -rotate-90"
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
        <h2 class="text-heading uppercase text-3xl mb-3">{{ $t("transportation") }}</h2>
        <p class="text-justify text-2xl">{{ $t("transportationDetails") }}</p>
      </div>
      <div
        class="ob-02-mask max-w-sm w-28 h-24 sm:h-36 -mt-12 -rotate-90"
        :style="{ 'backgroundColor': pageColor }"
      />
      <div class="text-center my-12">
        <h2 class="text-heading uppercase text-3xl mb-3">{{ $t("gifts") }}</h2>
        <p class="text-justify text-2xl">{{ $t("giftsDetails") }}</p>
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
  .ob-02-mask {
    mask-image: url('../assets/img/olive-branches/ob-02.svg');
    mask-repeat: no-repeat;
  }
  .ob-04-mask {
    mask-image: url('../assets/img/olive-branches/ob-04.svg');
    mask-repeat: no-repeat;
  }
  .ob-08-mask {
    mask-image: url('../assets/img/olive-branches/ob-08.svg');
    mask-repeat: no-repeat;
  }
  .ob-12-mask {
    mask-image: url('../assets/img/olive-branches/ob-12.svg');
    mask-repeat: no-repeat;
  }
  .ob-20-mask {
    mask-image: url('../assets/img/olive-branches/ob-20.svg');
    mask-repeat: no-repeat;
  }
</style>
