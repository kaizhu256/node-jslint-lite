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
            local = (module.utility2 || require('utility2')).requireExampleJsFromReadme({
                __dirname: __dirname,
                module: module,
                moduleExports: __dirname + '/index.js',
                moduleName: 'jslint-lite'
            });
            break;
        }
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
                // test csslint failed handling-behavior
                local.jslint.jslintAndPrint('syntax error', 'failed.css');
                // validate error occurred
                local.utility2.assert(local.jslint.errorText, local.jslint.errorText);
                // test csslint passed handling-behavior
                local.jslint.jslintAndPrint('body { font: normal; }', 'passed.css');
                // validate no error occurred
                local.utility2.assert(!local.jslint.errorText, local.jslint.errorText);
                // test csslint flexbox handling-behavior
                local.jslint.jslintAndPrint('body { display: flex; }', 'passed.css');
                // validate no error occurred
                local.utility2.assert(!local.jslint.errorText, local.jslint.errorText);
                // test jslint failed handling-behavior
                local.jslint.jslintAndPrint('syntax error', 'failed.js');
                // validate error occurred
                local.utility2.assert(local.jslint.errorText, local.jslint.errorText);
                // test jslint passed handling-behavior
                local.jslint.jslintAndPrint('{}', 'passed.js');
                // validate no error occurred
                local.utility2.assert(!local.jslint.errorText, local.jslint.errorText);
                // test /* jslint-ignore-begin */ ... /* jslint-ignore-end */
                // handling-behavior
                local.jslint.jslintAndPrint('/* jslint-ignore-begin */\n' +
                    'syntax error\n' +
                    '/* jslint-ignore-end */\n', 'passed.js');
                // validate no error occurred
                local.utility2.assert(!local.jslint.errorText, local.jslint.errorText);
                // test /* jslint-ignore-next-line */ ...
                // handling-behavior
                local.jslint.jslintAndPrint('/* jslint-ignore-next-line */\n' +
                    'syntax error\n', 'passed.js');
                // validate no error occurred
                local.utility2.assert(!local.jslint.errorText, local.jslint.errorText);
                // test /* jslint-indent-begin */ ... /* jslint-indent-end */
                // handling-behavior
                local.jslint.jslintAndPrint('(function () {\n' +
                    '    "use strict";\n' +
                    '/* jslint-indent-begin 4 */\n' +
                    'String();\n' +
                    '/* jslint-indent-end */\n' +
                    '}());\n', 'passed.js');
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
                file: '/assets.app.js',
                url: '/assets.app.js'
            }, {
                file: '/assets.app.min.js',
                url: '/assets.app.min.js'
            }, {
                file: '/assets.example.js',
                url: '/assets.example.js'
            }, {
                file: '/assets.' + local.utility2.envDict.npm_package_name + '.css',
                url: '/assets.' + local.utility2.envDict.npm_package_name + '.css'
            }, {
                file: '/assets.' + local.utility2.envDict.npm_package_name + '.js',
                url: '/assets.' + local.utility2.envDict.npm_package_name + '.js'
            }, {
                file: '/assets.' + local.utility2.envDict.npm_package_name + '.min.js',
                transform: function (data) {
                    return local.utility2.uglifyIfProduction(
                        local.utility2.bufferToString(data)
                    );
                },
                url: '/assets.' + local.utility2.envDict.npm_package_name + '.js'
            }, {
                file: '/assets.test.js',
                url: '/assets.test.js'
            }, {
                file: '/assets.utility2.rollup.js',
                url: '/assets.utility2.rollup.js'
            }, {
                file: '/index.html',
                url: '/index.html'
            }, {
                file: '/jsonp.utility2.stateInit',
                url: '/jsonp.utility2.stateInit?callback=window.utility2.stateInit'
            }];
            options.forEach(function (options) {
                onParallel.counter += 1;
                local.utility2.ajax(options, function (error, xhr) {
                    onParallel.counter += 1;
                    // validate no error occurred
                    onParallel(error);
                    switch (local.path.extname(options.file)) {
                    case '.css':
                    case '.js':
                    case '.json':
                        local.utility2.jslintAndPrintConditional(
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
                        (options.transform || local.utility2.echo)(xhr.response),
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



    /* istanbul ignore next */
    // run node js-env code - post-init
    case 'node':
        // run test-server
        local.utility2.testRunServer(local);
        // init repl debugger
        local.utility2.replStart();
        if (module !== require.main || module.isRollup) {
            break;
        }
        // init assets
        local.utility2.assetsDict['/assets.app.js'] = [
            'header',
            '/assets.utility2.rollup.js',
            'local.utility2.stateInit',
            '/assets.jslint-lite.js',
            '/assets.example.js',
            '/assets.test.js'
        ].map(function (key) {
            switch (key) {
/* jslint-ignore-begin */
case 'header':
return '\
/*\n\
assets.app.js\n\
\n' + local.utility2.envDict.npm_package_description + '\n\
\n\
instruction\n\
    1. save this script as assets.app.js\n\
    2. run the shell command:\n\
        $ PORT=8081 node assets.app.js\n\
    3. open a browser to http://localhost:8081\n\
    4. edit or paste script in browser to jslint and csslint\n\
*/\n\
';
/* jslint-ignore-end */
            case 'local.utility2.stateInit':
                return '// ' + key + '\n' +
                    local.utility2.assetsDict['/assets.utility2.rollup.content.js']
                    .replace(
                        '/* utility2.rollup.js content */',
                        key + '(' + JSON.stringify(
                            local.utility2.middlewareJsonpStateInit({ stateInit: true })
                        ) + ');'
                    );
            default:
                return '// ' + key + '\n' + local.utility2.assetsDict[key];
            }
        }).join('\n\n\n\n');
        local.utility2.assetsDict['/assets.app.min.js'] =
            local.utility2.uglifyIfProduction(local.utility2.assetsDict['/assets.app.js']);
        break;
    }
}());
