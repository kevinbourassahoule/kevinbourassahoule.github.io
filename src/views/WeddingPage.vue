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
    <div id="bg">
      <progressive-background
        id="bg-back"
        :src="bgHdUrl"
        :placeholder="bgUrl"
      />
      <div id="bg-middle"></div>
      <!-- <div id="bg-front"></div> -->
    </div>
    <div id="fg">
      <WeddingMenu />
      <transition name="route-view" mode="out-in">
        <router-view />
      </transition>
    </div>
  </div>
</template>

<script>
import WeddingMenu from "@/components/WeddingMenu";
import { mapGetters } from "vuex";

export default {
  name: "WeddingPage",
  data() {
    return {
      bgUrl: "/img/maisons.jpg",
      bgHdUrl: "/img/maisons.hd.jpg"
    };
  },
  computed: {
    ...mapGetters(["weddingDate", "durationUntilWedding"])
  },
  watch: {
    $route() {
      switch (this.$route.name) {
        case "wedding-home":
          this.bgUrl = "/img/maisons.jpg";
          this.bgHdUrl = "/img/maisons.hd.jpg";
          break;
        case "wedding-location":
          this.bgUrl = "/img/champ.jpg";
          this.bgHdUrl = "/img/champ.hd.jpg";
          break;
        case "wedding-schedule":
          this.bgUrl = "/img/arbre-2.jpg";
          this.bgHdUrl = "/img/arbre-2.hd.jpg";
          break;
        case "wedding-details":
          this.bgUrl = "/img/maisons.jpg";
          this.bgHdUrl = "/img/maisons.hd.jpg";
          break;
      }
    }
  },
  created() {
    document.title = "Le mariage à Sarah et Kevin";
  },
  components: {
    WeddingMenu
  }
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Amiri&family=Playfair+Display+SC&display=swap");

@font-face {
  font-family: "Erika Ormig";
  src: url("/fonts/erika-ormig.ttf") format("truetype");
}

@font-face {
  font-family: "Romelio Sans";
  src: url("/fonts/romelio.ttf") format("truetype"),
    url("/fonts/otf.ttf") format("otf");
}

/deep/ {
  font-family: "Amiri", serif;
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
  width: calc(100% + 2rem);
  height: calc(100% + 2rem);
  margin: -1rem;
  z-index: 1;
  // filter: blur(0.1rem);
}

#bg-middle {
  background-image: linear-gradient(
    90deg,
    rgba(11, 44, 40, 0.25),
    rgba(125, 46, 24, 0.25)
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

// h1,
// h2,
// h3,
// h4,
// h5,
// h6 {
//   font-family: "Parisienne", cursive;
// }

.route-view-enter-active,
.route-view-leave-active {
  @apply transition-opacity;
  @apply duration-300;
}
.route-view-enter,
.route-view-leave-to {
  opacity: 0;
}

/deep/ .text-heading {
  font-family: "Playfair Display SC", serif;
}
</style>
