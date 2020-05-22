import Vue from 'vue';
import VueRouter from 'vue-router';
import VueMeta from 'vue-meta';
// import Home from '../views/Home.vue';

Vue.use(VueRouter);
Vue.use(VueMeta);

const routes = [
  {
    path: '/',
    name: 'Home',
    component() {
      return import(/* webpackChunkName: "home" */ '../views/Home.vue');
    },
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component() {
      return import(/* webpackChunkName: "about" */ '../views/About.vue');
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
