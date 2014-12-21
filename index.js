#!/usr/bin/env node
/*jslint
  indent: 2,
  maxerr: 8,
  node: true, nomen: true,
  stupid: true,
*/
(function () {
  'use strict';
  var local;
  local = {
    _name: 'jslint-lite',

    _init: function () {
      /*
        this function inits this module
      */
      // require modules
      local.fs = require('fs');
      local.path = require('path');
      local.vm = require('vm');
      // init exports
      exports.errors = 0;
      exports.jslintPrint = local.jslintPrint;
      if (module === require.main) {
        process.argv.slice(2).forEach(function (arg) {
          if (arg[0] !== '-') {
            local.jslintPrint(local.fs.readFileSync(local.path.resolve(arg), 'utf8'), arg);
          }
        });
        // if error occurred, then exit with non-zero code
        process.exit(exports.errors);
      }
    },

    csslint: {},

    jslint: {},

    jslintPrint: function (script, file) {
      /*
        this function jslint's / csslint's the script and prints any errors to stderr
      */
      var errorList, ii;
      ii = 0;
      switch (local.path.extname(file)) {
      case '.css':
        // init csslint.CSSLint
        if (!local.csslint.CSSLint) {
          local.vm.runInNewContext(
            local.fs.readFileSync(__dirname + '/csslint.js'),
            local.csslint
          );
        }
        // csslint script
        errorList = local.csslint.CSSLint.verify(script).messages;
          // if error occurred, then print colorized error messages
        if (errorList.length) {
          console.error('\n\u001b[1m' + file + '\u001b[22m');
          errorList.forEach(function (error) {
            exports.errors += 1;
            ii += 1;
            console.error((' #' + String(ii) + ' ').slice(-4) +
              '\u001b[33m' + error.type + ' - ' + error.message  + '\u001b[39m\n    ' +
              String(error.evidence).trim());
          });
        }
        break;
      default:
        // init jslint.JSLINT
        if (!local.jslint.JSLINT) {
          local.vm.runInNewContext(
            local.fs.readFileSync(__dirname + '/jslint.js'),
            local.jslint
          );
        }
        // jslint script
        if (!local.jslint.JSLINT(script
            // comment out shebang
            .replace(/(^#!)/, '//$1'))) {
          // if error occurred, then print colorized error messages
          console.error('\n\u001b[1m' + file + '\u001b[22m');
          local.jslint.JSLINT.errors.forEach(function (error) {
            if (error) {
              exports.errors += 1;
              ii += 1;
              console.error((' #' + String(ii) + ' ').slice(-4) +
                '\u001b[33m' + error.reason + '\u001b[39m\n    ' +
                String(error.evidence).trim() + '\u001b[90m \/\/ Line ' + error.line +
                ', Pos ' + error.character + '\u001b[39m');
            }
          });
        }
      }
    }
  };
  local._init();
}());
