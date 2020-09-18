const path = require("path");
const webpack = require("webpack");

//create main configuration object (more specific on how webpack will function)
module.exports = {
  //root of the bundle, begin dependency path, give relative path to client's code
  entry: './assets/js/script.js',
  // wb takes entry, bundles code, outputs bundled code to a folder specified. (/dist)
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.bundle.js'
  },
  //to allow packages to be used such as jquery
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    }),
  ],
  //default: PROD, minified auto
  mode: 'development'
};

