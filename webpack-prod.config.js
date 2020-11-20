const path = require('path');

module.exports = {
  mode: 'development',
  entry: './_dist-prod/example/demo.js',
  output: {
    filename: 'index.js',
    path: path.join(__dirname, '_dist-prod/example/')
  },
  devtool: 'inline-source-map'
}

