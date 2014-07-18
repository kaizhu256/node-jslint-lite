#!/usr/bin/env node
/*jslint bitwise: true, browser: true, indent:2, node: true, nomen: true, regexp: true, stupid: true*/
// declare module vars
var exports, required, state;



(function submoduleJslintLiteNodejs() {
  /*
    this nodejs submodule exports the jslint-lite api
  */
  'use strict';
  var local = {
    _name: 'jslint-lite.submoduleJslintLiteNodejs',

    _init: function () {
      /*
        this function inits the submodule
      */
      // init export object
      exports = module.exports = require(__dirname + '/utility2.js');
      // export __dirname
      exports.__dirname = __dirname;
      // export __filename
      exports.__filename = __filename;
      // init this submodule
      exports.initSubmodule(local);
      // init required object
      required = exports.required;
      // init state object
      state = exports.state;
      // init jslint
      required.vm.runInNewContext(
        state.fileDict['/public/jslint.js'].content,
        exports,
        'jslint.js'
      );
      // init required.jslint_lite
      required.jslint_lite = exports;
      // init cli
      setTimeout(function () {
        local._initCli(process.argv);
      });
    },

    _initCli: function (argv) {
      /*
        this function inits the cli
      */
      if (module === require.main && !state.modeCli) {
        // lint files in argv
        argv.slice(2).forEach(function (file) {
          if (file[0] !== '-') {
            exports.jslintPrint(required.fs.readFileSync(file, 'utf8'), file);
          }
        });
      }
    },

    __initCli_default_test: function (onEventError) {
      /*
        this function tests _initCli's default handling behavior
      */
      var message;
      exports.testMock(onEventError, [
        [console, { error: function (_) {
          message += _;
        } }],
        [require, { main: module }],
        [required, { fs: { readFileSync: exports.echo } }]
      ], function (onEventError) {
        state = {};
        // test jslint passed handling behavior
        message = '';
        local._initCli(['', '', 'var aa = 1;']);
        // assert no error occurred
        exports.assert(message === '', message);
        // test jslint failed handling behavior
        message = '';
        local._initCli(['', '', 'syntax error']);
        // assert error occurred
        exports.assert(message, message);
        onEventError();
      });
    },

    _jslint_default_test: function (onEventError) {
      /*
        this function tests jslint's default handling behavior
      */
      var errorMessage;
      exports.testMock(onEventError, [
        [console, { error: exports.nop }]
      ], function (onEventError) {
        // test jslint passed handling behavior
        errorMessage =
          exports.jslint(required.fs.readFileSync('example.js', 'utf8'), 'example.js');
        // assert no error occurred
        exports.assert(!errorMessage, errorMessage);
        // test jslint failed handling behavior
        errorMessage = exports.jslint('aa=1', 'error.js');
        // assert error occurred
        exports.assert(errorMessage, errorMessage);
        onEventError();
      });
    }

  };
  local._init();
}());



(function submoduleJslintLiteBrowser() {
  /*
    this browser submodule exports the jslint-lite api
  */
  'use strict';
  var local = {
    _name: 'utility2.submoduleJslintLiteBrowser',

    _init: function () {
      /*
        this function inits the submodule
      */
      if (state.modeNodejs) {
        return;
      }
      // init this submodule
      exports.initSubmodule(local);
      // init JSLINT
      exports.JSLINT = global.JSLINT;
    },

    myApp_ngApp_controller_MyController: ['$scope', function ($scope) {
      $scope.contacts = ["hi@email.com", "hello@email.com"];
      $scope.add = function () {
        console.log('foo');
        $scope.contacts.push($scope.jslintInput);
        $scope.jslintInput = "";
      };
    }]

  };
  local._init();
}());



(function submoduleJslintLiteShared() {
  /*
    this nodejs submodule exports the jslint-lite api
  */
  'use strict';
  var local = {
    _name: 'jslint-lite.submoduleJslintLiteShared',

    _init: function () {
      /*
        this function inits the submodule
      */
      // init this submodule
      exports.initSubmodule(local);
    },

    jslint: function (script, file) {
      /*
        this function jslint's the script and prints any errors to stderr
      */
      var passed;
      passed = exports.JSLINT(script
        // comment out hashbang
        .replace(/(^#!)/, '//$1'));
      if (passed) {
        return '';
      }
      return '\n\u001b[1m' + file + '\n\u001b[22m' +
        exports.JSLINT.errors.filter(exports.echo).map(function (error, ii) {
          return (' #' + String(ii + 1) + ' ').slice(-4) +
            '\u001b[33m' + error.reason + '\u001b[39m\n    ' +
            (error.evidence || '').trim() +
            '\u001b[90m \/\/ Line ' + error.line + ', Pos ' + error.character + '\u001b[39m';
        }).join('\n') + '\n';
    },

    jslintPrint: function (script, file) {
      /*
        this function jslint's the script and prints any errors to stderr
      */
      var errorMessage;
      errorMessage = exports.jslint(script, file);
      if (errorMessage) {
        console.error(errorMessage);
      }
    }

  };
  local._init();
}());
