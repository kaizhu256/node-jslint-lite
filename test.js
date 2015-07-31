/*jslint
    browser: true,
    maxerr: 8,
    maxlen: 96,
    node: true,
    nomen: true,
    stupid: true
*/
(function (local) {
    'use strict';



    // run shared js-env code
    (function () {
        // init tests
        local.testCase_jslintAndPrint_default = function (options, onError) {
            /*
             * this function will test jslintAndPrint's default handling-behavior
             */
            // jslint-hack
            local.utility2.nop(options);
            local.utility2.testMock([
                // suppress console.error
                [console, { error: local.utility2.nop }]
            ], function (onError) {
                // test csslint failed handling-behavior
                local.jslint_lite.jslintAndPrint('syntax error', 'failed.css');
                // validate error occurred
                local.utility2.assert(
                    local.jslint_lite.errorText,
                    local.jslint_lite.errorText
                );
                // test jslint failed handling-behavior
                local.jslint_lite.jslintAndPrint('syntax error', 'failed.js');
                // validate error occurred
                local.utility2.assert(
                    local.jslint_lite.errorText,
                    local.jslint_lite.errorText
                );
                // test csslint passed handling-behavior
                local.jslint_lite.jslintAndPrint(
                    'body { font: normal; }',
                    'passed.css'
                );
                // validate no error occurred
                local.utility2.assert(
                    !local.jslint_lite.errorText,
                    local.jslint_lite.errorText
                );
                // test jslint passed handling-behavior
                local.jslint_lite.jslintAndPrint('{}', 'passed.js');
                // validate no error occurred
                local.utility2.assert(
                    !local.jslint_lite.errorText,
                    local.jslint_lite.errorText
                );
                // test /* jslint-ignore-begin */ ... /* jslint-ignore-end */
                // handling-behavior
                local.jslint_lite.jslintAndPrint('/* jslint-ignore-begin */\n' +
                    'syntax error\n' +
                    '/* jslint-ignore-end */\n', 'passed.js');
                // validate no error occurred
                local.utility2.assert(
                    !local.jslint_lite.errorText,
                    local.jslint_lite.errorText
                );
                onError();
            }, onError);
        };
    }());
    switch (local.modeJs) {



    // run node js-env code
    case 'node':
        // init tests
        local.testCase_cliRun_default = function (options, onError) {
            /*
             * this function will test cliRun's default handling-behavior
             */
            // jslint-hack
            local.utility2.nop(options);
            local.utility2.testMock([
                [process, {
                    argv: [
                        '',
                        '',
                        // test no jslint handling-behavior
                        '-',
                        // test jslint handling-behavior
                        __filename
                    ],
                    exit: local.utility2.nop
                }]
            ], function (onError) {
                local.jslint_lite.local.cliRun({ run: true });
                onError();
            }, onError);
        };

        local.testCase_testPage_default = function (options, onError) {
            /*
             * this function will test the test-page's default handling-behavior
             */
            var onParallel;
            // jslint-hack
            local.utility2.nop(options);
            onParallel = local.utility2.onParallel(onError);
            onParallel.counter += 1;
            // test test-page handling-behavior
            onParallel.counter += 1;
            local.utility2.phantomTest({
                url: 'http://localhost:' +
                    local.utility2.envDict.npm_config_server_port +
                    '?modeTest=phantom&timeExit={{timeExit}}'
            }, onParallel);
            // test script-only handling-behavior
            onParallel.counter += 1;
            local.utility2.phantomTest({
                url: 'http://localhost:' +
                    local.utility2.envDict.npm_config_server_port +
                    '/test/script-only.html' +
                    '?modeTest=phantom&timeExit={{timeExit}}'
            }, onParallel);
            onParallel();
        };
        break;
    }
    switch (local.modeJs) {



    // run browser js-env code
    case 'browser':
        // run test
        local.utility2.testRun(local);
        break;



    // run node js-env code
    case 'node':
        // init assets
        local.utility2.cacheDict.assets['/'] =
            local.utility2.cacheDict.assets['/test/test.html'] =
            local.utility2.stringFormat(local.fs
                .readFileSync(__dirname + '/README.md', 'utf8')
                // extract html
                .replace((/[\S\s]+?(<!DOCTYPE html>[\S\s]+?<\/html>)[\S\s]+/), '$1')
                // parse '\' line-continuation
                .replace((/\\\n/g), '')
                // remove "\\n' +" and "'"
                .replace((/\\n' \+(\s*?)'/g), '$1'), { envDict: local.utility2.envDict }, '');
        local.utility2.cacheDict.assets['/assets/jslint-lite.js'] =
            local.utility2.istanbul_lite.instrumentInPackage(
                local.jslint_lite['/assets/jslint-lite.js'],
                __dirname + '/index.js',
                'jslint-lite'
            );
        local.utility2.cacheDict.assets['/test/script-only.html'] =
            '<h1>script-only test</h1>\n' +
            '<script src="/assets/utility2.js"></script>\n' +
            '<script src="/assets/jslint-lite.js"></script>\n' +
            '<script>window.jslint_lite.jslintTextarea()</script>\n' +
            '<script src="/test/test.js"></script>\n';
        local.utility2.cacheDict.assets['/test/test.js'] =
            local.utility2.istanbul_lite.instrumentInPackage(
                local.fs.readFileSync(__filename, 'utf8'),
                __filename,
                'jslint-lite'
            );
        // init middleware
        local.middleware = local.utility2.middlewareGroupCreate([
            local.utility2.middlewareInit,
            local.utility2.middlewareAssetsCached
        ]);
        // init error-middleware
        local.middlewareError = local.utility2.middlewareError;
        // run server-test
        local.utility2.testRunServer(local);
        // jslint dir
        [
            __dirname
        ].forEach(function (dir) {
            local.fs.readdirSync(dir).forEach(function (file) {
                file = dir + '/' + file;
                // if the file is modified, then restart the process
                local.utility2.onFileModifiedRestart(file);
                switch (local.path.extname(file)) {
                case '.js':
                case '.json':
                    // jslint file
                    local.utility2.jslint_lite
                        .jslintAndPrint(local.fs.readFileSync(file, 'utf8'), file);
                    break;
                }
            });
        });
        // init repl debugger
        local.utility2.replStart();
        break;
    }
}((function () {
    'use strict';
    var local;



    // run shared js-env code
    (function () {
        // init local
        local = {};
        local.modeJs = (function () {
            try {
                return module.exports &&
                    typeof process.versions.node === 'string' &&
                    typeof require('http').createServer === 'function' &&
                    'node';
            } catch (errorCaughtNode) {
                return typeof navigator.userAgent === 'string' &&
                    typeof document.querySelector('body') === 'object' &&
                    'browser';
            }
        }());
        // init global
        local.global = local.modeJs === 'browser'
            ? window
            : global;
        // export local
        local.global.local = local;
        // init utility2
        local.utility2 = local.modeJs === 'browser'
            ? window.utility2
            : require('utility2');
        // init onReady
        local.utility2.onReadyInit();
        // init jslint_lite
        local.jslint_lite = local.modeJs === 'browser'
            ? window.jslint_lite
            : require('./index.js');
        // import jslint_lite.local
        Object.keys(local.jslint_lite.local).forEach(function (key) {
            local[key] = local[key] || local.jslint_lite.local[key];
        });
    }());
    return local;
}())));
