var wallabyWebpack = require('wallaby-webpack');
var wallabyPostprocessor = wallabyWebpack({
  // webpack options, such as
  module: {
    loaders: [
      { test: /\.js$/, exclude: [/build/, /node_modules/], loader: 'babel?presets[]=es2015' },
      { test: /\.html$/, loader: 'raw' },
    ],
  },
  externals: { jquery: 'jQuery' },
});

module.exports = function() {
  return {
    files: [
      { pattern: 'src/**/*.js', load: false },
      { pattern: '!src/**/*.spec.js', load: false },
    ],

    tests: [
      { pattern: 'src/**/*.spec.js', load: false },
    ],

    setup: function () {
      // required to trigger test loading
      window.__moduleBundler.loadTests();
    },

    postprocessor: wallabyPostprocessor,
  };
};
