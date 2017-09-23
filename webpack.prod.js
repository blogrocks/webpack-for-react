const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const PurifyCSSPlugin = require('purifycss-webpack');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const glob = require('glob');
const common = require('./webpack.common');

module.exports = merge(common, {
  devtool: 'source-map',
  output: {
    filename: '[name].[chunkhash].js'
  },
  plugins: [
    new UglifyJSPlugin({
      sourceMap: true,
      compress: {
        warnings: false,
        drop_console: true,
        drop_debugger: true
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.HashedModuleIdsPlugin(),
    new ExtractTextPlugin({
      filename: 'css/[name]-style-[contenthash:10].css',
      allChunks: true
    }),
    new PurifyCSSPlugin({
      // Give paths to parse for rules. These should be absolute!
      paths: glob.sync(path.join(__dirname, './*.html')).concat(
        glob.sync(path.join(__dirname, './src/**/*.js'))
      ),
      minimize: true,
      moduleExtensions: ['.js'], //An array of file extensions for determining used classes within node_modules
      purifyOptions: {
        whitelist: ['*purify*']
      }
    }),
    new FaviconsWebpackPlugin('./logo.svg')
  ],
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: ExtractTextPlugin.extract({
          use: [
            'css-loader?minimize=true&localIdentName=purify_[hash:base64:10]',
            'sass-loader',
            'postcss-loader'
          ]
        })
      }
    ]
  }
});

