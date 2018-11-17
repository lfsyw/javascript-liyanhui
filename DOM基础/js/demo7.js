/*
1、呈现

    if (document.compatMode == 'CSS1Compat') {
        alert(document.documentElement.clientWidth);
    } else {
        alert(document.body.clientWidth);
    }

2、滚动
    document.getElementById('box').scrollIntoView();		//将指定的节点滚动到可见范围内

3、children属性
    var box = document.getElementById('box');
    alert(box.childNodes.length);
    alert(box.children.length); //忽略掉了空白节点
    alert(box.children[0].nodeName); //STRONG

4、contains属性
    var p = box.firstChild;
    alert(box.contains(p)); //判断box的第一个节点是不是box的子节点

    旧版火狐,Safari2.x不兼容，需要做兼容
    var box = document.getElementById('box');
    var p = box.firstChild;
    alert(box.contains(p));			//判断box是不是p的父节点

    function contains(refNode, otherNode) {
        if (typeof refNode.contains != 'undefined' && !(BrowserDetect.browser == 'Safari' && BrowserDetect.version < 3)) {
            return refNode.contains(otherNode);
        } else if (typeof refNode.compareDocumentPosition == 'function') {
            return refNode.compareDocumentPosition(otherNode) > 16;
        } else {
            var node = otherNode.parentNode;
            do {
                if (node === refNode) {
                    return true;
                } else {
                    node = otherNode.parentNode;
                }
            } while (node != null)
            return false;
        }
    }


}
*/

window.onload = function () {
    var box = document.getElementById('box');
    var p = box.firstChild;
    alert(box.compareDocumentPosition(p) > 16);	//包含关系
} 

