<template>
  <div class="flex">
    <div class="text-white max-w-md mt-12 ml-6 md:ml-0 text-2xl">
      <div
        v-for="item in weddingScheduleItems"
        :key="item.from"
        class="md:flex items-baseline mb-4"
      >
        <div class="w-64 font-semibold md:text-right md:mr-10">
          {{ item.from }}
          -
          {{ item.to }}
        </div>
        <div class="flex-grow-1">
          {{ item.description }}
        </div>
      </div>
    </div>
    <!-- <div class="bg-cover h-screen" style="background-image: url('/img/arbre.jpg')" /> -->
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "WeddingSchedule",
  computed: {
    ...mapState(["weddingScheduleItems"])
  }
};
</script>
