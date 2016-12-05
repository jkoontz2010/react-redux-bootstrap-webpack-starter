const webpack       = require('webpack');
const path          = require('path');
const autoprefixer  = require('autoprefixer');
const precss        = require('precss');

const assetsDir   = path.join(__dirname, 'public/assets');
const vendorsDir  = path.join(__dirname, 'src/app/vendors');

const config = {
  devtool: 'cheap-module-source-map',
  entry: [
    'react-hot-loader/patch',
    'webpack-hot-middleware/client',
    path.join(__dirname, 'src/app/index.js')
  ],
  output: {
    path: assetsDir,
    filename: 'bundle.js',
    publicPath: '/public/assets/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    getImplicitGlobals(),
    setNodeEnv()
  ],
  postcss: function () {
    return [precss, autoprefixer({ browsers: ['last 2 versions'] }), 
  require('postcss-nested')];
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['babel'],
      exclude: [vendorsDir],
      include: path.join(__dirname, 'src/app')
    },  {
      test: /\.scss$/,
      loader: 'style!css!postcss!sass',
      include: path.join(__dirname, 'src/app/global_style')
    }, {
      test: /\.css$/,
      loader: 'style!css!postcss',
      include: [path.join(__dirname, 'src/app/global_style'), /node_modules/]
    }, {
      test: /\.css/,
      exclude: [path.join(__dirname, 'src/app/global_style'), /node_nodules/],
      include: path.join(__dirname, 'src/app'),
      loader: 'style!css?modules&localIdentName=[name]_[local]_[hash:base64:5]!postcss',
    }, {
      test: /\.scss/,
      exclude: [path.join(__dirname, 'src/app/global_style'), /node_nodules/],
      include: path.join(__dirname, 'src/app'),
      loader: 'style!css?modules&localIdentName=[name]_[local]_[hash:base64:5]!postcss!sass',
    }, {
      test: /\.json$/,
      loader: 'json'
    }, {
      test: /\.(eot|woff|woff2|ttf|png|svg|jpe?g|gif)(\?\S*)?$/,
      loader: 'url?limit=100000@name=[name][ext]'
    }]
  }
};
/*
* here using hoisting so don't use `var NAME = function()...`
*/
function getImplicitGlobals() {
  return new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery'
  });
}

function setNodeEnv() {
  return new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('dev')
    }
  });
}

module.exports = config;
