import HtmlParser from './lib/htmlparser'
import Snabbdom from './lib/snabbdom/index'
var patchFn = Snabbdom.init([]);
var htmlParser = new HtmlParser();

function patch(el, str) {
    if (typeof el === 'string') {
        el = htmlParser.parse(el)
    }
    if (typeof str === 'string') {
        str = htmlParser.parse(str)
    }
    patchFn(el, str);
}


export default {patch: patch};