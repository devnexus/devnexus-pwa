
module.exports = {
        mode: 'production',
	entry: './app.js',
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

