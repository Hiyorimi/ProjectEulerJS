module.exports = {
  entry: './20.js',

  output: {
    filename: 'bundle.js'
  },

  module: {
    loaders: [
      { test: /\.js$/, loader: "babel" }
    ]
  }
};
