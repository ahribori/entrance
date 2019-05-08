const path = require('path');

module.exports = {
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'sdk.min.js',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json'],
  },
  module: {
    rules: [{ test: /\.tsx?$/, use: ['ts-loader'], exclude: /node_modules/ }],
  },
  devServer: {
    contentBase: path.resolve('public'),
    compress: true,
    port: 9000,
  },
};
