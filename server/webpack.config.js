const path = require('path');
module.exports = {
  mode: 'production',
  entry: path.join(__dirname, 'src', 'index'),
  // watch: true,
  output: {
    path: path.join(__dirname, 'src'),
    publicPath: '/src/',
    filename: "__.js",
    chunkFilename: '[name].js'
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      include: [ path.resolve(__dirname, 'src') ],
      exclude: [ path.resolve(__dirname, 'node_modules') ],
      loader: 'babel-loader',
      query: {
        presets: [ "@babel/preset-env" ],
        plugins: [ "@babel/plugin-proposal-optional-chaining" ]
      }
    }]
  },
  resolve: {
    extensions: ['.json', '.js', '.jsx']
  },
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, '/dist/'),
    inline: true,
    host: 'localhost',
    port: 8080,
  }
};