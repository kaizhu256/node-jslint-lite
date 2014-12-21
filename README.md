jslint-lite [![NPM](https://img.shields.io/npm/v/jslint-lite.svg?style=flat-square)](https://www.npmjs.org/package/jslint-lite)
===========
minimal npm installer for jslint and csslint with no external dependencies
![screenshot](https://kaizhu256.github.io/node-jslint-lite/screenshot.png)



## build status [![travis.ci-org build status](https://api.travis-ci.org/kaizhu256/node-jslint-lite.svg)](https://travis-ci.org/kaizhu256/node-jslint-lite)

[![build commit status](https://kaizhu256.github.io/node-jslint-lite/build.badge.svg)](https://travis-ci.org/kaizhu256/node-jslint-lite)

 git branch | test report | coverage report | build artifact
:----------:|:-----------:|:---------------:|:--------------:
[master](https://github.com/kaizhu256/node-jslint-lite/tree/master) | [![test-report](https://kaizhu256.github.io/node-jslint-lite/build.travis-ci.org/master/test-report.badge.svg)](https://kaizhu256.github.io/node-jslint-lite/build.travis-ci.org/master/test-report.html) | [![istanbul coverage report](https://kaizhu256.github.io/node-jslint-lite/build.travis-ci.org/master/coverage-report.badge.svg)](https://kaizhu256.github.io/node-jslint-lite/build.travis-ci.org/master/coverage-report.html/node-jslint-lite/index.html) | [![build artifacts](https://kaizhu256.github.io/node-jslint-lite/glyphicons_144_folder_open.png)](https://github.com/kaizhu256/node-jslint-lite/tree/gh-pages/build.travis-ci.org/master)
[beta](https://github.com/kaizhu256/node-jslint-lite/tree/beta) | [![test-report](https://kaizhu256.github.io/node-jslint-lite/build.travis-ci.org/beta/test-report.badge.svg)](https://kaizhu256.github.io/node-jslint-lite/build.travis-ci.org/beta/test-report.html) | [![istanbul coverage report](https://kaizhu256.github.io/node-jslint-lite/build.travis-ci.org/beta/coverage-report.badge.svg)](https://kaizhu256.github.io/node-jslint-lite/build.travis-ci.org/beta/coverage-report.html/node-jslint-lite/index.html) | [![build artifacts](https://kaizhu256.github.io/node-jslint-lite/glyphicons_144_folder_open.png)](https://github.com/kaizhu256/node-jslint-lite/tree/gh-pages/build.travis-ci.org/beta)
[alpha](https://github.com/kaizhu256/node-jslint-lite/tree/alpha) | [![test-report](https://kaizhu256.github.io/node-jslint-lite/build.travis-ci.org/alpha/test-report.badge.svg)](https://kaizhu256.github.io/node-jslint-lite/build.travis-ci.org/alpha/test-report.html) | [![istanbul coverage report](https://kaizhu256.github.io/node-jslint-lite/build.travis-ci.org/alpha/coverage-report.badge.svg)](https://kaizhu256.github.io/node-jslint-lite/build.travis-ci.org/alpha/coverage-report.html/node-jslint-lite/index.html) | [![build artifacts](https://kaizhu256.github.io/node-jslint-lite/glyphicons_144_folder_open.png)](https://github.com/kaizhu256/node-jslint-lite/tree/gh-pages/build.travis-ci.org/alpha)



## installation and quickstart
```
#  install
npm install jslint-lite
#  test
cd node_modules/jslint-lite && npm install && npm test
#  jslint package.json and index.js
../.bin/jslint-lite package.json index.js
```



## library usage example
```
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
```



## package content
- .gitignore
  - git ignore file
- .travis.yml
  - travis-ci config file
- README.md
  - readme file
- csslint.js
  - external csslint script
  - copied from https://raw.githubusercontent.com/CSSLint/csslint/master/release/csslint.js
- example.js
  - nodejs example usage script
- index.js
  - main nodejs app
- jslint.js
  - external jslint script
  - copied from https://raw.githubusercontent.com/douglascrockford/JSLint/master/jslint.js
- package.json
  - npm config file
- test.js
  - nodejs test script



## todo
- none



## changelog
#### 2014.11.26
- revamp to minimal install and include csslint

#### 2014.7.29
- upgrade to utility2 2014.10.04
- add browser ui for jslint
- add browser tests
- upgrade to utility2 2014.7.29

#### 2014.7.2
- automate npm publish
- migrate from build.js to utility.js

#### 2014.7.1
- merge .git-config and .gitignore into build.data
- add html test report
- generate coverage badge during build
- add test
- add code coverage

#### 2014.6.23
- initial commit
