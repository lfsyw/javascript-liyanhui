/*

    style获取行内的css大小
    var box = document.getElementById('box');
    alert(typeof box.style.width);
    alert(box.style.height);

    获取计算后的css大小，如果没有设置值，非IE会获取默认大小，IE会理解为0
    var box = document.getElementById('box');
    var style = window.getComputedStyle ? window.getComputedStyle(box, null) : null || box.currentStyle;
    alert(style.width);
    alert(style.height);

	使用CSSStyleSheet对象中的cssRules属性(rules)
	var sheet = document.styleSheets[0];
	var rule = (sheet.cssRules || sheet.rules)[0];
	alert(rule.style.width);
    alert(rule.style.height);
    
    以上三种都不能获取实际大小
    alert(box.clientWidth);
    alert(box.clientHeight);

    没有单位,但默认是px
    alert(typeof box.clientWidth);返回的数据类型是number，是数值，不是字符串了
    如果设置了其他单位，返回出来的结果还是会转换为px像素。
    边框和外边距，不算在clientwidth和clientHeight的实际大小里面。
    内边距会增加大小，二滚动条会减少实际大小，不把滚动条的大小算进去
    在没有内边距和滚动条的情况下，没有设置css大小，那么IE浏览器会理解为0





*/


window.onload = function () {
    var box = document.getElementById('box');
   

}