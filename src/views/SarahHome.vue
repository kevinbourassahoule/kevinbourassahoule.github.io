<i18n>
{
  "en": {},
  "fr": {}
}
</i18n>

<template>
  <div
    class="sah fixed top-0 right-0 bottom-0 left-0 bg-contain bg-no-repeat bg-red-900 bg-center flex items-center"
  >
    <div
      class="text-sarah text-white cursor-default pointer-events-none select-none"
    >
      SARAH
    </div>
  </div>
</template>

<script>
export default {
  name: "SarahHome",
  created() {
    document.title = "Sarah Déry";
  }
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Teko:wght@500&display=swap");

.sah {
  font-family: "Teko", sans-serif;
  font-size: 47vw;
  background-image: url("/img/sah.gif");
}

.text-sarah {
  mix-blend-mode: overlay;
  transform: translateY(5.5vw) scaleY(1.6);
}
</style>
