const webpack      = require('webpack');
const path         = require('path');
const autoprefixer = require('autoprefixer');
const precss       = require('precss');

const assetsDir       = path.resolve(__dirname, 'public/assets');
const nodeModulesDir  = path.resolve(__dirname, 'node_modules');

const config = {
  entry: [
    path.resolve(__dirname, 'src/app/index.js')
  ],
  output: {
    path: assetsDir,
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel',
      exclude: [nodeModulesDir]
    },   {
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
      test: /\.json$/,
      loader: 'json'
    }, {
      test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif)(\?\S*)?$/,
      loader: 'url?limit=100000@name=[name][ext]'
    }]
  },
  postcss: function () {
    return [precss, autoprefixer({ browsers: ['last 2 versions'] })];
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    getImplicitGlobals(),
    setNodeEnv()
  ]
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
