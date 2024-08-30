const { join } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './apps/typescript/redux-plain/src/main.ts',
  mode: 'development',
  output: {
    path: join(__dirname, '../../../dist/apps/typescript/redux-plain'),
    filename: 'main.js'
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(sass|css|scss)$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      }
    ],
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './apps/typescript/redux-plain/src/index.html',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'apps/typescript/redux-plain/src/images',
          to: 'images'
        },
        {
          from: 'apps/typescript/redux-plain/src/favicon.ico',
          to: 'images'
        }
      ],
    }),
  ],
  devServer: {
    static: '../../../dist/apps/typescript/redux-plain',
    port: 8080,
    open: true,
    hot: true,
    liveReload: true,
    compress: true
  },
};
