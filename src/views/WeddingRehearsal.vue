<template>
  <div class="fixed top-14 right-0 bottom-0 left-0 overflow-y">
    <div class="absolute right-0 w-screen md:w-auto md:max-w-prose mt-8 px-2 md:pr-12 transition-transform translate-x-full duration-500" :class="{ 'translate-x-0' : view === 'LETTER' }">
      <div class="relative bg-paper rounded-sm text-typewriter text-black shadow px-6 sm:px-12 pt-6 sm:pt-12 pb-12 sm:text-xl">
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
          On {{ inviteeCountString("t'invite", "t'invite", "vous invite") }} 
          à {{ inviteeCountString("te", "te", "vous") }} 
          prélasser chez les parents à Kev le 
          <span class="uppercase">samedi 20 août à midi</span>
          pour un dîner de répétition informel en présence de notre prestigieux cortège.
        </p>
        <p class="mb-8">
          Chaleureusement,
        </p>
        <p class="mb-8">
          Sarah et Kevin
        </p>
        <!-- <div class="w-28 h-28 p-2 ml-auto mr-12 -mt-8 bg-orange-800 shadow-lg rounded-full">
          <div class="bg-black/10 w-24 h-24 rotate-6 rounded-full">
            <div class="monogram-mask bg-orange-700 w-full h-full drop-shadow" />
          </div>
        </div> -->
        <p>
          <a href="#" class="border-b border-black" @click.prevent="view = 'RSVP'">Cliquez ici pour RSVP</a>
        </p>
        <div class="monogram-mask bg-black/90 w-20 sm:w-24 h-20 sm:h-24 drop-shadow shadow-lg rounded-full absolute bottom-0 right-0 mb-24 mr-6 sm:mr-24 rotate-6" />
      </div>
    </div>
    <iframe 
      :src="respondentUrl"
      class="absolute right-0 w-screen md:max-w-prose transition-transform translate-x-full duration-500 delay-1000"
      :class="{ 'translate-x-0' : view === 'RSVP' }"
      style="height: calc(100vh - 3.5rem)"></iframe>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "WeddingRehearsal",
  data() {
    return {
      view: "LETTER"
    };
  },
  computed: {
    ...mapState(["actors"]),
    ...mapGetters(["pageColor", "rehearsalDate"]),
    actor() {
      return this.actors.find(x => x.id === this.$route.query.avec);
    },
    invitees() {
      if (!this.actor) return [];

      return [this.actor.rehearsalName || this.actor.name, this.actor.plusOne].filter(x => x);
    },
    gender() {
      return this.actor ? this.actor.gender : "m";
    },
    assignationId() {
      return this.$route.query.a;
    },
    respondentUrl() {
      return "https://questionnaire.simplesondage.com/f/s.aspx?s=f36cda4d-ef8b-4abd-b224-44f0021bd4b7" + 
        (this.actor && this.actor.rehearsalId ? "&a=" + this.actor.rehearsalId : "");
    }
  },
  methods: {
    inviteeCountString(singularMale, singularFemale, plural) {
      if (this.invitees.length > 1) {
        return plural;
      }

      return this.gender === "f" ? singularFemale : singularMale;
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
