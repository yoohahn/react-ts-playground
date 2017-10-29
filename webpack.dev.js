const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolve, join } = require('path');

const nodeModulesFolder = join(__dirname, 'node_modules');
module.exports = {
  devtool: 'inline-source-map',
  entry: [
    'react-hot-loader/patch',
    './index.tsx'
  ],
  output: {
    filename: `js/[name].js`,
    chunkFilename: `js/async/[name].js`,
    publicPath: '/',
    path: resolve(__dirname, 'dist')
  },
  context: resolve(__dirname, 'src'),
  resolve: {
    extensions: ['.ts', '.tsx', '.js', 'json', '.jsx']
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        loader: ['react-hot-loader/webpack', 'ts-loader'],
        include: resolve(__dirname, 'src'),
        exclude: resolve(__dirname, 'node_modules')
      },
      {
        test: /\.css$/,
        loader: ['style-loader', 'css-loader'],
        include: resolve(__dirname, 'src'),
        exclude: resolve(__dirname, 'node_modules')
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'img/[name].[hash:base64:5].[ext]'
          }
        }
      },
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
        inject: true,
        template: 'index.html'
     }),
     new webpack.DefinePlugin({
       __DEV__: true,
       'process.env': {
         NODE_ENV: JSON.stringify('development')
       }
     }),
     new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks(module) {
          // any required modules inside nodeModulesFolder are extracted to vendor
          return (
            module.resource &&
            /\.js$/.test(module.resource) &&
            module.resource.indexOf(nodeModulesFolder) === 0
          );
        }
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'manifest'
      })
  ],
  devServer: {
    hot: true
  }
};
