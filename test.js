/* istanbul instrument in package jslint-lite */
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



    // run shared js-env code - pre-init
    (function () {
        // init Error.stackTraceLimit
        Error.stackTraceLimit = Infinity;
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
        switch (local.modeJs) {
        // re-init local from window.local
        case 'browser':
            local = window.local;
            local.utility2 = window.utility2;
            break;
        // re-init local from example.js
        case 'node':
            local = require('utility2').requireExampleJsFromReadme({
                __dirname: __dirname,
                moduleExports: require('./index.js'),
                moduleName: 'jslint-lite'
            }).exports;
            local.jslint = require('./index.js');
            break;
        }
        // coverage-hack - re-init jslintAndPrint
        local.utility2.jslintAndPrint = local.jslint.jslintAndPrint;
    }());



    // run shared js-env code - function
    (function () {
        // init tests
        local.testCase_jslintAndPrint_default = function (options, onError) {
        /*
         * this function will test jslintAndPrint's default handling-behavior
         */
            options = [
                // suppress console.error
                [console, { error: local.utility2.nop }],
                [local.jslint, { errorText: '' }]
            ];
            local.utility2.testMock(options, function (onError) {
                // test empty script handling-behavior
                local.jslint.jslintAndPrint('', 'empty.css');
                // validate no error occurred
                local.utility2.assert(!local.jslint.errorText, local.jslint.errorText);
                // test csslint passed handling-behavior
                local.jslint.jslintAndPrint('body { font: normal; }', 'passed.css');
                // validate no error occurred
                local.utility2.assert(!local.jslint.errorText, local.jslint.errorText);
                // test csslint failed handling-behavior
                local.jslint.jslintAndPrint('syntax error', 'failed.css');
                // validate error occurred
                local.utility2.assert(local.jslint.errorText, local.jslint.errorText);
                // test csslint flexbox handling-behavior
                local.jslint.jslintAndPrint('body { display: flex; }', 'passed.css');
                // validate no error occurred
                local.utility2.assert(!local.jslint.errorText, local.jslint.errorText);
                // test jslint passed handling-behavior
                local.jslint.jslintAndPrint('{}', 'passed.js');
                // validate no error occurred
                local.utility2.assert(!local.jslint.errorText, local.jslint.errorText);
                // test jslint failed handling-behavior
                local.jslint.jslintAndPrint('syntax error', 'failed.js');
                // validate error occurred
                local.utility2.assert(local.jslint.errorText, local.jslint.errorText);
                // test /* jslint-ignore-begin */ ... /* jslint-ignore-end */
                // handling-behavior
                local.jslint.jslintAndPrint('/* jslint-ignore-begin */\n' +
                    'syntax error\n' +
                    '/* jslint-ignore-end */\n', 'passed.js');
                // validate no error occurred
                local.utility2.assert(!local.jslint.errorText, local.jslint.errorText);
                onError();
            }, onError);
        };
    }());
    switch (local.modeJs) {



    // run node js-env code - function
    case 'node':
        local.testCase_build_app = function (options, onError) {
        /*
         * this function will test build's app handling-behavior
         */
            var onParallel;
            onParallel = local.utility2.onParallel(onError);
            onParallel.counter += 1;
            options = {};
            options = [{
                file: '/assets.example.js',
                url: '/assets.example.js'
            }, {
                file: '/assets.jslint-lite.js',
                url: '/assets.jslint-lite.js'
            }, {
                file: '/assets.test.js',
                url: '/assets.test.js'
            }, {
                file: '/assets.utility2.js',
                url: '/assets.utility2.js'
            }, {
                file: '/index.html',
                url: '/index.html'
            }, {
                file: '/jsonp.utility2.stateGet',
                url: '/jsonp.utility2.stateGet?callback=window.utility2.stateInit'
            }];
            options.forEach(function (options) {
                onParallel.counter += 1;
                local.utility2.ajax(options, function (error, xhr) {
                    onParallel.counter += 1;
                    // validate no error occurred
                    onParallel(error);
                    switch (local.path.extname(options.file)) {
                    case '.js':
                    case '.json':
                        local.utility2.jslintAndPrintIfNotCoverage(
                            xhr.responseText,
                            options.file
                        );
                        // validate no error occurred
                        local.utility2.tryCatchOnError(function () {
                            local.utility2.assert(
                                !local.utility2.jslint.errorText,
                                local.utility2.jslint.errorText
                            );
                        }, onError);
                        break;
                    }
                    local.utility2.fsWriteFileWithMkdirp(
                        local.utility2.envDict.npm_config_dir_build + '/app' + options.file,
                        xhr.response,
                        onParallel
                    );
                });
            });
            onParallel();
        };

        local.testCase_build_doc = function (options, onError) {
        /*
         * this function will test build's doc handling-behavior
         */
            var modeNext, onNext;
            modeNext = 0;
            onNext = function (error) {
                local.utility2.tryCatchOnError(function () {
                    // validate no error occurred
                    local.utility2.assert(!error, error);
                    modeNext += 1;
                    switch (modeNext) {
                    case 1:
                        options = {};
                        options.moduleDict = {
                            'jslint-lite': {
                                exampleList: [],
                                exports: local.jslint
                            }
                        };
                        Object.keys(options.moduleDict).forEach(function (key) {
                            options.moduleDict[key].example =
                                options.moduleDict[key].exampleList
                                .concat([
                                    'README.md',
                                    'test.js',
                                    'index.js'
                                ])
                                .map(function (file) {
                                    return '\n\n\n\n\n\n\n\n' +
                                        local.fs.readFileSync(file, 'utf8') +
                                        '\n\n\n\n\n\n\n\n';
                                }).join('');
                        });
                        // create doc.api.html
                        local.utility2.fsWriteFileWithMkdirp(
                            local.utility2.envDict.npm_config_dir_build + '/doc.api.html',
                            local.utility2.docApiCreate(options),
                            onNext
                        );
                        break;
                    case 2:
                        local.utility2.browserTest({
                            modeBrowserTest: 'screenCapture',
                            url: 'file://' + local.utility2.envDict.npm_config_dir_build +
                                '/doc.api.html'
                        }, onNext);
                        break;
                    default:
                        onError(error);
                    }
                }, onError);
            };
            onNext();
        };

        local.testCase_webpage_default = function (options, onError) {
        /*
         * this function will test the webpage's default handling-behavior
         */
            options = {
                modeCoverageMerge: true,
                url: local.utility2.serverLocalHost + '?modeTest=1'
            };
            local.utility2.browserTest(options, onError);
        };
        break;
    }
    switch (local.modeJs) {



    // run browser js-env code - post-init
    case 'browser':
        // run tests
        local.utility2.testRun(local);
        break;



    // run node js-env code - post-init
    case 'node':
        // init repl debugger
        local.utility2.replStart();
        // init assets
        local.utility2.jslintAndPrintHtml(local['/'], 'index.html');
        local.utility2.assetsDict['/assets.jslint-lite.js'] =
            local.utility2.istanbulInstrumentInPackage(
                local['/assets.jslint-lite.js'],
                process.cwd() + '/index.js'
            );
        // run test-server
        local.utility2.testRunServer(local);
        // debug dir
        [
            local.utility2.__dirname,
            __dirname
        ].forEach(function (dir) {
            local.fs.readdirSync(dir).forEach(function (file) {
                file = dir + '/' + file;
                // if the file is modified, then restart the process
                local.utility2.onFileModifiedRestart(file);
                switch (local.path.extname(file)) {
                // jslint file
                case '.css':
                case '.js':
                case '.json':
                    local.utility2.jslintAndPrint(local.fs.readFileSync(file, 'utf8'), file);
                    break;
                }
            });
        });
        break;
    }
}());
