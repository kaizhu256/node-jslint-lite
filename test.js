/*jslint
  indent: 2,
  maxerr: 8,
  node: true, nomen: true,
  stupid: true,
*/
(function () {
  'use strict';
  var local, mainApp;
  local = {
    _name: 'jslint-lite',

    _init: function () {
      /*
        this function inits this module
      */
      // init mainApp
      mainApp = {};
      // require modules
      mainApp.jslint_lite = require('./index.js');
      mainApp.fs = require('fs');
      mainApp.path = require('path');
      mainApp.utility2 = require('utility2');
      // init local object
      require('utility2').localExport(local, mainApp);
      // auto-jslint files in the following directories
      [
        'index.js',
        'test.js'
      ].forEach(function (file) {
        switch (mainApp.path.extname(file)) {
        case '.js':
        case '.json':
          mainApp.jslint_lite.jslintPrint(mainApp.fs.readFileSync(file, 'utf8'), file);
          break;
        }
      });
      // init npm test
      mainApp.testRun();
    },

    _jslintPrint_default_test: function (onError) {
      /*
        this function tests jslintPrint's default handling behavior
      */
      var error;
      mainApp.testMock(onError, [
        // mock console.error
        [console, { error: function (arg) {
          error = arg;
        } }]
      ], function (onError) {
        // test csslint failed handling behavior
        error = null;
        mainApp.jslint_lite.jslintPrint('syntax error', 'failed.css');
        // validate error occurred
        mainApp.assert(error, error);
        // test jslint failed handling behavior
        error = null;
        mainApp.jslint_lite.jslintPrint('syntax error', 'failed.js');
        // validate error occurred
        mainApp.assert(error, error);
        // test csslint passed handling behavior
        error = null;
        mainApp.jslint_lite.jslintPrint('body { font: normal; }', 'passed.css');
        // validate no error occurred
        mainApp.assert(!error, error);
        // test jslint passed handling behavior
        error = null;
        mainApp.jslint_lite.jslintPrint('{}', 'passed.js');
        // validate no error occurred
        mainApp.assert(!error, error);
        onError();
      });
    }
  };
  local._init();
}());
