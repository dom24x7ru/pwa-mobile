import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [],
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
});