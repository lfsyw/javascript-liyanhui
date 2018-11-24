/*

    try-catch的意义
    1.可以通过修改代码来排错的，不需要使用try-catch
    2.浏览器兼容性问题，可以通过判断浏览器或者 判断是否支持某个属性或方法来判断，不需要try-catch

    比如，无法修改代码的情况下，可能会发生错误，这个时候用try-catch，网路中断了


try {
    new 10;
} catch (e) {
    if(e instanceof TypeError) {
        throw new TypeError('类型错误：实例化new的时候，可能产生了错误！');
    } else {
        alert(e);			//这种行为叫做处理错误，浏览器不报错了，因为处理掉了，屏蔽了错误显示
        throw new Error('未知错误！');
    }
}


new 10;   //浏览器自己抛出了错误

错误事件

addEvent(window,'error',function () {
    alert('程序发生了错误');
});

new 10;  //写在后面

<img src="buy.gif" onerror="alert('图片加载失败！')" />


相等和全等
alert(1 == '1');  //true,相等对的是值，类型不用比较
alert(1 === '1');  //false,全等还需要比较类型

alert(1 == true);  //true,1 会隐式转换为布尔值，true == true
alert(1 === true); //false,1 本身是数值，true本身是布尔值

PS：在类型不相等的情况下，建议使用全等 ===


var box = 10;
if (box) {    //10转换成布尔值是true，0转换为布尔值是false
    alert(box); 
}

PS：如果box是数值，就打印出它的值
var box = 0;
if (typeof box == 'number') {
    alert(box);    
}

ps：typeof box返回的是类型的字符串，右边呢，'number'本身就是字符串，所以用相等就够了，因为相等比全等要快，不需要比较类型
PS：类型是一样的，就没有必要用全等了


function getQuerystring(url) {
	if (typeof url == 'string') {
		var pos = url.indexOf('?');
		return pos;
	} else {
		return '数据类型错误！';
	}
}

alert(getQuerystring('demo2.html?id=5'));
alert(getQuerystring('sdfdsf'));

function sortArry(arr) {
    if (typeof arr.sort == 'function'){   //因为数组有sort方法，只要判断sort方法是否存在，就可以确定它是数组
        arr.sort();
        arr.reverser();
        return arr;
    }else {
        return '数据出错！';
    }

}
var box = {
	sort : function () {
		
	}
};
alert(sortArray(box));


ps：如果我模拟了数组的sort方法的对象，就能绕过判断
PS：typeof arr.sort == 'function'判断还会导致两个错误,null，模拟sort方法的对象

function sortArry(arr) {
    if (arr instanceof Array){   
        arr.sort();
        arr.reverser();
        return arr;
    }else {
        return '数据出错！';
    }

}

var box = null;
//var box = [3,1,5]
alert(sortArry(box));


*/

alert('?user=' + encodeURI('李炎恢'));

var url = '?user=' + encodeURIComponent('李炎恢') + '&age=100';	//编码
alert(url);