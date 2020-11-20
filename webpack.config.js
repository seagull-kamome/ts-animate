const path = require('path');

module.exports = {
  mode: 'development',
  entry: './_dist/example/demo.js',
  output: {
    filename: 'index.js',
    path: path.join(__dirname, '_dist/example/')
  },
  devtool: 'inline-source-map'
}

