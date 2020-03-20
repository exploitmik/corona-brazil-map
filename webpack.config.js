const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const isDevMode = process.env.NODE_ENV != "dev";

module.exports = {
	entry: "./src/main.js",
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundler.js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			},
			{
				test: /\.s?css$/,
				exclude: /node_modules/,
				use: [
					MiniCssExtractPlugin.loader,
					{ loader: 'css-loader', options: { importLoaders: 1 } },
					'postcss-loader',
					'sass-loader'
        ],
			}
		],
	},
	plugins: [
		new CopyWebpackPlugin([
		  { from: 'manifest.json' },
		  { from: 'favicon.ico' },
		  { from: 'sw.js' },
		  { from: 'src/images/icons', to: 'images/icons' },
		]),
		new MiniCssExtractPlugin({
		  filename: '[name].css'
		}),
		new HtmlWebpackPlugin({
			template: 'src/template/index.html',
			minify: {
			  collapseWhitespace: isDevMode,
			  removeComments: isDevMode,
			  useShortDoctype: isDevMode
			}
		}),
	],
	optimization: {
		minimizer: [
			new TerserPlugin()
		]
	}
};