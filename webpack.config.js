module.exports = {
        mode: 'development',
	entry: './app.js',
	devtool: "eval-source-map",
	output: {
		filename: 'bundle2.js'
	},
	module: {
		rules: [
		  {
			test: /\.(js|jsx)$/,
			exclude: /node_modules/,
			use: {
			  loader: "babel-loader"
			}
		  }
		]
	  }
};

