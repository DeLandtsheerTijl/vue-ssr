// eslint-disable-next-line import/no-extraneous-dependencies
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');
const nodeExternals = require('webpack-node-externals');
const merge = require('lodash.merge');

const TARGET_NODE = process.env.WEBPACK_TARGET === 'node';
const target = TARGET_NODE ? 'server' : 'client';

// eslint-disable-next-line no-unused-vars

module.exports = {
  filenameHashing: false,
  css: {
    extract: process.env.NODE_ENV === 'production',
  },
  configureWebpack: () => ({
    entry: `./src/entry-${target}.js`,
    target: TARGET_NODE ? 'node' : 'web',
    // For bundle renderer source map support
    devtool: TARGET_NODE ? 'source-map' : undefined,
    node: TARGET_NODE ? undefined : false,
    plugins: [
      TARGET_NODE ? new VueSSRServerPlugin() : new VueSSRClientPlugin(),
    ],
    // <https://webpack.js.org/configuration/externals/#function>
    // <https://github.com/liady/webpack-node-externals>
    // Externalize app dependencies. This makes the server build much faster
    // and generates a smaller bundle file.
    externals: TARGET_NODE
      ? nodeExternals({
        whitelist: /\.(css|sass|scss)$/,
      })
      : undefined,
    output: {
      libraryTarget: TARGET_NODE ? 'commonjs2' : undefined,
    },
    optimization: {
      splitChunks: TARGET_NODE ? false : undefined,
    },
  }),
  chainWebpack: (config) => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap((options) => merge(options, {
        optimizeSSR: false,
      }));
  },
};
