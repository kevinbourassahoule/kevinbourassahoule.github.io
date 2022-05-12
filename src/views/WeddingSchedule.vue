<template>
  <div class="paper max-w-2xl mx-auto text-white mt-8 p-4" style="background-color: #E9E6D8" :style="{ color: pageColor }">
    <div class="border-2 p-4" :style="{ 'border-color': pageColor }">
      <h1 class="text-heading text-center text-5xl uppercase py-16">Horaire</h1>
      <!-- <div class="flex">
        <div class="w-20 border-r"></div>
        <h2 v-for="location in locations" :key="location.id" class="flex-1 text-heading text-center text-4xl uppercase mb-6">
          {{ location.name }}
        </h2>
      </div> -->
      <div>
        <div v-for="day in days" :key="day.name">
          <div class="flex">
            <div class="w-24"></div>
            <h3 class="grow text-heading text-3xl uppercase pl-2 pb-3">
              {{ day.name }}
            </h3>
          </div>
          <div>
            <div v-for="event in day.events" :key="event.time" class="flex">
              <div class="w-24 text-right text-xl pr-2 mr-2 ">
                <span v-for="(letter, index) in event.time" :key="index" class="inline-block text-center w-3">{{ letter }}</span>
              </div>
              <div v-for="location in locations" :key="location.id" class="text-justify text-xl mb-2">
                <div v-if="event.locationId === location.id">{{ event.description }}</div>
              </div>
            </div>
          </div>
          <div class="flex">
            <div class="w-24"></div>
            <div class="pb-8"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "WeddingSchedule",
  computed: {
    ...mapGetters(["pageColor"])
  },
  data() {
    return {
      locations: [
        {
          id: 1,
          name: "Maison",
        }, 
        {
          id: 2,
          name: "Vignoble"
        }, 
        {
          id: 3,
          name: "Auberge"
        }
      ],
      days: [
        {
          name: "Samedi",
          events: [
            {
              time: "17:00",
              locationId: 1,
              description: "Début de la répétition"
            },
            {
              time: "19:00",
              locationId: 1,
              description: "Début de la souper de la répétition"
            },
            {
              time: "22:00",
              locationId: 1,
              description: "Fin du souper de la répétition"
            }
          ]
        },
        {
          name: "Dimanche",
          events: [
            {
              time: "8:00",
              locationId: 1,
              description: "Départ vers le vignoble"
            },
            {
              time: "9:00",
              locationId: 2,
              description: "Arrivée de la coiffeuse et de la maquilleuse"
            },
            {
              time: "9:15",
              locationId: 2,
              description: "Début du maquillage du cortège"
            },
            {
              time: "13:00",
              locationId: 2,
              description: "Arrivée de la photographe"
            },
            {
              time: "14:00",
              locationId: 2,
              description: "Arrivée du traiteur"
            },
            {
              time: "15:00",
              locationId: 2,
              description: "Enregistrement à l'auberge West Brome"
            },
            {
              time: "15:30",
              locationId: 2,
              description: "Départ de la navette de l'auberge vers le vignoble"
            },
            {
              time: "15:50",
              locationId: 2,
              description: "Arrivée des musiciens"
            },
            {
              time: "16:00",
              locationId: 2,
              description: "Musiciens commencent à jouer"
            },
            {
              time: "16:30",
              locationId: 2,
              description: "Début de la cérémonie"
            },
            {
              time: "17:00",
              locationId: 2,
              description: "Début du cocktail"
            },
            {
              time: "18:20",
              locationId: 2,
              description: "Invités sont dirigés vers la grange"
            },
            {
              time: "18:30",
              locationId: 2,
              description: "Introduction"
            },
            {
              time: "18:35",
              locationId: 2,
              description: "Première danse"
            },
            {
              time: "18:45",
              locationId: 2,
              description: "Les invités sont invités à se joindre à la piste de danse"
            },
            {
              time: "18:55",
              locationId: 2,
              description: "Les invités trouvent leur place assise"
            },
            {
              time: "19:00",
              locationId: 2,
              description: "Début du service au buffet"
            },
            {
              time: "19:15",
              locationId: 2,
              description: "Discours de bienvenue des mariés"
            },
            {
              time: "19:30",
              locationId: 2,
              description: "Discours de la demoiselle d'honneur"
            },
            {
              time: "19:35",
              locationId: 2,
              description: "Discours des garçons d'honneur"
            },
            {
              time: "19:45",
              locationId: 2,
              description: "Début du service de la sweet table et station café"
            },
            {
              time: "20:15",
              locationId: 2,
              description: "Danse des parents"
            },
            {
              time: "21:00",
              locationId: 2,
              description: "Découpage du gâteau"
            },
            {
              time: "22:00",
              locationId: 2,
              description: "1er départ de la navette du vignoble vers l'auberge"
            },
            {
              time: "22:30",
              locationId: 2,
              description: "Service du late snack"
            },
            {
              time: "23:00",
              locationId: 2,
              description: "Départ de la photographe"
            },
            {
              time: "23:30",
              locationId: 2,
              description: "Départ du traiteur"
            },
            {
              time: "00:00",
              locationId: 2,
              description: "2e départ de la navette du vignoble vers l'auberge"
            },
            {
              time: "02:00",
              locationId: 2,
              description: "Dernier départ de la navette du vignoble vers l'auberge"
            }
          ]
        },
        {
          name: "Lundi",
          events: [
            { 
              time: "11:00",
              locationId: 3,
              description: "Début du brunch"
            },
            { 
              time: "13:00",
              locationId: 3,
              description: "Fin du brunch"
            }
          ]
        }
      ]
    };
  }
};
</script>

<style scoped lang="scss">
  .paper {
    background-image: url("../assets/img/textures/paper.png");
  }
</style>
