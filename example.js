/* example.js */
/*jslint
  indent:2,
  node: true,
  stupid: true
*/
(function moduleExampleNodejs() {
  'use strict';
  var fs, jslint_lite;
  // require fs
  fs = require('fs');
  // require jslint_lite
  jslint_lite = require('jslint-lite');
  // read the file example.js,
  // jslint its contents,
  // and print any error message to stderr
  console.error(
    jslint_lite.jslint(
      fs.readFileSync('example.js', 'utf8'),
      'example.js'
    )
  );
}());
