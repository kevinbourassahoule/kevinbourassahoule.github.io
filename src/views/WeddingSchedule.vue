<template>
  <div class="bg-paper rounded-sm max-w-2xl mx-auto text-white mt-8 p-4" :style="{ color: pageColor }">
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
                >{{ event.description }}</div>
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
        ["ren", "guylou", "flo", "pirrrz", "fres", "bouboue", "friloux"],
        ["julie", "jenn", "eli", "camou", "vache", "lus", "frank", "dave", "ant"],
        ["france", "caro", "aaj", "mf", "2g"],
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
    }
  },
  data() {
    return {
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
                  description: "Arrivée de la maquilleuse"
                }
              ]
            },
            {
              time: "9:15",
              events: [
                {
                  description: "Début du maquillage du cortège",
                  actorIds: ["sah", "flo", "ccm"]
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
                  actorIds: ["sah", "aaj"]
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
                  description: "Enregistrement à l'auberge West Brome"
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
                  actorIds: ["lus", "frank", "dave", "ant"]
                }
              ]
            },
            {
              time: "15:45",
              events: [
                {
                  description: "Départ de la navette de l'auberge vers le vignoble"
                },
                {
                  description: "Fin du first look"
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
                  description: "Photos de la famille immédiate"
                }
              ]
            },
            {
              time: "17:25",
              events: [
                {
                  description: "Photos avec le cortège"
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
                  description: "Invités sont dirigés vers la grange"
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
                  description: "Introduction des mariés et des parents",
                  actorIds: ["lus", "flo", "sah", "kbh", "guylou", "René", "bouboue", "friloux"]
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
              time: "20:30",
              events: [
                {
                  description: "Danse des parents",
                  actorIds: ["guylou", "ren", "bouboue", "friloux"]
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
                  description: "Danse des parents",
                  actorIds: ["sah", "kbh", "ren"]
                }
              ]
            },
            {
              time: "21:25",
              events: [
                {
                  description: "Début du party",
                  actorIds: "tous"
                }
              ]
            },
            {
              time: "22:00",
              events: [
                {
                  description: "1er départ de la navette du vignoble vers l'auberge",
                  actorIds: ["ren", "guylou", "flo", "pirrrz", "fres", "bouboue", "friloux", "julie", "jenn", "eli", "camou"]
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
                  actorIds: ["ren", "guylou", "flo", "pirrrz", "fres", "bouboue", "friloux", "julie", "jenn", "eli", "camou"]
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
.actor-sah {
  background-image: url("../assets/img/acteurs/sah.jpg");
}

.actor-kbh {
  background-image: url("../assets/img/acteurs/kbh.jpg");
}

.actor-guylou {
  background-image: url("../assets/img/acteurs/guylou.jpg");
}

.actor-ren {
  background-image: url("../assets/img/acteurs/ren.jpg");
}

.actor-bouboue {
  background-image: url("../assets/img/acteurs/bouboue.jpg");
}

.actor-friloux {
  background-image: url("../assets/img/acteurs/friloux.jpg");
}

.actor-flo {
  background-image: url("../assets/img/acteurs/flo.jpg");
}

.actor-camou {
  background-image: url("../assets/img/acteurs/camou.jpg");
}

.actor-eli {
  background-image: url("../assets/img/acteurs/eli.jpg");
}

.actor-jenn {
  background-image: url("../assets/img/acteurs/jenn.jpg");
}

.actor-julie {
  background-image: url("../assets/img/acteurs/julie.png");
}

.actor-vache {
  background-image: url("../assets/img/acteurs/vache.jpg");
}

.actor-pirrrz {
  background-image: url("../assets/img/acteurs/pirrrz.jpg");
}

.actor-fres {
  background-image: url("../assets/img/acteurs/fres.jpg");
}

.actor-lus {
  background-image: url("../assets/img/acteurs/lus.jpg");
}

.actor-frank {
  background-image: url("../assets/img/acteurs/frank.jpg");
}

.actor-ant {
  background-image: url("../assets/img/acteurs/ant.jpg");
}

.actor-dave {
  background-image: url("../assets/img/acteurs/dave.jpg");
}

.actor-caro {
  background-image: url("../assets/img/acteurs/caro.jpg");
}

.actor-aaj {
  background-image: url("../assets/img/acteurs/aaj.jpg");
}

.actor-france {
  background-image: url("../assets/img/acteurs/france.jpg");
}

.actor-mf {
  background-image: url("../assets/img/acteurs/mf.jpg");
}

.actor-2g {
  background-image: url("../assets/img/acteurs/2g.png");
}
</style>
