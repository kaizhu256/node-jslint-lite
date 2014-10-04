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
var exports, required, state, stateRestore;
stateRestore = function (state2) {
  /*
    this function is used by testMock to restore the local state var
  */
  'use strict';
  state = state2;
};



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
        // jslint files in argv
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
      exports.testMock(onEventError, stateRestore, [
        [console, { error: function (_) {
          message += _;
        } }],
        [require, { main: module }],
        [required, { fs: { readFileSync: exports.echo } }]
      ], function (onEventError) {
        state = {};
        // test jslint nop handling behavior
        message = '';
        local._initCli(['', '', '--mode-foo']);
        // validate no error occurred
        exports.assert(message === '', message);
        // test jslint passed handling behavior
        message = '';
        local._initCli(['', '', 'var aa = 1;']);
        // validate no error occurred
        exports.assert(message === '', message);
        // test jslint failed handling behavior
        message = '';
        local._initCli(['', '', 'syntax error']);
        // validate error occurred
        exports.assert(message, message);
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
      if (state.modeNodejs) {
        return;
      }
      // init this submodule
      exports.initSubmodule(local);
    },

    ngApp_main_controller_MainController: ['$scope', function ($scope) {
      /*
        this function inits the main angularjs controller
      */
      // export $scope to local object for testing
      local._$scope = $scope;
      exports.setDefault($scope, {
        // init jslintLiteScriptModel
        jslintLiteScriptModel: '/*jslint devel: true*/\nconsole.log("hello");',
        jslintLiteScriptJslint: function () {
          /*
            this function jslint's the script in the main textarea
          */
          $scope.jslintLiteErrorModel = exports.jslint(
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
      $scope = state.scope = local._$scope;
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
      exports.initSubmodule(local);
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
      // if exports.JSLINT does not exist, then return empty error message
      if (!exports.JSLINT) {
        return '';
      }
      // jslint script
      tmp = exports.JSLINT(script
        // comment out shebang
        .replace(/(^#!)/, '//$1'));
      // if no error occurred, then return empty error message
      if (tmp) {
        return '';
      }
      // create error message
      tmp = '\n\u001b[1m' + file + '\n\u001b[22m' +
        exports.JSLINT.errors.filter(exports.echo).map(function (error, ii) {
          return (' #' + String(ii + 1) + ' ').slice(-4) +
            '\u001b[33m' + error.reason + '\u001b[39m\n    ' +
            (error.evidence || '').trim() +
            '\u001b[90m \/\/ Line ' + error.line + ', Pos ' + error.character + '\u001b[39m';
        }).join('\n');
      // if in nodejs, then return colorized text
      return state.modeNodejs ? tmp
        // else if in browser, then return plaintext
        : tmp.replace((/\u001b\[\d+m/g), '');
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
    },

    _lintPrint_default_test: function (onEventError) {
      /*
        this function tests jslintPrint's default handling behavior
      */
      var errorMessage;
      exports.testMock(onEventError, stateRestore, [
        [console, { error: function (_) {
          errorMessage = _;
        } }],
        [exports, { JSLINT: exports.JSLINT }]
      ], function (onEventError) {
        // test passing jslint handling behavior
        errorMessage = null;
        exports.jslintPrint(state.fileDict['example.js'].data, 'example.js');
        // validate no error message was printed
        exports.assert(errorMessage === null, errorMessage);
        // test failing jslint handling behavior
        errorMessage = null;
        exports.jslintPrint('/*jslint maxerr:1*/\n1;2;\n', 'error.js');
        // remove color metadata from error message
        errorMessage = errorMessage.replace((/\u001b\[\d+m/g), '');
        // validate error message
        exports.assert(errorMessage === '\nerror.js' +
          '\n #1 Expected an assignment or function call and instead saw an expression.' +
          '\n    1;2; // Line 2, Pos 1' +
          '\n #2 Too many errors. (66% scanned).' +
          '\n     // Line 2, Pos 1', errorMessage);
        // test missing exports.JSLINT handling behavior
        errorMessage = null;
        exports.JSLINT = null;
        exports.jslintPrint('/*jslint maxerr:1*/\n1;2;\n', 'error.js');
        // validate no error message was printed
        exports.assert(errorMessage === null, errorMessage);
        onEventError();
      });
    }

  };
  local._init();
}());
