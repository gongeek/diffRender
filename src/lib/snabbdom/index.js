import Vnode from './vnode'
import is from './is'
import domApi from './domapi'

var emptyNode = Vnode('', {}, [], undefined, undefined);

function isUndef(s) {
    return s === undefined;
}

function isDef(s) {
    return s !== undefined;
}

function sameVnode(vnode1, vnode2) {
    return vnode1.key === vnode2.key && vnode1.sel === vnode2.sel;
}

function createKeyToOldIdx(children, beginIdx, endIdx) {
    var i, map = {}, key;
    for (i = beginIdx; i <= endIdx; ++i) {
        key = children[i].key;
        if (isDef(key)) map[key] = i;
    }
    return map;
}

var hooks = ['create', 'update', 'remove', 'destroy', 'pre', 'post'];

function init(modules, api) {
    var i, j, cbs = {};

    if (isUndef(api)) api = domApi;
    // 收集插入的module的回调,修改class,修改元素属性都是通过回调监听create,update实现,对拿到元素直接dom操作实现
    for (i = 0; i < hooks.length; ++i) {
        cbs[hooks[i]] = [];
        for (j = 0; j < modules.length; ++j) {
            if (modules[j][hooks[i]] !== undefined) cbs[hooks[i]].push(modules[j][hooks[i]]);
        }
    }

    function emptyNodeAt(elm) {
        var id = elm.id ? '#' + elm.id : '';
        var c = elm.className ? '.' + elm.className.split(' ').join('.') : '';
        return Vnode(api.tagName(elm).toLowerCase() + id + c, {}, [], undefined, elm);
    }

    function createRmCb(childElm, listeners) {
        return function () {
            if (--listeners === 0) {
                var parent = api.parentNode(childElm);
                api.removeChild(parent, childElm);
            }
        };
    }

    function createElm(vnode, insertedVnodeQueue) {
        var i, data = vnode.data;
        if (isDef(data)) {
            // init hook
            if (isDef(i = data.hook) && isDef(i = i.init)) {
                i(vnode);
                data = vnode.data;
            }
        }
        var elm, children = vnode.children, sel = vnode.sel;
        if (isDef(sel)) {
            // Parse selector
            var hashIdx = sel.indexOf('#');
            var dotIdx = sel.indexOf('.', hashIdx);
            var hash = hashIdx > 0 ? hashIdx : sel.length;
            var dot = dotIdx > 0 ? dotIdx : sel.length;
            var tag = hashIdx !== -1 || dotIdx !== -1 ? sel.slice(0, Math.min(hash, dot)) : sel;
            elm = vnode.elm = isDef(data) && isDef(i = data.ns) ? api.createElementNS(i, tag)
                : api.createElement(tag);
            if (hash < dot) elm.id = sel.slice(hash + 1, dot);
            if (dotIdx > 0) elm.className = sel.slice(dot + 1).replace(/\./g, ' ');
            if (is.array(children)) {
                for (i = 0; i < children.length; ++i) {
                    api.appendChild(elm, createElm(children[i], insertedVnodeQueue));
                }
            } else if (is.primitive(vnode.text)) {
                api.appendChild(elm, api.createTextNode(vnode.text));
            }
            // 运行module的create回调
            for (i = 0; i < cbs.create.length; ++i) cbs.create[i](emptyNode, vnode);
            if (vnode.data) {
                i = vnode.data.hook; // Reuse variable
            }
            if (isDef(i)) {
                // hook 中的cb
                if (i.create) i.create(emptyNode, vnode);
                // insertedVnodeQueue insert queue , insert cb
                if (i.insert) insertedVnodeQueue.push(vnode);
            }
        } else {
            elm = vnode.elm = api.createTextNode(vnode.text);
        }
        return vnode.elm;
    }

    function addVnodes(parentElm, before, vnodes, startIdx, endIdx, insertedVnodeQueue) {
        for (; startIdx <= endIdx; ++startIdx) {
            api.insertBefore(parentElm, createElm(vnodes[startIdx], insertedVnodeQueue), before);
        }
    }

    function invokeDestroyHook(vnode) {
        var i, j, data = vnode.data;
        if (isDef(data)) {
            if (isDef(i = data.hook) && isDef(i = i.destroy)) i(vnode);
            for (i = 0; i < cbs.destroy.length; ++i) cbs.destroy[i](vnode);
            if (isDef(i = vnode.children)) {
                for (j = 0; j < vnode.children.length; ++j) {
                    invokeDestroyHook(vnode.children[j]);
                }
            }
        }
    }

    // removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
    function removeVnodes(parentElm, vnodes, startIdx, endIdx) {
        for (; startIdx <= endIdx; ++startIdx) {
            var i, listeners, rm, ch = vnodes[startIdx];
            if (isDef(ch)) {
                if (isDef(ch.sel)) {
                    invokeDestroyHook(ch);
                    listeners = cbs.remove.length + 1;
                    rm = createRmCb(ch.elm, listeners);
                    for (i = 0; i < cbs.remove.length; ++i) cbs.remove[i](ch, rm);
                    if (isDef(i = ch.data) && isDef(i = i.hook) && isDef(i = i.remove)) {
                        i(ch, rm);
                    } else {
                        rm();
                    }
                } else { // Text node
                    api.removeChild(parentElm, ch.elm);
                }
            }
        }
    }

    // updateChildren(elm, oldCh, ch, insertedVnodeQueue)
    // example: abc -> abec
    function updateChildren(parentElm, oldCh, newCh, insertedVnodeQueue) {
        var oldStartIdx = 0, newStartIdx = 0;
        var oldEndIdx = oldCh.length - 1;
        var oldStartVnode = oldCh[0];
        var oldEndVnode = oldCh[oldEndIdx];
        var newEndIdx = newCh.length - 1;
        var newStartVnode = newCh[0];
        var newEndVnode = newCh[newEndIdx];
        var oldKeyToIdx, idxInOld, elmToMove, before;

        while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
            if (isUndef(oldStartVnode)) {
                oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left   正如:oldCh[idxInOld] = undefined;
            } else if (isUndef(oldEndVnode)) {
                oldEndVnode = oldCh[--oldEndIdx];
            } else if (sameVnode(oldStartVnode, newStartVnode)) {
                // 一样都++
                patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue); // 就算是一样的话还是会调用update 回调的 ,并且会继续递归更新子节点
                oldStartVnode = oldCh[++oldStartIdx];
                newStartVnode = newCh[++newStartIdx];
            } else if (sameVnode(oldEndVnode, newEndVnode)) {
                patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
                oldEndVnode = oldCh[--oldEndIdx];
                newEndVnode = newCh[--newEndIdx];
            } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
                patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
                api.insertBefore(parentElm, oldStartVnode.elm, api.nextSibling(oldEndVnode.elm));
                oldStartVnode = oldCh[++oldStartIdx];
                newEndVnode = newCh[--newEndIdx];
            } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
                patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
                api.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
                oldEndVnode = oldCh[--oldEndIdx];
                newStartVnode = newCh[++newStartIdx];
            } else {
                if (isUndef(oldKeyToIdx)) oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx); // 不是一开始就生成这个map,真省内存...
                idxInOld = oldKeyToIdx[newStartVnode.key]; // 利用key相同来找到新的节点在老节点列表的位置
                if (isUndef(idxInOld)) { // New element 没找到则代表是新元素插入就好
                    api.insertBefore(parentElm, createElm(newStartVnode, insertedVnodeQueue), oldStartVnode.elm);
                    newStartVnode = newCh[++newStartIdx];
                } else {
                    elmToMove = oldCh[idxInOld];
                    patchVnode(elmToMove, newStartVnode, insertedVnodeQueue); //
                    oldCh[idxInOld] = undefined;
                    api.insertBefore(parentElm, elmToMove.elm, oldStartVnode.elm);
                    newStartVnode = newCh[++newStartIdx];
                }
            }
        }
        if (oldStartIdx > oldEndIdx) {
            before = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
            addVnodes(parentElm, before, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
        } else if (newStartIdx > newEndIdx) {
            removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
        }
    }

    function patchVnode(oldVnode, vnode, insertedVnodeQueue) {
        var i, hook;
        if (isDef(i = vnode.data) && isDef(hook = i.hook) && isDef(i = hook.prepatch)) {
            i(oldVnode, vnode);
        }
        // 能用patch方法的elm属性一定相同
        var elm = vnode.elm = oldVnode.elm, oldCh = oldVnode.children, ch = vnode.children;
        // 引用一样直接返回
        if (oldVnode === vnode) return;
        if (!sameVnode(oldVnode, vnode)) {
            // 根节点不一样了就直接整个重新生产,后面的也不判断了
            var parentElm = api.parentNode(oldVnode.elm);
            elm = createElm(vnode, insertedVnodeQueue);

            api.insertBefore(parentElm, elm, oldVnode.elm);
            removeVnodes(parentElm, [oldVnode], 0, 0);
            return;
        }
        if (isDef(vnode.data)) {
            // 运行通过模块加入的的update回调,cbs变量是全局的
            for (i = 0; i < cbs.update.length; ++i) cbs.update[i](oldVnode, vnode);

            // 运行节点上添加的hook回调
            i = vnode.data.hook;
            if (isDef(i) && isDef(i = i.update)) i(oldVnode, vnode);
        }

        // 有text属性就不会在有ch
        if (isUndef(vnode.text)) {
            if (isDef(oldCh) && isDef(ch)) {
                if (oldCh !== ch) updateChildren(elm, oldCh, ch, insertedVnodeQueue); // 如果都有只节点只是子节点变化就调用 updateChildren 算法关键所在
            } else if (isDef(ch)) {
                // 由文本变成子节点列表
                if (isDef(oldVnode.text)) api.setTextContent(elm, '');
                addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
            } else if (isDef(oldCh)) {
                // 没有子节点
                removeVnodes(elm, oldCh, 0, oldCh.length - 1);
            } else if (isDef(oldVnode.text)) {
                // 都没有子节点了,要清空之前的文本设置
                api.setTextContent(elm, '');
            }
        } else if (oldVnode.text !== vnode.text) {
            api.setTextContent(elm, vnode.text);
        }


        if (isDef(hook) && isDef(i = hook.postpatch)) {
            i(oldVnode, vnode);
        }
    }

    return function (oldVnode, vnode) {
        var i, elm, parent;
        var insertedVnodeQueue = [];
        for (i = 0; i < cbs.pre.length; ++i) cbs.pre[i]();

        if (isUndef(oldVnode.sel)) {
            oldVnode = emptyNodeAt(oldVnode);
        }

        if (sameVnode(oldVnode, vnode)) {
            patchVnode(oldVnode, vnode, insertedVnodeQueue);
        } else {
            elm = oldVnode.elm;
            parent = api.parentNode(elm);

            createElm(vnode, insertedVnodeQueue);

            if (parent !== null) {
                api.insertBefore(parent, vnode.elm, api.nextSibling(elm));
                removeVnodes(parent, [oldVnode], 0, 0);
            }
        }

        // insert回调是指创建的节点已经插入到dom中之后调用
        for (i = 0; i < insertedVnodeQueue.length; ++i) {
            insertedVnodeQueue[i].data.hook.insert(insertedVnodeQueue[i]);
        }
        for (i = 0; i < cbs.post.length; ++i) cbs.post[i]();
        DiffRender && DiffRender.timelog && console.timeEnd('patchCost');
        return vnode;
    };
}

export default {init: init};
