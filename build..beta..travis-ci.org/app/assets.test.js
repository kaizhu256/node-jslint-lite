/* istanbul instrument in package jslint */
// assets.utility2.header.js - start
/* istanbul ignore next */
/* jslint utility2:true */
(function (globalThis) {
    "use strict";
    let consoleError;
    let debugName;
    let local;
    debugName = "debug" + String("Inline");
    // init globalThis
    globalThis.globalThis = globalThis.globalThis || globalThis;
    // init debug_inline
    if (!globalThis[debugName]) {
        consoleError = console.error;
        globalThis[debugName] = function (...argList) {
        /*
         * this function will both print <argList> to stderr
         * and return <argList>[0]
         */
            consoleError("\n\n" + debugName);
            consoleError(...argList);
            consoleError("\n");
            return argList[0];
        };
    }
    String.prototype.trimEnd = (
        String.prototype.trimEnd || String.prototype.trimRight
    );
    String.prototype.trimStart = (
        String.prototype.trimStart || String.prototype.trimLeft
    );
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
    // init isWebWorker
    local.isWebWorker = (
        local.isBrowser && typeof globalThis.importScripts === "function"
    );
    // init function
    local.assertOrThrow = function (passed, msg) {
    /*
     * this function will throw err.<msg> if <passed> is falsy
     */
        if (passed) {
            return;
        }
        throw (
            (
                msg
                && typeof msg.message === "string"
                && typeof msg.stack === "string"
            )
            // if msg is err, then leave as is
            ? msg
            : new Error(
                typeof msg === "string"
                // if msg is a string, then leave as is
                ? msg
                // else JSON.stringify msg
                : JSON.stringify(msg, undefined, 4)
            )
        );
    };
    local.coalesce = function (...argList) {
    /*
     * this function will coalesce null, undefined, or "" in <argList>
     */
        let arg;
        let ii;
        ii = 0;
        while (ii < argList.length) {
            arg = argList[ii];
            if (arg !== null && arg !== undefined && arg !== "") {
                break;
            }
            ii += 1;
        }
        return arg;
    };
    local.fsReadFileOrDefaultSync = function (pathname, type, dflt) {
    /*
     * this function will sync-read <pathname> with given <type> and <dflt>
     */
        let fs;
        // do nothing if module does not exist
        try {
            fs = require("fs");
        } catch (ignore) {
            return dflt;
        }
        pathname = require("path").resolve(pathname);
        // try to read pathname
        try {
            return (
                type === "json"
                ? JSON.parse(fs.readFileSync(pathname, "utf8"))
                : fs.readFileSync(pathname, type)
            );
        } catch (ignore) {
            return dflt;
        }
    };
    local.fsRmrfSync = function (pathname) {
    /*
     * this function will sync "rm -rf" <pathname>
     */
        let child_process;
        // do nothing if module does not exist
        try {
            child_process = require("child_process");
        } catch (ignore) {
            return;
        }
        pathname = require("path").resolve(pathname);
        if (process.platform !== "win32") {
            child_process.spawnSync("rm", [
                "-rf", pathname
            ], {
                stdio: [
                    "ignore", 1, 2
                ]
            });
            return;
        }
        try {
            child_process.spawnSync("rd", [
                "/s", "/q", pathname
            ], {
                stdio: [
                    "ignore", 1, "ignore"
                ]
            });
        } catch (ignore) {}
    };
    local.fsWriteFileWithMkdirpSync = function (pathname, data, msg) {
    /*
     * this function will sync write <data> to <pathname> with "mkdir -p"
     */
        let fs;
        let success;
        // do nothing if module does not exist
        try {
            fs = require("fs");
        } catch (ignore) {
            return;
        }
        pathname = require("path").resolve(pathname);
        // try to write pathname
        try {
            fs.writeFileSync(pathname, data);
            success = true;
        } catch (ignore) {
            // mkdir -p
            fs.mkdirSync(require("path").dirname(pathname), {
                recursive: true
            });
            // re-write pathname
            fs.writeFileSync(pathname, data);
            success = true;
        }
        if (success && msg) {
            console.error(msg.replace("{{pathname}}", pathname));
        }
        return success;
    };
    local.identity = function (val) {
    /*
     * this function will return <val>
     */
        return val;
    };
    local.nop = function () {
    /*
     * this function will do nothing
     */
        return;
    };
    local.objectAssignDefault = function (tgt = {}, src = {}, depth = 0) {
    /*
     * this function will if items from <tgt> are null, undefined, or "",
     * then overwrite them with items from <src>
     */
        let recurse;
        recurse = function (tgt, src, depth) {
            Object.entries(src).forEach(function ([
                key, bb
            ]) {
                let aa;
                aa = tgt[key];
                if (aa === undefined || aa === null || aa === "") {
                    tgt[key] = bb;
                    return;
                }
                if (
                    depth !== 0
                    && typeof aa === "object" && aa && !Array.isArray(aa)
                    && typeof bb === "object" && bb && !Array.isArray(bb)
                ) {
                    recurse(aa, bb, depth - 1);
                }
            });
        };
        recurse(tgt, src, depth | 0);
        return tgt;
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
}((typeof globalThis === "object" && globalThis) || window));
// assets.utility2.header.js - end



/* istanbul ignore next */
/* jslint utility2:true */
(function (local) {
"use strict";



// run shared js-env code - init-before
(function () {
// init local
local = globalThis.utility2 || require("utility2");
local = local.requireReadme();
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
        // handle err
        local.assertOrThrow(!local.jslint.errMsg, local.jslint.errMsg);
        // test csslint passed handling-behavior
        local.jslintAndPrintConditional(
            "/*csslint*/\nbody { display: block; }",
            "passed.css",
            "force"
        );
        // handle err
        local.assertOrThrow(!local.jslint.errMsg, local.jslint.errMsg);
        // test no jslint handling-behavior
        local.jslintAndPrintConditional("no jslint", "empty.js");
        // handle err
        local.assertOrThrow(!local.jslint.errMsg, local.jslint.errMsg);
        // test jslint passed handling-behavior
        local.jslintAndPrintConditional(
            "/*jslint node: true*/\nconsole.log(\"aa\");",
            "passed.js",
            "force"
        );
        // handle err
        local.assertOrThrow(!local.jslint.errMsg, local.jslint.errMsg);
        onError(null, opt);
        // test no shlint handling-behavior
        local.jslintAndPrintConditional("no shlint", "empty.sh");
        // handle err
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
        // handle err
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
        // 4. test shlint passed handling-behavior
        ], [
            // test validateLineSorted handling-behavior
            "shAa () {\n    return;\n}\nshBb () {\n    return;\n}"
        // 5. test shlint failed handling-behavior
        ], [
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
                // handle err
                local.assertOrThrow(
                    local.jslintResult.errMsg,
                    local.jslintResult
                );
                return;
            }
            // handle err
            local.assertOrThrow(!local.jslintResult.errMsg, local.jslintResult);
        });
    });
    onError(null, opt);
};
}());
}());