jslint-lite [![NPM](https://img.shields.io/npm/v/jslint-lite.svg?style=flat-square)](https://www.npmjs.org/package/jslint-lite)
========
lightweight nodejs module for testing and covering browser-side code



## demo server
[![heroku.com test server](https://kaizhu256.github.io/node-jslint-lite/build.travis-ci.org/beta/test-report.screenshot.heroku.png)](https://hrku01-jslint-lite-beta.herokuapp.com/?modeTest=1)



## build status [![travis.ci-org build status](https://api.travis-ci.org/kaizhu256/node-jslint-lite.svg)](https://travis-ci.org/kaizhu256/node-jslint-lite)

[![build commit status](https://kaizhu256.github.io/node-jslint-lite/build.travis-ci.org/build.badge.svg)](https://travis-ci.org/kaizhu256/node-jslint-lite)

[![saucelabs.com selenium test status](https://saucelabs.com/browser-matrix/sclb01-jslint-lite.svg)](https://saucelabs.com/u/sclb01-jslint-lite)

 git branch | test server | test report | coverage report | build artifact
:----------:|:-----------:|:-----------:|:---------------:|:--------------:
[master](https://github.com/kaizhu256/node-jslint-lite/tree/master) | [![heroku.com test server](https://kaizhu256.github.io/public/heroku-logo-light-88x31.png)](https://hrku01-jslint-lite-master.herokuapp.com/?modeTest=1) | [![test-report](https://kaizhu256.github.io/node-jslint-lite/build.travis-ci.org/master/test-report.badge.svg)](https://kaizhu256.github.io/node-jslint-lite/build.travis-ci.org/master/test-report.html) | [![istanbul coverage report](https://kaizhu256.github.io/node-jslint-lite/build.travis-ci.org/master/coverage-report.badge.svg)](https://kaizhu256.github.io/node-jslint-lite/build.travis-ci.org/master/coverage-report.html/node-jslint-lite/index.html) | [![build artifacts](https://kaizhu256.github.io/public/glyphicons_free/glyphicons/png/glyphicons_144_folder_open.png)](https://github.com/kaizhu256/node-jslint-lite/tree/gh-pages/build.travis-ci.org/master)
[beta](https://github.com/kaizhu256/node-jslint-lite/tree/beta) | [![heroku.com test server](https://kaizhu256.github.io/public/heroku-logo-light-88x31.png)](https://hrku01-jslint-lite-beta.herokuapp.com/?modeTest=1) | [![test-report](https://kaizhu256.github.io/node-jslint-lite/build.travis-ci.org/beta/test-report.badge.svg)](https://kaizhu256.github.io/node-jslint-lite/build.travis-ci.org/beta/test-report.html) | [![istanbul coverage report](https://kaizhu256.github.io/node-jslint-lite/build.travis-ci.org/beta/coverage-report.badge.svg)](https://kaizhu256.github.io/node-jslint-lite/build.travis-ci.org/beta/coverage-report.html/node-jslint-lite/index.html) | [![build artifacts](https://kaizhu256.github.io/public/glyphicons_free/glyphicons/png/glyphicons_144_folder_open.png)](https://github.com/kaizhu256/node-jslint-lite/tree/gh-pages/build.travis-ci.org/beta)
[alpha](https://github.com/kaizhu256/node-jslint-lite/tree/alpha) | [![heroku.com test server](https://kaizhu256.github.io/public/heroku-logo-light-88x31.png)](https://hrku01-jslint-lite-alpha.herokuapp.com/?modeTest=1) | [![test-report](https://kaizhu256.github.io/node-jslint-lite/build.travis-ci.org/alpha/test-report.badge.svg)](https://kaizhu256.github.io/node-jslint-lite/build.travis-ci.org/alpha/test-report.html) | [![istanbul coverage report](https://kaizhu256.github.io/node-jslint-lite/build.travis-ci.org/alpha/coverage-report.badge.svg)](https://kaizhu256.github.io/node-jslint-lite/build.travis-ci.org/alpha/coverage-report.html/node-jslint-lite/index.html) | [![build artifacts](https://kaizhu256.github.io/public/glyphicons_free/glyphicons/png/glyphicons_144_folder_open.png)](https://github.com/kaizhu256/node-jslint-lite/tree/gh-pages/build.travis-ci.org/alpha)



## installation and quickstart
```
## install jslint-lite
npm install jslint-lite && cd node_modules/jslint-lite
## run browser tests and create test and coverage reports on self
npm test
## jslint foo.js and bar.js
jslint-lite foo.js bar.js
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
```



## description of files
- .build/
  - auto-created directory where test and coverage reports are generated
- .install/
  - auto-created directory where npm postinstall files are generated
- .travis.yml
  - travis-ci config file
  - contains encrypted credentials used by travis-ci
- README.md
  - this readme file
- example.js
  - example nodejs script demonstrating how to use this app
- main.data
  - data file containing embedded resources for this app
- main.js
  - this app's main program / library
- package.json
  - npm config file
- utility2.data
  - data file containing embedded resources for testing this app
- utility2.js
  - nodejs build script
- utility2.sh
  - shell build script used by travis-ci to do the following:
    - run local phantomjs and slimerjs browser tests on local server
    - deploy to heroku after passing local browser tests
    - run saucelabs browser tests on deployed heroku server
    - on version change, publish this app to npm registry after passing saucelabs browser tests
    - upload tests, coverages, screenshots, and other build artifacts to github



## npm dependencies
- headless-browser-lite v2014.x.x (dev-dependency)
- istanbul v0.2.x (dev-dependency)
- jslint-lite v2014.x.x (dev-dependency)



## todo



## changelog
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
