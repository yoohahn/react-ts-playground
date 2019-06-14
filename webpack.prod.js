const webpack = require("webpack");
const merge = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const { resolve } = require("path");

module.exports = commonConfig => {
  const prodConf = {
    mode: "production",
    output: {
      publicPath: ""
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          include: resolve(__dirname, "src"),
          exclude: resolve(__dirname, "node_modules")
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                hmr: false
              }
            },
            {
              loader: "css-loader",
              options: {
                modules: {
                  mode: "local",
                  localIdentName: "[hash:base64:5]"
                },
                importLoaders: 1
              }
            }
          ],
          include: resolve(__dirname, "src"),
          exclude: resolve(__dirname, "node_modules")
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
