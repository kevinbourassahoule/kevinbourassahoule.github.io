<template>
  <div class="bg-paper rounded-sm min-w-fit max-w-2xl mx-auto text-white my-8 p-4" :style="{ color: pageColor }">
    <div class="border-2 p-4" :style="{ 'border-color': pageColor }">
      <h1 class="text-heading text-center text-5xl uppercase pt-16 pb-8">Cérémonie</h1>
      <div class="flex items-center justify-around mb-8">
        <button 
          v-for="v in ['ENTRANCE', 'DURING', 'EXIT']" 
          :key="v" 
          @click="view = v"
          class="transition-colors rounded-lg border-2 p-2 hover:bg-white/25 uppercase font-semibold tracking-wider"
          :class="{ 'border-transparent': view !== v, 'border-current': view === v }"
        >
          {{ getViewLabel(v) }}
        </button>
      </div>
      <div class="relative sm:text-xl">
        <div class="flex justify-center">
          <div 
            v-for="actorId in moveableActorIds" 
            :key="actorId" 
            class="absolute p-1 transition-transform duration-500"
            :style="{ 'transform': `translateX(${(actorIdCoordinates[actorId].x - (colCount - 1) / 2) * 100}%) translateY(${actorIdCoordinates[actorId].y * 100}%)` }"
          >
            <div class="rounded-full bg-cover p-2 sm:p-4" :class="`actor-${actorId}`"></div>
          </div>
        </div>
        <div v-for="(row, rowIndex) in ceremonyGridBg" :key="rowIndex" class="flex justify-center">
          <div v-for="(cell, cellIndex) in row" :key="cellIndex" class="flex items-center justify-around w-6 h-6 sm:w-10 sm:h-10">
            <div v-html="getCellContent(cell)"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { uniq } from "lodash";

