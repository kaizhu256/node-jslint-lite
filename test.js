/* istanbul instrument in package jslint */
/*jslint
    bitwise: true,
    browser: true,
    maxerr: 8,
    maxlen: 96,
    node: true,
    nomen: true,
    regexp: true,
    stupid: true
*/
(function () {
    'use strict';
    var local;



    // run shared js-env code - init-before
    (function () {
        // init local
        local = {};
        // init modeJs
        local.modeJs = (function () {
            try {
                return typeof navigator.userAgent === 'string' &&
                    typeof document.querySelector('body') === 'object' &&
                    typeof XMLHttpRequest.prototype.open === 'function' &&
                    'browser';
            } catch (errorCaughtBrowser) {
                return module.exports &&
                    typeof process.versions.node === 'string' &&
                    typeof require('http').createServer === 'function' &&
                    'node';
            }
        }());
        // init global
        local.global = local.modeJs === 'browser'
            ? window
            : global;
        switch (local.modeJs) {
        // re-init local from window.local
        case 'browser':
            local = local.global.utility2.objectSetDefault(
                local.global.utility2_rollup || local.global.local,
                local.global.utility2
            );
            break;
        // re-init local from example.js
        case 'node':
            local = (local.global.utility2_rollup ||
                require('utility2')).requireReadme();
            break;
        }
        // init exports
        local.global.local = local;
    }());



    // run shared js-env code - function
    (function () {
        local.testCase_jslintAndPrint_default = function (options, onError) {
        /*
         * this function will test jslintAndPrint's default handling-behavior
         */
            options = [
                // suppress console.error
                [console, { error: local.nop }],
                [local.jslint, { errorText: '' }]
            ];
            local.testMock(options, function (onError) {
                // test empty-script handling-behavior
                local.jslint.jslintAndPrint('', 'empty.css');
                // validate no error occurred
                local.assert(!local.jslint.errorText, local.jslint.errorText);
                // test csslint's failed handling-behavior
                local.jslint.jslintAndPrint('syntax error', 'failed.css');
                // validate error occurred
                local.assert(local.jslint.errorText, local.jslint.errorText);
                // test csslint's passed handling-behavior
                local.jslint.jslintAndPrint('body { font: normal; }', 'passed.css');
                // validate no error occurred
                local.assert(!local.jslint.errorText, local.jslint.errorText);
                // test csslint's flexbox handling-behavior
                local.jslint.jslintAndPrint('body { display: flex; }', 'passed.css');
                // validate no error occurred
                local.assert(!local.jslint.errorText, local.jslint.errorText);
                // test jslint's failed handling-behavior
                local.jslint.jslintAndPrint('syntax error', 'failed.js');
                // validate error occurred
                local.assert(local.jslint.errorText, local.jslint.errorText);
                // test jslint's passed handling-behavior
                local.jslint.jslintAndPrint('var aa = 1;', 'passed.js');
                // validate no error occurred
                local.assert(!local.jslint.errorText, local.jslint.errorText);
                // test /* jslint-ignore-begin */ ... /* jslint-ignore-end */
                // handling-behavior
                local.jslint.jslintAndPrint('/* jslint-ignore-begin */\n' +
                    'syntax error\n' +
                    '/* jslint-ignore-end */\n', 'passed.js');
                // validate no error occurred
                local.assert(!local.jslint.errorText, local.jslint.errorText);
                // test /* jslint-ignore-next-line */ ...
                // handling-behavior
                local.jslint.jslintAndPrint('/* jslint-ignore-next-line */\n' +
                    'syntax error\n', 'passed.js');
                // validate no error occurred
                local.assert(!local.jslint.errorText, local.jslint.errorText);
                // test /* jslint-indent-begin */ ... /* jslint-indent-end */
                // handling-behavior
                local.jslint.jslintAndPrint('(function () {\n' +
                    '    "use strict";\n' +
                    '/* jslint-indent-begin 4 */\n' +
                    'String();\n' +
                    '/* jslint-indent-end */\n' +
                    '}());\n', 'passed.js');
                // validate no error occurred
                local.assert(!local.jslint.errorText, local.jslint.errorText);
                onError();
            }, onError);
        };

        local.testCase_jslintAndPrint_es6 = function (options, onError) {
        /*
         * this function will test jslintAndPrint's es6 handling-behavior
         */
            options = [
                // suppress console.error
                [console, { error: local.nop }],
                [local.jslint, { errorText: '' }]
            ];
            local.testMock(options, function (onError) {
                // test jslint's failed handling-behavior
                local.jslint.jslintAndPrint('/*jslint es6: true*/\nsyntax error', 'failed.js');
                // validate error occurred
                local.assert(local.jslint.errorText, local.jslint.errorText);
                // test jslint's passed handling-behavior
                local.jslint.jslintAndPrint('/*jslint es6: true*/\nconst aa = 1;', 'passed.js');
                // validate no error occurred
                local.assert(!local.jslint.errorText, local.jslint.errorText);
                onError();
            }, onError);
        };
    }());
    switch (local.modeJs) {



    // run browser js-env code - function
    case 'browser':
        break;



    // run node js-env code - function
    case 'node':
        break;
    }



    // run shared js-env code - init-after
    (function () {
        return;
    }());
    switch (local.modeJs) {



    // run browser js-env code - init-after
    case 'browser':
        local.testCase_browser_nullCase = local.testCase_browser_nullCase || function (
            options,
            onError
        ) {
        /*
         * this function will test browser's null-case handling-behavior-behavior
         */
            onError(null, options);
        };

        // run tests
        // coverage-hack - ignore else-statement
        local.nop(local.modeTest &&
            document.querySelector('#testRunButton1') &&
            document.querySelector('#testRunButton1').click());
        break;



    // run node js-env code - init-after
    /* istanbul ignore next */
    case 'node':
        local.testCase_buildApidoc_default = local.testCase_buildApidoc_default || function (
            options,
            onError
        ) {
        /*
         * this function will test buildApidoc's default handling-behavior-behavior
         */
            options = { modulePathList: module.paths };
            local.buildApidoc(options, onError);
        };

        local.testCase_buildApp_default = local.testCase_buildApp_default || function (
            options,
            onError
        ) {
        /*
         * this function will test buildApp's default handling-behavior-behavior
         */
            local.testCase_buildReadme_default(options, local.onErrorThrow);
            local.testCase_buildLib_default(options, local.onErrorThrow);
            local.testCase_buildTest_default(options, local.onErrorThrow);
            local.testCase_buildCustomOrg_default(options, local.onErrorThrow);
            options = [];
            local.buildApp(options, onError);
        };

        local.testCase_buildCustomOrg_default = local.testCase_buildCustomOrg_default ||
            function (options, onError) {
            /*
             * this function will test buildCustomOrg's default handling-behavior
             */
                options = {};
                local.buildCustomOrg(options, onError);
            };

        local.testCase_buildLib_default = local.testCase_buildLib_default || function (
            options,
            onError
        ) {
        /*
         * this function will test buildLib's default handling-behavior
         */
            options = {};
            local.buildLib(options, onError);
        };

        local.testCase_buildReadme_default = local.testCase_buildReadme_default || function (
            options,
            onError
        ) {
        /*
         * this function will test buildReadme's default handling-behavior-behavior
         */
            options = {};
            local.buildReadme(options, onError);
        };

        local.testCase_buildTest_default = local.testCase_buildTest_default || function (
            options,
            onError
        ) {
        /*
         * this function will test buildTest's default handling-behavior
         */
            options = {};
            local.buildTest(options, onError);
        };

        local.testCase_webpage_default = local.testCase_webpage_default || function (
            options,
            onError
        ) {
        /*
         * this function will test webpage's default handling-behavior
         */
            options = { modeCoverageMerge: true, url: local.serverLocalHost + '?modeTest=1' };
            local.browserTest(options, onError);
        };

        // run test-server
        local.testRunServer(local);
        break;
    }
}());
