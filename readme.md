# diffRender
替换div.innerHTML,差异化更新HTML 

# 原理
源码不到500行,解析html字符串为Visual DOM,需要更新时对isual DOM 进行diff,实现更新。Visual DOM diff算法来自[snabbdom](https://github.com/snabbdom/snabbdom)。

# api

```js
var patch=DiffRender.patch;
var oldVnode=patch(el,htmlString); // first time
var oldVnode=patch(oldVnode, newHtmlString);// after
```




