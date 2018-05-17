const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const { resolve, join } = require('path');

const nodeModulesFolder = join(__dirname, 'node_modules');
const filename = '[name].[hash:6]';
const chunkFilename = '[name].[chunkhash:6]';

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: [
    'react-hot-loader/patch',
    './index.tsx'
  ],
  output: {
    jsonpFunction: '__myJSONP__',
    filename: `js/${filename}.js`,
    chunkFilename: `js/${chunkFilename}.js`,
    publicPath: '/',
    path: resolve(__dirname, 'dist')
  },
  context: resolve(__dirname, 'src'),
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', 'json']
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
    new webpack.WatchIgnorePlugin([
      /css\.d\.ts$/
    ]),
    new MiniCssExtractPlugin({
      filename: `css/${filename}.css`,
      chunkFilename: `css/${chunkFilename}.css`,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      template: 'index.html',
      inject: 'body',
      chunksSortMode: 'dependency'
    }),
    new webpack.DefinePlugin({
      __DEV__: true,
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    })
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: true,
    },
    runtimeChunk: true
  },
  devServer: {
    hot: true
  }
};
