const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');
const GenerateSW = require('webpack-generate-sw');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'Jate'
      }),

      new GenerateSW(),

      new WebpackPwaManifest(
        {
          "short_name": "Manifest",
          "name": "Installer Manifest Example",
          "icons": [
            {
              "src": "./assets/images/logo.png",
              "type": "image/png",
              "sizes": "512x512",
              "purpose": "any maskable"
            }
          ],
          "orientation": "portrait",
          "display": "standalone",
          "start_url": "./",
          "description": "install the app",
          "background_color": "#7eb4e2",
          "theme_color": "#7eb4e2"
        }
        ), 
      
    ],

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        },
        
      ],
    },
  };
};
``