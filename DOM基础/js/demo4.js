/*
    var box = document.getElementById('box');
    alert(box.childNodes[0].nodeValue); //获取第一个子节点
    alert(box.childNodes[box.childNodes.length-1].nodeValue); //获取最后一个子节点

    alert(box.firstChild.nodeValue); //获取第一个子节点
    alert(box.lastChild.nodeValue); //获取最后一个子节点

    alert(box.ownerDocument); //[object HTMLDocument] ，返回文档对象，根节点
    alert(document); //[object HTMLDocument]
    alert(box.ownerDocument === document); //true ,两者完全相等

    alert(box.ownerDocument.nodeName); //#document
    alert(box.ownerDocument.nodeType); //9

    alert(box.parentNode); //[object HTMLBodyElement] ,获取当前节点的父节点
    alert(box.firstChild.nextSibling); //[object HTMLElement] ,获取当前节点的后一个同级节点
    alert(box.firstChild.nextSibling.nodeName); //EM ,下一个同级节点的标签名。
    alert(box.lastChild.previousSibling.nodeName); //EM,最后一个节点的上一个同级节点的标签名

    alert(box.attributes); //[object NamedNodeMap],集合数组，保存着这个元素节点的属性列表
    alert(box.attributes.length); //3个属性
    alert(box.attributes[0]); //[object Attr] 属性节点
    alert(box.attributes[0].nodeType); //2,属性节点的类型
    alert(box.attributes[0].nodeValue); //box,第一个属性的属性值
    alert(box.attributes[0].nodeName); //id,第一个属性的属性名

    教程说，遍历的时候，是从后向前的。自己做事从前往后的。
    alert(box.attributes['title'].nodeValue); //获取title属性的值

    alert(box.childNodes.length); //7 ，获取子节点数目，包含空白字符


    忽略空白字符
	function filterWhiteNode(node) {
		var ret = [];
		for (var i = 0; i < node.length; i ++) {
			if (node[i].nodeType === 3 && /^\s+$/.test(node[i].nodeValue)) {
				continue;
			} else {
				ret.push(node[i]);
			}
		}
		return ret;
    }
    
    移除空白字符
    var box = document.getElementById('box');
    alert(box.childNodes.length);
    alert(removeWhiteNode(box.childNodes).length);

	function removeWhiteNode(node) {
		for (var i = 0; i < node.length; i ++) {
			if (node[i].nodeType === 3 && /^\s+$/.test(node[i].nodeValue)) {
				node[i].parentNode.removeChild(node[i]);
			} 
		}
		return node;
	}
*/

window.onload = function () {
    var box = document.getElementById('box');
    alert(box.firstChild.nodeName);
    alert(removeWhiteNode(box).firstChild.nodeName);

};



//PS：如果firstChild、lastChild、previousSibling和nextSibling在获取节点的过程中遇到空白节点，我们该怎么处理掉呢？
function removeWhiteNode(node) {
    for (var i = 0; i < node.childNodes.length; i ++) {
        if (node.childNodes[i].nodeType === 3 && /^\s+$/.test(node.childNodes[i].nodeValue)) {
            node.childNodes[i].parentNode.removeChild(node.childNodes[i]);
        } 
    }
    return node;
}