/*jslint
    browser: true,
    maxerr: 4, maxlen: 80,
    node: true, nomen: true,
    stupid: true,
*/
(function () {
    /*
    this function will test this module
    */
    'use strict';
    var app;



    // run shared js-env code
    (function () {
        // init app
        app = {};
        app.modeJs = (function () {
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
        app.jslint_lite = app.modeJs === 'browser'
            ? window.jslint_lite
            : require('./index.js');
        app.utility2 = app.modeJs === 'browser'
            ? window.utility2
            : require('utility2');
        // init tests
        app._jslintAndPrint_default_test = function (onError) {
            /*
            this function will test jslintAndPrint's default handling behavior
            */
            app.utility2.testMock([
                // suppress console.error
                [console, { error: app.utility2.nop }]
            ], onError, function (onError) {
                // test csslint failed handling behavior
                app.jslint_lite.jslintAndPrint('syntax error', 'failed.css');
                // validate error occurred
                app.utility2.assert(
                    app.jslint_lite.errorText,
                    app.jslint_lite.errorText
                );
                // test jslint failed handling behavior
                app.jslint_lite.jslintAndPrint('syntax error', 'failed.js');
                // validate error occurred
                app.utility2.assert(
                    app.jslint_lite.errorText,
                    app.jslint_lite.errorText
                );
                // test csslint passed handling behavior
                app.jslint_lite.jslintAndPrint(
                    'body { font: normal; }',
                    'passed.css'
                );
                // validate no error occurred
                app.utility2.assert(
                    !app.jslint_lite.errorText,
                    app.jslint_lite.errorText
                );
                // test jslint passed handling behavior
                app.jslint_lite.jslintAndPrint('{}', 'passed.js');
                // validate no error occurred
                app.utility2.assert(
                    !app.jslint_lite.errorText,
                    app.jslint_lite.errorText
                );
                // test /* jslint-ignore-begin */ ... /* jslint-ignore-end */
                // handling behavior
                app.jslint_lite.jslintAndPrint('/* jslint-ignore-begin */\n' +
                    'syntax error\n' +
                    '/* jslint-ignore-end */\n', 'passed.js');
                // validate no error occurred
                app.utility2.assert(
                    !app.jslint_lite.errorText,
                    app.jslint_lite.errorText
                );
                onError();
            });
        };
    }());
    switch (app.modeJs) {



    // run browser js-env code
    case 'browser':
        // export app
        window.app = app;
        // run test
        app.utility2.testRun(app);
        break;



    // run node js-env code
    case 'node':
        // export app
        global.app = app;
        // require modules
        app.jslint_lite = require('./index.js');
        app.fs = require('fs');
        app.path = require('path');
        app.utility2 = require('utility2');
        // init tests
        app._ajax_404_test = function (onError) {
            /*
            this function will test ajax's 404 http statusCode handling behavior
            */
            // test '/test/undefined'
            app.utility2.ajax({
                url: '/test/undefined'
            }, function (error) {
                app.utility2.testTryCatch(function () {
                    // validate error occurred
                    app.utility2.assert(error instanceof Error, error);
                    // validate 404 http statusCode
                    app.utility2.assert(
                        error.statusCode === 404,
                        error.statusCode
                    );
                    onError();
                }, onError);
            });
        };
        app._testPage_default_test = function (onError) {
            /*
            this function will test the test-page's default handling behavior
            */
            app.utility2.phantomTest({
                url: 'http://localhost:' +
                    app.utility2.envDict.npm_config_server_port +
                    '?modeTest=phantom&' +
                    '_testSecret={{_testSecret}}&' +
                    'timeoutDefault=' + app.utility2.timeoutDefault
            }, onError);
        };
        // init assets
        app['/'] =
            app.utility2.textFormat(app.utility2.fs
                .readFileSync(__dirname + '/README.md', 'utf8')
                .replace(
                    (/[\S\s]+?(<!DOCTYPE html>[\S\s]+?<\/html>)[\S\s]+/),
                    '$1'
                )
                .replace(
                    (/\\n' \+(\s*?)'/g),
                    '$1'
                ), { envDict: app.utility2.envDict });
        app['/assets/jslint-lite.js'] =
            app.utility2.istanbulInstrumentInPackage(
                app.jslint_lite['/assets/jslint-lite.js'],
                __dirname + '/index.js',
                'jslint-lite'
            );
        app['/assets/utility2.css'] =
            app.utility2['/assets/utility2.css'];
        app['/assets/utility2.js'] =
            app.utility2['/assets/utility2.js'];
        app['/test/test.js'] =
            app.utility2.istanbulInstrumentInPackage(
                app.utility2.fs.readFileSync(__filename, 'utf8'),
                __filename,
                'jslint-lite'
            );
        // init server-middlewares
        app.serverMiddlewareList = [
            function (request, response, onNext) {
                /*
                this function will run the main test-middleware
                */
                switch (request.urlPathNormalized) {
                // serve assets
                case '/':
                case '/assets/jslint-lite.js':
                case '/assets/utility2.css':
                case '/assets/utility2.js':
                case '/test/test.js':
                    response.end(app[request.urlPathNormalized]);
                    break;
                // default to next middleware
                default:
                    onNext();
                }
            }
        ];
        // run server-test
        app.utility2.testRunServer(app);
        // init dir
        app.fs.readdirSync(__dirname).forEach(function (file) {
            file = __dirname + '/' + file;
            switch (app.path.extname(file)) {
            case '.js':
            case '.json':
                // jslint the file
                app.jslint_lite.jslintAndPrint(
                    app.fs.readFileSync(file, 'utf8'),
                    file
                );
                break;
            }
            // if the file is modified, then restart the process
            app.utility2.onFileModifiedRestart(file);
        });
        // init repl debugger
        app.utility2.replStart({});
        break;
    }
}());
