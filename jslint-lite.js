#!/usr/bin/env node
/*jslint indent:2, node: true, nomen: true, stupid: true*/
/* declare global vars */
var exports, required, state;



(function moduleInitNodejs() {
  /*
    this nodejs module inits the package
  */
  'use strict';
  var local = {
    _name: 'jslint-lite.moduleInitNodejs',

    _init: function () {
      /*
        this function inits the module
      */
      /* init exports object */
      exports = module.exports = {};
      /* init required object */
      required = {
        fs: require('fs'),
        vm: require('vm')
      };
      /* init state object */
      state = {
        testReport: {
          /* list of tests to run */
          testCaseList: [],
          testsFailed: 0,
          testsPassed: 0,
          totalTime: 0
        }
      };
      /* init debug print */
      global[['debug', 'Print'].join('')] = function (arg) {
        /*
          this internal function is used for tmp debugging,
          and jslint will nag you to remove it if used
        */
        console.error('\n\n\ndebug' + 'Print');
        console.error.apply(console, arguments);
        console.error();
        /* return arg for inspection */
        return arg;
      };
      /* init debug onEventError */
      global.onEventError = local.onEventErrorDefault;
      /* init local object */
      local.initLocal(local);
      /* init async tests after this module has been loaded */
      setTimeout(local._initTest);
    },

    initLocal: function (local) {
      /*
        this function inits a module's local object
      */
      Object.keys(local).forEach(function (key) {
        /* add test case */
        if (key.slice(-5) === '_test') {
          state.testReport.testCaseList.push({
            callback: local[key],
            name: local._module + '.' + key
          });
        /* export items that don't start with an underscore _ */
        } else if (key[0] !== '_') {
          exports[key] = local[key];
        }
      });
    },

    _initTest: function () {
      /*
        this function inits npm test
      */
      var remaining, testReport;
      if (process.argv.indexOf('--mode-test') < 0) {
        return;
      }
      testReport = state.testReport;
      remaining = testReport.testCaseList.length;
      /* start global test timer */
      testReport.totalTime = Date.now();
      testReport.testCaseList.forEach(function (testCase) {
        var errorFinished, finished, onEventError;
        errorFinished = new Error('testCase ' + testCase.name + ' called multiple times');
        onEventError = function (error) {
          exports.onEventErrorDefault(error);
          /* save test error */
          testCase.error = testCase.error || error;
          /* error - multiple callbacks in test case */
          if (finished) {
            exports.onEventErrorDefault(errorFinished);
            /* save test error */
            testCase.error = testCase.error || errorFinished;
            return;
          }
          finished = true;
          /* save test time */
          testCase.time = Date.now() - testCase.time;
          /* decrement test counter */
          remaining -= 1;
          /* generate test report when all tests have finished */
          if (remaining === 0) {
            /* stop global test timer */
            testReport.totalTime = Date.now() - testReport.totalTime;
            local._testReportGenerate(testReport);
          }
        };
        testCase.time = Date.now();
        /* run test case in try-catch block */
        try {
          testCase.callback(onEventError);
        } catch (error) {
          onEventError(error);
        }
      });
    },

    callArg0: function (callback) {
      /*
        this function calls the callback in arg position 0
      */
      callback();
    },

    callArg1: function (_, callback) {
      /*
        this function calls the callback in arg position 1
      */
      exports.nop(_);
      callback();
    },

    callArg2: function (_, __, callback) {
      /*
        this function calls the callback in arg position 2
      */
      exports.nop(_, __);
      callback();
    },

    _callArgX_default_test: function (onEventError) {
      /*
        this function tests callArgX's default handling behavior
      */
      var onEventReady;
      onEventReady = exports.untilReady(onEventError);
      onEventReady.remaining += 3;
      exports.callArg0(onEventReady);
      exports.callArg1(null, onEventReady);
      exports.callArg2(null, null, onEventReady);
    },

    setOverride: function (state, override, backup, depth) {
      /*
        this function recursively overrides the state object with the override object,
        and optionally saves the original state object to the backup object,
        and optionally accepts the depth recursion limit
      */
      local._setOverrideRecurse(state, override, backup || {}, depth || Infinity);
      return state;
    },

    _setOverrideRecurse: function (state, override, backup, depth) {
      /*
        this function
        1. save the state item to the backup object
        2. set the override item to the state object
        3. recurse the override object
      */
      var state2, override2;
      Object.keys(override).forEach(function (key) {
        state2 = state[key];
        override2 = backup[key] = override[key];
        if (depth <= 1
            /* override2 is not a plain object */
            || !(override2 && typeof override2 === 'object' && !Array.isArray(override2))
            /* state2 is not a plain object */
            || !(state2 && typeof state2 === 'object' && !Array.isArray(state2))) {
          /* 1. save the state item to the backup object */
          backup[key] = state2;
          /* 2. set the override item to the state object */
          state[key] = override2;
          return;
        }
        /* 3. recurse the override object */
        local._setOverrideRecurse(state2, override2, override2, depth - 1);
      });
    },

    testMock: function (onEventError, mockList, test) {
      /*
        this function mocks the state given in the mockList while running the test callback
      */
      var onEventError2;
      /* prepend mandatory mocks for async / unsafe functions */
      mockList = [
        /* suppress console.log */
        [console, { log: exports.nop }],
        /* enforce synchonicity by mocking timers as exports.callArg0 */
        [global, { setInterval: exports.callArg0, setTimeout: exports.callArg0 }]
      ].concat(mockList);
      onEventError2 = function (error) {
        /* restore state */
        mockList.reverse().forEach(function (mock) {
          exports.setOverride(mock[0], mock[2], null, 1);
        });
        if (error) {
          onEventError(error);
        }
      };
      /* run onEventError callback in mocked state in a try catch block */
      try {
        /* mock state */
        mockList.forEach(function (mock) {
          mock[2] = {};
          exports.setOverride(mock[0], mock[1], mock[2], 1);
        });
        /* run test */
        test(onEventError);
        onEventError2();
      } catch (error) {
        onEventError2(error);
      }
    },

    _testReportGenerate: function (testReport) {
      /*
        this function generates a test report after all tests have finished
      */
      var result;
      testReport.testCaseList.forEach(function (testCase) {
        if (testCase.error) {
          testReport.testsFailed += 1;
        } else {
          testReport.testsPassed += 1;
        }
        console.log();
      });
      result = '\n\n\ntest report\n';
      result += ('        ' + testReport.totalTime).slice(-8) + ' ms | ' +
          (' ' + testReport.testsFailed).slice(-2) + ' failed | ' +
          ('  ' + testReport.testsPassed).slice(-3) + ' passed';
      console.log(result);
      /* non-zero exit if tests failed */
      if (testReport.testsFailed > 0) {
        process.exit(1);
      }
    },

    untilReady: function (onEventError) {
      /*
        this function defers the onEventError callback until the remaining counter goes to zero
      */
      var self;
      self = function (error) {
        /* save any errors encountered */
        self.error = self.error || error;
        self.remaining -= 1;
        if (self.remaining === 0) {
          onEventError(self.error);
        }
        /* assert remaining >= 0 */
        console.assert(self.remaining >= 0, 'invalid self.remaining ' + self.remaining);
      };
      self.remaining = 0;
      return self;
    },

    onEventErrorDefault: function (error, data) {
      /*
        this function provides a default, error / data handling callback.
        if an error is given, it will print the error's message and stack,
        else it will print the data
      */
      if (error) {
        if (typeof error === 'string') {
          error = new Error(error);
        }
        /* print error */
        console.error('\nonEventErrorDefault - error\n' + error.stack + '\n');
      /* print data if it's defined and not an empty string */
      } else if (data !== undefined && data !== '') {
        /* debug data */
        console.log('\nonEventErrorDefault - data\n' + JSON.stringify(data, null, 2) + '\n');
      }
    },

    nop: function () {
      /*
        this function performs no operation (nop)
      */
      return;
    }

  };
  local._init();
}());



