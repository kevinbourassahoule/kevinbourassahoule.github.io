<template>
  <div>
    <div class="mx-2">
      <div
        class="bg-white bg-opacity-25 p-4 border-2 border-white border-opacity-25 mt-8 mx-auto max-w-lg shadow-lg"
      >
        <template v-if="view === 'secret'">
          <div>
            <label for="secret" class="inline-block mb-1">Phrase secrète</label>
            <input
              id="secret"
              type="text"
              placeholder="enweille donc"
              v-model="secret"
              class="block border-2 border-black w-full p-2"
            />
          </div>
          <div v-if="secret" class="mt-4 mb-2 text-center">
            <button
              class="border-2 text-white p-2 w-full transition-colors duration-300"
              :class="
                serverIpSeemsValid
                  ? 'bg-green-700 border-green-900 hover:bg-green-800'
                  : 'bg-gray-700 border-gray-900 cursor-default'
              "
              :disabled="!serverIpSeemsValid"
              @click="getInfo"
            >
              {{ serverIpSeemsValid ? "C bon pointe toé" : "Ouin..." }}
            </button>
          </div>
        </template>
        <template v-else-if="view === 'status'">
          <div class="text-center mb-6">
            <div class="text-xl">Adresse IP</div>
            <div class="text-3xl">{{ serverIp }}</div>
          </div>
          <div class="cube-scene mx-auto mb-6">
            <div class="cube">
              <div class="cube__face cube__face--front bg-yellow-900">
                {{ cubeFaceText }}
              </div>
              <div class="cube__face cube__face--back bg-yellow-900">
                {{ cubeFaceText }}
              </div>
              <div class="cube__face cube__face--right bg-yellow-900">
                {{ cubeFaceText }}
              </div>
              <div class="cube__face cube__face--left bg-yellow-900">
                {{ cubeFaceText }}
              </div>
              <div class="cube__face cube__face--top bg-green-700">
                {{ cubeFaceText }}
              </div>
              <div class="cube__face cube__face--bottom bg-yellow-900">
                {{ cubeFaceText }}
              </div>
            </div>
          </div>
          <div v-if="loadingInfo" class="text-center italic">
            <div>
              Je check le statut du serveur...
            </div>
          </div>
          <div v-else-if="isServerDown" class="text-center">
            <div>Le serveur est peut-être down, textez-moi!</div>
          </div>
          <div v-else-if="serverInfo">
            <div class="text-2xl">{{ serverInfo.server.name }}</div>
            <div>{{ serverInfo.motd }}</div>
            <div>
              <i class="text-green-600 text-2xl mr-2">●</i>
              <span>En ligne</span>
              <span class="mx-3">-</span>
              <span
                >{{ serverInfo.players.now }}/{{
                  serverInfo.players.max
                }}
                joueurs</span
              >
            </div>
            <ul>
              <li v-for="player in serverInfo.players.sample" :key="player.id">
                - {{ player.name }}
              </li>
            </ul>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
const isIp = require("is-ip");
const CryptoJS = require("crypto-js");

export default {
  name: "MinecraftHome",
  data() {
    return {
      view: "secret",
      secret: "",
      serverInfo: null,
      loadingInfo: false
    };
  },
  computed: {
    encryptedIp() {
      return "U2FsdGVkX18g5pCu00X9RXNCaFofM+Hc+XaKd+1HZdo=";
    },
    serverIp() {
      try {
        return CryptoJS.AES.decrypt(this.encryptedIp, this.secret).toString(
          CryptoJS.enc.Utf8
        );
      } catch {
        return "";
      }
    },
    serverIpSeemsValid() {
      return isIp(this.serverIp);
    },
    serverPort() {
      return 25565;
    },
    isServerDown() {
      return !this.loadingInfo && (!this.serverInfo || !this.serverInfo.online);
    },
    cubeFaceText() {
      if (this.loadingInfo) {
        return "...";
      } else if (this.isServerDown) {
        return ":(";
      }

      return ":)";
    }
  },
  methods: {
    async getInfo() {
      this.view = "status";

      this.loadingInfo = true;

      try {
        var response = await fetch(
          `https://mcapi.us/server/status?ip=${this.serverIp}`
        );
        if (response.ok) {
          this.serverInfo = await response.json();
        }
      } finally {
        this.loadingInfo = false;
      }
    }
  },
  created() {
    document.title = "Minecraft";
  }
};
</script>

