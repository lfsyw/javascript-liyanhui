/*
1、node类型
    alert(Node); //function Node() { [native code] }，返回的是一个方法,IE不支持
    if (xxx.nodeType === 1) //表示判断元素节点
    if (xxx.nodeType === 3) //表示判断文本节点
    alert(Node.ELEMENT_NODE); //1，表示元素节点的类型值
    alert(Node.TEXT_NODE); //3,表示文本节点类型值

	if (xxx.nodeType === Node.ELEMENT_NODE)
	if (xxx.nodeType === Node.TEXT_NODE)

    if (xxx.nodeType === 元素)
    if (xxx.nodeType === 文本)
    通过英文常量来代替阿拉伯数字，使得判断更加的清晰
    
    IE不支持，模拟一个类，让IE也支持
    if (typeof Node == 'undefined') {
	创建一个全局Node
		window.Node = {
			ELEMENT_NODE : 1,
			TEXT_NODE : 3
		};
	};
	
	alert(Node.ELEMENT_NODE);	
    alert(Node.TEXT_NODE)
    

2、document类型
    alert(document); //[object HTMLDocument]
    alert(document.nodeType); //9
    alert(document.nodeValue); //null
    alert(document.nodeName); //#document
	alert(document.childNodes[0]);	//DocumentType，IE理解为注释
	alert(document.childNodes[0].nodeType);	//10，IE为8
	alert(document.childNodes[0].nodeName);

	火狐为HTML，谷歌为html，IE为#comment
	火狐新版本为html

    alert(document.childNodes[1]); //[object HTMLHtmlElement]
    alert(document.childNodes[1].nodeType); //1
    alert(document.childNodes[1].nodeName); //HTML

    alert(document.documentElement); //[object HTMLHtmlElement]
    alert(document.body.nodeName); //BODY,获取body

    alert(document.doctype);			//DocumentType,	IE会显示null

    alert(document.title); //DOM进阶 //获取根元素的title元素文本
    document.title = 'box'; //修改title元素文本

    alert(document.URL);
	alert(document.domain);
	alert(document.referrer);
	alert(document.images.length);

   var box = document.getElementById('box');
   var text1  = document.createTextNode('Mr.');
   var text2 = document.createTextNode('Lee');
   box.appendChild(text1);
   box.appendChild(text2);
   box.normalize(); //合并同一级别的文本节点
   alert(box.childNodes.length);
   alert(box.childNodes[0].nodeValue);

   var box = document.getElementById('box');
   box.childNodes[0].splitText(3); //把前三个字符分离成新节点
   alert(box.childNodes[0].nodeValue);



    var box = document.getElementById('box');
    box.firstChild.deleteData(0,3); //删除从0位置的3个字符
    box.firstChild.insertData(0,'hello'); //从0位置添加指定字符
    box.firstChild.replaceData(0,2,'Miss'); //从0位置替换掉2个指定字符
    alert(box.firstChild.substringData(0,2));  //从0位置获取2个字符，直接输出
    alert(box.firstChild.nodeValue);
    alert(box.firstChild);  //[object Comment]
    alert(box.firstChild.nodeType);  //8
    alert(box.firstChild.nodeValue);  //我是注释
    var c = document.getElementsByTagName('!');		//IE支持，其他不支持
	alert(c[1].nodeValue);
*/




window.onload = function () {

    var box = document.getElementById('box');
    alert(box.firstChild.nodeValue);  //我是注释
    var c = document.getElementsByTagName('!');		//IE支持，其他不支持
	alert(c[1].nodeValue);

}