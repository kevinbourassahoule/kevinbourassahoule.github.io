<template>
  <div class="text-center" :class="{ 'ready': ready }" :style="{ color: pageColor }">
    <div class="flex flex-col lg:flex-row flex-wrap lg:flex-nowrap items-stretch justify-between mx-4 mt-12">
      <div 
        class="card relative text-center mb-12 mx-auto lg:mx-0 rounded rounded-t-full shadow-lg w-full sm:max-w-lg order-2 lg:order-1 backdrop-blur opacity-0 transition duration-500 delay-500" 
      >
        <div class="card-border flex flex-col border border-white/50 border-2 rounded-t-full h-full pt-32 lg:pt-36" :style="{ 'border-color': pageColor }">
          <div class="text-heading uppercase text-2xl sm:text-4xl lg:text-3xl xl:text-4xl mb-16 lg:mb-24">
            Adresse
          </div>
          <div class="text-3xl flex-grow mb-6">
            155 Avenue des Érables<br />
            Brigham, QC J2K 4E1
          </div>
          <div class="mt-8 mb-10">
            <SkLink
              href="https://g.page/vignoble-bauge?share"
              target="_blank"
              class="text-heading uppercase rounded-lg px-3 py-2 border-2 transition ease-in-out hover:bg-white/10 hover:shadow-lg active:shadow"
              :style="{ 'border-color': pageColor }"
            >
              Directions
            </SkLink>
          </div>
          <div class="ob-18-mask absolute left-0 bottom-0 ml-5 mb-8 w-28 h-24 -rotate-45" :style="{ 'background-color': pageColor }" />
          <div class="ob-18-mask absolute bottom-0 right-0 mr-5 mb-8 w-28 h-24 rotate-45 -scale-x-100" :style="{ 'background-color': pageColor }" />
        </div>
      </div>
      <div class="location mb-12 mx-4 lg:mt-16 xl:mt-32 leading-10 order-1 lg:order-2 md:w-full opacity-0 transition ease-out duration-500">
        <div class="text-5xl md:text-6xl lg:text-6xl xl:text-7xl">
          <span>Le Vignoble </span>
          <span class="inline sm:hidden"></span>
          <span>de la Bauge</span>
        </div>
      </div>
      <div
        class="card relative text-center mb-12 mx-auto lg:mx-0 rounded rounded-t-full shadow-lg w-full sm:max-w-lg order-3 backdrop-blur opacity-0 transition duration-500 delay-500"
      >
        <div class="card-border border border-white/50 border-2 rounded-t-full pt-32 lg:pt-36" :style="{ 'border-color': pageColor }">
          <div class="text-heading uppercase text-2xl sm:text-4xl lg:text-3xl xl:text-4xl mb-16 lg:mb-18">
            Hébergement
          </div>
          <div>
            <a href="https://goo.gl/maps/T4ct1Hiid9vjk3Cc9" target="_blank" class="text-heading uppercase text-2xl">Auberge West Brome</a>
            <p class="px-6 mt-2 text-lg text-justify">
              Les 20 chambres de l'auberge ont été reservées sous le nom <em>Groupe Déry le 21 août</em>. 
              Pour réserver, appelez à l'auberge au <a href="tel:4502667552">(450)&nbsp;266&#8209;7552</a> avant le 20 mai.
              Premier arrivé, premier servi!
            </p>
          </div>
          <div class="ob-13-mask w-4 h-6 mx-auto my-3" :style="{ 'background-color': pageColor }" />
          <div class="px-6 mb-12 text-lg text-justify">
            Pour les braves, le terrain du Vignoble sera aussi disponible gratuitement pour du camping, pour des tentes ou des roulottes. 
            Il faut avoir quitté le terrain à 10h le lendemain matin.
          </div>
          <div class="mt-8 mb-10">
            <SkLink
              href="https://www.google.ca/maps/search/Hotels/@45.2334555,-73.108941,10z/data=!3m1!4b1!4m12!2m11!3m6!1sHotels!2sVignoble+de+la+Bauge,+155+Av.+des+%C3%89rables,+Brigham,+Quebec+J2K+4E1!3s0x4cc9dd8000e93a1f:0x3277d269a68f6fb5!4m2!1d-72.854751!2d45.234658!5m2!5m1!1s2022-08-21!6e3"
              target="_blank"
              class="text-heading uppercase rounded-lg px-3 py-2 border-2 transition ease-in-out hover:bg-white/10 hover:shadow-lg active:shadow"
              :style="{ 'border-color': pageColor }"
            >
              Autres options
            </SkLink>
          </div>
          <div class="ob-18-mask absolute left-0 bottom-0 ml-5 mb-8 w-28 h-24 -rotate-45" :style="{ 'background-color': pageColor }" />
          <div class="ob-18-mask absolute bottom-0 right-0 mr-5 mb-8 w-28 h-24 rotate-45 -scale-x-100" :style="{ 'background-color': pageColor }" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
  },
  mounted() {
    setTimeout(() => this.ready = true, 150);
  }
};
</script>

<style lang="scss" scoped>
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