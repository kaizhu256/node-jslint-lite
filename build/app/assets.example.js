

































































































/*
example.js

this script will run web-demo of jslint-lite

instruction
    1. save this script as example.js
    2. run shell-command:
        $ npm install jslint-lite && \
            PORT=8081 node example.js
    3. open browser to http://127.0.0.1:8081 and play with web-demo
    4. edit this script to suit your needs
*/


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


// run shared js-env code - init-before
(function () {
// init local
local = (
    globalThis.utility2_rollup
    || globalThis.utility2_jslint
    || globalThis.utility2_moduleExports
);
// init exports
globalThis.local = local;
}());


/* istanbul ignore next */
// run browser js-env code - init-test
(function () {
if (!local.isBrowser) {
    return;
}
// log stderr and stdout to #outputStdout1
["error", "log"].forEach(function (key) {
    let elem;
    let fnc;
    elem = document.querySelector("#outputStdout1");
    if (!elem) {
        return;
    }
    fnc = console[key];
    console[key] = function (...argList) {
        fnc(...argList);
        // append text to #outputStdout1
        elem.textContent += argList.map(function (arg) {
            return (
                typeof arg === "string"
                ? arg
                : JSON.stringify(arg, undefined, 4)
            );
        }).join(" ").replace((
            /\u001b\[\d*m/g
        ), "") + "\n";
        // scroll textarea to bottom
        elem.scrollTop = elem.scrollHeight;
    };
});
local.objectAssignDefault(local, globalThis.domOnEventDelegateDict);
globalThis.domOnEventDelegateDict = local;
}());


/* istanbul ignore next */
// run node js-env code - init-test
(function () {
if (local.isBrowser) {
    return;
}
// init exports
module.exports = local;
// init assetsDict
local.assetsDict = local.assetsDict || {};
/* jslint ignore:start */
local.assetsDict["/assets.index.template.html"] = '\
<!doctype html>\n\
<html lang="en">\n\
<head>\n\
<meta charset="utf-8">\n\
<meta name="viewport" content="width=device-width, initial-scale=1">\n\
<!-- "assets.utility2.template.html" -->\n\
<title>{{env.npm_package_name}} ({{env.npm_package_version}})</title>\n\
<style>\n\
/* jslint utility2:true */\n\
/*csslint\n\
*/\n\
/* csslint ignore:start */\n\
*,\n\
*:after,\n\
*:before {\n\
    box-sizing: border-box;\n\
}\n\
.uiAnimateSlide {\n\
    overflow-y: hidden;\n\
    transition: max-height ease-in 250ms, min-height ease-in 250ms, padding-bottom ease-in 250ms, padding-top ease-in 250ms;\n\
}\n\
/* csslint ignore:end */\n\
@keyframes uiAnimateSpin {\n\
0% {\n\
    transform: rotate(0deg);\n\
}\n\
100% {\n\
    transform: rotate(360deg);\n\
}\n\
}\n\
a {\n\
    overflow-wrap: break-word;\n\
}\n\
body {\n\
    background: #f7f7f7;\n\
    font-family: Arial, Helvetica, sans-serif;\n\
    font-size: small;\n\
    margin: 0 40px;\n\
}\n\
body > div,\n\
body > input,\n\
body > pre,\n\
body > .button,\n\
body > .textarea {\n\
    margin-bottom: 20px;\n\
    margin-top: 0;\n\
}\n\
body > input,\n\
body > .button {\n\
    width: 20rem;\n\
}\n\
body > .readonly {\n\
    background: #ddd;\n\
}\n\
body > .textarea {\n\
    height: 10rem;\n\
    resize: vertical;\n\
    width: 100%;\n\
}\n\
code,\n\
pre,\n\
.textarea {\n\
    font-family: Consolas, Menlo, monospace;\n\
    font-size: smaller;\n\
}\n\
pre {\n\
    overflow-wrap: break-word;\n\
    white-space: pre-wrap;\n\
}\n\
.button {\n\
    background: #ddd;\n\
    border: 1px solid #999;\n\
    color: #000;\n\
    cursor: pointer;\n\
    display: inline-block;\n\
    padding: 2px 5px;\n\
    text-align: center;\n\
    text-decoration: none;\n\
}\n\
.button:hover {\n\
    background: #bbb;\n\
}\n\
.colorError {\n\
    color: #d00;\n\
}\n\
.textarea {\n\
    background: #fff;\n\
    border: 1px solid #999;\n\
    border-radius: 0;\n\
    cursor: auto;\n\
    overflow: auto;\n\
    padding: 2px;\n\
}\n\
.zeroPixel {\n\
    border: 0;\n\
    height: 0;\n\
    margin: 0;\n\
    padding: 0;\n\
    width: 0;\n\
}\n\
</style>\n\
</head>\n\
<body>\n\
<div class="uiAnimateSpin" style="animation: uiAnimateSpin 2s linear infinite; border: 5px solid #999; border-radius: 50%; border-top: 5px solid #7d7; display: none; height: 25px; vertical-align: middle; width: 25px;"></div>\n\
<script>\n\
/* jslint utility2:true */\n\
// init domOnEventWindowOnloadTimeElapsed\n\
(function () {\n\
/*\n\
 * this function will measure and print time-elapsed for window.onload\n\
 */\n\
    "use strict";\n\
    if (!(\n\
        typeof window === "object" && window && window.document\n\
        && typeof document.addEventListener === "function"\n\
    ) || window.domOnEventWindowOnloadTimeElapsed) {\n\
        return;\n\
    }\n\
    window.domOnEventWindowOnloadTimeElapsed = Date.now() + 100;\n\
    window.addEventListener("load", function () {\n\
        setTimeout(function () {\n\
            window.domOnEventWindowOnloadTimeElapsed = (\n\
                Date.now()\n\
                - window.domOnEventWindowOnloadTimeElapsed\n\
            );\n\
            console.error(\n\
                "domOnEventWindowOnloadTimeElapsed = "\n\
                + window.domOnEventWindowOnloadTimeElapsed\n\
            );\n\
        }, 100);\n\
    });\n\
}());\n\
\n\
\n\
// init domOnEventAjaxProgressUpdate\n\
(function () {\n\
/*\n\
 * this function will display incrementing ajax-progress-bar\n\
 */\n\
    "use strict";\n\
    let opt;\n\
    let styleBar0;\n\
    let styleBar;\n\
    let styleModal0;\n\
    let styleModal;\n\
    let timeStart;\n\
    let timerInterval;\n\
    let timerTimeout;\n\
    let tmp;\n\
    let width;\n\
    try {\n\
        if (\n\
            window.domOnEventAjaxProgressUpdate\n\
            || !document.getElementById("domElementAjaxProgressBar1").style\n\
        ) {\n\
            return;\n\
        }\n\
    } catch (ignore) {\n\
        return;\n\
    }\n\
    window.domOnEventAjaxProgressUpdate = function (gotoState, onError) {\n\
        gotoState = (gotoState | 0) + 1;\n\
        switch (gotoState) {\n\
        // ajaxProgress - show\n\
        case 1:\n\
            // init timerInterval and timerTimeout\n\
            if (!timerTimeout) {\n\
                timeStart = Date.now();\n\
                timerInterval = setInterval(opt, 2000, 1, onError);\n\
                timerTimeout = setTimeout(opt, opt.timeout, 2, onError);\n\
            }\n\
            // show ajaxProgressBar\n\
            if (width !== -1) {\n\
                styleBar.background = styleBar0.background;\n\
            }\n\
            setTimeout(opt, 50, gotoState, onError);\n\
            break;\n\
        // ajaxProgress - increment\n\
        case 2:\n\
            // show ajaxProgressBar\n\
            if (width === -1) {\n\
                break;\n\
            }\n\
            styleBar.background = styleBar0.background;\n\
            // reset ajaxProgress if it reaches end\n\
            if ((styleBar.width.slice(0, -1) | 0) > 95) {\n\
                width = 0;\n\
            }\n\
            // this algorithm will indefinitely increment ajaxProgress\n\
            // with successively smaller increments without reaching 100%\n\
            width += 1;\n\
            styleBar.width = Math.max(\n\
                100 - 75 * Math.exp(-0.125 * width),\n\
                styleBar.width.slice(0, -1) | 0\n\
            ) + "%";\n\
            // show ajaxProgressModal\n\
            styleModal.height = "100%";\n\
            styleModal.opacity = styleModal0.opacity;\n\
            if (!opt.cnt) {\n\
                setTimeout(opt, 0, gotoState, onError);\n\
            }\n\
            break;\n\
        // ajaxProgress - 100%\n\
        case 3:\n\
            width = -1;\n\
            styleBar.width = "100%";\n\
            setTimeout(opt, 1000, gotoState, onError);\n\
            break;\n\
        // ajaxProgress - hide\n\
        case 4:\n\
            // debug timeElapsed\n\
            tmp = Date.now();\n\
            console.error(\n\
                "domOnEventAjaxProgressUpdate - timeElapsed - "\n\
                + (tmp - timeStart)\n\
                + " ms"\n\
            );\n\
            // cleanup timerInterval and timerTimeout\n\
            timeStart = tmp;\n\
            clearInterval(timerInterval);\n\
            timerInterval = undefined;\n\
            clearTimeout(timerTimeout);\n\
            timerTimeout = undefined;\n\
            // hide ajaxProgressBar\n\
            styleBar.background = "transparent";\n\
            // hide ajaxProgressModal\n\
            styleModal.opacity = "0";\n\
            if (onError) {\n\
                onError();\n\
            }\n\
            setTimeout(opt, 250, gotoState);\n\
            break;\n\
        // ajaxProgress - reset\n\
        default:\n\
            opt.cnt = 0;\n\
            width = 0;\n\
            styleBar.width = "0%";\n\
            styleModal.height = "0";\n\
        }\n\
    };\n\
    opt = window.domOnEventAjaxProgressUpdate;\n\
    opt.end = function (onError) {\n\
        opt.cnt = 0;\n\
        window.domOnEventAjaxProgressUpdate(2, onError);\n\
    };\n\
    // init styleBar\n\
    styleBar = document.getElementById("domElementAjaxProgressBar1").style;\n\
    styleBar0 = Object.assign({}, styleBar);\n\
    Object.entries({\n\
        background: "#d00",\n\
        height: "2px",\n\
        left: "0",\n\
        margin: "0",\n\
        padding: "0",\n\
        position: "fixed",\n\
        top: "0",\n\
        transition: "background 250ms, width 750ms",\n\
        width: "0%",\n\
        "z-index": "1"\n\
    }).forEach(function (entry) {\n\
        styleBar[entry[0]] = styleBar[entry[0]] || entry[1];\n\
    });\n\
    // init styleModal\n\
    styleModal = document.getElementById("domElementAjaxProgressModal1") || {};\n\
    styleModal = styleModal.style || {};\n\
    styleModal0 = Object.assign({}, styleModal);\n\
    Object.entries({\n\
        height: "0",\n\
        left: "0",\n\
        margin: "0",\n\
        padding: "0",\n\
        position: "fixed",\n\
        top: "0",\n\
        transition: "opacity 125ms",\n\
        width: "100%",\n\
        "z-index": "1"\n\
    }).forEach(function (entry) {\n\
        styleModal[entry[0]] = styleModal[entry[0]] || entry[1];\n\
    });\n\
    // init state\n\
    width = 0;\n\
    opt.cnt = 0;\n\
    opt.timeout = 30000;\n\
    // init ajaxProgress\n\
    window.domOnEventAjaxProgressUpdate();\n\
}());\n\
\n\
\n\
// init domOnEventDelegateDict\n\
(function () {\n\
/*\n\
 * this function will handle delegated dom-evt\n\
 */\n\
    "use strict";\n\
    let debounce;\n\
    let timerTimeout;\n\
    debounce = function () {\n\
        return setTimeout(function () {\n\
            timerTimeout = undefined;\n\
        }, 30);\n\
    };\n\
    if (!(\n\
        typeof window === "object" && window && window.document\n\
        && typeof document.addEventListener === "function"\n\
    ) || window.domOnEventDelegateDict) {\n\
        return;\n\
    }\n\
    window.domOnEventDelegateDict = {};\n\
    window.domOnEventDelegateDict.domOnEventDelegate = function (evt) {\n\
        evt.targetOnEvent = evt.target.closest("[data-onevent]");\n\
        if (\n\
            !evt.targetOnEvent\n\
            || evt.targetOnEvent.dataset.onevent === "domOnEventNop"\n\
            || evt.target.closest(".disabled,.readonly")\n\
        ) {\n\
            return;\n\
        }\n\
        // filter evt-change\n\
        switch (evt.type !== "change" && evt.target.type) {\n\
        case "checkbox":\n\
        case "file":\n\
        case "select-one":\n\
        case "radio":\n\
            return;\n\
        }\n\
        // filter evt-keyup\n\
        switch (evt.type) {\n\
        case "keyup":\n\
            if (!timerTimeout && (\n\
                evt.target.tagName === "INPUT"\n\
                || evt.target.tagName === "TEXTAREA"\n\
            )) {\n\
                timerTimeout = debounce();\n\
                if (evt.target.dataset.valueOld !== evt.target.value) {\n\
                    evt.target.dataset.valueOld = evt.target.value;\n\
                    break;\n\
                }\n\
            }\n\
            return;\n\
        }\n\
        switch (evt.targetOnEvent.tagName) {\n\
        case "BUTTON":\n\
        case "FORM":\n\
            evt.preventDefault();\n\
            break;\n\
        }\n\
        evt.stopPropagation();\n\
        // handle domOnEventClickTarget\n\
        if (evt.targetOnEvent.dataset.onevent === "domOnEventClickTarget") {\n\
            document.querySelector(\n\
                evt.targetOnEvent.dataset.clickTarget\n\
            ).click();\n\
            return;\n\
        }\n\
        window.domOnEventDelegateDict[evt.targetOnEvent.dataset.onevent](evt);\n\
    };\n\
    // handle evt\n\
    [\n\
        "change",\n\
        "click",\n\
        "keyup",\n\
        "submit"\n\
    ].forEach(function (eventType) {\n\
        document.addEventListener(\n\
            eventType,\n\
            window.domOnEventDelegateDict.domOnEventDelegate\n\
        );\n\
    });\n\
}());\n\
\n\
\n\
// init domOnEventSelectAllWithinPre\n\
(function () {\n\
/*\n\
 * this function will limit select-all within <pre tabIndex="0"> elem\n\
 * https://stackoverflow.com/questions/985272/selecting-text-in-an-element-akin-to-highlighting-with-your-mouse\n\
 */\n\
    "use strict";\n\
    if (!(\n\
        typeof window === "object" && window && window.document\n\
        && typeof document.addEventListener === "function"\n\
    ) || window.domOnEventSelectAllWithinPre) {\n\
        return;\n\
    }\n\
    window.domOnEventSelectAllWithinPre = function (evt) {\n\
        let range;\n\
        let selection;\n\
        if (\n\
            evt && (evt.ctrlKey || evt.metaKey) && evt.key === "a"\n\
            && evt.target.closest("pre")\n\
        ) {\n\
            range = document.createRange();\n\
            range.selectNodeContents(evt.target.closest("pre"));\n\
            selection = window.getSelection();\n\
            selection.removeAllRanges();\n\
            selection.addRange(range);\n\
            evt.preventDefault();\n\
        }\n\
    };\n\
    // handle evt\n\
    document.addEventListener(\n\
        "keydown",\n\
        window.domOnEventSelectAllWithinPre\n\
    );\n\
}());\n\
</script>\n\
<h1>\n\
<!-- utility2-comment\n\
<a\n\
    {{#if env.npm_package_homepage}}\n\
    href="{{env.npm_package_homepage}}"\n\
    {{/if env.npm_package_homepage}}\n\
    target="_blank"\n\
>\n\
utility2-comment -->\n\
    {{env.npm_package_name}} ({{env.npm_package_version}})\n\
<!-- utility2-comment\n\
</a>\n\
utility2-comment -->\n\
</h1>\n\
<h3>{{env.npm_package_description}}</h3>\n\
<!-- utility2-comment\n\
<a class="button" download href="assets.app.js">download standalone app</a><br>\n\
<button class="button" data-onevent="testRunBrowser" id="buttonTestRun1">run browser-tests</button><br>\n\
<div class="uiAnimateSlide" id="htmlTestReport1" style="border-bottom: 0; border-top: 0; margin-bottom: 0; margin-top: 0; max-height: 0; padding-bottom: 0; padding-top: 0;"></div>\n\
utility2-comment -->\n\
\n\
\n\
<!-- custom-html-start -->\n\
<label>edit or paste script below to\n\
    <a href="http://www.jslint.com" target="_blank">jslint</a>\n\
</label>\n\
<textarea class="textarea" data-onevent="domOnEventInputChange" id="inputJslint1">\n\
/*jslint\n\
    browser: true,\n\
*/\n\
const message = "hello";\n\
console.log(message);\n\
console.log(null);\n\
</textarea>\n\
<button class="button" data-onevent="domOnEventInputChange" id="buttonJslintAutofix1">jslint autofix</button><br>\n\
<textarea class="colorError readonly textarea" id="outputJslint1" readonly></textarea>\n\
\n\
\n\
\n\
<label>edit or paste script below to\n\
    <a href="https://github.com/CSSLint/csslint/wiki/Command-line-interface#options" target="_blank">csslint</a>\n\
</label>\n\
<textarea class="textarea" data-onevent="domOnEventInputChange" id="inputCsslint1">\n\
/*csslint\n\
    box-sizing: false,\n\
*/\n\
body {\n\
    box-sizing: border-box;\n\
    margin: 0px;\n\
}\n\
</textarea>\n\
<textarea class="colorError readonly textarea" id="outputCsslint1" readonly></textarea>\n\
<label>stderr and stdout</label>\n\
<textarea class="onevent-reset-output readonly textarea" id="outputStdout1" readonly></textarea>\n\
<script>\n\
/* jslint utility2:true */\n\
window.addEventListener("load", function () {\n\
"use strict";\n\
let local;\n\
local = window.utility2_jslint;\n\
local.domOnEventInputChange = function (evt) {\n\
    switch (evt.type + "." + evt.target.id) {\n\
    case "click.buttonJslintAutofix1":\n\
    case "keyup.inputCsslint1":\n\
    case "keyup.inputJslint1":\n\
        // csslint #inputCsslint1\n\
        local.jslintAndPrint(document.querySelector(\n\
            "#inputCsslint1"\n\
        ).value, "inputCsslint1.css");\n\
        document.querySelector(\n\
            "#outputCsslint1"\n\
        ).value = local.jslintResult.errMsg.replace((\n\
            /\\u001b\\[\\d*m/g\n\
        ), "").trim();\n\
        // jslint #inputJslint1\n\
        local.jslintAndPrint(document.querySelector(\n\
            "#inputJslint1"\n\
        ).value, "inputJslint1.js", {\n\
            autofix: evt.target.id === "buttonJslintAutofix1"\n\
        });\n\
        if (local.jslint.jslintResult.autofix) {\n\
            document.querySelector(\n\
                "#inputJslint1"\n\
            ).value = local.jslint.jslintResult.code;\n\
        }\n\
        document.querySelector(\n\
            "#outputJslint1"\n\
        ).value = local.jslintResult.errMsg.replace((\n\
            /\\u001b\\[\\d*m/g\n\
        ), "").trim();\n\
        break;\n\
    }\n\
};\n\
// handle evt\n\
local.domOnEventInputChange({\n\
    target: {\n\
        id: "inputJslint1"\n\
    },\n\
    type: "keyup"\n\
});\n\
});\n\
</script>\n\
<!-- custom-html-end -->\n\
\n\
\n\
<!-- utility2-comment\n\
{{#if isRollup}}\n\
<script src="assets.app.js"></script>\n\
{{#unless isRollup}}\n\
<script src="assets.utility2.rollup.js"></script>\n\
<script>window.utility2_onReadyBefore.cnt += 1;</script>\n\
<script src="utility2.state.init.js"></script>\n\
utility2-comment -->\n\
<script src="assets.jslint.js"></script>\n\
<script src="assets.example.js"></script>\n\
<script src="assets.test.js"></script>\n\
<script>\n\
if (window.utility2_onReadyBefore) {\n\
    window.utility2_onReadyBefore();\n\
}\n\
</script>\n\
<!-- utility2-comment\n\
{{/if isRollup}}\n\
utility2-comment -->\n\
<div style="text-align: center;">\n\
    [\n\
    this app was created with\n\
    <a\n\
        href="https://github.com/kaizhu256/node-utility2" target="_blank"\n\
    >utility2</a>\n\
    ]\n\
</div>\n\
</body>\n\
</html>\n\
';
/* jslint ignore:end */
local.assetsDict["/assets.jslint.js"] = (
    local.assetsDict["/assets.jslint.js"]
    || require("fs").readFileSync(
        require("path").resolve(local.__dirname + "/lib.jslint.js"),
        "utf8"
    ).replace((
        /^#!\//
    ), "// ")
);
/* validateLineSortedReset */
local.assetsDict["/"] = local.assetsDict[
    "/assets.index.template.html"
].replace((
    /\{\{env\.(\w+?)\}\}/g
), function (match0, match1) {
    switch (match1) {
    case "npm_package_description":
        return "the greatest app in the world!";
    case "npm_package_name":
        return "jslint-lite";
    case "npm_package_nameLib":
        return "jslint";
    case "npm_package_version":
        return "0.0.1";
    default:
        return match0;
    }
});
local.assetsDict["/assets.example.html"] = local.assetsDict["/"];
// init cli
if (module !== require.main || globalThis.utility2_rollup) {
    return;
}
local.assetsDict["/assets.example.js"] = (
    local.assetsDict["/assets.example.js"]
    || require("fs").readFileSync(__filename, "utf8")
);
local.assetsDict["/favicon.ico"] = local.assetsDict["/favicon.ico"] || "";
local.assetsDict["/index.html"] = local.assetsDict["/"];
// if $npm_config_timeout_exit exists,
// then exit this process after $npm_config_timeout_exit ms
if (Number(process.env.npm_config_timeout_exit)) {
    setTimeout(process.exit, Number(process.env.npm_config_timeout_exit));
}
// start server
if (globalThis.utility2_serverHttp1) {
    return;
}
process.env.PORT = process.env.PORT || "8081";
console.error("http-server listening on port " + process.env.PORT);
require("http").createServer(function (req, res) {
    let data;
    data = local.assetsDict[require("url").parse(req.url).pathname];
    if (data !== undefined) {
        res.end(data);
        return;
    }
    res.statusCode = 404;
    res.end();
}).listen(process.env.PORT);
}());
}());
