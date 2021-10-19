import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import(/* webpackChunkName: "home" */ "../views/Home.vue"),
    children: [
      {
        path: "mariage",
        name: "wedding-page",
        component: () =>
          import(
            /* webpackChunkName: "wedding-page" */ "../views/WeddingPage.vue"
          ),
        children: [
          {
            path: "",
            name: "wedding-home",
            component: () =>
              import(
                /* webpackChunkName: "wedding-home" */ "../views/WeddingHome.vue"
              )
          },
          {
            path: "details",
            name: "wedding-details",
            component: () =>
              import(
                /* webpackChunkName: "wedding-details" */ "../views/WeddingDetails.vue"
              )
          },
          {
            path: "lieu",
            name: "wedding-location",
            component: () =>
              import(
                /* webpackChunkName: "wedding-location" */ "../views/WeddingLocation.vue"
              )
          },
          {
            path: "horaire",
            name: "wedding-schedule",
            component: () =>
              import(
                /* webpackChunkName: "wedding-schedule" */ "../views/WeddingSchedule.vue"
              )
          }
        ]
      },
      {
        path: "moins-kev",
        name: "sarah-home",
        component: () =>
          import(/* webpackChunkName: "sarah-home" */ "../views/SarahHome.vue")
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
