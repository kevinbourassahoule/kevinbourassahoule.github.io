<template>
  <div>
    <!-- Load Tailwind classes -->
    <div class="hidden w-96"></div>

    <div class="text-center h-screen flex flex-col">
      <div class="mt-auto mb-24">
        <h1 class="text-heading text-6xl uppercase mb-6">Photos de notre mariage</h1>
        <p class="text-2xl mb-2">
          Merci à tous d'être venus et d'avoir participé à cette journée magique.
        </p>
      </div>
      <div class="h-14"></div>
    </div>

    <div class="bg-paper py-12">
      <div class="mx-auto" style="max-width: calc((384 + 16 * 2) * 4px); color: rgb(173, 131, 82);">
        <p class="max-w-prose mx-auto text-2xl text-center">
          Les photos ci-dessous sont dans une résolution plus basse pour le web.<br />
          Si vous en voulez en haute définition, faites-nous signe et on vous les fera parvenir par courriel.
        </p>
        <div class="flex justify-center text-xl py-6">
          <div class="flex flex-col mb-2 mr-4">
            <select id="cat" v-model="selectedCategory" class="bg-transparent border-2 border-current rounded-lg p-1">
              <option class="text-black" value="">Toutes les catégories</option>
              <option v-for="category in categories" :key="category" :value="category" class="text-black">{{ category }}</option>
            </select>  
          </div>
          <div class="flex flex-col mb-2">
            <select id="actors" v-model="selectedActor" class="bg-transparent border-2 border-current rounded-lg p-1">
              <option class="text-black" value="">Toutes les personnes</option>
              <option v-for="actor in actors" :key="actor" :value="actor" class="text-black">{{ actor }}</option>
            </select>  
          </div>
        </div>
        <div class="relative bg-white bg-paper">
          <div class="img-masonry"></div>
          <div v-if="isLoaderActive" class="absolute bottom-96" v-observe-visibility="loadNextImageBatch"></div>
          <div class="h-screen"></div>
        </div>
      </div>
    </div>

    <div class="fixed top-0 right-0 bottom-0 left-0 z-50 flex flex-col text-black bg-paper" :class="{ 'hidden': !isImageSelected }" style="color: rgb(173, 131, 82)">
      <template v-if="isImageSelected">
        <div class="flex text-xl p-3">
          <button class="border-2 border-current rounded-full px-3 py-2" @click="downloadSelectedImage">Télécharger</button>
          <button class="ml-auto border-2 border-current rounded-full px-3 py-2" @click="selectedImage = null">Fermer</button>
        </div>
        <div class="flex-grow">
          <div class="w-full h-full bg-contain bg-center bg-no-repeat" :style="{ backgroundImage: 'url(\'' + selectedImage.urlLQ + '\')' }"></div>
        </div>
        <div class="p-3 text-center text-2xl">
          {{ selectedImage.name }}
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import Masonry from "masonry-layout";
import imagesLoaded from "imagesloaded";
import { uniq, sortBy, deburr } from "lodash";

// https://codepen.io/desandro/pen/kvoBBo

const imageUrlPrefix = "https://raw.githubusercontent.com/kevinbourassahoule/kevinbourassahoule.github.io/main/docs/img/";

