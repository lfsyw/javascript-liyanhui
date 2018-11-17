/*

    document.write('<p>测试write</p>'); //一般用于测试

    var box = document.getElementById('box');
    var p = document.createElement('p'); //只是创建了一个元素节点p，还没有添加到文档中去，只驻留在内存中。
    box.appendChild(p); //将新节点p添加到id=box的div里的子节点列表的末尾上

    var text = document.createTextNode('测试Div4'); //创建一个文本
    p.appendChild(text); //把文本添加到p里面
    box.appendChild(text); //把文本添加到id=box里面
    document.getElementsByTagName('body')[0].appendChild(p); //把新节点添加到body的末尾

    box.parentNode就是body
    box.parentNode.insertBefore(p,box); //在box的父节点添加一个p，就是在box前面添加一个元素节点

    向后添加
    var box = document.getElementById('box');
    var p = document.createElement('p'); //只是创建了一个元素节点p，还没有添加到文档中去，只驻留在内存中。
    insertAfter(p,box);
    function insertAfter(newElement,targetElement) {
        //得到父节点，就是body，但是不能直接使用body，如果层次较多，父节点不一定是body
        var parent = targetElement.parentNode;
        if (parent.lastChild === targetElement){
            alert('');
            parent.appendChild(newElement,targetElement);
        }else {
            //span节点的前面添加，就可以用insertBefore，那么span节点怎么获取，nextSibling
            parent.insertBefore(newElement,targetElement.nextSibling);
        }
        
    }

    浏览器兼容处理
    var body = document.getElementsByTagName('body')[0];
	if (BrowserDetect.browser == 'Internet Explorer' && BrowserDetect.version <= 7) {
		var input = document.createElement("<input type=\"radio\" name=\"sex\">");
	} else {
		var input = document.createElement('input');
		input.setAttribute('type', 'radio');
		input.setAttribute('name', 'sex');
	}
	
	body.appendChild(input);

    var span = document.getElementsByTagName('span')[0];
	var em = document.createElement('em');
	span.parentNode.replaceChild(em, span);
	
	var box = document.getElementById('box');
	var clone = removeWhiteNode(box).firstChild.cloneNode(false);	//克隆一个节点，如果是true就是把标签内的文本也克隆，如果是false，只克隆标签
	box.appendChild(clone);

    var box = document.getElementById('box');
	box.removeChild(removeWhiteNode(box).firstChild);		//删除box第一个子节点
	删除整个box
	box.parentNode.removeChild(box);			//删除整个box


*/





window.onload = function () {
   var span = document.getElementsByTagName('span')[0]; 
   var em = document.createElement('em');
   span.parentNode.replaceChild(em,span);
}