function createElement(tagName) {
    return document.createElement(tagName);
}

function createElementNS(namespaceURI, qualifiedName) {
    return document.createElementNS(namespaceURI, qualifiedName);
}

function createTextNode(text) {
    return document.createTextNode(text);
}


function insertBefore(parentNode, newNode, referenceNode) {
    parentNode.insertBefore(newNode, referenceNode);
}


function removeChild(node, child) {
    node.removeChild(child);
}

function appendChild(node, child) {
    node.appendChild(child);
}

function parentNode(node) {
    return node.parentElement;
}

function nextSibling(node) {
    return node.nextSibling;
}

function tagName(node) {
    return node.tagName;
}

function setTextContent(node, text) {
    node.textContent = text;
}
// add dom log
function wrapDomApi(fn) {
    return function (a1, a2, a3) {
        DiffRender && DiffRender.domlog && console.log(a1.outerHTML || '', ' ' + fn.name + ' ', a2 || '', a3 || '');
        fn(a1, a2, a3);
    };
}
export default  {
    createElement: createElement,
    createElementNS: createElementNS,
    createTextNode: createTextNode,
    appendChild: wrapDomApi(appendChild),
    removeChild: wrapDomApi(removeChild),
    insertBefore: wrapDomApi(insertBefore),
    parentNode: parentNode,
    nextSibling: nextSibling,
    tagName: tagName,
    setTextContent: wrapDomApi(setTextContent)
};