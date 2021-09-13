<i18n>
{
  "en": {},
  "fr": {}
}
</i18n>

<template>
  <div>
    <div
      v-if="$route.name === 'home'"
      class="m-2 p-3 rounded border inline-block"
    >
      <div class="mb-3">
        <router-link
          :to="{ name: 'sarah-home' }"
          class="px-2 py-1 border rounded bg-purple-500"
          >Sarah</router-link
        >
      </div>
      <div class="mb-3">
        <router-link
          :to="{ name: 'wedding-home' }"
          class="px-2 py-1 rounded bg-purple-500"
          >Mariage</router-link
        >
      </div>
      <div class="mb-3">
        <router-link
          :to="{ name: 'lus' }"
          class="px-2 py-1 rounded bg-purple-500"
          >Lus</router-link
        >
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "Home"
};
</script>

<style lang="scss" scoped></style>
