import HtmlParser from './lib/htmlparser'
import Snabbdom from './lib/snabbdom/index'
var patchFn = Snabbdom.init([]);
var htmlParser = new HtmlParser();
var DiffRender = {};
DiffRender.domlog = window.location.href.indexOf('domlog') !== -1;
DiffRender.timelog = window.location.href.indexOf('timelog') !== -1;
function patch(el, str) {
    var id, c, selRoot;
    DiffRender.timelog && console.time('patchCost');
    if (el.tagName) {
        id = el.id ? '#' + el.id : '';
        c = el.className ? '.' + el.className.split(' ').join('.') : '';
        selRoot = el.tagName.toLowerCase() + id + c;
    }
    if (!selRoot && el.isRoot) {
        selRoot = el.sel;
    }
    if (typeof el === 'string') {
        el = htmlParser.parse(el, selRoot)
    }
    if (typeof str === 'string') {
        str = htmlParser.parse(str, selRoot)
    }
    return patchFn(el, str);
}

DiffRender.patch = patch;

export default DiffRender;