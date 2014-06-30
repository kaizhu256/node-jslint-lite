jslint-lite [![travis.ci-org build status](https://api.travis-ci.org/kaizhu256/node-jslint-lite.svg?branch=unstable)](https://travis-ci.org/kaizhu256/node-jslint-lite?branch=unstable)
===========
nodejs jslint module with no external package dependencies

## quickstart
```
npm install -g jslint-lite
jslint-lite foo.js
```

## library usage example
```
/* example.js */
/*jslint indent:2, node: true, stupid: true*/
(function () {
  'use strict';
  var fs, jslint_lite;
  /* require fs */
  fs = require('fs');
  /* require jslint_lite */
  jslint_lite = require('./jslint-lite.js');
  jslint_lite.lint(fs.readFileSync('example.js', 'utf8'), 'example.js');
}());
```

## todo
- add test
- add code coverage

## changelog
#### 2014.6.23
- initial commit
