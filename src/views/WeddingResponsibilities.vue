<template>
  <div class="bg-paper rounded-sm max-w-2xl mx-auto text-white my-8 p-4" :style="{ color: pageColor }">
    <div class="border-2 p-4" :style="{ 'border-color': pageColor }">
      <h1 class="text-heading text-center text-5xl uppercase py-16">Responsabilités</h1>
      <div class="text-xl">
        <ul v-for="responsibility in responsibilities" :key="responsibility.actorId">
          <li class="flex items-start mb-8">
            <div class="rounded-full bg-cover p-4 mr-4" :class="`actor-${responsibility.actorId}`"></div>
            <div class="mt-1">
              <div class="text-heading uppercase">{{ getActorName(responsibility.actorId) }}</div>
              <ul class="flex-grow-1">
                <li v-for="item in responsibility.items" :key="item">- <span v-html="item"></span></li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "WeddingResponsibilities",
  data() {
    return {};
  },
  computed: {
    ...mapState(["actors"]),
    ...mapGetters(["pageColor"]),
    responsibilities() {
      return [
        {
          actorId: "sah",
          items: [
            "Se marier à Kev"
          ]
        }, {
          actorId: "kbh",
          items: [
            "Se marier à Sah",
          ]
        }, {
          actorId: "guylou",
          items: [
            "Faire un speech avec René",
            "Aider avec l'organisation de la table de desserts"
          ]
        }, {
          actorId: "ren",
          items: [
            "Faire un speech avec Guylou",
            "Faire une danse avec Sah",
            "Verser un nombre record de larmes"
          ]
        }, {
          actorId: "friloux",
          items: [
            "Faire un speech avec Geneviève"
          ]
        }, {
          actorId: "bouboue",
          items: [
            "Faire un speech avec David"
          ]
        }, {
          actorId: "lus",
          items: [
            "Célébrer le mariage",
            "Animer le mariage avec Flo (MC)",
            "Faire respecter l'horaire",
            "Refuser toute occasion pour jouer au frisbee le 21 AOÛT 2022 (à noter au calendrier, c'est la date qu'on se marie " + 
              "<a class=\"underline text-emerald-900\" target=\"_blank\" href=\"mailto:cao.ludovic@gmail.com?subject=SOS%20-%20Sah%20et%20Kev%20se%20marient%20le%2021%20AO%C3%9BT%202022&body=Bonjour%20Ludovic%2C%0D%0A%0D%0ACeci%20est%20un%20rappel%20que%20tes%20bons%20amis%20SARAH%20D%C3%89RY%20et%20KEVIN%20BOURASSA-HOULE%20se%20marient%20le%2021%20AO%C3%9BT%202022%20au%20Vignoble%20de%20la%20Bauge.%20%20Puisque%20ce%20serait%20malaisant%20que%20notre%20c%C3%A9l%C3%A9brant%20manque%20%C3%A0%20cet%20appel%2C%20ta%20pr%C3%A9sence%20est%20de%20mise.%0D%0A%0D%0AAu%20plaisir%20de%20se%20resserrer%20la%20pince%20dans%20un%20avenir%20proche%2C%0D%0A%0D%0ASah%2C%20Kev%20ou%20quelqu'un%20en%20leur%20nom\">@Ludovic Cao</a>)",
            "Garder son sang-froid"
          ]
        }, {
          actorId: "flo",
          items: [
            "Animer le mariage avec Lud (MC)",
            "Faire respecter l'horaire",
            "Rire très fort, mais à moins de 85 décibels (limitation de la salle)"
          ]
        }, {
          actorId: "pirrrz",
          items: [
            "Faire un speech avec Frestopher",
            "Prendre l'occasion d'être entouré de nouveaux gens pour répéter ses histoires préférées"
          ]
        }, {
          actorId: "fres",
          items: [
            "Faire un speech avec Pirrrz"
          ]
        }, {
          actorId: "camou",
          items: [
            "Boire beaucoup d'eau"
          ]
        }, {
          actorId: "jenn",
          items: [
            "Partager la soirée intégrale sur Instagram et insister que le hashtag <a class=\"underline text-emerald-900\" target=\"_blank\" href=\"https://www.instagram.com/explore/tags/SarahEtKevin2022\">#SarahEtKevin2022</a> soit inclus dans toutes les publications des invités"
          ]
        }, {
          actorId: "eli",
          items: [
            "Empêcher Sah de regarder son BPM sur sa montre"
          ]
        }, {
          actorId: "julie",
          items: [
            "Surveiller les Proteau et minimiser le rayon de vin renversé entourant Jocelyne"
          ]
        }, {
          actorId: "vache",
          items: [
            "Jongler la complexité d'être à la fois groomsman et bridesman"
          ]
        }, {
          actorId: "frank",
          items: [
            "Oublier sa soirée",
            "Cibler les flancs"
          ]
        }, {
          actorId: "ant",
          items: [
            "Memer compulsivement",
            "Interpéter la danse du crabe"
          ]
        }, {
          actorId: "dave",
          items: [
            "Manger un maximum de tranches de pain au raisin (pain au raison non inclus)"
          ]
        }
      ];
    }
  },
  methods: {
    getActorName(actorId) {
      const actor = this.actors.find(x => x.id === actorId);

      return actor.nickname || actor.name;
    }
  }
};
</script>

<style scoped lang="scss"></style>
