/* istanbul instrument in package jslint */
// assets.utility2.header.js - start
/* jslint utility2:true */
/* istanbul ignore next */
// run shared js-env code - init-local
(function () {
    "use strict";
    let consoleError;
    let local;
    // init debugInline
    if (!globalThis.debugInline) {
        consoleError = console.error;
        globalThis.debugInline = function (...argList) {
        /*
         * this function will both print <argList> to stderr
         * and return <argList>[0]
         */
            consoleError("\n\ndebugInline");
            consoleError(...argList);
            consoleError("\n");
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
    // init isWebWorker
    local.isWebWorker = (
        local.isBrowser && typeof globalThis.importScripts === "function"
    );
    // init function
    local.assertJsonEqual = function (aa, bb) {
    /*
     * this function will assert JSON.stringify(<aa>) === JSON.stringify(<bb>)
     */
        let objectDeepCopyWithKeysSorted;
        objectDeepCopyWithKeysSorted = function (obj) {
        /*
         * this function will recursively deep-copy <obj> with keys sorted
         */
            let sorted;
            if (typeof obj !== "object" || !obj) {
                return obj;
            }
            // recursively deep-copy list with child-keys sorted
            if (Array.isArray(obj)) {
                return obj.map(objectDeepCopyWithKeysSorted);
            }
            // recursively deep-copy obj with keys sorted
            sorted = {};
            Object.keys(obj).sort().forEach(function (key) {
                sorted[key] = objectDeepCopyWithKeysSorted(obj[key]);
            });
            return sorted;
        };
        aa = JSON.stringify(objectDeepCopyWithKeysSorted(aa));
        bb = JSON.stringify(objectDeepCopyWithKeysSorted(bb));
        if (aa !== bb) {
            throw new Error(JSON.stringify(aa) + " !== " + JSON.stringify(bb));
        }
    };
    local.assertOrThrow = function (passed, msg) {
    /*
     * this function will throw <msg> if <passed> is falsy
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
                // if msg is string, then leave as is
                ? msg
                // else JSON.stringify(msg)
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
            if (arg !== undefined && arg !== null && arg !== "") {
                return arg;
            }
            ii += 1;
        }
        return arg;
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
    local.onErrorThrow = function (err) {
    /*
     * this function will throw <err> if exists
     */
        if (err) {
            throw err;
        }
    };
    // bug-workaround - throw unhandledRejections in node-process
    if (
        typeof process === "object" && process
        && typeof process.on === "function"
        && process.unhandledRejections !== "strict"
    ) {
        process.unhandledRejections = "strict";
        process.on("unhandledRejection", function (err) {
            throw err;
        });
    }
}());
// assets.utility2.header.js - end


/* jslint utility2:true */
(function (local) {
"use strict";


/* istanbul ignore next */
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
local.testCase_jslint0_coverage = function (opt, onError) {
/*
 * this function will test jslintAndPrint's coverage handling-behavior
 */
    // test option handling-behavior
    local.jslint0([
        // source
        ""
    ], {
        // option
        bitwise: true,
        browser: true,
        convert: true,
        couch: true,
        devel: true,
        eval: true,
        for: true,
        fudge: true,
        getset: true,
        long: true,
        node: true,
        single: true,
        this: true,
        white: true
    });
    [
        // option - utility2
        "/* jslint utility2:true */\nlet aa;aa=1;",
        // option - browser
        "/*jslint browser*/;\n",
        // option - eval
        "/*jslint eval*/\nFunction();\neval();\n",
        // option - node
        "#!\n/*jslint browser:false, node*/\n\"use strict\";\n",
        // option - this
        "/*jslint this*/\nthis;",
        // option - throw_error
        "/*jslint throw_error*/",
        // option - white
        "/*jslint white*/\n\t",
        // property
        "/*property aa bb*/",
        ""
    ].forEach(function (src) {
        local.jslint0(src);
    });
    // test err handling-behavior
    [
        // and: "The '&&' subexpression should be wrapped in parens.",
        "aa && bb || cc;",
        // bad_assignment_a: "Bad assignment to '{a}'.",
        "1 = 2;",
        // bad_directive_a: "Bad directive '{a}'.",
        "/*jslint !*/",
        // bad_get: "A get function takes no parameters.",
        // bad_module_name_a: "Bad module name '{a}'.",
        "import aa from \"!aa\";",
        // bad_option_a: "Bad option '{a}'.",
        "/*global aa:true*/",
        "/*jslint undefined*/",
        // bad_property_a: "Bad property name '{a}'.",
        "{\"__proto__\":1}",
        "aa._;",
        // bad_set: "A set function takes one parameter.",
        // duplicate_a: "Duplicate '{a}'.",
        "{\"aa\":1,\"aa\":2}",
        // empty_block: "Empty block.",
        "function aa() {}",
        // escape_mega: "Unexpected escapement in mega literal.",
        // expected_a: "Expected '{a}'.",
        "aa=/_{}/;",
        // expected_a_at_b_c: "Expected '{a}' at column {b}, not column {c}.",
        // expected_a_b: "Expected '{a}' and instead saw '{b}'.",
        "(aa)=>{return 1;}",
        ";{;",
        "`${`",
        "aa=/[ ]/;",
        "isFinite(1);",
        // expected_a_b_from_c_d:
        // "Expected '{a}' to match '{b}' from line {c} and instead saw '{d}'."
        "{\"aa\":1",
        // expected_a_before_b: "Expected '{a}' before '{b}'.",
        "/*jslint eval*/\nFunction;eval;",
        // expected_a_next_at_b:
        // "Expected '{a}' at column {b} on the next line.",
        // expected_digits_after_a: "Expected digits after '{a}'.",
        // expected_four_digits: "Expected four digits after '\\u'.",
        // expected_identifier_a:
        // "Expected an identifier and instead saw '{a}'.",
        // expected_line_break_a_b:
        // "Expected a line break between '{a}' and '{b}'.",
        // expected_regexp_factor_a:
        // "Expected a regexp factor and instead saw '{a}'.",
        // expected_space_a_b: "Expected one space between '{a}' and '{b}'.",
        "/**//**/",
        // expected_statements_a: "Expected statements before '{a}'.",
        // expected_string_a: "Expected a string and instead saw '{a}'.",
        // expected_type_string_a:
        // "Expected a type string and instead saw '{a}'.",
        // freeze_exports:
        // "Expected 'Object.freeze('. All export values should be frozen."
        "export default aa;",
        // function_in_loop: "Don't make functions within a loop.",
        "while(1){function aa(){}}",
        "while(1){(aa)=>1}",
        // infix_in:
        // "Unexpected 'in'. Compare with undefined, "
        // + "or use the hasOwnProperty method instead."
        "aa in bb;",
        // label_a: "'{a}' is a statement label.",
        // misplaced_a: "Place '{a}' at the outermost level.",
        "if(1){import aa from \"aa\";}",
        // misplaced_directive_a:
        "let aa;\n/*global aa*/",
        // "Place the '/*{a}*/' directive before the first statement."
        // missing_browser: "/*global*/ requires the Assume a browser option.",
        "/*global aa*/",
        // missing_m: "Expected 'm' flag on a multiline regular expression.",
        "aa=/$^/;",
        // naked_block: "Naked block.",
        // nested_comment: "Nested comment.",
        "/* /* aa */",
        // not_label_a: "'{a}' is not a label.",
        // number_isNaN: "Use Number.isNaN function to compare with NaN.",
        "isNaN(1);",
        // out_of_scope_a: "'{a}' is out of scope.",
        // redefinition_a_b: "Redefinition of '{a}' from line {b}.",
        "let aa; let aa;",
        // required_a_optional_b:
        // "Required parameter '{a}' after optional parameter '{b}'."
        // reserved_a: "Reserved name '{a}'.",
        "let undefined;",
        // subscript_a: "['{a}'] is better written in dot notation.",
        // todo_comment: "Unexpected TO\u0044O comment.",
        "// todo",
        // too_long: "Line is longer than 80 characters.",
        "/////////////////////////////////////////"
        + "/////////////////////////////////////////",
        // too_many_digits: "Too many digits.",
        "\"\\u{123456\"",
        // unclosed_comment: "Unclosed comment.",
        "/*",
        // unclosed_mega: "Unclosed mega literal.",
        "`aa",
        // unclosed_string: "Unclosed string.",
        "\"\\",
        "\"aa",
        // undeclared_a: "Undeclared '{a}'.",
        "aa;",
        // unexpected_a: "Unexpected '{a}'.",
        "((1));",
        "/_/;",
        ";;",
        "`${/[`]/}`",
        "Function;",
        "aa/=2;",
        "aa=/_//;",
        "aa=/_/z;",
        "arguments;",
        "eval;",
        "ignore;",
        "this;",
        "yield /_/;",
        "{//aa\n}",
        "{\"\\u{1234}\":1}",
        // unexpected_a_after_b: "Unexpected '{a}' after '{b}'.",
        // unexpected_a_before_b: "Unexpected '{a}' before '{b}'.",
        "aa=/=/;",
        // unexpected_at_top_level_a: "Expected '{a}' to be in a function.",
        // unexpected_char_a: "Unexpected character '{a}'.",
        // unexpected_comment: "Unexpected comment.",
        // unexpected_directive_a:
        // "When using modules, don't use directive '/*{a}'.",
        // unexpected_expression_a:
        // "Unexpected expression '{a}' in statement position."
        "ii++;",
        // unexpected_label_a: "Unexpected label '{a}'.",
        "aa:aa;",
        // unexpected_parens: "Don't wrap function literals in parens.",
        // unexpected_space_a_b: "Unexpected space between '{a}' and '{b}'.",
        // unexpected_statement_a:
        // "Unexpected statement '{a}' in expression position."
        // unexpected_trailing_space: "Unexpected trailing space.",
        // unexpected_typeof_a:
        // "Unexpected 'typeof'. Use '===' to compare directly with {a}."
        "typeof aa===\"undefined\";",
        // uninitialized_a: "Uninitialized '{a}'.",
        // unreachable_a: "Unreachable '{a}'.",
        "while(1){break;1;}",
        // unregistered_property_a: "Unregistered property name '{a}'.",
        // unsafe: "Unsafe character '{a}'.",
        // unused_a: "Unused '{a}'.",
        // use_double: "Use double quotes, not single quotes.",
        "''",
        // use_open:
        // "Wrap a ternary expression in parens, "
        // + "with a line break after the left paren."
        "1?2:3;",
        // use_spaces: "Use spaces, not tabs.",
        "\t",
        // var_loop: "Don't declare variables in a loop.",
        "while(1){var aa;}",
        // var_switch: "Don't declare variables in a switch.",
        "switch(1){case 1:var aa;}",
        // weird_condition_a: "Weird condition '{a}'.",
        "if(1&&1) {}",
        "if(1||1) {}",
        // weird_expression_a: "Weird expression '{a}'.",
        // weird_loop: "Weird loop.",
        "while(1){1;}",
        // weird_relation_a: "Weird relation '{a}'.",
        "if(1===1){1;}",
        // wrap_condition: "Wrap the condition in parens.",
        // wrap_immediate:
        // "Wrap an immediate function invocation in parentheses to assist "
        // + "the reader in understanding that the expression is the result "
        // + "of a function, and not the function itself."
        // wrap_parameter: "Wrap the parameter in parens.",
        "aa => 1;",
        // wrap_regexp: "Wrap this regexp in parens to avoid confusion.",
        "!/_/;",
        // wrap_unary: "Wrap the unary expression in parens."
        ""
    ].forEach(function (src) {
        local.jslint0(src);
    });
    // test misc handling-behavior
    [
        // async/await
        "async function (aa) { await aa(); }",
        // fart
        "(aa)=>1;",
        ""
    ].forEach(function (src) {
        local.jslint0(src);
    });
    onError(undefined, opt);
};

local.testCase_jslintAndPrintDir_coverage = function (opt, onError) {
/*
 * this function will test jslintAndPrintDir's coverage handling-behavior
 */
    if (local.isBrowser) {
        onError(undefined, opt);
        return;
    }
    Promise.all([
        new Promise(function (resolve) {
            local.jslintAndPrintDir(".", {
                autofix: true,
                conditional: true
            }, resolve);
        }),
        new Promise(function (resolve) {
            local.jslintAndPrintDir("jslintAndPrintDir", {
                autofix: true,
                conditional: true
            });
            local.eventListenerAdd((
                "utility2.testRunMock.process.exit"
            ), resolve, {
                once: true
            });
        })
    ]).then(function (errList) {
        errList.forEach(function (err, ii) {
            local.assertJsonEqual(Boolean(err) | 0, ii);
        });
        onError();
    });
};

local.testCase_jslintAndPrint_coverage = function (opt, onError) {
/*
 * this function will test jslintAndPrint's coverage handling-behavior
 */
    // test null-case handling-behavior
    local.assertJsonEqual(local.jslintAndPrint(""), "\n");
    // test early_stop handling-behavior
    local.jslintAndPrint("aa = 1\naa = [1,2,]", "aa.js");
    onError(undefined, opt);
};

local.testCase_jslintAutofix_coverage = function (opt, onError) {
/*
 * this function will test jslintAutofix's coverage handling-behavior
 */
    local.testMock([
        [
            (
                local.isBrowser
                ? {}
                : require("fs")
            ), {
                unlinkSync: local.nop,
                writeFileSync: local.nop
            }
        ],
        [
            (
                local.isBrowser
                ? {}
                : require("fs")
            ), {
                existsSync: local.identity,
                unlinkSync: local.nop,
                writeFileSync: local.nop
            }
        ]
    ], function (onError) {
        // test autofix-failed-expected_identifier_a handling-behavior
        local.jslintAndPrint("(function () {\nfunction () {}\n}());", "aa.js", {
            autofix: true
        });
        // test autofix-multi-pass handling-behavior
        local.jslintAndPrint("let aa;aa=1;", "aa.js", {
            autofix: true
        });
        local.jslintAndPrint((
            // autofix-js - unexpected_space_a_b
            "(function bb () {\n"
            + "   \"use strict\";\n"
            // autofix-js - expected_a_at_b_c
            + "     return 1;\n"
            + "}());\n"
        ), "aa.js", {
            autofix: true
        });
        // de-mux - false-positive rgx /_/
        local.jslintAndPrint("let aa;\n aa = {} / 2;", "aa.js", {
            autofix: true
        });
        local.jslintAndPrint((
            "(function () {\n"
            + "    \"use strict\";\n"
            + "    let aa;\n"
            // ignore:line
            + "    aa = 1; // jslint ignore:line\n"
            // ignore:start ... ignore:end
            + "/* jslint ignore:start */\n"
            + "    aa = 1;\n"
            + "/* jslint ignore:end */\n"
            // autofix-js - expected_a_b
            + "    aa = (1 == 2);\n"
            // autofix-js - expected_a_before_b
            + "    aa = /[-]/;\n"
            // autofix-js - expected_identifier_a
            + "    aa = {1: 2};\n"
            // autofix-js - use_double
            + "    aa = '1\"\\n\\''; // '1'\n"
            // autofix-js - use_spaces
            + "\taa = 1;\n"
            // autofix-js-braket - normalize rgx /_/ to (/_/)
            + "    aa = /1/;\n"
            // autofix-js-whitespace - normalize 8-space-indent
            + "            aa = 1;\n"
            + "    return aa;\n"
            + "}());\n"
        ), "aa.js", {
            autofix: true
        });
        onError(undefined, opt);
    }, onError);
};
}());
}());
