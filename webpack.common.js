const path = require('path');
const webpack = require('webpack');
const bootstrapEntryPoints = require('./webpack.bootstrap.config');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Visualizer = require('webpack-visualizer-plugin');

const isProd = process.env.NODE_ENV === 'production';
const bootstrapConfig = isProd ? bootstrapEntryPoints.prod : bootstrapEntryPoints.dev;

module.exports = {
  entry: {
    // According to HtmlWebpackPlugin config, it's possible that
    // not all entry chunks are included into index.html
    main: [
      'react-hot-loader/patch',
      './src/index.js'
    ],
    /*
    ** A bootstrap entry is added. To Use bootstrap class styles, simply add
    ** 'bootstrap' to HtmlWebpackPlugin chunks array. Bootstrap scripts are
    ** disabled by default, which can be enabled selectively by tweaking .bootstraprc.
     */
    bootstrap: bootstrapConfig
  },
  resolve: {
    // Tell webpack what directories should be searched when resolving modules.
    modules: [
      path.resolve(__dirname, "assets"),
      "node_modules"
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index-template.html',
      // manifest should be included before main,
      // but html webpack plugin will take care of this.
      chunks: ['main', 'manifest', /*'bootstrap'*/], // select the entry items to include
    }),
    new webpack.ProvidePlugin({
      "window.Tether": "tether"
    }),
    new webpack.ProvidePlugin({
      React: 'react',
      Component: ['react', 'Component'],

      // For Bootstrap
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
      Tether: "tether",
      "window.Tether": "tether",
      Alert: "exports-loader?Alert!bootstrap/js/dist/alert",
      Button: "exports-loader?Button!bootstrap/js/dist/button",
      Carousel: "exports-loader?Carousel!bootstrap/js/dist/carousel",
      Collapse: "exports-loader?Collapse!bootstrap/js/dist/collapse",
      Dropdown: "exports-loader?Dropdown!bootstrap/js/dist/dropdown",
      Modal: "exports-loader?Modal!bootstrap/js/dist/modal",
      Popover: "exports-loader?Popover!bootstrap/js/dist/popover",
      Scrollspy: "exports-loader?Scrollspy!bootstrap/js/dist/scrollspy",
      Tab: "exports-loader?Tab!bootstrap/js/dist/tab",
      Tooltip: "exports-loader?Tooltip!bootstrap/js/dist/tooltip",
      Util: "exports-loader?Util!bootstrap/js/dist/util",
    }),
    new CleanWebpackPlugin(['dist']),
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
        test: /\.(woff2)$/,
        loaders: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'fonts/[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(ttf|eot|otf|woff)$/,
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
      },

      // Use one of these to serve jQuery for Bootstrap scripts:

      // Bootstrap 4
      { test: /bootstrap\/dist\/js\/umd\//, use: 'imports-loader?jQuery=jquery' },

      // Bootstrap 3
      { test: /bootstrap-sass\/assets\/javascripts\//, use: 'imports-loader?jQuery=jquery' },
    ]
  }
};