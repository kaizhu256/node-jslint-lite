jslint-lite
===========
lightweight nodejs, jslint module with no external dependencies

[![heroku.com test server](https://kaizhu256.github.io/node-jslint-lite/build.travis-ci.org/beta/test-report.screenshot.heroku.png)](https://hrku01-jslint-lite-beta.herokuapp.com/test/test.html)
<br><br><br><br>



## build status [![travis.ci-org build status](https://api.travis-ci.org/kaizhu256/node-jslint-lite.svg)](https://travis-ci.org/kaizhu256/node-jslint-lite)

[![build commit status](https://kaizhu256.github.io/node-jslint-lite/build.travis-ci.org/build.badge.svg)](https://travis-ci.org/kaizhu256/node-jslint-lite)

[![saucelabs.com selenium test status](https://saucelabs.com/browser-matrix/sclb01-jslint-lite.svg)](https://saucelabs.com/u/sclb01-jslint-lite)

 branch | test server | test report | coverage report | build artifact
:------:|:-----------:|:-----------:|:---------------:|:--------------:
[master](https://github.com/kaizhu256/node-jslint-lite/tree/master) | [![heroku.com test server](https://kaizhu256.github.io/public/heroku-logo-light-88x31.png)](https://hrku01-jslint-lite-master.herokuapp.com/test/test.html) | [![test-report](https://kaizhu256.github.io/node-jslint-lite/build.travis-ci.org/master/test-report.badge.svg)](https://kaizhu256.github.io/node-jslint-lite/build.travis-ci.org/master/test-report.html) | [![istanbul coverage report](https://kaizhu256.github.io/node-jslint-lite/build.travis-ci.org/master/coverage-report.badge.svg)](https://kaizhu256.github.io/node-jslint-lite/build.travis-ci.org/master/coverage-report.html/node-jslint-lite/index.html) | [![build artifacts](https://kaizhu256.github.io/public/glyphicons_free/glyphicons/png/glyphicons_144_folder_open.png)](https://github.com/kaizhu256/node-jslint-lite/tree/gh-pages/build.travis-ci.org/master)
[beta](https://github.com/kaizhu256/node-jslint-lite/tree/beta) | [![heroku.com test server](https://kaizhu256.github.io/public/heroku-logo-light-88x31.png)](https://hrku01-jslint-lite-beta.herokuapp.com/test/test.html) | [![test-report](https://kaizhu256.github.io/node-jslint-lite/build.travis-ci.org/beta/test-report.badge.svg)](https://kaizhu256.github.io/node-jslint-lite/build.travis-ci.org/beta/test-report.html) | [![istanbul coverage report](https://kaizhu256.github.io/node-jslint-lite/build.travis-ci.org/beta/coverage-report.badge.svg)](https://kaizhu256.github.io/node-jslint-lite/build.travis-ci.org/beta/coverage-report.html/node-jslint-lite/index.html) | [![build artifacts](https://kaizhu256.github.io/public/glyphicons_free/glyphicons/png/glyphicons_144_folder_open.png)](https://github.com/kaizhu256/node-jslint-lite/tree/gh-pages/build.travis-ci.org/beta)
[alpha](https://github.com/kaizhu256/node-jslint-lite/tree/alpha) | [![heroku.com test server](https://kaizhu256.github.io/public/heroku-logo-light-88x31.png)](https://hrku01-jslint-lite-alpha.herokuapp.com/test/test.html) | [![test-report](https://kaizhu256.github.io/node-jslint-lite/build.travis-ci.org/alpha/test-report.badge.svg)](https://kaizhu256.github.io/node-jslint-lite/build.travis-ci.org/alpha/test-report.html) | [![istanbul coverage report](https://kaizhu256.github.io/node-jslint-lite/build.travis-ci.org/alpha/coverage-report.badge.svg)](https://kaizhu256.github.io/node-jslint-lite/build.travis-ci.org/alpha/coverage-report.html/node-jslint-lite/index.html) | [![build artifacts](https://kaizhu256.github.io/public/glyphicons_free/glyphicons/png/glyphicons_144_folder_open.png)](https://github.com/kaizhu256/node-jslint-lite/tree/gh-pages/build.travis-ci.org/alpha)



## quickstart
```
## npm install jslint-lite
npm install -g jslint-lite
## jslint foo.js
jslint-lite foo.js
```



## library usage example
```
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
```



## run npm test
```
npm test
```



## description of files
- .travis.yml
  - travis-ci config file
- README.md
  - readme file
- example.js
  - example nodejs script demonstrating how to use this app
- main.data
  - data file containing embedded resources specific to this app
- main.js
  - this app's main program / library
- package.json
  - npm config file
- utility2.data
  - data file containing embedded resources used by travis-ci
- utility2.js
  - nodejs build script used by travis-ci
- utility2.sh
  - shell build script used by travis-ci



## todo
- add browser ui for jslint



## changelog
#### 2014.7.29
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
