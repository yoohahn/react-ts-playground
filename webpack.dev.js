const { resolve } = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = commonConfig => {
  const devConf = {
    mode: "development",
    entry: ["react-hot-loader/patch"],
    output: {
      publicPath: "/"
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: [
            {
              loader: "babel-loader",
              options: {
                babelrc: true,
                plugins: ["react-hot-loader/babel"]
              }
            },
            "ts-loader"
          ],
          include: resolve(__dirname, "src"),
          exclude: resolve(__dirname, "node_modules")
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                hmr: true,
                reloadAll: true
              }
            },
            {
              loader: "css-loader",
              options: {
                modules: {
                  mode: "local",
                  localIdentName: "[local]-[hash:base64:5]"
                },
                importLoaders: 1
              }
            },
            {
              loader: resolve(__dirname, "definition-loader.js")
            }
          ],
          include: resolve(__dirname, "src"),
          exclude: resolve(__dirname, "node_modules")
        }
      ]
    },
    plugins: [
      new webpack.WatchIgnorePlugin([/css\.d\.ts$/]),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      new webpack.DefinePlugin({
        __DEV__: true,
        "process.env": {
          NODE_ENV: JSON.stringify("development")
        }
      })
    ],
    resolve: {
      alias: { "react-dom": "@hot-loader/react-dom" }
    },
    devServer: {
      hot: true
    }
  };

  return merge(commonConfig, devConf);
};