(function moduleJslintNodejs() {
  /*
    this nodejs module exports the jslint api
  */
  'use strict';
  var local = {
    _name: 'jslint-lite.moduleJslintNodejs',

    _init: function () {
      /*
        this function inits the module
      */
      var file;
      /* init local object */
      exports.initLocal(local);
      /* init jslint */
      required.vm.runInNewContext(
        required.fs.readFileSync('jslint.js', 'utf8'),
        local,
        'jslint.js'
      );
      /* init file */
      file = process.argv[2];
      if (require.main === module && file !== '--mode-test') {
        exports.lint(required.fs.readFileSync(file, 'utf8'), file);
      }
    },

    lint: function (script, file) {
      /*
        this function jslint's the script and logs any errors to stderr
      */
      var tmp;
      /* comment out hashbang */
      if (local.JSLINT(script.replace(/(^#!)/, '//$1'))) {
        return;
      }
      console.error('\n_scriptLintJs\n\u001b[1m' + file + '\u001b[22m');
      local.JSLINT.errors.forEach(function (error, ii) {
        tmp = '#' + String(ii + 1) + ' ';
        while (tmp.length < 4) {
          tmp = ' ' + tmp;
        }
        if (error && error.evidence) {
          console.error(tmp + '\u001b[33m' + error.reason + '\u001b[39m\n    ' +
            (error.evidence).trim() + 'u001b[90m \/\/ Line ' +
              error.line + ', Pos ' + error.character + '\u001b[39m');
        }
      });
      console.error();
      /* if function called from shell, then exit with non-zero exit-code */
      if (require.main === module) {
        process.exit(1);
      }
    },

    _lint_test: function (onEventError) {
      /*
        this function tests lint's default handling behavior
      */
      onEventError();
    }

  };
  local._init();
}());
