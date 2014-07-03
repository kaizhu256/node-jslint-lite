/*jslint bitwise: true, browser: true, indent:2, node: true, nomen: true, regexp: true, stupid: true*/
/* declare module vars */
var exports, required, state;



(function subModuleUtilityShared() {
  /*
    this shared sub-module exports useful utilities
  */
  'use strict';
  var local = {
    _name: 'utility.subModuleUtilityShared',

    _init: function () {
      /*
        this function inits the sub-module
      */
      /* export global object */
      if (typeof window === 'object') {
        window.global = window;
      }
      /* init module object */
      global.module = global.module || {};
      /* init _debug_print */
      global[['debug', 'Print'].join('')] = local._debug_print;
      /* init exports object */
      exports = module.exports = {};
      /* init state object */
      state = exports.state = exports.state || {};
      /* init nodejs mode */
      state.modeNodejs = global.process && process.versions && process.versions.node;
      local.setDefault(state, {
        /* default error */
        errorDefault: new Error(),
        /* cached dict of files */
        fileDict: {},
        /* dict of cli commands */
        modeCliDict: {},
        /* test report object */
        testReport: {
          /* list of javascript test platforms */
          testPlatformList: [{
            /* javascript platform name */
            name: state.modeNodejs ? 'nodejs - ' + process.platform + ' ' + process.version +
              ' - ' + process.env.MODE_CI_BUILD
              : 'browser - ' + (navigator && navigator.userAgent),
            /* list of test cases to run */
            testCaseList: []
          }]
        },
        /* default timeout for http request and other async io */
        timeoutDefault: 30000
      });
      /* init local object */
      local.initLocal(local);
      /* init state.testReport */
      exports.testReportMerge(state.testReport, {});
    },

    initLocal: function (local) {
      /*
        this function inits a module's local object
      */
      Object.keys(local).forEach(function (key) {
        var match;
        /* add test case to state.testReport */
        if (key.slice(-5) === '_test') {
          state.testReport.testPlatformList[0].testCaseList.push({
            callback: local[key],
            name: local._name + '.' + key
          });
          return;
        }
        /* set dict items to state object */
        match = (/(.+Dict)_(.*)/).exec(key);
        if (match) {
          state[match[1]] = state[match[1]] || {};
          state[match[1]][match[2]] = local[key];
          return;
        }
        /* export items that don't start with an underscore _ */
        if (key[0] !== '_') {
          exports[key] = local[key];
        }
      });
    },

    _initLocal_default_test: function (onEventError) {
      /*
        this function tests initLocal's default handling behavior
      */
      var data, local2;
      exports.testMock(onEventError, [
      ], function (onEventError) {
        state = {};
        local2 = {
          /* test dict handling behavior */
          _aaDict_bb: true,
          _name: '_initLocal_default_test'
        };
        /* test default handling behavior */
        exports.initLocal(local2);
        /* validate state */
        data = exports.jsonStringifyOrdered(state);
        exports.assert(data === '{"_aaDict":{"bb":true}}', data);
        onEventError();
      });
    },

    assert: function (passed, message) {
      /*
        this function throws an error if the assertion fails
      */
      if (!passed) {
        throw new Error('assertion error - ' + (
          /* if message is a string, then leave it as is */
          typeof message === 'string' ? message
          /* if message is an Error object, then get its stack trace */
          : message instanceof Error ? exports.errorStack(message)
              /* else JSON.stringify message */
              : JSON.stringify(message)
        ));
      }
    },

    _assert_default_test: function (onEventError) {
      /*
        this function tests assert's default handling behavior
      */
      /* test assertion passed */
      exports.assert(true, true);
      /* test assertion failed */
      exports.testTryCatch(function () {
        exports.assert(false);
      }, function (error) {
        /* assert error occurred */
        exports.assert(error instanceof Error, error);
        /* validate error message */
        exports.assert(error.message === 'assertion error - undefined', error.message);
      });
      /* test assertion failed with text message */
      exports.testTryCatch(function () {
        exports.assert(false, '_assert_default_test');
      }, function (error) {
        /* assert error occurred */
        exports.assert(error instanceof Error, error);
        /* validate error message */
        exports.assert(
          error.message === 'assertion error - _assert_default_test',
          error.message
        );
      });
      /* test assertion failed with error object */
      exports.testTryCatch(function () {
        exports.assert(false, state.errorDefault);
      }, function (error) {
        /* assert error occurred */
        exports.assert(error instanceof Error, error);
        /* validate error message */
        exports.assert(error.message.indexOf('assertion error - Error') === 0, error.message);
      });
      onEventError();
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

    callError0: function (onEventError) {
      /*
        this function calls the onEventError callback in arg position 0 with an error object
      */
      onEventError(state.errorDefault);
    },

    callError1: function (_, onEventError) {
      /*
        this function calls the onEventError callback in arg position 1 with an error object
      */
      exports.nop(_);
      onEventError(state.errorDefault);
    },

    callError2: function (_, __, onEventError) {
      /*
        this function calls the onEventError callback in arg position 2 with an error object
      */
      exports.nop(_, __);
      onEventError(state.errorDefault);
    },

    _callX_default_test: function (onEventError) {
      /*
        this function tests callX's default handling behavior
      */
      exports.callArg0(function (error) {
        /* assert no error occurred */
        exports.assert(!error, error);
      });
      exports.callArg1(null, function (error) {
        /* assert no error occurred */
        exports.assert(!error, error);
      });
      exports.callArg2(null, null, function (error) {
        /* assert no error occurred */
        exports.assert(!error, error);
      });
      exports.callError0(function (error) {
        /* assert error occurred */
        exports.assert(error instanceof Error, error);
      });
      exports.callError1(null, function (error) {
        /* assert error occurred */
        exports.assert(error instanceof Error, error);
      });
      exports.callError2(null, null, function (error) {
        /* assert error occurred */
        exports.assert(error instanceof Error, error);
      });
      onEventError();
    },

    _debug_print: function (arg) {
      /*
        this internal function is used for tmp debugging,
        and jslint will nag you to remove it if used
      */
      console.error('\n\n\ndebug' + 'Print');
      console.error.apply(console, arguments);
      console.error();
      /* return arg for inspection */
      return arg;
    },

    __debug_print_default_test: function (onEventError) {
      /*
        this function tests _debug_print's default handling behavior
      */
      var message;
      exports.testMock(onEventError, [
        [console, { error: function (_) {
          message += (_ || '') + '\n';
        } }]
      ], function (onEventError) {
        message = '';
        local._debug_print('_debug_print_default_test');
        exports.assert(
          message === '\n\n\ndebug' + 'Print\n_debug_print_default_test\n\n',
          message
        );
        onEventError();
      });
    },

    echo: function (arg) {
      /*
        this function returns the arg
      */
      return arg;
    },

    _echo_default_test: function (onEventError) {
      /*
      this function tests echo's default handling behavior
      */
      var data;
      data = exports.echo('_echo_default_test');
      exports.assert(data === '_echo_default_test', data);
      onEventError();
    },

    errorStack: function (error) {
      /*
        this function returns the error's stack or message attribute if possible
      */
      return error && (error.stack || error.message || error);
    },

    jsonStringifyOrdered: function (value, replacer, space) {
      /*
        this function JSON.stringify's the value with dictionaries in sorted order,
        allowing reliable / reproducible string comparisons and tests
      */
      return JSON.stringify(value && (typeof value === 'object' || Array.isArray(value)) ?
          JSON.parse(local._jsonStringifyOrderedRecurse(value))
        : value, replacer, space);
    },

    _jsonStringifyOrdered_default_test: function (onEventError) {
      /*
        this function tests jsonStringifyOrdered's default handling behavior
      */
      var data;
      /* test undefined handling behavior */
      data = exports.jsonStringifyOrdered(undefined);
      exports.assert(data === undefined, data);
      /* test function handling behavior */
      data = exports.jsonStringifyOrdered(exports.nop);
      exports.assert(data === undefined, data);
      /* test default handling behavior */
      data = exports.jsonStringifyOrdered({
        ee: {},
        dd: [undefined],
        cc: exports.nop,
        bb: 2,
        aa: 1
      });
      exports.assert(data === '{"aa":1,"bb":2,"dd":[null],"ee":{}}', data);
      onEventError();
    },

    _jsonStringifyOrderedRecurse: function (value) {
      /*
        this function recurses the value looking for dictionaries to sort
      */
      value = Array.isArray(value) ?
          '[' + value.map(local._jsonStringifyOrderedRecurse).join(',') + ']'
        : typeof value !== 'object' || !value ?
            JSON.stringify(value)
            /* sort list of keys */
            : '{' + Object.keys(value).filter(function (key) {
            return JSON.stringify(value[key]) !== undefined;
          }).sort().map(function (key) {
            return JSON.stringify(key) + ':' +
              local._jsonStringifyOrderedRecurse(value[key]);
          }).join(',') + '}';
      return value === undefined ? 'null' : value;
    },

    nop: function () {
      /*
        this function performs no operation (nop)
      */
      return;
    },

    _nop_default_test: function (onEventError) {
      /*
        this function tests nop's default handling behavior
      */
      var data;
      data = exports.nop();
      /* validate data */
      exports.assert(data === undefined, data);
      onEventError();
    },

    onEventErrorDefault: function (error, data) {
      /*
        this function provides a default, error / data handling callback.
        if an error is given, it will print the error's message and stack,
        else it will print the data
      */
      if (error) {
        /* print error */
        console.error('\nonEventErrorDefault - error\n' + exports.errorStack(error) + '\n');
      /* print data if it's defined and not an empty string */
      } else if (data !== undefined && data !== '') {
        /* debug data */
        console.log('\nonEventErrorDefault - data\n' + JSON.stringify(data, null, 2) + '\n');
      }
    },

    _onEventErrorDefault_default_test: function (onEventError) {
      /*
        this function tests onEventErrorDefault's default handling behavior
      */
      var message;
      exports.testMock(onEventError, [
        [console, {
          error: function (_) {
            message += _;
          },
          log: function (_) {
            message += _;
          }
        }]
      ], function (onEventError) {
        /* test default handling behavior */
        message = '';
        exports.onEventErrorDefault(null, '_onEventErrorDefault_default_test');
        exports.assert(message ===
          '\nonEventErrorDefault - data\n"_onEventErrorDefault_default_test"\n', message);
        /* test error handling behavior */
        message = '';
        exports.onEventErrorDefault(new Error('_onEventErrorDefault_default_test'));
        exports.assert(message.split('\n').slice(0, 3).join('\n') ===
          '\nonEventErrorDefault - error\nError: _onEventErrorDefault_default_test', message);
        onEventError();
      });
    },

    onEventTimeout: function (onEventError, timeout, message) {
      /*
        this function sets a timer to throw and handle a timeout error
      */
      var error;
      error = new Error('onEventTimeout - timeout error - ' + timeout + ' ms - ' + message);
      error.code = 'ETIMEDOUT';
      return setTimeout(function () {
        onEventError(error);
      }, timeout);
    },

    _onEventTimeout_timeout_test: function (onEventError) {
      /*
        this function tests onEventTimeout's timeout handling behavior
      */
      var time;
      time = Date.now();
      exports.onEventTimeout(function (error) {
        exports.testTryCatch(function () {
          /* assert error occurred */
          exports.assert(error instanceof Error);
          /* assert error is timeout error */
          exports.assert(error.code === 'ETIMEDOUT');
          time = Date.now() - time;
          /* assert time passed is greater than timeout */
          exports.assert(time >= 1000, time);
          onEventError();
        }, onEventError);
      }, 1000, '_onEventTimeout_timeoutError_test');
    },

    setDefault: function (options, defaults) {
      /*
        this function recursively sets default values for unset leaf nodes in the options object
      */
      Object.keys(defaults).forEach(function (key) {
        var defaults2, options2;
        defaults2 = defaults[key];
        options2 = options[key];
        /* set default value */
        if (options2 === undefined) {
          options[key] = defaults2;
          return;
        }
        /* recurse defaults2 if options2 and defaults2 are both objects */
        if (defaults2 && typeof defaults2 === 'object' &&
            options2 && typeof options2 === 'object' &&
            !Array.isArray(options2)) {
          local.setDefault(options2, defaults2);
        }
      });
      return options;
    },

    _setDefault_default_test: function (onEventError) {
      /*
        this function tests setDefault's default handling behavior
      */
      var options;
      options = exports.setDefault(
        { aa: 1, bb: {}, cc: [] },
        { aa: 2, bb: { cc: 2 }, cc: [1, 2] }
      );
      /* validate options */
      exports.assert(
        exports.jsonStringifyOrdered(options) === '{"aa":1,"bb":{"cc":2},"cc":[]}',
        options
      );
      onEventError();
    },

    setOverride: function (options, override, backup, depth) {
      /*
        this function recursively overrides the options object with the override object,
        and optionally saves the original options object to the backup object,
        and optionally accepts the depth recursion limit
      */
      local._setOverrideRecurse(options, override, backup || {}, depth || Infinity);
      return options;
    },

    _setOverride_default_test: function (onEventError) {
      /*
        this function tests setOverride's default handling behavior
      */
      var backup, data, options;
      backup = {};
      /* test override handling behavior */
      options = exports.setOverride(
        { aa: 1, bb: { cc: 2 }, dd: [3, 4], ee: { ff: { gg: 5, hh: 6 } } },
        { aa: 2, bb: { dd: 3 }, dd: [4, 5], ee: { ff: { gg: 6 } } },
        backup,
        2
      );
      /* validate backup */
      data = exports.jsonStringifyOrdered(backup);
      exports.assert(data === '{"aa":1,"bb":{},"dd":[3,4],"ee":{"ff":{"gg":5,"hh":6}}}', data);
      /* validate options */
      data = exports.jsonStringifyOrdered(options);
      exports.assert(data ===
        '{"aa":2,"bb":{"cc":2,"dd":3},"dd":[4,5],"ee":{"ff":{"gg":6}}}', data);
      /* test restore handling behavior */
      exports.setOverride(options, backup);
      /* validate backup */
      data = exports.jsonStringifyOrdered(backup);
      exports.assert(data === '{"aa":1,"bb":{"dd":3},"dd":[3,4],"ee":{"ff":{"gg":6}}}', data);
      /* validate options */
      data = exports.jsonStringifyOrdered(options);
      exports.assert(data ===
        '{"aa":1,"bb":{"cc":2},"dd":[3,4],"ee":{"ff":{"gg":5,"hh":6}}}', data);
      onEventError();
    },

    _setOverrideRecurse: function (options, override, backup, depth) {
      /*
        this function
        1. save the options item to the backup object
        2. set the override item to the options object
        3. recurse the override object
      */
      var options2, override2;
      Object.keys(override).forEach(function (key) {
        options2 = options[key];
        override2 = backup[key] = override[key];
        if (depth <= 1 ||
            /* override2 is not a plain object */
            !(override2 && typeof override2 === 'object' && !Array.isArray(override2)) ||
            /* options2 is not a plain object */
            !(options2 && typeof options2 === 'object' && !Array.isArray(options2))) {
          /* 1. save the options item to the backup object */
          backup[key] = options2;
          /* 2. set the override item to the options object */
          options[key] = override2;
          return;
        }
        /* 3. recurse the override object */
        local._setOverrideRecurse(options2, override2, override2, depth - 1);
      });
    },

    testMock: function (onEventError, mockList, test) {
      /*
        this function mocks the state given in the mockList while running the test callback
      */
      var onEventError2, state2;
      /* prepend mandatory mocks for async / unsafe functions */
      mockList = [
        /* suppress console.log */
        [console, { log: exports.nop }],
        /* enforce synchonicity by mocking timers as exports.callArg0 */
        [global, { setInterval: exports.callArg0, setTimeout: exports.callArg0 }],
        [process, { exit: exports.nop }]
      ].concat(mockList);
      onEventError2 = function (error) {
        /* restore state */
        state = state2;
        mockList.reverse().forEach(function (mock) {
          exports.setOverride(mock[0], mock[2], null, 1);
        });
        onEventError(error);
      };
      /* run onEventError callback in mocked state in a try catch block */
      try {
        /* mock state */
        mockList.forEach(function (mock) {
          mock[2] = {};
          exports.setOverride(mock[0], mock[1], mock[2], 1);
        });
        state2 = state;
        /* run test */
        test(onEventError2);
      } catch (error) {
        onEventError2(error);
      }
    },

    _testMock_error_test: function (onEventError) {
      /*
        this function tests testMock's error handling behavior
      */
      exports.testMock(function (error) {
        /* assert error occurred */
        exports.assert(error instanceof Error, error);
        onEventError();
      }, [
      ], function () {
        throw state.errorDefault;
      });
    },

    _testReportCreate: function (testReport, env) {
      /*
        this function creates a test report after all tests have finished
      */
      var errorMessageList, result, testCaseNumber;
      /* parse testReport */
      exports.testReportMerge(testReport, {});
      /* create test report summary */
      result = '';
      testReport.testPlatformList.forEach(function (testPlatform) {
        result += '\n\ntest report - ' + testPlatform.name + '\n' +
          ('        ' + testPlatform.time).slice(-8) + ' ms | ' +
          (' ' + testPlatform.testsFailed).slice(-2) + ' failed | ' +
          ('  ' + testPlatform.testsPassed).slice(-3) + ' passed\n';
      });
      /* print test report summary */
      console.log(result);
      if (state.modeNodejs) {
        /* create json test report */
        required.fs.writeFileSync('.build/test-report.json', JSON.stringify(testReport));
      }
      /* create html test report */
      testCaseNumber = 0;
      /* copy testReport before modifying it */
      testReport = JSON.parse(JSON.stringify(testReport, {}));
      result = exports.textFormat(
        state.fileDict['/public/testReport.html.template'].content,
        exports.setOverride(testReport, {
          CI_BUILD_NUMBER: env.CI_BUILD_NUMBER,
          /* security - sanitize '<' in text */
          CI_COMMIT_INFO: String(env.CI_COMMIT_INFO).replace((/</g), '&lt;'),
          /* map testPlatformList */
          testPlatformList: testReport.testPlatformList.map(function (testPlatform, ii) {
            errorMessageList = [];
            return exports.setOverride(testPlatform, {
              errorMessageList: errorMessageList,
              /* security - sanitize '<' in text */
              name: String(testPlatform.name).replace((/</g), '&lt;'),
              /* map testCaseList */
              testCaseList: testPlatform.testCaseList.map(function (testCase) {
                testCaseNumber += 1;
                if (testCase.errorMessage) {
                  /* word wrap error message 128 characters in pre tag */
                  errorMessageList.push({ errorMessage: exports.textWordwrap(testCaseNumber +
                    '. ' + testCase.name + '\n' +
                    testCase.errorMessage, 96)
                      /* security - sanitize '<' in text */
                      .replace((/</g), '&lt;') });
                }
                return exports.setOverride(testCase, {
                  testCaseNumber: testCaseNumber,
                  testReportTestStatusClass: 'testReportTest' +
                    testCase.status[0].toUpperCase() + testCase.status.slice(1)
                });
              }),
              testReportPlatformPreClass: 'testReportPlatformPre' +
                (errorMessageList.length ? '' : 'Hidden'),
              testPlatformNumber: ii + 1
            });
          }),
          testsFailedClass: testReport.testsFailed ? 'testReportTestFailed'
            : 'testReportTestPassed'
        })
      );
      if (state.modeNodejs) {
        /* create html test report */
        required.fs.writeFileSync('.build/test-report.html', result);
        /* create test report badge */
        required.fs.writeFileSync(
          '.build/test-report.badge.svg',
          state.fileDict[
            'https%3A%2F%2Fimg.shields.io%2Fbadge%2Ftests_failed-999-dd0000.svg%3Fstyle%3Dflat'
          ]
            .content
            /* edit coverage badge testReport.testsFailed */
            .replace('999', testReport.testsFailed)
            /* edit coverage badge color */
            .replace('d00', testReport.testsFailed ? 'd00' : '0d0')
        );
        /* non-zero exit if tests failed */
        process.exit(testReport.testsFailed);
      }
      /* return html test report */
      return result;
    },

    testReportMerge: function (testReport1, testReport2) {
      /*
        this function merges testReport2 into testReport1
      */
      var testPlatform1;
      [testReport1, testReport2].forEach(function (testReport, ii) {
        ii += 1;
        exports.setDefault(testReport, {
          date: new Date().toISOString(),
          errorMessageList: [],
          testPlatformList: [],
          time: 0
        });
        /* security - handle malformed testReport */
        exports.assert(
          testReport && typeof testReport === 'object',
          ii + ' invalid testReport ' + typeof testReport
        );
        exports.assert(
          typeof testReport.time === 'number',
          ii + ' invalid testReport.time ' + typeof testReport.time
        );
        /* security - handle malformed testReport.errorMessageList */
        testReport.errorMessageList.forEach(function (errorMessage) {
          exports.assert(
            typeof errorMessage === 'string',
            ii + ' invalid errorMessage ' + typeof errorMessage
          );
        });
        /* security - handle malformed testReport.testPlatformList */
        testReport.testPlatformList.forEach(function (testPlatform) {
          exports.setDefault(testPlatform, {
            name: 'undefined',
            testCaseList: [],
            time: 0
          });
          exports.assert(
            typeof testPlatform.name === 'string',
            ii + ' invalid testPlatform.name ' + typeof testPlatform.name
          );
          exports.assert(
            typeof testPlatform.time === 'number',
            ii + ' invalid testPlatform.time ' + typeof testPlatform.time
          );
          /* security - handle malformed testReport.testPlatformList.testCaseList */
          testPlatform.testCaseList.forEach(function (testCase) {
            exports.setDefault(testCase, {
              errorMessage: '',
              name: 'undefined',
              time: 0
            });
            exports.assert(
              typeof testCase.errorMessage === 'string',
              ii + ' invalid testCase.errorMessage ' + typeof testCase.errorMessage
            );
            exports.assert(
              typeof testCase.name === 'string',
              ii + ' invalid testCase.name ' + typeof testCase.name
            );
            exports.assert(
              typeof testCase.time === 'number',
              ii + ' invalid testCase.time ' + typeof testCase.time
            );
          });
        });
      });
      /* merge errorMessageList */
      testReport2.errorMessageList.forEach(function (errorMessage) {
        testReport1.errorMessageList.push(errorMessage);
      });
      /* merge testPlatformList */
      testReport2.testPlatformList.forEach(function (testPlatform2) {
        testPlatform1 = null;
        testReport1.testPlatformList.forEach(function (_) {
          /* use existing testPlatform1 */
          if (_.name === testPlatform2.name) {
            testPlatform1 = _;
          }
        });
        /* create new testPlatform1 */
        if (!testPlatform1) {
          testPlatform1 = {
            name: testPlatform2.name,
            testCaseList: [],
            time: 0
          };
          testReport1.testPlatformList.push(testPlatform1);
        }
        /* update testPlatform1.time */
        if (testPlatform1.time < 0xffffffff) {
          testPlatform1.time += testPlatform2.time;
        }
        /* merge testPlatform2.testCaseList into testPlatform1.testCaseList */
        testPlatform2.testCaseList.forEach(function (testCase) {
          testPlatform1.testCaseList.push(testCase);
        });
      });
      /* update testReport1.time */
      if (testReport1.time < 0xffffffff) {
        testReport1.time += testReport2.time;
      }
      testReport1.platformsFailed = 0;
      testReport1.platformsPassed = 0;
      testReport1.testsFailed = 0;
      testReport1.testsPassed = 0;
      testReport1.testsPending = 0;
      testReport1.testPlatformList.forEach(function (testPlatform1) {
        testPlatform1.status = 'passed';
        testPlatform1.testsFailed = 0;
        testPlatform1.testsPassed = 0;
        testPlatform1.testCaseList.forEach(function (testCase) {
          /* update failed tests */
          if (testCase.errorMessage) {
            testCase.status = 'failed';
            testReport1.testsFailed += 1;
            testPlatform1.testsFailed += 1;
            testPlatform1.status = 'failed';
          /* update pending tests */
          } else if (testCase.time > 0xffffffff) {
            testCase.status = 'pending';
            testReport1.testsPending += 1;
            if (testPlatform1.status !== 'failed') {
              testPlatform1.status = 'pending';
            }
          /* update passed tests */
          } else {
            testCase.status = 'passed';
            testReport1.testsPassed += 1;
            testPlatform1.testsPassed += 1;
          }
        });
        switch (testPlatform1.status) {
        case 'failed':
          /* update platforms failed */
          testReport1.platformsFailed += 1;
          break;
        case 'passed':
          /* update platforms passed */
          testReport1.platformsPassed += 1;
          break;
        }
        /* sort testCaseList by status.name */
        testPlatform1.testCaseList.sort(function (arg1, arg2) {
          arg1 = arg1.status.replace('passed', 'z') + arg1.name.toLowerCase();
          arg2 = arg2.status.replace('passed', 'z') + arg2.name.toLowerCase();
          return arg1 <= arg2 ? -1 : 1;
        });
      });
      /* sort testPlatformList by status.name */
      testReport1.testPlatformList.sort(function (arg1, arg2) {
        arg1 = arg1.status.replace('passed', 'z') + arg1.name.toLowerCase();
        arg2 = arg2.status.replace('passed', 'z') + arg2.name.toLowerCase();
        return arg1 <= arg2 ? -1 : 1;
      });
      /* stop testReport1 timer */
      if (testReport1.testsPending === 0 && testReport1.time > 0xffffffff) {
        testReport1.time = Date.now() - testReport1.time;
      }
      return testReport1;
    },

    testRun: function (testReport) {
      /*
        this function runs the tests
      */
      var remaining, testPlatform;
      /* start testReport timer */
      testReport.time = Date.now();
      testPlatform = testReport.testPlatformList[0];
      /* start testPlatform timer */
      testPlatform.time = Date.now();
      remaining = testPlatform.testCaseList.length;
      testPlatform.testCaseList.forEach(function (testCase) {
        var errorFinished, finished, onEventError;
        onEventError = function (error) {
          exports.onEventErrorDefault(error);
          /* save test error */
          testCase.errorMessage = testCase.errorMessage || exports.errorStack(error);
          /* error - multiple callbacks in test case */
          if (finished) {
            errorFinished = new Error('testCase ' + testCase.name + ' called multiple times');
            exports.onEventErrorDefault(errorFinished);
            /* save test error */
            testCase.errorMessage = testCase.errorMessage || exports.errorStack(errorFinished);
            return;
          }
          finished = true;
          /* stop testCase timer */
          testCase.time = Date.now() - testCase.time;
          /* decrement test counter */
          remaining -= 1;
          /* create test report when all tests have finished */
          if (remaining === 0) {
            /* stop testPlatform timer */
            testPlatform.time = Date.now() - testPlatform.time;
            local._testReportCreate(testReport, process.env);
          }
        };
        /* run test case in try-catch block */
        try {
          /* start testCase timer */
          testCase.time = Date.now();
          testCase.callback(onEventError);
        } catch (error) {
          onEventError(error);
        }
      });
    },

    testTryCatch: function (callback, onEventError) {
      /*
        this function calls the callback in a try catch block,
        and falls back to onEventError if an error is thrown
      */
      try {
        callback();
      } catch (error) {
        onEventError(error);
      }
    },

    _testTryCatch_default_test: function (onEventError) {
      /*
        this function tests testTryCatch's default handling behavior
      */
      /* test default handling behavior */
      exports.testTryCatch(exports.nop, onEventError);
      /* test error handling behavior */
      exports.testTryCatch(function () {
        throw state.errorDefault;
      }, function (error) {
        /* assert error occurred */
        exports.assert(error instanceof Error, error);
      });
      onEventError();
    },

    /* ascii character reference */
    textExampleAscii: '\x00\x01\x02\x03\x04\x05\x06\x07\b\t\n\x0b\f\r\x0e\x0f' +
      '\x10\x11\x12\x13\x14\x15\x16\x17\x18\x19\x1a\x1b\x1c\x1d\x1e\x1f' +
      ' !"#$%&\'()*+,-./0123456789:;<=>?' +
      '@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_' +
      '`abcdefghijklmnopqrstuvwxyz{|}~\x7f',

    textFormat: function (template, dict) {
      /*
        this function replaces the keys in given text template
        with the key / value pairs provided by the dict
      */
      var value;
      dict = dict || {};
      /* search for keys in the template */
      return local._textFormatList(template, dict).replace((/\{\{[^{}]+\}\}/g), function (key) {
        /* lookup key's value in the dict */
        value = key.slice(2, -2);
        return dict.hasOwnProperty(value) ? dict[value] : key;
      });
    },

    _textFormat_default_test: function (onEventError) {
      /*
        this function tests textFormat's default handling behavior
      */
      var data;
      data = exports.textFormat('{{aa}}{{aa}}{{bb}}{{bb}}{{cc}}{{cc}}', {
        /* test string handling behavior */
        aa: 'aa',
        /* test non-string handling behavior */
        bb: undefined
      });
      exports.assert(data === 'aaaaundefinedundefined{{cc}}{{cc}}', data);
      /* test list handling behavior */
      data = exports.textFormat('[{{@list1}}[{{@list2}}{{aa}},{{/@list2}}],{{/@list1}}]', {
        list1: [
          /* test null handling behavior */
          null,
          /* test recursive list handling behavior */
          { list2: [{ aa: 'bb' }, { aa: 'cc' }] }
        ]
      });
      exports.assert(data === '[[{{@list2}}{{aa}},{{/@list2}}],[bb,cc,],]', data);
      onEventError();
    },

    _textFormatList: function (template, dict) {
      /*
        this function replaces the keys in given text template
        with the key / value pairs provided by the dict
      */
      var rgx, match, onEventReplace;
      onEventReplace = function (_, fragment) {
        exports.nop(_);
        return dict[match].map(function (dict) {
          return exports.textFormat(fragment, dict);
        }).join('');
      };
      rgx = (/\{\{@[^{]+\}\}/g);
      while (true) {
        /* search for array keys in the template */
        match = rgx.exec(template);
        if (!match) {
          break;
        }
        /* lookup key's value in the dict */
        match = match[0].slice(3, -2);
        if (Array.isArray(dict[match])) {
          template = template.replace(
            new RegExp('\\{\\{@' + match + '\\}\\}([\\S\\s]*?)\\{\\{\\/@' + match + '\\}\\}'),
            onEventReplace
          );
        }
      }
      return template;
    },

    textWordwrap: function (text, width) {
      /*
        this function word wraps the text to the specified width
      */
      width -= 1;
      return text.split('\n').map(function (line) {
        for (text = [line]; line.length > width + 1; line = text[text.length - 1]) {
          line = [line.slice(0, width) + '\\', '        ' + line.slice(width)];
          text.splice(text.length - 1, 1, line[0], line[1]);
        }
        return text.join('\n');
      }).join('\n');
    },

    _textWordwrap_default_test: function (onEventError) {
      /*
        this function tests textWordwrap's default handling behavior
      */
      var data;
      data = exports.textWordwrap(exports.textExampleAscii, 16);
      /* validate data */
      exports.assert(data ===
        "\x00\x01\x02\x03\x04\x05\x06\x07\b\t\n" +
        "\x0b\f\r\x0e\x0f\x10\x11\x12\x13\x14\x15\x16\x17\x18\x19\\\n" +
        "        \x1a\x1b\x1c\x1d\x1e\x1f \\\n" +
        "        !\"#$%&'\\\n" +
        "        ()*+,-.\\\n" +
        "        /012345\\\n" +
        "        6789:;<\\\n" +
        "        =>?@ABC\\\n" +
        "        DEFGHIJ\\\n" +
        "        KLMNOPQ\\\n" +
        "        RSTUVWX\\\n" +
        "        YZ[\\]^_\\\n" +
        "        `abcdef\\\n" +
        "        ghijklm\\\n" +
        "        nopqrst\\\n" +
        "        uvwxyz{\\\n" +
        "        |}~\x7f", JSON.stringify(data));
      data.split('\n').forEach(function (line) {
        /* assert line is 16 characters or less */
        exports.assert(line.length <= 16, line.length);
      });
      onEventError();
    }

  };
  local._init();
}());



(function subModuleUtilityBrowser() {
  /*
    this browser sub-module exports useful utilities
  */
  'use strict';
  var local = {
    _name: 'utility.subModuleUtilityBrowser',

    _init: function () {
      /*
        this function inits the sub-module
      */
      if (state.modeNodejs) {
        return;
      }
      /* init local object */
      exports.initLocal(local);
    }

  };
  local._init();
}());



(function subModuleUtilityNodejs() {
  /*
    this nodejs sub-module exports useful utilities
  */
  'use strict';
  var local = {
    _name: 'utility.subModuleUtilityNodejs',

    _init: function () {
      /*
        this function inits the sub-module
      */
      if (!state.modeNodejs) {
        return;
      }
      /* init local object */
      exports.initLocal(local);
      /* init required object */
      required = exports.required = exports.required || {};
      /* require builtin modules */
      [
        'child_process',
        'fs',
        'http', 'https',
        'path',
        'url',
        'vm'
      ].forEach(function (module) {
        required[module] = required[module] || require(module);
      });
      /* require external modules */
      [
        'jslint-lite'
      ].forEach(function (module) {
        try {
          required[module.replace((/-/g), '_')] = require(module);
        } catch (error) {
          console.log('module ' + module + ' not loaded');
        }
      });
      /* load package.json file */
      state.packageJson = state.packageJson || {};
      state.packageJson = JSON.parse(required.fs.readFileSync(process.cwd()
        + '/package.json'));
      /* init builtin files */
      local._initFile();
      /* run the following code only if this module is in the root directory */
      if (__dirname !== process.cwd()) {
        return;
      }
      /* init cli */
      local._initCli(process.argv);
      /* init coverage */
      local._initCoverage();
      /* init repl */
      local._initRepl();
      /* init server */
      local._initServer();
      /* init watch */
      local._initWatch();
    },

    _initCli: function (argv) {
      /*
        this function inits the cli
      */
      var callback, value;
      /* parse commandline arguments argv and integrate it into the state dict */
      argv.forEach(function (arg) {
        if (arg.indexOf('--') === 0) {
          arg = arg.split('=');
          /* --foo=1 -> state.foo = 1 */
          value = arg.slice(1).join('=') ||
            /* --foo -> state.foo = true */
            true;
          /* convert arg to camel case */
          arg = arg[0].slice(2).replace((/[\-_][a-z]/g), function (match) {
            return match[1].toUpperCase();
          });
          try {
            state[arg] = JSON.parse(value);
          } catch (error) {
            state[arg] = value;
          }
        }
      });
      /* init cli after all modules have been synchronously loaded */
      setTimeout(function () {
        callback = state.modeCliDict[state.modeCli];
        if (callback) {
          callback(argv, exports.onEventErrorDefault);
        }
      });
    },

    __initCli_default_test: function (onEventError) {
      /*
        this function tests _initCli's default handling behavior
      */
      var data;
      exports.testMock(onEventError, [
      ], function (onEventError) {
        state = { modeCliDict: {} };
        local._initCli(['aa', '--bb', '--cc=dd']);
        data = exports.jsonStringifyOrdered(state);
        /* validate state */
        exports.assert(data === '{"bb":true,"cc":"dd","modeCliDict":{}}', data);
        onEventError();
      });
    },

    _initCoverage: function () {
      /*
        this function inits the coverage api
      */
      var istanbul;
      if (state.modeCoverage) {
        istanbul = require('istanbul');
        required.istanbul_instrumenter = new istanbul.Instrumenter();
      }
    },

    _initFile: function () {
      /*
        this function inits builtin files
      */
      var data;
      data = required.fs.readFileSync(__dirname + '/utility.data', 'utf8');
      data.replace(
        (/^\/\* MODULE_BEGIN (.+) \*\/$([\S\s]+?)^\/\* MODULE_END \*\/$/gm),
        function (_, options, content, ii) {
          exports.nop(_);
          options = JSON.parse(options);
          /* save options to state.fileDict */
          state.fileDict[options.file] = options;
          /* preserve lineno */
          options.content = data.slice(0, ii).replace(/.*/g, '') + content;
          /* run actions */
          options.actionList.forEach(function (action) {
            state.fileActionDict[action](options);
          });
        }
      );
    },

    _initRepl: function () {
      /*
        this function inits the ropl debugger
      */
      if (!state.modeRepl) {
        return;
      }
      /* export exports */
      global.exports = exports;
      /* export required */
      global.required = required;
      /* export state */
      global.state = state;
      /* start repl */
      require('repl').start({
        eval: function (script, __, file, onEventError) {
          exports.nop(__);
          try {
            onEventError(null, required.vm.runInThisContext(local._replParse(script), file));
          } catch (error) {
            onEventError(error);
          }
        },
        useGlobal: true
      });
    },

    _initServer: function () {
      /*
        this function inits the server
      */
      if (!state.serverPort || state.serverPort === true) {
        return;
      }
      state.serverPort = Math.floor(
        state.serverPort === 'random' ? Math.floor(Math.random() * 0xffff) : state.serverPort
      );
      /* validate state.serverPort */
      exports.assert(
        0 < state.serverPort && state.serverPort <= 0xffff,
        'invalid state.serverPort ' + state.serverPort
      );
      /* init state.localhost */
      state.localhost = 'http://localhost:' + state.serverPort;
      console.log('starting server on port ' + state.serverPort);
      /* init server with exports.serverMiddleware */
      required.http.createServer(function (request, response) {
        exports.serverMiddleware(request, response, function (error) {
          exports.serverRespondDefault(response, error ? 500 : 404, error);
        });
      })
        /* listen on state.serverPort */
        .listen(state.serverPort);
    },

    _initWatch: function () {
      /*
        this function inits file watching
      */
      required.fs.watchFile(__dirname + '/utility.data', {
        interval: 1000,
        persistent: false
      }, function (stat2, stat1) {
        if (stat2.mtime >= stat1.mtime) {
          local._initFile();
        }
      });
    },

    ajax: function (options, onEventError) {
      /*
        this functions performs an asynchronous http(s) request with error handling and timeout,
        and passes the responseText to onEventError
      */
      var chunkList,
        finished,
        mode,
        onEventError2,
        redirect,
        request,
        response,
        responseText,
        timeout,
        urlParsed;
      mode = 0;
      onEventError2 = function (error, data) {
        mode = error instanceof Error ? -1 : mode + 1;
        switch (mode) {
        case 1:
          /* clear old timeout */
          clearTimeout(timeout);
          /* set timeout */
          timeout = exports.onEventTimeout(
            onEventError2,
            options.timeout || state.timeoutDefault,
            'ajax ' + options.url
          );
          /* parse options.url */
          urlParsed = required.url.parse(options.url);
          /* deep-copy object */
          options = JSON.parse(JSON.stringify(options));
          /* bug - disable socket pooling, because it causes timeout errors in tls tests */
          options.agent = options.agent || false;
          /* host needed for redirects */
          options.host = urlParsed.host;
          /* hostname needed for http(s).request */
          options.hostname = urlParsed.hostname;
          /* path needed for http(s).request */
          options.path = urlParsed.path;
          /* port needed for http(s).request */
          options.port = urlParsed.port;
          /* protocol needed for http(s).request */
          options.protocol = urlParsed.protocol;
          /* init headers */
          options.headers = options.headers || {};
          /* init Content-Length header */
          options.headers['Content-Length'] =
            typeof options.data === 'string' ? Buffer.byteLength(options.data)
            : Buffer.isBuffer(options.data) ? options.data.length
              : 0;
          request = (options.protocol === 'https:' ? required.https : required.http)
            .request(options, onEventError2)
            /* handle error event */
            .on('error', onEventError2);
          /* debug ajax request */
          state.debugAjaxRequest = request;
          /* send request and / or data */
          request.end(options.data);
          break;
        case 2:
          response = error;
          /* debug ajax response */
          state.debugAjaxResponse = response;
          /* follow redirects */
          switch (response.statusCode) {
          case 301:
          case 302:
          case 303:
          case 304:
          case 305:
          case 306:
          case 307:
            mode = -2;
            redirect = true;
            onEventError2();
            return;
          }
          chunkList = [];
          response
            .on('end', function () {
              onEventError2(null, Buffer.concat(chunkList).toString());
            })
            /* error handling */
            .on('error', onEventError2)
            /* data handling */
            .on('data', function (chunk) {
              chunkList.push(chunk);
            });
          break;
        case 3:
          /* stringify responseText */
          responseText = data;
          /* error handling for http status code >= 400 */
          if (response.statusCode >= 400) {
            onEventError2(new Error(responseText));
            return;
          }
          /* successful response */
          onEventError2(null, responseText, response);
          break;
        default:
          /* ignore error / data if already finished */
          if (finished) {
            return;
          }
          finished = true;
          /* clear timeout */
          clearTimeout(timeout);
          /* cleanup request socket */
          if (request) {
            request.destroy();
          }
          /* cleanup response socket */
          if (response) {
            response.destroy();
          }
          if (error) {
            /* add http method / status / url debug info to error.message */
            error.message = options.method + ' ' + (response && response.statusCode) + ' - ' +
              options.url + '\n' +
              JSON.stringify((responseText || '').slice(0, 256) + '...') + '\n' +
              error.message;
            onEventError(error, responseText, response);
            return;
          }
          if (redirect) {
            options.redirected = options.redirected || 8;
            options.redirected -= 1;
            if (options.redirected < 0) {
              onEventError2(new Error('ajax - too many http redirects to ' +
                response.headers.location));
              return;
            }
            options.url = response.headers.location;
            if (options.url && options.url[0] === '/') {
              options.url = options.protocol + '//' + options.host + options.url;
            }
            exports.ajax(options, onEventError);
            return;
          }
          onEventError(null, responseText, response);
        }
      };
      onEventError2();
    },

    _ajax_default_test: function (onEventError) {
      /*
        this function tests ajax's default handling behavior
      */
      exports.ajax({
        url: state.localhost + '/test/hello.json'
      }, function (error, data, response) {
        exports.testTryCatch(function () {
          /* assert no error occurred */
          exports.assert(!error, error);
          /* validate data */
          exports.assert(data === '"hello"', data);
          /* validate response */
          data = JSON.stringify({
            headers: {
              'connection': response.headers.connection,
              'content-type': response.headers['content-type'],
              'transfer-encoding': response.headers['transfer-encoding']
            },
            httpVersion: response.httpVersion,
            statusCode: response.statusCode
          });
          exports.assert(data === JSON.stringify({
            headers: {
              'connection': 'close',
              'content-type': 'application/json',
              'transfer-encoding': 'chunked'
            },
            httpVersion: '1.1',
            statusCode: 200
          }), data);
          onEventError();
        }, onEventError);
      });
    },

    fileActionDict_install: function (options) {
      /*
        this function installs the file
      */
      if (state.modeCli === 'npmInstall' && __dirname === process.cwd()) {
        required.fs.writeFileSync(options.file, options.content);
      }
    },

    fileActionDict_lint: function (options) {
      /*
        this function lints the file
      */
      switch (required.path.extname(options.file)) {
      case '.js':
      case '.json':
        if (required.jslint_lite && required.jslint_lite.jslint) {
          required.jslint_lite.jslint(options.content, options.file);
        }
        break;
      }
    },

    fileActionDict_trim: function (options) {
      /*
        this function trims the file content
      */
      options.content = options.content.trim();
    },

    modeCliDict_coverageReportBadgeCreate: function () {
      /*
        this function creates a coverage badge
      */
      var percent;
      percent = (/Statements: <span class="metric">([.\d]+)/)
        .exec(required.fs.readFileSync('.build/coverage-report/index.html', 'utf8'))[1];
      required.fs.writeFileSync(
        '.build/coverage-report/coverage-report.badge.svg',
        state.fileDict[
          'https%3A%2F%2Fimg.shields.io%2Fbadge%2Fcoverage-100.0%25-00dd00.svg%3Fstyle%3Dflat'
        ]
          .content
          /* edit coverage badge percent */
          .replace('100.0', percent)
          /* edit coverage badge color */
          .replace(
            '0d0',
            ('0' + Math.round((100 - Number(percent)) * 2.21).toString(16))
              .slice(-2) +
              ('0' + Math.round(Number(percent) * 2.21).toString(16)).slice(-2) +
              '00'
          )
      );
    },

    _modeCliDict_coverageReportBadgeCreate_default_test: function (onEventError) {
      /*
        this function tests modeCliDict_coverageReportBadgeCreate's default handling behavior
      */
      exports.testMock(onEventError, [
        [required, { fs: {
          readFileSync: function () {
            return 'Statements: <span class="metric">50.0%';
          },
          writeFileSync: exports.nop
        } }]
      ], function (onEventError) {
        local.modeCliDict_coverageReportBadgeCreate();
        onEventError();
      });
    },

    modeCliDict_githubContentsFilePush: function (argv, onEventError) {
      /*
        this function pushes the local file1 to the remote github file2
      */
      var blob, file1, file2, mode, onEventError2, sha;
      mode = 0;
      onEventError2 = function (error, data) {
        mode += 1;
        switch (mode) {
        case 1:
          file1 = argv[3];
          file2 = file1.replace(argv[4], argv[5]);
          console.log('pushing file https://' +
            process.env.GITHUB_REPO.replace('/', '.github.io/') + '-data/' + file2);
          exports.ajax({
            headers: {
              Authorization: 'token ' + process.env.GITHUB_TOKEN,
              /* bug - github api requires User-Agent header */
              'User-Agent': 'unknown'
            },
            url: 'https://api.github.com/repos/' + process.env.GITHUB_REPO +
              '-data/contents/' + required.path.dirname(file2) + '?ref=gh-pages'
          }, onEventError2);
          break;
        case 2:
          blob = required.fs.readFileSync(file1);
          data = data && JSON.parse(data);
          if (Array.isArray(data)) {
            /* calculate blob sha */
            sha = require('crypto').createHash('sha1')
              .update('blob ' + blob.length + '\x00')
              .update(blob)
              .digest('hex');
            data.forEach(function (dict) {
              if (dict.path === file2) {
                /* no need to update if blob sha matches */
                if (dict.sha === sha) {
                  process.exit();
                }
                sha = dict.sha;
              }
            });
          }
          exports.ajax({
            data: JSON.stringify({
              branch: 'gh-pages',
              content: blob.toString('base64'),
              message: '[skip ci] update file ' + file2,
              sha: sha
            }),
            headers: {
              Authorization: 'token ' + process.env.GITHUB_TOKEN,
              /* bug - github api requires User-Agent header */
              'User-Agent': 'unknown'
            },
            method: 'PUT',
            url: 'https://api.github.com/repos/' + process.env.GITHUB_REPO +
              '-data/contents/' + file2
          }, onEventError2);
          break;
        default:
          onEventError(error);
          process.exit(!!error);
        }
      };
      onEventError2();
    },

    _modeCliDict_githubContentsFilePush_default_test: function (onEventError) {
      /*
        this function tests modeCliDict_githubContentsFilePush's default handling behavior
      */
      var ajax1, mode;
      exports.testMock(onEventError, [
        [console, { error: exports.nop }],
        [exports, { ajax: function (_, onEventError) {
          exports.nop(_);
          mode += 1;
          switch (mode) {
          case 1:
            ajax1(onEventError);
            break;
          case 2:
            onEventError();
            break;
          }
        } }],
        [required, {
          fs: { readFileSync: function () {
            return new Buffer(0);
          } }
        }],
        [process, { argv: [null, null, null, 'aa/cc', 'aa', 'bb'] }]
      ], function (onEventError) {
        /* test file create handling behavior */
        mode = 0;
        ajax1 = function (onEventError) {
          /* test file create handling behavior */
          onEventError(null, '{}');
        };
        local.modeCliDict_githubContentsFilePush(process.argv, function (error) {
          exports.testTryCatch(function () {
            /* assert no error occurred */
            exports.assert(!error, error);
          }, onEventError);
        });
        /* test file update handling behavior */
        mode = 0;
        ajax1 = function (onEventError) {
          onEventError(null, JSON.stringify([
            /* test blob path mismatch handling behavior */
            {},
            /* test blob sha match handling behavior */
            /* test file update handling behavior */
            { path: 'bb/cc', sha: 'e69de29bb2d1d6434b8b29ae775ad8c2e48c5391' },
            /* test blob sha mismatch handling behavior */
            { path: 'bb/cc' }
          ]));
        };
        local.modeCliDict_githubContentsFilePush(process.argv, function (error) {
          exports.testTryCatch(function () {
            /* assert no error occurred */
            exports.assert(!error, error);
          }, onEventError);
        });
        onEventError();
      });
    },

    modeCliDict_npmInstall: function () {
      /*
        this function runs after npm install
      */
      /* re-init builtin files with the install flag */
      local._initFile();
    },

    modeCliDict_npmTest: function () {
      /*
        this function runs npm test
      */
      /* merge previous test report into current test */
      if (state.modeTestReportMerge) {
        exports.testReportMerge(
          state.testReport,
          JSON.parse(required.fs.readFileSync('.build/test-report.json'))
        );
      }
      exports.testRun(state.testReport);
    },

    _replParse: function (script) {
      /*
        this function parses repl stdin
      */
      var match;
      /* (foo\n) -> foo */
      match = (/^\((.*)\n\)/).exec(script);
      if (!match) {
        return script;
      }
      script = match[1];
      /* parse '@@' syntax sugar */
      while (true) {
        match = (/(.*\w)@@(.*)/).exec(script);
        if (!match) {
          break;
        }
        script = match[1] + '( ' + match[2] + ')';
      }
      match = (/([^ ]*)(.*)/).exec(script);
      if (state.replParseDict[match[1]]) {
        return state.replParseDict[match[1]](match[2]);
      }
      /* foo -> (foo\n) */
      return '(' + script + '\n)';
    },

    replParseDict_$: function (arg2) {
      /*
        this function runs shell commands from the repl interpreter
      */
      exports.shell({
        argv: ['/bin/bash', '-c', exports.textFormat(arg2, state)],
        modeDebug: false
      });
    },

    replParseDict_print: function (arg2) {
      /*
        this function prints arg2 in stringified form from the repl interpreter
      */
      return '(console.log(String(' + arg2 + '))\n)';
    },

    'serverHandlerDict_/': function (request, response, next) {
      if (request.urlPathNormalized === '/') {
        exports.serverRespondDefault(response, 200);
        return;
      }
      next();
    },

    'serverHandlerDict_/public/main.js': function (_, response, next) {
      exports.nop(_);
      exports.serverRespondScript(response, 200, next, exports.__filename);
    },

    'serverHandlerDict_/public/utility.css': function (_, response) {
      exports.nop(_);
      exports.serverRespondData(
        response,
        200,
        'text/css',
        state.fileDict['/public/utility.css'].content
      );
    },

    'serverHandlerDict_/public/utility.js': function (_, response, next) {
      exports.nop(_);
      exports.serverRespondScript(response, 200, next, __dirname + '/utility.js');
    },

    'serverHandlerDict_/test/hello.json': function (_, response) {
      exports.nop(_);
      exports.serverRespondData(response, 200, 'application/json', '"hello"');
    },

    'serverHandlerDict_/test/test.html': function (_, response) {
      exports.nop(_);
      exports.serverRespondData(response, 200, 'text/html', exports.textFormat(
        state.fileDict['/test/test.html'].content,
        { name: state.packageJson.name }
      ));
    },

    serverMiddleware: function (request, response, next) {
      var mode, onEventError2, path;
      mode = 0;
      onEventError2 = function () {
        mode += 1;
        switch (mode) {
        case 1:
          /* debug server request */
          state.debugServerRequest = request;
          /* debug server response */
          state.debugServerResponse = response;
          /* security - validate request url path */
          if (request.urlPathNormalized) {
            onEventError2();
            return;
          }
          path = request.url;
          /* security - enforce max url length */
          if (path.length <= 4096) {
            /* get base path without search params */
            path = (/[^#&?]*/).exec(path)[0];
            if (path &&
                /* security - enforce max path length */
                path.length <= 256 &&
                /* security - disallow relative path */
                !(/\.\/|\.$/).test(path)) {
              /* dyanamic path handler */
              request.urlPathNormalized = required.path.resolve(path);
              onEventError2();
              return;
            }
          }
          next(new Error('serverMiddleware - invalid url ' + path));
          break;
        case 2:
          path = request.urlPathNormalized;
          /* walk up parent path */
          while (!(state.serverHandlerDict[path] || path === '/')) {
            path = required.path.dirname(path);
          }
          /* found a handler matching request path */
          if (state.serverHandlerDict[path]) {
            /* debug server request handler */
            state.debugServerHandler = state.serverHandlerDict[path];
            /* process request with error handling */
            try {
              onEventError2();
            } catch (error) {
              next(error);
            }
          /* else move on to next middleware */
          } else {
            next();
          }
          break;
        case 3:
          state.serverHandlerDict[path](request, response, next);
          break;
        }
      };
      onEventError2();
    },

    serverRespondDefault: function (response, statusCode, error) {
      /*
        this function responds with a default message or error stack for the given statusCode
      */
      /* set response / statusCode / contentType */
      exports.serverRespondWriteHead(response, statusCode, { 'content-type': 'text/plain' });
      /* end response with error stack */
      if (error) {
        exports.onEventErrorDefault(error);
        response.end(exports.errorStack(error));
        return;
      }
      /* end response with default statusCode message */
      response.end(statusCode + ' ' +
        (required.http.STATUS_CODES[statusCode] || 'Unknown Status Code'));
    },

    serverRespondData: function (response, statusCode, contentType, data) {
      /*
        this function responds with the given data
      */
      /* set response / statusCode / contentType */
      exports.serverRespondWriteHead(response, statusCode, { 'content-type': contentType });
      /* end response with data */
      response.end(data);
    },

    serverRespondScript: function (response, statusCode, next, file) {
      /*
        this function responds with javascript file parsed for the browser
      */
      required.fs.readFile(file, 'utf8', function (error, script) {
        if (error) {
          next(error);
          return;
        }
        script = script
          /* remove hashbang */
          .replace((/^#!/), '//#!')
          /* remove nodejs modules */
          .replace(
            (/^\(function subModule\w*Nodejs\(\) \{[\S\s]*?^\}\(\)\);$/gm),
            function (match) {
              /* preserve lineno */
              return match.replace((/.*/g), '');
            }
          )
          .trimRight();
        /* instrument script */
        if (required.istanbul_instrumenter) {
          script = required.istanbul_instrumenter.instrumentSync(script, file);
        }
        exports.serverRespondData(response, statusCode, 'application/javascript', script);
      });
    },

    serverRespondWriteHead: function (response, statusCode, headers) {
      /*
        this function sets the response object's statusCode / headers
      */
      if (!response.headersSent) {
        /* set response.statusCode */
        response.statusCode = statusCode || response.statusCode;
        Object.keys(headers).forEach(function (key) {
          /* set only truthy headers */
          if (headers[key]) {
            response.setHeader(key, headers[key]);
          }
        });
      }
    },

    shell: function (options) {
      /*
        this function executes shell scripts with timeout handling
      */
      var child, timeoutPid;
      /* init options.stdio */
      options.stdio = options.stdio || ['ignore', 1, 2];
      /* spawn shell in child process */
      child = required.child_process.spawn(options.argv[0], options.argv.slice(1), options);
      /* set timeout for shell */
      timeoutPid = exports.unref(required.child_process.spawn('/bin/sh', ['-c', 'sleep '
        + ((options.timeout || state.timeoutDefault) / 1000) + '; kill ' + child.pid
        + ' 2>/dev/null'], { stdio: 'ignore' })).pid;
      /* debug shell exit code */
      child
        /* handle error event */
        .on('error', exports.onEventErrorDefault)
        /* handle exit event */
        .on('exit', function (exitCode) {
          try {
            /* kill timeoutPid */
            process.kill(timeoutPid);
          } catch (ignore) {
          }
          console.log('shell - process ' + child.pid + ' exited with code ' + exitCode);
        });
      /* debug shell options */
      if (options.modeDebug !== false) {
        console.log('shell - options', options);
      }
      return child;
    },

    unref: function (obj) {
      /*
        this function unref's the object under nodejs
      */
      if (obj && obj.unref) {
        obj.unref();
      }
      return obj;
    }

  };
  local._init();
}());
