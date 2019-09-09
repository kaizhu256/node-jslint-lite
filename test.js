/* istanbul instrument in package jslint */
/* istanbul ignore next */
/* jslint utility2:true */
(function (globalThis) {
    "use strict";
    let consoleError;
    let local;
    // init globalThis
    globalThis.globalThis = globalThis.globalThis || globalThis;
    // init debug_inline
    if (!globalThis["debug\u0049nline"]) {
        consoleError = console.error;
        globalThis["debug\u0049nline"] = function (...argList) {
        /*
         * this function will both print <argList> to stderr
         * and return <argList>[0]
         */
            // debug argList
            globalThis["debug\u0049nlineArgList"] = argList;
            consoleError("\n\ndebug\u0049nline");
            consoleError.apply(console, argList);
            consoleError("\n");
            // return arg0 for inspection
            return argList[0];
        };
    }
    // init local
    local = {};
    local.local = local;
    globalThis.globalLocal = local;
    // init isBrowser
    local.isBrowser = (
        typeof globalThis.XMLHttpRequest === "function"
        && globalThis.navigator
        && typeof globalThis.navigator.userAgent === "string"
    );
    // init function
    local.assertOrThrow = function (passed, message) {
    /*
     * this function will throw err.<message> if <passed> is falsy
     */
        let err;
        if (passed) {
            return;
        }
        err = (
            (
                message
                && typeof message.message === "string"
                && typeof message.stack === "string"
            )
            // if message is errObj, then leave as is
            ? message
            : new Error(
                typeof message === "string"
                // if message is a string, then leave as is
                ? message
                // else JSON.stringify message
                : JSON.stringify(message, null, 4)
            )
        );
        throw err;
    };
    local.fsRmrfSync = function (dir) {
    /*
     * this function will sync "rm -rf" <dir>
     */
        let child_process;
        try {
            child_process = require("child_process");
        } catch (ignore) {
            return;
        }
        child_process.spawnSync("rm", [
            "-rf", dir
        ], {
            stdio: [
                "ignore", 1, 2
            ]
        });
    };
    local.fsWriteFileWithMkdirpSync = function (file, data) {
    /*
     * this function will sync write <data> to <file> with "mkdir -p"
     */
        let fs;
        try {
            fs = require("fs");
        } catch (ignore) {
            return;
        }
        // try to write file
        try {
            fs.writeFileSync(file, data);
        } catch (ignore) {
            // mkdir -p
            require("child_process").spawnSync(
                "mkdir",
                [
                    "-p", require("path").dirname(file)
                ],
                {
                    stdio: [
                        "ignore", 1, 2
                    ]
                }
            );
            // rewrite file
            fs.writeFileSync(file, data);
        }
    };
    local.functionOrNop = function (fnc) {
    /*
     * this function will if <fnc> exists,
     * return <fnc>,
     * else return <nop>
     */
        return fnc || local.nop;
    };
    local.nop = function () {
    /*
     * this function will do nothing
     */
        return;
    };
    local.objectAssignDefault = function (target, source) {
    /*
     * this function will if items from <target> are
     * null, undefined, or empty-string,
     * then overwrite them with items from <source>
     */
        target = target || {};
        Object.keys(source || {}).forEach(function (key) {
            if (
                target[key] === null
                || target[key] === undefined
                || target[key] === ""
            ) {
                target[key] = target[key] || source[key];
            }
        });
        return target;
    };
    local.value = function (val) {
    /*
     * this function will return <val>
     */
        return val;
    };
    local.valueOrEmptyList = function (val) {
    /*
     * this function will return <val> or []
     */
        return val || [];
    };
    local.valueOrEmptyObject = function (val) {
    /*
     * this function will return <val> or {}
     */
        return val || {};
    };
    local.valueOrEmptyString = function (val) {
    /*
     * this function will return <val> or ""
     */
        return val || "";
    };
    // require builtin
    if (!local.isBrowser) {
        local.assert = require("assert");
        local.buffer = require("buffer");
        local.child_process = require("child_process");
        local.cluster = require("cluster");
        local.crypto = require("crypto");
        local.dgram = require("dgram");
        local.dns = require("dns");
        local.domain = require("domain");
        local.events = require("events");
        local.fs = require("fs");
        local.http = require("http");
        local.https = require("https");
        local.net = require("net");
        local.os = require("os");
        local.path = require("path");
        local.querystring = require("querystring");
        local.readline = require("readline");
        local.repl = require("repl");
        local.stream = require("stream");
        local.string_decoder = require("string_decoder");
        local.timers = require("timers");
        local.tls = require("tls");
        local.tty = require("tty");
        local.url = require("url");
        local.util = require("util");
        local.vm = require("vm");
        local.zlib = require("zlib");
    }
}((typeof globalThis === "object" && globalThis) || (function () {
    return Function("return this")(); // jslint ignore:line
}())));



