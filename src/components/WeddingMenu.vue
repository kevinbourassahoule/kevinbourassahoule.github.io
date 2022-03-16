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
  <div>
    <div
      id="nav" 
      class="fixed left-0 top-0 right-0 z-50 flex flex-col md:flex-row items-stretch md:items-center md:justify-center text-heading text-center px-3 py-2 text-3xl md:text-xl backdrop-blur drop-shadow overflow-hidden transition-all"
      :class="{ 'h-14': !expanded, 'h-screen': expanded }"
    >
      <router-link
        v-for="link in leftLinks"
        :key="link.routeName"
        :to="{ name: link.routeName }"
        v-slot="{ href, navigate, isExactActive }"
      >
        <SkLink
          :href="href"
          @click="navigate"
          class="olive relative inline-block uppercase text-white text-opacity-50 hover:text-opacity-75 py-12 md:py-3 md:w-48 order-2 md:order-1"
          :class="isExactActive && 'active text-opacity-100'"
          :style="isExactActive ? { color: pageColor } : null"
        >
          {{ link.label }}
        </SkLink>
      </router-link>
      <div class="self-stretch justify-self-start flex justify-between shrink-0 order-1 md:order-2">
        <router-link :to="{ name: 'wedding-home' }">
          <img src="../assets/img/monogram-white.png" class="md:px-6 h-10" />
        </router-link>
        <div class="block md:hidden flex flex-col justify-around h-9 mr-5 -mt-4 cursor-pointer" @click="expanded = !expanded">
          <div class="transition-transform h-3" :class="{ 'translate-y-4 translate-x-2 -rotate-6': expanded }">
            <img src="../assets/img/olive-branches/ob-04.svg" class="h-12 -rotate-90" />
          </div>
          <div class="transition-transform h-3" :class="{ 'translate-y-8 -translate-x-6 rotate-12': expanded }">
            <img src="../assets/img/olive-branches/ob-04.svg" class="h-12 -rotate-90" />
          </div>
          <div class="transition-transform h-3" :class="{ 'translate-y-12 -translate-x-4 -rotate-12': expanded }">
            <img src="../assets/img/olive-branches/ob-04.svg" class="h-12 -rotate-90" />
          </div>
        </div>
      </div>
      <router-link
        v-for="link in rightLinks"
        :key="link.routeName"
        :to="{ name: link.routeName }"
        v-slot="{ href, navigate, isExactActive }"
      >
        <SkLink
          :href="href"
          @click="navigate"
          class="olive relative inline-block uppercase text-white text-opacity-50 hover:text-opacity-75 py-12 md:py-3 md:w-48 order-2 md:order-3"
          :class="isExactActive && 'active text-opacity-100'"
          :style="isExactActive ? { color: pageColor } : null"
        >
          {{ link.label }}
        </SkLink>
      </router-link>
      <a
        href="https://form.simplesurvey.com/f/l/rsvp-sk"
        class="uppercase text-white text-opacity-50 hover:text-opacity-75 py-12 md:py-3 md:w-48 order-3"
      >
        RSVP
      </a>
    </div>
    <div class="h-14"></div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  name: "WeddingMenu",
  data() {
    return {
      expanded: false,
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
  watch: {
    $route() {
      this.expanded = false;
    }
  },
  methods: {
    ...mapActions(["setLocale"])
  }
};
</script>

<style scoped lang="scss">
  // .olive.active::after {
  //   content: " ";
  //   position: absolute;
  //   bottom: 0;
  //   background-image: url('../assets/img/olive-branches/ob-04.svg');
  //   background-repeat: no-repeat;
  //   transform: rotate(-90deg);
  //   width: 3rem;
  //   height: 4rem;
  //   left: calc(50% - 1.5rem);
  // }
</style>
