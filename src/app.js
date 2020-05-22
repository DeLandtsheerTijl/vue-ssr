import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import App from './App.vue';
import router from './router';
import store from './store';
// eslint-disable-next-line no-unused-vars
require('./test.scss');

Vue.config.productionTip = false;

// eslint-disable-next-line import/prefer-default-export
export function createApp() {
  sync(store, router);

  const app = new Vue({
    router,
    store,
    render: (h) => h(App),
  });

  return { app, router, store };
}
