const HtmlWebpackPlugin = require('html-webpack-plugin');
const { merge } = require('webpack-merge');
const helpers = require('./helpers');

module.exports = merge(
  {},
  {
    context: helpers.resolveFromRootPath('src'),
    resolve: {
      alias: {
        assets: helpers.resolveFromRootPath('src/assets'),
        common: helpers.resolveFromRootPath('src/common'),
        core: helpers.resolveFromRootPath('src/core'),
        frames: helpers.resolveFromRootPath('src/frames'),
        layouts: helpers.resolveFromRootPath('src/layouts'),
        pods: helpers.resolveFromRootPath('src/pods'),
        scenes: helpers.resolveFromRootPath('src/scenes'),
        'common-app': helpers.resolveFromRootPath('src/common-app'),
      },
      extensions: ['.js', '.ts', '.tsx'],
    },
    entry: {
      app: ['./index.tsx'],
    },
    output: {
      path: helpers.resolveFromRootPath('dist'),
    },
    module: {
      rules: [
        {
          test: /\.(png|jpg|gif|svg)$/,
          exclude: /node_modules/,
          type: 'asset/resource',
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'index.html',
      }),
    ],
  }
);
