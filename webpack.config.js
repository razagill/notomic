var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');

var TARGET = process.env.TARGET;
var ROOT_PATH = path.resolve(__dirname);
var nodeModulesDir = path.join(ROOT_PATH, 'node_modules');

//Common configuration settings
var common = {
	entry: path.resolve(ROOT_PATH, 'src/index.js'),
	resolve: {
		extensions: ['', '.js'],
		modulesDirectories: ['node_modules']
	},
	output: {
		path: path.resolve(ROOT_PATH, 'dist'),
		filename: 'index.js'
	},
	module: {
		loaders: [
			{
				test: /\.(js)$/,
				loader: 'babel',
				include: path.resolve(ROOT_PATH, 'src')
			},
			{
				test: /\.scss$/,
				loaders: ["style", "css", "sass"]
			}
		]
	}
};

//Development configuration settings
if (TARGET === 'dev') {
	module.exports = merge(common, {
		devtool: 'cheap-module-eval-source-map',
		devServer: {
			publicPath: 'http://localhost:8181/',
			port: '8181',
			host: '0.0.0.0',
			colors: true,
			historyApiFallback: true,
			hot: true,
			inline: true,
			progress: true,
			contentBase: 'dist'
		},
		plugins: [
			new webpack.HotModuleReplacementPlugin(),
			new webpack.DefinePlugin({
				'process.env': {
					'NODE_ENV': JSON.stringify('development')
				},
				'__DEV__': true
			})
		]
	});
}


//Production configuration settings
if (TARGET === 'build') {
	module.exports = merge(common, {
		entry: {
			'notomic': path.resolve(ROOT_PATH, 'src/index.js')
		},
		output: {
			path: path.resolve(ROOT_PATH, 'dist'),
			filename: 'index.js',
			library: 'Notomic',
			libraryTarget: 'umd'
		},
		plugins: [
			new webpack.DefinePlugin({
				'process.env': {
					'NODE_ENV': JSON.stringify('production')
				},
				'__DEV__': false
			}),
			new webpack.optimize.UglifyJsPlugin({
				compress: {
					warnings: false
				}
			}),
			new webpack.optimize.DedupePlugin()
		]
	});
}

