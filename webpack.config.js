const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const { DEV, DEBUG } = process.env;

process.env.BABEL_ENV = DEV ? 'development' : 'production';
process.env.NODE_ENV = DEV ? 'development' : 'production';

module.exports = {
	entry: './src/index.tsx',

	output: {
		path: path.join(__dirname, '/dist'),
		filename: '[name].bundle.js',
		clean: true,
	},

	mode: DEV ? 'development' : 'production',

	devtool: DEV && 'source-map',

	devServer: {
		port: 8080,
	},

	module: {
		rules: [
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				loader: 'ts-loader',
				options: {
					// 项目编译时就不会进行类型检查，也不会输出声明文件.默认为 false
					transpileOnly: true,
				},
			},
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.(less|css)$/,
				exclude: /node_modules/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
					},
					{
						loader: 'css-loader',
						options: {
							importLoaders: 2,
							sourceMap: !!DEV,
						},
					},
					{
						loader: 'less-loader',
						options: {
							sourceMap: !!DEV,
							lessOptions: {
								// 定制antd 主题
								modifyVars: {
									'primary-color': '#1da57a',
								},
								// 支持js
								javascriptEnabled: true,
							},
						},
					},
				],
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				type: 'asset/resource',
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
				type: 'asset/resource',
			},
		],
	},

	resolve: {
		modules: ['node_modules'],
		extensions: ['.json', '.js', '.jsx', '.ts', '.tsx', '.less'],
	},

	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(__dirname, '/src/index.html'),
			inject: 'body',
		}),
		// new CleanWebpackPlugin(),
		DEBUG && new BundleAnalyzerPlugin(),
		new MiniCssExtractPlugin({
			filename: '[name].css',
			chunkFilename: '[name].css',
		}),
		new ESLintPlugin(),
		new ForkTsCheckerWebpackPlugin(),
	].filter(Boolean),

	optimization: {
		usedExports: true,

		minimizer: [
			new TerserPlugin({
				parallel: false,
				terserOptions: {
					output: {
						comments: false,
					},
				},
			}),

			new OptimizeCSSAssetsPlugin({}),
		],
		minimize: !DEV,
		splitChunks: {
			minSize: 500000,
			cacheGroups: {
				vendors: false,
			},
		},
	},
};
