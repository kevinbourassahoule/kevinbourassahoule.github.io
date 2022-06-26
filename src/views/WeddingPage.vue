<i18n>
{
  "en": {
  },
  "fr": {
  }
}
</i18n>

<template>
  <div id="app" class="w-full">
    <div v-if="preload" class="hidden">
      <!-- Preload backgrounds -->
      <img src="../assets/img/maisons.min.jpg" />
      <img src="../assets/img/champ.min.jpg" />
      <img src="../assets/img/arbre-2.min.jpg" />
      <img src="../assets/img/marches-1.jpg" />
    </div>
    <div id="bg" class="w-full transition-colors ease-in-out duration-150" :style="{ 'background-color': pageColor }">
      <div id="bg-back" :class="bgName"></div>
      <div id="bg-middle"></div>
      <!-- <div id="bg-front"></div> -->
    </div>
    <div id="fg" class="transition transition-colors ease-in-out duration-150" :style="{ color: pageColor }">
      <WeddingMenu />
      <transition name="route-view" mode="out-in">
        <router-view />
      </transition>
    </div>
  </div>
</template>

<script>
import * as THREE from 'three';
import BIRDS from 'vanta/dist/vanta.birds.min.js';
import WeddingMenu from "@/components/WeddingMenu";
import { mapGetters } from "vuex";

export default {
  name: "WeddingPage",
  data() {
    return {
      bgName: "houses",
      birds: null,
      preload: false
    };
  },
  computed: {
    ...mapGetters(["weddingDate", "durationUntilWedding", "pageColor"])
  },
  watch: {
    $route() { this.resolveBackground(); }
  },
  methods: {
    resolveBackground() {
      switch (this.$route.name) {
        case "wedding-home":
          this.bgName = "houses";
          break;
        case "wedding-location":
          this.bgName = "field";
          break;
        case "wedding-details":
          this.bgName = "tree";
          break;
        case "wedding-rehearsal":
          this.bgName = "stairs";
          break;
      }
    }
  },
  created() {
    document.title = "Le mariage à Sarah et Kevin";
  },
  mounted() {
    try {
      this.birds = BIRDS({
        THREE,
        el: "#bg-back",
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color1: 0xbe540f,
        color2: 0xfcd870,
        colorMode: "lerpGradient",
        quantity: .5,
        backgroundAlpha: 0.00,
        speedLimit: 4.00
      });
    }
    catch {}

    this.$nextTick(() => { 
      this.preload = true;
      this.resolveBackground()
    });
  },
  beforeDestroy() {
    if (this.birds) {
      try {
        this.birds.destroy();
      }
      catch {}
    }
  },
  components: {
    WeddingMenu
  }
};
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Amiri&family=Playfair+Display+SC&family=Roboto&family=Gothic+A1:wght@100;400;700&display=swap');

@font-face {
  font-family: "TT2020";
  src: url("../assets/fonts/TT2020/TT2020Base-Regular.ttf") format("truetype"),
    url("../assets/fonts/TT2020/TT2020Base-Regular.woff2");
}

@font-face {
  font-family: "Romelio Sans";
  src: url("../assets/fonts/romelio.ttf") format("truetype")
}

@font-face {
  font-family: "Futura PT Demi";
  src: url("../assets/fonts/Futura PT/FuturaPTDemi.otf") format("opentype"),
    url("../assets/fonts/Futura PT/FuturaPTDemi.otf") format("truetype");
}

@font-face {
  font-family: "Futura PT Book";
  src: url("../assets/fonts/Futura PT/FuturaPTBook.otf") format("opentype"),
    url("../assets/fonts/Futura PT/FuturaPTBook.otf") format("truetype");
}

::v-deep {
  font-family: 'Futura PT Book', sans-serif;

  .text-heading {
    font-family: 'Futura PT Demi', sans-serif;
  }

  .text-typewriter {
    font-family: 'TT2020', monospace;
  }

  .bg-paper {
    background-image: url("../assets/img/textures/paper.png");
    background-color: #E9E6D8;
  }
}

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
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  transition: background-image 0.2s ease-in-out;
  width: calc(100% + 2rem);
  height: calc(100% + 2rem);
  margin: -1rem;
  z-index: 1;

  &.houses {
    background-image: url("../assets/img/maisons.min.jpg");
  }

  &.field {
    background-image: url("../assets/img/champ.min.jpg");
  }

  &.tree {
    background-image: url("../assets/img/arbre-2.min.jpg");
  }

  &.stairs {
    background-image: url("../assets/img/marches-1.jpg");
  }
}

#bg-middle {
  background-image: linear-gradient(
    90deg,
    rgba(125, 46, 24, 0.25),
    rgba(11, 44, 40, 0.25)
  );
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
  z-index: 2;
}

#bg-front {
  background-image: url("../assets/img/faire-part.png");
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
