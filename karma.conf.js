module.exports = function karmaConf(config) {
  config.set({
    browsers: ['PhantomJS'],
    files: [
      { pattern: 'src/**/*.spec.js', watched: false },
    ],
    frameworks: ['jasmine'],
    preprocessors: {
      'src/**/*.spec.js': ['webpack'],
    },
    webpack: {
      module: {
        loaders: [
          { test: /\.js$/, exclude: [/build/, /node_modules/], loader: 'babel?presets[]=es2015' },
          { test: /\.html$/, loader: 'raw' },
          { test: /\.styl$/, loaders: ['style-loader', 'css-loader'] },
        ],
      },
      watch: false,
    },
    webpackServer: {
      noInfo: true,
    },
  });
};
