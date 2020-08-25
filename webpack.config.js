const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/pages/index.js',
  mode: 'production',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
        {
            test: /\.html$/i,
            loader: 'html-loader',
          },
        {
            test: /\.css$/i,
            use: [
                MiniCssExtractPlugin.loader,
                { 
                    loader: 'css-loader', options: { importLoaders: 1 } },
                    'postcss-loader',
            ],
          },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        loader: 'file-loader?name=./images/[name].[ext]'
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: 'file-loader?name=./vendor/[name].[ext]',
      },
    ]
  },
  plugins: [
      new HtmlWebpackPlugin({
          template: './src/index.html'
      }),
      new MiniCssExtractPlugin(),
    ],
};