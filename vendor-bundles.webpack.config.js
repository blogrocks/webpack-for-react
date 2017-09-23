const path = require('path');
const webpack = require('webpack');

const PRODUCTION = process.env.NODE_ENV === 'production';

const webpackConfig = {
  entry: {
    vendor: ['react', 'react-dom'],
  },
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].dll.js',
    library: '[name]_[hash]',
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, 'build', '[name]-manifest.json'),
      name: '[name]_[hash]',
    }),
  ],
};

if (PRODUCTION) {
  webpackConfig.plugins.push(
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    })
  );
  webpackConfig.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true
      //comments: true,
      //mangle: false,
      //compress: {
      //    warnings: true
      //}
    })
  );
}

module.exports = webpackConfig;
