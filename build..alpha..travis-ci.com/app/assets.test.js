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
    // jslint self
    if (!local.isBrowser) {
        local.jslint0(require("fs").readFileSync(__filename, "utf8"));
        local.jslint0(require("fs").readFileSync("lib.jslint.js", "utf8"));
        local.jslint0(require("fs").readFileSync(
            "lib.jslint.js",
            "utf8"
        ).replace((
            /[\S\s]*?\n\/\/\u0020jslint\.js/
        ), "").replace((
            /\n\/\*\u0020jslint\u0020ignore:end\u0020\*\/\n[\S\s]*/
        ), ""));
        local.jslint0(require("fs").readFileSync("package.json", "utf8"));
    }
    // test option handling-behavior
    opt = local.jslint0([
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
    local.assertOrThrow(!opt.warnings.length, opt.source);
    [
        // option - utility2
        "/* jslint utility2:true */\nlet aa = 1;\naa();",
        // option - browser
        "/*jslint browser*/;\n",
        // option - eval
        "/*jslint eval*/\nnew Function();\neval();\n",
        // option - node
        "#!\n/*jslint browser:false, node*/\n\"use strict\";\n",
        // option - this
        "/*jslint this*/\nlet aa = this;",
        // option - white
        "/*jslint white*/\n\t",
        // property
        "/*property aa bb*/",
        ""
    ].forEach(function (src) {
        local.assertOrThrow(!local.jslint0(src).warnings.length, src);
    });
    // test misc handling-behavior
    [
        // async/await
        "async function aa() {\n    await aa();\n}",
        // fart
        "function aa() {\n    return () => 1;\n}",
        // json
        "{\"aa\":[[],-1,null]}",
        // label
        "function aa() {\nbb:\n    while (true) {\n        if (true) {\n"
        + "            break bb;\n        }\n    }\n}",
        // module
        "export default Object.freeze();",
        "import {aa, bb} from \"aa\";\naa(bb);",
        "import {} from \"aa\";",
        "import(\"aa\").then(function () {\n    return;\n});",
        ""
    ].forEach(function (src) {
        opt = local.jslint0(src);
        local.assertOrThrow(!opt.warnings.length, src);
    });
    onError(undefined, opt);
};

local.testCase_jslint0_err = function (opt, onError) {
/*
 * this function will test jslintAndPrint's err handling-behavior
 */
    let errCode;
    [
        // and: "The '&&' subexpression should be wrapped in parens.",
        "__and__",
        "aa && bb || cc;",
        // bad_assignment_a: "Bad assignment to '{a}'.",
        "__bad_assignment_a__",
        "1 = 2;",
        // bad_directive_a: "Bad directive '{a}'.",
        "__bad_directive_a__",
        "/*jslint !*/",
        // bad_get: "A get function takes no parameters.",
        "__bad_get__",
        // bad_module_name_a: "Bad module name '{a}'.",
        "__bad_module_name_a__",
        "import aa from \"!aa\";",
        // bad_option_a: "Bad option '{a}'.",
        "__bad_option_a__",
        "/*global aa:true*/",
        "/*jslint undefined*/",
        // bad_property_a: "Bad property name '{a}'.",
        "__bad_property_a__",
        "{\"__proto__\":1}",
        "aa._;",
        // bad_set: "A set function takes one parameter.",
        "__bad_set__",
        // duplicate_a: "Duplicate '{a}'.",
        "__duplicate_a__",
        "{\"aa\":1,\"aa\":2}",
        // empty_block: "Empty block.",
        "__empty_block__",
        "function aa() {}",
        // escape_mega: "Unexpected escapement in mega literal.",
        "__escape_mega__",
        // expected_a: "Expected '{a}'.",
        "__expected_a__",
        "aa=/_{}/;",
        // expected_a_at_b_c: "Expected '{a}' at column {b}, not column {c}.",
        "__expected_a_at_b_c__",
        // expected_a_b: "Expected '{a}' and instead saw '{b}'.",
        "__expected_a_b__",
        "(aa)=>{return 1;}",
        ";{;",
        "`${`",
        "aa=/[ ]/;",
        "isFinite(1);",
        "let aa=(aa?1:aa);",
        "let aa=(aa?aa:1);",
        // expected_a_b_from_c_d:
        // "Expected '{a}' to match '{b}' from line {c} and instead saw '{d}'."
        "__expected_a_b_from_c_d__",
        "{\"aa\":1",
        // expected_a_before_b: "Expected '{a}' before '{b}'.",
        "__expected_a_before_b__",
        "/*jslint eval*/\nFunction;eval;",
        // expected_a_next_at_b:
        // "Expected '{a}' at column {b} on the next line.",
        "__expected_a_next_at_b__",
        // expected_digits_after_a: "Expected digits after '{a}'.",
        "__expected_digits_after_a__",
        // expected_four_digits: "Expected four digits after '\\u'.",
        "__expected_four_digits__",
        // expected_identifier_a:
        // "Expected an identifier and instead saw '{a}'.",
        "__expected_identifier_a__",
        "import {",
        // expected_line_break_a_b:
        // "Expected a line break between '{a}' and '{b}'.",
        "__expected_line_break_a_b__",
        // expected_regexp_factor_a:
        // "Expected a regexp factor and instead saw '{a}'.",
        "__expected_regexp_factor_a__",
        // expected_space_a_b: "Expected one space between '{a}' and '{b}'.",
        "__expected_space_a_b__",
        "/**//**/",
        // expected_statements_a: "Expected statements before '{a}'.",
        "__expected_statements_a__",
        // expected_string_a: "Expected a string and instead saw '{a}'.",
        "__expected_string_a__",
        "import(aa).then(aa);;",
        "typeof 1 === 1;",
        // expected_type_string_a:
        // "Expected a type string and instead saw '{a}'.",
        "__expected_type_string_a__",
        // freeze_exports:
        // "Expected 'Object.freeze('. All export values should be frozen."
        "__freeze_exports__",
        "export default Object.aa()",
        "export function aa(){return;}",
        // function_in_loop: "Don't make functions within a loop.",
        "__function_in_loop__",
        "function aa(){while (true) {aa.map(function(){return;});}}",
        "function aa(){while (true) {aa.map(()=>1);}}",
        // infix_in:
        // "Unexpected 'in'. Compare with undefined, "
        // + "or use the hasOwnProperty method instead."
        "__infix_in__",
        "aa in bb;",
        // label_a: "'{a}' is a statement label.",
        "__label_a__",
        // misplaced_a: "Place '{a}' at the outermost level.",
        "__misplaced_a__",
        "if(true){import aa from \"aa\";}",
        // misplaced_directive_a:
        // "Place the '/*{a}*/' directive before the first statement."
        "__misplaced_directive_a__",
        "let aa;\n/*global aa*/",
        // missing_browser: "/*global*/ requires the Assume a browser option.",
        "__missing_browser__",
        "/*global aa*/",
        // missing_m: "Expected 'm' flag on a multiline regular expression.",
        "__missing_m__",
        "aa=/$^/;",
        // naked_block: "Naked block.",
        "__naked_block__",
        // nested_comment: "Nested comment.",
        "__nested_comment__",
        "/* /* aa */",
        // not_label_a: "'{a}' is not a label.",
        "__not_label_a__",
        // number_isNaN: "Use Number.isNaN function to compare with NaN.",
        "__number_isNaN__",
        "NaN===NaN;",
        "isNaN(1);",
        // out_of_scope_a: "'{a}' is out of scope.",
        "__out_of_scope_a__",
        // redefinition_a_b: "Redefinition of '{a}' from line {b}.",
        "__redefinition_a_b__",
        "let aa; let aa;",
        // required_a_optional_b:
        // "Required parameter '{a}' after optional parameter '{b}'."
        "__Required__",
        // reserved_a: "Reserved name '{a}'.",
        "__reserved_a__",
        "let undefined;",
        // subscript_a: "['{a}'] is better written in dot notation.",
        "__subscript_a__",
        // todo_comment: "Unexpected TO\u0044O comment.",
        "__todo_comment__",
        "// todo",
        // too_long: "Line is longer than 80 characters.",
        "__too_long__",
        "/////////////////////////////////////////"
        + "/////////////////////////////////////////",
        // too_many_digits: "Too many digits.",
        "__too_many_digits__",
        "\"\\u{123456}\"",
        // unclosed_comment: "Unclosed comment.",
        "__unclosed_comment__",
        "/*",
        // unclosed_mega: "Unclosed mega literal.",
        "__unclosed_mega__",
        "`aa",
        // unclosed_string: "Unclosed string.",
        "__unclosed_string__",
        "\"\\",
        "\"aa",
        // undeclared_a: "Undeclared '{a}'.",
        "__undeclared_a__",
        "aa;",
        // unexpected_a: "Unexpected '{a}'.",
        "__unexpected_a__",
        "((1));",
        "/_/;",
        ";;",
        "Function;",
        "`${/[`]/}`",
        "aa/=2;",
        "aa=/_//;",
        "aa=/_/z;",
        "arguments;",
        "eval;",
        "export aa;",
        "export const aa=1;",
        "function aa(){try{return;}catch(ignore){}finally{return;}}",
        "function aa(){try{return;}catch(ignore){}finally{switch(1){case 1:}}}",
        "ignore:",
        "ignore;",
        "import ignore from \"aa\";",
        "import {ignore} from \"aa\";",
        "this;",
        "void 1;",
        "yield /_/;",
        "{//\n}",
        "{\"\\u{1234}\":1}",
        "{\"aa\":",
        "{\"aa\":-0x0}",
        "{\"aa\":0x0}",
        "____",
        "{\"aa\":'aa'}",
        "{\"aa\":{1:2}}",
        // unexpected_a_after_b: "Unexpected '{a}' after '{b}'.",
        "__unexpected_a_after_b__",
        // unexpected_a_before_b: "Unexpected '{a}' before '{b}'.",
        "__unexpected_a_before_b__",
        // unexpected_at_top_level_a: "Expected '{a}' to be in a function.",
        "__unexpected_at_top_level_a__",
        // unexpected_char_a: "Unexpected character '{a}'.",
        "__unexpected_char_a__",
        // unexpected_comment: "Unexpected comment.",
        "__unexpected_comment__",
        // unexpected_directive_a:
        // "When using modules, don't use directive '/*{a}'.",
        "__unexpected_directive_a__",
        "/*global aa*/\nimport aa from \"aa\";",
        // unexpected_expression_a:
        // "Unexpected expression '{a}' in statement position."
        "__unexpected_expression_a__",
        "let ii;ii++;",
        // unexpected_label_a: "Unexpected label '{a}'.",
        "__unexpected_label_a__",
        "aa:aa;",
        // unexpected_parens: "Don't wrap function literals in parens.",
        "__unexpected_parens__",
        // unexpected_space_a_b: "Unexpected space between '{a}' and '{b}'.",
        "__unexpected_space_a_b__",
        // unexpected_statement_a:
        // "Unexpected statement '{a}' in expression position."
        "__unexpected_statement_a__",
        // unexpected_trailing_space: "Unexpected trailing space.",
        "__unexpected_trailing_space__",
        // unexpected_typeof_a:
        // "Unexpected 'typeof'. Use '===' to compare directly with {a}."
        "__unexpected_typeof_a__",
        "typeof aa===\"undefined\";",
        // uninitialized_a: "Uninitialized '{a}'.",
        "__uninitialized_a__",
        // unreachable_a: "Unreachable '{a}'.",
        "__unreachable_a__",
        "function aa(){while(true){break;1;}}",
        // unregistered_property_a: "Unregistered property name '{a}'.",
        "__unregistered_property_a__",
        // unsafe: "Unsafe character '{a}'.",
        "__unsafe__",
        // unused_a: "Unused '{a}'.",
        "__unused_a__",
        // use_double: "Use double quotes, not single quotes.",
        "__use_double__",
        "''",
        // use_open:
        // "Wrap a ternary expression in parens, "
        // + "with a line break after the left paren."
        "__use_open__",
        "1?2:3;",
        // use_spaces: "Use spaces, not tabs.",
        "__use_spaces__",
        "\t",
        // var_loop: "Don't declare variables in a loop.",
        "__var_loop__",
        "function aa(){while(true){var aa;}}",
        // var_switch: "Don't declare variables in a switch.",
        "__var_switch__",
        "function aa(){switch(1){case 1:var aa;}}",
        // weird_condition_a: "Weird condition '{a}'.",
        "__weird_condition_a__",
        "if(1&&1){1;}",
        "if(1||1){1;}",
        // weird_expression_a: "Weird expression '{a}'.",
        "__weird_expression_a__",
        // weird_loop: "Weird loop.",
        "__weird_loop__",
        "function aa(){while(true){break;}}",
        // weird_relation_a: "Weird relation '{a}'.",
        "__weird_relation_a__",
        "if(1===1){1;}",
        // wrap_condition: "Wrap the condition in parens.",
        "__wrap_condition__",
        // wrap_immediate:
        // "Wrap an immediate function invocation in parentheses to assist "
        // + "the reader in understanding that the expression is the result "
        // + "of a function, and not the function itself."
        "__wrap_immediate__",
        // wrap_parameter: "Wrap the parameter in parens.",
        "__wrap_parameter__",
        "aa => 1;",
        // wrap_regexp: "Wrap this regexp in parens to avoid confusion.",
        "__wrap_regexp__",
        "!/_/;",
        // wrap_unary: "Wrap the unary expression in parens."
        "__wrap_unary__",
        // throw_error
        "____",
        "/*jslint throw_error*/"
    ].forEach(function (src) {
        if (src.slice(0, 2) === "__") {
            errCode = src.slice(2, -2);
            return;
        }
        local.assertOrThrow(
            local.jslint0(src).warnings[0].code === errCode || !errCode,
            src
        );
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
    // test utility2 handling-behavior
    if (!local.isBrowser) {
        local.jslintAndPrint(
            require("utility2").__dirname + "/lib.utility2.js",
            "lib.utility2.js"
        );
    }
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