export default {
  name: "WeddingCeremony",
  data() {
    return {
      view: "DURING",
      ceremonyGridEmpty: [
        ["", "", "", "", "", "", "🪵", "🪵", "🪵", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "🪵", "", "🪵", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["🪑", "🪑", "🪑", "🪑", "🪑", "🪑", "", "", "", "🪑", "🪑", "🪑", "🪑", "🪑", "🪑"],
        ["🪑", "🪑", "🪑", "🪑", "🪑", "🪑", "", "", "", "🪑", "🪑", "🪑", "🪑", "🪑", "🪑"],
        ["🪑", "🪑", "🪑", "🪑", "🪑", "🪑", "", "", "", "🪑", "🪑", "🪑", "🪑", "🪑", "🪑"],
        ["🪑", "🪑", "🪑", "🪑", "🪑", "🪑", "", "", "", "🪑", "🪑", "🪑", "🪑", "🪑", "🪑"],
        ["🪑", "🪑", "🪑", "🪑", "🪑", "🪑", "", "", "", "🪑", "🪑", "🪑", "🪑", "🪑", "🪑"],
        ["🪑", "🪑", "🪑", "🪑", "🪑", "🪑", "", "", "", "🪑", "🪑", "🪑", "🪑", "🪑", "🪑"],
        ["🪑", "🪑", "🪑", "🪑", "🪑", "🪑", "", "", "", "🪑", "🪑", "🪑", "🪑", "🪑", "🪑"],
        ["🪑", "🪑", "🪑", "🪑", "🪑", "🪑", "", "", "", "🪑", "🪑", "🪑", "🪑", "🪑", "🪑"],
        ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
      ],
      ceremonyGridEntrance: [
        ["", "", "", "", "", "", "🪵", "🪵", "🪵", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "🪵", "a:lus", "🪵", "", "", "", "", "", "a:mf"],
        ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["🪑", "🪑", "🪑", "🪑", "🪑", "🪑", "a:bouboue", "🡅", "a:friloux", "🪑", "🪑", "🪑", "🪑", "🪑", "🪑"],
        ["🪑", "🪑", "🪑", "🪑", "🪑", "🪑", "", "🡅", "", "🪑", "🪑", "🪑", "🪑", "🪑", "🪑"],
        ["🪑", "🪑", "🪑", "🪑", "🪑", "🪑", "a:pirrrz", "a:kbh", "a:fres", "🪑", "🪑", "🪑", "🪑", "🪑", "🪑"],
        ["🪑", "🪑", "🪑", "🪑", "🪑", "🪑", "", "🡅", "", "🪑", "🪑", "🪑", "🪑", "🪑", "🪑"],
        ["🪑", "🪑", "🪑", "🪑", "🪑", "🪑", "a:frank", "a:ant", "a:dave", "🪑", "🪑", "🪑", "🪑", "🪑", "🪑"],
        ["🪑", "🪑", "🪑", "🪑", "🪑", "🪑", "", "🡅", "", "🪑", "🪑", "🪑", "🪑", "🪑", "🪑"],
        ["🪑", "🪑", "🪑", "🪑", "🪑", "🪑", "a:eli", "a:vache", "a:camou", "🪑", "🪑", "🪑", "🪑", "🪑", "🪑"],
        ["🪑", "🪑", "🪑", "🪑", "🪑", "🪑", "a:jenn", "🡅", "a:julie", "🪑", "🪑", "🪑", "🪑", "🪑", "🪑"],
        ["", "", "", "", "", "", "", "🡅", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "a:flo", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "🡅", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "a:isla", "a:van", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "🡅", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "a:guylou", "a:sah", "a:ren", "", "", "", "", "", ""],
      ],
      ceremonyGridDuring: [
        ["", "", "", "", "", "", "🪵", "🪵", "🪵", "", "", "", "", "", ""],
        ["a:jenn", "a:julie", "a:eli", "a:camou", "a:vache", "a:flo", "🪵", "a:lus", "🪵", "a:pirrrz", "a:fres", "a:frank", "a:ant", "a:dave", "a:mf"],
        ["", "", "", "", "", "", "a:sah", "", "a:kbh", "", "", "", "", "", ""],
        ["🪑", "🪑", "🪑", "🪑", "a:ren", "a:guylou", "", "", "", "a:bouboue", "a:friloux", "a:isla", "a:van", "🪑", "🪑"],
        ["🪑", "🪑", "🪑", "🪑", "🪑", "🪑", "", "", "", "🪑", "🪑", "🪑", "🪑", "🪑", "🪑"],
        ["🪑", "🪑", "🪑", "🪑", "🪑", "🪑", "", "", "", "🪑", "🪑", "🪑", "🪑", "🪑", "🪑"],
        ["🪑", "🪑", "🪑", "🪑", "🪑", "🪑", "", "", "", "🪑", "🪑", "🪑", "🪑", "🪑", "🪑"],
        ["🪑", "🪑", "🪑", "🪑", "🪑", "🪑", "", "", "", "🪑", "🪑", "🪑", "🪑", "🪑", "🪑"],
        ["🪑", "🪑", "🪑", "🪑", "🪑", "🪑", "", "", "", "🪑", "🪑", "🪑", "🪑", "🪑", "🪑"],
        ["🪑", "🪑", "🪑", "🪑", "🪑", "🪑", "", "", "", "🪑", "🪑", "🪑", "🪑", "🪑", "🪑"],
        ["🪑", "🪑", "🪑", "🪑", "🪑", "🪑", "", "", "", "🪑", "🪑", "🪑", "🪑", "🪑", "🪑"],
        ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
      ],
      ceremonyGridExit: [
        ["", "", "", "", "", "", "🪵", "🪵", "🪵", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "🪵", "", "🪵", "", "", "", "", "", "a:mf"],
        ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["🪑", "🪑", "🪑", "🪑", "🪑", "🪑", "a:eli", "🡇", "a:lus", "🪑", "🪑", "🪑", "🪑", "🪑", "🪑"],
        ["🪑", "🪑", "🪑", "🪑", "🪑", "🪑", "a:vache", "🡇", "a:dave", "🪑", "🪑", "🪑", "🪑", "🪑", "🪑"],
        ["🪑", "🪑", "🪑", "🪑", "🪑", "🪑", "a:camou", "🡇", "a:ant", "🪑", "🪑", "🪑", "🪑", "🪑", "🪑"],
        ["🪑", "🪑", "🪑", "🪑", "🪑", "🪑", "a:jenn", "🡇", "a:frank", "🪑", "🪑", "🪑", "🪑", "🪑", "🪑"],
        ["🪑", "🪑", "🪑", "🪑", "🪑", "🪑", "a:julie", "🡇", "a:pirrrz", "🪑", "🪑", "🪑", "🪑", "🪑", "🪑"],
        ["🪑", "🪑", "🪑", "🪑", "🪑", "🪑", "a:flo", "🡇", "a:fres", "🪑", "🪑", "🪑", "🪑", "🪑", "🪑"],
        ["🪑", "🪑", "🪑", "🪑", "🪑", "🪑", "a:guylou", "🡇", "a:ren", "🪑", "🪑", "🪑", "🪑", "🪑", "🪑"],
        ["🪑", "🪑", "🪑", "🪑", "🪑", "🪑", "a:bouboue", "🡇", "a:friloux", "🪑", "🪑", "🪑", "🪑", "🪑", "🪑"],
        ["", "", "", "", "", "", "a:isla", "🡇", "a:van", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "a:sah", "🡇", "a:kbh", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
      ]
    };
  },
  computed: {
    ...mapState(["actors"]),
    ...mapGetters(["pageColor"]),
    ceremonyGrid() {
      if (this.view === "ENTRANCE") return this.ceremonyGridEntrance;
      if (this.view === "EXIT") return this.ceremonyGridExit;

      return this.ceremonyGridDuring;
    },
    ceremonyGridBg() {
      return this.ceremonyGrid.map(row => row.map(cell => cell.startsWith("a:") ? "" : cell));
    },
    moveableActorIds() {
      return uniq(
        this.ceremonyGridEntrance
          .concat(this.ceremonyGridDuring)
          .concat(this.ceremonyGridExit)
          .flat(2)
          .filter(x => x.startsWith("a:"))
          .map(x => x.substring(2))
      );
    },
    actorIdCoordinates() {
      const actorIds = this.moveableActorIds;
      const result = {};

      for (let actorId of actorIds) {
        const rowIndex = this.ceremonyGrid.findIndex(row => row.some(x => x === "a:" + actorId));
        const colIndex = this.ceremonyGrid[rowIndex].findIndex(x => x === "a:" + actorId);

        result[actorId] = { x: colIndex, y: rowIndex };
      }
      
      return result;
    },
    colCount() {
      return this.ceremonyGridEmpty[0].length;
    }
  },
  methods: {
    getViewLabel(view) {
      if (view === "ENTRANCE") return "Entrée";
      if (view === "EXIT") return "Sortie";

      return "Pendant";
    },
    getCellContent(cell) {
      if (cell.startsWith("a:")) {
        var actorId = cell.substring(2);
        return `<div class="rounded-full bg-cover p-2 sm:p-4 actor-${actorId}"></div>`;
      }

      return cell;
    }
  }
};
</script>

<style scoped lang="scss"></style>
