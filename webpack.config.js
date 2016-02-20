module.exports = {
  entry: './src/js/app.jsx',
  output: {filename:'dist/js/app.js'},
  module: {
    loaders: [
      {test: /\.jsx?$/, loader: 'babel-loader'},
      {test: /\.css$/, loader: 'style-loader!css-loader'}
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};
