/* eslint-disable no-console */
const path = require('path');

const express = require('express');

const { createBundleRenderer } = require('vue-server-renderer');

const template = require('fs').readFileSync(
  path.join(__dirname, './index.html'),
  'utf-8',
);

// eslint-disable-next-line import/no-unresolved
const serverBundle = require('../dist/vue-ssr-server-bundle.json');
// eslint-disable-next-line import/no-unresolved
const clientManifest = require('../dist/vue-ssr-client-manifest.json');

const server = express();

const renderer = createBundleRenderer(serverBundle, {
  runInNewContext: false,
  template,
  clientManifest,
  inject: false,
});

server.use('/dist', express.static(path.join(__dirname, '../dist')));

server.get('*', (req, res) => {
  const context = { url: req.url };

  renderer.renderToString(context, (err, html) => {
    if (err) {
      if (+err.message === 404) {
        res.status(404).end('Page not found');
      } else {
        console.log(err);
        res.status(500).end('Internal Server Error');
      }
    }

    res.end(html);
  });
});

module.exports = server;
