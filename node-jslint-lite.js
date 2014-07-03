#!/usr/bin/env node
/*jslint bitwise: true, browser: true, indent:2, node: true, nomen: true, regexp: true, stupid: true*/
/* declare module vars */
var exports, required, state;



(function subModuleJslintLiteNodejs() {
  /*
    this nodejs sub-module exports the jslint-lite api
  */
  'use strict';
  var local = {
    _name: 'jslint-lite.subModuleJslintLiteNodejs',

    _init: function () {
      /*
        this function inits the sub-module
      */
      /* init export object */
      exports = module.exports = require(__dirname + '/utility.js');
      /* export __dirname */
      exports.__dirname = __dirname;
      /* export __filename */
      exports.__filename = __filename;
      /* init local object */
      exports.initLocal(local);
      /* init required object */
      required = exports.required;
      /* init state object */
      state = exports.state;
      /* init jslint */
      required.vm.runInNewContext(
        required.fs.readFileSync(__dirname + '/external-jslint.js'),
        local,
        'external-jslint.js'
      );
      /* init required.jslint_lite */
      required.jslint_lite = exports;
      /* init cli */
      local._initCli(process.argv);
    },

    _initCli: function (argv) {
      /*
        this function inits the cli
      */
      if (module === require.main && !state.modeCli) {
        /* lint files in argv */
        argv.slice(2).forEach(function (file) {
          if (file[0] !== '-') {
            exports.jslint(required.fs.readFileSync(file, 'utf8'), file);
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
        /* test jslint passed handling behavior */
        message = '';
        local._initCli(['', '', 'var aa = 1;']);
        /* assert no error occurred */
        exports.assert(message === '', message);
        /* test jslint failed handling behavior */
        message = '';
        local._initCli(['', '', 'syntax error']);
        /* assert error occurred */
        exports.assert(message, message);
        onEventError();
      });
    },

    jslint: function (script, file) {
      /*
        this function jslint's the script and prints any errors to stderr
      */
      var passed;
      passed = local.JSLINT(script
        /* comment out hashbang */
        .replace(/(^#!)/, '//$1'));
      if (passed) {
        return passed;
      }
      console.error('\n\u001b[1m' + file + '\n\u001b[22m' +
        local.JSLINT.errors.filter(exports.echo).map(function (error, ii) {
          return (' #' + String(ii + 1) + ' ').slice(-4) +
            '\u001b[33m' + error.reason + '\u001b[39m\n    ' +
            (error.evidence || '').trim() +
            '\u001b[90m \/\/ Line ' + error.line + ', Pos ' + error.character + '\u001b[39m';
        }).join('\n') + '\n');
    },

    _jslint_default_test: function (onEventError) {
      /*
        this function tests jslint's default handling behavior
      */
      var data;
      exports.testMock(onEventError, [
        [console, { error: exports.nop }]
      ], function (onEventError) {
        /* test jslint passed handling behavior */
        data = exports.jslint(required.fs.readFileSync('example.js', 'utf8'), 'example.js');
        /* assert no error occurred */
        exports.assert(data, data);
        /* test jslint failed handling behavior */
        data = exports.jslint('aa=1', 'error.js');
        /* assert error occurred */
        exports.assert(!data, data);
        onEventError();
      });
    }

  };
  local._init();
}());
