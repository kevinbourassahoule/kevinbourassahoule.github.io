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
  <div id="app" class="w-full">
    <div id="bg">
      <div id="bg-back"></div>
      <div id="bg-middle"></div>
      <div id="bg-front"></div>
    </div>
    <div id="fg">
      <TheMenu />
      <div
        class="text-white text-center font-light px-4 mt-16 absolute top-0 left-0 right-0"
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
      <transition name="route-view" mode="out-in">
        <router-view />
      </transition>
    </div>
  </div>
</template>

<script>
import TheMenu from "@/components/TheMenu";
import { mapGetters } from "vuex";

export default {
  name: "WeddingHome",
  computed: {
    ...mapGetters(["weddingDate", "durationUntilWedding"])
  },
  created() {
    document.title = "Le mariage à Sarah et Kevin";
  },
  components: {
    TheMenu
  }
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Parisienne&display=swap");

#bg,
#bg-back,
#bg-middle,
#bg-front {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

#bg-back {
  background-image: url("/img/champ.jpg");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  width: calc(100% + 2rem);
  height: calc(100% + 2rem);
  margin: -1rem;
  z-index: 1;
  filter: blur(0.1rem);
}

#bg-middle {
  background-image: linear-gradient(
    90deg,
    rgba(11, 44, 40, 0.25) 50%,
    rgba(125, 46, 24, 0.25) 50%
  );
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
  z-index: 2;
}

#bg-front {
  background-image: url("/img/faire-part.png");
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
  z-index: 3;
}

#fg {
  position: relative;
  z-index: 2;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: "Parisienne", cursive;
}

.route-view-enter-active,
.route-view-leave-active {
  @apply transition-opacity;
  @apply duration-300;
}
.route-view-enter,
.route-view-leave-to {
  opacity: 0;
}
</style>
