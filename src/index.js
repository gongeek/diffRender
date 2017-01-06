import HtmlParser from './lib/htmlparser'
import Snabbdom from './lib/snabbdom/index'
import AttrCb from  './lib/snabbdom/modules/attributes'
var patchFn = Snabbdom.init([AttrCb]);
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
        el.innerHTML = ''; //初始化时先清空
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
window.DiffRender = DiffRender;
export default DiffRender;