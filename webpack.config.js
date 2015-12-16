module.exports = {
  entry: {
    index: './src/index.js',
  },
  node: {
    fs: 'empty',
  },
  output: {
    path: 'build',
    filename: '[name].js',
  },
  devtool: 'inline-source-map',
  module: {
    loaders: [
      { test: /.js$/, loader: 'babel-loader' },
      { test: /.json$/, loader: 'json-loader' },
    ],
  },
};