(function (local) {
"use strict";



// run shared js-env code - init-before
(function () {
// init local
local = globalThis.globalLocal.value(
    globalThis.utility2 || require("utility2")
).requireReadme();
globalThis.local = local;
// init test
local.testRunDefault(local);
}());



// run shared js-env code - function
(function () {
local._testCase_jslintAndPrintConditional_default = function (opt, onError) {
/*
 * this function will test jslintAndPrintConditional's default handling-behavior
 */
    local.testMock([
        [
            local.jslint, {
                errMsg: ""
            }
        ]
    ], function (onError) {
        // test no csslint handling-behavior
        local.jslintAndPrintConditional("no csslint", "empty.css");
        // validate no err occurred
        local.assertOrThrow(!local.jslint.errMsg, local.jslint.errMsg);
        // test csslint passed handling-behavior
        local.jslintAndPrintConditional(
            "/*csslint*/\nbody { display: block; }",
            "passed.css",
            "force"
        );
        // validate no err occurred
        local.assertOrThrow(!local.jslint.errMsg, local.jslint.errMsg);
        // test no jslint handling-behavior
        local.jslintAndPrintConditional("no jslint", "empty.js");
        // validate no err occurred
        local.assertOrThrow(!local.jslint.errMsg, local.jslint.errMsg);
        // test jslint passed handling-behavior
        local.jslintAndPrintConditional(
            "/*jslint node: true*/\nconsole.log(\"aa\");",
            "passed.js",
            "force"
        );
        // validate no err occurred
        local.assertOrThrow(!local.jslint.errMsg, local.jslint.errMsg);
        onError(null, opt);
        // test no shlint handling-behavior
        local.jslintAndPrintConditional("no shlint", "empty.sh");
        // validate no err occurred
        local.assertOrThrow(!local.jslint.errMsg, local.jslint.errMsg);
        // test shlint passed handling-behavior
        local.jslintAndPrintConditional((
            "# jslint utility2:true\n"
            + "shAa () {\n"
            + "    node -e \"\n"
            + "local = {};\n"
            + "local.aa = function () {\n"
            + "    return;\n"
            + "};\n"
            + "    \"\n"
            + "}\n"
        ), "passed.sh", "force");
        // validate no err occurred
        local.assertOrThrow(!local.jslint.errMsg, local.jslint.errMsg);
    }, onError);
};

local.testCase_jslintAndPrint_default = function (opt, onError) {
/*
 * this function will test jslintAndPrint's default handling-behavior
 */
    ([
        // 0. test csslint passed handling-behavior
        [
            // test passed handling-behavior
            ".aa {\n    display: block;\n}",
            // test \n\n handling-behavior
            ".bb {\n    display: block;\n}\n\n.aa {\n    display: block;\n}"
        // 1. test csslint failed handling-behavior
        ], [
            // test syntax-err handling-behavior
            "syntax err",
            // test whitespace-before-comma handling-behavior
            ".aa ,\nbb {\n    display: block;\n}",
            // test double-whitespace handling-behavior
            ".aa  {\n    display: block;\n}",
            // test multi-line-statement handling-behavior
            ".aa { display: block; }",
            // test validateLineSorted1-err handling-behavior
            ".bb,\n.aa {\n    display: block;\n}",
            // test validateLineSorted2-err handling-behavior
            ".bb {\n    display: block;\n}\n.aa {\n    display: block;\n}"
        // 2. test jslint passed handling-behavior
        ], [
            // test null-case handling-behavior
            "",
            // test es6 handling-behavior
            "const aa = 1;\nwindow.aa = aa;",
            // test passed handling-behavior
            "let aa = 1;\nwindow.aa = aa;",
            // test /* jslint ignore:xxx */ handling-behavior
            "/* jslint ignore:start */\nsyntax err\n/* jslint ignore:end */",
            // test // jslint ignore:line handling-behavior
            "syntax err // jslint ignore:line",
            // test example.js
            local.assetsDict["/assets.example.template.js"]
        // 3. test jslint failed handling-behavior
        ], [
            // test whitespace handling-behavior
            " ",
            // test syntax-err handling-behavior
            "syntax err"
            //!! // test validateLineSorted-err handling-behavior
            //!! "(function () {\n    \"use strict\";\n    let local;\n"
            //!! + "    local = {};\n    local.bb = null;\n    local.cc = null;\n}());"
        // 4. test shlint passed handling-behavior
        ], [
            // test validateLineSorted handling-behavior
            "shAa () {\n    return;\n}\nshBb () {\n    return;\n}"
        // 5. test shlint failed handling-behavior
        ], [
            //!! // test indent handling-behavior
            //!! " aa",
            //!! // test trailing-whitespace handling-behavior
            //!! "aa ",
            // test tab handling-behavior
            "aa\tbb",
            // test validateLineSorted handling-behavior
            "shBb () {\n    return;\n}\nshAa () {\n    return;\n}"
        ]
    ]).forEach(function (scriptList, ii) {
        scriptList.forEach(function (script, jj) {
            switch (ii & 0xe) {
            case 0:
                script = "/* jslint utility2:true */\n" + script;
                local.jslintAndPrint(script, "aa." + ii + "." + jj + ".css");
                break;
            case 2:
                script = "/* jslint utility2:true */\n" + script;
                local.jslintAndPrint(script, "aa." + ii + "." + jj + ".js");
                break;
            case 4:
                script = "# jslint utility2:true\n" + script;
                local.jslintAndPrint(script, "aa." + ii + "." + jj + ".sh");
                break;
            }
            if (Boolean(ii & 1)) {
                // validate err occurred
                local.assertOrThrow(
                    local.jslintResult.errMsg,
                    local.jslintResult
                );
                return;
            }
            // validate no err occurred
            local.assertOrThrow(!local.jslintResult.errMsg, local.jslintResult);
        });
    });
    onError(null, opt);
};
}());
}());
