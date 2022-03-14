<template>
  <div class="text-center" :class="{ 'ready': ready }" :style="{ color: textColor }">
    <div class="flex flex-col lg:flex-row flex-wrap lg:flex-nowrap items-stretch justify-between mx-4 mt-12">
      <div 
        class="card relative text-center mb-12 mx-auto lg:mx-0 rounded rounded-t-full shadow-lg w-full sm:max-w-lg order-2 lg:order-1 backdrop-blur opacity-0 transition duration-500 delay-500" 
      >
        <div class="card-border flex flex-col border border-white/50 border-2 rounded-t-full h-full pt-32 lg:pt-36">
          <div class="text-heading uppercase text-2xl sm:text-4xl lg:text-3xl xl:text-4xl mb-16 lg:mb-24">
            Adresse
          </div>
          <div class="text-2xl flex-grow">
            155 Avenue des Érables<br />
            Brigham, QC J2K 4E1
          </div>
          <div class="mt-8 mb-10">
            <SkLink
              href="https://g.page/vignoble-bauge?share"
              target="_blank"
              class="text-heading uppercase rounded-lg px-3 py-2 border border-white border-2 transition ease-in-out duration-300 hover:bg-white hover:text-black hover:shadow-lg active:shadow"
            >
              Directions
            </SkLink>
          </div>
          <div class="ob-18-mask absolute left-0 bottom-0 ml-5 mb-8 bg-white w-28 h-24 -rotate-45" />
          <div class="ob-18-mask absolute bottom-0 right-0 mr-5 mb-8 bg-white w-28 h-24 rotate-45 -scale-x-100" />
        </div>
      </div>
      <div class="location mb-12 mx-4 lg:mt-32 leading-10 order-1 lg:order-2 md:w-full opacity-0 transition ease-out duration-500">
        <SkLink
          href="https://labauge.com"
          target="_blank"
          class="text-5xl md:text-6xl lg:text-6xl xl:text-7xl transition ease-in-out duration-300 hover:drop-shadow-xl"
        >
          <span>Le Vignoble </span>
          <span class="inline sm:hidden"></span>
          <span>de la Bauge</span>
        </SkLink>
      </div>
      <div
        class="card relative text-center mb-12 mx-auto lg:mx-0 rounded rounded-t-full shadow-lg w-full sm:max-w-lg order-3 backdrop-blur opacity-0 transition duration-500 delay-500"
      >
        <div class="card-border border border-white/50 border-2 rounded-t-full pt-32 lg:pt-36">
          <div class="text-heading uppercase text-2xl sm:text-4xl lg:text-3xl xl:text-4xl mb-16 lg:mb-18">
            Accommodations
          </div>
          <a href="https://www.awb.ca/" target="_blank" class="awb flex flex-col justify-end bg-cover block h-48">
            <div class="bg-gradient-to-b from-transparent to-black/25 pb-1 pt-8">
              <div class="text-heading uppercase text-2xl">Auberge West Brome</div>
              <div>Bloc de chambres réservées au nom du Groupe Déry</div>
            </div>
          </a>
          <div class="pt-6 px-4 text-lg">
            Pour les braves, aussi disponible sera le terrain du vignoble pour du camping ou pour des roulottes.
          </div>
          <div class="mt-8 mb-10">
            <SkLink
              href="https://www.google.ca/maps/search/Hotels/@45.2334555,-73.108941,10z/data=!3m1!4b1!4m12!2m11!3m6!1sHotels!2sVignoble+de+la+Bauge,+155+Av.+des+%C3%89rables,+Brigham,+Quebec+J2K+4E1!3s0x4cc9dd8000e93a1f:0x3277d269a68f6fb5!4m2!1d-72.854751!2d45.234658!5m2!5m1!1s2022-08-21!6e3"
              target="_blank"
              class="text-heading uppercase rounded-lg px-3 py-2 border border-white border-2 transition ease-in-out duration-300 hover:bg-white hover:text-black hover:shadow-lg active:shadow"
            >
              Autres options
            </SkLink>
          </div>
          <div class="ob-18-mask absolute left-0 bottom-0 ml-5 mb-8 bg-white w-28 h-24 -rotate-45" />
          <div class="ob-18-mask absolute bottom-0 right-0 mr-5 mb-8 bg-white w-28 h-24 rotate-45 -scale-x-100" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import chroma from "chroma-js";
import { mapGetters } from "vuex";

export default {
  name: "WeddingLocation",
  data() {
    return {
      ready: false
    };
  },
  computed: {
    ...mapGetters(["pageColor"]),
    textColor() {
      return chroma(this.pageColor).luminance(.95).hex();
    }
  },
  mounted() {
    setTimeout(() => this.ready = true, 150);
  }
};
</script>

<style lang="scss" scoped>
  .ob-18-mask {
    mask-image: url('../assets/img/olive-branches/ob-18.svg');
    mask-repeat: no-repeat;
  }

  .awb {
    background-image: url('../assets/img/awb.jpg');
  }

  .card {
    @apply -translate-x-3;
    background-image: url("../assets/img/textures/arches.png");

    &:last-child {
      @apply translate-x-3;
    }
  }

  .card-border {
  }

  .location {
    @apply -translate-y-3;
  }

  .ready {
    .card {
      @apply translate-x-0;
      @apply opacity-100;
    }

    .location {
      @apply translate-y-0;
      @apply opacity-100;
    }
  }
</style>