export default function HtmlParser() {
}
HtmlParser.prototype = {
    handler: null,
    startTagRe: /^<([^>\s\/]+)((\s+[^=>\s]+(\s*=\s*((\"[^"]*\")|(\'[^']*\')|[^>\s]+))?)*)\s*\/?\s*>/m,
    endTagRe: /^<\/([^>\s]+)[^>]*>/m,
    attrRe: /([^=\/\s]+)(\s*=\s*((\"([^"]*)\")|(\'([^']*)\')|[^>\s]+))?/gm,
    stack: [],
    parse: function (s) {
        var vnode = {
            sel: 'div',
            children: [],
            isRoot: true
        };
        this.stack = [vnode];
        var lc, lm, rc, index;
        var treatAsChars = false;
        var me = this;
        while (s.length > 0) {
            if (s.substring(0, 4) == "<!--") {
                // Comment
                index = s.indexOf("-->");
                treatAsChars = index == -1;
            } else if (s.substring(0, 2) == "</") {
                // end tag
                if (this.endTagRe.test(s)) {
                    lc = RegExp.leftContext;
                    lm = RegExp.lastMatch;
                    rc = RegExp.rightContext;
                    lm.replace(this.endTagRe, function () {
                        return me.parseEndTag.apply(me, arguments);
                    });
                    s = rc;
                    treatAsChars = false;
                } else {
                    treatAsChars = true;
                }
            } else if (s.charAt(0) == "<") {
                // start tag
                if (this.startTagRe.test(s)) {
                    lc = RegExp.leftContext;
                    lm = RegExp.lastMatch;
                    rc = RegExp.rightContext;

                    lm.replace(this.startTagRe, function () {
                        return me.parseStartTag.apply(me, arguments);
                    });

                    s = rc;
                    treatAsChars = false;
                } else {
                    treatAsChars = true;
                }
            }
            if (treatAsChars) {
                index = s.indexOf("<");
                if (index == -1) {
                    this.parseText(s);
                    s = "";
                } else {
                    this.parseText(s.substring(0, index));
                    s = s.substring(index);
                }
            }
            treatAsChars = true;
        }
        if (vnode.children.length === 0) {
            throw new Error('HTML不标准,请检查标签是否闭合!');
        }
        return vnode.children.length === 1 ? vnode.children[0] : vnode;
    },
    setStackTopNode: function (cb) {
        var top = this.stack[this.stack.length - 1];
        if (!top) {
            throw new Error('HTML不标准,请检查标签是否闭合!');
        }
        cb(top);
    },
    parseText: function (text) {
        this.setStackTopNode(function (vnode) {
            // 自动添加span标签
            if (vnode.children) {
                vnode.children.push({sel: 'span', text: text});
                return;
            }
            vnode.text = text;
        })
    },
    parseStartTag: function (sTag, sTagName, sRest) {
        var attrs = this.parseAttributes(sTagName, sRest);
        if (sTag.substr(-2) === '/>') {
            this.setStackTopNode(function (vnode) {
                vnode.children = vnode.children || [];
                if (vnode.text) {
                    vnode.children.push({
                        sel: 'span',
                        text: vnode.text
                    });
                    delete vnode.text;
                }
                vnode.children.push({
                    sel: sTagName,
                    data: {attr: attrs}
                });
            });
            return;
        }
        this.stack.push({sel: sTagName, data: {attr: attrs}});
    },

    parseEndTag: function (sTag, sTagName) {
        var node = this.stack.pop();
        this.setStackTopNode(function (vnode) {
            vnode.children = vnode.children || [];
            if (vnode.text) {
                vnode.children.push({
                    sel: 'span',
                    text: vnode.text
                });
                delete vnode.text;
            }
            vnode.children.push(node);
        });
    },

    parseAttributes: function (sTagName, s) {
        var me = this;
        var attrs = {};
        s.replace(this.attrRe, function (a0, a1, a2, a3, a4, a5, a6) {
            var attr = me.parseAttribute(sTagName, a0, a1, a2, a3, a4, a5, a6);
            attrs[attr.name] = attr.value;
        });
        return attrs;
    },

    parseAttribute: function (sTagName, sAttribute, sName) {
        var value = "";
        if (arguments[7]) {
            value = arguments[8];
        } else if (arguments[5]) {
            value = arguments[6];
        } else if (arguments[3]) {
            value = arguments[4];
        }
        var empty = !value && !arguments[3];
        return {name: sName, value: empty ? true : value};
    }
};