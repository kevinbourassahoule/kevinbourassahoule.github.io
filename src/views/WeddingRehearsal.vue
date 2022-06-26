<template>
  <div>
    <div class="max-w-prose mt-8 mb-96 px-2 sm:ml-auto sm:pr-12">
      <div class="bg-paper rounded-sm text-typewriter text-black shadow px-6 sm:px-12 pt-6 sm:pt-12 pb-12 text-xl">
        <p class="text-right mb-8">
          {{ rehearsalDate }}
        </p>
        <p class="mb-8">
          {{ invitees.join(" et ") }}
        </p>
        <p class="mb-8">
          {{ inviteeCountString("Cher", "Chère", "Chers") }} 
          {{ inviteeCountString("heureux", "heureuse", "heureux") }}
          {{ inviteeCountString("élu", "élue", "élus") }},
        </p>
        <p class="mb-8">
          Venez vous prélasser chez les parents à Kev le 
          <span class="uppercase">samedi 20 août à midi</span>
          pour un dîner de répétition informel en présence de notre prestigieux cortège.
        </p>
        <p class="mb-8">
          Chaleureusement,
        </p>
        <p>
          Sarah et Kevin
        </p>
        <!-- <div class="w-28 h-28 p-2 ml-auto mr-12 -mt-8 bg-orange-800 shadow-lg rounded-full">
          <div class="bg-black/10 w-24 h-24 rotate-6 rounded-full">
            <div class="monogram-mask bg-orange-700 w-full h-full drop-shadow" />
          </div>
        </div> -->
            <div class="monogram-mask bg-black/90 w-24 h-24 drop-shadow shadow-lg rounded-full ml-auto mr-auto sm:mr-12 mt-8 sm:-mt-8 rotate-6" />

      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "WeddingRehearsal",
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["pageColor", "rehearsalDate"]),
    invitees() {
      var inviteeStr = this.$route.query.avec;

      if (!inviteeStr) {
        return [];
      }

      return inviteeStr.split("_et_");
    },
    gender() {
      var genderStr = this.$route.query.soit;

      if (!genderStr) {
        return "M";
      }

      return genderStr === "bonnefemme" ? "F" : "M";
    }
  },
  methods: {
    inviteeCountString(singularMale, singularFemale, plural) {
      if (this.invitees.length > 1) {
        return plural;
      }

      return this.gender === "F" ? singularFemale : singularMale;
    }
  }
};
</script>

<style scoped lang="scss">
  .monogram-mask {
    mask-image: url('../assets/img/monogram-white.svg');
    mask-repeat: no-repeat;
  }
</style>
