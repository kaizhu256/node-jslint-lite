jslint-lite [![NPM](https://img.shields.io/npm/v/jslint-lite.svg?style=flat-square)](https://www.npmjs.org/package/jslint-lite)
===========
lightweight nodejs module for jslint and csslint with zero dependencies



## build status [![travis-ci.org build status](https://api.travis-ci.org/kaizhu256/node-jslint-lite.svg)](https://travis-ci.org/kaizhu256/node-jslint-lite)

[![build commit status](https://kaizhu256.github.io/node-jslint-lite/build.badge.svg)](https://travis-ci.org/kaizhu256/node-jslint-lite)

 git branch | test-report | coverage-report | build artifact
:----------:|:-----------:|:---------------:|:--------------:
[master](https://github.com/kaizhu256/node-jslint-lite/tree/master) | [![test-report](https://kaizhu256.github.io/node-jslint-lite/build.travis-ci.org/master/test-report.badge.svg)](https://kaizhu256.github.io/node-jslint-lite/build.travis-ci.org/master/test-report.html) | [![istanbul-lite coverage-report](https://kaizhu256.github.io/node-jslint-lite/build.travis-ci.org/master/coverage-report.badge.svg)](https://kaizhu256.github.io/node-jslint-lite/build.travis-ci.org/master/coverage-report.html/node-jslint-lite/index.html) | [![build artifacts](https://kaizhu256.github.io/node-jslint-lite/glyphicons_144_folder_open.png)](https://github.com/kaizhu256/node-jslint-lite/tree/gh-pages/build.travis-ci.org/master)
[beta](https://github.com/kaizhu256/node-jslint-lite/tree/beta) | [![test-report](https://kaizhu256.github.io/node-jslint-lite/build.travis-ci.org/beta/test-report.badge.svg)](https://kaizhu256.github.io/node-jslint-lite/build.travis-ci.org/beta/test-report.html) | [![istanbul-lite coverage-report](https://kaizhu256.github.io/node-jslint-lite/build.travis-ci.org/beta/coverage-report.badge.svg)](https://kaizhu256.github.io/node-jslint-lite/build.travis-ci.org/beta/coverage-report.html/node-jslint-lite/index.html) | [![build artifacts](https://kaizhu256.github.io/node-jslint-lite/glyphicons_144_folder_open.png)](https://github.com/kaizhu256/node-jslint-lite/tree/gh-pages/build.travis-ci.org/beta)
|[alpha](https://github.com/kaizhu256/node-jslint-lite/tree/alpha) | [![test-report](https://kaizhu256.github.io/node-jslint-lite/build.travis-ci.org/alpha/test-report.badge.svg)](https://kaizhu256.github.io/node-jslint-lite/build.travis-ci.org/alpha/test-report.html) | [![istanbul-lite coverage-report](https://kaizhu256.github.io/node-jslint-lite/build.travis-ci.org/alpha/coverage-report.badge.svg)](https://kaizhu256.github.io/node-jslint-lite/build.travis-ci.org/alpha/coverage-report.html/node-jslint-lite/index.html) | [![build artifacts](https://kaizhu256.github.io/node-jslint-lite/glyphicons_144_folder_open.png)](https://github.com/kaizhu256/node-jslint-lite/tree/gh-pages/build.travis-ci.org/alpha)|



## quickstart
```
# quickstart.sh
shQuickstartSh() {
  # npm install jslint-lite
  npm install jslint-lite || return $?
  # create foo.js
  printf "console.log('hello');" > foo.js || return $?
  # create bar.css
  printf "body { margin: 0px; }" > bar.css || return $?
  # jslint foo.js and bar.css
  node_modules/.bin/jslint-lite foo.js bar.css || :
}
shQuickstartSh
```
#### output
![screen-capture](https://kaizhu256.github.io/node-jslint-lite/screen-capture.testQuickstartSh.png)



## quickstart nodejs code
```
// example.js
// this example nodejs code runs jslint on itself
// 1. create a clean app directory (e.g /tmp/app)
// 2. inside app directory, save this nodejs code as example.js
// 3. inside app directory, run the following shell command:
//    $ npm install jslint-lite && node example.js
/*jslint
  indent:2,
  node: true
*/
(function () {
  'use strict';
  var fs, jslint_lite;
  // require modules
  fs = require('fs');
  jslint_lite = require('jslint-lite');
  // jslint this file and print any errors to stderr
  console.log('jslint ' + __filename);
  jslint_lite.jslintAndPrint(fs.readFileSync(__filename, 'utf8'), __filename);
}());
```
#### output
![screen-capture](https://kaizhu256.github.io/node-jslint-lite/screen-capture.testExampleJs.png)



## npm dependencies
- none



## package content
[![screen-capture](https://kaizhu256.github.io/node-jslint-lite/screen-capture.gitLsTree.png)](https://github.com/kaizhu256/node-jslint-lite)



## build script
```
# build-ci.sh
# this shell code runs the ci-build process for this package
shBuildCi() {
  # init env
  . node_modules/.bin/utility2 && shInit && mkdir -p .tmp/build/coverage-report.html || return $?
  # create package content listing
  MODE_CI_BUILD=gitLsTree shRunScreenCapture git ls-tree --abbrev=8 --full-name -l -r HEAD || return $?
  # run npm test on published package
  shNpmTestPublished
  # test quickstart
  MODE_CI_BUILD=testQuickstartSh shRunScreenCapture shTestScriptSh quickstart.sh || return $?
  # test example code
  MODE_CI_BUILD=testExampleJs npm_config_mode_no_jslint=1\
    shRunScreenCapture shTestScriptJs example.js || return $?
  # run npm test
  MODE_CI_BUILD=npmTest shRunScreenCapture npm test || return $?
}
# run ci-build
shBuildCi
# save exit-code
EXIT_CODE=$?
# upload build artifacts to github
if [ "$TRAVIS" ]
then
  shRun shBuildGithubUpload || exit $?
fi
# exit with $EXIT_CODE
exit $EXIT_CODE
```



## recent changelog
#### todo
- add link to jslint documentation
- add code-coverage for shell command
- add web demo page

#### 2015.2.x
- disable implicit jslint of example code
- add shell quickstart
- add /* jslint-ignore-begin */ ... /* jslint-ignore-end */ macro
- rename jslintPrint to jslintAndPrint

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
- add html test-report
- generate coverage badge during build
- add test
- add code coverage

#### 2014.6.23
- initial commit
