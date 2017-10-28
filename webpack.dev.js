const webpack = require('webpack');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const { resolve } = require('path');

module.exports = (commonConfig) => {
  const devConf = {
    mode: 'development',
    entry: [
      'react-hot-loader/patch'
    ],
    output: {
      publicPath: '/'
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: [
            {
              loader: 'babel-loader',
              options: {
                babelrc: true,
                plugins: ['react-hot-loader/babel'],
              },
            },
            'ts-loader'
          ],
          include: resolve(__dirname, 'src'),
          exclude: resolve(__dirname, 'node_modules')
        },
        {
          test: /\.css$/,
          loader: [MiniCssExtractPlugin.loader, {
            loader: 'typings-for-css-modules-loader',
            options: {
              namedExport: true,
              modules: true,
              importLoaders: 1,
              localIdentName: '[local]-[hash:base64:5]'
            },
          }],
          include: resolve(__dirname, 'src'),
          exclude: resolve(__dirname, 'node_modules')
        }
      ]
    },
    plugins: [
      new webpack.WatchIgnorePlugin([
        /css\.d\.ts$/
      ]),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      new webpack.DefinePlugin({
        __DEV__: true,
        'process.env': {
          NODE_ENV: JSON.stringify('development')
        }
      })
    ],
    devServer: {
      hot: true
    }
  };

  return merge(commonConfig, devConf);
};
