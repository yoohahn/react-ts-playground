const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const { resolve, join } = require('path');

const nodeModulesFolder = join(__dirname, 'node_modules');
const filename = '[name].[hash:6]';
const chunkFilename = '[name].[chunkhash:6]';

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  entry: './index.tsx',
  output: {
    jsonpFunction: '__myJSONP__',
    filename: `js/${filename}.js`,
    chunkFilename: `js/${chunkFilename}.js`,
    publicPath: '',
    path: resolve(__dirname, 'dist')
  },
  context: resolve(__dirname, 'src'),
  resolve: {
    extensions: ['.ts', '.tsx', '.js', 'json', '.jsx']
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
        loader: [
          MiniCssExtractPlugin.loader,
          {
            loader: [MiniCssExtractPlugin.loader, {
              loader: 'css-loader',
              options: {
                modules: true,
                importLoaders: 1,
                minimize: true,
                localIdentName: '[hash:base64:8]'
              }
            }],
          }
        ],
        include: resolve(__dirname, 'src'),
        exclude: resolve(__dirname, 'node_modules')
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: `img/${filename}.[ext]`
          }
        }
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `css/${filename}.css`,
      chunkFilename: `css/${chunkFilename}.css`,
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: 'index.html',
      inject: 'body',
      chunksSortMode: 'dependency'
    }),
    new webpack.DefinePlugin({
      __DEV__: false
    })
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: true,
    },
    runtimeChunk: true
  }
};
