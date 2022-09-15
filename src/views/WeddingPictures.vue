<template>
  <div>
    <!-- Load Tailwind classes -->
    <div class="hidden w-96"></div>

    <div class="text-center h-screen flex flex-col">
      <div class="mt-auto mb-6 sm:mb-12 md:mb-24 mx-2">
        <h1 class="text-heading text-2xl sm:text-4xl md:text-5xl lg:text-6xl uppercase mb-3 sm:mb-8">Photos de notre mariage</h1>
        <p class="max-w-prose mx-auto text-lg sm:text-xl md:text-2xl mb-2">
          Merci à tous d'avoir contribué à la magie de cette journée en la partageant avec nous.
        </p>
      </div>
      <div class="h-14"></div>
    </div>

    <div class="bg-paper py-12">
      <div class="mx-auto" style="max-width: calc((384 + 16 * 2) * 4px); color: rgb(173, 131, 82);">
        <p class="max-w-prose mx-auto sm:text-xl md:text-2xl px-2 mb-4 text-center">
          Les photos ci-dessous sont dans une résolution plus basse pour le web.<br />
          Si vous en voulez en haute définition, faites-nous signe et on vous les fera parvenir par courriel.
        </p>
        <p class="max-w-prose mx-auto text-center md:text-xl mb-2">
          Merci à <a href="https://www.instagram.com/aajoly/" target="_blank" class="underline">@aajoly</a> pour son précieux travail acharné!
        </p>
        <div class="text-center text-xl py-6 mx-2">
          <select id="cat" v-model="selectedFilter" class="bg-transparent border-2 border-current hover:bg-white/50 ring-amber-800/25 outline-none focus:ring transition-colors rounded-lg p-1 w-full sm:w-auto">
            <option class="text-black" value="">Toutes les photos en ordre chronologique</option>
            <optgroup label="Filtrer par moment" class="text-black">
              <option v-for="category in categories" :key="category" :value="'C_' + category" class="text-black">{{ category }}</option>
            </optgroup>
            <optgroup label="Filtrer par invité" class="text-black">
              <option v-for="actor in actors" :key="actor" :value="'A_' + actor" class="text-black">{{ actor }}</option>
            </optgroup>
          </select>
        </div>
        <div class="relative bg-white bg-paper">
          <div class="img-masonry">
            <div class="masonry-sizer w-full sm:w-1/2 md:w-1/3 lg:w-1/4"></div>
          </div>
          <div v-if="isLoaderActive" class="mt-12" v-observe-visibility="loadNextImageBatch">
            <div v-if="loadingNextImageBatch" class="relative flex items-center justify-center mx-auto w-36 h-36 rounded-full border-2 border-current">
              <div class="animate-ping absolute top-0 right-0 bottom-0 left-0 rounded-full bg-current opacity-75"></div>
              <div class="flex items-center justify-center w-full h-full rounded-full bg-paper z-10">Chargement...</div>
            </div>
            <div v-else class="mx-auto ob-19-mask bg-current w-24 h-24"></div>
          </div>
          <div class="h-screen"></div>
        </div>
      </div>
    </div>

    <div class="fixed top-0 right-0 bottom-0 left-0 z-50 flex flex-col text-black bg-paper" :class="{ 'hidden': !isImageSelected }" style="color: rgb(173, 131, 82)">
      <template v-if="isImageSelected">
        <div class="flex justify-between xl:justify-center sm:text-xl p-3">
          <button class="flex items-center border-2 border-current hover:bg-white/50 ring-amber-800/25 outline-none focus:ring transition-colors rounded-full px-3 py-2 xl:mr-12" @click="selectedImage = null">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="mr-2" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
            </svg>
            Retour aux photos
          </button>
          <button class="flex items-center border-2 border-current hover:bg-white/50 ring-amber-800/25 outline-none focus:ring transition-colors rounded-full px-3 py-2" @click="downloadSelectedImage">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="mr-2" viewBox="0 0 16 16">
              <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
              <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
            </svg>
            Télécharger
          </button>
        </div>
        <div class="flex-grow">
          <div class="w-full h-full bg-contain bg-center bg-no-repeat" :style="{ backgroundImage: 'url(\'' + selectedImage.urlLQ + '\')' }"></div>
        </div>
        <div class="pt-3"></div>
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
      selectedCategory: "",
      selectedActor: "",
      selectedImage: null,
      currentImageIndex: 0,
      clearingMasonry: false,
      loadingNextImageBatch: false
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
      return uniq(this.images.map(x => x.categories).flat());
    },
    selectedFilter: {
      get() {
        if (this.selectedCategory) {
          return "C_" + this.selectedCategory;
        } else if (this.selectedActor) {
          return "A_" + this.selectedActor;
        }

        return "";
      },
      set(newValue) {
        this.selectedCategory = "";
        this.selectedActor = "";

        if (newValue.startsWith("C_")) {
          this.selectedCategory = newValue.substr(2);
        } else if (newValue.startsWith("A_")) {
          this.selectedActor = newValue.substr(2);
        }
      }
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
      let fetchUrl = this.publicPath + "img/mariage/lq";
      if (!this.isDevelopmentEnvironment) {
        const mainBranchResponse = await fetch("https://api.github.com/repos/kevinbourassahoule/kevinbourassahoule.github.io/branches/main", { headers: { "Accept": "application/json" } });
        const mainBranch = await mainBranchResponse.json();
        const mainBranchSha = mainBranch.commit.sha;

        const pathItems = ["docs", "img", "mariage", "lq"];
        let currentNodeSha = mainBranchSha;
        for (let pathItem of pathItems) {
          let treeResponse = await fetch("https://api.github.com/repos/kevinbourassahoule/kevinbourassahoule.github.io/git/trees/" + currentNodeSha, { headers: { "Accept": "application/json" } });
          let tree = await treeResponse.json();
          currentNodeSha = tree.tree.find(x => x.path === pathItem).sha;
        }

        fetchUrl = "https://api.github.com/repos/kevinbourassahoule/kevinbourassahoule.github.io/git/trees/" + currentNodeSha;
      }

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
      this.loadingNextImageBatch = true;

      const imageCountToLoad = Math.min(10, Math.max(0, this.filteredImages.length - this.currentImageIndex));
      const imagesToLoad = this.filteredImages
        .slice(this.currentImageIndex, this.currentImageIndex + imageCountToLoad);
      
      for (let image of imagesToLoad) {
        image.imgElement = htmlToElement(`<div class="img-item w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2 sm:p-4" style="display:none;">
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

        this.loadingNextImageBatch = false;
      });

      this.currentImageIndex = this.currentImageIndex + imageCountToLoad;
    },
    clearMasonry() {
      this.clearingMasonry = true;
      this.currentImageIndex = 0;
      this.masonry.remove(document.querySelectorAll(".img-masonry > :not(.masonry-sizer)"));
      this.masonry.layout();
      this.$nextTick(() => this.clearingMasonry = false);
    }
  },
  async mounted() {
    await this.getImages();

    this.masonry = new Masonry( '.img-masonry', {
      columnWidth: ".masonry-sizer",
      itemSelector: ".img-item",
      percentPosition: true
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
