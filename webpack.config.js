const path = require("path");
const webpack = require("webpack");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const WebpackPwaManifest = require("webpack-pwa-manifest");

//create main configuration object (more specific on how webpack will function)
module.exports = {
  //root of the bundle, begin dependency path, give relative path to client's code
  entry: {
    app: "./assets/js/script.js",
    events: "./assets/js/events.js",
    schedule: "./assets/js/schedule.js",
    tickets: "./assets/js/tickets.js"
  },
  // wb takes entry, bundles code, outputs bundled code to a folder specified. (/dist)
  output: {
    // path: path.resolve(__dirname, 'dist'),
    filename: "[name].bundle.js",
    path: __dirname + "/dist"
  },
  module: {
    //file loader
    rules: [
      //object identifying type of files to pre-process using test property to find a regex
      {
        test: /\.jpg$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name(file) {
                return '[path][name].[ext]';
              },
              publicPath: function (url) {
                return url.replace('../', '/assets/');
              }
            }
          },
          {
            loader: 'image-webpack-loader'
          }
        ]
      }
    ],
  },
  //to allow packages to be used such as jquery
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: "static", // the report outputs to an HTML file in the dist folder
    }),
    //invoking constructor function, provide object as only argument
    new WebpackPwaManifest({
      name: "Food Event",
      short_name: "Foodies",
      description: "An app that allows you to view upcoming food events.",
      background_color: "#01579b",
      theme_color: "#ffffff",
      fingerprints: false,
      inject: false,
      icons: [{
        src: path.resolve("assets/img/icons/icon-512x512.png"),
        sizes: [96, 128, 192, 256, 384, 512],
        destination: path.join("assets", "icons")
      }]
    })
  ],
  //default: PROD, minified auto
  mode: 'development'
};

