var path    = require( "path" );
var webpack = require( "webpack" );

var production = (process.argv.indexOf( "--production" ) > -1);

module.exports = {
	cache:   {},
	entry:   {
		main: [ "./test/main.js" ],
	},
	output:  {
		path:     path.join( __dirname, "test" ),
		filename: "[name].build.js"
	},
	module:  {
		loaders: [
			{
				test:    /\.js$/,
				exclude: /node_modules/,
				loader:  "babel?presets[]=es2015!eslint",
			},
			{
				test:   /\.json$/,
				loader: "json"
			}
		],
	},
	node:    {
		fs: "empty"
	},
	plugins: [ new webpack.DefinePlugin( { __PROD__: production } ),
			 ].concat( production ? [ new webpack.optimize.UglifyJsPlugin( { compress: { drop_console: true, warnings: false } } ) ] : [] )
};
