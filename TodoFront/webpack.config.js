var webpack = require('webpack');
module.exports = {
 entry: [
 'webpack-dev-server/client?http://localhost:8080',
 'webpack/hot/only-dev-server',
 './src/index.js'
 ],
 module: {
 loaders: [{
 test: /\.js?$/,
 exclude: /node_modules/,
 loader: "babel",
 query:{
 	presets:['react','es2015']
 }
 },
  { test: /\.css$/, loader: "style-loader!css-loader" }]
 },
resolve: {
extensions: ['', '.js', '.css']
},
devServer: {
   headers: { "Access-Control-Allow-Origin": "*" }
},
output: {
path: 'dist',
publicPath: '/',
filename: 'bundle.js'
},
devServer: {
 contentBase: './dist',

 },
plugins: [
new webpack.HotModuleReplacementPlugin()
]
};
