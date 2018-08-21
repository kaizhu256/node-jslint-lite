/* istanbul instrument in package jslint */
/* jslint-utility2 */
/*jslint
    bitwise: true,
    browser: true,
    maxerr: 4,
    maxlen: 100,
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
        // init isBrowser
        local.isBrowser = typeof window === "object" &&
            typeof window.XMLHttpRequest === "function" &&
            window.document &&
            typeof window.document.querySelectorAll === "function";
        // init global
        local.global = local.isBrowser
            ? window
            : global;
        // re-init local
        local = local.global.local = (local.global.utility2 ||
            require('utility2')).requireReadme();
        // init test
        local.testRunDefault(local);
    }());



    // run shared js-env code - function
    (function () {
        local.testCase_jslintAndPrint_default = function (options, onError) {
        /*
         * this function will test jslintAndPrint's default handling-behavior
         */
            local.testMock([
                [local.jslint, { errorList: [] }]
            ], function (onError) {
                // test null-case handling-behavior
                local.jslint.jslintAndPrint('', 'empty.css');
                // validate no error occurred
                local.assert(!local.jslint.errorText, local.jslint.errorText);
                // test whitespace handling-behavior
                local.jslint.jslintAndPrint(' ', 'whitespace.txt');
                // validate error occurred
                local.assert(local.jslint.errorText, local.jslint.errorText);
                // test csslint's failed handling-behavior
                [
                    // test syntax-error handling-behavior
                    'syntax error',
                    // test whitespace-before-comma handling-behavior
                    '.aa ,\nbb {\n    display: block;\n}',
                    // test double-whitespace handling-behavior
                    '.aa  {\n    display: block;\n}',
                    // test multi-line-statement handling-behavior
                    '.aa { display: block; }',
                    // test validateLineSorted1 handling-behavior
                    '.bb,\n.aa {\n    display: block;\n}',
                    // test validateLineSorted2 handling-behavior
                    '.bb {\n    display: block;\n}\n.aa {\n    display: block;\n}'
                ].forEach(function (script) {
                    script += '\n/* jslint-utility2 */\n';
                    local.jslint.jslintAndPrint(script, 'failed.css');
                    // validate error occurred
                    local.assert(local.jslint.errorText, JSON.stringify(script));
                });
                // test csslint's passed handling-behavior
                [
                    // test passed handling-behavior
                    '.aa {\n    display: block;\n}',
                    // test /* validateLineSortedReset */ handling-behavior
                    '.bb {\n    display: block;\n}\n' +
                        '/* validateLineSortedReset */\n' +
                        '.aa {\n    display: block;\n}'
                ].forEach(function (script) {
                    script += '\n/* jslint-utility2 */\n';
                    local.jslint.jslintAndPrint(script, 'passed.css');
                    // validate no error occurred
                    local.assert(!local.jslint.errorText, local.jslint.errorText);
                });
                // test jslint's failed handling-behavior
                [
                    // test syntax-error handling-behavior
                    'syntax error',
                    // test validateLineSorted-error1 handling-behavior
                    '(function () {\n    \"use strict\";\n    var local;\n' +
                        '    local = {};\n    local.bb = null;\n    local.aa = null;\n}());',
                    // test validateLineSorted-error2 handling-behavior
                    '(function () {\n    \"use strict\";\n    var local;\n' +
                        '    local = {};\n    local.aa = "class=\\"bb aa\\"";\n}());'
                ].forEach(function (script) {
                    script += '\n/* jslint-utility2 */\n/*jslint */\n';
                    local.jslint.jslintAndPrint(script, 'failed.js');
                    // validate error occurred
                    local.assert(local.jslint.errorText, JSON.stringify(script));
                });
                // test jslint's passed handling-behavior
                [
                    // test passed handling-behavior
                    'var aa = 1;',
                    // test /* jslint-ignore-begin */ ... /* jslint-ignore-end */ handling-behavior
                    '/* jslint-ignore-begin */\nsyntax error\n/* jslint-ignore-end */',
                    // test /* jslint-ignore-next-line */ ... handling-behavior
                    '/* jslint-ignore-next-line */\nsyntax error',
                    // test example.js
                    local.assetsDict['/assets.example.template.js']
                ].forEach(function (script) {
                    script += '\n/* jslint-utility2 */\n';
                    local.jslint.jslintAndPrint(script, 'passed.js');
                    // validate no error occurred
                    local.assert(!local.jslint.errorText, local.jslint.errorText);
                });
                // test shlint's failed handling-behavior
                [
                    // test indent handling-behavior
                    ' aa',
                    // test trailing-whitespace handling-behavior
                    'aa ',
                    // test tab handling-behavior
                    'aa\tbb',
                    // test validateLineSorted handling-behavior
                    'shBb () {\n    return;\n}\nshAa () {\n    return;\n}'
                ].forEach(function (script) {
                    script += '\n# jslint-utility2\n';
                    local.jslint.jslintAndPrint(script, 'failed.sh');
                    // validate error occurred
                    local.assert(local.jslint.errorText, JSON.stringify(script));
                });
                // test shlint's passed handling-behavior
                [
                    // test validateLineSorted handling-behavior
                    'shAa () {\n    return;\n}\nshBb () {\n    return;\n}'
                ].forEach(function (script) {
                    script += '\n# jslint-utility2\n';
                    local.jslint.jslintAndPrint(script, 'passed.sh');
                    // validate no error occurred
                    local.assert(!local.jslint.errorText, local.jslint.errorText);
                });
                onError(null, options);
            }, onError);
        };

        local.testCase_jslintAndPrint_es6 = function (options, onError) {
        /*
         * this function will test jslintAndPrint's es6 handling-behavior
         */
            local.testMock([
                [local.jslint, { errorList: [] }]
            ], function (onError) {
                // test jslint's failed handling-behavior
                local.jslint.jslintAndPrint('/*jslint es6: true*/\nsyntax error', 'failed.js');
                // validate error occurred
                local.assert(local.jslint.errorList.length, local.jslint.errorList.length);
                // test jslint's passed handling-behavior
                local.jslint.jslintAndPrint('/*jslint es6: true*/\nconst aa = 1;', 'passed.js');
                // validate no error occurred
                local.assert(!local.jslint.errorList.length, local.jslint.errorList.length);
                onError(null, options);
            }, onError);
        };
    }());
}());
