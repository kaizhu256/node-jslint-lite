/* istanbul instrument in package jslint */
/* istanbul ignore next */
/* jslint utility2:true */
(function (globalThis) {
    "use strict";
    var consoleError;
    var local;
    // init globalThis
    (function () {
        try {
            globalThis = Function("return this")(); // jslint ignore:line
        } catch (ignore) {}
    }());
    globalThis.globalThis = globalThis;
    // init local
    local = {};
    // init isBrowser
    local.isBrowser = (
        typeof window === "object"
        && window === globalThis
        && typeof window.XMLHttpRequest === "function"
        && window.document
        && typeof window.document.querySelectorAll === "function"
    );
    globalThis.globalLocal = local;
    // init function
    local.assertThrow = function (passed, message) {
    /*
     * this function will throw the error <message> if <passed> is falsy
     */
        var error;
        if (passed) {
            return;
        }
        error = (
            // ternary-operator
            (
                message
                && typeof message.message === "string"
                && typeof message.stack === "string"
            )
            // if message is an error-object, then leave it as is
            ? message
            : new Error(
                typeof message === "string"
                // if message is a string, then leave it as is
                ? message
                // else JSON.stringify message
                : JSON.stringify(message, null, 4)
            )
        );
        throw error;
    };
    local.functionOrNop = function (fnc) {
    /*
     * this function will if <fnc> exists,
     * them return <fnc>,
     * else return <nop>
     */
        return fnc || local.nop;
    };
    local.identity = function (value) {
    /*
     * this function will return <value>
     */
        return value;
    };
    local.nop = function () {
    /*
     * this function will do nothing
     */
        return;
    };
    // init debug_inline
    if (!globalThis["debug\u0049nline"]) {
        consoleError = console.error;
        globalThis["debug\u0049nline"] = function () {
        /*
         * this function will both print <arguments> to stderr
         * and return <arguments>[0]
         */
            var argList;
            argList = Array.from(arguments); // jslint ignore:line
            // debug arguments
            globalThis["debug\u0049nlineArguments"] = argList;
            consoleError("\n\ndebug\u0049nline");
            consoleError.apply(console, argList);
            consoleError("\n");
            // return arg0 for inspection
            return argList[0];
        };
    }
}(this));



(function (local) {
"use strict";



// run shared js-env code - init-before
(function () {
// init local
local = (globalThis.utility2 || require("utility2")).requireReadme();
globalThis.local = local;
// init test
local.testRunDefault(local);
}());



// run shared js-env code - function
(function () {
local._testCase_jslintAndPrint_default = function (options, onError) {
/*
 * this function will test jslintAndPrint's default handling-behavior
 */
    // 0. test csslint's passed handling-behavior
    [[
        // test passed handling-behavior
        ".aa {\n    display: block;\n}",
// test /* validateLineSortedReset */ handling-behavior
        (
            ".bb {\n    display: block;\n}\n"
            + "/* validateLineSortedReset */\n"
            + ".aa {\n    display: block;\n}"
        )
    // 1. test csslint's failed handling-behavior
    ], [
        // test syntax-error handling-behavior
        "syntax error",
        // test whitespace-before-comma handling-behavior
        ".aa ,\nbb {\n    display: block;\n}",
        // test double-whitespace handling-behavior
        ".aa  {\n    display: block;\n}",
        // test multi-line-statement handling-behavior
        ".aa { display: block; }",
        // test validateLineSorted1 handling-behavior
        ".bb,\n.aa {\n    display: block;\n}",
        // test validateLineSorted2 handling-behavior
        ".bb {\n    display: block;\n}\n.aa {\n    display: block;\n}"
    // 2. test jslint's passed handling-behavior
    ], [
        // test null-case handling-behavior
        "",
        // test es6 handling-behavior
        "const aa = 1;\nwindow.aa = aa;",
        // test passed handling-behavior
        "var aa = 1;\nwindow.aa = aa;",
        // test /* jslint ignore:xxx */ handling-behavior
        "/* jslint ignore:start */\nsyntax error\n/* jslint ignore:end */",
        // test // jslint ignore:line handling-behavior
        "syntax error // jslint ignore:line",
        // test example.js
        local.assetsDict["/assets.example.template.js"]
    // 3. test jslint's failed handling-behavior
    ], [
        // test whitespace handling-behavior
        " ",
        // test syntax-error handling-behavior
        "syntax error"
        //!! // test validateLineSorted-error1 handling-behavior
        //!! "(function () {\n    \"use strict\";\n    var local;\n" +
        //!! "    local = {};\n    local.bb = null;\n    local.aa = null;\n}());",
        //!! // test validateLineSorted-error2 handling-behavior
        //!! "(function () {\n    \"use strict\";\n    var local;\n" +
        //!! "    local = {};\n    local.aa = \"class=\\\"bb aa\\\"\";\n}());"
    // 4. test shlint's passed handling-behavior
    ], [
        // test validateLineSorted handling-behavior
        "shAa () {\n    return;\n}\nshBb () {\n    return;\n}"
    // 5. test shlint's failed handling-behavior
    ], [
        // test indent handling-behavior
        " aa",
        // test trailing-whitespace handling-behavior
        "aa ",
        // test tab handling-behavior
        "aa\tbb",
        // test validateLineSorted handling-behavior
        "shBb () {\n    return;\n}\nshAa () {\n    return;\n}"
    ]].forEach(function (scriptList, ii) {
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
                // validate error occurred
                local.assert(local.jslintResult.errorText, local.jslintResult);
                return;
            }
            // validate no error occurred
            local.assert(!local.jslintResult.errorText, local.jslintResult);
        });
    });
    onError(null, options);
};

local._testCase_jslintAndPrintConditional_default = function (options, onError) {
/*
 * this function will test jslintAndPrintConditional's default handling-behavior
 */
    local.testMock([
        [local.jslint, {errorText: ""}]
    ], function (onError) {
        // test no csslint handling-behavior
        local.jslintAndPrintConditional("no csslint", "empty.css");
        // validate no error occurred
        local.assert(!local.jslint.errorText, local.jslint.errorText);
        // test csslint passed handling-behavior
        local.jslintAndPrintConditional(
            "/*csslint*/\nbody { display: block; }",
            "passed.css",
            "force"
        );
        // validate no error occurred
        local.assert(!local.jslint.errorText, local.jslint.errorText);
        // test no jslint handling-behavior
        local.jslintAndPrintConditional("no jslint", "empty.js");
        // validate no error occurred
        local.assert(!local.jslint.errorText, local.jslint.errorText);
        // test jslint passed handling-behavior
        local.jslintAndPrintConditional(
            "/*jslint node: true*/\nconsole.log(\"aa\");",
            "passed.js",
            "force"
        );
        // validate no error occurred
        local.assert(!local.jslint.errorText, local.jslint.errorText);
        onError(null, options);
        // test no shlint handling-behavior
        local.jslintAndPrintConditional("no shlint", "empty.sh");
        // validate no error occurred
        local.assert(!local.jslint.errorText, local.jslint.errorText);
        // test shlint passed handling-behavior
        local.jslintAndPrintConditional(
            (
                "# jslint utility2:true\n"
                + "shAa () {\n"
                + "    node -e \"\n"
                + "local = {};\n"
                + "local.aa = function () {\n"
                + "    return;\n"
                + "};\n"
                + "    \"\n"
                + "}\n"
            ),
            "passed.sh",
            "force"
        );
        // validate no error occurred
        local.assert(!local.jslint.errorText, local.jslint.errorText);
    }, onError);
};
}());



}());
