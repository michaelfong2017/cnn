// This library allows us to combine paths easily
const path = require('path');
// const fs = require('fs')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
   entry: [path.resolve(__dirname, 'src', 'index.js')],
   output: {
      path: path.resolve(__dirname, 'build'),
      filename: '[name].[contenthash:8].bundle.js',
      sourceMapFilename: '[name].[contenthash:8].map',
      chunkFilename: '[id].[contenthash:8].bundle.js'
   },
   mode: 'production',
   devServer: {
      contentBase: path.resolve(__dirname, 'build'),
      port: 8080,
      // https: {
      //    cert: fs.readFileSync(path.resolve(__dirname, 'localhost.crt')),
      //    key: fs.readFileSync(path.resolve(__dirname, 'localhost.key')),
      // },
      // proxy: [
      //    {
      //       context: ['/authorize', '/api'],
      //       target: 'https://localhost:8443',
      //       secure: false,
      //       changeOrigin: true,
      //    },
      // ],
   },
   devtool: 'source-map',
   resolve: {
      extensions: ['.js', '.jsx'],
      roots: [
         path.resolve(__dirname, 'node_modules'),
         path.resolve(__dirname, 'src')
      ],
      modules: [
         path.resolve(__dirname, 'node_modules'),
         path.resolve(__dirname, 'src')
      ]
   },
   module: {
      rules: [
         {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: ['babel-loader']
         },
         {
            test: /\.scss$/,
            use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'] // Note that postcss loader must come before sass-loader
         },
         {
            test: /\.(svg|png|jpg|gif|ttf)$/,
            use: 'file-loader',
         }
      ]
   },
   plugins: [
      new HtmlWebpackPlugin({
         template: path.resolve(__dirname, 'src', 'index.html')
      }),
      new CleanWebpackPlugin(),
      new webpack.DefinePlugin({
         'process.env.NODE_ENV': JSON.stringify('production')
      }),
      // new CopyWebpackPlugin({
      //    patterns: [
      //       {
      //          from: path.resolve(__dirname, 'src', 'pages', 'dashboard'),
      //          to: path.resolve(__dirname, 'build', 'pages', 'dashboard')
      //       }
      //    ]
      // })
   ],
   optimization: {
      splitChunks: { chunks: "all" }
   },
};