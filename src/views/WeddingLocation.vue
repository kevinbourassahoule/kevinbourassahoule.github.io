<template>
  <div class="text-center mt-32">
    <div class="flex flex-col lg:flex-row items-center justify-around mx-4">
      <img
        src="/img/vignoble-grange-ext.jpg"
        class="max-w-sm border-4 rounded border-orange-300 order-2 lg:order-1 mb-8 lg:mb-0"
      />
      <div class="order-1 lg:order-2">
        <div class="mb-8">
          <SkLink
            href="https://labauge.com"
            target="_blank"
            class="text-white text-5xl font-light hover:underline"
          >
            Le Vignoble la Bauge
          </SkLink>
        </div>
        <div class="mb-16 lg:mb-0">
          <SkLink
            href="https://g.page/vignoble-bauge?share"
            target="_blank"
            class="inline-block text-white text-heading text-2xl font-light hover:underline mx-4"
          >
            Directions
          </SkLink>
          <SkLink
            href="https://labauge.com"
            target="_blank"
            class="inline-block text-white text-heading text-2xl font-light hover:underline mx-4"
          >
            Accommodations
          </SkLink>
        </div>
      </div>
      <img
        src="/img/vignoble-grange-ext-2.jpg"
        class="max-w-sm border-4 rounded border-orange-300 order-3 mb-8 lg:mb-0"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "WeddingLocation"
};
</script>

<style lang="scss" scoped>
.img-location-1 {
  background-image: url("/img/vignoble-grange-ext.jpg");
}
</style>
