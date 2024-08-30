const { join } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './apps/typescript/redux-toolkit/src/main.ts',
  mode: 'development',
  output: {
    path: join(__dirname, '../../../dist/apps/typescript/redux-toolkit'),
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
      template: './apps/typescript/redux-toolkit/src/index.html',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'apps/typescript/redux-toolkit/src/images',
          to: 'images'
        },
        {
          from: 'apps/typescript/redux-toolkit/src/favicon.ico',
          to: 'images'
        }
      ],
    }),
  ],
  devServer: {
    static: '../../../dist/apps/typescript/redux-toolkit',
    port: 8080,
    open: true,
    hot: true,
    liveReload: true,
    compress: true
  },
};
