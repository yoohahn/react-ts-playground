const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const { resolve } = require('path');
const filename = '[name].[hash:6]';
const chunkFilename = '[name].[chunkhash:6]';

module.exports = () => {
  const env = process.env.NODE_ENV === 'development' ? 'dev' : 'prod';

  const config = {
    devtool: 'source-map',
    entry: ['./index.tsx'],
    output: {
      jsonpFunction: '__myJSONP__',
      filename: `js/${filename}.js`,
      chunkFilename: `js/${chunkFilename}.js`,
      publicPath: '',
      path: resolve(__dirname, 'dist')
    },
    context: resolve(__dirname, 'src'),
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx', 'json']
    },
    module: {
      rules: [
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
    ],
    optimization: {
      splitChunks: {
        chunks: 'all',
        name: true,
      },
      runtimeChunk: true
    }
  };

  const finalConfig = require(`./webpack.${env}.js`)(config);

  return finalConfig;
}
