import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import(/* webpackChunkName: "home" */ "../views/HomePage.vue"),
    children: [
      {
        path: "mariage",
        component: () =>
          import(/* webpackChunkName: "wedding" */ "../views/WeddingPage.vue"),
        children: [
          {
            path: "",
            name: "wedding-home",
            component: () =>
              import(
                /* webpackChunkName: "wedding" */ "../views/WeddingHome.vue"
              )
          },
          {
            path: "lieu",
            name: "wedding-location",
            component: () =>
              import(
                /* webpackChunkName: "wedding" */ "../views/WeddingLocation.vue"
              )
          },
          {
            path: "details",
            name: "wedding-details",
            component: () =>
              import(
                /* webpackChunkName: "wedding" */ "../views/WeddingDetails.vue"
              )
          },
          {
            path: "horaire",
            name: "wedding-schedule",
            component: () =>
              import(
                /* webpackChunkName: "wedding" */ "../views/WeddingSchedule.vue"
              )
          },
          {
            path: "ceremonie",
            name: "wedding-ceremony",
            component: () =>
              import(
                /* webpackChunkName: "wedding" */ "../views/WeddingCeremony.vue"
              )
          },
          {
            path: "responsabilites",
            name: "wedding-responsibilities",
            component: () =>
              import(
                /* webpackChunkName: "wedding" */ "../views/WeddingResponsibilities.vue"
              )
          },
          {
            path: "diner",
            name: "wedding-rehearsal",
            component: () =>
              import(
                /* webpackChunkName: "wedding" */ "../views/WeddingRehearsal.vue"
              )
          },
          {
            path: "photos",
            name: "wedding-pictures",
            component: () =>
              import(
                /* webpackChunkName: "wedding" */ "../views/WeddingPictures.vue"
              )
          },
          {
            path: "assets",
            name: "wedding-assets",
            component: () =>
              import(
                /* webpackChunkName: "wedding" */ "../views/WeddingAssets.vue"
              )
          }
        ]
      },
      {
        path: "moins-kev",
        name: "sarah-home",
        component: () =>
          import(/* webpackChunkName: "sarah" */ "../views/SarahHome.vue")
      },
      {
        path: "minecraft",
        name: "minecraft",
        component: () =>
          import(
            /* webpackChunkName: "minecraft" */ "../views/MinecraftHome.vue"
          )
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
