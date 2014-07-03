#!/usr/bin/env node
/*jslint bitwise: true, browser: true, indent:2, node: true, nomen: true, regexp: true, stupid: true*/
/*global required, state*/
/* declare module vars */
var exports;



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
      /* init utility.js */
      exports = module.exports = require(__dirname + '/utility.js');
      /* init local object */
      exports.initLocal(local);
    },

    _initOnce: function () {
      /*
        this function inits the sub-module once
      */
      /* init jslint */
      required.vm.runInNewContext(
        required.fs.readFileSync(__dirname + '/external-jslint.js', 'utf8'),
        local,
        'external-jslint.js'
      );
      /* init cli */
      local._initOnceCli(process.argv);
    },

    _initOnceCli: function (argv) {
      /*
        this function inits the cli
      */
      if (module !== require.main || state.modeCli) {
        return;
      }
      /* lint files */
      argv.slice(2).forEach(function (file) {
        if (file[0] !== '-') {
          exports.jslint(required.fs.readFileSync(file, 'utf8'), file);
        }
      });
    },

    __initOnceCli_default_test: function (onEventError) {
      /*
        this function tests _initOnceCli's default handling behavior
      */
      var message;
      exports.testMock(onEventError, [
        [console, { error: function (_) {
          message += _;
        } }],
        [global, { state: { modeCliDict: null } }],
        [require, { main: module }],
        [required, { fs: { readFileSync: exports.echo } }]
      ], function (onEventError) {
        /* test jslint passed handling behavior */
        message = '';
        local._initOnceCli(['', '', 'var aa = 1;']);
        /* assert no error occurred */
        exports.assert(message === '', message);
        /* test jslint failed handling behavior */
        message = '';
        local._initOnceCli(['', '', 'syntax error']);
        /* assert error occurred */
        exports.assert(message, message);
        onEventError();
      });
    },

    jslint: function (script, file) {
      /*
        this function jslint's the script and prints any errors to stderr
      */
      var tmp, passed;
      passed = local.JSLINT(script
        /* comment out hashbang */
        .replace(/(^#!)/, '//$1'));
      if (passed) {
        return passed;
      }
      console.error('\n_scriptLintJs\n\u001b[1m' + file + '\u001b[22m');
      local.JSLINT.errors.forEach(function (error, ii) {
        tmp = '#' + String(ii + 1) + ' ';
        while (tmp.length < 4) {
          tmp = ' ' + tmp;
        }
        console.error(tmp + '\u001b[33m' + error.reason + '\u001b[39m\n    ' +
          (error.evidence).trim() + '\u001b[90m \/\/ Line ' +
            error.line + ', Pos ' + error.character + '\u001b[39m');
      });
      console.error();
      return passed;
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
