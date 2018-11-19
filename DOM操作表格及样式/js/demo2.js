/*
    DOM对css的能力检测，IE上并不精确

    alert(document.implementation.hasFeature('css','2.0'));
    alert(document.implementation.hasFeature('css2','2.0'));
    alert(document.implementation.hasFeature('css3','2.0'));
    alert(document.implementation.hasFeature('HTML', '1.0'));

    行内、内联、链接
    行内：就是在标签里的style属性添加样式
    内联：就是<style>标签里书写的样式
    链接：就是通过<link href>标签链接到的样式

    使用行内style获取属性
    var box = document.getElementById('box');
    alert(box.style); //[object CSSStyleDeclaration]对象
    alert(box.style.color);
    alert(box.style.fontSize);  //把-号去掉，后面的字符大写
    alert(box.style.background);
    alert(box.style.cssFloat); //非IE浏览器对关键字保留字的用法
    alert(box.style.styleFloat); //IE浏览器的调用方式
    alert(box.style.cssFloat || box.style.styleFloat);  //跨浏览器兼容

    使用行内style设置属性
    box.style.color = 'red';
	box.style.fontSize = '20px';
	box.style.background = '#ccc';
	box.style.cssFloat = 'right';
	box.style.styleFloat = 'right';
	typeof box.style.cssFloat != 'undefined' ? box.style.cssFloat = 'right' : box.style.styleFloat = 'right';

	DOM2级为style提供了一些属性方法

    alert(box.style.cssText);  //查看css文本
    alert(box.style.length);
    box.style.setProperty('color','blue');
    box.style.removeProperty('color');

	alert(box.style.color);			//style属性只能获取和设置行内，不能获取内联和链接


    var style = window.getComputedStyle(box,null); // 用于获取计算样式的Element。该属性是兼容火狐谷歌,不兼容IE
    alert(style.color); //计算后的样式，一般表示默认样式和设置后的样式

    var style = box.currentStyle; //该属性只兼容IE,不兼容火狐和谷歌
    alert(style.color);

	var style = window.getComputedStyle ? window.getComputedStyle(box, null) : null || box.currentStyle;
	alert(style.fontSize);
	alert(style.border);	//复合型属性就无法获取了
	
	alert(style.borderTopColor);
	
	border这个属性被计算后就不存在了
	
	alert(box.style.border);


	计算样式的获取，不仅仅可以获取没有设置的默认样式，也可以获取行内，内联和链接
	为什么可以获取内联和链接呢？
	因为不管你在那里设置CSS，最终会驻留在浏览器的计算样式里


*/

window.onload = function () {
    var box = document.getElementById('box');







}