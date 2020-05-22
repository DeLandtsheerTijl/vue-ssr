const path = require('path');
const { createBundleRenderer } = require('vue-server-renderer');

const template = require('fs').readFileSync(
  path.join(__dirname, './index.template.html'),
  'utf-8',
);
const prerendering = require('aspnet-prerendering');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// eslint-disable-next-line no-unused-vars
global._ = require('https');
const domino = require('domino');
const { MockBrowser } = require('mock-browser').mocks;
// eslint-disable-next-line import/no-unresolved
const serverBundle = require('./vue-ssr-server-bundle.json');
// eslint-disable-next-line import/no-unresolved
const clientManifest = require('./vue-ssr-client-manifest.json');

const mock = new MockBrowser();

global.navigator = mock.getNavigator();

// Shim for the global window and document objects.
const window = domino.createWindow(template);
global.window = window;
global.document = window.document;

const bundleRenderer = createBundleRenderer(serverBundle, {
  runInNewContext: false, // recommended
  template,
  clientManifest,
  inject: false,
});

module.exports = prerendering.createServerRenderer((params) => new Promise((resolve, reject) => {
  const context = {
    url: params.url,
    absoluteUrl: params.absoluteUrl,
    baseUrl: params.baseUrl,
    data: params.data,
    domainTasks: params.domainTasks,
    location: params.location,
    origin: params.origin,
    userToken: params.data.userToken,
    userObject: params.data.userObject,
  };

  bundleRenderer.renderToString(context, (err, _html) => {
    if (err) {
      reject(err);
    }
    resolve({
      html: _html,
    });
  });
}));
