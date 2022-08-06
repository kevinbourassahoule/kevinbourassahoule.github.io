<template>
  <div class="bg-paper rounded-sm max-w-2xl mx-auto text-white my-8 p-4" :style="{ color: pageColor }">
    <div class="border-2 p-4" :style="{ 'border-color': pageColor }">
      <h1 class="text-heading text-center text-5xl uppercase pt-16 pb-8">Horaire</h1>
      <div class="pb-8">
        <div v-for="(actorRow, i) in actorGrid" :key="i" class="flex justify-center">
          <div v-for="actor in actorRow" :key="actor.id" class="w-6 h-6 sm:w-12 sm:h-12 mx-1 mb-2">
            <button v-if="actor" type="button" :title="actor.name"
              class="w-full h-full rounded-full bg-cover transition-all hover:scale-110"
              :class="[
                `actor-${actor.id}`,
                 activeActorId !== null && activeActorId !== actor.id ? 'opacity-25' : null,
                 activeActorId === actor.id && 'scale-110'
                ]"
              @click="activeActorId = activeActorId !== actor.id ? actor.id : null"></button>
          </div>
        </div>
      </div>
      <div class="text-center pb-8 print:hidden">
        <button 
          class="inline-flex items-center border px-3 py-1 rounded-full transition-colors" 
          :class="debug ? 'border-emerald-900/50 bg-emerald-900/25 text-emerald-900' : 'border-current'"
          @click="debug = !debug"
         >
          <span class="overflow-hidden transition-all text-emerald-900" :class="debug ? 'w-4' : 'w-0'">
            ✓
          </span>
          <span>Afficher les personnes concernées</span>
        </button>
      </div>
      <div>
        <div v-for="day in days" :key="day.name">
          <div class="sm:flex" :class="isDayHighlighted(day) ? null : 'opacity-25'">
            <div class="hidden sm:block sm:w-24 position-relative">
              <div class="absolute ob-18-mask w-16 h-16 ml-6 mt-1 -rotate-90 -scale-x-100" :style="{ 'background-color': pageColor }" />
            </div>
            <h3 class="grow text-heading text-3xl uppercase sm:pl-2 pb-3">
              {{ day.name }}
            </h3>
          </div>
          <div>
            <div
              v-for="moment in day.moments" 
              :key="moment.time" 
              class="sm:flex mb-4 sm:mb-0 transition-opacity"
            >
              <div class="sm:w-24 sm:text-right text-xl pr-2 mr-2 shrink-0" :class="isTimeHighlighted(moment) ? null : 'opacity-25'">
                <span v-for="(letter, index) in moment.time" :key="index" class="inline-block text-center w-3">{{ letter
                }}</span>
              </div>
              <div class="text-justify text-xl sm:mb-2">
                <div
                  v-for="event in moment.events" 
                  :key="event.description" 
                  class="mb-2"
                  :class="isEventHighlighted(event) ? null : 'opacity-25'"
                >
                  <div>
                    {{ event.description }}
                  </div>
                  <div v-if="debug" class="-mt-1">
                    <span 
                      v-for="actorId in getResolvedActorIds(event.actorIds)" 
                      :key="actorId"
                      class="inline-block bg-cover w-4 h-4 mr-1 rounded-full"
                      :class="`actor-${actorId}`"
                    ></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="sm:flex">
            <div class="sm:w-24"></div>
            <div class="pb-8"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "WeddingSchedule",
  computed: {
    ...mapState(["actors"]),
    ...mapGetters(["pageColor"]),
    actorGrid() {
      return [
        ["sah", "kbh"],
        ["ren", "guylou", "flo", "fres", "pirrrz", "van", "isla", "bouboue", "friloux"],
        ["julie", "jenn", "eli", "camou", "vache", "lus", "frank", "dave", "ant"],
        ["france", "caro", "aaj", "mf", "2g", "fleur"],
      ].map(actorIds => actorIds.map(actorId => this.actors.find(x => x.id === actorId)));
    },
    activeDays() {
      if (!this.activeActorId) return this.days;

      return this.days
        .map(day => ({
          name: day.name,
          events: day.events.filter(event => event.actorIds?.includes(this.activeActorId) ?? false)
        }))
        .filter(day => day.events.length > 0);
    }
  },
  methods: {
    isDayHighlighted(day) {
      return day.moments.some(this.isTimeHighlighted);
    },
    isTimeHighlighted(moment) {
      return moment.events.some(this.isEventHighlighted);
    },
    isEventHighlighted(event) {
      if (!this.activeActorId) return true;
      if (!event.actorIds) return false;
      if (event.actorIds === "ALL") return true;
      if (event.actorIds === "CORTEGE") return this.actorGrid.slice(0, -1).flat().some(x => x.id === this.activeActorId);

      return event.actorIds.includes(this.activeActorId);
    },
    getResolvedActorIds(actorIds) {
      if (actorIds === "ALL") return this.actorGrid.flat().map(x => x.id);
      if (actorIds === "CORTEGE") return this.actorGrid.slice(0, -1).flat().map(x => x.id);

      return actorIds;
    }
  },
  data() {
    return {
      debug: false,
      activeActorId: null,
      days: [
        {
          name: "Samedi",
          moments: [
            {
              time: "12:00",
              events: [
                {
                  description: "Début du dîner de répétition",
                  actorIds: "CORTEGE"
                }
              ]
            },
            {
              time: "15:00",
              events: [
                {
                  description: "Fin du dîner de répétition",
                  actorIds: "CORTEGE"
                }
              ]
            }
          ]
        },
        {
          name: "Dimanche",
          moments: [
            {
              time: "8:00",
              events: [
                {
                  description: "Départ vers le vignoble",
                  actorIds: ["kbh", "sah"]
                }
              ]
            },
            {
              time: "9:00",
              events: [
                {
                  description: "Arrivée de la coiffeuse",
                  actorIds: ["caro"]
                },
                {
                  description: "Arrivée de la maquilleuse",
                  actorIds: ["france"]
                }
              ]
            },
            {
              time: "9:15",
              events: [
                {
                  description: "Début du maquillage du cortège",
                  actorIds: ["sah", "flo", "camou", "france"]
                }
              ]
            },
            {
              time: "11:00",
              events: [
                {
                  description: "Arrivée de la fleuriste",
                  actorIds: ["fleur"]
                }
              ]
            },
            {
              time: "13:00",
              events: [
                {
                  description: "Arrivée de la photographe",
                  actorIds: ["aaj"]
                }
              ]
            },
            {
              time: "13:45",
              events: [
                {
                  description: "Photographie des préparatifs de Sarah (vêtements, fleurs, voeux, alliance, etc.)",
                  actorIds: ["sah", "guylou", "flo", "julie", "jenn", "eli", "camou", "aaj"]
                }
              ]
            },
            {
              time: "14:00",
              events: [
                {
                  description: "Arrivée du traiteur",
                  actorIds: ["2g"]
                }
              ]
            },
            {
              time: "14:45",
              events: [
                {
                  description: "First look",
                  actorIds: ["sah", "kbh", "aaj"]
                }
              ]
            },
            {
              time: "15:00",
              events: [
                {
                  description: "Enregistrement à l'auberge West Brome",
                  actorIds: ["sah", "kbh", "ren", "bouboue", "friloux", "van"]
                }
              ]
            },
            {
              time: "15:30",
              events: [
                {
                  description: "Arrivée des musiciens",
                  actorIds: ["mf"]
                }
              ]
            },
            {
              time: "15:40",
              events: [
                {
                  description: "Départ de la navette du Airbnb vers le vignoble",
                  actorIds: ["lus", "fres", "vache", "frank", "dave", "ant"]
                }
              ]
            },
            {
              time: "15:45",
              events: [
                {
                  description: "Départ de la navette de l'auberge vers le vignoble",
                  actorIds: ["guylou", "ren", "bouboue", "friloux"]
                },
                {
                  description: "Fin du first look",
                  actorIds: ["sah", "kbh", "aaj"]
                }
              ]
            },
            {
              time: "16:00",
              events: [
                {
                  description: "Musiciens commencent à jouer",
                  actorIds: ["mf"]
                }
              ]
            },
            {
              time: "16:30",
              events: [
                {
                  description: "Début de la cérémonie",
                  actorIds: "ALL"
                }
              ]
            },
            {
              time: "17:00",
              events: [
                {
                  description: "Fin de la cérémonie",
                  actorIds: "ALL"
                },
                {
                  description: "Début du cocktail",
                  actorIds: "ALL"
                },
                {
                  description: "Photos du groupe",
                  actorIds: ["aaj"]
                }
              ]
            },
            {
              time: "17:10",
              events: [
                {
                  description: "Photos de la famille immédiate",
                  actorIds: ["sah", "kbh", "guylou", "ren", "bouboue", "friloux", "flo", "van", "isla", "aaj"]
                }
              ]
            },
            {
              time: "17:25",
              events: [
                {
                  description: "Photos avec le cortège",
                  actorIds: "CORTEGE"
                }
              ]
            },
            {
              time: "17:45",
              events: [
                {
                  description: "Fin des photos",
                  actorIds: ["aaj"]
                }
              ]
            },
            {
              time: "18:15",
              events: [
                {
                  description: "Invités, sauf le cortège, sont dirigés vers la grange",
                  actorIds: ["lus", "flo"]
                }
              ]
            },
            {
              time: "18:30",
              events: [
                {
                  description: "Fin du cocktail",
                  actorIds: ["mf"]
                },
                {
                  description: "Introduction du cortège",
                  actorIds: ["lus", "flo", "pirrrz", "fres", "van", "isla", "julie", "jenn", "eli", "camou", "vache", "frank", "dave", "ant"]
                },
                {
                  description: "Introduction des parents des mariés",
                  actorIds: ["lus", "flo", "guylou", "ren", "bouboue", "friloux"]
                },
                {
                  description: "Introduction des mariés",
                  actorIds: ["lus", "flo", "sah", "kbh"]
                }
              ]
            },
            {
              time: "18:35",
              events: [
                {
                  description: "Première danse des mariés",
                  actorIds: ["sah", "kbh"]
                }
              ]
            },
            {
              time: "18:40",
              events: [
                {
                  description: "Discours de bienvenue des mariés",
                  actorIds: ["sah", "kbh"]
                }
              ]
            },
            {
              time: "18:45",
              events: [
                {
                  description: "Danse gênante du marié et de ses groomsmen",
                  actorIds: ["kbh", "pirrrz", "fres", "lus", "frank", "dave", "ant", "vache"]
                }
              ]
            },
            {
              time: "18:50",
              events: [
                {
                  description: "Début du service au buffet",
                  actorIds: ["2g"]
                }
              ]
            },
            {
              time: "19:30",
              events: [
                {
                  description: "Photos de couple au coucher du soleil",
                  actorIds: ["sah", "kbh", "aaj"]
                }
              ]
            },
            {
              time: "20:00",
              events: [
                {
                  description: "Discours de la demoiselle d'honneur",
                  actorIds: ["flo"]
                }
              ]
            },
            {
              time: "20:05",
              events: [
                {
                  description: "Discours des garçons d'honneur",
                  actorIds: ["pirrrz", "fres"]
                }
              ]
            },
            {
              time: "20:10",
              events: [
                {
                  description: "Discours de Camille",
                  actorIds: ["camou"]
                }
              ]
            },
            {
              time: "20:15",
              events: [
                {
                  description: "Discours des parents à Sarah",
                  actorIds: ["guylou", "ren"]
                }
              ]
            },
            {
              time: "20:30",
              events: [
                {
                  description: "Discours des parents à Kevin",
                  actorIds: ["bouboue", "friloux"]
                }
              ]
            },
            {
              time: "20:45",
              events: [
                {
                  description: "Découpage du gâteau",
                  actorIds: ["sah", "kbh"]
                },
                {
                  description: "Début du service de la sweet table et station café",
                  actorIds: ["2g"]
                }
              ]
            },
            {
              time: "21:15",
              events: [
                {
                  description: "Danse de Sarah avec son père",
                  actorIds: ["sah", "ren"]
                }
              ]
            },
            {
              time: "21:20",
              events: [
                {
                  description: "Danse de Kevin avec sa mère",
                  actorIds: ["kbh", "bouboue"]
                }
              ]
            },
            {
              time: "21:25",
              events: [
                {
                  description: "Début du party",
                  actorIds: "ALL"
                }
              ]
            },
            {
              time: "22:00",
              events: [
                {
                  description: "1er départ de la navette du vignoble vers l'auberge",
                  actorIds: "CORTEGE"
                },
                {
                  description: "Départ de la photographe",
                  actorIds: ["aaj"]
                }
              ]
            },
            {
              time: "22:30",
              events: [
                {
                  description: "Service du late snack",
                  actorIds: ["2g"]
                }
              ]
            },
            {
              time: "23:30",
              events: [
                {
                  description: "Départ du traiteur",
                  actorIds: ["2g"]
                }
              ]
            },
            {
              time: "00:00",
              events: [
                {
                  description: "2e départ de la navette du vignoble vers l'auberge",
                  actorIds: "CORTEGE"
                }
              ]
            },
            {
              time: "02:00",
              events: [
                {
                  description: "Dernier départ de la navette du vignoble vers l'auberge et vers le Airbnb",
                  actorIds: "CORTEGE"
                }
              ]
            }
          ]
        },
        {
          name: "Lundi",
          moments: [
            {
              time: "10:00",
              events: [
                {
                  description: "Début du brunch",
                  actorIds: "CORTEGE"
                }
              ]
            },
            {
              time: "12:00",
              events: [
                {
                  description: "Fin du brunch",
                  actorIds: "CORTEGE"
                }
              ]
            }
          ]
        }
      ]
    };
  }
};
</script>

<style scoped lang="scss">

</style>
