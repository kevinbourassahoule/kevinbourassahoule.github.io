<template>
  <div id="app" class="w-full">
    <div id="bg">
      <div id="bg-back"></div>
      <div id="bg-front"></div>
    </div>
    <div id="fg">
      <TheMenu />
      <router-view />
    </div>
  </div>
</template>

<script>
import TheMenu from "./components/TheMenu";

export default {
  name: "App",
  components: {
    TheMenu
  }
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Parisienne&display=swap");

#bg,
#bg-back,
#bg-front {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

#bg-back {
  background-image: url("assets/img/aajoly-1.jpg");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  width: calc(100% + 2rem);
  height: calc(100% + 2rem);
  margin: -1rem;
  z-index: 1;
  filter: blur(0.5rem);
}

#bg-front {
  background-image: url("assets/img/aajoly-1.jpg");
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
  z-index: 2;
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
</style>
