const webpack = require('webpack');

module.exports = {
  entry: {
    app: './src/index'
  },
  output: {
    filename: 'app.bundle.js',
    path: 'dist/'
  },
  plugins: [
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('./dist/vendors-manifest.json')
    })
  ]
};
