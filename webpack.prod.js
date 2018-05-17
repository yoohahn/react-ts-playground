const webpack = require('webpack');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const { resolve } = require('path');

module.exports = (commonConfig) => {
  const prodConf = {
    mode: 'production',
    output: {
      publicPath: ''
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          include: resolve(__dirname, 'src'),
          exclude: resolve(__dirname, 'node_modules')
        },
        {
          test: /\.css$/,
          loader: [MiniCssExtractPlugin.loader, {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              minimize: true,
              localIdentName: '[hash:base64:8]'
            }
          }],
          include: resolve(__dirname, 'src'),
          exclude: resolve(__dirname, 'node_modules')
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        __DEV__: false
      })
    ]
  };

  return merge(commonConfig, prodConf);
};
