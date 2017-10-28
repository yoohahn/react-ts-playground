const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolve } = require("path");

module.exports = {
	devtool: 'cheap-module-source-map',
	entry: [
		'react-hot-loader/patch',
		'./index.tsx'
	],
	output: {
		filename: 'bundle.js',
		publicPath: "/",
		path: resolve(__dirname, "dist")
	},
	context: resolve(__dirname, 'src'),
	resolve: {
		extensions: ['.ts', '.tsx', '.js', 'json', '.jsx']
	},
	devtool: 'source-map',
	module: {
		loaders: [
			{
				test: /\.(ts|tsx)$/,
				loader: ['react-hot-loader/webpack', 'ts-loader']
			},
			{
				test: /\.css$/,
				loader: ['style-loader', 'css-loader']
			},
		]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin(),
		new HtmlWebpackPlugin({
			inject: true,
			template: 'index.html'
	 })
	],
	devServer: {
		hot: true
	}
};