<style lang="scss">
@font-face {
  font-family: Minecraftia;
  src: url(data:font/truetype;base64,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gICAAQD/AAAABQAAAAACAAOAAAMABwALAA8AEwAAITUhFSU1MxUlETMZATUzFT0BIRUBAAEA/oCA/wCAgAEAgICAgICAAYD+gAGAgICAgIAABQAAAAACAAOAAAMABwALAA8AEwAAMTUhFT0BMxU1ETMRATUzFSU1IRUBAICA/wCA/oABAICAgICAgAGA/oABgICAgICAAAAABQAAAQACAAKAAAMABwALAA8AEwAAETUzFSE1MxUlNSEVJTUzFSE1MxWAAQCA/oABAP6AgAEAgAEAgICAgICAgICAgICAAAAAAQAAAIACgAMAAAsAACURITUhETMRIRUhEQEA/wABAIABAP8AgAEAgAEA/wCA/wAAAQAA/4AAgAEAAAMAABURMxGAgAGA/oAAAQAAAYACgAIAAAMAABE1IRUCgAGAgIAAAQAAAAAAgAEAAAMAADERMxGAAQD/AAAABQAAAAACgAOAAAMABwALAA8AEwAAMTUzFTURMxkBNTMVNREzGQE1MxWAgICAgICAgAEA/wABAICAgAEA/wABAICAAAAFAAAAAAKAA4AAAwAHAA8AFwAbAAAzNSEVATUzFQERMxEzFSMVIREjNTM1MxEBNSEVgAGA/wCA/oCAgIABgICAgP4AAYCAgAGAgID/AAKA/oCAgAGAgID9gAKAgIAAAAABAAAAAAKAA4AACwAAMTUhESM1MzUzESEVAQCAgIABAIACAICA/QCAAAAAAAYAAAAAAoADgAAHAAsADwATABcAGwAAMREzFSE1MxEBNTMVPQEhFQE1MxUFETMRATUhFYABgID+AIABAP4AgAGAgP4AAYABAICA/wABAICAgICAAQCAgIABAP8AAQCAgAAAAAAHAAAAAAKAA4AAAwAHAAsADwATABcAGwAAMzUhFSU1MxUhETMRATUhFQE1MxUFETMRATUhFYABgP4AgAGAgP6AAQD+AIABgID+AAGAgICAgIABAP8AAQCAgAEAgICAAQD/AAEAgIAAAAMAAAAAAoADgAADAAcAEwAAEzUzFT0BMxUTESERMxUhESM1IRGAgICA/gCAAYCAAQACAICAgICA/YABAAEAgAGAgPyAAAAAAAQAAAAAAoADgAADAAcACwATAAAzNSEVJTUzFSERMxEBESEVIRUhFYABgP4AgAGAgP2AAoD+AAGAgICAgIABgP6AAYABgICAgAAAAAAFAAAAAAKAA4AAAwAHAA8AEwAXAAAzNSEVNREzESERMxUhFSEZATUzFT0BIRWAAYCA/YCAAYD+gIABAICAgAEA/wACAICA/wACAICAgICAAAMAAAAAAoADgAADAAcADwAAIREzGQE1MxU1ESEVIxEhEQEAgID+gIACgAGA/oABgICAgAEAgAEA/oAAAAcAAAAAAoADgAADAAcACwAPABMAFwAbAAAzNSEVJREzESERMxEBNSEVJREzESERMxEBNSEVgAGA/gCAAYCA/gABgP4AgAGAgP4AAYCAgIABAP8AAQD/AAEAgICAAQD/AAEA/wABAICAAAAAAAUAAAAAAoADgAADAAcACwATABcAADM1IRU9ATMVAREzEQE1ITUhETMRATUhFYABAID+AIABgP6AAYCA/gABgICAgICAAYABAP8A/wCAgAEA/gACAICAAAACAAAAAACAAwAAAwAHAAAxETMRAxEzEYCAgAEA/wACAAEA/wAAAAAAAgAA/4AAgAMAAAMABwAAFREzEQMRMxGAgICAAYD+gAKAAQD/AAAAAAcAAAAAAgADgAADAAcACwAPABMAFwAbAAAhNTMVJTUzFSU1MxUlNTMVPQEzFT0BMxU9ATMVAYCA/wCA/wCA/wCAgICAgICAgICAgICAgICAgICAgICAgIAAAAAAAgAAAIACgAKAAAMABwAAPQEhFQE1IRUCgP2AAoCAgIABgICAAAAAAAcAAAAAAgADgAADAAcACwAPABMAFwAbAAAxNTMVPQEzFT0BMxU9ATMVJTUzFSU1MxUlNTMVgICAgP8AgP8AgP8AgICAgICAgICAgICAgICAgICAgICAAAAGAAAAAAKAA4AAAwAHAAsADwATABcAACE1MxUDNTMVPQEzFQE1MxUFETMRATUhFQEAgICAgP4AgAGAgP4AAYCAgAEAgICAgIABAICAgAEA/wABAICAAAAABAAAAAADAAOAAAMABwAPABMAADM1IRUlETMRNxEhETMRMxEBNSEVgAIA/YCAgAEAgID9gAIAgICAAoD9gIABgP8AAYD+AAIAgIAAAAIAAAAAAoADgAALAA8AADERMxEhETMRIxEhGQE1IRWAAYCAgP6AAYADAP8AAQD9AAGA/oADAICAAAAAAAMAAAAAAoADgAADAAcAEwAAJREzEQM1MxUBESEVIRUhFSERIRUCAICAgP2AAgD+gAGA/oABgIABgP6AAgCAgP2AA4CAgID+gIAAAAAFAAAAAAKAA4AAAwAHAAsADwATAAAzNSEVPQEzFSERMxEBNTMVJTUhFYABgID9gIABgID+AAGAgICAgIACgP2AAgCAgICAgAACAAAAAAKAA4AAAwALAAAlETMRBREhFSERIRUCAID9gAIA/oABgIACgP2AgAOAgP2AgAAAAQAAAAACgAOAAAsAADERIRUhFSEVIREhFQKA/gABAP8AAgADgICAgP6AgAABAAAAAAKAA4AACQAAMREhFSEVIRUhEQKA/gABAP8AA4CAgID+AAAABAAAAAACgAOAAAMACQANABEAADM1IRU1ESE1IREhETMZATUhFYABgP8AAYD9gIACAICAgAGAgP4AAoD9gAKAgIAAAAABAAAAAAKAA4AACwAAMREzESERMxEjESERgAGAgID+gAOA/wABAPyAAgD+AAAAAAABAAAAAAGAA4AACwAAMTUzESM1IRUjETMVgIABgICAgAKAgID9gIAAAwAAAAACgAOAAAMABwALAAAzNSEVJTUzFSERMxGAAYD+AIABgICAgICAgAMA/QAABQAAAAACgAOAAAMABwALABMAFwAAIREzEQE1MxUDNTMVAREzESEVIREBNTMVAgCA/wCAgID+AIABAP8AAYCAAYD+gAGAgIABAICA/YADgP8AgP4AAwCAgAAAAAABAAAAAAKAA4AABQAAMREzESEVgAIAA4D9AIAAAwAAAAACgAOAAAMACwATAAABNTMVAREzFTMVIxEhESM1MzUzEQEAgP6AgICAAYCAgIACAICA/gADgICA/YACgICA/IAAAAAAAwAAAAACgAOAAAMACwATAAABNTMVAREzFTMVIxEhESM1MxEzEQEAgP6AgICAAYCAgIACAICA/gADgICA/YABgIABgPyAAAAABAAAAAACgAOAAAMABwALAA8AADM1IRUlETMRIREzEQE1IRWAAYD+AIABgID+AAGAgICAAoD9gAKA/YACgICAAAIAAAAAAoADgAADAA0AAAE1MxUBESEVIRUhFSERAgCA/YACAP6AAYD+gAKAgID9gAOAgICA/gAABgAAAAACgAOAAAMABwALAA8AEwAXAAAzNSEVMzUzFSU1MxUhETMRJREzEQE1IRWAAQCAgP8AgP4AgAGAgP4AAYCAgICAgICAAoD9gIACAP4AAgCAgAAAAAMAAAAAAoADgAADAAcAEQAAIREzEQM1MxUBESEVIRUhFSERAgCAgID9gAIA/oABgP6AAgD+AAKAgID9gAOAgICA/gAABgAAAAACgAOAAAMABwALAA8AEwAXAAAzNSEVJTUzFSERMxEBNSEVJTUzFT0BIRWAAYD+AIABgID+AAGA/gCAAgCAgICAgAGA/oABgICAgICAgICAAAAAAAEAAAAAAoADgAAHAAAhESE1IRUhEQEA/wACgP8AAwCAgP0AAAMAAAAAAoADgAADAAcACwAAMzUhFSURMxEhETMRgAGA/gCAAYCAgICAAwD9AAMA/QAAAAAFAAAAAAKAA4AAAwAHAAsADwATAAAhNTMVJREzETMRMxEBETMRIREzEQEAgP8AgICA/gCAAYCAgICAAQD/AAEA/wABAAIA/gACAP4AAAAAAAMAAAAAAoADgAADAAsAEwAAATUzFQERMxEzFSMVITUjNTMRMxEBAID+gICAgAGAgICAAQCAgP8AA4D9gICAgIACgPyAAAAAAAkAAAAAAoADgAADAAcACwAPABMAFwAbAB8AIwAAMREzESERMxEBNTMVMzUzFSU1MxUlNTMVMzUzFSU1MxUhNTMVgAGAgP4AgICA/wCA/wCAgID+AIABgIABgP6AAYD+gAGAgICAgICAgICAgICAgICAgIAABQAAAAACgAOAAAMABwALAA8AEwAAIREzEQE1MxUzNTMVJTUzFSE1MxUBAID/AICAgP4AgAGAgAKA/YACgICAgICAgICAgAAABQAAAAACgAOAAAUACQANABEAFwAAMREzFSEVATUzFT0BMxU9ATMVPQEhNSERgAH//gGAgID+AAKAAQCAgAEAgICAgICAgICAgID/AAAAAAABAAAAAAGAA4AABwAAMREhFSERIRUBgP8AAQADgID9gIAAAAAFAAAAAAKAA4AAAwAHAAsADwATAAAhNTMVJREzEQE1MxUlETMRATUzFQIAgP8AgP8AgP8AgP8AgICAgAEA/wABAICAgAEA/wABAICAAAAAAAEAAAAAAYADgAAHAAAxNSERITUhEQEA/wABgIACgID8gAAAAAUAAAIAAoADgAADAAcACwAPABMAABE1MxUhNTMVJTUzFTM1MxUlNTMVgAGAgP4AgICA/wCAAgCAgICAgICAgICAgIAAAQAAAAACgACAAAMAADE1IRUCgICAAAAAAgAAAgABAAOAAAMABwAAEzUzFSURMxGAgP8AgAIAgICAAQD/AAAAAAMAAAAAAoACgAADAA0AEQAAPQEzHQE1ITUhNSE1MxEBNSEVgAGA/oABgID+AAGAgICAgICAgID+AAIAgIAAAAADAAAAAAKAA4AAAwAHABEAACURMxEBNSEVAREzETMVIxEhFQIAgP6AAQD+AICAgAGAgAGA/oABgICA/gADgP6AgP8AgAAAAAAFAAAAAAKAAoAAAwAHAAsADwATAAAzNSEVPQEzFSERMxEBNTMVJTUhFYABgID9gIABgID+AAGAgICAgIABgP6AAQCAgICAgAADAAAAAAKAA4AAAwAHABEAADURMxkBNSEVATUhESM1MxEzEYABAP8AAYCAgICAAYD+gAGAgID+AIABAIABgPyAAAAAAAMAAAAAAoACgAADAA0AEQAAMzUhFSURMxUhNTMRIRURNSEVgAIA/YCAAYCA/gABgICAgAGAgID/AIABgICAAAACAAAAAAIAA4AACwAPAAAzESM1MzUzFSEVIRkBNSEVgICAgAEA/wABAAIAgICAgP4AAwCAgAAAAAMAAP+AAoACgAADAAcAEQAAFTUhFQERMxEBNSE1IREhNSERAgD+AIABgP6AAYD+gAIAgICAAYABAP8A/wCAgAEAgP2AAAAAAAMAAAAAAoADgAADAAcADwAAIREzEQE1IRUBETMRMxUjEQIAgP6AAQD+AICAgAIA/gACAICA/gADgP6AgP6AAAACAAAAAACAA4AAAwAHAAAxETMRAzUzFYCAgAKA/YADAICAAAAEAAD/gAKAA4AAAwAHAAsADwAAFzUhFSURMxEhETMRAzUzFYABgP4AgAGAgICAgICAgAEA/wACgP2AAwCAgAAABQAAAAACAAOAAAMABwALAA8AFwAAITUzFSU1MxUDNTMVPQEzFQERMxEzFSMRAYCA/wCAgICA/gCAgICAgICAgAEAgICAgID+AAOA/gCA/wAAAAAAAgAAAAABAAOAAAMABwAAMzUzFSURMxGAgP8AgICAgAMA/QAABAAAAAACgAKAAAMABwANABEAAAERMxETETMRIREhFSMRATUzFQEAgICA/YABAIABAIABAAEA/wD/AAIA/gACgID+AAIAgIAAAgAAAAACgAKAAAMACQAAIREzESERIRUhEQIAgP2AAgD+gAIA/gACgID+AAAEAAAAAAKAAoAAAwAHAAsADwAAMzUhFSURMxEhETMRATUhFYABgP4AgAGAgP4AAYCAgIABgP6AAYD+gAGAgIAAAwAA/4ACgAKAAAMADwATAAABETMRAREzFTMVIxUhFSEREzUhFQIAgP2AgICAAYD+gIABAAEAAQD/AP6AAwCAgICA/wACgICAAAAAAAMAAP+AAoACgAADAAcAEwAAGQEzGQE1IRUTESE1ITUjNTM1MxGAAQCA/oABgICAgAEAAQD/AAEAgID9gAEAgICAgP0AAAAAAAMAAAAAAoACgAADAAsADwAAATUzFQERMxUzFSMREzUhFQIAgP2AgICAgAEAAYCAgP6AAoCAgP6AAgCAgAAAAAAFAAAAAAKAAoAAAwAHAAsADwATAAAxNSEVPQEzFSU1IRUlNTMVPQEhFQIAgP4AAYD+AIACAICAgICAgICAgICAgICAAAIAAAAAAYADgAADAA8AACE1MxUlESM1MxEzETMVIxEBAID/AICAgICAgICAAYCAAQD/AID+gAAAAgAAAAACgAKAAAMACQAANREzERU1IREzEYABgICAAgD+AICAAgD9gAAAAAAFAAAAAAKAAoAAAwAHAAsADwATAAAhNTMVJTUzFTM1MxUlETMRIREzEQEAgP8AgICA/gCAAYCAgICAgICAgIABgP6AAYD+gAACAAAAAAKAAoAAAwANAAA1ETMRFTUzETMRMxEzEYCAgICAgAIA/gCAgAEA/wACAP2AAAAACQAAAAACgAKAAAMABwALAA8AEwAXABsAHwAjAAAxNTMVITUzFSU1MxUzNTMVJTUzFSU1MxUzNTMVJTUzFSE1MxWAAYCA/gCAgID/AID/AICAgP4AgAGAgICAgICAgICAgICAgICAgICAgICAgIAAAAMAAP+AAoACgAADAAcADwAAFTUhFQERMxEBNSE1IREzEQIA/gCAAYD+gAGAgICAgAGAAYD+gP8AgIABgP2AAAADAAAAAAKAAoAABwALABMAADE1MzUzFSEVATUzFT0BITUhFSMVgIABgP6AgP6AAoCAgICAgAEAgICAgICAgAAABQAAAAACAAOAAAMABwALAA8AEwAAITUhFSURMxEBNTMVNREzGQE1IRUBAAEA/oCA/wCAgAEAgICAAQD/AAEAgICAAQD/AAEAgIAAAAIAAAAAAIADgAADAAcAADERMxEDETMRgICAAYD+gAIAAYD+gAAAAAAFAAAAAAIAA4AAAwAHAAsADwATAAAxNSEVNREzGQE1MxUlETMRATUhFQEAgID/AID+gAEAgICAAQD/AAEAgICAAQD/AAEAgIAAAAAABAAAAoADAAOAAAMABwALAA8AABE1MxUhNSEVJTUhFSE1MxWAAQABAP4AAQABAIACgICAgICAgICAgAAAAgAAAAAAgAMAAAMABwAAMREzEQM1MxWAgIACAP4AAoCAgAAABAAAAAACgAOAAAMABwALAB8AAAE1MxUhETMRATUzFQE1IzUzESM1MzUzFTMVIxEzFSMVAgCA/YCAAYCA/oCAgICAgICAgIABAICAAYD+gAEAgID+AICAAYCAgICA/oCAgAAAAAMAAAAAAoADgAAPABMAFwAAMTUzESM1MxEzESEVIREhFQM1MxUlNSEVgICAgAEA/wABgICA/oABAIABAIABAP8AgP8AgAKAgICAgIAAAAAACAAAAIACAAMAAAMABwALAA8AEwAXABsAHwAAPQEzFSE1MxUlNSEVJTUzFSE1MxUlNSEVJTUzFSE1MxWAAQCA/oABAP6AgAEAgP6AAQD+gIABAICAgICAgICAgICAgICAgICAgICAgIAAAAAABQAAAAACgAOAABMAFwAbAB8AIwAAITUjNTM1IzUzNTMVMxUjFTMVIxUBNTMVMzUzFSU1MxUhNTMVAQCAgICAgICAgID/AICAgP4AgAGAgICAgICAgICAgIACgICAgICAgICAgAAAAAACAAAAAACAA4AAAwAHAAAxETMRAxEzEYCAgAGA/oACAAGA/oAAAAAACAAAAAACAAOAAAMABwALAA8AEwAXABsAHwAAMTUhFT0BMxUlNSEVJTUzFSE1MxUlNSEVJTUzFT0BIRUBgID+gAEA/oCAAQCA/oABAP6AgAGAgICAgICAgICAgICAgICAgICAgICAgAACAAADAAKAA4AAAwAHAAARNSEVMzUhFQEAgAEAAwCAgICAAAADAAAAAAMAAoAADQARABsAADM1IxEzETMVMzUzFTMVNREzESURIzUhFSMVIxWAgICAgICAgP4AgAIAgICAAYD/AICAgICAAYD+gIABAICAgIAAAAABAAACAAGAA4AACQAAETUzNSM1IRUzEYCAAQCAAgCAgICA/wAAAAAACgAAAAACgAKAAAMABwALAA8AEwAXABsAHwAjACcAACE1MxUzNTMVJTUzFTM1MxUlNTMVMzUzFSU1MxUzNTMVJTUzFTM1MxUBAICAgP4AgICA/gCAgID/AICAgP8AgICAgICAgICAgICAgICAgICAgICAgICAgICAAAAAAAEAAAAAAoABgAAFAAAhESE1IRECAP4AAoABAID+gAAAAQAAAgACgAKAAAMAABE1IRUCgAIAgIAAAwAAAQADAAOAAAMABwAZAAABNSMVIREzERU1MxEzNSE1IRUjFTM1MxEjFQIAgP6AgICA/wACAICAgIABgICAAYD+gICAAQCAgICAgP6AgAABAAADAAKAA4AAAwAAETUhFQKAAwCAgAAEAAACAAGAA4AAAwAHAAsADwAAEzUzFSU1MxUzNTMVJTUzFYCA/wCAgID/AIACAICAgICAgICAgIAAAAACAAAAAAMAA4AAAwAPAAAxNSEVAREhNSERIREhFSERAwD+AP8AAQABAAEA/wCAgAEAAQCAAQD/AID/AAABAAABAAIAA4AAEQAAGQEzNTM1ITUhFTMVIxUjFSEVgID/AAGAgICAAQABAAEAgICAgICAgIAAAAEAAAEAAgADgAAPAAARNSE1IzUzNSE1IRUzESMVAQCAgP8AAYCAgAEAgICAgICA/oCAAAACAAACAAEAA4AAAwAHAAARNTMVNREzEYCAAgCAgIABAP8AAAABAAAAgAOAA4AADwAAPQEzESERIREhESMVIRUjFYABAAEAAQCA/oCAgIACgP6AAYD+gICAgAAAAAIAAAAABAADgAADABEAAAERIxETESE1IxEzNSERIREjEQGAgID/AICAA4D/AIACAAEA/wD+AAGAgAEAgPyAAwD9AAAAAQAAAQABAAGAAAMAABE1IRUBAAEAgIAAAwAAAAABgAIAAAMABwANAAAxNSEVPQEzFSU1MzUzEQEAgP6AgICAgICAgICAgP8AAAAAAAEAAAIAAQADgAAFAAATESM1IRGAgAEAAgABAID+gAAABAAAAgABgAOAAAMABwALAA8AABM1MxUlNTMVMzUzFSU1MxWAgP8AgICA/wCAAgCAgICAgICAgICAAAAACgAAAAACgAKAAAMABwALAA8AEwAXABsAHwAjACcAADE1MxUzNTMVJTUzFTM1MxUlNTMVMzUzFSU1MxUzNTMVJTUzFTM1MxWAgID/AICAgP8AgICA/gCAgID+AICAgICAgICAgICAgICAgICAgICAgICAgICAgAAABwAAAAACgAOAAAMABwANABEAFQAZAB0AADE1MxU1ETMRBTUjESERATUzFTURMxElETMRJTUzFYCAAQCAAQD+gICA/gCAAYCAgICAAQD/AICAAQD+gAGAgICAAQD/AIABAP8AgICAAAAIAAAAAAKAA4AAAwAJAA0AEQAVABkAHQAhAAAxNTMVIREzFTMVJREzESU1MxUlNTMVNREzESURMxElNTMVgAEAgID+AIABAID+gICA/gCAAYCAgIABAICAgAEA/wCAgICAgICAAQD/AIABAP8AgICAAAAAAAUAAAAAAoADgAADAAkADQAbAB8AADE1MxUhNSMRIREBETMRAREjNTM1IxEhETMVIxEBNTMVgAGAgAEA/wCA/oCAgIABAICAAQCAgICAAQD+gAIAAQD/AP6AAQCAgAEA/oCA/wACgICAAAAAAAYAAAAAAoADgAADAAcACwAPABMAFwAAMzUhFT0BMxUhETMZATUzFT0BMxUDNTMVgAGAgP2AgICAgICAgICAgAEA/wABAICAgICAAQCAgAAABAAAAAACgAUAAAsADwATABcAADERMxEhETMRIxEhGQE1IRUBNTMVJTUzFYABgICA/oABgP8AgP8AgAMA/wABAP0AAYD+gAMAgIABAICAgICAAAAABAAAAAACgAUAAAsADwATABcAADERMxEhETMRIxEhGQE1IRUBNTMVPQEzFYABgICA/oABgP8AgIADAP8AAQD9AAGA/oADAICAAQCAgICAgAAFAAAAAAKABQAACwAPABMAFwAbAAAxETMRIREzESMRIRkBNSEVATUzFTM1MxUlNTMVgAGAgID+gAGA/oCAgID/AIADAP8AAQD9AAGA/oADAICAAQCAgICAgICAAAMAAAAAAoAEgAALAA8AEwAAMREzESERMxEjESEZATUhFQE1IRWAAYCAgP6AAYD+gAGAAwD/AAEA/QABgP6AAwCAgAEAgIAAAAQAAAAAAoAEgAALAA8AEwAXAAAxETMRIREzESMRIRkBNSEVATUhFTM1IRWAAYCAgP6AAYD+AAEAgAEAAwD/AAEA/QABgP6AAwCAgAEAgICAgAAAAAMAAAAAAoAEgAALABMAFwAAMREzESERMxEjESEZAjMVMzUzEQE1MxWAAYCAgP6AgICA/wCAAwD/AAEA/QABgP6AAwABAICA/wABAICAAAAAAQAAAAACgAOAABUAADERMxUzNSM1IRUhFTMVIxEhFSERIxGAgIACAP8AgIABAP6AgAMAgICAgICA/oCAAgD+AAAAAAAHAAD/AAKAA4AABwALAA8AEwAXABsAHwAAATUjNSEVMxUDNTMVJTUhFT0BMxUhETMRATUzFSU1IRUBgIABAICAgP4AAYCA/YCAAYCA/gABgP8AgICAgAEAgICAgICAgIACAP4AAYCAgICAgAADAAAAAAKABQAACwAPABMAADERIRUhFSEVIREhFQE1MxUlNTMVAoD+AAEA/wACAP6AgP8AgAOAgICA/oCABACAgICAgAAAAAADAAAAAAKABQAACwAPABMAADERIRUhFSEVIREhFQE1MxU9ATMVAoD+AAEA/wACAP6AgIADgICAgP6AgAQAgICAgIAAAAQAAAAAAoAFAAALAA8AEwAXAAAxESEVIRUhFSERIRUBNTMVMzUzFSU1MxUCgP4AAQD/AAIA/gCAgID/AIADgICAgP6AgAQAgICAgICAgAAAAwAAAAACgASAAAsADwATAAAxESEVIRUhFSERIRUBNSEVMzUhFQKA/gABAP8AAgD9gAEAgAEAA4CAgID+gIAEAICAgIAAAAAAAwAAAAABAAQAAAMABwALAAAzETMRAzUzFSU1MxWAgICA/wCAAoD9gAMAgICAgIAAAwCAAAABgAQAAAMABwALAAAzETMRAzUzFT0BMxWAgICAgAKA/YADAICAgICAAAAABAAAAAABgAQAAAMABwALAA8AADMRMxEBNTMVMzUzFSU1MxWAgP8AgICA/wCAAoD9gAMAgICAgICAgAAAAwAAAAABgAOAAAMABwALAAAzETMRATUzFTM1MxWAgP8AgICAAoD9gAMAgICAgAAAAv+AAAACgAOAAAMAEwAAJREzEQURIzUzESEVIREhFSERIRUCAID9gICAAgD+gAEA/wABgIACgP2AgAGAgAGAgP8AgP8AgAAABAAAAAACgASAAAMACwATABcAAAE1MxUBETMVMxUjESERIzUzETMRATUhFQEAgP6AgICAAYCAgID+AAGAAgCAgP4AA4CAgP2AAYCAAYD8gAQAgIAABgAAAAACgAUAAAMABwALAA8AEwAXAAAzNSEVJREzESERMxEBNSEVATUzFSU1MxWAAYD+AIABgID+AAGA/wCA/wCAgICAAoD9gAKA/YACgICAAQCAgICAgAAAAAAGAAAAAAKABQAAAwAHAAsADwATABcAADM1IRUlETMRIREzEQE1IRUBNTMVPQEzFYABgP4AgAGAgP4AAYD/AICAgICAAoD9gAKA/YACgICAAQCAgICAgAAABgAAAAACgAUAAAMABwALAA8AFQAZAAAzNSEVJREzESERMxEBNTMVAzUhETMRATUzFYABgP4AgAGAgP4AgIABAID/AICAgIACgP2AAoD9gAOAgID/AIABAP6AAYCAgAAABQAAAAACgASAAAMABwALAA8AEwAAMzUhFSURMxEhETMRATUhFQE1IRWAAYD+AIABgID+AAGA/oABgICAgAKA/YACgP2AAoCAgAEAgIAAAAAGAAAAAAKABIAAAwAHAAsADwATABcAADM1IRUlETMRIREzEQE1IRUBNSEVMzUhFYABgP4AgAGAgP4AAYD+AAEAgAEAgICAAoD9gAKA/YACgICAAQCAgICAAAAAAAkAAACAAoADAAADAAcACwAPABMAFwAbAB8AIwAAPQEzFSE1MxUlNTMVMzUzFSU1MxUlNTMVMzUzFSU1MxUhNTMVgAGAgP4AgICA/wCA/wCAgID+AIABgICAgICAgICAgICAgICAgICAgICAgICAgAAFAAAAAAKAA4AAAwAHAA8AFwAbAAAzNSEVATUzFQERMxEzFSMVIREjNTM1MxEBNSEVgAGA/wCA/oCAgIABgICAgP4AAYCAgAGAgID/AAKA/oCAgAGAgID9gAKAgIAAAAAFAAAAAAKABIAAAwAHAAsADwATAAAzNSEVJREzESERMxEBNTMVJTUzFYABgP4AgAGAgP6AgP8AgICAgAMA/QADAP0AAwCAgICAgAAABQAAAAACgASAAAMABwALAA8AEwAAMzUhFSURMxEhETMRATUzFT0BMxWAAYD+AIABgID+gICAgICAAwD9AAMA/QADAICAgICAAAAAAAQAAAAAAoAEgAADAAcACwAPAAAzNSEVJREzESERMxEBNSEVgAGA/gCAAYCA/gABgICAgAMA/QADAP0AA4CAgAAFAAAAAAKA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AAACgAOAAAMABwALAA8AEwAXAAAzNSEVJREzESERMxEBNSEVPQEzFSU1IRWAAYD+AIABgID+AAGAgP4AAYCAgIABgP6AAYD+gAGAgICAgICAgIAAAAUAAAAAAoADgAADAAcACwAPABMAADM1IRUlETMRIREzEQE1IRUBNSEVgAGA/gCAAYCA/gABgP6AAYCAgIABgP6AAYD+gAGAgIABAICAAAAABgAAAAACgAOAAAMABwALAA8AEwAXAAAzNSEVJREzESERMxEBNSEVATUhFTM1IRWAAYD+AIABgID+AAGA/gABAIABAICAgAGA/oABgP6AAYCAgAEAgICAgAAAAAADAAAAAAMAA4AAAwAHAAsAACERIREBNSEVAREhEQEAAQD+AAMA/gABAAEA/wABgICAAQABAP8AAAMAAAAAAoACgAADAA0AFwAAATUzFQE1IxEzETMVIRU1ESM1ITUhFTMRAQCA/wCAgIABAID/AAGAgAEAgID/AIABgP8AgICAAQCAgID+gAAAAwAAAAACgAOAAAMACQANAAA1ETMRFTUhETMRATUhFYABgID9gAEAgAIA/gCAgAIA/YADAICAAAADAAAAAAKAA4AAAwAJAA0AADURMxEVNSERMxEBNSEVgAGAgP8AAQCAAgD+AICAAgD9gAMAgIAAAAMAAAAAAoADgAADAAkADQAANREzERU1IREzEQE1MxWAAYCA/oCAgAIA/gCAgAIA/YADAICAAAAABAAAAAACgAOAAAMACQANABEAADURMxEVNSERMxEBNTMVMzUzFYABgID+AICAgIACAP4AgIACAP2AAwCAgICAAAUAAP+AAoADgAADAAcADwATABcAABU1IRUBETMRATUhNSERMxEBNTMVPQEzFQIA/gCAAYD+gAGAgP6AgICAgIABgAGA/oD/AICAAYD9gAKAgICAgIAAAAACAAD/gAGAAwAAAwAPAAABNTMVAREzETMVIxUzFSMRAQCA/oCAgICAgAEAgID+gAOA/wCAgID/AAAAAAAFAAD/gAKAA4AAAwAHAA8AEwAXAAAVNSEVAREzEQE1ITUhETMRATUzFTM1MxUCAP4AgAGA/oABgID+AICAgICAgAGAAYD+gP8AgIABgP2AAwCAgICAAAAABwAAAAACgASAAAMABwALAA8AEwAXABsAACERMxEBNTMVMzUzFSU1MxUhNTMVATUhFTM1IRUBAID/AICAgP4AgAGAgP2AAQCAAQACgP2AAoCAgICAgICAgIABAICAgIAAAwAAAAACgAOAAAMACwARAAAhNSEVNREjNTMRMxEFESEVIREBAAEAgICA/YACAP6AgICAAQCAAQD9gIADgID9AAAAAAABAAABgAKAAgAAAwAAETUhFQKAAYCAgAACAAACAAEAA4AAAwAHAAARNTMVNREzEYCAAgCAgIABAP8AAAACAAACAAEAA4AAAwAHAAARNTMVNREzEYCAAgCAgIABAP8AAAACAAAAAAEAAYAAAwAHAAAxNTMVNREzEYCAgICAAQD/AAAAAAACAAACAAEAA4AAAwAHAAATNTMVJREzEYCA/wCAAgCAgIABAP8AAAAABAAAAgACAAOAAAMABwALAA8AABE1MxUzNTMVJREzETMRMxGAgID/AICAgAIAgICAgIABAP8AAQD/AAAABAAAAgACAAOAAAMABwALAA8AABE1MxUzNTMVJREzETMRMxGAgID/AICAgAIAgICAgIABAP8AAQD/AAAABAAAAAACAAGAAAMABwALAA8AADE1MxUzNTMVJREzETMRMxGAgID/AICAgICAgICAAQD/AAEA/wAAAAAAAQAAAAACgAOAAAsAACERITUhETMRIRUhEQEA/wABAIABAP8AAgCAAQD/AID+AAAAAQAAAQABgAKAAAsAABM1IzUzNTMVMxUjFYCAgICAgAEAgICAgICAAAMAAAAAAoABAAADAAcACwAAMREzETMRMxEzETMRgICAgIABAP8AAQD/AAEA/wAAAAUAAACAAYADAAADAAcACwAPABMAACU1MxUlNTMVJTUzFT0BMxU9ATMVAQCA/wCA/wCAgICAgICAgICAgICAgICAgIAABQAAAIABgAMAAAMABwALAA8AEwAAPQEzFT0BMxU9ATMVJTUzFSU1MxWAgID/AID/AICAgICAgICAgICAgICAgIAAAAABAAAAAAKAA4AAFwAAITUjNSMRMzUzNSEVIRUjFSEVIRUzFSEVAQCAgICAAYD/AIABgP6AgAEAgIABgICAgICAgICAgAAAAAABAAACAAMAA4AADwAAExEjNSEVMzUzFTMRITUjFYCAAYCAgID/AIACAAEAgICAgP8AgIAAAwAAAAACgAOAAA0AEQAVAAAzESM1MzUzFSER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);
}

$cube-face-size: 100px;
$sprite-size: 2400px;

body {
  background: url("../assets/img/mc-bg.png") no-repeat center center fixed;
  background-size: cover;
  font-family: "Minecraftia", sans-serif;
}

.cube-scene {
  width: $cube-face-size;
  height: $cube-face-size;
  perspective: $cube-face-size * 2;
}

.cube {
  width: $cube-face-size;
  height: $cube-face-size;
  position: relative;
  transform-style: preserve-3d;
  transform: translateZ(-$cube-face-size) rotateX(-30deg) rotateY(45deg);
  transition: transform 1s;
  animation: cube-load 8s infinite linear;
}

.cube.show-front {
  transform: translateZ(-($cube-face-size / 2) px) rotateY(0deg);
}
.cube.show-right {
  transform: translateZ(-($cube-face-size / 2) px) rotateY(-90deg);
}
.cube.show-back {
  transform: translateZ(-($cube-face-size / 2) px) rotateY(-180deg);
}
.cube.show-left {
  transform: translateZ(-($cube-face-size / 2) px) rotateY(90deg);
}
.cube.show-top {
  transform: translateZ(-($cube-face-size / 2) px) rotateX(-90deg);
}
.cube.show-bottom {
  transform: translateZ(-($cube-face-size / 2) px) rotateX(90deg);
}

.cube__face {
  position: absolute;
  width: $cube-face-size;
  height: $cube-face-size;
  background-size: $sprite-size;
  line-height: $cube-face-size;
  font-size: $cube-face-size / 5;
  font-weight: bold;
  color: white;
  text-align: center;
}

.cube__face--front {
  transform: rotateY(0deg) translateZ($cube-face-size / 2);
  background-image: url("../assets/img/mc-sprites.png");
  background-position: (-$cube-face-size * 3) 0;
}
.cube__face--right {
  transform: rotateY(90deg) translateZ($cube-face-size / 2);
  background-image: url("../assets/img/mc-sprites.png");
  background-position: (-$cube-face-size * 3) 0;
}
.cube__face--back {
  transform: rotateY(180deg) translateZ($cube-face-size / 2);
  background-image: url("../assets/img/mc-sprites.png");
  background-position: (-$cube-face-size * 3) 0;
}
.cube__face--left {
  transform: rotateY(-90deg) translateZ($cube-face-size / 2);
  background-image: url("../assets/img/mc-sprites.png");
  background-position: (-$cube-face-size * 3) 0;
}
.cube__face--top {
  transform: rotateX(90deg) translateZ($cube-face-size / 2);
  background-image: url("../assets/img/mc-sprites.png");
  background-position: (-$cube-face-size * 0) 0;
}
.cube__face--bottom {
  transform: rotateX(-90deg) translateZ($cube-face-size / 2);
  background-image: url("../assets/img/mc-sprites.png");
  background-position: (-$cube-face-size * 2) 0;
}

@keyframes cube-load {
  0% {
    transform: translateZ(-$cube-face-size) rotateX(-30deg) rotateY(45deg);
  }
  100% {
    transform: translateZ(-$cube-face-size) rotateX(-30deg)
      rotateY((45deg + 360deg));
  }
}
</style>
