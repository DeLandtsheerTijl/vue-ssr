const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');
const nodeExternals = require('webpack-node-externals');
const merge = require('lodash.merge');
const webpack = require('webpack');

const TARGET_NODE = process.env.WEBPACK_TARGET === 'node';
const target = TARGET_NODE ? 'server' : 'client';

module.exports = {
  filenameHashing: false,
  css: {
    extract: process.env.NODE_ENV === 'production',
    loaderOptions: {
      scss: {
        prependData: '@import "@/assets/scss/quarks/_colors.scss"; @import "@/assets/scss/utils/mixins/index.scss"; @import "@/assets/scss/quarks/_globals.scss";',
      },
    },
  },
  configureWebpack: () => ({
    entry: `./src/entry-${target}.js`,
    target: TARGET_NODE ? 'node' : 'web',
    devtool: TARGET_NODE ? 'source-map' : undefined,
    node: TARGET_NODE ? undefined : false,
    plugins: [
      TARGET_NODE ? new VueSSRServerPlugin() : new VueSSRClientPlugin(),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
        'process.env.VUE_ENV': TARGET_NODE ? "'server'" : "'client'",
        // 'process.env.NODE_TLS_REJECT_UNAUTHORIZED': TARGET_NODE ? "'0'" : "'1'",
      }),
    ],
    externals: TARGET_NODE
      ? nodeExternals({
        whitelist: /\.(css|sass|scss)$/,
      })
      : undefined,
    output: {
      libraryTarget: TARGET_NODE ? 'commonjs2' : undefined,

    },
    // optimization: {
    //   splitChunks: TARGET_NODE ? false : undefined,
    // },
  }),
  chainWebpack: (config) => {
    if (TARGET_NODE) config.optimization.delete('splitChunks');
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap((options) => merge(options, {
        optimizeSSR: false,
      }));
  },
};
