#!/usr/bin/env node
/*jslint
  bitwise: true, browser: true,
  indent: 2,
  maxerr: 8,
  node: true, nomen: true,
  regexp: true,
  stupid: true,
  todo: true
*/
// declare module vars
var mainApp;



(function submoduleMainNodejs() {
  /*
    this nodejs submodule exports the main api
  */
  'use strict';
  var local = {
    _name: 'main.submoduleMainNodejs',

    _init: function () {
      /*
        this function inits the submodule
      */
      // init the main app
      mainApp = module.exports = require(__dirname + '/utility2.js');
      // init this submodule
      mainApp.initSubmodule(local);
      // run nodejs tests
      if (mainApp.modeNpmTest) {
        setTimeout(mainApp.testRun);
      // init cli
      } else {
        setTimeout(function () {
          local._initCli(process.argv);
        });
      }
    },

    _initCli: function (argv) {
      /*
        this function inits the cli
      */
      if (module === require.main && !mainApp.modeCli) {
        // jslint files in argv
        argv.slice(2).forEach(function (file) {
          if (file[0] !== '-') {
            mainApp.jslintPrint(mainApp.fs.readFileSync(file, 'utf8'), file);
          }
        });
      }
    },

    __initCli_default_test: function (onEventError) {
      /*
        this function tests _initCli's default handling behavior
      */
      var message;
      mainApp.testMock(onEventError, [
        [console, { error: function (_) {
          message += _;
        } }],
        [mainApp, { fs: { readFileSync: function (arg) {
          return arg;
        }, modeCli: null } }],
        [require, { main: module }]
      ], function (onEventError) {
        // test jslint nop handling behavior
        message = '';
        local._initCli(['', '', '--mode-foo']);
        // validate no error occurred
        mainApp.assert(message === '', message);
        // test jslint passed handling behavior
        message = '';
        local._initCli(['', '', 'var aa = 1;']);
        // validate no error occurred
        mainApp.assert(message === '', message);
        // test jslint failed handling behavior
        message = '';
        local._initCli(['', '', 'syntax error']);
        // validate error occurred
        mainApp.assert(message, message);
        onEventError();
      });
    }

  };
  local._init();
}());



(function submoduleMainBrowser() {
  /*
    this browser submodule exports the main api
  */
  'use strict';
  var local = {
    _name: 'main.submoduleMainBrowser',

    _init: function () {
      /*
        this function inits the submodule
      */
      if (mainApp.modeNodejs) {
        return;
      }
      // init this submodule
      mainApp.initSubmodule(local);
      // run browser tests
      if (mainApp.modeTest) {
        window.addEventListener('load', mainApp.testRun);
      }
    },

    ngApp_main_controller_MainController: ['$scope', function ($scope) {
      /*
        this function inits the main angularjs controller
      */
      // export $scope to local object for testing
      local._$scope = $scope;
      mainApp.setDefault($scope, {
        // init jslintLiteScriptModel
        jslintLiteScriptModel: '/*jslint devel: true*/\nconsole.log("hello");',
        jslintLiteScriptJslint: function () {
          /*
            this function jslint's the script in the main textarea
          */
          $scope.jslintLiteErrorModel = mainApp.jslint(
            $scope.jslintLiteScriptModel,
            'input script'
          ).trim() || 'input script ok';
        }
      });
      // jslint current example script
      $scope.jslintLiteScriptJslint();
    }],

    _ngApp_main_controller_MainController_default_test: function (onEventError) {
      /*
        this function tests ngApp_main_controller_MainController's default handling behavior
      */
      var $scope;
      $scope = local._$scope;
      $scope.jslintLiteScriptModel = '/*jslint devel: true*/\nconsole.log("hello");';
      $scope.jslintLiteScriptJslint();
      onEventError();
    }

  };
  local._init();
}());



(function submoduleMainShared() {
  /*
    this shared submodule exports the main api
  */
  'use strict';
  var local = {
    _name: 'main.submoduleMainShared',

    _init: function () {
      /*
        this function inits the submodule
      */
      // init this submodule
      mainApp.initSubmodule(local);
    },

    echo: function (arg) {
      /*
        this function returns the arg
      */
      return arg;
    },

    jslint: function (script, file) {
      /*
        this function jslint's the script and prints any errors to stderr
      */
      var tmp;
      // if mainApp.JSLINT does not exist, then return empty error message
      if (!mainApp.JSLINT) {
        return '';
      }
      // jslint script
      tmp = mainApp.JSLINT(script
        // comment out shebang
        .replace(/(^#!)/, '//$1'));
      // if no error occurred, then return empty error message
      if (tmp) {
        return '';
      }
      // create error message
      tmp = '\n\u001b[1m' + file + '\n\u001b[22m' +
        mainApp.JSLINT.errors.filter(mainApp.echo).map(function (error, ii) {
          return (' #' + String(ii + 1) + ' ').slice(-4) +
            '\u001b[33m' + error.reason + '\u001b[39m\n    ' +
            (error.evidence || '').trim() +
            '\u001b[90m \/\/ Line ' + error.line + ', Pos ' + error.character + '\u001b[39m';
        }).join('\n');
      // if in nodejs, then return colorized text
      return mainApp.modeNodejs ? tmp
        // else if in browser, then return plaintext
        : tmp.replace((/\u001b\[\d+m/g), '');
    },

    jslintPrint: function (script, file) {
      /*
        this function jslint's the script and prints any errors to stderr
      */
      var errorMessage;
      errorMessage = mainApp.jslint(script, file);
      if (errorMessage) {
        console.error(errorMessage);
      }
    },

    _lintPrint_default_test: function (onEventError) {
      /*
        this function tests jslintPrint's default handling behavior
      */
      var errorMessage;
      mainApp.testMock(onEventError, [
        [console, { error: function (_) {
          errorMessage = _;
        } }],
        [mainApp, { JSLINT: mainApp.JSLINT }]
      ], function (onEventError) {
        // test passing jslint handling behavior
        errorMessage = null;
        mainApp.jslintPrint(mainApp.fileDict['example.js'].data, 'example.js');
        // validate no error message was printed
        mainApp.assert(errorMessage === null, errorMessage);
        // test failing jslint handling behavior
        errorMessage = null;
        mainApp.jslintPrint('/*jslint maxerr:1*/\n1;2;\n', 'error.js');
        // remove color metadata from error message
        errorMessage = errorMessage.replace((/\u001b\[\d+m/g), '');
        // validate error message
        mainApp.assert(errorMessage === '\nerror.js' +
          '\n #1 Expected an assignment or function call and instead saw an expression.' +
          '\n    1;2; // Line 2, Pos 1' +
          '\n #2 Too many errors. (66% scanned).' +
          '\n     // Line 2, Pos 1', errorMessage);
        // test missing mainApp.JSLINT handling behavior
        errorMessage = null;
        mainApp.JSLINT = null;
        mainApp.jslintPrint('/*jslint maxerr:1*/\n1;2;\n', 'error.js');
        // validate no error message was printed
        mainApp.assert(errorMessage === null, errorMessage);
        onEventError();
      });
    }

  };
  local._init();
}());
