///usr/bin/env node
/* istanbul instrument in package jslint */
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
        // init global
        local.global = local.modeJs === 'browser'
            ? window
            : global;
        // init utility2_rollup
        local = local.global.utility2_rollup || local;
        // init lib
        local.local = local.jslint = local;
    }());



/* jslint-ignore-begin */
/* istanbul ignore next */
// init lib csslint
// https://github.com/CSSLint/csslint/blob/v0.10.0/release/csslint.js
// utility2-uglifyjs https://raw.githubusercontent.com/CSSLint/csslint/v0.10.0/release/csslint.js
(function () {
var exports=exports||{},CSSLint=function(){function Reporter(e,t){this.messages=
[],this.stats=[],this.lines=e,this.ruleset=t}var parserlib={};(function(){function e
(){this._listeners={}}function t(e){this._input=e.replace(/\n\r?/g,"\n"),this._line=1
,this._col=1,this._cursor=0}function n(e,t,n){this.col=n,this.line=t,this.message=
e}function r(e,t,n,r){this.col=n,this.line=t,this.text=e,this.type=r}function i(
e,n){this._reader=e?new t(e.toString()):null,this._token=null,this._tokenData=n,
this._lt=[],this._ltIndex=0,this._ltIndexCache=[]}e.prototype={constructor:e,addListener
:function(e,t){this._listeners[e]||(this._listeners[e]=[]),this._listeners[e].push
(t)},fire:function(e){typeof e=="string"&&(e={type:e}),typeof e.target!="undefined"&&
(e.target=this);if(typeof e.type=="undefined")throw new Error("Event object missing 'type' property."
);if(this._listeners[e.type]){var t=this._listeners[e.type].concat();for(var n=0
,r=t.length;n<r;n++)t[n].call(this,e)}},removeListener:function(e,t){if(this._listeners
[e]){var n=this._listeners[e];for(var r=0,i=n.length;r<i;r++)if(n[r]===t){n.splice
(r,1);break}}}},t.prototype={constructor:t,getCol:function(){return this._col},getLine
:function(){return this._line},eof:function(){return this._cursor==this._input.length
},peek:function(e){var t=null;return e=typeof e=="undefined"?1:e,this._cursor<this
._input.length&&(t=this._input.charAt(this._cursor+e-1)),t},read:function(){var e=
null;return this._cursor<this._input.length&&(this._input.charAt(this._cursor)=="\n"?
(this._line++,this._col=1):this._col++,e=this._input.charAt(this._cursor++)),e},
mark:function(){this._bookmark={cursor:this._cursor,line:this._line,col:this._col
}},reset:function(){this._bookmark&&(this._cursor=this._bookmark.cursor,this._line=
this._bookmark.line,this._col=this._bookmark.col,delete this._bookmark)},readTo:
function(e){var t="",n;while(t.length<e.length||t.lastIndexOf(e)!=t.length-e.length
){n=this.read();if(!n)throw new Error('Expected "'+e+'" at line '+this._line+", col "+
this._col+".");t+=n}return t},readWhile:function(e){var t="",n=this.read();while(
n!==null&&e(n))t+=n,n=this.read();return t},readMatch:function(e){var t=this._input
.substring(this._cursor),n=null;return typeof e=="string"?t.indexOf(e)===0&&(n=this
.readCount(e.length)):e instanceof RegExp&&e.test(t)&&(n=this.readCount(RegExp.lastMatch
.length)),n},readCount:function(e){var t="";while(e--)t+=this.read();return t}},
n.prototype=new Error,r.fromToken=function(e){return new r(e.value,e.startLine,e
.startCol)},r.prototype={constructor:r,valueOf:function(){return this.toString()
},toString:function(){return this.text}},i.createTokenData=function(e){var t=[],
n={},r=e.concat([]),i=0,s=r.length+1;r.UNKNOWN=-1,r.unshift({name:"EOF"});for(;i<
s;i++)t.push(r[i].name),r[r[i].name]=i,r[i].text&&(n[r[i].text]=i);return r.name=
function(e){return t[e]},r.type=function(e){return n[e]},r},i.prototype={constructor
:i,match:function(e,t){e instanceof Array||(e=[e]);var n=this.get(t),r=0,i=e.length
;while(r<i)if(n==e[r++])return!0;return this.unget(),!1},mustMatch:function(e,t)
{var r;e instanceof Array||(e=[e]);if(!this.match.apply(this,arguments))throw r=
this.LT(1),new n("Expected "+this._tokenData[e[0]].name+" at line "+r.startLine+", col "+
r.startCol+".",r.startLine,r.startCol)},advance:function(e,t){while(this.LA(0)!==0&&!
this.match(e,t))this.get();return this.LA(0)},get:function(e){var t=this._tokenData
,n=this._reader,r,i=0,s=t.length,o=!1,u,a;if(this._lt.length&&this._ltIndex>=0&&
this._ltIndex<this._lt.length){i++,this._token=this._lt[this._ltIndex++],a=t[this
._token.type];while(a.channel!==undefined&&e!==a.channel&&this._ltIndex<this._lt
.length)this._token=this._lt[this._ltIndex++],a=t[this._token.type],i++;if((a.channel===
undefined||e===a.channel)&&this._ltIndex<=this._lt.length)return this._ltIndexCache
.push(i),this._token.type}return u=this._getToken(),u.type>-1&&!t[u.type].hide&&
(u.channel=t[u.type].channel,this._token=u,this._lt.push(u),this._ltIndexCache.push
(this._lt.length-this._ltIndex+i),this._lt.length>5&&this._lt.shift(),this._ltIndexCache
.length>5&&this._ltIndexCache.shift(),this._ltIndex=this._lt.length),a=t[u.type]
,a&&(a.hide||a.channel!==undefined&&e!==a.channel)?this.get(e):u.type},LA:function(
e){var t=e,n;if(e>0){if(e>5)throw new Error("Too much lookahead.");while(t)n=this
.get(),t--;while(t<e)this.unget(),t++}else if(e<0){if(!this._lt[this._ltIndex+e]
)throw new Error("Too much lookbehind.");n=this._lt[this._ltIndex+e].type}else n=
this._token.type;return n},LT:function(e){return this.LA(e),this._lt[this._ltIndex+
e-1]},peek:function(){return this.LA(1)},token:function(){return this._token},tokenName
:function(e){return e<0||e>this._tokenData.length?"UNKNOWN_TOKEN":this._tokenData
[e].name},tokenType:function(e){return this._tokenData[e]||-1},unget:function(){
if(!this._ltIndexCache.length)throw new Error("Too much lookahead.");this._ltIndex-=
this._ltIndexCache.pop(),this._token=this._lt[this._ltIndex-1]}},parserlib.util=
{StringReader:t,SyntaxError:n,SyntaxUnit:r,EventTarget:e,TokenStreamBase:i}})(),
function(){function Combinator(e,t,n){SyntaxUnit.call(this,e,t,n,Parser.COMBINATOR_TYPE
),this.type="unknown",/^\s+$/.test(e)?this.type="descendant":e==">"?this.type="child"
:e=="+"?this.type="adjacent-sibling":e=="~"&&(this.type="sibling")}function MediaFeature
(e,t){SyntaxUnit.call(this,"("+e+(t!==null?":"+t:"")+")",e.startLine,e.startCol,
Parser.MEDIA_FEATURE_TYPE),this.name=e,this.value=t}function MediaQuery(e,t,n,r,
i){SyntaxUnit.call(this,(e?e+" ":"")+(t?t:"")+(t&&n.length>0?" and ":"")+n.join(" and "
),r,i,Parser.MEDIA_QUERY_TYPE),this.modifier=e,this.mediaType=t,this.features=n}
function Parser(e){EventTarget.call(this),this.options=e||{},this._tokenStream=null
}function PropertyName(e,t,n,r){SyntaxUnit.call(this,e,n,r,Parser.PROPERTY_NAME_TYPE
),this.hack=t}function PropertyValue(e,t,n){SyntaxUnit.call(this,e.join(" "),t,n
,Parser.PROPERTY_VALUE_TYPE),this.parts=e}function PropertyValueIterator(e){this
._i=0,this._parts=e.parts,this._marks=[],this.value=e}function PropertyValuePart
(text,line,col){SyntaxUnit.call(this,text,line,col,Parser.PROPERTY_VALUE_PART_TYPE
),this.type="unknown";var temp;if(/^([+\-]?[\d\.]+)([a-z]+)$/i.test(text)){this.
type="dimension",this.value=+RegExp.$1,this.units=RegExp.$2;switch(this.units.toLowerCase
()){case"em":case"rem":case"ex":case"px":case"cm":case"mm":case"in":case"pt":case"pc"
:case"ch":case"vh":case"vw":case"vm":this.type="length";break;case"deg":case"rad"
:case"grad":this.type="angle";break;case"ms":case"s":this.type="time";break;case"hz"
:case"khz":this.type="frequency";break;case"dpi":case"dpcm":this.type="resolution"
}}else/^([+\-]?[\d\.]+)%$/i.test(text)?(this.type="percentage",this.value=+RegExp
.$1):/^([+\-]?[\d\.]+)%$/i.test(text)?(this.type="percentage",this.value=+RegExp
.$1):/^([+\-]?\d+)$/i.test(text)?(this.type="integer",this.value=+RegExp.$1):/^([+\-]?[\d\.]+)$/i
.test(text)?(this.type="number",this.value=+RegExp.$1):/^#([a-f0-9]{3,6})/i.test
(text)?(this.type="color",temp=RegExp.$1,temp.length==3?(this.red=parseInt(temp.
charAt(0)+temp.charAt(0),16),this.green=parseInt(temp.charAt(1)+temp.charAt(1),16
),this.blue=parseInt(temp.charAt(2)+temp.charAt(2),16)):(this.red=parseInt(temp.
substring(0,2),16),this.green=parseInt(temp.substring(2,4),16),this.blue=parseInt
(temp.substring(4,6),16))):/^rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/i.test(text
)?(this.type="color",this.red=+RegExp.$1,this.green=+RegExp.$2,this.blue=+RegExp
.$3):/^rgb\(\s*(\d+)%\s*,\s*(\d+)%\s*,\s*(\d+)%\s*\)/i.test(text)?(this.type="color"
,this.red=+RegExp.$1*255/100,this.green=+RegExp.$2*255/100,this.blue=+RegExp.$3*255/100
):/^rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([\d\.]+)\s*\)/i.test(text)?(this
.type="color",this.red=+RegExp.$1,this.green=+RegExp.$2,this.blue=+RegExp.$3,this
.alpha=+RegExp.$4):/^rgba\(\s*(\d+)%\s*,\s*(\d+)%\s*,\s*(\d+)%\s*,\s*([\d\.]+)\s*\)/i
.test(text)?(this.type="color",this.red=+RegExp.$1*255/100,this.green=+RegExp.$2*255/100
,this.blue=+RegExp.$3*255/100,this.alpha=+RegExp.$4):/^hsl\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*\)/i
.test(text)?(this.type="color",this.hue=+RegExp.$1,this.saturation=+RegExp.$2/100
,this.lightness=+RegExp.$3/100):/^hsla\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*,\s*([\d\.]+)\s*\)/i
.test(text)?(this.type="color",this.hue=+RegExp.$1,this.saturation=+RegExp.$2/100
,this.lightness=+RegExp.$3/100,this.alpha=+RegExp.$4):/^url\(["']?([^\)"']+)["']?\)/i
.test(text)?(this.type="uri",this.uri=RegExp.$1):/^([^\(]+)\(/i.test(text)?(this
.type="function",this.name=RegExp.$1,this.value=text):/^["'][^"']*["']/.test(text
)?(this.type="string",this.value=eval(text)):Colors[text.toLowerCase()]?(this.type="color"
,temp=Colors[text.toLowerCase()].substring(1),this.red=parseInt(temp.substring(0
,2),16),this.green=parseInt(temp.substring(2,4),16),this.blue=parseInt(temp.substring
(4,6),16)):/^[\,\/]$/.test(text)?(this.type="operator",this.value=text):/^[a-z\-\u0080-\uFFFF][a-z0-9\-\u0080-\uFFFF]*$/i
.test(text)&&(this.type="identifier",this.value=text)}function Selector(e,t,n){SyntaxUnit
.call(this,e.join(" "),t,n,Parser.SELECTOR_TYPE),this.parts=e,this.specificity=Specificity
.calculate(this)}function SelectorPart(e,t,n,r,i){SyntaxUnit.call(this,n,r,i,Parser
.SELECTOR_PART_TYPE),this.elementName=e,this.modifiers=t}function SelectorSubPart
(e,t,n,r){SyntaxUnit.call(this,e,n,r,Parser.SELECTOR_SUB_PART_TYPE),this.type=t,
this.args=[]}function Specificity(e,t,n,r){this.a=e,this.b=t,this.c=n,this.d=r}function isHexDigit
(e){return e!==null&&h.test(e)}function isDigit(e){return e!==null&&/\d/.test(e)
}function isWhitespace(e){return e!==null&&/\s/.test(e)}function isNewLine(e){return e!==
null&&nl.test(e)}function isNameStart(e){return e!==null&&/[a-z_\u0080-\uFFFF\\]/i
.test(e)}function isNameChar(e){return e!==null&&(isNameStart(e)||/[0-9\-\\]/.test
(e))}function isIdentStart(e){return e!==null&&(isNameStart(e)||/\-\\/.test(e))}
function mix(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);return e}function TokenStream
(e){TokenStreamBase.call(this,e,Tokens)}function ValidationError(e,t,n){this.col=
n,this.line=t,this.message=e}var EventTarget=parserlib.util.EventTarget,TokenStreamBase=
parserlib.util.TokenStreamBase,StringReader=parserlib.util.StringReader,SyntaxError=
parserlib.util.SyntaxError,SyntaxUnit=parserlib.util.SyntaxUnit,Colors={aliceblue
:"#f0f8ff",antiquewhite:"#faebd7",aqua:"#00ffff",aquamarine:"#7fffd4",azure:"#f0ffff"
,beige:"#f5f5dc",bisque:"#ffe4c4",black:"#000000",blanchedalmond:"#ffebcd",blue:"#0000ff"
,blueviolet:"#8a2be2",brown:"#a52a2a",burlywood:"#deb887",cadetblue:"#5f9ea0",chartreuse
:"#7fff00",chocolate:"#d2691e",coral:"#ff7f50",cornflowerblue:"#6495ed",cornsilk
:"#fff8dc",crimson:"#dc143c",cyan:"#00ffff",darkblue:"#00008b",darkcyan:"#008b8b"
,darkgoldenrod:"#b8860b",darkgray:"#a9a9a9",darkgreen:"#006400",darkkhaki:"#bdb76b"
,darkmagenta:"#8b008b",darkolivegreen:"#556b2f",darkorange:"#ff8c00",darkorchid:"#9932cc"
,darkred:"#8b0000",darksalmon:"#e9967a",darkseagreen:"#8fbc8f",darkslateblue:"#483d8b"
,darkslategray:"#2f4f4f",darkturquoise:"#00ced1",darkviolet:"#9400d3",deeppink:"#ff1493"
,deepskyblue:"#00bfff",dimgray:"#696969",dodgerblue:"#1e90ff",firebrick:"#b22222"
,floralwhite:"#fffaf0",forestgreen:"#228b22",fuchsia:"#ff00ff",gainsboro:"#dcdcdc"
,ghostwhite:"#f8f8ff",gold:"#ffd700",goldenrod:"#daa520",gray:"#808080",green:"#008000"
,greenyellow:"#adff2f",honeydew:"#f0fff0",hotpink:"#ff69b4",indianred:"#cd5c5c",
indigo:"#4b0082",ivory:"#fffff0",khaki:"#f0e68c",lavender:"#e6e6fa",lavenderblush
:"#fff0f5",lawngreen:"#7cfc00",lemonchiffon:"#fffacd",lightblue:"#add8e6",lightcoral
:"#f08080",lightcyan:"#e0ffff",lightgoldenrodyellow:"#fafad2",lightgray:"#d3d3d3"
,lightgreen:"#90ee90",lightpink:"#ffb6c1",lightsalmon:"#ffa07a",lightseagreen:"#20b2aa"
,lightskyblue:"#87cefa",lightslategray:"#778899",lightsteelblue:"#b0c4de",lightyellow
:"#ffffe0",lime:"#00ff00",limegreen:"#32cd32",linen:"#faf0e6",magenta:"#ff00ff",
maroon:"#800000",mediumaquamarine:"#66cdaa",mediumblue:"#0000cd",mediumorchid:"#ba55d3"
,mediumpurple:"#9370d8",mediumseagreen:"#3cb371",mediumslateblue:"#7b68ee",mediumspringgreen
:"#00fa9a",mediumturquoise:"#48d1cc",mediumvioletred:"#c71585",midnightblue:"#191970"
,mintcream:"#f5fffa",mistyrose:"#ffe4e1",moccasin:"#ffe4b5",navajowhite:"#ffdead"
,navy:"#000080",oldlace:"#fdf5e6",olive:"#808000",olivedrab:"#6b8e23",orange:"#ffa500"
,orangered:"#ff4500",orchid:"#da70d6",palegoldenrod:"#eee8aa",palegreen:"#98fb98"
,paleturquoise:"#afeeee",palevioletred:"#d87093",papayawhip:"#ffefd5",peachpuff:"#ffdab9"
,peru:"#cd853f",pink:"#ffc0cb",plum:"#dda0dd",powderblue:"#b0e0e6",purple:"#800080"
,red:"#ff0000",rosybrown:"#bc8f8f",royalblue:"#4169e1",saddlebrown:"#8b4513",salmon
:"#fa8072",sandybrown:"#f4a460",seagreen:"#2e8b57",seashell:"#fff5ee",sienna:"#a0522d"
,silver:"#c0c0c0",skyblue:"#87ceeb",slateblue:"#6a5acd",slategray:"#708090",snow
:"#fffafa",springgreen:"#00ff7f",steelblue:"#4682b4",tan:"#d2b48c",teal:"#008080"
,thistle:"#d8bfd8",tomato:"#ff6347",turquoise:"#40e0d0",violet:"#ee82ee",wheat:"#f5deb3"
,white:"#ffffff",whitesmoke:"#f5f5f5",yellow:"#ffff00",yellowgreen:"#9acd32",activeBorder
:"Active window border.",activecaption:"Active window caption.",appworkspace:"Background color of multiple document interface."
,background:"Desktop background.",buttonface:"The face background color for 3-D elements that appear 3-D due to one layer of surrounding border."
,buttonhighlight:"The color of the border facing the light source for 3-D elements that appear 3-D due to one layer of surrounding border."
,buttonshadow:"The color of the border away from the light source for 3-D elements that appear 3-D due to one layer of surrounding border."
,buttontext:"Text on push buttons.",captiontext:"Text in caption, size box, and scrollbar arrow box."
,graytext:"Grayed (disabled) text. This color is set to #000 if the current display driver does not support a solid gray color."
,highlight:"Item(s) selected in a control.",highlighttext:"Text of item(s) selected in a control."
,inactiveborder:"Inactive window border.",inactivecaption:"Inactive window caption."
,inactivecaptiontext:"Color of text in an inactive caption.",infobackground:"Background color for tooltip controls."
,infotext:"Text color for tooltip controls.",menu:"Menu background.",menutext:"Text in menus."
,scrollbar:"Scroll bar gray area.",threeddarkshadow:"The color of the darker (generally outer) of the two borders away from the light source for 3-D elements that appear 3-D due to two concentric layers of surrounding border."
,threedface:"The face background color for 3-D elements that appear 3-D due to two concentric layers of surrounding border."
,threedhighlight:"The color of the lighter (generally outer) of the two borders facing the light source for 3-D elements that appear 3-D due to two concentric layers of surrounding border."
,threedlightshadow:"The color of the darker (generally inner) of the two borders facing the light source for 3-D elements that appear 3-D due to two concentric layers of surrounding border."
,threedshadow:"The color of the lighter (generally inner) of the two borders away from the light source for 3-D elements that appear 3-D due to two concentric layers of surrounding border."
,window:"Window background.",windowframe:"Window frame.",windowtext:"Text in windows."
};Combinator.prototype=new SyntaxUnit,Combinator.prototype.constructor=Combinator
,MediaFeature.prototype=new SyntaxUnit,MediaFeature.prototype.constructor=MediaFeature
,MediaQuery.prototype=new SyntaxUnit,MediaQuery.prototype.constructor=MediaQuery
,Parser.DEFAULT_TYPE=0,Parser.COMBINATOR_TYPE=1,Parser.MEDIA_FEATURE_TYPE=2,Parser
.MEDIA_QUERY_TYPE=3,Parser.PROPERTY_NAME_TYPE=4,Parser.PROPERTY_VALUE_TYPE=5,Parser
.PROPERTY_VALUE_PART_TYPE=6,Parser.SELECTOR_TYPE=7,Parser.SELECTOR_PART_TYPE=8,Parser
.SELECTOR_SUB_PART_TYPE=9,Parser.prototype=function(){var e=new EventTarget,t,n=
{constructor:Parser,DEFAULT_TYPE:0,COMBINATOR_TYPE:1,MEDIA_FEATURE_TYPE:2,MEDIA_QUERY_TYPE
:3,PROPERTY_NAME_TYPE:4,PROPERTY_VALUE_TYPE:5,PROPERTY_VALUE_PART_TYPE:6,SELECTOR_TYPE
:7,SELECTOR_PART_TYPE:8,SELECTOR_SUB_PART_TYPE:9,_stylesheet:function(){var e=this
._tokenStream,t=null,n,r,i;this.fire("startstylesheet"),this._charset(),this._skipCruft
();while(e.peek()==Tokens.IMPORT_SYM)this._import(),this._skipCruft();while(e.peek
()==Tokens.NAMESPACE_SYM)this._namespace(),this._skipCruft();i=e.peek();while(i>
Tokens.EOF){try{switch(i){case Tokens.MEDIA_SYM:this._media(),this._skipCruft();
break;case Tokens.PAGE_SYM:this._page(),this._skipCruft();break;case Tokens.FONT_FACE_SYM
:this._font_face(),this._skipCruft();break;case Tokens.KEYFRAMES_SYM:this._keyframes
(),this._skipCruft();break;case Tokens.VIEWPORT_SYM:this._viewport(),this._skipCruft
();break;case Tokens.UNKNOWN_SYM:e.get();if(!!this.options.strict)throw new SyntaxError
("Unknown @ rule.",e.LT(0).startLine,e.LT(0).startCol);this.fire({type:"error",error
:null,message:"Unknown @ rule: "+e.LT(0).value+".",line:e.LT(0).startLine,col:e.
LT(0).startCol}),n=0;while(e.advance([Tokens.LBRACE,Tokens.RBRACE])==Tokens.LBRACE
)n++;while(n)e.advance([Tokens.RBRACE]),n--;break;case Tokens.S:this._readWhitespace
();break;default:if(!this._ruleset())switch(i){case Tokens.CHARSET_SYM:throw r=e
.LT(1),this._charset(!1),new SyntaxError("@charset not allowed here.",r.startLine
,r.startCol);case Tokens.IMPORT_SYM:throw r=e.LT(1),this._import(!1),new SyntaxError
("@import not allowed here.",r.startLine,r.startCol);case Tokens.NAMESPACE_SYM:throw r=
e.LT(1),this._namespace(!1),new SyntaxError("@namespace not allowed here.",r.startLine
,r.startCol);default:e.get(),this._unexpectedToken(e.token())}}}catch(s){if(!(s instanceof
SyntaxError&&!this.options.strict))throw s;this.fire({type:"error",error:s,message
:s.message,line:s.line,col:s.col})}i=e.peek()}i!=Tokens.EOF&&this._unexpectedToken
(e.token()),this.fire("endstylesheet")},_charset:function(e){var t=this._tokenStream
,n,r,i,s;t.match(Tokens.CHARSET_SYM)&&(i=t.token().startLine,s=t.token().startCol
,this._readWhitespace(),t.mustMatch(Tokens.STRING),r=t.token(),n=r.value,this._readWhitespace
(),t.mustMatch(Tokens.SEMICOLON),e!==!1&&this.fire({type:"charset",charset:n,line
:i,col:s}))},_import:function(e){var t=this._tokenStream,n,r,i,s=[];t.mustMatch(
Tokens.IMPORT_SYM),i=t.token(),this._readWhitespace(),t.mustMatch([Tokens.STRING
,Tokens.URI]),r=t.token().value.replace(/(?:url\()?["']([^"']+)["']\)?/,"$1"),this
._readWhitespace(),s=this._media_query_list(),t.mustMatch(Tokens.SEMICOLON),this
._readWhitespace(),e!==!1&&this.fire({type:"import",uri:r,media:s,line:i.startLine
,col:i.startCol})},_namespace:function(e){var t=this._tokenStream,n,r,i,s;t.mustMatch
(Tokens.NAMESPACE_SYM),n=t.token().startLine,r=t.token().startCol,this._readWhitespace
(),t.match(Tokens.IDENT)&&(i=t.token().value,this._readWhitespace()),t.mustMatch
([Tokens.STRING,Tokens.URI]),s=t.token().value.replace(/(?:url\()?["']([^"']+)["']\)?/
,"$1"),this._readWhitespace(),t.mustMatch(Tokens.SEMICOLON),this._readWhitespace
(),e!==!1&&this.fire({type:"namespace",prefix:i,uri:s,line:n,col:r})},_media:function(
){var e=this._tokenStream,t,n,r;e.mustMatch(Tokens.MEDIA_SYM),t=e.token().startLine
,n=e.token().startCol,this._readWhitespace(),r=this._media_query_list(),e.mustMatch
(Tokens.LBRACE),this._readWhitespace(),this.fire({type:"startmedia",media:r,line
:t,col:n});for(;;)if(e.peek()==Tokens.PAGE_SYM)this._page();else if(e.peek()==Tokens
.FONT_FACE_SYM)this._font_face();else if(!this._ruleset())break;e.mustMatch(Tokens
.RBRACE),this._readWhitespace(),this.fire({type:"endmedia",media:r,line:t,col:n}
)},_media_query_list:function(){var e=this._tokenStream,t=[];this._readWhitespace
(),(e.peek()==Tokens.IDENT||e.peek()==Tokens.LPAREN)&&t.push(this._media_query()
);while(e.match(Tokens.COMMA))this._readWhitespace(),t.push(this._media_query())
;return t},_media_query:function(){var e=this._tokenStream,t=null,n=null,r=null,
i=[];e.match(Tokens.IDENT)&&(n=e.token().value.toLowerCase(),n!="only"&&n!="not"?
(e.unget(),n=null):r=e.token()),this._readWhitespace(),e.peek()==Tokens.IDENT?(t=
this._media_type(),r===null&&(r=e.token())):e.peek()==Tokens.LPAREN&&(r===null&&
(r=e.LT(1)),i.push(this._media_expression()));if(t===null&&i.length===0)return null
;this._readWhitespace();while(e.match(Tokens.IDENT))e.token().value.toLowerCase(
)!="and"&&this._unexpectedToken(e.token()),this._readWhitespace(),i.push(this._media_expression
());return new MediaQuery(n,t,i,r.startLine,r.startCol)},_media_type:function(){
return this._media_feature()},_media_expression:function(){var e=this._tokenStream
,t=null,n,r=null;return e.mustMatch(Tokens.LPAREN),t=this._media_feature(),this.
_readWhitespace(),e.match(Tokens.COLON)&&(this._readWhitespace(),n=e.LT(1),r=this
._expression()),e.mustMatch(Tokens.RPAREN),this._readWhitespace(),new MediaFeature
(t,r?new SyntaxUnit(r,n.startLine,n.startCol):null)},_media_feature:function(){var e=
this._tokenStream;return e.mustMatch(Tokens.IDENT),SyntaxUnit.fromToken(e.token(
))},_page:function(){var e=this._tokenStream,t,n,r=null,i=null;e.mustMatch(Tokens
.PAGE_SYM),t=e.token().startLine,n=e.token().startCol,this._readWhitespace(),e.match
(Tokens.IDENT)&&(r=e.token().value,r.toLowerCase()==="auto"&&this._unexpectedToken
(e.token())),e.peek()==Tokens.COLON&&(i=this._pseudo_page()),this._readWhitespace
(),this.fire({type:"startpage",id:r,pseudo:i,line:t,col:n}),this._readDeclarations
(!0,!0),this.fire({type:"endpage",id:r,pseudo:i,line:t,col:n})},_margin:function(
){var e=this._tokenStream,t,n,r=this._margin_sym();return r?(t=e.token().startLine
,n=e.token().startCol,this.fire({type:"startpagemargin",margin:r,line:t,col:n}),
this._readDeclarations(!0),this.fire({type:"endpagemargin",margin:r,line:t,col:n
}),!0):!1},_margin_sym:function(){var e=this._tokenStream;return e.match([Tokens
.TOPLEFTCORNER_SYM,Tokens.TOPLEFT_SYM,Tokens.TOPCENTER_SYM,Tokens.TOPRIGHT_SYM,Tokens
.TOPRIGHTCORNER_SYM,Tokens.BOTTOMLEFTCORNER_SYM,Tokens.BOTTOMLEFT_SYM,Tokens.BOTTOMCENTER_SYM
,Tokens.BOTTOMRIGHT_SYM,Tokens.BOTTOMRIGHTCORNER_SYM,Tokens.LEFTTOP_SYM,Tokens.LEFTMIDDLE_SYM
,Tokens.LEFTBOTTOM_SYM,Tokens.RIGHTTOP_SYM,Tokens.RIGHTMIDDLE_SYM,Tokens.RIGHTBOTTOM_SYM
])?SyntaxUnit.fromToken(e.token()):null},_pseudo_page:function(){var e=this._tokenStream
;return e.mustMatch(Tokens.COLON),e.mustMatch(Tokens.IDENT),e.token().value},_font_face
:function(){var e=this._tokenStream,t,n;e.mustMatch(Tokens.FONT_FACE_SYM),t=e.token
().startLine,n=e.token().startCol,this._readWhitespace(),this.fire({type:"startfontface"
,line:t,col:n}),this._readDeclarations(!0),this.fire({type:"endfontface",line:t,
col:n})},_viewport:function(){var e=this._tokenStream,t,n;e.mustMatch(Tokens.VIEWPORT_SYM
),t=e.token().startLine,n=e.token().startCol,this._readWhitespace(),this.fire({type
:"startviewport",line:t,col:n}),this._readDeclarations(!0),this.fire({type:"endviewport"
,line:t,col:n})},_operator:function(e){var t=this._tokenStream,n=null;if(t.match
([Tokens.SLASH,Tokens.COMMA])||e&&t.match([Tokens.PLUS,Tokens.STAR,Tokens.MINUS]
))n=t.token(),this._readWhitespace();return n?PropertyValuePart.fromToken(n):null
},_combinator:function(){var e=this._tokenStream,t=null,n;return e.match([Tokens
.PLUS,Tokens.GREATER,Tokens.TILDE])&&(n=e.token(),t=new Combinator(n.value,n.startLine
,n.startCol),this._readWhitespace()),t},_unary_operator:function(){var e=this._tokenStream
;return e.match([Tokens.MINUS,Tokens.PLUS])?e.token().value:null},_property:function(
){var e=this._tokenStream,t=null,n=null,r,i,s,o;return e.peek()==Tokens.STAR&&this
.options.starHack&&(e.get(),i=e.token(),n=i.value,s=i.startLine,o=i.startCol),e.
match(Tokens.IDENT)&&(i=e.token(),r=i.value,r.charAt(0)=="_"&&this.options.underscoreHack&&
(n="_",r=r.substring(1)),t=new PropertyName(r,n,s||i.startLine,o||i.startCol),this
._readWhitespace()),t},_ruleset:function(){var e=this._tokenStream,t,n;try{n=this
._selectors_group()}catch(r){if(r instanceof SyntaxError&&!this.options.strict){
this.fire({type:"error",error:r,message:r.message,line:r.line,col:r.col}),t=e.advance
([Tokens.RBRACE]);if(t!=Tokens.RBRACE)throw r;return!0}throw r}return n&&(this.fire
({type:"startrule",selectors:n,line:n[0].line,col:n[0].col}),this._readDeclarations
(!0),this.fire({type:"endrule",selectors:n,line:n[0].line,col:n[0].col})),n},_selectors_group
:function(){var e=this._tokenStream,t=[],n;n=this._selector();if(n!==null){t.push
(n);while(e.match(Tokens.COMMA))this._readWhitespace(),n=this._selector(),n!==null?
t.push(n):this._unexpectedToken(e.LT(1))}return t.length?t:null},_selector:function(
){var e=this._tokenStream,t=[],n=null,r=null,i=null;n=this._simple_selector_sequence
();if(n===null)return null;t.push(n);do{r=this._combinator();if(r!==null)t.push(
r),n=this._simple_selector_sequence(),n===null?this._unexpectedToken(e.LT(1)):t.
push(n);else{if(!this._readWhitespace())break;i=new Combinator(e.token().value,e
.token().startLine,e.token().startCol),r=this._combinator(),n=this._simple_selector_sequence
(),n===null?r!==null&&this._unexpectedToken(e.LT(1)):(r!==null?t.push(r):t.push(
i),t.push(n))}}while(!0);return new Selector(t,t[0].line,t[0].col)},_simple_selector_sequence
:function(){var e=this._tokenStream,t=null,n=[],r="",i=[function(){return e.match
(Tokens.HASH)?new SelectorSubPart(e.token().value,"id",e.token().startLine,e.token
().startCol):null},this._class,this._attrib,this._pseudo,this._negation],s=0,o=i
.length,u=null,a=!1,f,l;f=e.LT(1).startLine,l=e.LT(1).startCol,t=this._type_selector
(),t||(t=this._universal()),t!==null&&(r+=t);for(;;){if(e.peek()===Tokens.S)break;
while(s<o&&u===null)u=i[s++].call(this);if(u===null){if(r==="")return null;break}
s=0,n.push(u),r+=u.toString(),u=null}return r!==""?new SelectorPart(t,n,r,f,l):null
},_type_selector:function(){var e=this._tokenStream,t=this._namespace_prefix(),n=
this._element_name();return n?(t&&(n.text=t+n.text,n.col-=t.length),n):(t&&(e.unget
(),t.length>1&&e.unget()),null)},_class:function(){var e=this._tokenStream,t;return e
.match(Tokens.DOT)?(e.mustMatch(Tokens.IDENT),t=e.token(),new SelectorSubPart("."+
t.value,"class",t.startLine,t.startCol-1)):null},_element_name:function(){var e=
this._tokenStream,t;return e.match(Tokens.IDENT)?(t=e.token(),new SelectorSubPart
(t.value,"elementName",t.startLine,t.startCol)):null},_namespace_prefix:function(
){var e=this._tokenStream,t="";if(e.LA(1)===Tokens.PIPE||e.LA(2)===Tokens.PIPE)e
.match([Tokens.IDENT,Tokens.STAR])&&(t+=e.token().value),e.mustMatch(Tokens.PIPE
),t+="|";return t.length?t:null},_universal:function(){var e=this._tokenStream,t=""
,n;return n=this._namespace_prefix(),n&&(t+=n),e.match(Tokens.STAR)&&(t+="*"),t.
length?t:null},_attrib:function(){var e=this._tokenStream,t=null,n,r;return e.match
(Tokens.LBRACKET)?(r=e.token(),t=r.value,t+=this._readWhitespace(),n=this._namespace_prefix
(),n&&(t+=n),e.mustMatch(Tokens.IDENT),t+=e.token().value,t+=this._readWhitespace
(),e.match([Tokens.PREFIXMATCH,Tokens.SUFFIXMATCH,Tokens.SUBSTRINGMATCH,Tokens.EQUALS
,Tokens.INCLUDES,Tokens.DASHMATCH])&&(t+=e.token().value,t+=this._readWhitespace
(),e.mustMatch([Tokens.IDENT,Tokens.STRING]),t+=e.token().value,t+=this._readWhitespace
()),e.mustMatch(Tokens.RBRACKET),new SelectorSubPart(t+"]","attribute",r.startLine
,r.startCol)):null},_pseudo:function(){var e=this._tokenStream,t=null,n=":",r,i;
return e.match(Tokens.COLON)&&(e.match(Tokens.COLON)&&(n+=":"),e.match(Tokens.IDENT
)?(t=e.token().value,r=e.token().startLine,i=e.token().startCol-n.length):e.peek
()==Tokens.FUNCTION&&(r=e.LT(1).startLine,i=e.LT(1).startCol-n.length,t=this._functional_pseudo
()),t&&(t=new SelectorSubPart(n+t,"pseudo",r,i))),t},_functional_pseudo:function(
){var e=this._tokenStream,t=null;return e.match(Tokens.FUNCTION)&&(t=e.token().value
,t+=this._readWhitespace(),t+=this._expression(),e.mustMatch(Tokens.RPAREN),t+=")"
),t},_expression:function(){var e=this._tokenStream,t="";while(e.match([Tokens.PLUS
,Tokens.MINUS,Tokens.DIMENSION,Tokens.NUMBER,Tokens.STRING,Tokens.IDENT,Tokens.LENGTH
,Tokens.FREQ,Tokens.ANGLE,Tokens.TIME,Tokens.RESOLUTION,Tokens.SLASH]))t+=e.token
().value,t+=this._readWhitespace();return t.length?t:null},_negation:function(){
var e=this._tokenStream,t,n,r="",i,s=null;return e.match(Tokens.NOT)&&(r=e.token
().value,t=e.token().startLine,n=e.token().startCol,r+=this._readWhitespace(),i=
this._negation_arg(),r+=i,r+=this._readWhitespace(),e.match(Tokens.RPAREN),r+=e.
token().value,s=new SelectorSubPart(r,"not",t,n),s.args.push(i)),s},_negation_arg
:function(){var e=this._tokenStream,t=[this._type_selector,this._universal,function(
){return e.match(Tokens.HASH)?new SelectorSubPart(e.token().value,"id",e.token()
.startLine,e.token().startCol):null},this._class,this._attrib,this._pseudo],n=null
,r=0,i=t.length,s,o,u,a;o=e.LT(1).startLine,u=e.LT(1).startCol;while(r<i&&n===null
)n=t[r].call(this),r++;return n===null&&this._unexpectedToken(e.LT(1)),n.type=="elementName"?
a=new SelectorPart(n,[],n.toString(),o,u):a=new SelectorPart(null,[n],n.toString
(),o,u),a},_declaration:function(){var e=this._tokenStream,t=null,n=null,r=null,
i=null,s=null,o="";t=this._property();if(t!==null){e.mustMatch(Tokens.COLON),this
._readWhitespace(),n=this._expr(),(!n||n.length===0)&&this._unexpectedToken(e.LT
(1)),r=this._prio(),o=t.toString();if(this.options.starHack&&t.hack=="*"||this.options
.underscoreHack&&t.hack=="_")o=t.text;try{this._validateProperty(o,n)}catch(u){s=
u}return this.fire({type:"property",property:t,value:n,important:r,line:t.line,col
:t.col,invalid:s}),!0}return!1},_prio:function(){var e=this._tokenStream,t=e.match
(Tokens.IMPORTANT_SYM);return this._readWhitespace(),t},_expr:function(e){var t=
this._tokenStream,n=[],r=null,i=null;r=this._term();if(r!==null){n.push(r);do{i=
this._operator(e),i&&n.push(i),r=this._term();if(r===null)break;n.push(r)}while(!0
)}return n.length>0?new PropertyValue(n,n[0].line,n[0].col):null},_term:function(
){var e=this._tokenStream,t=null,n=null,r,i,s;return t=this._unary_operator(),t!==
null&&(i=e.token().startLine,s=e.token().startCol),e.peek()==Tokens.IE_FUNCTION&&
this.options.ieFilters?(n=this._ie_function(),t===null&&(i=e.token().startLine,s=
e.token().startCol)):e.match([Tokens.NUMBER,Tokens.PERCENTAGE,Tokens.LENGTH,Tokens
.ANGLE,Tokens.TIME,Tokens.FREQ,Tokens.STRING,Tokens.IDENT,Tokens.URI,Tokens.UNICODE_RANGE
])?(n=e.token().value,t===null&&(i=e.token().startLine,s=e.token().startCol),this
._readWhitespace()):(r=this._hexcolor(),r===null?(t===null&&(i=e.LT(1).startLine
,s=e.LT(1).startCol),n===null&&(e.LA(3)==Tokens.EQUALS&&this.options.ieFilters?n=
this._ie_function():n=this._function())):(n=r.value,t===null&&(i=r.startLine,s=r
.startCol))),n!==null?new PropertyValuePart(t!==null?t+n:n,i,s):null},_function:
function(){var e=this._tokenStream,t=null,n=null,r;if(e.match(Tokens.FUNCTION)){
t=e.token().value,this._readWhitespace(),n=this._expr(!0),t+=n;if(this.options.ieFilters&&
e.peek()==Tokens.EQUALS)do{this._readWhitespace()&&(t+=e.token().value),e.LA(0)==
Tokens.COMMA&&(t+=e.token().value),e.match(Tokens.IDENT),t+=e.token().value,e.match
(Tokens.EQUALS),t+=e.token().value,r=e.peek();while(r!=Tokens.COMMA&&r!=Tokens.S&&
r!=Tokens.RPAREN)e.get(),t+=e.token().value,r=e.peek()}while(e.match([Tokens.COMMA
,Tokens.S]));e.match(Tokens.RPAREN),t+=")",this._readWhitespace()}return t},_ie_function
:function(){var e=this._tokenStream,t=null,n=null,r;if(e.match([Tokens.IE_FUNCTION
,Tokens.FUNCTION])){t=e.token().value;do{this._readWhitespace()&&(t+=e.token().value
),e.LA(0)==Tokens.COMMA&&(t+=e.token().value),e.match(Tokens.IDENT),t+=e.token()
.value,e.match(Tokens.EQUALS),t+=e.token().value,r=e.peek();while(r!=Tokens.COMMA&&
r!=Tokens.S&&r!=Tokens.RPAREN)e.get(),t+=e.token().value,r=e.peek()}while(e.match
([Tokens.COMMA,Tokens.S]));e.match(Tokens.RPAREN),t+=")",this._readWhitespace()}
return t},_hexcolor:function(){var e=this._tokenStream,t=null,n;if(e.match(Tokens
.HASH)){t=e.token(),n=t.value;if(!/#[a-f0-9]{3,6}/i.test(n))throw new SyntaxError
("Expected a hex color but found '"+n+"' at line "+t.startLine+", col "+t.startCol+"."
,t.startLine,t.startCol);this._readWhitespace()}return t},_keyframes:function(){
var e=this._tokenStream,t,n,r,i="";e.mustMatch(Tokens.KEYFRAMES_SYM),t=e.token()
,/^@\-([^\-]+)\-/.test(t.value)&&(i=RegExp.$1),this._readWhitespace(),r=this._keyframe_name
(),this._readWhitespace(),e.mustMatch(Tokens.LBRACE),this.fire({type:"startkeyframes"
,name:r,prefix:i,line:t.startLine,col:t.startCol}),this._readWhitespace(),n=e.peek
();while(n==Tokens.IDENT||n==Tokens.PERCENTAGE)this._keyframe_rule(),this._readWhitespace
(),n=e.peek();this.fire({type:"endkeyframes",name:r,prefix:i,line:t.startLine,col
:t.startCol}),this._readWhitespace(),e.mustMatch(Tokens.RBRACE)},_keyframe_name:
function(){var e=this._tokenStream,t;return e.mustMatch([Tokens.IDENT,Tokens.STRING
]),SyntaxUnit.fromToken(e.token())},_keyframe_rule:function(){var e=this._tokenStream
,t,n=this._key_list();this.fire({type:"startkeyframerule",keys:n,line:n[0].line,
col:n[0].col}),this._readDeclarations(!0),this.fire({type:"endkeyframerule",keys
:n,line:n[0].line,col:n[0].col})},_key_list:function(){var e=this._tokenStream,t
,n,r=[];r.push(this._key()),this._readWhitespace();while(e.match(Tokens.COMMA))this
._readWhitespace(),r.push(this._key()),this._readWhitespace();return r},_key:function(
){var e=this._tokenStream,t;if(e.match(Tokens.PERCENTAGE))return SyntaxUnit.fromToken
(e.token());if(e.match(Tokens.IDENT)){t=e.token();if(/from|to/i.test(t.value))return SyntaxUnit
.fromToken(t);e.unget()}this._unexpectedToken(e.LT(1))},_skipCruft:function(){while(
this._tokenStream.match([Tokens.S,Tokens.CDO,Tokens.CDC]));},_readDeclarations:function(
e,t){var n=this._tokenStream,r;this._readWhitespace(),e&&n.mustMatch(Tokens.LBRACE
),this._readWhitespace();try{for(;;){if(!(n.match(Tokens.SEMICOLON)||t&&this._margin
())){if(!this._declaration())break;if(!n.match(Tokens.SEMICOLON))break}this._readWhitespace
()}n.mustMatch(Tokens.RBRACE),this._readWhitespace()}catch(i){if(!(i instanceof
SyntaxError&&!this.options.strict))throw i;this.fire({type:"error",error:i,message
:i.message,line:i.line,col:i.col}),r=n.advance([Tokens.SEMICOLON,Tokens.RBRACE])
;if(r==Tokens.SEMICOLON)this._readDeclarations(!1,t);else if(r!=Tokens.RBRACE)throw i
}},_readWhitespace:function(){var e=this._tokenStream,t="";while(e.match(Tokens.
S))t+=e.token().value;return t},_unexpectedToken:function(e){throw new SyntaxError
("Unexpected token '"+e.value+"' at line "+e.startLine+", col "+e.startCol+".",e
.startLine,e.startCol)},_verifyEnd:function(){this._tokenStream.LA(1)!=Tokens.EOF&&
this._unexpectedToken(this._tokenStream.LT(1))},_validateProperty:function(e,t){
Validation.validate(e,t)},parse:function(e){this._tokenStream=new TokenStream(e,
Tokens),this._stylesheet()},parseStyleSheet:function(e){return this.parse(e)},parseMediaQuery
:function(e){this._tokenStream=new TokenStream(e,Tokens);var t=this._media_query
();return this._verifyEnd(),t},parsePropertyValue:function(e){this._tokenStream=new
TokenStream(e,Tokens),this._readWhitespace();var t=this._expr();return this._readWhitespace
(),this._verifyEnd(),t},parseRule:function(e){this._tokenStream=new TokenStream(
e,Tokens),this._readWhitespace();var t=this._ruleset();return this._readWhitespace
(),this._verifyEnd(),t},parseSelector:function(e){this._tokenStream=new TokenStream
(e,Tokens),this._readWhitespace();var t=this._selector();return this._readWhitespace
(),this._verifyEnd(),t},parseStyleAttribute:function(e){e+="}",this._tokenStream=new
TokenStream(e,Tokens),this._readDeclarations()}};for(t in n)n.hasOwnProperty(t)&&
(e[t]=n[t]);return e}();var Properties={"alignment-adjust":"auto | baseline | before-edge | text-before-edge | middle | central | after-edge | text-after-edge | ideographic | alphabetic | hanging | mathematical | <percentage> | <length>"
,"alignment-baseline":"baseline | use-script | before-edge | text-before-edge | after-edge | text-after-edge | central | middle | ideographic | alphabetic | hanging | mathematical"
,animation:1,"animation-delay":{multi:"<time>",comma:!0},"animation-direction":{
multi:"normal | alternate",comma:!0},"animation-duration":{multi:"<time>",comma:!0
},"animation-iteration-count":{multi:"<number> | infinite",comma:!0},"animation-name"
:{multi:"none | <ident>",comma:!0},"animation-play-state":{multi:"running | paused"
,comma:!0},"animation-timing-function":1,"-moz-animation-delay":{multi:"<time>",
comma:!0},"-moz-animation-direction":{multi:"normal | alternate",comma:!0},"-moz-animation-duration"
:{multi:"<time>",comma:!0},"-moz-animation-iteration-count":{multi:"<number> | infinite"
,comma:!0},"-moz-animation-name":{multi:"none | <ident>",comma:!0},"-moz-animation-play-state"
:{multi:"running | paused",comma:!0},"-ms-animation-delay":{multi:"<time>",comma
:!0},"-ms-animation-direction":{multi:"normal | alternate",comma:!0},"-ms-animation-duration"
:{multi:"<time>",comma:!0},"-ms-animation-iteration-count":{multi:"<number> | infinite"
,comma:!0},"-ms-animation-name":{multi:"none | <ident>",comma:!0},"-ms-animation-play-state"
:{multi:"running | paused",comma:!0},"-webkit-animation-delay":{multi:"<time>",comma
:!0},"-webkit-animation-direction":{multi:"normal | alternate",comma:!0},"-webkit-animation-duration"
:{multi:"<time>",comma:!0},"-webkit-animation-iteration-count":{multi:"<number> | infinite"
,comma:!0},"-webkit-animation-name":{multi:"none | <ident>",comma:!0},"-webkit-animation-play-state"
:{multi:"running | paused",comma:!0},"-o-animation-delay":{multi:"<time>",comma:!0
},"-o-animation-direction":{multi:"normal | alternate",comma:!0},"-o-animation-duration"
:{multi:"<time>",comma:!0},"-o-animation-iteration-count":{multi:"<number> | infinite"
,comma:!0},"-o-animation-name":{multi:"none | <ident>",comma:!0},"-o-animation-play-state"
:{multi:"running | paused",comma:!0},appearance:"icon | window | desktop | workspace | document | tooltip | dialog | button | push-button | hyperlink | radio-button | checkbox | menu-item | tab | menu | menubar | pull-down-menu | pop-up-menu | list-menu | radio-group | checkbox-group | outline-tree | range | field | combo-box | signature | password | normal | none | inherit"
,azimuth:function(e){var t="<angle> | leftwards | rightwards | inherit",n="left-side | far-left | left | center-left | center | center-right | right | far-right | right-side"
,r=!1,i=!1,s;ValidationTypes.isAny(e,t)||(ValidationTypes.isAny(e,"behind")&&(r=!0
,i=!0),ValidationTypes.isAny(e,n)&&(i=!0,r||ValidationTypes.isAny(e,"behind")));
if(e.hasNext())throw s=e.next(),i?new ValidationError("Expected end of value but found '"+
s+"'.",s.line,s.col):new ValidationError("Expected (<'azimuth'>) but found '"+s+"'."
,s.line,s.col)},"backface-visibility":"visible | hidden",background:1,"background-attachment"
:{multi:"<attachment>",comma:!0},"background-clip":{multi:"<box>",comma:!0},"background-color"
:"<color> | inherit","background-image":{multi:"<bg-image>",comma:!0},"background-origin"
:{multi:"<box>",comma:!0},"background-position":{multi:"<bg-position>",comma:!0}
,"background-repeat":{multi:"<repeat-style>"},"background-size":{multi:"<bg-size>"
,comma:!0},"baseline-shift":"baseline | sub | super | <percentage> | <length>",behavior
:1,binding:1,bleed:"<length>","bookmark-label":"<content> | <attr> | <string>","bookmark-level"
:"none | <integer>","bookmark-state":"open | closed","bookmark-target":"none | <uri> | <attr>"
,border:"<border-width> || <border-style> || <color>","border-bottom":"<border-width> || <border-style> || <color>"
,"border-bottom-color":"<color> | inherit","border-bottom-left-radius":"<x-one-radius>"
,"border-bottom-right-radius":"<x-one-radius>","border-bottom-style":"<border-style>"
,"border-bottom-width":"<border-width>","border-collapse":"collapse | separate | inherit"
,"border-color":{multi:"<color> | inherit",max:4},"border-image":1,"border-image-outset"
:{multi:"<length> | <number>",max:4},"border-image-repeat":{multi:"stretch | repeat | round"
,max:2},"border-image-slice":function(e){var t=!1,n="<number> | <percentage>",r=!1
,i=0,s=4,o;ValidationTypes.isAny(e,"fill")&&(r=!0,t=!0);while(e.hasNext()&&i<s){
t=ValidationTypes.isAny(e,n);if(!t)break;i++}r?t=!0:ValidationTypes.isAny(e,"fill"
);if(e.hasNext())throw o=e.next(),t?new ValidationError("Expected end of value but found '"+
o+"'.",o.line,o.col):new ValidationError("Expected ([<number> | <percentage>]{1,4} && fill?) but found '"+
o+"'.",o.line,o.col)},"border-image-source":"<image> | none","border-image-width"
:{multi:"<length> | <percentage> | <number> | auto",max:4},"border-left":"<border-width> || <border-style> || <color>"
,"border-left-color":"<color> | inherit","border-left-style":"<border-style>","border-left-width"
:"<border-width>","border-radius":function(e){var t=!1,n="<length> | <percentage> | inherit"
,r=!1,i=!1,s=0,o=8,u;while(e.hasNext()&&s<o){t=ValidationTypes.isAny(e,n);if(!t)
{if(!(e.peek()=="/"&&s>0&&!r))break;r=!0,o=s+5,e.next()}s++}if(e.hasNext())throw u=
e.next(),t?new ValidationError("Expected end of value but found '"+u+"'.",u.line
,u.col):new ValidationError("Expected (<'border-radius'>) but found '"+u+"'.",u.
line,u.col)},"border-right":"<border-width> || <border-style> || <color>","border-right-color"
:"<color> | inherit","border-right-style":"<border-style>","border-right-width":"<border-width>"
,"border-spacing":{multi:"<length> | inherit",max:2},"border-style":{multi:"<border-style>"
,max:4},"border-top":"<border-width> || <border-style> || <color>","border-top-color"
:"<color> | inherit","border-top-left-radius":"<x-one-radius>","border-top-right-radius"
:"<x-one-radius>","border-top-style":"<border-style>","border-top-width":"<border-width>"
,"border-width":{multi:"<border-width>",max:4},bottom:"<margin-width> | inherit"
,"box-align":"start | end | center | baseline | stretch","box-decoration-break":"slice |clone"
,"box-direction":"normal | reverse | inherit","box-flex":"<number>","box-flex-group"
:"<integer>","box-lines":"single | multiple","box-ordinal-group":"<integer>","box-orient"
:"horizontal | vertical | inline-axis | block-axis | inherit","box-pack":"start | end | center | justify"
,"box-shadow":function(e){var t=!1,n;if(!ValidationTypes.isAny(e,"none"))Validation
.multiProperty("<shadow>",e,!0,Infinity);else if(e.hasNext())throw n=e.next(),new
ValidationError("Expected end of value but found '"+n+"'.",n.line,n.col)},"box-sizing"
:"content-box | border-box | inherit","break-after":"auto | always | avoid | left | right | page | column | avoid-page | avoid-column"
,"break-before":"auto | always | avoid | left | right | page | column | avoid-page | avoid-column"
,"break-inside":"auto | avoid | avoid-page | avoid-column","caption-side":"top | bottom | inherit"
,clear:"none | right | left | both | inherit",clip:1,color:"<color> | inherit","color-profile"
:1,"column-count":"<integer> | auto","column-fill":"auto | balance","column-gap"
:"<length> | normal","column-rule":"<border-width> || <border-style> || <color>"
,"column-rule-color":"<color>","column-rule-style":"<border-style>","column-rule-width"
:"<border-width>","column-span":"none | all","column-width":"<length> | auto",columns
:1,content:1,"counter-increment":1,"counter-reset":1,crop:"<shape> | auto",cue:"cue-after | cue-before | inherit"
,"cue-after":1,"cue-before":1,cursor:1,direction:"ltr | rtl | inherit",display:"inline | block | list-item | inline-block | table | inline-table | table-row-group | table-header-group | table-footer-group | table-row | table-column-group | table-column | table-cell | table-caption | box | inline-box | grid | inline-grid | none | inherit | -moz-box | -moz-inline-block | -moz-inline-box | -moz-inline-grid | -moz-inline-stack | -moz-inline-table | -moz-grid | -moz-grid-group | -moz-grid-line | -moz-groupbox | -moz-deck | -moz-popup | -moz-stack | -moz-marker | -webkit-box | -webkit-inline-box"
,"dominant-baseline":1,"drop-initial-after-adjust":"central | middle | after-edge | text-after-edge | ideographic | alphabetic | mathematical | <percentage> | <length>"
,"drop-initial-after-align":"baseline | use-script | before-edge | text-before-edge | after-edge | text-after-edge | central | middle | ideographic | alphabetic | hanging | mathematical"
,"drop-initial-before-adjust":"before-edge | text-before-edge | central | middle | hanging | mathematical | <percentage> | <length>"
,"drop-initial-before-align":"caps-height | baseline | use-script | before-edge | text-before-edge | after-edge | text-after-edge | central | middle | ideographic | alphabetic | hanging | mathematical"
,"drop-initial-size":"auto | line | <length> | <percentage>","drop-initial-value"
:"initial | <integer>",elevation:"<angle> | below | level | above | higher | lower | inherit"
,"empty-cells":"show | hide | inherit",filter:1,fit:"fill | hidden | meet | slice"
,"fit-position":1,"float":"left | right | none | inherit","float-offset":1,font:1
,"font-family":1,"font-size":"<absolute-size> | <relative-size> | <length> | <percentage> | inherit"
,"font-size-adjust":"<number> | none | inherit","font-stretch":"normal | ultra-condensed | extra-condensed | condensed | semi-condensed | semi-expanded | expanded | extra-expanded | ultra-expanded | inherit"
,"font-style":"normal | italic | oblique | inherit","font-variant":"normal | small-caps | inherit"
,"font-weight":"normal | bold | bolder | lighter | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | inherit"
,"grid-cell-stacking":"columns | rows | layer","grid-column":1,"grid-columns":1,"grid-column-align"
:"start | end | center | stretch","grid-column-sizing":1,"grid-column-span":"<integer>"
,"grid-flow":"none | rows | columns","grid-layer":"<integer>","grid-row":1,"grid-rows"
:1,"grid-row-align":"start | end | center | stretch","grid-row-span":"<integer>"
,"grid-row-sizing":1,"hanging-punctuation":1,height:"<margin-width> | inherit","hyphenate-after"
:"<integer> | auto","hyphenate-before":"<integer> | auto","hyphenate-character":"<string> | auto"
,"hyphenate-lines":"no-limit | <integer>","hyphenate-resource":1,hyphens:"none | manual | auto"
,icon:1,"image-orientation":"angle | auto","image-rendering":1,"image-resolution"
:1,"inline-box-align":"initial | last | <integer>",left:"<margin-width> | inherit"
,"letter-spacing":"<length> | normal | inherit","line-height":"<number> | <length> | <percentage> | normal | inherit"
,"line-break":"auto | loose | normal | strict","line-stacking":1,"line-stacking-ruby"
:"exclude-ruby | include-ruby","line-stacking-shift":"consider-shifts | disregard-shifts"
,"line-stacking-strategy":"inline-line-height | block-line-height | max-height | grid-height"
,"list-style":1,"list-style-image":"<uri> | none | inherit","list-style-position"
:"inside | outside | inherit","list-style-type":"disc | circle | square | decimal | decimal-leading-zero | lower-roman | upper-roman | lower-greek | lower-latin | upper-latin | armenian | georgian | lower-alpha | upper-alpha | none | inherit"
,margin:{multi:"<margin-width> | inherit",max:4},"margin-bottom":"<margin-width> | inherit"
,"margin-left":"<margin-width> | inherit","margin-right":"<margin-width> | inherit"
,"margin-top":"<margin-width> | inherit",mark:1,"mark-after":1,"mark-before":1,marks
:1,"marquee-direction":1,"marquee-play-count":1,"marquee-speed":1,"marquee-style"
:1,"max-height":"<length> | <percentage> | none | inherit","max-width":"<length> | <percentage> | none | inherit"
,"min-height":"<length> | <percentage> | inherit","min-width":"<length> | <percentage> | inherit"
,"move-to":1,"nav-down":1,"nav-index":1,"nav-left":1,"nav-right":1,"nav-up":1,opacity
:"<number> | inherit",orphans:"<integer> | inherit",outline:1,"outline-color":"<color> | invert | inherit"
,"outline-offset":1,"outline-style":"<border-style> | inherit","outline-width":"<border-width> | inherit"
,overflow:"visible | hidden | scroll | auto | inherit","overflow-style":1,"overflow-x"
:1,"overflow-y":1,padding:{multi:"<padding-width> | inherit",max:4},"padding-bottom"
:"<padding-width> | inherit","padding-left":"<padding-width> | inherit","padding-right"
:"<padding-width> | inherit","padding-top":"<padding-width> | inherit",page:1,"page-break-after"
:"auto | always | avoid | left | right | inherit","page-break-before":"auto | always | avoid | left | right | inherit"
,"page-break-inside":"auto | avoid | inherit","page-policy":1,pause:1,"pause-after"
:1,"pause-before":1,perspective:1,"perspective-origin":1,phonemes:1,pitch:1,"pitch-range"
:1,"play-during":1,"pointer-events":"auto | none | visiblePainted | visibleFill | visibleStroke | visible | painted | fill | stroke | all | inherit"
,position:"static | relative | absolute | fixed | inherit","presentation-level":1
,"punctuation-trim":1,quotes:1,"rendering-intent":1,resize:1,rest:1,"rest-after"
:1,"rest-before":1,richness:1,right:"<margin-width> | inherit",rotation:1,"rotation-point"
:1,"ruby-align":1,"ruby-overhang":1,"ruby-position":1,"ruby-span":1,size:1,speak
:"normal | none | spell-out | inherit","speak-header":"once | always | inherit","speak-numeral"
:"digits | continuous | inherit","speak-punctuation":"code | none | inherit","speech-rate"
:1,src:1,stress:1,"string-set":1,"table-layout":"auto | fixed | inherit","tab-size"
:"<integer> | <length>",target:1,"target-name":1,"target-new":1,"target-position"
:1,"text-align":"left | right | center | justify | inherit","text-align-last":1,"text-decoration"
:1,"text-emphasis":1,"text-height":1,"text-indent":"<length> | <percentage> | inherit"
,"text-justify":"auto | none | inter-word | inter-ideograph | inter-cluster | distribute | kashida"
,"text-outline":1,"text-overflow":1,"text-rendering":"auto | optimizeSpeed | optimizeLegibility | geometricPrecision | inherit"
,"text-shadow":1,"text-transform":"capitalize | uppercase | lowercase | none | inherit"
,"text-wrap":"normal | none | avoid",top:"<margin-width> | inherit",transform:1,"transform-origin"
:1,"transform-style":1,transition:1,"transition-delay":1,"transition-duration":1
,"transition-property":1,"transition-timing-function":1,"unicode-bidi":"normal | embed | bidi-override | inherit"
,"user-modify":"read-only | read-write | write-only | inherit","user-select":"none | text | toggle | element | elements | all | inherit"
,"vertical-align":"auto | use-script | baseline | sub | super | top | text-top | central | middle | bottom | text-bottom | <percentage> | <length>"
,visibility:"visible | hidden | collapse | inherit","voice-balance":1,"voice-duration"
:1,"voice-family":1,"voice-pitch":1,"voice-pitch-range":1,"voice-rate":1,"voice-stress"
:1,"voice-volume":1,volume:1,"white-space":"normal | pre | nowrap | pre-wrap | pre-line | inherit | -pre-wrap | -o-pre-wrap | -moz-pre-wrap | -hp-pre-wrap"
,"white-space-collapse":1,widows:"<integer> | inherit",width:"<length> | <percentage> | auto | inherit"
,"word-break":"normal | keep-all | break-all","word-spacing":"<length> | normal | inherit"
,"word-wrap":1,"z-index":"<integer> | auto | inherit",zoom:"<number> | <percentage> | normal"
};PropertyName.prototype=new SyntaxUnit,PropertyName.prototype.constructor=PropertyName
,PropertyName.prototype.toString=function(){return(this.hack?this.hack:"")+this.
text},PropertyValue.prototype=new SyntaxUnit,PropertyValue.prototype.constructor=
PropertyValue,PropertyValueIterator.prototype.count=function(){return this._parts
.length},PropertyValueIterator.prototype.isFirst=function(){return this._i===0},
PropertyValueIterator.prototype.hasNext=function(){return this._i<this._parts.length
},PropertyValueIterator.prototype.mark=function(){this._marks.push(this._i)},PropertyValueIterator
.prototype.peek=function(e){return this.hasNext()?this._parts[this._i+(e||0)]:null
},PropertyValueIterator.prototype.next=function(){return this.hasNext()?this._parts
[this._i++]:null},PropertyValueIterator.prototype.previous=function(){return this
._i>0?this._parts[--this._i]:null},PropertyValueIterator.prototype.restore=function(
){this._marks.length&&(this._i=this._marks.pop())},PropertyValuePart.prototype=new
SyntaxUnit,PropertyValuePart.prototype.constructor=PropertyValuePart,PropertyValuePart
.fromToken=function(e){return new PropertyValuePart(e.value,e.startLine,e.startCol
)};var Pseudos={":first-letter":1,":first-line":1,":before":1,":after":1};Pseudos
.ELEMENT=1,Pseudos.CLASS=2,Pseudos.isElement=function(e){return e.indexOf("::")===0||
Pseudos[e.toLowerCase()]==Pseudos.ELEMENT},Selector.prototype=new SyntaxUnit,Selector
.prototype.constructor=Selector,SelectorPart.prototype=new SyntaxUnit,SelectorPart
.prototype.constructor=SelectorPart,SelectorSubPart.prototype=new SyntaxUnit,SelectorSubPart
.prototype.constructor=SelectorSubPart,Specificity.prototype={constructor:Specificity
,compare:function(e){var t=["a","b","c","d"],n,r;for(n=0,r=t.length;n<r;n++){if(
this[t[n]]<e[t[n]])return-1;if(this[t[n]]>e[t[n]])return 1}return 0},valueOf:function(
){return this.a*1e3+this.b*100+this.c*10+this.d},toString:function(){return this
.a+","+this.b+","+this.c+","+this.d}},Specificity.calculate=function(e){function u
(e){var t,n,r,a,f=e.elementName?e.elementName.text:"",l;f&&f.charAt(f.length-1)!="*"&&
o++;for(t=0,r=e.modifiers.length;t<r;t++){l=e.modifiers[t];switch(l.type){case"class"
:case"attribute":s++;break;case"id":i++;break;case"pseudo":Pseudos.isElement(l.text
)?o++:s++;break;case"not":for(n=0,a=l.args.length;n<a;n++)u(l.args[n])}}}var t,n
,r,i=0,s=0,o=0;for(t=0,n=e.parts.length;t<n;t++)r=e.parts[t],r instanceof SelectorPart&&
u(r);return new Specificity(0,i,s,o)};var h=/^[0-9a-fA-F]$/,nonascii=/^[\u0080-\uFFFF]$/
,nl=/\n|\r\n|\r|\f/;TokenStream.prototype=mix(new TokenStreamBase,{_getToken:function(
e){var t,n=this._reader,r=null,i=n.getLine(),s=n.getCol();t=n.read();while(t){switch(
t){case"/":n.peek()=="*"?r=this.commentToken(t,i,s):r=this.charToken(t,i,s);break;
case"|":case"~":case"^":case"$":case"*":n.peek()=="="?r=this.comparisonToken(t,i
,s):r=this.charToken(t,i,s);break;case'"':case"'":r=this.stringToken(t,i,s);break;
case"#":isNameChar(n.peek())?r=this.hashToken(t,i,s):r=this.charToken(t,i,s);break;
case".":isDigit(n.peek())?r=this.numberToken(t,i,s):r=this.charToken(t,i,s);break;
case"-":n.peek()=="-"?r=this.htmlCommentEndToken(t,i,s):isNameStart(n.peek())?r=
this.identOrFunctionToken(t,i,s):r=this.charToken(t,i,s);break;case"!":r=this.importantToken
(t,i,s);break;case"@":r=this.atRuleToken(t,i,s);break;case":":r=this.notToken(t,
i,s);break;case"<":r=this.htmlCommentStartToken(t,i,s);break;case"U":case"u":if(
n.peek()=="+"){r=this.unicodeRangeToken(t,i,s);break};default:isDigit(t)?r=this.
numberToken(t,i,s):isWhitespace(t)?r=this.whitespaceToken(t,i,s):isIdentStart(t)?
r=this.identOrFunctionToken(t,i,s):r=this.charToken(t,i,s)}break}return!r&&t===null&&
(r=this.createToken(Tokens.EOF,null,i,s)),r},createToken:function(e,t,n,r,i){var s=
this._reader;return i=i||{},{value:t,type:e,channel:i.channel,hide:i.hide||!1,startLine
:n,startCol:r,endLine:s.getLine(),endCol:s.getCol()}},atRuleToken:function(e,t,n
){var r=e,i=this._reader,s=Tokens.CHAR,o=!1,u,a;i.mark(),u=this.readName(),r=e+u
,s=Tokens.type(r.toLowerCase());if(s==Tokens.CHAR||s==Tokens.UNKNOWN)r.length>1?
s=Tokens.UNKNOWN_SYM:(s=Tokens.CHAR,r=e,i.reset());return this.createToken(s,r,t
,n)},charToken:function(e,t,n){var r=Tokens.type(e);return r==-1&&(r=Tokens.CHAR
),this.createToken(r,e,t,n)},commentToken:function(e,t,n){var r=this._reader,i=this
.readComment(e);return this.createToken(Tokens.COMMENT,i,t,n)},comparisonToken:function(
e,t,n){var r=this._reader,i=e+r.read(),s=Tokens.type(i)||Tokens.CHAR;return this
.createToken(s,i,t,n)},hashToken:function(e,t,n){var r=this._reader,i=this.readName
(e);return this.createToken(Tokens.HASH,i,t,n)},htmlCommentStartToken:function(e
,t,n){var r=this._reader,i=e;return r.mark(),i+=r.readCount(3),i=="<!--"?this.createToken
(Tokens.CDO,i,t,n):(r.reset(),this.charToken(e,t,n))},htmlCommentEndToken:function(
e,t,n){var r=this._reader,i=e;return r.mark(),i+=r.readCount(2),i=="-->"?this.createToken
(Tokens.CDC,i,t,n):(r.reset(),this.charToken(e,t,n))},identOrFunctionToken:function(
e,t,n){var r=this._reader,i=this.readName(e),s=Tokens.IDENT;return r.peek()=="("?
(i+=r.read(),i.toLowerCase()=="url("?(s=Tokens.URI,i=this.readURI(i),i.toLowerCase
()=="url("&&(s=Tokens.FUNCTION)):s=Tokens.FUNCTION):r.peek()==":"&&i.toLowerCase
()=="progid"&&(i+=r.readTo("("),s=Tokens.IE_FUNCTION),this.createToken(s,i,t,n)}
,importantToken:function(e,t,n){var r=this._reader,i=e,s=Tokens.CHAR,o,u;r.mark(
),u=r.read();while(u){if(u=="/"){if(r.peek()!="*")break;o=this.readComment(u);if(
o==="")break}else{if(!isWhitespace(u)){if(/i/i.test(u)){o=r.readCount(8),/mportant/i
.test(o)&&(i+=u+o,s=Tokens.IMPORTANT_SYM);break}break}i+=u+this.readWhitespace()
}u=r.read()}return s==Tokens.CHAR?(r.reset(),this.charToken(e,t,n)):this.createToken
(s,i,t,n)},notToken:function(e,t,n){var r=this._reader,i=e;return r.mark(),i+=r.
readCount(4),i.toLowerCase()==":not("?this.createToken(Tokens.NOT,i,t,n):(r.reset
(),this.charToken(e,t,n))},numberToken:function(e,t,n){var r=this._reader,i=this
.readNumber(e),s,o=Tokens.NUMBER,u=r.peek();return isIdentStart(u)?(s=this.readName
(r.read()),i+=s,/^em$|^ex$|^px$|^gd$|^rem$|^vw$|^vh$|^vm$|^ch$|^cm$|^mm$|^in$|^pt$|^pc$/i
.test(s)?o=Tokens.LENGTH:/^deg|^rad$|^grad$/i.test(s)?o=Tokens.ANGLE:/^ms$|^s$/i
.test(s)?o=Tokens.TIME:/^hz$|^khz$/i.test(s)?o=Tokens.FREQ:/^dpi$|^dpcm$/i.test(
s)?o=Tokens.RESOLUTION:o=Tokens.DIMENSION):u=="%"&&(i+=r.read(),o=Tokens.PERCENTAGE
),this.createToken(o,i,t,n)},stringToken:function(e,t,n){var r=e,i=e,s=this._reader
,o=e,u=Tokens.STRING,a=s.read();while(a){i+=a;if(a==r&&o!="\\")break;if(isNewLine
(s.peek())&&a!="\\"){u=Tokens.INVALID;break}o=a,a=s.read()}return a===null&&(u=Tokens
.INVALID),this.createToken(u,i,t,n)},unicodeRangeToken:function(e,t,n){var r=this
._reader,i=e,s,o=Tokens.CHAR;return r.peek()=="+"&&(r.mark(),i+=r.read(),i+=this
.readUnicodeRangePart(!0),i.length==2?r.reset():(o=Tokens.UNICODE_RANGE,i.indexOf
("?")==-1&&r.peek()=="-"&&(r.mark(),s=r.read(),s+=this.readUnicodeRangePart(!1),
s.length==1?r.reset():i+=s))),this.createToken(o,i,t,n)},whitespaceToken:function(
e,t,n){var r=this._reader,i=e+this.readWhitespace();return this.createToken(Tokens
.S,i,t,n)},readUnicodeRangePart:function(e){var t=this._reader,n="",r=t.peek();while(
isHexDigit(r)&&n.length<6)t.read(),n+=r,r=t.peek();if(e)while(r=="?"&&n.length<6
)t.read(),n+=r,r=t.peek();return n},readWhitespace:function(){var e=this._reader
,t="",n=e.peek();while(isWhitespace(n))e.read(),t+=n,n=e.peek();return t},readNumber
:function(e){var t=this._reader,n=e,r=e==".",i=t.peek();while(i){if(isDigit(i))n+=
t.read();else{if(i!=".")break;if(r)break;r=!0,n+=t.read()}i=t.peek()}return n},readString
:function(){var e=this._reader,t=e.read(),n=t,r=t,i=e.peek();while(i){i=e.read()
,n+=i;if(i==t&&r!="\\")break;if(isNewLine(e.peek())&&i!="\\"){n="";break}r=i,i=e
.peek()}return i===null&&(n=""),n},readURI:function(e){var t=this._reader,n=e,r=""
,i=t.peek();t.mark();while(i&&isWhitespace(i))t.read(),i=t.peek();i=="'"||i=='"'?
r=this.readString():r=this.readURL(),i=t.peek();while(i&&isWhitespace(i))t.read(
),i=t.peek();return r===""||i!=")"?(n=e,t.reset()):n+=r+t.read(),n},readURL:function(
){var e=this._reader,t="",n=e.peek();while(/^[!#$%&\\*-~]$/.test(n))t+=e.read(),
n=e.peek();return t},readName:function(e){var t=this._reader,n=e||"",r=t.peek();
for(;;)if(r=="\\")n+=this.readEscape(t.read()),r=t.peek();else{if(!r||!isNameChar
(r))break;n+=t.read(),r=t.peek()}return n},readEscape:function(e){var t=this._reader
,n=e||"",r=0,i=t.peek();if(isHexDigit(i))do n+=t.read(),i=t.peek();while(i&&isHexDigit
(i)&&++r<6);return n.length==3&&/\s/.test(i)||n.length==7||n.length==1?t.read():
i="",n+i},readComment:function(e){var t=this._reader,n=e||"",r=t.read();if(r=="*"
){while(r){n+=r;if(n.length>2&&r=="*"&&t.peek()=="/"){n+=t.read();break}r=t.read
()}return n}return""}});var Tokens=[{name:"CDO"},{name:"CDC"},{name:"S",whitespace
:!0},{name:"COMMENT",comment:!0,hide:!0,channel:"comment"},{name:"INCLUDES",text
:"~="},{name:"DASHMATCH",text:"|="},{name:"PREFIXMATCH",text:"^="},{name:"SUFFIXMATCH"
,text:"$="},{name:"SUBSTRINGMATCH",text:"*="},{name:"STRING"},{name:"IDENT"},{name
:"HASH"},{name:"IMPORT_SYM",text:"@import"},{name:"PAGE_SYM",text:"@page"},{name
:"MEDIA_SYM",text:"@media"},{name:"FONT_FACE_SYM",text:"@font-face"},{name:"CHARSET_SYM"
,text:"@charset"},{name:"NAMESPACE_SYM",text:"@namespace"},{name:"VIEWPORT_SYM",
text:"@viewport"},{name:"UNKNOWN_SYM"},{name:"KEYFRAMES_SYM",text:["@keyframes","@-webkit-keyframes"
,"@-moz-keyframes","@-o-keyframes"]},{name:"IMPORTANT_SYM"},{name:"LENGTH"},{name
:"ANGLE"},{name:"TIME"},{name:"FREQ"},{name:"DIMENSION"},{name:"PERCENTAGE"},{name
:"NUMBER"},{name:"URI"},{name:"FUNCTION"},{name:"UNICODE_RANGE"},{name:"INVALID"
},{name:"PLUS",text:"+"},{name:"GREATER",text:">"},{name:"COMMA",text:","},{name
:"TILDE",text:"~"},{name:"NOT"},{name:"TOPLEFTCORNER_SYM",text:"@top-left-corner"
},{name:"TOPLEFT_SYM",text:"@top-left"},{name:"TOPCENTER_SYM",text:"@top-center"
},{name:"TOPRIGHT_SYM",text:"@top-right"},{name:"TOPRIGHTCORNER_SYM",text:"@top-right-corner"
},{name:"BOTTOMLEFTCORNER_SYM",text:"@bottom-left-corner"},{name:"BOTTOMLEFT_SYM"
,text:"@bottom-left"},{name:"BOTTOMCENTER_SYM",text:"@bottom-center"},{name:"BOTTOMRIGHT_SYM"
,text:"@bottom-right"},{name:"BOTTOMRIGHTCORNER_SYM",text:"@bottom-right-corner"
},{name:"LEFTTOP_SYM",text:"@left-top"},{name:"LEFTMIDDLE_SYM",text:"@left-middle"
},{name:"LEFTBOTTOM_SYM",text:"@left-bottom"},{name:"RIGHTTOP_SYM",text:"@right-top"
},{name:"RIGHTMIDDLE_SYM",text:"@right-middle"},{name:"RIGHTBOTTOM_SYM",text:"@right-bottom"
},{name:"RESOLUTION",state:"media"},{name:"IE_FUNCTION"},{name:"CHAR"},{name:"PIPE"
,text:"|"},{name:"SLASH",text:"/"},{name:"MINUS",text:"-"},{name:"STAR",text:"*"
},{name:"LBRACE",text:"{"},{name:"RBRACE",text:"}"},{name:"LBRACKET",text:"["},{
name:"RBRACKET",text:"]"},{name:"EQUALS",text:"="},{name:"COLON",text:":"},{name
:"SEMICOLON",text:";"},{name:"LPAREN",text:"("},{name:"RPAREN",text:")"},{name:"DOT"
,text:"."}];(function(){var e=[],t={};Tokens.UNKNOWN=-1,Tokens.unshift({name:"EOF"
});for(var n=0,r=Tokens.length;n<r;n++){e.push(Tokens[n].name),Tokens[Tokens[n].
name]=n;if(Tokens[n].text)if(Tokens[n].text instanceof Array)for(var i=0;i<Tokens
[n].text.length;i++)t[Tokens[n].text[i]]=n;else t[Tokens[n].text]=n}Tokens.name=
function(t){return e[t]},Tokens.type=function(e){return t[e]||-1}})();var Validation=
{validate:function(e,t){var n=e.toString().toLowerCase(),r=t.parts,i=new PropertyValueIterator
(t),s=Properties[n],o,u,a,f,l,c,h,p,d,v,m;if(!s){if(n.indexOf("-")!==0)throw new
ValidationError("Unknown property '"+e+"'.",e.line,e.col)}else typeof s!="number"&&
(typeof s=="string"?s.indexOf("||")>-1?this.groupProperty(s,i):this.singleProperty
(s,i,1):s.multi?this.multiProperty(s.multi,i,s.comma,s.max||Infinity):typeof s=="function"&&
s(i))},singleProperty:function(e,t,n,r){var i=!1,s=t.value,o=0,u;while(t.hasNext
()&&o<n){i=ValidationTypes.isAny(t,e);if(!i)break;o++}if(!i)throw t.hasNext()&&!
t.isFirst()?(u=t.peek(),new ValidationError("Expected end of value but found '"+
u+"'.",u.line,u.col)):new ValidationError("Expected ("+e+") but found '"+s+"'.",
s.line,s.col);if(t.hasNext())throw u=t.next(),new ValidationError("Expected end of value but found '"+
u+"'.",u.line,u.col)},multiProperty:function(e,t,n,r){var i=!1,s=t.value,o=0,u=!1
,a;while(t.hasNext()&&!i&&o<r){if(!ValidationTypes.isAny(t,e))break;o++;if(!t.hasNext
())i=!0;else if(n){if(t.peek()!=",")break;a=t.next()}}if(!i)throw t.hasNext()&&!
t.isFirst()?(a=t.peek(),new ValidationError("Expected end of value but found '"+
a+"'.",a.line,a.col)):(a=t.previous(),n&&a==","?new ValidationError("Expected end of value but found '"+
a+"'.",a.line,a.col):new ValidationError("Expected ("+e+") but found '"+s+"'.",s
.line,s.col));if(t.hasNext())throw a=t.next(),new ValidationError("Expected end of value but found '"+
a+"'.",a.line,a.col)},groupProperty:function(e,t,n){var r=!1,i=t.value,s=e.split
("||").length,o={count:0},u=!1,a,f;while(t.hasNext()&&!r){a=ValidationTypes.isAnyOfGroup
(t,e);if(!a)break;if(o[a])break;o[a]=1,o.count++,u=!0;if(o.count==s||!t.hasNext(
))r=!0}if(!r)throw u&&t.hasNext()?(f=t.peek(),new ValidationError("Expected end of value but found '"+
f+"'.",f.line,f.col)):new ValidationError("Expected ("+e+") but found '"+i+"'.",
i.line,i.col);if(t.hasNext())throw f=t.next(),new ValidationError("Expected end of value but found '"+
f+"'.",f.line,f.col)}};ValidationError.prototype=new Error;var ValidationTypes={
isLiteral:function(e,t){var n=e.text.toString().toLowerCase(),r=t.split(" | "),i
,s,o=!1;for(i=0,s=r.length;i<s&&!o;i++)n==r[i].toLowerCase()&&(o=!0);return o},isSimple
:function(e){return!!this.simple[e]},isComplex:function(e){return!!this.complex[
e]},isAny:function(e,t){var n=t.split(" | "),r,i,s=!1;for(r=0,i=n.length;r<i&&!s&&
e.hasNext();r++)s=this.isType(e,n[r]);return s},isAnyOfGroup:function(e,t){var n=
t.split(" || "),r,i,s=!1;for(r=0,i=n.length;r<i&&!s;r++)s=this.isType(e,n[r]);return s?
n[r-1]:!1},isType:function(e,t){var n=e.peek(),r=!1;return t.charAt(0)!="<"?(r=this
.isLiteral(n,t),r&&e.next()):this.simple[t]?(r=this.simple[t](n),r&&e.next()):r=
this.complex[t](e),r},simple:{"<absolute-size>":function(e){return ValidationTypes
.isLiteral(e,"xx-small | x-small | small | medium | large | x-large | xx-large")
},"<attachment>":function(e){return ValidationTypes.isLiteral(e,"scroll | fixed | local"
)},"<attr>":function(e){return e.type=="function"&&e.name=="attr"},"<bg-image>":
function(e){return this["<image>"](e)||this["<gradient>"](e)||e=="none"},"<gradient>"
:function(e){return e.type=="function"&&/^(?:\-(?:ms|moz|o|webkit)\-)?(?:repeating\-)?(?:radial\-|linear\-)?gradient/i
.test(e)},"<box>":function(e){return ValidationTypes.isLiteral(e,"padding-box | border-box | content-box"
)},"<content>":function(e){return e.type=="function"&&e.name=="content"},"<relative-size>"
:function(e){return ValidationTypes.isLiteral(e,"smaller | larger")},"<ident>":function(
e){return e.type=="identifier"},"<length>":function(e){return e.type=="function"&&/^(?:\-(?:ms|moz|o|webkit)\-)?calc/i
.test(e)?!0:e.type=="length"||e.type=="number"||e.type=="integer"||e=="0"},"<color>"
:function(e){return e.type=="color"||e=="transparent"},"<number>":function(e){return e
.type=="number"||this["<integer>"](e)},"<integer>":function(e){return e.type=="integer"
},"<line>":function(e){return e.type=="integer"},"<angle>":function(e){return e.
type=="angle"},"<uri>":function(e){return e.type=="uri"},"<image>":function(e){return this
["<uri>"](e)},"<percentage>":function(e){return e.type=="percentage"||e=="0"},"<border-width>"
:function(e){return this["<length>"](e)||ValidationTypes.isLiteral(e,"thin | medium | thick"
)},"<border-style>":function(e){return ValidationTypes.isLiteral(e,"none | hidden | dotted | dashed | solid | double | groove | ridge | inset | outset"
)},"<margin-width>":function(e){return this["<length>"](e)||this["<percentage>"]
(e)||ValidationTypes.isLiteral(e,"auto")},"<padding-width>":function(e){return this
["<length>"](e)||this["<percentage>"](e)},"<shape>":function(e){return e.type=="function"&&
(e.name=="rect"||e.name=="inset-rect")},"<time>":function(e){return e.type=="time"
}},complex:{"<bg-position>":function(e){var t=this,n=!1,r="<percentage> | <length>"
,i="left | right",s="top | bottom",o=0,u=function(){return e.hasNext()&&e.peek()!=","
};while(e.peek(o)&&e.peek(o)!=",")o++;return o<3?ValidationTypes.isAny(e,i+" | center | "+
r)?(n=!0,ValidationTypes.isAny(e,s+" | center | "+r)):ValidationTypes.isAny(e,s)&&
(n=!0,ValidationTypes.isAny(e,i+" | center")):ValidationTypes.isAny(e,i)?ValidationTypes
.isAny(e,s)?(n=!0,ValidationTypes.isAny(e,r)):ValidationTypes.isAny(e,r)&&(ValidationTypes
.isAny(e,s)?(n=!0,ValidationTypes.isAny(e,r)):ValidationTypes.isAny(e,"center")&&
(n=!0)):ValidationTypes.isAny(e,s)?ValidationTypes.isAny(e,i)?(n=!0,ValidationTypes
.isAny(e,r)):ValidationTypes.isAny(e,r)&&(ValidationTypes.isAny(e,i)?(n=!0,ValidationTypes
.isAny(e,r)):ValidationTypes.isAny(e,"center")&&(n=!0)):ValidationTypes.isAny(e,"center"
)&&ValidationTypes.isAny(e,i+" | "+s)&&(n=!0,ValidationTypes.isAny(e,r)),n},"<bg-size>"
:function(e){var t=this,n=!1,r="<percentage> | <length> | auto",i,s,o;return ValidationTypes
.isAny(e,"cover | contain")?n=!0:ValidationTypes.isAny(e,r)&&(n=!0,ValidationTypes
.isAny(e,r)),n},"<repeat-style>":function(e){var t=!1,n="repeat | space | round | no-repeat"
,r;return e.hasNext()&&(r=e.next(),ValidationTypes.isLiteral(r,"repeat-x | repeat-y"
)?t=!0:ValidationTypes.isLiteral(r,n)&&(t=!0,e.hasNext()&&ValidationTypes.isLiteral
(e.peek(),n)&&e.next())),t},"<shadow>":function(e){var t=!1,n=0,r=!1,i=!1,s;if(e
.hasNext()){ValidationTypes.isAny(e,"inset")&&(r=!0),ValidationTypes.isAny(e,"<color>"
)&&(i=!0);while(ValidationTypes.isAny(e,"<length>")&&n<4)n++;e.hasNext()&&(i||ValidationTypes
.isAny(e,"<color>"),r||ValidationTypes.isAny(e,"inset")),t=n>=2&&n<=4}return t},"<x-one-radius>"
:function(e){var t=!1,n="<length> | <percentage> | inherit";return ValidationTypes
.isAny(e,n)&&(t=!0,ValidationTypes.isAny(e,n)),t}}};parserlib.css={Colors:Colors
,Combinator:Combinator,Parser:Parser,PropertyName:PropertyName,PropertyValue:PropertyValue
,PropertyValuePart:PropertyValuePart,MediaFeature:MediaFeature,MediaQuery:MediaQuery
,Selector:Selector,SelectorPart:SelectorPart,SelectorSubPart:SelectorSubPart,Specificity
:Specificity,TokenStream:TokenStream,Tokens:Tokens,ValidationError:ValidationError
}}(),function(){for(var e in parserlib)exports[e]=parserlib[e]}();var CSSLint=function(
){function i(e,t){var r,i=e&&e.match(n),s=i&&i[1];return s&&(r={"true":2,"":1,"false"
:0,2:2,1:1,0:0},s.toLowerCase().split(",").forEach(function(e){var n=e.split(":"
),i=n[0]||"",s=n[1]||"";t[i.trim()]=r[s.trim()]})),t}var e=[],t=[],n=/\/\*csslint([^\*]*)\*\//
,r=new parserlib.util.EventTarget;return r.version="0.10.0",r.addRule=function(t
){e.push(t),e[t.id]=t},r.clearRules=function(){e=[]},r.getRules=function(){return[
].concat(e).sort(function(e,t){return e.id>t.id?1:0})},r.getRuleset=function(){var t=
{},n=0,r=e.length;while(n<r)t[e[n++].id]=1;return t},r.addFormatter=function(e){
t[e.id]=e},r.getFormatter=function(e){return t[e]},r.format=function(e,t,n,r){var i=
this.getFormatter(n),s=null;return i&&(s=i.startFormat(),s+=i.formatResults(e,t,
r||{}),s+=i.endFormat()),s},r.hasFormat=function(e){return t.hasOwnProperty(e)},
r.verify=function(t,r){var s=0,o=e.length,u,a,f,l=new parserlib.css.Parser({starHack
:!0,ieFilters:!0,underscoreHack:!0,strict:!1});a=t.replace(/\n\r?/g,"$split$").split
("$split$"),r||(r=this.getRuleset()),n.test(t)&&(r=i(t,r)),u=new Reporter(a,r),r
.errors=2;for(s in r)r.hasOwnProperty(s)&&r[s]&&e[s]&&e[s].init(l,u);try{l.parse
(t)}catch(c){u.error("Fatal error, cannot continue: "+c.message,c.line,c.col,{})
}return f={messages:u.messages,stats:u.stats,ruleset:u.ruleset},f.messages.sort(
function(e,t){return e.rollup&&!t.rollup?1:!e.rollup&&t.rollup?-1:e.line-t.line}
),f},r}();return Reporter.prototype={constructor:Reporter,error:function(e,t,n,r
){this.messages.push({type:"error",line:t,col:n,message:e,evidence:this.lines[t-1
],rule:r||{}})},warn:function(e,t,n,r){this.report(e,t,n,r)},report:function(e,t
,n,r){this.messages.push({type:this.ruleset[r.id]==2?"error":"warning",line:t,col
:n,message:e,evidence:this.lines[t-1],rule:r})},info:function(e,t,n,r){this.messages
.push({type:"info",line:t,col:n,message:e,evidence:this.lines[t-1],rule:r})},rollupError
:function(e,t){this.messages.push({type:"error",rollup:!0,message:e,rule:t})},rollupWarn
:function(e,t){this.messages.push({type:"warning",rollup:!0,message:e,rule:t})},
stat:function(e,t){this.stats[e]=t}},CSSLint._Reporter=Reporter,CSSLint.Util={mix
:function(e,t){var n;for(n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);return n},indexOf
:function(e,t){if(e.indexOf)return e.indexOf(t);for(var n=0,r=e.length;n<r;n++)if(
e[n]===t)return n;return-1},forEach:function(e,t){if(e.forEach)return e.forEach(
t);for(var n=0,r=e.length;n<r;n++)t(e[n],n,e)}},CSSLint.addRule({id:"adjoining-classes"
,name:"Disallow adjoining classes",desc:"Don't use adjoining classes.",browsers:"IE6"
,init:function(e,t){var n=this;e.addListener("startrule",function(r){var i=r.selectors
,s,o,u,a,f,l,c;for(f=0;f<i.length;f++){s=i[f];for(l=0;l<s.parts.length;l++){o=s.
parts[l];if(o.type==e.SELECTOR_PART_TYPE){a=0;for(c=0;c<o.modifiers.length;c++)u=
o.modifiers[c],u.type=="class"&&a++,a>1&&t.report("Don't use adjoining classes."
,o.line,o.col,n)}}}})}}),CSSLint.addRule({id:"box-model",name:"Beware of broken box size"
,desc:"Don't use width or height when using padding or border.",browsers:"All",init
:function(e,t){function u(){s={},o=!1}function a(){var e,u;if(!o){if(s.height)for(
e in i)i.hasOwnProperty(e)&&s[e]&&(u=s[e].value,(e!="padding"||u.parts.length!==2||
u.parts[0].value!==0)&&t.report("Using height with "+e+" can sometimes make elements larger than you expect."
,s[e].line,s[e].col,n));if(s.width)for(e in r)r.hasOwnProperty(e)&&s[e]&&(u=s[e]
.value,(e!="padding"||u.parts.length!==2||u.parts[1].value!==0)&&t.report("Using width with "+
e+" can sometimes make elements larger than you expect.",s[e].line,s[e].col,n))}
}var n=this,r={border:1,"border-left":1,"border-right":1,padding:1,"padding-left"
:1,"padding-right":1},i={border:1,"border-bottom":1,"border-top":1,padding:1,"padding-bottom"
:1,"padding-top":1},s,o=!1;e.addListener("startrule",u),e.addListener("startfontface"
,u),e.addListener("startpage",u),e.addListener("startpagemargin",u),e.addListener
("startkeyframerule",u),e.addListener("property",function(e){var t=e.property.text
.toLowerCase();i[t]||r[t]?!/^0\S*$/.test(e.value)&&(t!="border"||e.value!="none"
)&&(s[t]={line:e.property.line,col:e.property.col,value:e.value}):/^(width|height)/i
.test(t)&&/^(length|percentage)/.test(e.value.parts[0].type)?s[t]=1:t=="box-sizing"&&
(o=!0)}),e.addListener("endrule",a),e.addListener("endfontface",a),e.addListener
("endpage",a),e.addListener("endpagemargin",a),e.addListener("endkeyframerule",a
)}}),CSSLint.addRule({id:"box-sizing",name:"Disallow use of box-sizing",desc:"The box-sizing properties isn't supported in IE6 and IE7."
,browsers:"IE6, IE7",tags:["Compatibility"],init:function(e,t){var n=this;e.addListener
("property",function(e){var r=e.property.text.toLowerCase();r=="box-sizing"&&t.report
("The box-sizing property isn't supported in IE6 and IE7.",e.line,e.col,n)})}}),
CSSLint.addRule({id:"bulletproof-font-face",name:"Use the bulletproof @font-face syntax"
,desc:"Use the bulletproof @font-face syntax to avoid 404's in old IE (http://www.fontspring.com/blog/the-new-bulletproof-font-face-syntax)."
,browsers:"All",init:function(e,t){var n=this,r=0,i=!1,s=!0,o=!1,u,a;e.addListener
("startfontface",function(e){i=!0}),e.addListener("property",function(e){if(!i)return;
var t=e.property.toString().toLowerCase(),n=e.value.toString();u=e.line,a=e.col;
if(t==="src"){var r=/^\s?url\(['"].+\.eot\?.*['"]\)\s*format\(['"]embedded-opentype['"]\).*$/i
;!n.match(r)&&s?(o=!0,s=!1):n.match(r)&&!s&&(o=!1)}}),e.addListener("endfontface"
,function(e){i=!1,o&&t.report("@font-face declaration doesn't follow the fontspring bulletproof syntax."
,u,a,n)})}}),CSSLint.addRule({id:"compatible-vendor-prefixes",name:"Require compatible vendor prefixes"
,desc:"Include all compatible vendor prefixes to reach a wider range of users.",
browsers:"All",init:function(e,t){var n=this,r,i,s,o,u,a,f,l=!1,c=Array.prototype
.push,h=[];r={animation:"webkit moz","animation-delay":"webkit moz","animation-direction"
:"webkit moz","animation-duration":"webkit moz","animation-fill-mode":"webkit moz"
,"animation-iteration-count":"webkit moz","animation-name":"webkit moz","animation-play-state"
:"webkit moz","animation-timing-function":"webkit moz",appearance:"webkit moz","border-end"
:"webkit moz","border-end-color":"webkit moz","border-end-style":"webkit moz","border-end-width"
:"webkit moz","border-image":"webkit moz o","border-radius":"webkit","border-start"
:"webkit moz","border-start-color":"webkit moz","border-start-style":"webkit moz"
,"border-start-width":"webkit moz","box-align":"webkit moz ms","box-direction":"webkit moz ms"
,"box-flex":"webkit moz ms","box-lines":"webkit ms","box-ordinal-group":"webkit moz ms"
,"box-orient":"webkit moz ms","box-pack":"webkit moz ms","box-sizing":"webkit moz"
,"box-shadow":"webkit moz","column-count":"webkit moz ms","column-gap":"webkit moz ms"
,"column-rule":"webkit moz ms","column-rule-color":"webkit moz ms","column-rule-style"
:"webkit moz ms","column-rule-width":"webkit moz ms","column-width":"webkit moz ms"
,hyphens:"epub moz","line-break":"webkit ms","margin-end":"webkit moz","margin-start"
:"webkit moz","marquee-speed":"webkit wap","marquee-style":"webkit wap","padding-end"
:"webkit moz","padding-start":"webkit moz","tab-size":"moz o","text-size-adjust"
:"webkit ms",transform:"webkit moz ms o","transform-origin":"webkit moz ms o",transition
:"webkit moz o","transition-delay":"webkit moz o","transition-duration":"webkit moz o"
,"transition-property":"webkit moz o","transition-timing-function":"webkit moz o"
,"user-modify":"webkit moz","user-select":"webkit moz ms","word-break":"epub ms"
,"writing-mode":"epub ms"};for(s in r)if(r.hasOwnProperty(s)){o=[],u=r[s].split(" "
);for(a=0,f=u.length;a<f;a++)o.push("-"+u[a]+"-"+s);r[s]=o,c.apply(h,o)}e.addListener
("startrule",function(){i=[]}),e.addListener("startkeyframes",function(e){l=e.prefix||!0
}),e.addListener("endkeyframes",function(e){l=!1}),e.addListener("property",function(
e){var t=e.property;CSSLint.Util.indexOf(h,t.text)>-1&&(!l||typeof l!="string"||
t.text.indexOf("-"+l+"-")!==0)&&i.push(t)}),e.addListener("endrule",function(e){
if(!i.length)return;var s={},o,u,a,f,l,c,h,p,d,v;for(o=0,u=i.length;o<u;o++){a=i
[o];for(f in r)r.hasOwnProperty(f)&&(l=r[f],CSSLint.Util.indexOf(l,a.text)>-1&&(
s[f]||(s[f]={full:l.slice(0),actual:[],actualNodes:[]}),CSSLint.Util.indexOf(s[f
].actual,a.text)===-1&&(s[f].actual.push(a.text),s[f].actualNodes.push(a))))}for(
f in s)if(s.hasOwnProperty(f)){c=s[f],h=c.full,p=c.actual;if(h.length>p.length)for(
o=0,u=h.length;o<u;o++)d=h[o],CSSLint.Util.indexOf(p,d)===-1&&(v=p.length===1?p[0
]:p.length==2?p.join(" and "):p.join(", "),t.report("The property "+d+" is compatible with "+
v+" and should be included as well.",c.actualNodes[0].line,c.actualNodes[0].col,
n))}})}}),CSSLint.addRule({id:"display-property-grouping",name:"Require properties appropriate for display"
,desc:"Certain properties shouldn't be used with certain display property values."
,browsers:"All",init:function(e,t){function s(e,s,o){i[e]&&(typeof r[e]!="string"||
i[e].value.toLowerCase()!=r[e])&&t.report(o||e+" can't be used with display: "+s+"."
,i[e].line,i[e].col,n)}function o(){i={}}function u(){var e=i.display?i.display.
value:null;if(e)switch(e){case"inline":s("height",e),s("width",e),s("margin",e),
s("margin-top",e),s("margin-bottom",e),s("float",e,"display:inline has no effect on floated elements (but may be used to fix the IE6 double-margin bug)."
);break;case"block":s("vertical-align",e);break;case"inline-block":s("float",e);
break;default:e.indexOf("table-")===0&&(s("margin",e),s("margin-left",e),s("margin-right"
,e),s("margin-top",e),s("margin-bottom",e),s("float",e))}}var n=this,r={display:1
,"float":"none",height:1,width:1,margin:1,"margin-left":1,"margin-right":1,"margin-bottom"
:1,"margin-top":1,padding:1,"padding-left":1,"padding-right":1,"padding-bottom":1
,"padding-top":1,"vertical-align":1},i;e.addListener("startrule",o),e.addListener
("startfontface",o),e.addListener("startkeyframerule",o),e.addListener("startpagemargin"
,o),e.addListener("startpage",o),e.addListener("property",function(e){var t=e.property
.text.toLowerCase();r[t]&&(i[t]={value:e.value.text,line:e.property.line,col:e.property
.col})}),e.addListener("endrule",u),e.addListener("endfontface",u),e.addListener
("endkeyframerule",u),e.addListener("endpagemargin",u),e.addListener("endpage",u
)}}),CSSLint.addRule({id:"duplicate-background-images",name:"Disallow duplicate background images"
,desc:"Every background-image should be unique. Use a common class for e.g. sprites."
,browsers:"All",init:function(e,t){var n=this,r={};e.addListener("property",function(
e){var i=e.property.text,s=e.value,o,u;if(i.match(/background/i))for(o=0,u=s.parts
.length;o<u;o++)s.parts[o].type=="uri"&&(typeof r[s.parts[o].uri]=="undefined"?r
[s.parts[o].uri]=e:t.report("Background image '"+s.parts[o].uri+"' was used multiple times, first declared at line "+
r[s.parts[o].uri].line+", col "+r[s.parts[o].uri].col+".",e.line,e.col,n))})}}),
CSSLint.addRule({id:"duplicate-properties",name:"Disallow duplicate properties",
desc:"Duplicate properties must appear one after the other.",browsers:"All",init
:function(e,t){function s(e){r={}}var n=this,r,i;e.addListener("startrule",s),e.
addListener("startfontface",s),e.addListener("startpage",s),e.addListener("startpagemargin"
,s),e.addListener("startkeyframerule",s),e.addListener("property",function(e){var s=
e.property,o=s.text.toLowerCase();r[o]&&(i!=o||r[o]==e.value.text)&&t.report("Duplicate property '"+
e.property+"' found.",e.line,e.col,n),r[o]=e.value.text,i=o})}}),CSSLint.addRule
({id:"empty-rules",name:"Disallow empty rules",desc:"Rules without any properties specified should be removed."
,browsers:"All",init:function(e,t){var n=this,r=0;e.addListener("startrule",function(
){r=0}),e.addListener("property",function(){r++}),e.addListener("endrule",function(
e){var i=e.selectors;r===0&&t.report("Rule is empty.",i[0].line,i[0].col,n)})}})
,CSSLint.addRule({id:"errors",name:"Parsing Errors",desc:"This rule looks for recoverable syntax errors."
,browsers:"All",init:function(e,t){var n=this;e.addListener("error",function(e){
t.error(e.message,e.line,e.col,n)})}}),CSSLint.addRule({id:"fallback-colors",name
:"Require fallback colors",desc:"For older browsers that don't support RGBA, HSL, or HSLA, provide a fallback color."
,browsers:"IE6,IE7,IE8",init:function(e,t){function o(e){s={},r=null}var n=this,
r,i={color:1,background:1,"border-color":1,"border-top-color":1,"border-right-color"
:1,"border-bottom-color":1,"border-left-color":1,border:1,"border-top":1,"border-right"
:1,"border-bottom":1,"border-left":1,"background-color":1},s;e.addListener("startrule"
,o),e.addListener("startfontface",o),e.addListener("startpage",o),e.addListener("startpagemargin"
,o),e.addListener("startkeyframerule",o),e.addListener("property",function(e){var s=
e.property,o=s.text.toLowerCase(),u=e.value.parts,a=0,f="",l=u.length;if(i[o])while(
a<l)u[a].type=="color"&&("alpha"in u[a]||"hue"in u[a]?(/([^\)]+)\(/.test(u[a])&&
(f=RegExp.$1.toUpperCase()),(!r||r.property.text.toLowerCase()!=o||r.colorType!="compat"
)&&t.report("Fallback "+o+" (hex or RGB) should precede "+f+" "+o+".",e.line,e.col
,n)):e.colorType="compat"),a++;r=e})}}),CSSLint.addRule({id:"floats",name:"Disallow too many floats"
,desc:"This rule tests if the float property is used too many times",browsers:"All"
,init:function(e,t){var n=this,r=0;e.addListener("property",function(e){e.property
.text.toLowerCase()=="float"&&e.value.text.toLowerCase()!="none"&&r++}),e.addListener
("endstylesheet",function(){t.stat("floats",r),r>=10&&t.rollupWarn("Too many floats ("+
r+"), you're probably using them for layout. Consider using a grid system instead."
,n)})}}),CSSLint.addRule({id:"font-faces",name:"Don't use too many web fonts",desc
:"Too many different web fonts in the same stylesheet.",browsers:"All",init:function(
e,t){var n=this,r=0;e.addListener("startfontface",function(){r++}),e.addListener
("endstylesheet",function(){r>5&&t.rollupWarn("Too many @font-face declarations ("+
r+").",n)})}}),CSSLint.addRule({id:"font-sizes",name:"Disallow too many font sizes"
,desc:"Checks the number of font-size declarations.",browsers:"All",init:function(
e,t){var n=this,r=0;e.addListener("property",function(e){e.property=="font-size"&&
r++}),e.addListener("endstylesheet",function(){t.stat("font-sizes",r),r>=10&&t.rollupWarn
("Too many font-size declarations ("+r+"), abstraction needed.",n)})}}),CSSLint.
addRule({id:"gradients",name:"Require all gradient definitions",desc:"When using a vendor-prefixed gradient, make sure to use them all."
,browsers:"All",init:function(e,t){var n=this,r;e.addListener("startrule",function(
){r={moz:0,webkit:0,oldWebkit:0,o:0}}),e.addListener("property",function(e){/\-(moz|o|webkit)(?:\-(?:linear|radial))\-gradient/i
.test(e.value)?r[RegExp.$1]=1:/\-webkit\-gradient/i.test(e.value)&&(r.oldWebkit=1
)}),e.addListener("endrule",function(e){var i=[];r.moz||i.push("Firefox 3.6+"),r
.webkit||i.push("Webkit (Safari 5+, Chrome)"),r.oldWebkit||i.push("Old Webkit (Safari 4+, Chrome)"
),r.o||i.push("Opera 11.1+"),i.length&&i.length<4&&t.report("Missing vendor-prefixed CSS gradients for "+
i.join(", ")+".",e.selectors[0].line,e.selectors[0].col,n)})}}),CSSLint.addRule(
{id:"ids",name:"Disallow IDs in selectors",desc:"Selectors should not contain IDs."
,browsers:"All",init:function(e,t){var n=this;e.addListener("startrule",function(
r){var i=r.selectors,s,o,u,a,f,l,c;for(f=0;f<i.length;f++){s=i[f],a=0;for(l=0;l<
s.parts.length;l++){o=s.parts[l];if(o.type==e.SELECTOR_PART_TYPE)for(c=0;c<o.modifiers
.length;c++)u=o.modifiers[c],u.type=="id"&&a++}a==1?t.report("Don't use IDs in selectors."
,s.line,s.col,n):a>1&&t.report(a+" IDs in the selector, really?",s.line,s.col,n)
}})}}),CSSLint.addRule({id:"import",name:"Disallow @import",desc:"Don't use @import, use <link> instead."
,browsers:"All",init:function(e,t){var n=this;e.addListener("import",function(e)
{t.report("@import prevents parallel downloads, use <link> instead.",e.line,e.col
,n)})}}),CSSLint.addRule({id:"important",name:"Disallow !important",desc:"Be careful when using !important declaration"
,browsers:"All",init:function(e,t){var n=this,r=0;e.addListener("property",function(
e){e.important===!0&&(r++,t.report("Use of !important",e.line,e.col,n))}),e.addListener
("endstylesheet",function(){t.stat("important",r),r>=10&&t.rollupWarn("Too many !important declarations ("+
r+"), try to use less than 10 to avoid specificity issues.",n)})}}),CSSLint.addRule
({id:"known-properties",name:"Require use of known properties",desc:"Properties should be known (listed in CSS3 specification) or be a vendor-prefixed property."
,browsers:"All",init:function(e,t){var n=this;e.addListener("property",function(
e){var r=e.property.text.toLowerCase();e.invalid&&t.report(e.invalid.message,e.line
,e.col,n)})}}),CSSLint.addRule({id:"outline-none",name:"Disallow outline: none",
desc:"Use of outline: none or outline: 0 should be limited to :focus rules.",browsers
:"All",tags:["Accessibility"],init:function(e,t){function i(e){e.selectors?r={line
:e.line,col:e.col,selectors:e.selectors,propCount:0,outline:!1}:r=null}function s
(e){r&&r.outline&&(r.selectors.toString().toLowerCase().indexOf(":focus")==-1?t.
report("Outlines should only be modified using :focus.",r.line,r.col,n):r.propCount==1&&
t.report("Outlines shouldn't be hidden unless other visual changes are made.",r.
line,r.col,n))}var n=this,r;e.addListener("startrule",i),e.addListener("startfontface"
,i),e.addListener("startpage",i),e.addListener("startpagemargin",i),e.addListener
("startkeyframerule",i),e.addListener("property",function(e){var t=e.property.text
.toLowerCase(),n=e.value;r&&(r.propCount++,t=="outline"&&(n=="none"||n=="0")&&(r
.outline=!0))}),e.addListener("endrule",s),e.addListener("endfontface",s),e.addListener
("endpage",s),e.addListener("endpagemargin",s),e.addListener("endkeyframerule",s
)}}),CSSLint.addRule({id:"overqualified-elements",name:"Disallow overqualified elements"
,desc:"Don't use classes or IDs with elements (a.foo or a#foo).",browsers:"All",
init:function(e,t){var n=this,r={};e.addListener("startrule",function(i){var s=i
.selectors,o,u,a,f,l,c;for(f=0;f<s.length;f++){o=s[f];for(l=0;l<o.parts.length;l++
){u=o.parts[l];if(u.type==e.SELECTOR_PART_TYPE)for(c=0;c<u.modifiers.length;c++)
a=u.modifiers[c],u.elementName&&a.type=="id"?t.report("Element ("+u+") is overqualified, just use "+
a+" without element name.",u.line,u.col,n):a.type=="class"&&(r[a]||(r[a]=[]),r[a
].push({modifier:a,part:u}))}}}),e.addListener("endstylesheet",function(){var e;
for(e in r)r.hasOwnProperty(e)&&r[e].length==1&&r[e][0].part.elementName&&t.report
("Element ("+r[e][0].part+") is overqualified, just use "+r[e][0].modifier+" without element name."
,r[e][0].part.line,r[e][0].part.col,n)})}}),CSSLint.addRule({id:"qualified-headings"
,name:"Disallow qualified headings",desc:"Headings should not be qualified (namespaced)."
,browsers:"All",init:function(e,t){var n=this;e.addListener("startrule",function(
r){var i=r.selectors,s,o,u,a;for(u=0;u<i.length;u++){s=i[u];for(a=0;a<s.parts.length
;a++)o=s.parts[a],o.type==e.SELECTOR_PART_TYPE&&o.elementName&&/h[1-6]/.test(o.elementName
.toString())&&a>0&&t.report("Heading ("+o.elementName+") should not be qualified."
,o.line,o.col,n)}})}}),CSSLint.addRule({id:"regex-selectors",name:"Disallow selectors that look like regexs"
,desc:"Selectors that look like regular expressions are slow and should be avoided."
,browsers:"All",init:function(e,t){var n=this;e.addListener("startrule",function(
r){var i=r.selectors,s,o,u,a,f,l;for(a=0;a<i.length;a++){s=i[a];for(f=0;f<s.parts
.length;f++){o=s.parts[f];if(o.type==e.SELECTOR_PART_TYPE)for(l=0;l<o.modifiers.
length;l++)u=o.modifiers[l],u.type=="attribute"&&/([\~\|\^\$\*]=)/.test(u)&&t.report
("Attribute selectors with "+RegExp.$1+" are slow!",u.line,u.col,n)}}})}}),CSSLint
.addRule({id:"rules-count",name:"Rules Count",desc:"Track how many rules there are."
,browsers:"All",init:function(e,t){var n=this,r=0;e.addListener("startrule",function(
){r++}),e.addListener("endstylesheet",function(){t.stat("rule-count",r)})}}),CSSLint
.addRule({id:"selector-max-approaching",name:"Warn when approaching the 4095 selector limit for IE"
,desc:"Will warn when selector count is >= 3800 selectors.",browsers:"IE",init:function(
e,t){var n=this,r=0;e.addListener("startrule",function(e){r+=e.selectors.length}
),e.addListener("endstylesheet",function(){r>=3800&&t.report("You have "+r+" selectors. Internet Explorer supports a maximum of 4095 selectors per stylesheet. Consider refactoring."
,0,0,n)})}}),CSSLint.addRule({id:"selector-max",name:"Error when past the 4095 selector limit for IE"
,desc:"Will error when selector count is > 4095.",browsers:"IE",init:function(e,
t){var n=this,r=0;e.addListener("startrule",function(e){r+=e.selectors.length}),
e.addListener("endstylesheet",function(){r>4095&&t.report("You have "+r+" selectors. Internet Explorer supports a maximum of 4095 selectors per stylesheet. Consider refactoring."
,0,0,n)})}}),CSSLint.addRule({id:"shorthand",name:"Require shorthand properties"
,desc:"Use shorthand properties where possible.",browsers:"All",init:function(e,
t){function f(e){u={}}function l(e){var r,i,s,o;for(r in a)if(a.hasOwnProperty(r
)){o=0;for(i=0,s=a[r].length;i<s;i++)o+=u[a[r][i]]?1:0;o==a[r].length&&t.report("The properties "+
a[r].join(", ")+" can be replaced by "+r+".",e.line,e.col,n)}}var n=this,r,i,s,o=
{},u,a={margin:["margin-top","margin-bottom","margin-left","margin-right"],padding
:["padding-top","padding-bottom","padding-left","padding-right"]};for(r in a)if(
a.hasOwnProperty(r))for(i=0,s=a[r].length;i<s;i++)o[a[r][i]]=r;e.addListener("startrule"
,f),e.addListener("startfontface",f),e.addListener("property",function(e){var t=
e.property.toString().toLowerCase(),n=e.value.parts[0].value;o[t]&&(u[t]=1)}),e.
addListener("endrule",l),e.addListener("endfontface",l)}}),CSSLint.addRule({id:"star-property-hack"
,name:"Disallow properties with a star prefix",desc:"Checks for the star property hack (targets IE6/7)"
,browsers:"All",init:function(e,t){var n=this;e.addListener("property",function(
e){var r=e.property;r.hack=="*"&&t.report("Property with star prefix found.",e.property
.line,e.property.col,n)})}}),CSSLint.addRule({id:"text-indent",name:"Disallow negative text-indent"
,desc:"Checks for text indent less than -99px",browsers:"All",init:function(e,t)
{function s(e){r=!1,i="inherit"}function o(e){r&&i!="ltr"&&t.report("Negative text-indent doesn't work well with RTL. If you use text-indent for image replacement explicitly set direction for that item to ltr."
,r.line,r.col,n)}var n=this,r,i;e.addListener("startrule",s),e.addListener("startfontface"
,s),e.addListener("property",function(e){var t=e.property.toString().toLowerCase
(),n=e.value;t=="text-indent"&&n.parts[0].value<-99?r=e.property:t=="direction"&&
n=="ltr"&&(i="ltr")}),e.addListener("endrule",o),e.addListener("endfontface",o)}
}),CSSLint.addRule({id:"underscore-property-hack",name:"Disallow properties with an underscore prefix"
,desc:"Checks for the underscore property hack (targets IE6)",browsers:"All",init
:function(e,t){var n=this;e.addListener("property",function(e){var r=e.property;
r.hack=="_"&&t.report("Property with underscore prefix found.",e.property.line,e
.property.col,n)})}}),CSSLint.addRule({id:"unique-headings",name:"Headings should only be defined once"
,desc:"Headings should be defined only once.",browsers:"All",init:function(e,t){
var n=this,r={h1:0,h2:0,h3:0,h4:0,h5:0,h6:0};e.addListener("startrule",function(
e){var i=e.selectors,s,o,u,a,f;for(a=0;a<i.length;a++){s=i[a],o=s.parts[s.parts.
length-1];if(o.elementName&&/(h[1-6])/i.test(o.elementName.toString())){for(f=0;
f<o.modifiers.length;f++)if(o.modifiers[f].type=="pseudo"){u=!0;break}u||(r[RegExp
.$1]++,r[RegExp.$1]>1&&t.report("Heading ("+o.elementName+") has already been defined."
,o.line,o.col,n))}}}),e.addListener("endstylesheet",function(e){var i,s=[];for(i in
r)r.hasOwnProperty(i)&&r[i]>1&&s.push(r[i]+" "+i+"s");s.length&&t.rollupWarn("You have "+
s.join(", ")+" defined in this stylesheet.",n)})}}),CSSLint.addRule({id:"universal-selector"
,name:"Disallow universal selector",desc:"The universal selector (*) is known to be slow."
,browsers:"All",init:function(e,t){var n=this;e.addListener("startrule",function(
e){var r=e.selectors,i,s,o,u,a,f;for(u=0;u<r.length;u++)i=r[u],s=i.parts[i.parts
.length-1],s.elementName=="*"&&t.report(n.desc,s.line,s.col,n)})}}),CSSLint.addRule
({id:"unqualified-attributes",name:"Disallow unqualified attribute selectors",desc
:"Unqualified attribute selectors are known to be slow.",browsers:"All",init:function(
e,t){var n=this;e.addListener("startrule",function(r){var i=r.selectors,s,o,u,a,
f,l;for(a=0;a<i.length;a++){s=i[a],o=s.parts[s.parts.length-1];if(o.type==e.SELECTOR_PART_TYPE
)for(l=0;l<o.modifiers.length;l++)u=o.modifiers[l],u.type=="attribute"&&(!o.elementName||
o.elementName=="*")&&t.report(n.desc,o.line,o.col,n)}})}}),CSSLint.addRule({id:"vendor-prefix"
,name:"Require standard property with vendor prefix",desc:"When using a vendor-prefixed property, make sure to include the standard one."
,browsers:"All",init:function(e,t){function o(){r={},i=1}function u(e){var i,o,u
,a,f,l,c=[];for(i in r)s[i]&&c.push({actual:i,needed:s[i]});for(o=0,u=c.length;o<
u;o++)f=c[o].needed,l=c[o].actual,r[f]?r[f][0].pos<r[l][0].pos&&t.report("Standard property '"+
f+"' should come after vendor-prefixed property '"+l+"'.",r[l][0].name.line,r[l]
[0].name.col,n):t.report("Missing standard property '"+f+"' to go along with '"+
l+"'.",r[l][0].name.line,r[l][0].name.col,n)}var n=this,r,i,s={"-webkit-border-radius"
:"border-radius","-webkit-border-top-left-radius":"border-top-left-radius","-webkit-border-top-right-radius"
:"border-top-right-radius","-webkit-border-bottom-left-radius":"border-bottom-left-radius"
,"-webkit-border-bottom-right-radius":"border-bottom-right-radius","-o-border-radius"
:"border-radius","-o-border-top-left-radius":"border-top-left-radius","-o-border-top-right-radius"
:"border-top-right-radius","-o-border-bottom-left-radius":"border-bottom-left-radius"
,"-o-border-bottom-right-radius":"border-bottom-right-radius","-moz-border-radius"
:"border-radius","-moz-border-radius-topleft":"border-top-left-radius","-moz-border-radius-topright"
:"border-top-right-radius","-moz-border-radius-bottomleft":"border-bottom-left-radius"
,"-moz-border-radius-bottomright":"border-bottom-right-radius","-moz-column-count"
:"column-count","-webkit-column-count":"column-count","-moz-column-gap":"column-gap"
,"-webkit-column-gap":"column-gap","-moz-column-rule":"column-rule","-webkit-column-rule"
:"column-rule","-moz-column-rule-style":"column-rule-style","-webkit-column-rule-style"
:"column-rule-style","-moz-column-rule-color":"column-rule-color","-webkit-column-rule-color"
:"column-rule-color","-moz-column-rule-width":"column-rule-width","-webkit-column-rule-width"
:"column-rule-width","-moz-column-width":"column-width","-webkit-column-width":"column-width"
,"-webkit-column-span":"column-span","-webkit-columns":"columns","-moz-box-shadow"
:"box-shadow","-webkit-box-shadow":"box-shadow","-moz-transform":"transform","-webkit-transform"
:"transform","-o-transform":"transform","-ms-transform":"transform","-moz-transform-origin"
:"transform-origin","-webkit-transform-origin":"transform-origin","-o-transform-origin"
:"transform-origin","-ms-transform-origin":"transform-origin","-moz-box-sizing":"box-sizing"
,"-webkit-box-sizing":"box-sizing","-moz-user-select":"user-select","-khtml-user-select"
:"user-select","-webkit-user-select":"user-select"};e.addListener("startrule",o)
,e.addListener("startfontface",o),e.addListener("startpage",o),e.addListener("startpagemargin"
,o),e.addListener("startkeyframerule",o),e.addListener("property",function(e){var t=
e.property.text.toLowerCase();r[t]||(r[t]=[]),r[t].push({name:e.property,value:e
.value,pos:i++})}),e.addListener("endrule",u),e.addListener("endfontface",u),e.addListener
("endpage",u),e.addListener("endpagemargin",u),e.addListener("endkeyframerule",u
)}}),CSSLint.addRule({id:"zero-units",name:"Disallow units for 0 values",desc:"You don't need to specify units when a value is 0."
,browsers:"All",init:function(e,t){var n=this;e.addListener("property",function(
e){var r=e.value.parts,i=0,s=r.length;while(i<s)(r[i].units||r[i].type=="percentage"
)&&r[i].value===0&&r[i].type!="time"&&t.report("Values of 0 shouldn't have units specified."
,r[i].line,r[i].col,n),i++})}}),function(){var e=function(e){return!e||e.constructor!==
String?"":e.replace(/[\"&><]/g,function(e){switch(e){case'"':return"&quot;";case"&"
:return"&amp;";case"<":return"&lt;";case">":return"&gt;"}})};CSSLint.addFormatter
({id:"checkstyle-xml",name:"Checkstyle XML format",startFormat:function(){return'<?xml version="1.0" encoding="utf-8"?><checkstyle>'
},endFormat:function(){return"</checkstyle>"},readError:function(t,n){return'<file name="'+
e(t)+'"><error line="0" column="0" severty="error" message="'+e(n)+'"></error></file>'
},formatResults:function(t,n,r){var i=t.messages,s=[],o=function(e){return!!e&&"name"in
e?"net.csslint."+e.name.replace(/\s/g,""):""};return i.length>0&&(s.push('<file name="'+
n+'">'),CSSLint.Util.forEach(i,function(t,n){t.rollup||s.push('<error line="'+t.
line+'" column="'+t.col+'" severity="'+t.type+'"'+' message="'+e(t.message)+'" source="'+
o(t.rule)+'"/>')}),s.push("</file>")),s.join("")}})}(),CSSLint.addFormatter({id:"compact"
,name:"Compact, 'porcelain' format",startFormat:function(){return""},endFormat:function(
){return""},formatResults:function(e,t,n){var r=e.messages,i="";n=n||{};var s=function(
e){return e.charAt(0).toUpperCase()+e.slice(1)};return r.length===0?n.quiet?"":t+": Lint Free!"
:(CSSLint.Util.forEach(r,function(e,n){e.rollup?i+=t+": "+s(e.type)+" - "+e.message+"\n"
:i+=t+": "+"line "+e.line+", col "+e.col+", "+s(e.type)+" - "+e.message+"\n"}),i
)}}),CSSLint.addFormatter({id:"csslint-xml",name:"CSSLint XML format",startFormat
:function(){return'<?xml version="1.0" encoding="utf-8"?><csslint>'},endFormat:function(
){return"</csslint>"},formatResults:function(e,t,n){var r=e.messages,i=[],s=function(
e){return!e||e.constructor!==String?"":e.replace(/\"/g,"'").replace(/&/g,"&amp;"
).replace(/</g,"&lt;").replace(/>/g,"&gt;")};return r.length>0&&(i.push('<file name="'+
t+'">'),CSSLint.Util.forEach(r,function(e,t){e.rollup?i.push('<issue severity="'+
e.type+'" reason="'+s(e.message)+'" evidence="'+s(e.evidence)+'"/>'):i.push('<issue line="'+
e.line+'" char="'+e.col+'" severity="'+e.type+'"'+' reason="'+s(e.message)+'" evidence="'+
s(e.evidence)+'"/>')}),i.push("</file>")),i.join("")}}),CSSLint.addFormatter({id
:"junit-xml",name:"JUNIT XML format",startFormat:function(){return'<?xml version="1.0" encoding="utf-8"?><testsuites>'
},endFormat:function(){return"</testsuites>"},formatResults:function(e,t,n){var r=
e.messages,i=[],s={error:0,failure:0},o=function(e){return!!e&&"name"in e?"net.csslint."+
e.name.replace(/\s/g,""):""},u=function(e){return!e||e.constructor!==String?"":e
.replace(/\"/g,"'").replace(/</g,"&lt;").replace(/>/g,"&gt;")};return r.length>0&&
(r.forEach(function(e,t){var n=e.type==="warning"?"error":e.type;e.rollup||(i.push
('<testcase time="0" name="'+o(e.rule)+'">'),i.push("<"+n+' message="'+u(e.message
)+'"><![CDATA['+e.line+":"+e.col+":"+u(e.evidence)+"]]></"+n+">"),i.push("</testcase>"
),s[n]+=1)}),i.unshift('<testsuite time="0" tests="'+r.length+'" skipped="0" errors="'+
s.error+'" failures="'+s.failure+'" package="net.csslint" name="'+t+'">'),i.push
("</testsuite>")),i.join("")}}),CSSLint.addFormatter({id:"lint-xml",name:"Lint XML format"
,startFormat:function(){return'<?xml version="1.0" encoding="utf-8"?><lint>'},endFormat
:function(){return"</lint>"},formatResults:function(e,t,n){var r=e.messages,i=[]
,s=function(e){return!e||e.constructor!==String?"":e.replace(/\"/g,"'").replace(/&/g
,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")};return r.length>0&&(i.push('<file name="'+
t+'">'),CSSLint.Util.forEach(r,function(e,t){e.rollup?i.push('<issue severity="'+
e.type+'" reason="'+s(e.message)+'" evidence="'+s(e.evidence)+'"/>'):i.push('<issue line="'+
e.line+'" char="'+e.col+'" severity="'+e.type+'"'+' reason="'+s(e.message)+'" evidence="'+
s(e.evidence)+'"/>')}),i.push("</file>")),i.join("")}}),CSSLint.addFormatter({id
:"text",name:"Plain Text",startFormat:function(){return""},endFormat:function(){
return""},formatResults:function(e,t,n){var r=e.messages,i="";n=n||{};if(r.length===0
)return n.quiet?"":"\n\ncsslint: No errors in "+t+".";i="\n\ncsslint: There are "+
r.length+" problems in "+t+".";var s=t.lastIndexOf("/"),o=t;return s===-1&&(s=t.
lastIndexOf("\\")),s>-1&&(o=t.substring(s+1)),CSSLint.Util.forEach(r,function(e,
t){i=i+"\n\n"+o,e.rollup?(i+="\n"+(t+1)+": "+e.type,i+="\n"+e.message):(i+="\n"+
(t+1)+": "+e.type+" at line "+e.line+", col "+e.col,i+="\n"+e.message,i+="\n"+e.
evidence)}),i}}),CSSLint}()



/* istanbul ignore next */
// init lib jslint
// https://github.com/douglascrockford/JSLint/blob/394bf291bfa3881bb9827b9fc7b7d1112d83f313/jslint.js
// utility2-uglifyjs https://raw.githubusercontent.com/douglascrockford/JSLint/394bf291bfa3881bb9827b9fc7b7d1112d83f313/jslint.js
// rename /^_|\$|Sync\$|_$/ -> /Sync\$/
var JSLINT=function(){"use strict";function e(e,t){var n,r=e.length,i=Object.create
(null);for(n=0;n<r;n+=1)i[e[n]]=t;return i}function it(e){return v[e]||"\\u"+("0000"+
e.charCodeAt().toString(16)).slice(-4)}function st(e){Object.keys(e).forEach(function(
t){_[t]=e[t]})}function ot(){M.browser&&(st(o),M.browser=!1),M.closure&&st(a),M.
couch&&(st(c),M.couch=!1),M.devel&&(st(p),M.devel=!1),M.node&&(st(k),M.node=!1,L=!0
),M.rhino&&(st(I),M.rhino=!1)}function ut(e){return e||(e=O),e.id==="(number)"?e
.number:e.string}function at(e,t,n){throw{name:"JSLintError",line:t,character:n,
message:u.scanned_a_b.supplant({a:u[e]||e,b:Math.floor(t/N.length*100)})}}function ft
(e,t,n,r,i,s,o){var a={id:"(error)",raw:u[e]||e,code:e,evidence:N[t-1]||"",line:
t,character:n,a:r||ut(this),b:i,c:s,d:o};return a.reason=a.raw.supplant(a),S.errors
.push(a),M.passfail&&at("stopping",t,n),J+=1,J>=M.maxerr&&at("too_many",t,n),a}function lt
(e,t,n,r,i,s,o){var u=ft(e,t,n,r,i,s,o);at("stopping",u.line,u.character)}function ct
(e){!M.white&&O.from!==e&&O.warn("expected_a_at_b_c","",e,O.from)}function ht(e,
t){var n=t.string,r=q[n];t.dead=!1,t.init=!1,t.kind=e,t.master=r,t.used=0,t.writeable=!0
,e==="var"&&m===y?r||(_[n]===!1&&(t.writeable=!1),b[n]=t):(r&&(r.function===m?(r
.kind!=="exception"||e!=="exception"||!r.dead)&&t.warn("already_defined",n):r.function!==
y&&e==="var"&&t.warn("redefinition_a_b",n,r.line)),q[n]=t,e==="var"&&s.push(n))}
function pt(e){var t,n=0;e=e||0;while(n<=e)t=C[n],t||(t=C[n]=T.token()),n+=1;return t
}function dt(e,t){if(E){if($&&O.line!==X.line){if(($!==E||!O.edge)&&O.from===E.at-
(O.edge?M.indent:0)){var r=E;for(;;){r.at-=M.indent;if(r===$)break;r=r.was}r.open=!1
}$=null}O.id==="?"&&E.mode===":"&&X.line!==O.line&&(E.at-=M.indent),E.open?O.edge?
O.edge==="label"?ct(1):O.edge==="case"||E.mode==="statement"?ct(E.at-M.indent):(
E.mode!=="array"||O.line!==X.line)&&ct(E.at):O.line!==X.line&&(O.from<E.at+(E.mode==="expression"?0
:M.indent)&&ct(E.at+M.indent),E.wrap=!0):O.line!==X.line&&(O.edge?ct(E.at):(E.wrap=!0
,E.mode==="statement"||E.mode==="var"?ct(E.at+M.indent):O.from<E.at+(E.mode==="expression"?0
:M.indent)&&ct(E.at+M.indent)))}switch(X.id){case"(number)":O.id==="."&&O.warn("trailing_decimal_a"
);break;case"-":(O.id==="-"||O.id==="--")&&O.warn("confusing_a");break;case"+":(
O.id==="+"||O.id==="++")&&O.warn("confusing_a")}if(X.id==="(string)"||X.identifier
)n=X.string;e&&O.id!==e&&(t?O.warn("expected_a_b_from_c_d",e,t.id,t.line,ut()):(!
O.identifier||O.string!==e)&&O.warn("expected_a_b",e,ut())),P=X,X=O,O=C.shift()||
T.token(),O.function=m,V.push(O)}function vt(){var e,t;for(;;){if(O.id!=="(string)"&&!
O.identifier)return;e=O.string,dt(),t=!1;if(O.id===":"){dt(":");switch(O.id){case"true"
:t=_[e]!==!1,dt("true");break;case"false":dt("false");break;default:O.stop("unexpected_a"
)}}_[e]=t;if(O.id!==",")return;dt(",")}}function mt(){var e,n;while(O.id==="(string)"||
O.identifier)e=O.string,t[e]||O.stop("unexpected_a"),dt(),O.id!==":"&&O.stop("expected_a_b"
,":",ut()),dt(":"),typeof t[e]=="number"?(n=O.number,(n>t[e]||n<=0||Math.floor(n
)!==n)&&O.stop("expected_small_a"),M[e]=n):O.id==="true"?M[e]=!0:O.id==="false"?
M[e]=!1:O.stop("unexpected_a"),dt(),O.id===","&&dt(",");ot()}function gt(){var e
;M.properties=!0;for(;;){if(O.id!=="(string)"&&!O.identifier)return;e=O.string,dt
();if(O.id===":")for(;;){dt();if(O.id!=="(string)"&&!O.identifier)break}H[e]=0;if(
O.id!==",")return;dt(",")}}function yt(e){O.edge=E?E.open&&(e||"edge"):""}function bt
(e){var t;typeof e=="number"?E={at:+e,open:!0,was:E}:E?e==="statement"?E={at:E.at
,open:!0,was:E}:(t=e==="var"||O.line!==X.line,E={at:(t||e==="control"?E.at+M.indent
:E.at)+(E.wrap?M.indent:0),mode:e,open:t,was:E},e==="var"&&t&&($=E)):E={at:1,mode
:"statement",open:!0}}function wt(e,t){e&&(E&&E.open&&(E.at-=M.indent,yt()),dt(e
,t)),E&&(E=E.was)}function Et(e,t){e=e||X,t=t||O,t.id!=="(end)"&&!M.white&&(X.line!==
t.line||X.thru+1!==t.from)&&t.warn("expected_space_a_b",ut(X),ut(t))}function St
(e,t){e=e||X,t=t||O,t.id!=="(end)"&&(e.line!==t.line||!M.white&&e.thru+1!==t.from
)&&t.warn("expected_space_a_b",ut(e),ut(t))}function xt(e,t){e=e||X,t=t||O,!M.white&&
e.thru!==t.from&&e.line===t.line&&t.warn("unexpected_space_a_b",ut(e),ut(t))}function Tt
(e,t){e=e||X,t=t||O,t.id!=="(end)"&&(e.line!==t.line||!M.white&&e.thru!==t.from)&&
t.warn("unexpected_space_a_b",ut(e),ut(t))}function Nt(e,t){M.white||(e=e||X,t=t||
O,e.thru===t.from&&e.line===t.line&&t.warn("missing_space_a_b",ut(e),ut(t)))}function Ct
(){O.id!==","?ft("expected_a_b",X.line,X.thru,",",ut()):(M.white||Tt(),dt(","),Nt
())}function kt(){O.id!==";"?ft("expected_a_b",X.line,X.thru,";",ut()):(M.white||
Tt(),dt(";"),R[O.id]!==!0&&Nt())}function Lt(){return O.string==="use strict"?(z&&
O.warn("unnecessary_use"),yt(),dt(),kt(),z=!0,!0):!1}function At(e,t){if(e===t)return!0
;if(Array.isArray(e)){if(Array.isArray(t)&&e.length===t.length){var n;for(n=0;n<
e.length;n+=1)if(!At(e[n],t[n]))return!1;return!0}return!1}if(Array.isArray(t))return!1
;if(e.id==="(number)"&&t.id==="(number)")return e.number===t.number;if(e.arity===
t.arity&&e.string===t.string)switch(e.arity){case undefined:return e.string===t.
string;case"prefix":case"suffix":return e.id===t.id&&At(e.first,t.first)&&e.id!=="{"&&
e.id!=="[";case"infix":return At(e.first,t.first)&&At(e.second,t.second);case"ternary"
:return At(e.first,t.first)&&At(e.second,t.second)&&At(e.third,t.third);case"function"
:case"regexp":return!1;default:return!0}return e.id==="."&&t.id==="["&&t.arity==="infix"?
e.second.string===t.second.string&&t.second.id==="(string)":e.id==="["&&e.arity==="infix"&&
t.id==="."?e.second.string===t.second.string&&e.second.id==="(string)":!1}function Ot
(e,t){var r;O.id==="(end)"&&X.stop("unexpected_a",O.id),dt(),t&&(n="anonymous");
if(t===!0&&X.fud)r=X.fud();else{if(X.nud)r=X.nud();else{if(O.id==="(number)"&&X.
id===".")return X.warn("leading_decimal_a",ut()),dt(),X;X.stop("expected_identifier_a"
,ut(X))}while(e<O.lbp)dt(),r=X.led(r)}return r&&r.assign&&!t&&(M.ass||r.warn("assignment_expression"
),r.id!=="="&&r.first.master&&(r.first.master.used=!0)),r}function Mt(e,t){var n=
W[e];return n||(n=Object.create(B),n.id=n.string=e,n.lbp=t||0,W[e]=n),n}function _t
(e){return e.postscript=!0,e}function Dt(e){var t=Mt(e,0);return t.from=1,t.thru=1
,t.line=0,t.edge="edge",t.string=e,_t(t)}function Pt(e){var t=e.id.charAt(0);if(
t>="a"&&t<="z"||t>="A"&&t<="Z")e.identifier=e.reserved=!0;return e}function Ht(e
,t){var n=Mt(e);return n.fud=t,Pt(n)}function Bt(e,t){var n=Ht(e,t);n.disrupt=!0
}function jt(e,t){var n=Ht(e,function(){var n;return m.breakage?m.breakage.push(
this):m.breakage=[this],n=t.apply(this),m.breakage.length>1?m.breakage.pop():delete
m.breakage,n});n.labeled=!0}function Ft(e,t){var n=Mt(e,150);return Pt(n),n.nud=
function(){var n=this;n.arity="prefix";if(typeof t=="function"){n=t(n);if(n.arity!=="prefix"
)return n}else e==="typeof"?Et():Tt(),n.first=Ot(150);switch(n.id){case"++":case"--"
:M.plusplus?(!n.first.identifier||n.first.reserved)&&n.first.id!=="."&&n.first.id!=="["&&
n.warn("bad_operand"):n.warn("unexpected_a");break;default:(n.first.arity==="prefix"||
n.first.arity==="function")&&n.warn("unexpected_a")}return n},n}function It(e,t,
n){var r=Mt(e);return r.arity=t,n&&(r.nud=n),r}function qt(e,t){var n=Mt(e);return n
.identifier=n.reserved=!0,typeof t=="function"&&(n.nud=t),n}function Rt(e){var t=
qt(e);return t.string=e,t.nud=F,t}function Ut(e,t){return qt(e,function(){return typeof
t=="function"&&t(this),this})}function zt(e,t,n,r){var i=Mt(e,t);return Pt(i),i.
led=function(e){return this.arity="infix",r||(Nt(P,X),Nt()),!M.bitwise&&this.bitwise&&
this.warn("unexpected_a"),typeof n=="function"?n(e,this):(this.first=e,this.second=
Ot(t),this)},i}function Wt(e,t){return e.assign&&e.warn(t||"conditional_assignment"
),e}function Xt(e,t){switch(e.id){case"[":case"-":e.arity!=="infix"&&e.warn(t||"weird_condition"
);break;case"false":case"function":case"Infinity":case"NaN":case"null":case"true"
:case"undefined":case"void":case"(number)":case"(regexp)":case"(string)":case"{"
:case"?":case"~":e.warn(t||"weird_condition");break;case"(":(e.first.id==="new"||
e.first.string==="Boolean"||e.first.id==="."&&A[e.first.second.string]===!0)&&e.
warn(t||"weird_condition")}return e}function Vt(e){switch(e.arity){case"prefix":
switch(e.id){case"{":case"[":e.warn("unexpected_a");break;case"!":e.warn("confusing_a"
)}break;case"function":case"regexp":e.warn("unexpected_a");break;default:e.id==="NaN"?
e.warn("isNaN"):e.relation&&e.warn("weird_relation")}return e}function $t(e,t){var n=
zt(e,100,function(e,n){Vt(e),t&&!M.eqeq&&n.warn("expected_a_b",t,n.id);var r=Ot(100
);return!At(e,r)&&(e.id!=="(string)"&&e.id!=="(number)"||r.id!=="(string)"&&r.id!=="(number)"
)?e.id==="typeof"?r.id!=="(string)"?r.warn("expected_string_a",ut(r)):(r.string==="undefined"||
r.string==="null")&&e.warn("unexpected_typeof_a",r.string):r.id==="typeof"&&(e.id!=="(string)"?
e.warn("expected_string_a",ut(e)):(e.string==="undefined"||e.string==="null")&&r
.warn("unexpected_typeof_a",e.string)):n.warn("weird_relation"),n.first=e,n.second=
Vt(r),n});return n.relation=!0,n}function Jt(e,t){var n;e.identifier?(n=q[e.string
],n?(q[e.string].writeable!==!0&&e.warn("read_only"),n.used-=1,t==="="&&(n.init=!0
)):e.reserved&&e.warn("expected_identifier_a_reserved")):e.id==="."||e.id==="["?
(!e.first||e.first.string==="arguments")&&e.warn("bad_assignment"):e.warn("bad_assignment"
)}function Kt(e,t){var n=zt(e,20,function(t,n){var r;n.first=t,Jt(t,e),n.second=
Ot(20),n.id==="="&&At(n.first,n.second)&&n.warn("weird_assignment"),r=n;while(O.
id==="=")Jt(r.second,"="),O.first=r.second,r.second=O,r=O,dt("="),r.second=Ot(20
);return n});return n.assign=!0,t&&W[t].bitwise&&(n.bitwise=!0),n}function Qt(e,
t){var n=zt(e,t,"number");return n.bitwise=!0,n}function Gt(e){var t=Mt(e,150);return t
.led=function(e){return Tt(P,X),M.plusplus?(!e.identifier||e.reserved)&&e.id!=="."&&
e.id!=="["&&this.warn("bad_operand"):this.warn("unexpected_a"),this.first=e,this
.arity="suffix",this},t}function Yt(e){if(O.identifier)return dt(),X.reserved&&e&&
X.warn("expected_identifier_a_reserved"),X.string}function Zt(e){var t=Yt(e);return t||
O.stop(X.id==="function"&&O.id==="("?"name_function":"expected_identifier_a"),t}
function en(){var e,t,n;if(O.id===";"){O.warn("unexpected_a"),kt();return}return O
.identifier&&!O.reserved&&pt().id===":"&&(yt("label"),e=O,dt(),dt(":"),ht("label"
,e),O.labeled!==!0||m===y?e.stop("unexpected_label_a"):Y.test(e.string+":")&&e.warn
("url"),O.label=e,e.init=!0,e.statement=O),t=O,X.id!=="else"&&yt(),bt("statement"
),n=Ot(0,!0),n&&(n.arity==="statement"?n.id==="switch"||n.block&&n.id!=="do"?Nt(
):kt():(n.id==="("?n.first.id==="new"&&O.warn("bad_new"):n.id==="++"||n.id==="--"?
Jt(n.first):!n.assign&&n.id!=="delete"&&(!M.closure||!t.comments)&&t.warn("assignment_function_expression"
),kt())),wt(),e&&(e.dead=!0),n}function tn(){var e=[],t,n;while(O.postscript!==!0
)O.id===";"?(O.warn("unexpected_a"),kt()):(O.string==="use strict"&&((!L||m!==y||
e.length>0)&&O.warn("function_strict"),Lt()),t&&(O.warn("unreachable_a_b",O.string
,t.string),t=null),n=en(),n&&(e.push(n),n.disrupt&&(t=n,e.disrupt=!0)));return e
}function nn(e){var t,n=O,r=s,i=w,o=z;return w=e!=="function"&&e!=="try"&&e!=="catch"
,s=[],n.id==="{"?(Nt(),dt("{"),bt(),e==="function"&&!Lt()&&!o&&!M.sloppy&&m.level===1&&
O.warn("missing_use_strict"),t=tn(),z=o,wt("}",n)):w?n.stop("expected_a_b","{",ut
()):(n.warn("expected_a_b","{",ut()),t=[en()],t.disrupt=t[0].disrupt),e!=="catch"&&
t.length===0&&!M.debug&&n.warn("empty_block"),s.forEach(function(e){q[e].dead=!0
}),s=r,w=i,t}function rn(e){M.properties&&typeof H[e]!="number"&&X.warn("unexpected_property_a"
,e),H[e]?H[e]+=1:H[e]=1}function sn(e){return Tt(),e.first=Xt(Ot(150)),(r[e.first
.id]===e||e.first.assign)&&e.warn("confusing_a"),e}function on(){var e=Yt();return e||
(O.id==="(string)"?(e=O.string,dt()):O.id==="(number)"&&(e=O.number.toString(),dt
())),e}function un(){var e,t=[],n=O;dt("("),X.function=m,bt(),xt();if(O.id!==")"
)for(;;){yt(),e=Zt(),X.reserved&&X.warn("expected_identifier_a_reserved"),ht("parameter"
,X),t.push(e),X.init=!0,X.writeable=!0;if(O.id!==",")break;Ct()}return xt(),wt(")"
,n),t}function an(e,t){var r=m,i=M,s=q;q=Object.create(s),m={closure:[],global:[
],level:r.level+1,line:O.line,loopage:0,name:t||"'"+(n||"").replace(et,it)+"'",outer
:[],scope:q},m.parameter=un(),e.function=m,M=Object.create(i),g.push(m),t&&(e.name=
t,e.string=t,ht("function",e),e.init=!0,e.used+=1),e.writeable=!1,Et(),e.block=nn
("function"),Object.keys(q).forEach(function(e){var t=q[e];!t.used&&t.kind!=="exception"&&
(t.kind!=="parameter"||!M.unparam)?t.warn("unused_a"):t.init||t.warn("uninitialized_a"
)}),m=r,M=i,q=s}function fn(e){var t=O.string,n;return e.arity="statement",!m.breakage||!
M.continue&&e.id==="continue"?e.warn("unexpected_a"):O.identifier&&X.line===O.line?
(St(),n=q[t],!n||n.kind!=="label"?O.warn("not_a_label"):n.dead||n.function!==m?O
.warn("not_a_scope"):(n.used+=1,e.id==="break"&&(n.statement.break=!0),m.breakage
[m.breakage.length-1]===n.statement&&O.warn("unexpected_a")),e.first=O,dt()):e.id==="break"&&
(m.breakage[m.breakage.length-1].break=!0),e}function ln(){function e(){var e=O,
t=Object.create(null);dt("{");if(O.id!=="}")while(O.id!=="(end)"){while(O.id===","
)O.warn("unexpected_a"),dt(",");O.id!=="(string)"&&O.warn("expected_string_a"),t
[O.string]===!0?O.warn("duplicate_a"):O.string==="__proto__"?O.warn("dangling_a"
):t[O.string]=!0,dt(),dt(":"),ln();if(O.id!==",")break;dt(",");if(O.id==="}"){X.
warn("unexpected_a");break}}dt("}",e)}function t(){var e=O;dt("[");if(O.id!=="]"
)while(O.id!=="(end)"){while(O.id===",")O.warn("unexpected_a"),dt(",");ln();if(O
.id!==",")break;dt(",");if(O.id==="]"){X.warn("unexpected_a");break}}dt("]",e)}switch(
O.id){case"{":e();break;case"[":t();break;case"true":case"false":case"null":case"(number)"
:case"(string)":dt();break;case"-":dt("-"),Tt(),dt("(number)");break;default:O.stop
("unexpected_a")}}function cn(e){e=e.sort();var t,n=0,r,i;for(t=0;t<e.length;t+=1
)i=e[t],i!==r&&(e[n]=i,r=i,n+=1);return e.length=n,e}var t={ass:!0,bitwise:!0,browser
:!0,closure:!0,"continue":!0,couch:!0,debug:!0,devel:!0,eqeq:!0,evil:!0,forin:!0
,indent:10,maxerr:1e3,maxlen:256,newcap:!0,node:!0,nomen:!0,passfail:!0,plusplus
:!0,properties:!0,regexp:!0,rhino:!0,unparam:!0,sloppy:!0,stupid:!0,sub:!0,todo:!0
,vars:!0,white:!0},n,r={"<":!0,"<=":!0,"==":!0,"===":!0,"!==":!0,"!=":!0,">":!0,">="
:!0,"+":!0,"-":!0,"*":!0,"/":!0,"%":!0},i,s,o=e(["clearInterval","clearTimeout","document"
,"event","FormData","frames","history","Image","localStorage","location","name","navigator"
,"Option","parent","screen","sessionStorage","setInterval","setTimeout","Storage"
,"window","XMLHttpRequest"],!1),u={a_label:"'{a}' is a statement label.",a_scope
:"'{a}' used out of scope.",already_defined:"'{a}' is already defined.",and:"The '&&' subexpression should be wrapped in parens."
,assignment_expression:"Unexpected assignment expression.",assignment_function_expression
:"Expected an assignment or function call and instead saw an expression.",avoid_a
:"Avoid '{a}'.",bad_assignment:"Bad assignment.",bad_constructor:"Bad constructor."
,bad_in_a:"Bad for in variable '{a}'.",bad_invocation:"Bad invocation.",bad_new:"Do not use 'new' for side effects."
,bad_number:"Bad number '{a}'.",bad_operand:"Bad operand.",bad_wrap:"Do not wrap function literals in parens unless they are to be immediately invoked."
,combine_var:"Combine this with the previous 'var' statement.",conditional_assignment
:"Expected a conditional expression and instead saw an assignment.",confusing_a:"Confusing use of '{a}'."
,confusing_regexp:"Confusing regular expression.",constructor_name_a:"A constructor name '{a}' should start with an uppercase letter."
,control_a:"Unexpected control character '{a}'.",dangling_a:"Unexpected dangling '_' in '{a}'."
,deleted:"Only properties should be deleted.",duplicate_a:"Duplicate '{a}'.",empty_block
:"Empty block.",empty_case:"Empty case.",empty_class:"Empty class.",evil:"eval is evil."
,expected_a_b:"Expected '{a}' and instead saw '{b}'.",expected_a_b_from_c_d:"Expected '{a}' to match '{b}' from line {c} and instead saw '{d}'."
,expected_a_at_b_c:"Expected '{a}' at column {b}, not column {c}.",expected_id_a
:"Expected an id, and instead saw #{a}.",expected_identifier_a:"Expected an identifier and instead saw '{a}'."
,expected_identifier_a_reserved:"Expected an identifier and instead saw '{a}' (a reserved word)."
,expected_number_a:"Expected a number and instead saw '{a}'.",expected_operator_a
:"Expected an operator and instead saw '{a}'.",expected_positive_a:"Expected a positive number and instead saw '{a}'"
,expected_small_a:"Expected a small positive integer and instead saw '{a}'",expected_space_a_b
:"Expected exactly one space between '{a}' and '{b}'.",expected_string_a:"Expected a string and instead saw '{a}'."
,for_if:"The body of a for in should be wrapped in an if statement to filter unwanted properties from the prototype."
,function_block:"Function statements should not be placed in blocks.Use a function expression or move the statement to the top of the outer function."
,function_eval:"The Function constructor is eval.",function_loop:"Don't make functions within a loop."
,function_statement:"Function statements are not invocable. Wrap the whole function invocation in parens."
,function_strict:"Use the function form of 'use strict'.",identifier_function:"Expected an identifier in an assignment and instead saw a function invocation."
,implied_evil:"Implied eval is evil. Pass a function instead of a string.",infix_in
:"Unexpected 'in'. Compare with undefined, or use the hasOwnProperty method instead."
,insecure_a:"Insecure '{a}'.",isNaN:"Use the isNaN function to compare with NaN."
,leading_decimal_a:"A leading decimal point can be confused with a dot: '.{a}'."
,missing_a:"Missing '{a}'.",missing_a_after_b:"Missing '{a}' after '{b}'.",missing_property
:"Missing property name.",missing_space_a_b:"Missing space between '{a}' and '{b}'."
,missing_use_strict:"Missing 'use strict' statement.",move_invocation:"Move the invocation into the parens that contain the function."
,move_var:"Move 'var' declarations to the top of the function.",name_function:"Missing name in function statement."
,nested_comment:"Nested comment.",not:"Nested not.",not_a_constructor:"Do not use {a} as a constructor."
,not_a_defined:"'{a}' has not been fully defined yet.",not_a_function:"'{a}' is not a function."
,not_a_label:"'{a}' is not a label.",not_a_scope:"'{a}' is out of scope.",not_greater
:"'{a}' should not be greater than '{b}'.",octal_a:"Don't use octal: '{a}'. Use '\\u....' instead."
,parameter_arguments_a:"Do not mutate parameter '{a}' when using 'arguments'.",parameter_a_get_b
:"Unexpected parameter '{a}' in get {b} function.",parameter_set_a:"Expected parameter (value) in set {a} function."
,radix:"Missing radix parameter.",read_only:"Read only.",redefinition_a_b:"Redefinition of '{a}' from line {b}."
,reserved_a:"Reserved name '{a}'.",scanned_a_b:"{a} ({b}% scanned).",slash_equal
:"A regular expression literal can be confused with '/='.",statement_block:"Expected to see a statement and instead saw a block."
,stopping:"Stopping.",strange_loop:"Strange loop.",strict:"Strict violation.",subscript
:"['{a}'] is better written in dot notation.",sync_a:"Unexpected sync method: '{a}'."
,tag_a_in_b:"A '<{a}>' must be within '<{b}>'.",todo_comment:"Unexpected TODO comment."
,too_long:"Line too long.",too_many:"Too many errors.",trailing_decimal_a:"A trailing decimal point can be confused with a dot: '.{a}'."
,unclosed:"Unclosed string.",unclosed_comment:"Unclosed comment.",unclosed_regexp
:"Unclosed regular expression.",unescaped_a:"Unescaped '{a}'.",unexpected_a:"Unexpected '{a}'."
,unexpected_char_a:"Unexpected character '{a}'.",unexpected_comment:"Unexpected comment."
,unexpected_label_a:"Unexpected label '{a}'.",unexpected_property_a:"Unexpected /*property*/ '{a}'."
,unexpected_space_a_b:"Unexpected space between '{a}' and '{b}'.",unexpected_typeof_a
:"Unexpected 'typeof'. Use '===' to compare directly with {a}.",uninitialized_a:"Uninitialized '{a}'."
,unnecessary_else:"Unnecessary 'else' after disruption.",unnecessary_initialize:"It is not necessary to initialize '{a}' to 'undefined'."
,unnecessary_use:"Unnecessary 'use strict'.",unreachable_a_b:"Unreachable '{a}' after '{b}'."
,unsafe:"Unsafe character.",unused_a:"Unused '{a}'.",url:"JavaScript URL.",use_array
:"Use the array literal notation [].",use_braces:"Spaces are hard to count. Use {{a}}."
,use_nested_if:"Expected 'else { if' and instead saw 'else if'.",use_object:"Use the object literal notation {} or Object.create(null)."
,use_or:"Use the || operator.",use_param:"Use a named parameter.",use_spaces:"Use spaces, not tabs."
,used_before_a:"'{a}' was used before it was defined.",var_a_not:"Variable {a} was not declared correctly."
,var_loop:"Don't declare variables in a loop.",weird_assignment:"Weird assignment."
,weird_condition:"Weird condition.",weird_new:"Weird construction. Delete 'new'."
,weird_program:"Weird program.",weird_relation:"Weird relation.",weird_ternary:"Weird ternary."
,wrap_immediate:"Wrap an immediate function invocation in parentheses to assist the reader in understanding that the expression is the result of a function, and not the function itself."
,wrap_regexp:"Wrap the /regexp/ literal in parens to disambiguate the slash operator."
,write_is_wrong:"document.write can be a form of eval."},a=e(["goog"],!1),f,l,c=
e(["emit","getRow","isArray","log","provides","registerType","require","send","start"
,"sum","toJSON"],!1),h={b:"\b",t:"	",n:"\n",f:"\f",r:"\r",'"':'"',"/":"/","\\":"\\"
,"!":"!"},p=e(["alert","confirm","console","Debug","opera","prompt","WSH"],!1),d
,v={"\b":"\\b","	":"\\t","\n":"\\n","\f":"\\f","\r":"\\r","'":"\\'",'"':'\\"',"/"
:"\\/","\\":"\\\\"},m,g,y,b,w,E,S,x,T,N,C,k=e(["Buffer","clearImmediate","clearInterval"
,"clearTimeout","console","exports","global","module","process","require","setImmediate"
,"setInterval","setTimeout","__dirname","__filename"],!1),L,A=e(["indexOf","lastIndexOf"
,"search"],!0),O,M,_,D,P,H,B,j=e(["g","i","m"],!0),F=function(){return this},I=e
(["defineClass","deserialize","gc","help","load","loadClass","print","quit","readFile"
,"readUrl","runCommand","seal","serialize","spawn","sync","toint32","version"],!1
),q,R=e([";",'"',"'",")"],!0),U=e(["Array","Boolean","Date","decodeURI","decodeURIComponent"
,"encodeURI","encodeURIComponent","Error","eval","EvalError","Function","isFinite"
,"isNaN","JSON","Map","Math","Number","Object","parseInt","parseFloat","Promise"
,"Proxy","RangeError","ReferenceError","Reflect","RegExp","Set","String","Symbol"
,"SyntaxError","System","TypeError","URIError","WeakMap","WeakSet"],!1),z,W=Object
.create(null),X,V,$,J,K=/\r\n?|\n/,Q=/[\u0000-\u0008\u000a-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/
,G=/^([a-zA-Z_$][a-zA-Z0-9_$]*)$/,Y=/^(?:javascript|jscript|ecmascript|vbscript)\s*:/i
,Z=/\*\/|\/\*/,et=/[\u0000-\u001f'\\\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g
,tt=/Sync$/,nt=/^\W*to\s*do(?:\W|$)/i,rt=/^\s*([(){}\[\]\?.,:;'"~#@`]|={1,3}|\/(\*(jslint|properties|property|members?|globals?)?|=|\/)?|\*[\/=]?|\+(?:=|\++)?|-(?:=|-+)?|[\^%]=?|&[&=]?|\|[|=]?|>{1,3}=?|<(?:[\/=!]|\!(\[|--)?|<=?)?|\!(\!|==?)?|[a-zA-Z_$][a-zA-Z0-9_$]*|[0-9]+(?:[xX][0-9a-fA-F]+|\.[0-9]*)?(?:[eE][+\-]?[0-9]+)?)/
;return typeof String.prototype.entityify!="function"&&(String.prototype.entityify=
function(){return this.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"
)}),typeof String.prototype.isAlpha!="function"&&(String.prototype.isAlpha=function(
){return this>="a"&&this<="z\uffff"||this>="A"&&this<="Z\uffff"}),typeof String.
prototype.isDigit!="function"&&(String.prototype.isDigit=function(){return this>="0"&&
this<="9"}),typeof String.prototype.supplant!="function"&&(String.prototype.supplant=
function(e){return this.replace(/\{([^{}]*)\}/g,function(t,n){var r=e[n];return typeof
r=="string"||typeof r=="number"?r:t})}),T=function(){function a(){var e;return t=1
,u=N[s],s+=1,u===undefined?!1:(e=u.search(/\t/),e>=0&&(M.white?u=u.replace(/\t/g
," "):ft("use_spaces",s,e+1)),e=u.search(Q),e>=0&&ft("unsafe",s,e),M.maxlen&&M.maxlen<
u.length&&ft("too_long",s,u.length),!0)}function c(e,n){var i,o;return e==="(string)"&&
Y.test(n)&&ft("url",s,r),o=Object.create(W[e==="(punctuator)"||e==="(identifier)"&&
Object.prototype.hasOwnProperty.call(W,n)?n:e]||W["(error)"]),e==="(identifier)"&&
(o.identifier=!0,n==="__iterator__"||n==="__proto__"?lt("reserved_a",s,r,n):!M.nomen&&
(n.charAt(0)==="_"||n.charAt(n.length-1)==="_")&&ft("dangling_a",s,r,n)),e==="(number)"?
o.number=+n:n!==undefined&&(o.string=String(n)),o.line=s,o.from=r,o.thru=t,f.length&&
(o.comments=f,f=[]),i=o.id,D=i&&("(,=:[!&|?{};~+-*%^<>".indexOf(i.charAt(i.length-1
))>=0||i==="return"||i==="case"),o}function p(e){var o=e.exec(u),a;if(o)return i=
o[0].length,a=o[1],n=a.charAt(0),u=u.slice(i),r=t+i-a.length,t+=i,a;for(;;){if(!
u){M.white||ft("unexpected_char_a",s,t-1,"(space)");return}n=u.charAt(0);if(n!==" "
)break;u=u.slice(1),t+=1}lt("unexpected_char_a",s,t,n)}function d(e){function l(
e){var r=parseInt(u.substr(i+1,e),16);i+=e,r>=32&&r<=126&&r!==34&&r!==92&&r!==39&&
ft("unexpected_a",s,t,"\\"),t+=e,n=String.fromCharCode(r)}var n,i=0,o="",f;x&&e!=='"'&&
ft("expected_a_b",s,t,'"',e);for(;;){while(i>=u.length)i=0,a()||lt("unclosed",s-1
,r);n=u.charAt(i);if(n===e)return t+=1,u=u.slice(i+1),f=c("(string)",o),f.quote=
e,f;if(n<" "){if(n==="\n"||n==="\r")break;ft("control_a",s,t+i,u.slice(0,i))}else if(
n==="\\"){i+=1,t+=1,n=u.charAt(i);switch(n){case"":ft("unexpected_a",s,t,"\\"),a
(),i=-1;break;case"'":x&&ft("unexpected_a",s,t,"\\'");break;case"u":l(4);break;case"v"
:x&&ft("unexpected_a",s,t,"\\v"),n="";break;case"x":x&&ft("unexpected_a",s,t,"\\x"
),l(2);break;default:typeof h[n]!="string"?ft(n>="0"&&n<="7"?"octal_a":"unexpected_a"
,s,t,"\\"+n):n=h[n]}}o+=n,t+=1,i+=1}}function v(e){var r;return u.charAt(0).isAlpha
()&&ft("expected_space_a_b",s,t,n,u.charAt(0)),n==="0"&&(r=e.charAt(1),r.isDigit
()?X.id!=="."&&ft("unexpected_a",s,t,e):x&&(r==="x"||r==="X")&&ft("unexpected_a"
,s,t,"0x")),e.slice(e.length-1)==="."&&ft("trailing_decimal_a",s,t,e),r=+e,isFinite
(r)||ft("bad_number",s,t,e),e=r,c("(number)",e)}function m(e,n){l?ft("unexpected_comment"
,s,t):!M.todo&&nt.test(e)&&ft("todo_comment",s,t),f.push({id:n,from:r,thru:t,line
:s,string:e})}function g(){var e=0,i,a,f=0,l="",h,p,d,v,m,g;for(;;){i=!0,n=u.charAt
(e),e+=1;switch(n){case"":lt("unclosed_regexp",s,r);return;case"/":f>0&&ft("unescaped_a"
,s,r+e,"/"),n=u.slice(0,e-1),v=Object.create(j);for(;;){p=u.charAt(e);if(v[p]!==!0
)break;v[p]=!1,e+=1,l+=p}return u.charAt(e).isAlpha()&&lt("unexpected_a",s,r,u.charAt
(e)),t+=e,u=u.slice(e),m=u.charAt(0),(m==="/"||m==="*")&&lt("confusing_regexp",s
,r),g=c("(regexp)",n),g.flag=l,g;case"\\":n=u.charAt(e),n<" "?ft("control_a",s,r+
e,String(n)):n==="<"&&ft("unexpected_a",s,r+e,"\\"),e+=1;break;case"(":f+=1,i=!1
;if(u.charAt(e)==="?"){e+=1;switch(u.charAt(e)){case":":case"=":case"!":e+=1;break;
default:ft("expected_a_b",s,r+e,":",u.charAt(e))}}break;case"|":i=!1;break;case")"
:f===0?ft("unescaped_a",s,r+e,")"):f-=1;break;case" ":o=1;while(u.charAt(e)===" "
)e+=1,o+=1;o>1&&ft("use_braces",s,r+e,o);break;case"[":n=u.charAt(e),n==="^"&&(e+=1
,M.regexp?u.charAt(e)==="]"&&lt("unescaped_a",s,r+e,"^"):ft("insecure_a",s,r+e,n
)),a=!1,n==="]"&&(ft("empty_class",s,r+e-1),a=!0);e:do{n=u.charAt(e),e+=1;switch(
n){case"[":case"^":ft("unescaped_a",s,r+e,n),a=!0;break;case"-":a?a=!1:(ft("unescaped_a"
,s,r+e,"-"),a=!0);break;case"]":a||ft("unescaped_a",s,r+e-1,"-");break e;case"\\"
:n=u.charAt(e),n<" "?ft("control_a",s,r+e,String(n)):n==="<"&&ft("unexpected_a",
s,r+e,"\\"),e+=1,a=!0;break;case"/":ft("unescaped_a",s,r+e-1,"/"),a=!0;break;default:
a=!0}}while(n);break;case".":M.regexp||ft("insecure_a",s,r+e,n);break;case"]":case"?"
:case"{":case"}":case"+":case"*":ft("unescaped_a",s,r+e,n)}if(i)switch(u.charAt(
e)){case"?":case"+":case"*":e+=1,u.charAt(e)==="?"&&(e+=1);break;case"{":e+=1,n=
u.charAt(e),(n<"0"||n>"9")&&ft("expected_number_a",s,r+e,n),e+=1,d=+n;for(;;){n=
u.charAt(e);if(n<"0"||n>"9")break;e+=1,d=+n+d*10}h=d;if(n===","){e+=1,h=Infinity
,n=u.charAt(e);if(n>="0"&&n<="9"){e+=1,h=+n;for(;;){n=u.charAt(e);if(n<"0"||n>"9"
)break;e+=1,h=+n+h*10}}}u.charAt(e)!=="}"?ft("expected_a_b",s,r+e,"}",n):e+=1,u.
charAt(e)==="?"&&(e+=1),d>h&&ft("not_greater",s,r+e,d,h)}}return n=u.slice(0,e-1
),t+=e,u=u.slice(e),c("(regexp)",n)}var t,n,r,i,s,o,u;return{init:function(e){typeof
e=="string"?N=e.split(K):N=e,s=0,a(),r=1},token:function(){var e,n,i;for(;;){while(!
u)if(!a())return c("(end)");i=p(rt);if(i){e=i.charAt(0);if(e.isAlpha()||e==="_"||
e==="$")return c("(identifier)",i);if(e.isDigit())return v(i);switch(i){case'"':
case"'":return d(i);case"//":m(u,"//"),u="";break;case"/*":for(;;){n=u.search(Z)
;if(n>=0)break;t=u.length,m(u),r=0,a()||lt("unclosed_comment",s,t)}m(u.slice(0,n
),"/*"),t+=n+2,u.charAt(n)==="/"&&lt("nested_comment",s,t),u=u.slice(n+2);break;
case"":break;case"/":return X.id==="/="&&lt("slash_equal",s,r),D?g():c("(punctuator)"
,i);default:return c("(punctuator)",i)}}}}}}(),d=function(){var t=this.id,n=l,r=
E;l=!0,E=null,O.line===X.line&&O.from===X.thru&&O.warn("missing_space_a_b",ut(X)
,ut()),C.length>0&&this.warn("unexpected_a");switch(t){case"/*properties":case"/*property"
:case"/*members":case"/*member":gt();break;case"/*jslint":mt();break;case"/*globals"
:case"/*global":vt();break;default:this.stop("unexpected_a")}l=n,dt("*/"),E=r},B=
{nud:function(){this.stop("unexpected_a")},led:function(){this.stop("expected_operator_a"
)},warn:function(e,t,n,r,i){this.warning||(this.warning=ft(e,this.line||0,this.from||0
,t||ut(this),n,r,i))},stop:function(e,t,n,r,i){return this.warning=undefined,this
.warn(e,t,n,r,i),at("stopping",this.line,this.character)},lbp:0},function(){var e=
Mt("(identifier)");e.nud=function(){var e=this.string,t=q[e],n;return t?this.master=
t:(n=_[e],typeof n=="boolean"?b[e]=t={dead:!1,"function":y,kind:"var",string:e,writeable
:n}:X.warn("used_before_a")),t&&(t.kind==="label"?this.warn("a_label"):((t.dead===!0||
t.dead===m)&&this.warn("a_scope"),t.used+=1,t.function!==m&&(t.function===y?m.global
.push(e):(t.function.closure.push(e),m.outer.push(e))))),this},e.identifier=!0}(
),It("(array)","array"),It("(function)","function"),It("(number)","number",F),It
("(object)","object"),It("(string)","string",F),It("(boolean)","boolean",F),It("(regexp)"
,"regexp",F),Dt("(begin)"),Dt("(end)"),Dt("(error)"),_t(Mt("}")),Mt(")"),Mt("]")
,_t(Mt('"')),_t(Mt("'")),Mt(";"),Mt(":"),Mt(","),Mt("#"),Mt("@"),Mt("*/"),_t(qt("case"
)),qt("catch"),_t(qt("default")),qt("else"),qt("finally"),Ut("arguments",function(
e){z&&m===y&&e.warn("strict"),m.arguments=!0}),Ut("eval"),Rt("false","boolean"),
Rt("Infinity","number"),Rt("NaN","number"),Rt("null",""),Ut("this",function(e){z&&
m.statement&&m.name.charAt(0)>"Z"&&e.warn("strict")}),Rt("true","boolean"),Rt("undefined"
,""),zt("?",30,function(e,t){bt("?"),t.first=Xt(Wt(e)),t.second=Ot(0),Nt(),wt();
var n=O;return dt(":"),bt(":"),Nt(),t.third=Ot(10),t.arity="ternary",At(t.second
,t.third)?n.warn("weird_ternary"):At(t.first,t.second)&&t.warn("use_or"),wt(),t}
),zt("||",40,function(e,t){function n(e){return e.id==="&&"&&!e.paren&&e.warn("and"
),e}return t.first=n(Xt(Wt(e))),t.second=n(Wt(Ot(40))),At(t.first,t.second)&&t.warn
("weird_condition"),t}),zt("&&",50,function(e,t){return t.first=Xt(Wt(e)),t.second=
Wt(Ot(50)),At(t.first,t.second)&&t.warn("weird_condition"),t}),Ft("void",function(
e){return e.first=Ot(0),e.warn("expected_a_b","undefined","void"),e}),Qt("|",70)
,Qt("^",80),Qt("&",90),$t("==","==="),$t("==="),$t("!=","!=="),$t("!=="),$t("<")
,$t(">"),$t("<="),$t(">="),Qt("<<",120),Qt(">>",120),Qt(">>>",120),zt("in",120,function(
e,t){return t.warn("infix_in"),t.left=e,t.right=Ot(130),t}),zt("instanceof",120)
,zt("+",130,function(e,t){e.id==="(number)"?e.number===0&&e.warn("unexpected_a","0"
):e.id==="(string)"&&e.string===""&&e.warn("expected_a_b","String","''");var n=Ot
(130);n.id==="(number)"?n.number===0&&n.warn("unexpected_a","0"):n.id==="(string)"&&
n.string===""&&n.warn("expected_a_b","String","''");if(e.id===n.id)if(e.id==="(string)"||
e.id==="(number)")return e.id==="(string)"?(e.string+=n.string,Y.test(e.string)&&
e.warn("url")):e.number+=n.number,e.thru=n.thru,e;return t.first=e,t.second=n,t}
),Ft("+"),Ft("+++",function(){return X.warn("confusing_a"),this.first=Ot(150),this
.arity="prefix",this}),zt("+++",130,function(e){return X.warn("confusing_a"),this
.first=e,this.second=Ot(130),this}),zt("-",130,function(e,t){(e.id==="(number)"&&
e.number===0||e.id==="(string)")&&e.warn("unexpected_a");var n=Ot(130);return(n.
id==="(number)"&&n.number===0||n.id==="(string)")&&n.warn("unexpected_a"),e.id===
n.id&&e.id==="(number)"?(e.number-=n.number,e.thru=n.thru,e):(t.first=e,t.second=
n,t)}),Ft("-"),Ft("---",function(){return X.warn("confusing_a"),this.first=Ot(150
),this.arity="prefix",this}),zt("---",130,function(e){return X.warn("confusing_a"
),this.first=e,this.second=Ot(130),this}),zt("*",140,function(e,t){(e.id==="(number)"&&
(e.number===0||e.number===1)||e.id==="(string)")&&e.warn("unexpected_a");var n=Ot
(140);return(n.id==="(number)"&&(n.number===0||n.number===1)||n.id==="(string)")&&
n.warn("unexpected_a"),e.id===n.id&&e.id==="(number)"?(e.number*=n.number,e.thru=
n.thru,e):(t.first=e,t.second=n,t)}),zt("/",140,function(e,t){(e.id==="(number)"&&
e.number===0||e.id==="(string)")&&e.warn("unexpected_a");var n=Ot(140);return(n.
id==="(number)"&&(n.number===0||n.number===1)||n.id==="(string)")&&n.warn("unexpected_a"
),e.id===n.id&&e.id==="(number)"?(e.number/=n.number,e.thru=n.thru,e):(t.first=e
,t.second=n,t)}),zt("%",140,function(e,t){(e.id==="(number)"&&(e.number===0||e.number===1
)||e.id==="(string)")&&e.warn("unexpected_a");var n=Ot(140);return(n.id==="(number)"&&
n.number===0||n.id==="(string)")&&n.warn("unexpected_a"),e.id===n.id&&e.id==="(number)"?
(e.number%=n.number,e.thru=n.thru,e):(t.first=e,t.second=n,t)}),Gt("++"),Ft("++"
),Gt("--"),Ft("--"),Ft("delete",function(e){Et();var t=Ot(0);return(!t||t.id!=="."&&
t.id!=="[")&&O.warn("deleted"),e.first=t,e}),Ft("~",function(e){return Tt(),M.bitwise||
e.warn("unexpected_a"),e.first=Ot(150),e}),Ft("!",sn),Ft("!!",sn),Ft("typeof"),Ft
("new",function(e){Et();var t=Ot(160),n,r,i;e.first=t;if(t.id!=="function")if(t.
identifier)switch(t.string){case"Object":X.warn("use_object");break;case"Array":
if(O.id==="("){r=O,r.first=this,dt("(");if(O.id!==")"){n=Ot(0),r.second=[n],(n.id==="(string)"||
O.id===",")&&r.warn("use_array");while(O.id===",")dt(","),r.second.push(Ot(0))}else X
.warn("use_array");return dt(")",r),r}X.warn("use_array");break;case"Number":case"String"
:case"Boolean":case"Math":case"JSON":t.warn("not_a_constructor");break;case"Function"
:M.evil||O.warn("function_eval");break;case"Date":case"RegExp":case"this":break;
default:t.id!=="function"&&(i=t.string.charAt(0),!M.newcap&&(i<"A"||i>"Z")&&X.warn
("constructor_name_a"))}else t.id!=="."&&t.id!=="["&&t.id!=="("&&X.warn("bad_constructor"
);else e.warn("weird_new");return O.id!=="("&&O.warn("missing_a","()"),e}),zt("("
,160,function(e,t){var n,r;E&&E.mode==="expression"?xt(P,X):Tt(P,X),!e.immed&&e.
id==="function"&&O.warn("wrap_immediate"),r=[],e.identifier?e.string.match(/^[A-Z]([A-Z0-9_$]*[a-z][A-Za-z0-9_$]*)?$/
)?e.string!=="Number"&&e.string!=="String"&&e.string!=="Boolean"&&e.string!=="Date"&&
(e.string==="Math"?e.warn("not_a_function"):e.string==="Object"?X.warn("use_object"
):(e.string==="Array"||!M.newcap)&&e.warn("missing_a","new")):e.string==="JSON"&&
e.warn("not_a_function"):e.id==="."&&e.second.string==="split"&&e.first.id==="(string)"&&
e.second.warn("use_array"),bt();if(O.id!==")"){xt();for(;;){yt(),n=Ot(10),e.string==="Boolean"&&
(n.id==="!"||n.id==="~")&&n.warn("weird_condition"),r.push(n);if(O.id!==",")break;
Ct()}}return xt(),wt(")",t),typeof e=="object"&&(e.string==="parseInt"&&r.length===1?
e.warn("radix"):e.string==="String"&&r.length>=1&&r[0].id==="(string)"&&e.warn("unexpected_a"
),M.evil||(e.string==="eval"||e.string==="Function"||e.string==="execScript"?e.warn
("evil"):r[0]&&r[0].id==="(string)"&&(e.string==="setTimeout"||e.string==="setInterval"
)&&e.warn("implied_evil")),!e.identifier&&e.id!=="."&&e.id!=="["&&e.id!=="("&&e.
id!=="&&"&&e.id!=="||"&&e.id!=="?"&&e.warn("bad_invocation"),e.id==="."&&(r.length>0&&
e.first&&e.first.first&&At(r[0],e.first.first)&&(e.second.string==="call"||e.second
.string==="apply"&&(r.length===1||r[1].arity==="prefix"&&r[1].id==="["))&&e.second
.warn("unexpected_a"),e.second.string==="toString"&&(e.first.id==="(string)"||e.
first.id==="(number)")&&e.second.warn("unexpected_a"))),t.first=e,t.second=r,t},!0
),Ft("(",function(e){bt("expression"),xt(),yt(),O.id==="function"&&(O.immed=!0);
var t=Ot(0);t.paren=!0,xt(),wt(")",e);if(t.id==="function")switch(O.id){case"(":
O.warn("move_invocation");break;case".":case"[":O.warn("unexpected_a");break;default:
e.warn("bad_wrap")}else t.arity||(!M.closure||!e.comments)&&e.warn("unexpected_a"
);return t}),zt(".",170,function(e,t){xt(P,X),xt();var n=Zt();return typeof n=="string"&&
rn(n),t.first=e,t.second=X,!e||e.string!=="arguments"||n!=="callee"&&n!=="caller"?!
M.evil&&e&&e.string==="document"&&(n==="write"||n==="writeln")?e.warn("write_is_wrong"
):!M.stupid&&tt.test(n)?X.warn("sync_a"):e&&e.id==="{"&&t.warn("unexpected_a"):e
.warn("avoid_a","arguments."+n),!M.evil&&(n==="eval"||n==="execScript")&&O.warn("evil"
),t},!0),zt("[",170,function(e,t){var n,r;Tt(P,X),xt(),bt(),yt(),n=Ot(0);switch(
n.id){case"(number)":n.id==="(number)"&&e.id==="arguments"&&e.warn("use_param");
break;case"(string)":!!M.evil||n.string!=="eval"&&n.string!=="execScript"?!M.sub&&
G.test(n.string)&&(r=W[n.string],(!r||!r.reserved)&&n.warn("subscript")):n.warn("evil"
),rn(n.string)}return e&&(e.id==="{"||e.id==="["&&e.arity==="prefix")&&t.warn("unexpected_a"
),wt("]",t),xt(P,X),t.first=e,t.second=n,t},!0),Ft("[",function(e){e.first=[],bt
("array");while(O.id!=="(end)"){while(O.id===",")O.warn("unexpected_a"),dt(",");
if(O.id==="]")break;E.wrap=!1,yt(),e.first.push(Ot(10));if(O.id!==",")break;Ct()
;if(O.id==="]"){X.warn("unexpected_a");break}}return wt("]",e),e},170),Kt("="),Kt
("+=","+"),Kt("-=","-"),Kt("*=","*"),Kt("/=","/").nud=function(){O.stop("slash_equal"
)},Kt("%=","%"),Kt("&=","&"),Kt("|=","|"),Kt("^=","^"),Kt("<<=","<<"),Kt(">>=",">>"
),Kt(">>>=",">>>"),Ft("{",function(e){var t,n,r,i,s,o=Object.create(null);e.first=
[],bt();while(O.id!=="}"){E.wrap=!1,yt(),O.string==="get"&&pt().id!==":"?(t=O,dt
("get"),St(),i=O,n=on(),n||O.stop("missing_property"),t.string="",an(t),m.loopage&&
t.warn("function_loop"),t.function.parameter.length&&t.warn("parameter_a_get_b",
t.function.parameter[0],n),Ct(),s=O,Nt(),yt(),dt("set"),s.string="",St(),r=on(),
n!==r&&X.stop("expected_a_b",n,r||O.string),an(s),s.block.length===0&&X.warn("missing_a"
,"throw"),s.function.parameter.length===0?s.stop("parameter_set_a","value"):s.function.
parameter[0]!=="value"&&s.stop("expected_a_b","value",s.function.parameter[0]),i
.first=[t,s]):(i=O,n=on(),typeof n!="string"&&O.stop("missing_property"),dt(":")
,Nt(),i.first=Ot(10)),e.first.push(i),o[n]===!0&&O.warn("duplicate_a",n),o[n]=!0
,rn(n);if(O.id!==",")break;for(;;){Ct();if(O.id!==",")break;O.warn("unexpected_a"
)}O.id==="}"&&X.warn("unexpected_a")}return wt("}",e),e}),Ht("{",function(){return O
.warn("statement_block"),this.arity="statement",this.block=tn(),this.disrupt=this
.block.disrupt,dt("}",this),this}),Ht("/*global",d),Ht("/*globals",d),Ht("/*jslint"
,d),Ht("/*member",d),Ht("/*members",d),Ht("/*property",d),Ht("/*properties",d),Ht
("var",function(){var e,t,n;m.loopage?O.warn("var_loop"):m.varstatement&&!M.vars&&
O.warn("combine_var"),m!==y&&(m.varstatement=!0),this.arity="statement",this.first=
[],bt("var");for(;;){n=O,t=Zt(!0),ht("var",n),n.dead=m,O.id==="="?(m===y&&!n.writeable&&
n.warn("read_only"),e=O,e.first=n,Nt(),dt("="),Nt(),O.id==="undefined"&&X.warn("unnecessary_initialize"
,t),pt(0).id==="="&&O.identifier&&O.stop("var_a_not"),e.second=Ot(0),e.arity="infix"
,n.init=!0,this.first.push(e)):this.first.push(n),n.dead=!1,n.writeable=!0;if(O.
id!==",")break;Ct(),E.wrap=!1,$&&O.line===X.line&&this.first.length===1&&($=null
,E.open=!1,E.at-=M.indent),Nt(),yt()}return $=null,wt(),this}),Ht("function",function(
){Et(),w&&X.warn("function_block");var e=O,t=Zt(!0);return ht("var",e),e.writeable||
e.warn("read_only"),e.init=!0,e.statement=!0,xt(),this.arity="statement",an(this
,t),O.id==="("&&O.line===X.line&&O.stop("function_statement"),this}),Ft("function"
,function(e){var t=Yt(!0),n;t?(n=X,xt()):(t="",Et()),an(e,t),n&&(n.function=e.function)
,m.loopage&&e.warn("function_loop");switch(O.id){case";":case"(":case")":case","
:case"]":case"}":case":":case"(end)":break;case".":(pt().string!=="bind"||pt(1).
id!=="(")&&O.warn("unexpected_a");break;default:O.stop("unexpected_a")}return e.
arity="function",e}),Ht("if",function(){var e=O;return Et(),dt("("),bt("control"
),xt(),yt(),this.arity="statement",this.first=Xt(Wt(Ot(0))),xt(),wt(")",e),Et(),
this.block=nn("if"),O.id==="else"&&(this.block.disrupt&&O.warn(this.elif?"use_nested_if"
:"unnecessary_else"),Et(),dt("else"),Et(),O.id==="if"?(O.elif=!0,this.else=en(!0
)):this.else=nn("else"),this.else.disrupt&&this.block.disrupt&&(this.disrupt=!0)
),this}),Ht("try",function(){var e,t;return Et(),this.arity="statement",this.block=
nn("try"),O.id==="catch"&&(Et(),dt("catch"),Et(),t=O,dt("("),bt("control"),xt(),
yt(),e=O,this.first=Zt(),ht("exception",e),e.init=!0,xt(),wt(")",t),Et(),this.second=
nn("catch"),this.second.length?this.first==="ignore"&&e.warn("unexpected_a"):this
.first!=="ignore"&&e.warn("expected_a_b","ignore",e.string),e.dead=!0),O.id==="finally"?
(Et(),dt("finally"),Et(),this.third=nn("finally")):this.second||O.stop("expected_a_b"
,"catch",ut()),this}),jt("while",function(){Et();var e=O;return m.loopage+=1,dt("("
),bt("control"),xt(),yt(),this.arity="statement",this.first=Wt(Ot(0)),this.first
.id!=="true"&&Xt(this.first,"unexpected_a"),xt(),wt(")",e),Et(),this.block=nn("while"
),this.block.disrupt&&P.warn("strange_loop"),m.loopage-=1,this}),qt("with"),jt("switch"
,function(){function s(e){At(n,e)&&e.warn("duplicate_a")}var e=[],t=w,n,r=X,i=O;
Et(),dt("("),xt(),bt(),this.arity="statement",this.first=Xt(Wt(Ot(0))),xt(),wt(")"
,i),Et(),dt("{"),bt(),w=!0,this.second=[],r.from!==O.from&&!M.white&&O.warn("expected_a_at_b_c"
,O.string,r.from,O.from);while(O.id==="case"){i=O,i.first=[],i.arity="case";for(
;;){Nt(),yt("case"),dt("case"),Et(),n=Ot(0),e.forEach(s),e.push(n),i.first.push(
n),n.id==="NaN"&&n.warn("unexpected_a"),Tt(),dt(":");if(O.id!=="case")break}Nt()
,i.second=tn(),i.second&&i.second.length>0?i.second[i.second.length-1].disrupt||
O.warn("missing_a_after_b","break","case"):O.warn("empty_case"),this.second.push
(i)}return this.second.length===0&&O.warn("missing_a","case"),O.id==="default"&&
(Nt(),i=O,i.arity="case",yt("case"),dt("default"),Tt(),dt(":"),Nt(),i.second=tn(
),i.second&&i.second.length>0?this.disrupt=i.second[i.second.length-1].disrupt:i
.warn("empty_case"),this.second.push(i)),this.break&&(this.disrupt=!1),Nt(),wt("}"
,this),w=t,this}),Ht("debugger",function(){return M.debug||this.warn("unexpected_a"
),this.arity="statement",this}),jt("do",function(){m.loopage+=1,Et(),this.arity="statement"
,this.block=nn("do"),this.block.disrupt&&P.warn("strange_loop"),Et(),dt("while")
;var e=O;return Et(),dt("("),bt(),xt(),yt(),this.first=Xt(Wt(Ot(0)),"unexpected_a"
),xt(),wt(")",e),m.loopage-=1,this}),jt("for",function(){var e,t,n,r=!1,i=O,s;this
.arity="statement",m.loopage+=1,dt("(");if(O.id===";")xt(),dt(";"),xt(),dt(";"),
xt(),dt(")"),e=nn("for");else{bt("control"),Nt(this,i),xt(),O.id==="var"&&O.stop
("move_var"),yt();if(pt(0).id==="in"){this.forin=!0,s=Ot(1e3),n=s.master,n||s.stop
("bad_in_a"),(n.kind!=="var"||n.function!==m||!n.writeable||n.dead)&&s.warn("bad_in_a"
),n.init=!0,n.used-=1,this.first=s,dt("in"),this.second=Ot(20),wt(")",i),e=nn("for"
);if(!M.forin){if(e.length===1&&typeof e[0]=="object")if(e[0].id==="if"&&!e[0].else)
{t=e[0].first;while(t.id==="&&")t=t.first;switch(t.id){case"===":case"!==":r=t.first
.id==="["?At(t.first.first,this.second)&&At(t.first.second,this.first):t.first.id==="typeof"&&
t.first.first.id==="["&&At(t.first.first.first,this.second)&&At(t.first.first.second
,this.first);break;case"(":r=t.first.id==="."&&(At(t.first.first,this.second)&&t
.first.second.string==="hasOwnProperty"&&At(t.second[0],this.first)||t.first.first
.id==="."&&t.first.first.first.first&&t.first.first.first.first.string==="Object"&&
t.first.first.first.id==="."&&t.first.first.first.second.string==="prototype"&&t
.first.first.second.string==="hasOwnProperty"&&t.first.second.string==="call"&&At
(t.second[0],this.second)&&At(t.second[1],this.first))}}else e[0].id==="switch"&&
(r=e[0].id==="switch"&&e[0].first.id==="typeof"&&e[0].first.first.id==="["&&At(e
[0].first.first.first,this.second)&&At(e[0].first.first.second,this.first));r||this
.warn("for_if")}}else{yt(),this.first=[];for(;;){this.first.push(Ot(0,"for"));if(
O.id!==",")break;Ct()}kt(),yt(),this.second=Wt(Ot(0)),this.second.id!=="true"&&Xt
(this.second,"unexpected_a"),kt(X),O.id===";"&&O.stop("expected_a_b",")",";"),this
.third=[],yt();for(;;){this.third.push(Ot(0,"for"));if(O.id!==",")break;Ct()}xt(
),wt(")",i),Et(),e=nn("for")}}return e.disrupt&&P.warn("strange_loop"),this.block=
e,m.loopage-=1,this}),Bt("break",function(){return fn(this)}),Bt("continue",function(
){return fn(this)}),Bt("return",function(){return m===y&&this.warn("unexpected_a"
),this.arity="statement",O.id!==";"&&O.line===X.line&&(M.closure?Nt():St(),(O.id==="/"||
O.id==="(regexp)")&&O.warn("wrap_regexp"),this.first=Ot(0),this.first.assign&&this
.first.warn("unexpected_a")),this}),Bt("throw",function(){return this.arity="statement"
,St(),this.first=Ot(20),this}),qt("class"),qt("const"),qt("enum"),qt("export"),qt
("extends"),qt("import"),qt("super"),qt("implements"),qt("interface"),qt("let"),
qt("package"),qt("private"),qt("protected"),qt("public"),qt("static"),qt("yield"
),S=function(t,n){var r,o,u;S.errors=[],S.tree="",S.properties="",i=P=X=O=Object
.create(W["(begin)"]),V=[],_=Object.create(null),st(U),H=Object.create(null);if(
n){M=Object.create(n),o=M.predef;if(o)if(Array.isArray(o))for(r=0;r<o.length;r+=1
)_[o[r]]=!0;else typeof o=="object"&&st(o)}else M=Object.create(null);M.indent=+
M.indent||4,M.maxerr=+M.maxerr||50,b=q=Object.create(null),y=m={scope:q,loopage:0
,level:0},g=[m],s=[],f=[],l=!1,w=!1,E=null,x=!1,C=[],L=!1,D=!0,z=!1,$=null,J=0,T
.init(t),ot();try{dt();if(O.id==="(number)")O.stop("unexpected_a");else switch(O
.id){case"{":case"[":l=!0,x=!0,ln();break;default:bt(1),O.id===";"&&!L&&(O.edge=!0
,dt(";")),u=tn(),i.first=u,S.tree=i,u.disrupt&&P.warn("weird_program")}E=null,dt
("(end)"),S.property=H}catch(a){a&&S.errors.push({reason:a.message,line:a.line||
O.line,character:a.character||O.from},null)}return S.errors.length===0},S.data=function(
){function s(e){var n=i[e].kind;switch(n){case"var":case"exception":case"label":
t[n].push(e)}}var e={functions:[]},t,n,r,i;e.errors=S.errors,e.json=x,e.global=cn
(Object.keys(b));for(n=1;n<g.length;n+=1)r=g[n],t={name:r.name,line:r.line,level
:r.level,parameter:r.parameter,"var":[],exception:[],closure:cn(r.closure),outer
:cn(r.outer),global:cn(r.global),label:[]},i=r.scope,Object.keys(i).forEach(s),t
.var.sort(),t.exception.sort(),t.label.sort(),e.functions.push(t);return e.tokens=
V,e},S.error_report=function(e){var t,n,r=[],i;if(e.errors.length){e.json&&r.push
("<cite>JSON: bad.</cite><br>");for(n=0;n<e.errors.length;n+=1)i=e.errors[n],i&&
(t=i.evidence||"",r.push("<cite>"),isFinite(i.line)&&r.push("<address>line "+String
(i.line)+" character "+String(i.character)+"</address>"),r.push(i.reason.entityify
()+"</cite>"),t&&r.push("<pre>"+t.entityify()+"</pre>"))}return r.join("")},S.report=
function(e){function u(e,t){var n=!1;t.length&&(s.push("<dt>"+e+"</dt><dd>"),t.forEach
(function(e){s.push((n?", ":"")+e),n=!0}),s.push("</dd>"))}var t,n,r,i,s=[],o;s.
push("<dl class=level0>"),e.global.length?(u("global",e.global),t=!0):e.json?e.errors
.length||s.push("<dt>JSON: good.</dt>"):s.push("<dt><i>No new global variables introduced.</i></dt>"
),t?s.push("</dl>"):s[0]="";if(e.functions)for(n=0;n<e.functions.length;n+=1){o=
e.functions[n],i=[];if(o.params)for(r=0;r<o.params.length;r+=1)i[r]=o.params[r].
string;s.push("<dl class=level"+o.level+"><address>line "+String(o.line)+"</address>"+
o.name.entityify()),u("parameter",o.parameter),u("variable",o.var),u("exception"
,o.exception),u("closure",o.closure),u("outer",o.outer),u("global",o.global),u("label"
,o.label),s.push("</dl>")}return s.join("")},S.properties_report=function(e){if(!
e)return"";var t,n,r=Object.keys(e).sort(),i="   ",s,o=!1,u=["/*properties"];for(
t=0;t<r.length;t+=1)n=r[t],e[n]>0&&(o&&(i+=","),s=G.test(n)?n:"'"+n.replace(et,it
)+"'",i.length+s.length>=80?(u.push(i),i="    "):i+=" ",i+=s,o=!0);return u.push
(i,"*/\n"),u.join("\n")},S.color=function(e){var t,n=1,r,i,s=[],o,u=e.tokens[0];
while(u&&u.id!=="(end)"){t=u.from,i=u.line,o=u.thru,r=u.function.level;do o=u.thru
,u=e.tokens[n],n+=1;while(u&&u.line===i&&u.from-o<5&&r===u.function.level);s.push
({line:i,level:r,from:t,thru:o})}return s},S.jslint=S,S.edition="2014-07-08",S}(
)



/* istanbul ignore next */
// init lib jslintEs6
// https://github.com/douglascrockford/JSLint/blob/4075c9955e6eefdfafc1a6d9c1183e6147cd73f1/jslint.js
// utility2-uglifyjs https://raw.githubusercontent.com/douglascrockford/JSLint/4075c9955e6eefdfafc1a6d9c1183e6147cd73f1/jslint.js
var jslint=function(){"use strict";function t(){return Object.create(null)}function n
(e,t,n){t.forEach(function(t){e[t]=n})}function D(e){return e>="a"&&e<="z\uffff"||
e>="A"&&e<="Z\uffff"}function P(e,t){return e.replace(l,function(e,n){var r=t[n]
;return r!==undefined?r:e})}function lt(e){return e===undefined&&(e=G),e.id==="(string)"||
e.id==="(number)"?String(e.value):e.id}function ct(e){return e===undefined&&(e=G
),e.line+W}function ht(e){return e===undefined&&(e=G),e.from+W}function pt(e,t,n
,r,i,s,o){var u={name:"JSLintError",column:n,line:t,code:e};return r!==undefined&&
(u.a=r),i!==undefined&&(u.b=i),s!==undefined&&(u.c=s),o!==undefined&&(u.d=o),u.message=
P(f[e]||e,u),ft.push(u),typeof Y.maxerr=="number"&&ft.length===Y.maxerr?dt("too_many"
,t,n):u}function dt(e,t,n,r,i,s,o){throw pt(e,t,n,r,i,s,o)}function vt(e,t,n,r,i
,s){t===undefined&&(t=G);if(t.warning===undefined)return t.warning=pt(e,t.line,t
.from,n||lt(t),r,i,s),t.warning}function mt(e,t,n,r,i,s){throw t===undefined&&(t=
G),delete t.warning,vt(e,t,n,r,i,s)}function gt(e){function M(){var e;return s=0
,a+=1,O=K[a],O!==undefined&&(e=O.search(w),e>=0&&(Y.white||pt("use_spaces",a,e+1
),O=O.replace(w," ")),e=O.search(h),e>=0&&pt("unsafe",a,s+e,"U+"+O.charCodeAt(e)
.toString(16)),Y.maxlen&&Y.maxlen<O.length?pt("too_long",a,O.length):!Y.white&&O
.slice(-1)===" "&&pt("unexpected_trailing_space",a,O.length-1)),O}function _(){A=
A.slice(0,-1)}function P(e){return e!==undefined&&i!==e?dt(i===""?"expected_a":"expected_a_b"
,a,s-1,e,i):(O?(i=O.charAt(0),O=O.slice(1),A+=i):(i="",A+=" "),s+=1,i)}function H
(){return A?(i=A.slice(-1),O=i+O,s-=1,_()):i="",i}function B(e,t){var n=O.match(
e);return n?(i=n[1],s+=i.length,O=n[2],A+=i):(i="",t||pt("expected_digits_after_a"
,a,s,A)),i.length}function j(e){switch(P("\\")){case"\\":case"/":case"b":case"f"
:case"n":case"r":case"t":break;case"u":if(P("u")==="{"){J&&pt("unexpected_a",a,s-1
,i),B(N)>5&&pt("too_many_digits",a,s-1),Y.es6||pt("es6",a,s,"u{"),P()!=="}"&&dt("expected_a_before_b"
,a,s,"}",i),P();return}H(),B(N,!0)<4&&pt("expected_four_digits",a,s-1);break;case""
:return dt("unclosed_string",a,s);default:(!e||e.indexOf(i)<0)&&pt("unexpected_a_before_b"
,a,s-2,"\\",i)}P()}function R(e,t,n){var r={from:u,id:e,identifier:!!n,line:a,nr
:f,thru:s};return st[f]=r,f+=1,e!=="(comment)"&&e!==";"&&(q=!1),t!==undefined&&(
r.value=t),l.line===a&&l.thru===u&&(e==="(comment)"||e==="(regexp)"||e==="/")&&(
l.id==="(comment)"||l.id==="(regexp)")&&vt("expected_space_a_b",r,lt(l),lt(r)),l
.id==="."&&e==="(number)"&&vt("expected_a_before_b",l,"0","."),p.id==="."&&r.identifier&&
(r.dot=!0),l=r,l.id!=="(comment)"&&(p=l),r}function U(e,i){var s=i.match(S);if(s
){var o,u=s[1],a=s[2];switch(e.directive){case"jslint":o=r[u];switch(typeof o){case"boolean"
:case"object":switch(a){case"true":case"":case undefined:Y[u]=!0,Array.isArray(o
)&&n(F,o,!1);break;case"false":Y[u]=!1;break;default:vt("bad_option_a",e,u+":"+a
)}break;case"number":isFinite(+a)?Y[u]=+a:vt("bad_option_a",e,u+":"+a);break;default:
vt("bad_option_a",e,u)}break;case"property":ot===undefined&&(ot=t()),ot[u]=!0;break;
case"global":a&&vt("bad_option_a",e,u+":"+a),F[u]=!1,Q=e}return U(e,s[3])}if(i)return mt
("bad_directive_a",e,i)}function z(e){var t=R("(comment)",e);Array.isArray(e)&&(
e=e.join(" ")),!Y.devel&&b.test(e)&&vt("todo_comment",t);var n=e.match(E);return n&&
(q?(t.directive=n[1],U(t,n[2])):pt("misplaced_directive_a",a,u,n[1]),I.push(t)),
t}function W(){function o(){switch(i){case"?":case"*":case"+":P();break;case"{":
B(T,!0)===0&&pt("expected_a",a,s,"0"),P()===","&&(B(T,!0),P()),P("}");break;default:
return}i==="?"&&P("?")}function f(){switch(i){case"\\":return j("BbDdSsWw-[]^"),!0
;case"[":case"]":case"/":case"^":case"-":case"":return!1;case"`":return et&&pt("unexpected_a"
,a,s,"`"),P(),!0;case" ":return pt("expected_a_before_b",a,s,"\\"," "),P(),!0;default:
return P(),!0}}function l(){if(f()){if(i==="-"){P("-");if(!f())return dt("unexpected_a"
,a,s-1,"-")}return l()}}function c(){P("["),i==="^"&&P("^"),function e(){l();if(
i!=="]"&&i!=="")return pt("expected_a_before_b",a,s,"\\",i),P(),e()}(),P("]")}function h
(){function t(){P("(");if(i==="?"){P("?");switch(i){case":":case"=":case"!":P();
break;default:P(":")}}else i===":"&&pt("expected_a_before_b",a,s,"?",":");h(),P(")"
)}function n(){switch(i){case"[":return c(),!0;case"\\":return j("BbDdSsWw^${}[]():=!.-|*+?"
),!0;case"(":return t(),!0;case"/":case"|":case"]":case")":case"}":case"{":case"?"
:case"+":case"*":case"":return!1;case"`":et&&pt("unexpected_a",a,s-1,"`");break;
case" ":pt("expected_a_b",a,s-1,"\\s"," ");break;case"$":O.charAt(0)!=="/"&&(e=!0
);break;case"^":A!=="^"&&(e=!0)}return P(),!0}function r(e){if(n())return o(),r(!0
);e||pt("expected_regexp_factor_a",a,s,i)}r();if(i==="|")return P("|"),h()}var e=!1
,n,r;A="",P(),i==="="&&pt("expected_a_before_b",a,s,"\\","="),h(),_(),r=A,P("/")
;var p={g:!0,i:!0,m:!0,u:6,y:6},d=t();return function v(){if(D(i)){switch(p[i]){
case!0:break;case 6:Y.es6||pt("es6",a,s,i);break;default:pt("unexpected_a",a,s,i
)}return p[i]=!1,d[i]=!0,P(),v()}}(),H(),i==="/"||i==="*"?dt("unexpected_a",a,u,
i):(n=R("(regexp)",i),n.flag=d,n.value=r,e&&!d.m&&pt("missing_m",a,s),n)}function X
(e){var t;return A="",P(),function n(){switch(i){case e:return _(),t=R("(string)"
,A),t.quote=e,t;case"\\":j(e);break;case"":return dt("unclosed_string",a,s);case"`"
:et&&pt("unexpected_a",a,s,"`"),P("`");break;default:P()}return n()}()}function V
(){i==="."&&(B(T),P());if(i==="E"||i==="e")P(),i!=="+"&&i!=="-"&&H(),B(T),P()}function G
(){if(A==="0")switch(P()){case".":V();break;case"b":B(k),P();break;case"o":B(C),
P();break;case"x":B(N),P()}else P(),V();return i>="0"&&i<="9"||i>="a"&&i<="z"||i>="A"&&
i<="Z"?dt("unexpected_a_after_b",a,s-1,A.slice(-1),A.slice(0,-1)):(H(),R("(number)"
,A))}function Z(){var e,t=0,n=0,r,i,o;if(!O)return O=M(),u=0,O===undefined?et?dt
("unclosed_mega",v,d):R("(end)"):Z();u=s,i=O.match(x);if(!i)return dt("unexpected_char_a"
,a,s,O.charAt(0));A=i[1],s+=A.length,O=i[5];if(i[2])return Z();if(i[3])return R(
A,undefined,!0);if(i[4])return G(A);switch(A){case'"':return X(A);case"'":return Y
.single||pt("use_double",a,s),X(A);case"`":if(et)return dt("expected_a_b",a,s,"}"
,"`");return A="",d=u,v=a,et=!0,R("`"),u+=1,function f(){var e=O.search(L);if(e<0
)return A+=O+"\n",M()===undefined?dt("unclosed_mega",v,d):f();A+=O.slice(0,e),s+=
e,O=O.slice(e),O.charAt(0)==="\\"&&dt("escape_mega",a,e),R("(string)",A).quote="`"
,A="";if(O.charAt(0)==="$")return s+=2,R("${"),O=O.slice(2),function t(){var e=Z
().id;if(e==="{")return dt("expected_a_b",a,s,"}","{");if(e!=="}")return t()}(),
f()}(),O=O.slice(1),s+=1,et=!1,R("`");case"//":return A=O,O="",o=z(A),et&&vt("unexpected_comment"
,o,"`"),o;case"/*":return e=[],O.charAt(0)==="/"&&pt("unexpected_a",a,s+t,"/"),function l
(){if(O>""){t=O.search(m);if(t>=0)return;n=O.search(g),n>=0&&pt("nested_comment"
,a,s+n)}return e.push(O),O=M(),O===undefined?dt("unclosed_comment",a,s):l()}(),A=
O.slice(0,t),n=A.search(y),n>=0&&pt("nested_comment",a,s+n),e.push(A),s+=t+2,O=O
.slice(t+2),z(e);case"/":if(p.identifier){if(!p.dot)switch(p.id){case"return":return W
();case"(begin)":case"case":case"delete":case"in":case"instanceof":case"new":case"typeof"
:case"void":case"yield":return o=W(),mt("unexpected_a",o)}}else{r=p.id.charAt(p.
id.length-1);if("(,=:?[".indexOf(r)>=0)return W();if("!&|{};~+-*%/^<>".indexOf(r
)>=0)return o=W(),vt("wrap_regexp",o),o}O.charAt(0)==="/"&&(s+=1,O=O.slice(1),A="/="
,pt("unexpected_a",a,s,"/="))}return R(A)}K=Array.isArray(e)?e:e.split(c),st=[];
var i,s=0,o,u,a=-1,f=0,l=$,p=$,d,v,A,O;o=Z(),J=o.id==="{"||o.id==="[";for(;;)if(
Z().id==="(end)")break}function yt(e){var t=e.id;if(t==="(string)"){t=e.value;if(!
p.test(t))return t}else if(t==="`"){if(e.value.length===1){t=e.value[0].value;if(!
p.test(t))return t}}else if(!e.identifier)return mt("expected_identifier_a",e);return typeof
Z[t]=="number"?Z[t]+=1:(ot!==undefined?ot[t]!==!0&&vt("unregistered_property_a",
e):e.identifier&&v.test(t)&&vt("bad_property_a",e),Z[t]=1),t}function bt(){var e=
st[it];return it+=1,e.id==="(comment)"?(J&&vt("unexpected_a",e),bt()):e}function wt
(){var e=it,t=bt(!0);return it=e,t}function Et(e,t){rt.identifier&&rt.id!=="function"?
H=rt.id:rt.id==="(string)"&&p.test(rt.value)&&(H=rt.value);if(e!==undefined&&G.id!==
e)return t===undefined?mt("expected_a_b",G,e,lt()):mt("expected_a_b_from_c_d",G,
e,lt(t),ct(t),lt(G));rt=G,G=bt(),G.id==="(end)"&&(it-=1)}function St(){function n
(){var e=G,n=t(),r=[];return e.expression=r,Et("{"),G.id!=="}"&&function i(){var e
,t;G.quote!=='"'&&vt("unexpected_a",G,G.quote),e=G,Et("(string)"),n[rt.value]!==
undefined?vt("duplicate_a",rt):rt.value==="__proto__"?vt("bad_property_a",rt):n[
rt.value]=rt,Et(":"),t=St(),t.label=e,r.push(t);if(G.id===",")return Et(","),i()
}(),Et("}",e),e}function r(){var e=G,t=[];return e.expression=t,Et("["),G.id!=="]"&&
function n(){t.push(St());if(G.id===",")return Et(","),n()}(),Et("]",e),e}var e;
switch(G.id){case"{":return n();case"[":return r();case"true":case"false":case"null"
:return Et(),rt;case"(number)":return M.test(G.value)||vt("unexpected_a"),Et(),rt
;case"(string)":return G.quote!=='"'&&vt("unexpected_a",G,G.quote),Et(),rt;case"-"
:return e=G,e.arity="unary",Et("-"),Et("(number)"),e.expression=rt,e;default:mt("unexpected_a"
)}}function xt(e,t,n){var r=e.id;if(nt[r]!==undefined&&r!=="ignore")vt("reserved_a"
,e);else{var i=X.context[r];i?vt("redefinition_a_b",e,e.id,i.line+W):(tt.forEach
(function(e){var t=e.context[r];t!==undefined&&(i=t)}),i&&(r==="ignore"?i.role==="variable"&&
vt("unexpected_a",e):(t!=="exception"||i.role!=="exception")&&t!=="parameter"&&vt
("redefinition_a_b",e,e.id,i.line+W)),X.context[r]=e,e.dead=!0,e.function=X,e.init=!1
,e.role=t,e.used=0,e.writable=!n)}}function Tt(e,t){var n,r;t||Et(),r=nt[rt.id];
if(r!==undefined&&r.nud!==undefined)n=r.nud();else{if(!rt.identifier)return mt("unexpected_a"
,rt);n=rt,n.arity="variable"}return function i(){r=nt[G.id];if(r!==undefined&&r.
led!==undefined&&e<r.lbp)return Et(),n=r.led(n),i()}(),n}function Nt(){var e=G,t
;e.free=!0,Et("("),t=Tt(0),Et(")"),t.wrapped===!0&&vt("unexpected_a",e);switch(t
.id){case"?":case"~":case"&":case"|":case"^":case"<<":case">>":case">>>":case"+"
:case"-":case"*":case"/":case"%":case"typeof":case"(number)":case"(string)":vt("unexpected_a"
,t)}return t}function Ct(e){return e.id==="(regexp)"||e.id==="{"||e.id==="=>"||e
.id==="function"||e.id==="["&&e.arity==="unary"}function kt(e,t){if(e===t)return!0
;if(Array.isArray(e))return Array.isArray(t)&&e.length===t.length&&e.every(function(
e,n){return kt(e,t[n])});if(Array.isArray(t))return!1;if(e.id==="(number)"&&t.id==="(number)"
)return e.value===t.value;var n,r;e.id==="(string)"?n=e.value:e.id==="`"&&e.constant&&
(n=e.value[0]),t.id==="(string)"?r=t.value:t.id==="`"&&t.constant&&(r=t.value[0]
);if(typeof n=="string")return n===r;if(Ct(e)||Ct(t))return!1;if(e.arity===t.arity&&
e.id===t.id){if(e.id===".")return kt(e.expression,t.expression)&&kt(e.name,t.name
);switch(e.arity){case"unary":return kt(e.expression,t.expression);case"binary":
return e.id!=="("&&kt(e.expression[0],t.expression[0])&&kt(e.expression[1],t.expression
[1]);case"ternary":return kt(e.expression[0],t.expression[0])&&kt(e.expression[1
],t.expression[1])&&kt(e.expression[2],t.expression[2]);case"function":case"regexp"
:return!1;default:return!0}}return!1}function Lt(){G.id===";"?Et(";"):pt("expected_a_b"
,rt.line,rt.thru,";",lt(G)),H="anonymous"}function At(){var e,t,n,r;Et();if(rt.identifier&&
G.id===":"){t=rt,t.id==="ignore"&&vt("unexpected_a",t),Et(":");switch(G.id){case"do"
:case"for":case"switch":case"while":return xt(t,"label",!0),t.init=!0,t.dead=!1,
n=At(),n.label=t,n.statement=!0,n;default:Et(),vt("unexpected_label_a",t)}}return e=
rt,e.statement=!0,r=nt[e.id],r!==undefined&&r.fud!==undefined?(r.disrupt=!1,r.statement=!0
,n=r.fud()):(n=Tt(0,!0),n.wrapped&&n.id!=="("&&vt("unexpected_a",e),Lt()),t!==undefined&&
(t.dead=!0),n}function Ot(){var e=[];return function t(n){var r;switch(G.id){case"}"
:case"case":case"default":case"else":case"(end)":break;default:return r=At(),e.push
(r),n&&vt("unreachable_a",r),t(r.disrupt)}}(!1),e}function Mt(e){X===$&&vt("unexpected_at_top_level_a"
,e)}function _t(e){B!==$&&vt("misplaced_a",e)}function Dt(e){var t,n;return e!=="naked"&&
Et("{"),n=rt,n.arity="statement",n.body=e==="body",e==="body"&&tt.length===1&&G.
value==="use strict"&&(n.strict=G,G.statement=!0,Et("(string)"),Et(";")),t=Ot(),
n.block=t,t.length===0?(!Y.devel&&e!=="ignore"&&vt("empty_block",n),n.disrupt=!1
):n.disrupt=t[t.length-1].disrupt,Et("}"),n}function Pt(e){return e.id==="."||e.
arity==="variable"||e.id==="["&&e.arity==="binary"?!0:(vt("bad_assignment_a",e),!1
)}function Ht(e,t){var n=e.id;return!e.identifier&&(e.arity!=="binary"||n!=="."&&
n!=="("&&n!=="[")?(vt("unexpected_a",t),!1):!0}function Bt(e,n){var r=nt[e];return r===
undefined&&(r=t(),r.id=e,r.lbp=n||0,nt[e]=r),r}function jt(e){var t=Bt(e,20);return t
.led=function(t){var n=rt,r;n.arity="assignment",r=Tt(19),e==="="&&t.arity==="variable"?
(n.names=t,n.expression=r):n.expression=[t,r];switch(r.arity){case"assignment":case"pre"
:case"post":vt("unexpected_a",r)}return!Y.es6||t.arity!=="unary"||t.id!=="["&&t.
id!=="{"?Pt(t):vt("expected_a_before_b",t,"const",t.id),n},t}function Ft(e,t,n){
var r=Bt(e);return r.constant=!0,r.nud=typeof n=="function"?n:function(){return rt
.constant=!0,n!==undefined&&(rt.value=n),rt},r.type=t,r.value=n,r}function It(e,
t,n){var r=Bt(e,t);return r.led=function(e){var r=rt;return r.arity="binary",n!==
undefined?n(e):(r.expression=[e,Tt(t)],r)},r}function qt(e){var t=Bt(e,150);return t
.led=function(e){return rt.expression=e,rt.arity="post",Pt(rt.expression),rt},t}
function Rt(e){var t=Bt(e);return t.nud=function(){var e=rt;return e.arity="pre"
,e.expression=Tt(150),Pt(e.expression),e},t}function Ut(e,t){var n=Bt(e);return n
.nud=function(){var e=rt;return e.arity="unary",typeof t=="function"?t():(e.expression=
Tt(150),e)},n}function zt(e,t){var n=Bt(e);return n.fud=function(){return rt.arity="statement"
,t()},n}function Wt(e,t){var n=Bt(e,30);return n.led=function(e){var n=rt,r=Tt(20
);return Et(t),rt.arity="ternary",n.arity="ternary",n.expression=[e,r,Tt(10)],n}
,n}function Xt(){var e=rt;return Y.es6||vt("es6",e),e.value=[],e.expression=[],G
.id!=="`"&&function t(){Et("(string)"),e.value.push(rt);if(G.id==="${")return Et
("${"),e.expression.push(Tt(0)),Et("}"),t()}(),Et("`"),e}function Vt(){var e=!1,
t=[],n=["("];return G.id!==")"&&G.id!=="(end)"&&function r(){var i=!1,s;if(G.id==="{"
){e=!0,Y.es6||vt("es6"),s=G,s.names=[],Et("{"),n.push("{"),function o(){var e=G;
if(!e.identifier)return mt("expected_identifier_a");yt(e),Et(),n.push(e.id);if(G
.id===":"){Et(":"),Et(),rt.label=e,e=rt;if(!e.identifier)return mt("expected_identifier_a"
)}s.names.push(e);if(G.id===",")return Et(","),n.push(", "),o()}(),t.push(s),Et("}"
),n.push("}");if(G.id===",")return Et(","),n.push(", "),r()}else if(G.id==="["){
e=!0,Y.es6||vt("es6"),s=G,s.names=[],Et("["),n.push("[]"),function u(){var e=G;if(!
e.identifier)return mt("expected_identifier_a");Et(),s.names.push(e);if(G.id===","
)return Et(","),u()}(),t.push(s),Et("]");if(G.id===",")return Et(","),n.push(", "
),r()}else{G.id==="..."&&(e=!0,Y.es6||vt("es6"),i=!0,n.push("..."),Et("..."));if(!
G.identifier)return mt("expected_identifier_a");s=G,t.push(s),Et(),n.push(s.id);
if(i)s.ellipsis=!0;else{G.id==="="&&(e=!0,Y.es6||mt("unexpected_statement_a"),Et
("="),s.expression=Tt(0));if(G.id===",")return Et(","),n.push(", "),r()}}}(),Et(")"
),n.push(")"),[t,n.join(""),e]}function $t(e){var n;if(e===undefined){e=rt;if(e.
arity==="statement"){if(!G.identifier)return mt("expected_identifier_a",G);n=G,xt
(n,"variable",!0),e.name=n,n.init=!0,n.calls=t(),Et()}else n===undefined&&(G.identifier?
(n=G,e.name=n,Et()):e.name=H)}else n=e.name;e.level=X.level+1,et&&vt("unexpected_a"
,e),X.loop>0&&vt("function_in_loop",e),e.context=t(),e.finally=0,e.loop=0,e.switch=0
,e.try=0,tt.push(X),V.push(e),X=e,e.arity!=="statement"&&typeof n=="object"&&(xt
(n,"function",!0),n.dead=!1,n.init=!0,n.used=1),Et("("),rt.free=!1,rt.arity="function"
;var r=Vt();return X.parameters=r[0],X.signature=r[1],X.complex=r[2],X.parameters
.forEach(function i(e){e.identifier?xt(e,"parameter",!1):e.names.forEach(i)}),e.
block=Dt("body"),e.arity==="statement"&&G.line===rt.line?mt("unexpected_a",G):((
G.id==="."||G.id==="[")&&vt("unexpected_a"),X=tt.pop(),e)}function Jt(e){G.id===";"&&
mt("wrap_assignment",rt),Et("=>");var n=rt;return n.arity="binary",n.name="=>",n
.level=X.level+1,V.push(n),X.loop>0&&vt("function_in_loop",n),n.context=t(),n.finally=0
,n.loop=0,n.switch=0,n.try=0,tt.push(X),X=n,n.parameters=e[0],n.signature=e[1],n
.complex=!0,n.parameters.forEach(function(e){xt(e,"parameter",!0)}),Y.es6||vt("es6"
,n),G.id==="{"?(vt("expected_a_b",n,"function","=>"),n.block=Dt("body")):n.expression=
Tt(0),X=tt.pop(),n}function Kt(){var e=rt,t=e.id==="const";return e.names=[],t?Y
.es6||vt("es6",e):at===undefined?(at=e.id,!Y.es6&&at!=="var"&&vt("es6",e)):e.id!==
at&&vt("expected_a_b",e,at,e.id),X.switch>0&&vt("var_switch",e),X.loop>0&&e.id==="var"&&
vt("var_loop",e),function n(){if(G.id==="{"&&e.id!=="var"){var r=G;r.names=[],Et
("{"),function o(){if(!G.identifier)return mt("expected_identifier_a",G);var e=G
;yt(e),Et();if(G.id===":"){Et(":");if(!G.identifier)return mt("expected_identifier_a"
,G);G.label=e,r.names.push(G),xt(G,"variable",t),Et()}else r.names.push(e),xt(e,"variable"
,t);if(G.id===",")return Et(","),o()}(),Et("}"),Et("="),r.expression=Tt(0),e.names
.push(r)}else if(G.id==="["&&e.id!=="var"){var i=G;i.names=[],Et("["),function u
(){var t;G.id==="..."&&(t=!0,Et("..."));if(!G.identifier)return mt("expected_identifier_a"
,G);var n=G;Et(),i.names.push(n),xt(n,"variable",e.id==="const");if(t)n.ellipsis=!0
;else if(G.id===",")return Et(","),u()}(),Et("]"),Et("="),i.expression=Tt(0),e.names
.push(i)}else{if(!G.identifier)return mt("expected_identifier_a",G);var s=G;Et()
,s.id==="ignore"&&vt("unexpected_a",s),xt(s,"variable",t);if(G.id==="="||t)Et("="
),s.expression=Tt(0),s.init=!0;e.names.push(s)}if(G.id===",")return Y.multivar||
vt("expected_a_b",G,";",","),Et(","),n()}(),e.open=e.names.length>1&&e.line!==e.
names[1].line,Lt(),e}function Qt(e){return function(n,r,i){var s=e[n],o;typeof r!="string"&&
(i=r,r="(all)"),s===undefined&&(s=t(),e[n]=s),o=s[r],o===undefined&&(o=[],s[r]=o
),o.push(i)}}function Gt(e){return function(t){var n=e[t.arity],r;n!==undefined&&
(r=n[t.id],r!==undefined&&r.forEach(function(e){return e(t)}),r=n["(all)"],r!==undefined&&
r.forEach(function(e){return e(t)}))}}function sn(e){if(e)if(Array.isArray(e))e.
forEach(sn);else{nn(e),sn(e.expression),e.id==="function"&&on(e.block);switch(e.
arity){case"post":case"pre":vt("unexpected_a",e);break;case"statement":case"assignment"
:vt("unexpected_statement_a",e)}rn(e)}}function on(e){if(e)if(Array.isArray(e))e
.forEach(on);else{nn(e),sn(e.expression);switch(e.arity){case"statement":case"assignment"
:break;case"binary":e.id!=="("&&vt("unexpected_expression_a",e);break;default:vt
(e.id==="(string)"&&e.value==="use strict"?"unexpected_a":"unexpected_expression_a"
,e)}on(e.block),on(e.else),rn(e)}}function un(e){if(e.arity==="variable"){var t=
X.context[e.id];if(t===undefined){tt.forEach(function(n){var r=n.context[e.id];r!==
undefined&&r.role!=="label"&&(t=r)});if(t===undefined){if(F[e.id]===undefined){vt
("undeclared_a",e);return}t={dead:!1,"function":$,id:e.id,init:!0,role:"variable"
,used:0,writable:!1},$.context[e.id]=t}t.closure=!0,X.context[e.id]=t}else t.role==="label"&&
vt("label_a",e);return t.dead&&vt("out_of_scope_a",e),t}}function an(e){e.init=!0
,e.dead=!1,B.live.push(e)}function fn(e){e.arity==="statement"&&B.body!==!0&&vt("unexpected_a"
,e),e.level===1&&(Q===!0||$.strict!==undefined||e.complex?e.id!=="=>"&&e.block.strict!==
undefined&&vt("unexpected_a",e.block.strict):e.block.strict===undefined&&vt("use_strict"
,e)),tt.push(X),j.push(B),X=e,B=e,e.live=[],typeof e.name=="object"&&(e.name.dead=!1
,e.name.init=!0);switch(e.extra){case"get":e.parameters.length!==0&&vt("bad_get"
,e);break;case"set":e.parameters.length!==1&&vt("bad_set",e)}e.parameters.forEach
(function(e){sn(e.expression),e.id==="{"||e.id==="["?e.names.forEach(an):(e.dead=!1
,e.init=!0)})}function ln(e){!Y.bitwise&&s[e.id]===!0&&vt("unexpected_a",e),e.id!=="("&&
e.id!=="&&"&&e.id!=="||"&&e.id!=="="&&Array.isArray(e.expression)&&e.expression.
length===2&&(u[e.expression[0].id]===!0||u[e.expression[1].id]===!0)&&vt("unexpected_a"
,e)}function cn(){B.live.forEach(function(e){e.dead=!0}),delete B.live,B=j.pop()
}function hn(e){e.expression!==undefined&&(sn(e.expression),e.id==="{"||e.id==="["?
e.names.forEach(an):e.init=!0),e.dead=!1,B.live.push(e)}function pn(e){e.names.forEach
(hn)}function dn(e){var t=un(e);if(t!==undefined&&t.writable){t.init=!0;return}vt
("bad_assignment_a",e)}function vn(e){return delete X.finally,delete X.loop,delete
X.switch,delete X.try,X=tt.pop(),e.wrapped&&vt("unexpected_parens",e),cn()}function mn
(e){Object.keys(e.context).forEach(function(t){if(t!=="ignore"){var n=e.context[
t];n.function===e&&(n.used!==0||n.role==="function"&&n.function.arity==="unary"?
n.init||vt("uninitialized_a",n):vt("unused_a",n))}})}function gn(){(Q===!0||Y.node
)&&mn($),V.forEach(mn)}function yn(){function c(e){vt("expected_a_at_b_c",l,lt(l
),W+e,ht(l))}function h(e){var t=r+e;if(l.from!==t)return c(t)}function p(){n.id!=="(global)"&&
n.nr+1===l.nr&&(n.line!==l.line||n.thru!==l.from)&&vt("unexpected_space_a_b",l,lt
(n),lt(l))}function d(){if(n.line===l.line)n.thru!==l.from&&s===0&&vt("unexpected_space_a_b"
,l,lt(n),lt(l));else if(u){var e=t?r:r+8;l.from<e&&c(e)}else l.from!==r+8&&c(r+8
)}function v(){(n.line!==l.line||n.thru+1!==l.from)&&vt("expected_space_a_b",l,lt
(n),lt(l))}function m(){n.line===l.line?n.thru+1!==l.from&&s===0&&vt("expected_space_a_b"
,l,lt(n),lt(l)):t?l.from<r&&c(r):l.from!==r+8&&c(r+8)}function g(){var e=a.length
;e>0&&(r-=e*4),a=""}var e="(end)",t=!1,n=$,r=0,s=0,u=!0,a="",f,l;tt=[],st.forEach
(function(y){l=y;if(l.id==="(comment)"||l.id==="(end)")s+=1;else{var b=o[n.id];if(typeof
b=="string")b!==l.id?(tt.push({closer:e,free:t,margin:r,open:u,qmark:a}),a="",e=
b,n.line!==l.line?(t=e===")"&&n.free,u=!0,r+=4,l.role==="label"?l.from!==0&&c(0)
:l.switch?(g(),h(-4)):h(0)):((l.statement||l.role==="label")&&vt("expected_line_break_a_b"
,l,lt(n),lt(l)),t=!1,u=!1,p())):n.line===l.line?d():h(0);else if(l.id===e){var w=
tt.pop();r=w.margin,u&&l.id!==";"?h(0):p(),e=w.closer,t=w.free,u=w.open,a=w.qmark
}else l.switch?(g(),h(-4)):l.role==="label"?l.from!==0&&c(0):n.id===","?(g(),!u||
(t||e==="]")&&n.line===l.line?m():h(0)):l.arity==="ternary"?(l.id==="?"?(r+=4,a+="?"
):(f=a.match(A),a=f[1]+":",r-=4*f[2].length),h(0)):l.arity==="binary"&&l.id==="("&&
t?d():n.id==="."||n.id==="..."||l.id===","||l.id===";"||l.id===":"||l.arity==="binary"&&
(l.id==="("||l.id==="[")||l.arity==="function"&&n.id!=="function"?p():l.id==="."?
n.line===l.line?d():(O.test(a)||(a+=".",r+=4),h(0)):n.id===";"?(g(),u?h(0):m()):
n.arity==="ternary"||n.id==="case"||n.id==="catch"||n.id==="else"||n.id==="finally"||
n.id==="while"||l.id==="catch"||l.id==="else"||l.id==="finally"||l.id==="while"&&!
l.statement||n.id===")"&&l.id==="{"?v():l.statement===!0?u?h(0):m():n.id==="var"||
n.id==="const"||n.id==="let"?(tt.push({closer:e,free:t,margin:r,open:u,qmark:a})
,e=";",t=!1,u=n.open,a="",u?(r+=4,h(0)):v()):i[n.id]===!0||i[l.id]===!0||n.arity==="binary"&&
(n.id==="+"||n.id==="-")||l.arity==="binary"&&(l.id==="+"||l.id==="-")||n.id==="function"||
n.id===":"||(n.identifier||n.id==="(string)"||n.id==="(number)")&&(l.identifier||
l.id==="(string)"||l.id==="(number)")||n.arity==="statement"&&l.id!==";"?m():n.arity==="unary"&&
n.id!=="`"&&p();s=0,delete n.calls,delete n.dead,delete n.free,delete n.init,delete
n.open,delete n.used,n=l}})}var r={bitwise:!0,browser:["Audio","clearInterval","clearTimeout"
,"document","event","FormData","history","Image","localStorage","location","name"
,"navigator","Option","screen","sessionStorage","setInterval","setTimeout","Storage"
,"XMLHttpRequest"],couch:["emit","getRow","isArray","log","provides","registerType"
,"require","send","start","sum","toJSON"],devel:["alert","confirm","console","prompt"
],es6:["ArrayBuffer","DataView","Float32Array","Float64Array","Generator","GeneratorFunction"
,"Int8Array","Int16Array","Int32Array","Intl","Map","Promise","Proxy","Reflect","Set"
,"Symbol","System","Uint8Array","Uint8ClampedArray","Uint16Array","Uint32Array","WeakMap"
,"WeakSet"],eval:!0,"for":!0,fudge:!0,maxerr:1e4,maxlen:1e4,multivar:!0,node:["Buffer"
,"clearImmediate","clearInterval","clearTimeout","console","exports","global","module"
,"process","querystring","require","setImmediate","setInterval","setTimeout","__dirname"
,"__filename"],single:!0,"this":!0,white:!0},i={"!=":!0,"!==":!0,"%":!0,"%=":!0,"&"
:!0,"&=":!0,"&&":!0,"*":!0,"*=":!0,"+=":!0,"-=":!0,"/":!0,"/=":!0,"<":!0,"<=":!0
,"<<":!0,"<<=":!0,"=":!0,"==":!0,"===":!0,"=>":!0,">":!0,">=":!0,">>":!0,">>=":!0
,">>>":!0,">>>=":!0,"^":!0,"^=":!0,"|":!0,"|=":!0,"||":!0},s={"~":!0,"^":!0,"^="
:!0,"&":!0,"&=":!0,"|":!0,"|=":!0,"<<":!0,"<<=":!0,">>":!0,">>=":!0,">>>":!0,">>>="
:!0},o={"(":")","[":"]","{":"}","${":"}"},u={"!=":!0,"!==":!0,"==":!0,"===":!0,"<"
:!0,"<=":!0,">":!0,">=":!0},a=["Array","Boolean","Date","decodeURI","decodeURIComponent"
,"encodeURI","encodeURIComponent","Error","EvalError","isFinite","JSON","Math","Number"
,"Object","parseInt","parseFloat","RangeError","ReferenceError","RegExp","String"
,"SyntaxError","TypeError","URIError"],f={and:"The '&&' subexpression should be wrapped in parens."
,bad_assignment_a:"Bad assignment to '{a}'.",bad_directive_a:"Bad directive '{a}'."
,bad_get:"A get function takes no parameters.",bad_module_name_a:"Bad module name '{a}'."
,bad_option_a:"Bad option '{a}'.",bad_property_a:"Bad property name '{a}'.",bad_set
:"A set function takes one parameter.",duplicate_a:"Duplicate '{a}'.",empty_block
:"Empty block.",es6:"Unexpected ES6 feature '{a}'.",escape_mega:"Unexpected escapement in mega literal."
,expected_a:"Expected '{a}'.",expected_a_at_b_c:"Expected '{a}' at column {b}, not column {c}."
,expected_a_b:"Expected '{a}' and instead saw '{b}'.",expected_a_b_from_c_d:"Expected '{a}' to match '{b}' from line {c} and instead saw '{d}'."
,expected_a_before_b:"Expected '{a}' before '{b}'.",expected_digits_after_a:"Expected digits after '{a}'."
,expected_four_digits:"Expected four digits after '\\u'.",expected_identifier_a:"Expected an identifier and instead saw '{a}'."
,expected_line_break_a_b:"Expected a line break between '{a}' and '{b}'.",expected_regexp_factor_a
:"Expected a regexp factor and instead saw '{a}'.",expected_space_a_b:"Expected one space between '{a}' and '{b}'."
,expected_statements_a:"Expected statements before '{a}'.",expected_string_a:"Expected a string and instead saw '{a}'."
,expected_type_string_a:"Expected a type string and instead saw '{a}'.",function_in_loop
:"Don't make functions within a loop.",infix_in:"Unexpected 'in'. Compare with undefined, or use the hasOwnProperty method instead."
,isNaN:"Use the isNaN function to compare with NaN.",label_a:"'{a}' is a statement label."
,misplaced_a:"Place '{a}' at the outermost level.",misplaced_directive_a:"Place the '/*{a}*/' directive before the first statement."
,missing_browser:"/*global*/ requires the Assume a browser option.",missing_m:"Expected 'm' flag on a multiline regular expression."
,naked_block:"Naked block.",nested_comment:"Nested comment.",not_label_a:"'{a}' is not a label."
,number_isNaN:"Use Number.isNaN function to compare with NaN.",out_of_scope_a:"'{a}' is out of scope."
,redefinition_a_b:"Redefinition of '{a}' from line {b}.",reserved_a:"Reserved name '{a}'."
,subscript_a:"['{a}'] is better written in dot notation.",todo_comment:"Unexpected TODO comment."
,too_long:"Line too long.",too_many:"Too many warnings.",too_many_digits:"Too many digits."
,unclosed_comment:"Unclosed comment.",unclosed_mega:"Unclosed mega literal.",unclosed_string
:"Unclosed string.",undeclared_a:"Undeclared '{a}'.",unexpected_a:"Unexpected '{a}'."
,unexpected_a_after_b:"Unexpected '{a}' after '{b}'.",unexpected_a_before_b:"Unexpected '{a}' before '{b}'."
,unexpected_at_top_level_a:"Expected '{a}' to be in a function.",unexpected_char_a
:"Unexpected character '{a}'.",unexpected_comment:"Unexpected comment.",unexpected_directive_a
:"When using modules, don't use directive '/*{a}'.",unexpected_expression_a:"Unexpected expression '{a}' in statement position."
,unexpected_label_a:"Unexpected label '{a}'.",unexpected_parens:"Don't wrap function literals in parens."
,unexpected_space_a_b:"Unexpected space between '{a}' and '{b}'.",unexpected_statement_a
:"Unexpected statement '{a}' in expression position.",unexpected_trailing_space:"Unexpected trailing space."
,unexpected_typeof_a:"Unexpected 'typeof'. Use '===' to compare directly with {a}."
,uninitialized_a:"Uninitialized '{a}'.",unreachable_a:"Unreachable '{a}'.",unregistered_property_a
:"Unregistered property name '{a}'.",unsafe:"Unsafe character '{a}'.",unused_a:"Unused '{a}'."
,use_double:"Use double quotes, not single quotes.",use_spaces:"Use spaces, not tabs."
,use_strict:'This function needs a "use strict" pragma.',var_loop:"Don't declare variables in a loop."
,var_switch:"Don't declare variables in a switch.",weird_condition_a:"Weird condition '{a}'."
,weird_expression_a:"Weird expression '{a}'.",weird_loop:"Weird loop.",weird_relation_a
:"Weird relation '{a}'.",wrap_assignment:"Don't wrap assignment statements in parens."
,wrap_condition:"Wrap the condition in parens.",wrap_immediate:"Wrap an immediate function invocation in parentheses to assist the reader in understanding that the expression is the result of a function, and not the function itself."
,wrap_parameter:"Wrap the parameter in parens.",wrap_regexp:"Wrap this regexp in parens to avoid confusion."
,wrap_unary:"Wrap the unary expression in parens."},l=/\{([^{}]*)\}/g,c=/\n|\r\n?/
,h=/[\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/
,p=/^([a-zA-Z_$][a-zA-Z0-9_$]*)$/,d=/^[a-zA-Z0-9_$:.@\-\/]+$/,v=/Sync\$/
,m=/\*\//,g=/\/\*/,y=/\/\*|\/$/,b=/\b(?:todo|TO\s?DO|HACK)\b/,w=/\t/g,E=/^(jslint|property|global)\s+(.*)$/
,S=/^([a-zA-Z$_][a-zA-Z0-9$_]*)\s*(?::\s*(true|false|[0-9]+)\s*)?(?:,\s*)?(.*)$/
,x=/^((\s+)|([a-zA-Z_$][a-zA-Z0-9_$]*)|[(){}\[\]?,:;'"~`]|=(?:==?|>)?|\.+|\/[=*\/]?|\*[\/=]?|\+(?:=|\++)?|-(?:=|-+)?|[\^%]=?|&[&=]?|\|[|=]?|>{1,3}=?|<<?=?|!={0,2}|(0|[1-9][0-9]*))(.*)$/
,T=/^([0-9]+)(.*)$/,N=/^([0-9a-fA-F]+)(.*)$/,C=/^([0-7]+)(.*)$/,k=/^([01]+)(.*)$/
,L=/[`\\]|\$\{/,A=/^(.*)\?([:.]*)$/,O=/\.$/,M=/^-?\d+(?:\.\d*)?(?:e[\-+]?\d+)?$/i
,_=/^[A-Z]/,H="anonymous",B,j,F,I,q,R,U,z,W,X,V,$,J,K,Q,G,Y,Z,et,tt,nt,rt,it,st,
ot,ut,at,ft;nt=t(),Bt("}"),Bt(")"),Bt("]"),Bt(","),Bt(";"),Bt(":"),Bt("*/"),Bt("await"
),Bt("case"),Bt("catch"),Bt("class"),Bt("default"),Bt("else"),Bt("enum"),Bt("finally"
),Bt("implements"),Bt("interface"),Bt("package"),Bt("private"),Bt("protected"),Bt
("public"),Bt("static"),Bt("super"),Bt("void"),Bt("yield"),Ft("(number)","number"
),Ft("(regexp)","regexp"),Ft("(string)","string"),Ft("arguments","object",function(
){return Y.es6&&vt("unexpected_a",rt),rt}),Ft("eval","function",function(){return Y
.eval?G.id!=="("&&vt("expected_a_before_b",G,"(",lt()):vt("unexpected_a",rt),rt}
),Ft("false","boolean",!1),Ft("Function","function",function(){return Y.eval?G.id!=="("&&
vt("expected_a_before_b",G,"(",lt()):vt("unexpected_a",rt),rt}),Ft("ignore","undefined"
,function(){return vt("unexpected_a",rt),rt}),Ft("Infinity","number",Infinity),Ft
("isNaN","function",function(){return Y.es6&&vt("expected_a_b",rt,"Number.isNaN"
,"isNaN"),rt}),Ft("NaN","number",NaN),Ft("null","null",null),Ft("this","object",
function(){return Y.this||vt("unexpected_a",rt),rt}),Ft("true","boolean",!0),Ft("undefined"
,"undefined"),jt("="),jt("+="),jt("-="),jt("*="),jt("/="),jt("%="),jt("&="),jt("|="
),jt("^="),jt("<<="),jt(">>="),jt(">>>="),It("||",40),It("&&",50),It("|",70),It("^"
,80),It("&",90),It("==",100),It("===",100),It("!=",100),It("!==",100),It("<",110
),It(">",110),It("<=",110),It(">=",110),It("in",110),It("instanceof",110),It("<<"
,120),It(">>",120),It(">>>",120),It("+",130),It("-",130),It("*",140),It("/",140)
,It("%",140),It("(",160,function(e){var t=rt,n;return e.id!=="function"&&Ht(e,t)
,X.arity==="statement"&&e.identifier&&(X.name.calls[e.id]=e),t.expression=[e],G.
id!==")"&&function r(){var e;G.id==="..."&&(Y.es6||vt("es6"),e=!0,Et("...")),n=Tt
(10),e&&(n.ellipsis=!0),t.expression.push(n);if(G.id===",")return Et(","),r()}()
,Et(")",t),t.expression.length===2?(t.free=!0,n.wrapped===!0&&vt("unexpected_a",
t),n.id==="("&&(n.wrapped=!0)):t.free=!1,t}),It(".",170,function(e){var t=rt,n=G
;return(e.id!=="(string)"||n.id!=="indexOf")&&(e.id!=="["||n.id!=="concat"&&n.id!=="forEach"
)&&(e.id!=="+"||n.id!=="slice")&&(e.id!=="(regexp)"||n.id!=="exec"&&n.id!=="test"
)&&Ht(e,t),n.identifier||mt("expected_identifier_a"),Et(),yt(n),t.name=n,t.expression=
e,t}),It("[",170,function(e){var t=rt,n=Tt(0);if(n.id==="(string)"||n.id==="`"){
var r=yt(n);p.test(r)&&vt("subscript_a",n,r)}return Ht(e,t),t.expression=[e,n],Et
("]"),t}),It("=>",170,function(e){return mt("wrap_parameter",e)}),It("`",160,function(
e){var t=Xt();return Ht(e,t),t.expression=[e].concat(t.expression),t}),qt("++"),
qt("--"),Rt("++"),Rt("--"),Ut("+"),Ut("-"),Ut("~"),Ut("!"),Ut("!!"),Ut("[",function(
){var e=rt;return e.expression=[],G.id!=="]"&&function t(){var n,r=!1;G.id==="..."&&
(r=!0,Y.es6||vt("es6"),Et("...")),n=Tt(10),r&&(n.ellipsis=!0),e.expression.push(
n);if(G.id===",")return Et(","),t()}(),Et("]"),e}),Ut("/=",function(){mt("expected_a_b"
,rt,"/\\=","/=")}),Ut("=>",function(){return mt("expected_a_before_b",rt,"()","=>"
)}),Ut("new",function(){var e=rt,t=Tt(160);return G.id!=="("&&vt("expected_a_before_b"
,G,"()",lt(G)),e.expression=t,e}),Ut("typeof"),Ut("void",function(){var e=rt;return vt
("unexpected_a",e),e.expression=Tt(0),e}),Ut("function",$t),Ut("(",function(){var e=
rt,t,n=wt().id;if(G.id===")"||G.id==="..."||G.identifier&&(n===","||n==="="))return e
.free=!1,Jt(Vt());e.free=!0,t=Tt(0),t.wrapped===!0&&vt("unexpected_a",e),t.wrapped=!0
,Et(")",e);if(G.id==="=>")return t.arity!=="variable"?t.id==="{"||t.id==="["?(vt
("expected_a_before_b",e,"function","("),mt("expected_a_b",G,"{","=>")):mt("expected_identifier_a"
,t):(e.expression=[t],Jt([e.expression,"("+t.id+")"]));return t}),Ut("`",Xt),Ut("{"
,function(){var e=rt,n=t();return e.expression=[],G.id!=="}"&&function r(){var t
,i,s=G,o;Et(),s.id!=="get"&&s.id!=="set"||!G.identifier?(i=yt(s),typeof n[i]=="boolean"&&
vt("duplicate_a",s),n[i]=!0):(t=s.id+" "+G.id,s=G,Et(),i=yt(s),(n[t]===!0||n[i]===!0
)&&vt("duplicate_a",s),n[i]=!1,n[t]=!0);if(s.identifier){switch(G.id){case"}":case","
:Y.es6||vt("es6"),typeof t=="string"&&Et("("),o=Tt(Infinity,!0);break;case"(":!Y
.es6&&typeof t!="string"&&vt("es6"),o=$t({arity:"unary",from:s.from,id:"function"
,line:s.line,name:typeof t=="string"?t:i,thru:s.from});break;default:typeof t=="string"&&
Et("("),Et(":"),o=Tt(0)}o.label=s,typeof t=="string"&&(o.extra=t),e.expression.push
(o)}else Et(":"),o=Tt(0),o.label=s,e.expression.push(o);if(G.id===",")return Et(","
),r()}(),Et("}"),e}),zt(";",function(){return vt("unexpected_a",rt),rt}),zt("{",
function(){return vt("naked_block",rt),Dt("naked")}),zt("break",function(){var e=
rt,t;return(X.loop<1&&X.switch<1||X.finally>0)&&vt("unexpected_a",e),e.disrupt=!0
,G.identifier&&rt.line===G.line&&(t=X.context[G.id],t===undefined||t.role!=="label"||
t.dead?vt(t!==undefined&&t.dead?"out_of_scope_a":"not_label_a"):t.used+=1,e.label=
G,Et()),Et(";"),e}),zt("const",Kt),zt("continue",function(){var e=rt;return(X.loop<1||
X.finally>0)&&vt("unexpected_a",e),Mt(e),e.disrupt=!0,vt("unexpected_a",e),Et(";"
),e}),zt("debugger",function(){var e=rt;return Y.devel||vt("unexpected_a",e),Lt(
),e}),zt("delete",function(){var e=rt,t=Tt(0);return(t.id!=="."&&t.id!=="["||t.arity!=="binary"
)&&mt("expected_a_b",t,".",lt(t)),e.expression=t,Lt(),e}),zt("do",function(){var e=
rt;return Mt(e),X.loop+=1,e.block=Dt(),Et("while"),e.expression=Nt(),Lt(),e.block
.disrupt===!0&&vt("weird_loop",e),X.loop-=1,e}),zt("export",function(){function i
(){G.identifier||mt("expected_identifier_a"),t=G.id,n=$.context[t],n===undefined?
vt("unexpected_a"):(n.used+=1,U[t]!==undefined&&vt("duplicate_a"),U[t]=n),Et(),e
.expression.push(r)}var e=rt,t,n,r;Y.es6||vt("es6",e),e.expression=[];if(G.id==="default"
)U.default!==undefined&&vt("duplicate_a"),Et("default"),r=Tt(),r.id!=="function"&&
Lt(),U.default=r,e.expression.push(r);else switch(G.id){case"function":r=At(),n=
r.name,t=n.id,n.used+=1,U[t]!==undefined&&vt("duplicate_a",n),U[t]=r,e.expression
.push(r),r.statement=!1,r.arity="unary";break;case"var":case"let":case"const":vt
("unexpeted_a");break;case"{":Et("{"),function s(){i();if(G.id===",")return Et(","
),s()}(),Et("}"),Lt();break;default:i(),Lt()}return Q=!0,e}),zt("for",function()
{var e,t=rt;return Y.for||vt("unexpected_a",t),Mt(t),X.loop+=1,Et("("),rt.free=!0
,G.id===";"?mt("expected_a_b",t,"while (","for (;"):G.id==="var"||G.id==="let"||
G.id==="const"?mt("unexpected_a"):(e=Tt(0),e.id==="in"?(e.expression[0].arity!=="variable"&&
vt("bad_assignment_a",e.expression[0]),t.name=e.expression[0],t.expression=e.expression
[1],vt("expected_a_b",t,"Object.keys","for in")):(t.initial=e,Et(";"),t.expression=
Tt(0),Et(";"),t.inc=Tt(0),t.inc.id==="++"&&vt("expected_a_b",t.inc,"+= 1","++"))
,Et(")"),t.block=Dt(),t.block.disrupt===!0&&vt("weird_loop",t),X.loop-=1,t)}),zt
("function",$t),zt("if",function(){var e,t=rt;return t.expression=Nt(),t.block=Dt
(),G.id==="else"&&(Et("else"),e=rt,t.else=G.id==="if"?At():Dt(),t.block.disrupt===!0&&
(t.else.disrupt===!0?t.disrupt=!0:vt("unexpected_a",e))),t}),zt("import",function(
){var e=rt,t;Y.es6?typeof Q=="object"&&vt("unexpected_directive_a",Q,Q.directive
):vt("es6",e),Q=!0;if(G.identifier)t=G,Et(),t.id==="ignore"&&vt("unexpected_a",t
),xt(t,"variable",!0),e.name=t;else{var n=[];Et("{");if(G.id!=="}")for(;;){G.identifier||
mt("expected_identifier_a"),t=G,Et(),t.id==="ignore"&&vt("unexpected_a",t),xt(t,"variable"
,!0),n.push(t);if(G.id!==",")break;Et(",")}Et("}"),e.name=n}return Et("from"),Et
("(string)"),e.import=rt,d.test(rt.value)||vt("bad_module_name_a",rt),z.push(rt.
value),Lt(),e}),zt("let",Kt),zt("return",function(){var e=rt;return Mt(e),X.finally>0&&
vt("unexpected_a",e),e.disrupt=!0,G.id!==";"&&e.line===G.line&&(e.expression=Tt(10
)),Et(";"),e}),zt("switch",function(){var e=[],t,n,r=[],i=!0,s=rt;Mt(s),X.finally>0&&
vt("unexpected_a",s),X.switch+=1,Et("("),rt.free=!0,s.expression=Tt(0),s.block=r
,Et(")"),Et("{"),function a(){var s=G;s.arity="statement",s.expression=[],function o
(){Et("case"),rt.switch=!0;var t=Tt(0);e.some(function(e){return kt(e,t)})&&vt("unexpected_a"
,t),e.push(t),s.expression.push(t),Et(":");if(G.id==="case")return o()}(),n=Ot()
;if(n.length<1){vt("expected_statements_a");return}s.block=n,r.push(s),t=n[n.length-1
],t.disrupt?t.id==="break"&&t.label===undefined&&(i=!1):vt("expected_a_before_b"
,G,"break;",lt(G));if(G.id==="case")return a()}(),e=undefined;if(G.id==="default"
){var o=G;Et("default"),rt.switch=!0,Et(":"),s.else=Ot();if(s.else.length<1)vt("unexpected_a"
,o),i=!1;else{var u=s.else[s.else.length-1];u.id==="break"&&u.label===undefined&&
(vt("unexpected_a",u),u.disrupt=!1),i=i&&u.disrupt}}else i=!1;return Et("}",s),X
.switch-=1,s.disrupt=i,s}),zt("throw",function(){var e=rt;return e.disrupt=!0,e.
expression=Tt(10),Lt(),e}),zt("try",function(){var e,t,n=rt;X.try>0&&vt("unexpected_a"
,n),X.try+=1,n.block=Dt(),t=n.block.disrupt;if(G.id==="catch"){var r="ignore";e=
G,n.catch=e,Et("catch"),Et("(");if(!G.identifier)return mt("expected_identifier_a"
,G);G.id!=="ignore"&&(r=undefined,e.name=G,xt(G,"exception",!0)),Et(),Et(")"),e.
block=Dt(r),e.block.disrupt!==!0&&(t=!1)}else vt("expected_a_before_b",G,"catch"
,lt(G));return G.id==="finally"&&(X.finally+=1,Et("finally"),n.else=Dt(),t=n.else.
disrupt,X.finally-=1),n.disrupt=t,X.try-=1,n}),zt("var",Kt),zt("while",function(
){var e=rt;return Mt(e),X.loop+=1,e.expression=Nt(),e.block=Dt(),e.block.disrupt===!0&&
vt("weird_loop",e),X.loop-=1,e}),zt("with",function(){mt("unexpected_a",rt)}),Wt
("?",":");var Yt=t(),Zt=t(),en=Qt(Zt),tn=Qt(Yt),nn=Gt(Zt),rn=Gt(Yt);return en("assignment"
,ln),en("binary",ln),en("binary",function(e){if(u[e.id]===!0){var t=e.expression
[0],n=e.expression[1];if(t.id==="NaN"||n.id==="NaN")Y.es6?vt("number_isNaN",e):vt
("isNaN",e);else if(t.id==="typeof")if(n.id!=="(string)")n.id!=="typeof"&&vt("expected_string_a"
,n);else{var r=n.value;r==="symbol"?Y.es6||vt("es6",n,r):r==="null"||r==="undefined"?
vt("unexpected_typeof_a",n,r):r!=="boolean"&&r!=="function"&&r!=="number"&&r!=="object"&&
r!=="string"&&vt("expected_type_string_a",n,r)}}}),en("binary","==",function(e){
vt("expected_a_b",e,"===","==")}),en("binary","!=",function(e){vt("expected_a_b"
,e,"!==","!=")}),en("binary","=>",fn),en("binary","||",function(e){e.expression.
forEach(function(e){e.id==="&&"&&!e.wrapped&&vt("and",e)})}),en("binary","(",function(
e){var t=e.expression[0];if(t.identifier&&X.context[t.id]===undefined&&typeof X.
name=="object"){var n=X.name.function;if(n){var r=n.context[t.id];r!==undefined&&
r.dead&&r.function===n&&r.calls!==undefined&&r.calls[X.name.id]!==undefined&&(r.
dead=!1)}}}),en("binary","in",function(e){vt("infix_in",e)}),en("binary","instanceof"
,function(e){vt("unexpected_a",e)}),en("binary",".",function(e){e.expression.new&&
(e.new=!0)}),en("statement","{",function(e){j.push(B),B=e,e.live=[]}),en("statement"
,"for",function(e){if(e.name!==undefined){var t=un(e.name);t!==undefined&&(t.init=!0
,t.writable||vt("bad_assignment_a",e.name))}on(e.initial)}),en("statement","function"
,fn),en("unary","~",ln),en("unary","function",fn),en("variable",function(e){var t=
un(e);t!==undefined&&(e.variable=t,t.used+=1)}),tn("assignment",function(e){var t=
e.expression[0];if(e.id==="=")e.names!==undefined?Array.isArray(e.names)?e.names
.forEach(dn):dn(e.names):t.id==="."&&e.expression[1].id==="undefined"&&vt("expected_a_b"
,t.expression,"delete","undefined");else{t.arity==="variable"&&(!t.variable||t.variable
.writable!==!0)&&vt("bad_assignment_a",t);var n=nt[e.expression[1].id];n!==undefined&&
(n.id==="function"||n.id==="=>"||n.constant&&n.id!=="(number)"&&(n.id!=="(string)"||
e.id!=="+="))&&vt("unexpected_a",e.expression[1])}}),tn("binary",function(e){var t
;u[e.id]&&(Ct(e.expression[0])||Ct(e.expression[1])||kt(e.expression[0],e.expression
[1])||e.expression[0].constant===!0&&e.expression[1].constant===!0)&&vt("weird_relation_a"
,e);switch(e.id){case"+":case"-":t=e.expression[1],t.id===e.id&&t.arity==="unary"&&!
t.wrapped&&vt("wrap_unary",t);break;case"=>":case"(":break;case".":e.expression.
id==="RegExp"&&vt("weird_expression_a",e);break;default:e.expression[0].constant===!0&&
e.expression[1].constant===!0&&(e.constant=!0)}}),tn("binary","&&",function(e){(
Ct(e.expression[0])||kt(e.expression[0],e.expression[1])||e.expression[0].constant===!0||
e.expression[1].constant===!0)&&vt("weird_condition_a",e)}),tn("binary","||",function(
e){(Ct(e.expression[0])||kt(e.expression[0],e.expression[1])||e.expression[0].constant===!0
)&&vt("weird_condition_a",e)}),tn("binary","=>",vn),tn("binary","(",function(e){
var t=e.expression[0],n;t.id==="new"&&(n=t,t=t.expression);if(t.id==="function")
e.wrapped||vt("wrap_immediate",e);else if(t.identifier)n!==undefined?t.id.charAt
(0)>"Z"||t.id==="Boolean"||t.id==="Number"||t.id==="String"||t.id==="Symbol"&&Y.
es6?vt("unexpected_a",n):t.id==="Function"?Y.eval||vt("unexpected_a",t,"new Function"
):t.id==="Array"?vt("expected_a_b",t,"[]","new Array"):t.id==="Object"&&vt("expected_a_b"
,t,"Object.create(null)","new Object"):t.id.charAt(0)>="A"&&t.id.charAt(0)<="Z"&&
t.id!=="Boolean"&&t.id!=="Number"&&t.id!=="String"&&t.id!=="Symbol"&&vt("expected_a_before_b"
,t,"new",lt(t));else if(t.id==="."){var r=n!==undefined;t.expression.id==="Date"&&
t.name.id==="UTC"&&(r=!r),_.test(t.name.id)!==r&&(n!==undefined?vt("unexpected_a"
,n):vt("expected_a_before_b",t.expression,"new",t.name.id));if(t.name.id==="getTime"
){var i=t.expression;if(i.id==="("){var s=i.expression;if(s.length===1){var o=s[0
];o.id==="new"&&o.expression.id==="Date"&&vt("expected_a_b",o,"Date.now()","new Date().getTime()"
)}}}}}),tn("binary","[",function(e){e.expression[0].id==="RegExp"&&vt("weird_expression_a"
,e),Ct(e.expression[1])&&vt("weird_expression_a",e.expression[1])}),tn("statement"
,"{",cn),tn("statement","const",pn),tn("statement","export",_t),tn("statement","for"
,function(e){on(e.inc)}),tn("statement","function",vn),tn("statement","import",function(
e){var t=e.name;return Array.isArray(t)?t.forEach(function(e){e.dead=!1,e.init=!0
,B.live.push(e)}):(t.dead=!1,t.init=!0,B.live.push(t)),_t(e)}),tn("statement","let"
,pn),tn("statement","try",function(e){if(e.catch!==undefined){var t=e.catch.name
;if(t!==undefined){var n=X.context[t.id];n.dead=!1,n.init=!0}on(e.catch.block)}}
),tn("statement","var",pn),tn("ternary",function(e){Ct(e.expression[0])||e.expression
[0].constant===!0||kt(e.expression[1],e.expression[2])?vt("unexpected_a",e):kt(e
.expression[0],e.expression[1])?vt("expected_a_b",e,"||","?"):kt(e.expression[0]
,e.expression[2])?vt("expected_a_b",e,"&&","?"):e.expression[1].id==="true"&&e.expression
[2].id==="false"?vt("expected_a_b",e,"!!","?"):e.expression[1].id==="false"&&e.expression
[2].id==="true"?vt("expected_a_b",e,"!","?"):e.expression[0].wrapped!==!0&&(e.expression
[0].id==="||"||e.expression[0].id==="&&")&&vt("wrap_condition",e.expression[0])}
),tn("unary",function(e){switch(e.id){case"[":case"{":case"function":case"new":break;
case"`":e.expression.every(function(e){return e.constant})&&(e.constant=!0);break;
default:e.expression.constant===!0&&(e.constant=!0)}}),tn("unary","function",vn)
,function(e,i,s){try{ft=[],Y=i||t(),H="anonymous",j=[],F=t(),q=!0,I=[],R=!0,U=t(
),z=[],W=Y.fudge?1:0,V=[],$={id:"(global)",body:!0,context:t(),from:0,level:0,line
:0,live:[],loop:0,"switch":0,thru:0},B=$,X=$,J=!1,et=!1,Q=!1,G=$,Z=t(),tt=[],ot=
undefined,rt=$,it=0,at=undefined,n(F,a,!1),s!==undefined&&n(F,s,!1),Object.keys(
Y).forEach(function(e){if(Y[e]===!0){var t=r[e];Array.isArray(t)&&n(F,t,!1)}}),gt
(e),Et(),J?(ut=St(),Et("(end)")):(Y.browser?G.id===";"&&Et(";"):G.value==="use strict"&&
($.strict=G,Et("(string)"),Et(";")),ut=Ot(),Et("(end)"),X=$,on(ut),Q&&$.strict!==
undefined&&vt("unexpected_a",$.strict),gn(),Y.white||yn()),Y.browser||I.forEach(
function(e){e.directive==="global"&&vt("missing_browser",e)}),R=!1}catch(o){o.name!=="JSLintError"&&
ft.push(o)}return{directives:I,edition:"2016-10-24",exports:U,froms:z,functions:
V,global:$,id:"(JSLint)",json:J,lines:K,module:Q===!0,ok:ft.length===0&&!R,option
:Y,property:Z,stop:R,tokens:st,tree:ut,warnings:ft.sort(function(e,t){return e.line-
t.line||e.column-t.column})}}}()
local.CSSLint = CSSLint; local.JSLINT = JSLINT, local.jslintEs6 = jslint; }());
/* jslint-ignore-end */



    // run shared js-env code - function
    (function () {
        local.jslintAndPrint = function (script, file) {
        /*
         * this function will jslint / csslint the script and print any errors to stderr
         */
            var ignoreDict, lineno, scriptParsed;
            // cleanup errors
            local.errorCounter = 0;
            local.errorText = '';
            // do nothing for empty script
            if (!script.length) {
                return script;
            }
            // init ignoreDict
            ignoreDict = {};
            // init lineno
            lineno = 0;
            // parse script
            scriptParsed = script
                // indent text-block
                // /* jslint-indent-begin */ ... /* jslint-indent-end */
                .replace(
/* jslint-indent-begin 20 */
(function () {
    /*jslint maxlen: 256*/
    return (/^ *?\/\* jslint-indent-begin (\d+?) \*\/$[\S\s]+?^ *?\/\* jslint-indent-end \*\/$/gm);
}()),
/* jslint-indent-end */
                    function (match0, match1) {
                        return match0.replace(
                            (/(^ *\S)/gm),
                            new Array(Number(match1) + 1).join(' ') + '$1'
                        );
                    }
                )
                // ignore text-block
                // /* jslint-ignore-begin */ ... /* jslint-ignore-end */
                .replace(
/* jslint-ignore-begin */
(/^ *?\/\* jslint-ignore-begin \*\/$[\S\s]+?^ *?\/\* jslint-ignore-end \*\/$/gm),
/* jslint-ignore-end */
                    function (match0) {
                        return match0.replace((/.*/g), '');
                    }
                )
                // ignore next-line
                // /* jslint-ignore-next-line */
                .replace(
/* jslint-ignore-next-line */
(/^ *?\/\* jslint-ignore-next-line \*\/\n.*/gm),
                    function (match0) {
                        return match0.replace((/.*/g), '');
                    }
                );
            // csslint script
            if (file.slice(-4) === '.css') {
                scriptParsed = scriptParsed.replace(new RegExp([
                    // handle flexbox
                    ' display: flex;',
                    ' flex: .+?;',
                    ' flex-.+?: .+?;'
                ].join('|'), 'g'), function () {
                    return ' background: url(' + Math.random() + ');';
                });
                local.CSSLint.errors = local.CSSLint.verify(scriptParsed).messages
                    .filter(function (error) {
                        return !ignoreDict[error.rule.id];
                    });
                // if error occurred, then print colorized error messages
                if (!local.CSSLint.errors.length) {
                    return script;
                }
                local.errorText = '\n\u001b[1m' + file + '\u001b[22m\n';
                local.CSSLint.errors
                    .filter(function (error) {
                        return error;
                    })
                    .forEach(function (error) {
                        local.errorCounter += 1;
                        lineno += 1;
                        local.errorText +=
                            (' #' + String(lineno) + ' ').slice(-4) +
                            '\u001b[33m' + error.type + ' - ' + error.rule.id +
                            ' - ' + error.message + '\n    ' + error.rule.desc +
                            '\u001b[39m\n    ' + String(error.evidence).trim() +
                            '\u001b[90m \/\/ line ' + error.line +
                            ', col ' + error.col + '\u001b[39m\n';
                    });
            // jslint es6-script
            } else if ((/^\/\*jslint\b[\s\w,:]*?\bes6: true\b/m)
                    .test(scriptParsed.slice(0, 0x1000))) {
                // comment shebang
                scriptParsed = scriptParsed.replace((/^#!/), '//');
                local.jslintEs6.errors = local.jslintEs6(scriptParsed).warnings;
                if (!local.jslintEs6.errors.length) {
                    return script;
                }
                // if error occurred, then print colorized error messages
                local.errorText = '\n\u001b[1m' + file + '\u001b[22m\n';
                local.jslintEs6.errors
                    .filter(function (error) {
                        return error;
                    })
                    .forEach(function (error) {
                        local.errorCounter += 1;
                        lineno += 1;
                        local.errorText +=
                            (' #' + String(lineno) + ' ').slice(-4) +
                            '\u001b[33m' + error.message +
                            '\u001b[39m\n    ' + String(error.a).trim() +
                            '\u001b[90m \/\/ Line ' + (error.line + 1) +
                            ', Pos ' + (error.column + 1) + '\u001b[39m\n';
                    });
            // jslint es5 script
            } else {
                // comment shebang
                scriptParsed = scriptParsed.replace((/^#!/), '//');
                if (local.JSLINT(scriptParsed)) {
                    return script;
                }
                // if error occurred, then print colorized error messages
                local.errorText = '\n\u001b[1m' + file + '\u001b[22m\n';
                local.JSLINT.errors
                    .filter(function (error) {
                        return error;
                    })
                    .forEach(function (error) {
                        local.errorCounter += 1;
                        lineno += 1;
                        local.errorText +=
                            (' #' + String(lineno) + ' ').slice(-4) +
                            '\u001b[33m' + error.reason +
                            '\u001b[39m\n    ' + String(error.evidence).trim() +
                            '\u001b[90m \/\/ Line ' + error.line +
                            ', Pos ' + error.character + '\u001b[39m\n';
                    });
            }
            // print error to stderr
            console.error(local.errorText);
            return script;
        };
    }());
    switch (local.modeJs) {



    // run browser js-env code - post-init
    case 'browser':
        // init exports
        local.global.utility2_jslint = local;
        break;



    /* istanbul ignore next */
    // run node js-env code - post-init
    case 'node':
        // require modules
        local.fs = require('fs');
        local.path = require('path');
        // init exports
        module.exports = module['./lib.jslint.js'] = local;
        module.exports.__dirname = __dirname;
        // run the cli
        if (module !== require.main || local.global.utility2_rollup) {
            break;
        }
        // jslint files
        process.argv.slice(2).forEach(function (arg) {
            if (arg[0] !== '-') {
                local.jslintAndPrint(
                    local.fs.readFileSync(local.path.resolve(arg), 'utf8'),
                    arg
                );
            }
        });
        // if error occurred, then exit with non-zero code
        process.exit(local.errorCounter);
        break;
    }
}());
