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
            "Marier Kev"
          ]
        }, {
          actorId: "kbh",
          items: [
            "Marier Sah",
          ]
        }, {
          actorId: "guylou",
          items: [
            "Faire un speech avec René",
            "Aider avec l'organisation de la table de desserts",
            "Aider à placer les tables le matin",
            "Placer les marque-places en fonction du plan de salle pendant le first look, après l'arrivée du traiteur",
            "Ramener les gens à l'ordre avec un fameux EILLE 👉"
          ]
        }, {
          actorId: "ren",
          items: [
            "Faire un speech avec Guylou",
            "Faire une danse avec Sah",
            "Verser toutes les larmes de son corps"
          ]
        }, {
          actorId: "friloux",
          items: [
            "Faire un speech avec Geneviève",
            "Porter 4 épaisseurs pour éviter de prendre froid un 21 août"
          ]
        }, {          
          actorId: "bouboue",
          items: [
            "Faire un speech avec David",
            "Faire une danse avec Kev",
            "Prononcer des mots d'une manière que Van pourra parodier"
          ]
        }, {
          actorId: "lus",
          items: [
            "Célébrer le mariage",
            "Animer le mariage avec Flo",
            "Faire respecter l'horaire",
            "Refuser toute occasion pour jouer au frisbee le 21 AOÛT 2022 (à noter au calendrier, c'est la date qu'on se marie " + 
              "<a class=\"underline text-emerald-900\" target=\"_blank\" href=\"mailto:cao.ludovic@gmail.com?subject=SOS%20-%20Sah%20et%20Kev%20se%20marient%20le%2021%20AO%C3%9BT%202022&body=Bonjour%20Ludovic%2C%0D%0A%0D%0ACeci%20est%20un%20rappel%20que%20tes%20bons%20amis%20SARAH%20D%C3%89RY%20et%20KEVIN%20BOURASSA-HOULE%20se%20marient%20le%2021%20AO%C3%9BT%202022%20au%20Vignoble%20de%20la%20Bauge.%20%20Puisque%20ce%20serait%20malaisant%20que%20notre%20c%C3%A9l%C3%A9brant%20manque%20%C3%A0%20cet%20appel%2C%20ta%20pr%C3%A9sence%20est%20de%20mise.%0D%0A%0D%0AAu%20plaisir%20de%20se%20resserrer%20la%20pince%20dans%20un%20avenir%20proche%2C%0D%0A%0D%0ASah%2C%20Kev%20ou%20quelqu'un%20en%20leur%20nom\">@Ludovic Cao</a>)",
            "Garder son sang-froid"
          ]
        }, {
          actorId: "flo",
          items: [
            "Animer le mariage avec Lud",
            "Faire respecter l'horaire",
            "Faire un speech",
            "Aider à placer les tables le matin",
            "Placer les marque-places en fonction du plan de salle pendant le first look, après l'arrivée du traiteur",
            "Rire très fort, mais à moins de 85 décibels (limitation de la salle)"
          ]
        }, {
          actorId: "van",
          items: [
            "Donner les cues pour l'entrée de la cérémonie",
            "Accompagner Isla pendant qu'elle remplit ses devoirs de cérémonie",
            "S'assurer qu'Isla chigne moins fort que Sah",
            "Faire des danses suspectes"
          ]
        }, {
          actorId: "isla",
          items: [
            "Traîner un bouquet",
            "Être adorbs"
          ]
        }, {
          actorId: "pirrrz",
          items: [
            "Faire un speech avec Frestopher",
            "Surveiller l'horaire au cas où Lud et Flo foirent",
            "Prendre l'occasion d'être entouré de nouveaux gens pour répéter ses histoires préférées"
          ]
        }, {
          actorId: "fres",
          items: [
            "Faire un speech avec Pirrrz",
            "Surveiller l'horaire au cas où Lud et Flo foirent",
            "Résister à la tentation de porter des jogging-shorts bourgognes troués"
          ]
        },{
          actorId: "camou",
          items: [
            "Aider à placer les tables le matin",
            "Placer les marque-places en fonction du plan de salle pendant le first look, après l'arrivée du traiteur",
            "Boire et faire boire beaucoup d'eau"
          ]
        }, {
          actorId: "jenn",
          items: [
            "Aider à placer les tables le matin",
            "Placer les marque-places en fonction du plan de salle pendant le first look, après l'arrivée du traiteur",
            "Partager la soirée intégrale sur Instagram et insister que le hashtag <a class=\"underline text-emerald-900\" target=\"_blank\" href=\"https://www.instagram.com/explore/tags/SarahEtKevin2022\">#SarahEtKevin2022</a> soit inclus dans toutes les publications des invités"
          ]
        }, {
          actorId: "eli",
          items: [
            "Aider à placer les tables le matin",
            "Placer les marque-places en fonction du plan de salle pendant le first look, après l'arrivée du traiteur",
            "Empêcher Sah de regarder son BPM sur sa montre"
          ]
        }, {
          actorId: "julie",
          items: [
            "Aider à placer les tables le matin",
            "Placer les marque-places en fonction du plan de salle pendant le first look, après l'arrivée du traiteur",
            "Surveiller les Proteau et minimiser le rayon de vin renversé entourant Jocelyne"
          ]
        }, {
          actorId: "vache",
          items: [
            "Ramasser la boîte cadeaux en soirée vers 19h00 et la rapporter dans la salle de préparatifs",
            "Jongler la complexité d'être à la fois groomsman et bridesman"
          ]
        }, {
          actorId: "frank",
          items: [
            "Déplacer l'arche de l'espace cérémonie à l'intérieur derrière la table d'honneur pendant le cocktail",
            "Boire et faire boire beaucoup de boisson interdite",
            "Oublier tout entre 22h00 et 10h00",
            "Cibler les flancs"
          ]
        }, {
          actorId: "ant",
          items: [
            "Memer",
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
