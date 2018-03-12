module.exports = {
	context: __dirname + '/client',
	entry: '../index.jsx',
	output: {
		path: __dirname,
		filename: 'bundle.js'
	},
	devServer: {
	    inline:true,
	    port: (process.env.PORT || 5000),
	    compress: true,
    	disableHostCheck: true 
  	},
	mode: "development",
	module: {
		rules: [
			{
				test: /\.js(x)$/,
				loader: 'babel-loader',
				exclude: /node_modules/
			},
			{
	            test: /\.less$/,
	            exclude: /node_modules/,
	            use: [{
	                loader: "style-loader" // creates style nodes from JS strings
	            }, {
	                loader: "css-loader" // translates CSS into CommonJS
	            }, {
	                loader: "less-loader" // compiles Less to CSS
	            }]
        	}
        ]
    }
}