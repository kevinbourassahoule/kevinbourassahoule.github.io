import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/details",
    name: "details",
    component: () =>
      import(/* webpackChunkName: "details" */ "../views/Details.vue")
  },
  {
    path: "/lieu",
    name: "location",
    component: () =>
      import(/* webpackChunkName: "location" */ "../views/Location.vue")
  },
  {
    path: "/horaire",
    name: "schedule",
    component: () =>
      import(/* webpackChunkName: "schedule" */ "../views/Schedule.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
