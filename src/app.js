/* eslint-disable import/prefer-default-export */
import Vue from 'vue';
import { sync } from 'vuex-router-sync';

import router from './router';
import store from './store';

import App from './App.vue';

export function createApp() {
  sync(store, router);

  const app = new Vue({
    router,
    store,
    render: (h) => h(App),
  });

  return { app, router, store };
}
