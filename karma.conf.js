module.exports = function(config) {
  config.set({

    // frameworks to use
    frameworks: ['jasmine'],

    files: [
      'bower_components/angular/angular.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'bower_components/angular-sanitize/angular-sanitize.js',

      'bower_components/i18next/i18next.js',

      'test/bind-polyfill.js', // For Jasmine

      'i18ng.js',
      'test/i18ng-test.js',
    ],

    reporters: ['progress', 'coverage'],

    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    browsers: ['Chrome', 'Firefox', 'PhantomJS'],

    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,

    singleRun: false // Continuous Integration mode
  });
};
