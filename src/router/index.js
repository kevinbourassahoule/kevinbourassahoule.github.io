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
          // {
          //   path: "horaire",
          //   name: "wedding-rsvp",
          //   component: () =>
          //     import(
          //       /* webpackChunkName: "wedding" */ "../views/WeddingSchedule.vue"
          //     )
          // },
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
  routes
});

export default router;