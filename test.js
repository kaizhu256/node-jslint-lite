/*jslint
  browser: true,
  indent: 2,
  maxerr: 8,
  node: true, nomen: true,
  stupid: true,
*/
(function (local) {
  'use strict';
  switch (local.modeJs) {
  // init node js-env
  case 'node':
    // require modules
    local.jslint_lite = require('./index.js');
    local.fs = require('fs');
    local.path = require('path');
    local.utility2 = require('utility2');

    local.fs.readdirSync(__dirname).forEach(function (file) {
      file = __dirname + '/' + file;
      switch (local.path.extname(file)) {
      case '.js':
      case '.json':
        // jslint the file
        local.utility2.jslint_lite.jslintAndPrint(local.fs.readFileSync(file, 'utf8'), file);
        break;
      }
      // if the file is modified, then restart the process
      local.utility2.onFileModifiedRestart(file);
    });
    // init repl debugger
    local.utility2.replStart({ local: local });

    local._jslintAndPrint_default_test = function (onError) {
      /*
        this function tests jslintAndPrint's default handling behavior
      */
      var error;
      local.utility2.testMock([
        // mock console.error
        [console, { error: function (arg) {
          error = arg;
        } }]
      ], onError, function (onError) {
        // test csslint failed handling behavior
        error = null;
        local.jslint_lite.jslintAndPrint('syntax error', 'failed.css');
        // validate error occurred
        local.utility2.assert(error, error);
        // test jslint failed handling behavior
        error = null;
        local.jslint_lite.jslintAndPrint('syntax error', 'failed.js');
        // validate error occurred
        local.utility2.assert(error, error);
        // test csslint passed handling behavior
        error = null;
        local.jslint_lite.jslintAndPrint('body { font: normal; }', 'passed.css');
        // validate no error occurred
        local.utility2.assert(!error, error);
        // test jslint passed handling behavior
        error = null;
        local.jslint_lite.jslintAndPrint('{}', 'passed.js');
        // validate no error occurred
        local.utility2.assert(!error, error);
        // test /* jslint-ignore-begin */ ... /* jslint-ignore-end */ handling behavior
        error = null;
        local.jslint_lite.jslintAndPrint('/* jslint-ignore-begin */\n' +
          'syntax error\n' +
          '/* jslint-ignore-end */\n', 'passed.js');
        // validate no error occurred
        local.utility2.assert(!error, error);
        onError();
      });
    };

    // add local test-case's
    local.utility2.testCaseAdd(local);
    // init npm test
    local.utility2.testRun(process.exit);
    break;
  }
}((function () {
  /*
    this function inits js-env options
  */
  'use strict';
  var local;
  // init shared js-env
  (function () {
    local = {};
    local._testPrefix = 'jslint-lite';
    local.modeJs = (function () {
      try {
        return module.exports && typeof process.versions.node === 'string' &&
          typeof require('http').createServer === 'function' && 'node';
      } catch (errorCaughtNode) {
        return typeof navigator.userAgent === 'string' &&
          typeof document.querySelector('body') === 'object' && 'browser';
      }
    }());
  }());
  return local;
}())));
