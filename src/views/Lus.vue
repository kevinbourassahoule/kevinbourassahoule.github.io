<i18n>
{
  "en": {},
  "fr": {}
}
</i18n>

<template>
  <div class="text-center mx-auto" style="max-width: 400px">
    <h1 class="mb-6 font-light text-5xl">Équipe à Lus</h1>
    <h2 class="mb-4 text-3xl">Code QR des joueurs</h2>
    <div>
      <div v-for="(url, key) in playerKeyToUrl" :key="key" class="mt-12">
        <p>
          Le lien [{{ getQrCodeUrlForPlayer(key) }}], représenté par le code QR
          ci-dessous, sera redirigé vers [{{ url }}].
        </p>
        <QrCode :value="getQrCodeUrlForPlayer(key)" class="mx-auto" />
      </div>
    </div>
  </div>
</template>

<script>
import QrCode from "@chenfengyuan/vue-qrcode";

export default {
  name: "Lus",
  data() {
    return {
      url: "",
      playerKeyToUrl: {}
    };
  },
  computed: {
    playerKey() {
      return this.$route.query.player;
    }
  },
  methods: {
    getQrCodeUrlForPlayer(playerKey) {
      return `${window.location.origin}${window.location.pathname}${window.location.hash}?player=${playerKey}`;
    }
  },
  async mounted() {
    const response = await fetch("/json/players.json");
    this.playerKeyToUrl = await response.json();

    if (this.playerKey in this.playerKeyToUrl) {
      window.location = this.playerKeyToUrl[this.playerKey];
    }
  },
  components: { QrCode }
};
</script>

<style lang="scss" scoped></style>
