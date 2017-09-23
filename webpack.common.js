const path = require('path');
const webpack = require('webpack');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Visualizer = require('webpack-visualizer-plugin');

module.exports = {
  entry: {
    // According to HtmlWebpackPlugin config, it's possible that
    // not all entry chunks are included into index.html
    main: './src/index.js'
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      template: './index-template.html',
      // manifest should be included before main,
      // but html webpack plugin will take care of this.
      chunks: ['main', 'manifest'], // select the entry items to include
    }),
    new webpack.DllReferencePlugin({
      context: path.join(__dirname),
      manifest: require('./build/vendor-manifest.json'),
    }),
    // A lesser-known feature of the CommonsChunkPlugin is extracting
    // webpack's boilerplate and manifest which can change with every build.
    // By specifying a name not mentioned in the entry configuration,
    // the plugin will automatically extract what we want into a separate bundle
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity
    }),
    new AddAssetHtmlPlugin({
      includeSourcemap: true,
      hash: true,
      filepath: require.resolve('./build/vendor.dll.js')
    }),
    new Visualizer()
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    chunkFilename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        loaders: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'images/[hash:12].[ext]'
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              gifsicle: {
                interlaced: false
              },
              optipng: {
                optimizationLevel: 7
              },
              pngquant: {
                quality: '65-90',
                speed: 4
              },
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              // Specifying webp here will create a WEBP version of your JPG/PNG images
              webp: {
                quality: 75
              }
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader?name=fonts/[name].[ext]'
        ]
      },
      {
        test: /\.(csv|tsv)$/,
        use: [
          'csv-loader'
        ]
      },
      {
        test: /\.xml$/,
        use: [
          'xml-loader'
        ]
      }
    ]
  }
};