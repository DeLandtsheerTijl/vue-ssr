/* eslint-disable import/order */
const path = require('path');
const { createBundleRenderer } = require('vue-server-renderer');

// eslint-disable-next-line import/no-unresolved
const serverBundle = require('../dist/vue-ssr-server-bundle.json');
// eslint-disable-next-line import/no-unresolved
const clientManifest = require('../dist/vue-ssr-client-manifest.json');

const template = require('fs').readFileSync(
  path.join(__dirname, './index.html'),
  'utf-8',
);

const bundleRenderer = createBundleRenderer(serverBundle, {
  runInNewContext: false, // recommended
  template,
  clientManifest,
  // inject: false
});

const prerendering = require('aspnet-prerendering');

module.exports = prerendering.createServerRenderer((params) => new Promise((resolve, reject) => {
  const context = {
    url: params.url,
    absoluteUrl: params.absoluteUrl,
    baseUrl: params.baseUrl,
    data: params.data,
    domainTasks: params.domainTasks,
    location: params.location,
    origin: params.origin,
    sampleData: params.data.sampleData,
  };
  bundleRenderer.renderToString(context, (err, _html) => {
    if (err) {
      reject(err.message);
    }
    resolve({
      html: _html,
    });
  });
}));
