/* eslint-disable no-param-reassign */
import { createApp } from './app';

export default (context) => new Promise((resolve, reject) => {
  const { app, router, store } = createApp();
  const meta = app.$meta();
  context.meta = meta;

  store.commit('account/SET_SERVER_TOKEN', context.userToken);
  store.commit('account/SET_SERVER_USER', context.userObject);

  router.push(context.url);

  // wait until router has resolved possible async components and hooks
  router.onReady(() => {
    context.rendered = () => {
      context.state = store.state;
    };

    const matchedComponents = router.getMatchedComponents();
    if (!matchedComponents.length) {
      return reject(new Error(404));
    }

    return resolve(app);
  }, reject);
});
