const path = require('path');

module.exports = {
  entry: './src/index.js', // Arquivo de entrada
  output: {
    filename: 'bundle.js', // Nome do arquivo de saída
    path: path.resolve(__dirname, 'dist'), // Caminho de saída
  },
  module: {
    rules: [
        {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
        }
    ]
  },
  mode: 'development'
};