export default {
  name: "WeddingPictures",
  data() {
    return {
      masonry: null,
      images: [],
      selectedActor: "",
      selectedCategory: "",
      selectedImage: null,
      currentImageIndex: 0,
      clearingMasonry: false
    };
  },
  watch: {
    selectedActor() {
      this.clearMasonry();
    },
    selectedCategory() {
      this.clearMasonry();
    }
  },
  computed: {
    publicPath: () => process.env.BASE_URL,
    isDevelopmentEnvironment: () => process.env.NODE_ENV === "development",
    isImageSelected() {
      return !!this.selectedImage;
    },
    imgElements() {
      return this.images.map(x => x.imgElement);
    },
    actors() {
      return sortBy(uniq(this.images.map(x => x.actors).flat()), [deburr]);
    },
    categories() {
      return sortBy(uniq(this.images.map(x => x.categories).flat()), [deburr]);
    },
    filteredImages() {
      let result = this.images;

      if (this.selectedCategory) {
        result = result.filter(x => x.categories.some(c => c === this.selectedCategory));
      }

      if (this.selectedActor) {
        result = result.filter(x => x.actors.some(c => c === this.selectedActor));
      }

      return result;
    },
    isLoaderActive() {
      return !this.clearingMasonry && this.filteredImages.length > 0;
    }
  },
  methods: {
    async getImages() {
      const fetchUrl = this.isDevelopmentEnvironment
        ? this.publicPath + "img/mariage/lq"
        : "https://api.github.com/repos/kevinbourassahoule/kevinbourassahoule.github.io/git/trees/32be765a1a5c740988ae40968d764bd3c6ded394";
  
      const response = await fetch(fetchUrl, { headers: { "Accept": "application/json" } })
      const responseData = await response.json();
  
      if (this.isDevelopmentEnvironment) {
        this.images = responseData.map(x => this.getImageFromInfo({ path: x }));
      } else {
        this.images = responseData.tree.map(x => this.getImageFromInfo(x));
      }

      this.images = sortBy(this.images, [x => x.position]);
    },
    getImageFromInfo(imageInfo) {
      const image = {
        name: "",
        path: imageInfo.path,
        urlLQ: this.isDevelopmentEnvironment
          ? this.publicPath + "img/mariage/lq/" + imageInfo.path
          : imageUrlPrefix + "lq/" + imageInfo.path,
        categories: [],
        actors: [],
        position: 999999,
        imgElement: null
      };

      try {
        const fileNameWithoutExtension = image.path.substr(0, image.path.indexOf("."));
        const fileNameParts = fileNameWithoutExtension.split(";");
        for (const fileNamePart of fileNameParts){
          const kvp = fileNamePart.split("=");
          const key = kvp[0];
          const value = kvp[1];

          switch (key) {
            case "n":
              image.name = value;
              break;
            case "a":
              image.actors = value.split(",");
              break;
            case "c":
              image.categories = value.split(",");
              break;
            case "p":
              image.position = Number(value);
              break;
            default: 
              break;
          }
        }
      }
      catch {}

      return image;
    },
    downloadSelectedImage() {
      const a = document.createElement('a');
      a.href = this.selectedImage.urlLQ;
      a.download = this.selectedImage.name || this.selectedImage.path.substr(this.selectedImage.path.lastIndexOf("."));
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    },
    loadNextImageBatch() {
      const imageCountToLoad = Math.min(10, Math.max(0, this.filteredImages.length - this.currentImageIndex));
      const imagesToLoad = this.filteredImages
        .slice(this.currentImageIndex, this.currentImageIndex + imageCountToLoad);
      
      for (let image of imagesToLoad) {
        image.imgElement = htmlToElement(`<div class="img-item w-96 m-4" style="display:none;">
          <img src="${image.urlLQ}" class="transition-transform hover:scale-105 cursor-pointer" />
        </div>`);
        image.imgElement.children[0].onclick = () => { this.selectedImage = image; };
      }

      const imgElements = imagesToLoad.map(x => x.imgElement);
      imagesLoaded(imgElements).on("always", () => {
        for (const image of imagesToLoad) {
          const imgEl = image.imgElement;

          imgEl.removeAttribute("style");
          document.getElementsByClassName("img-masonry")[0].appendChild(imgEl);
  
          this.masonry.appended(imgEl);
        }
      });

      this.currentImageIndex = this.currentImageIndex + imageCountToLoad;
    },
    clearMasonry() {
      this.clearingMasonry = true;
      this.currentImageIndex = 0;
      this.masonry.remove(document.getElementsByClassName("img-masonry")[0].children);
      this.masonry.layout();
      this.$nextTick(() => this.clearingMasonry = false);
    }
  },
  async mounted() {
    await this.getImages();

    this.masonry = new Masonry( '.img-masonry', {
      columnWidth: 384 + 16 * 2,
      itemSelector: '.img-item'
    });
  }
};

/**
 * @param {String} HTML representing a single element
 * @return {Element}
 */
 function htmlToElement(html) {
    var template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
}
</script>

<style scoped lang="scss">
</style>
