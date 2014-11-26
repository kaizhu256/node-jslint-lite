/* example.js */
/*jslint
  indent:2,
  node: true,
  stupid: true
*/
(function () {
  'use strict';
  var fs, jslint_lite;
  // require fs
  fs = require('fs');
  // require jslint_lite
  jslint_lite = require('jslint-lite');
  // jslint example.js and print any errors to stderr
  jslint_lite.jslintPrint(fs.readFileSync('example.js', 'utf8'), 'example.js');
}());
