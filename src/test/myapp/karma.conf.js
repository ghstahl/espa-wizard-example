const isparta = require('isparta');
const babelIstanbul = require('browserify-babel-istanbul');

module.exports = function(config) {
    config.set({
      // base path that will be used to resolve all patterns (eg. files, exclude)
      basePath: '../../../',
      // frameworks to use
      // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
      frameworks: ['browserify',  'mocha', 'sinon-chai'],
      // list of files / patterns to load in the browser
      files: [
        'node_modules/babel-polyfill/dist/polyfill.js',
        'node_modules/whatwg-fetch/fetch.js',
        'node_modules/espa/barebone.js',
        'src/build/myapp/services/plugin-core.js',
        'src/build/myapp/**/*.js',
        'src/test/myapp/**/*.spec.js'
      ],
      // list of files to exclude
      exclude: [
        'src/build/myapp/main.js'    
      ],
      // preprocess matching files before serving them to the browser
      // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
      preprocessors: {
        'node_modules/espa/barebone.js': ['browserify'],
        'src/build/myapp/services/plugin-core.js': ['browserify'],
        'src/build/myapp/**/*.js': ['browserify'],
        'src/test/myapp/**/*.spec.js': ['browserify']
      },
      browserify: {
        debug: true,
        paths: [config.cwd],
        transform: [
          ['stringify', { extensions: ['.html'], minify: false }],
          [babelIstanbul({
            instrumenter: isparta,
            instrumenterConfig: {
              babel: {
                presets: ['es2015'] 
              }
            },
            ignore: [
              '**/node_modules/**',,
              '**/jspm_packages/**',
              '**/views/**',
              '**/mock/**',
              '**/polyfill/**',
              '**/src/build/plugins/**'
            ]
          })],
          ['babelify', {
            presets: ['es2015'] 
          }]
        ]
      },
      // test results reporter to use
      // possible values: 'dots', 'progress'
      // available reporters: https://npmjs.org/browse/keyword/karma-reporter
      reporters: ['progress', 'coverage', 'html'],
      htmlReporter: {
        outputFile: 'tests/myapp/units.html',
        // Optional 
        pageTitle: 'Unit Tests',
        subPageTitle: 'MyApp',
        groupSuites: true,
        useCompactStyle: true,
        useLegacyStyle: true
      },
      // web server port
      port: 9876,
      // enable / disable colors in the output (reporters and logs)
      colors: true,
      // level of logging
      // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
      logLevel: config.LOG_INFO,
      // enable / disable watching file and executing tests whenever any file changes
      autoWatch: true,
      // start these browsers
      // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
      browsers: ['PhantomJS'],
      //browsers: ['Chrome'],
      // Continuous Integration mode
      // if true, Karma captures browsers, runs the tests and exits
      singleRun: true,
      // Concurrency level
      // how many browser should be started simultaneous
      concurrency: 1,
      coverageReporter: {
        includeAllSources: true,
        dir: 'coverage/myapp/',
        reporters: [
            { type: 'html', subdir: 'html' },
            { type: 'text-summary' }
        ]
      }
    });
  };