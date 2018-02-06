
module.exports = {
	entry: './app.js',
	output: {
		filename: 'bundle.js'
	},
	module: {
		rules: [{
			test: /\.js$/, // All .js files
			loaders: ['babel-loader'], // react-hot is like browser sync and babel loads jsx and es6-7
			exclude: /(node_modules|bower_components)/,
		}]
	}
};

