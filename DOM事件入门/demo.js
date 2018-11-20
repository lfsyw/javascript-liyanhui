/*


	1、内联模型，onclick是事件处理函数
	<input type="button" value="按钮" onclick="alert('Lee');"  />
	<input type="button" value="按钮" onclick="box();"  />
	
	function box() {		//如果放在一个匿名函数里面，就看不到了
		alert('Lee');
	};

    2、脚本模型
    
    对象.事件处理函数 = 函数名或者匿名函数
    input.onclick = function () {
        alert('lee');
    };

    PS：让事件处理函数执行一个函数的时候，通过赋值方式，那么直接将函数名赋值给事件处理函数即可。
    PS：也就是说input.onclick = box;如果加上了括号就自动执行了，没有完成赋值input.onclick = box();

    input.onclick = box;  //赋值不能加括号，加括号自动执行
    function box() {
      alert('lee');  
    };
    PS：可以放在外面，也可以和input同级

    3、鼠标事件

    单击
    input.onclick = function () {
        alert('lee')
    }
    双击
    input.ondblclick = function () {
        alert('Lee');
    }
    按下鼠标
    input.onmousedown = function () {
        alert('Lee');
    }
    鼠标按键松开时（按键松开）
    input.onmouseup = function () {
        alert('Lee');
    }
	鼠标移到某元素之上（鼠标移入）
    input.onmouseover = function () {
        alert('Lee');
    }
    鼠标从某元素移开。(鼠标移出)
    input.onmouseout = function () {
        alert('Lee');
    }
    鼠标被移动（鼠标指针移到指定的元素后执行）
    input.onmousemove = function () {
        alert('Lee');
    }

    4、键盘事件
    某个键盘按键被按下。
    onkeydown = function () {
        alert('Lee');
    }
    某个键盘按键被按下并松开。
    onkeypress = function () {
        alert('Lee');
    }
	某个键盘按键被松开。
    onkeyup = function () {
		alert('Lee');
    };
    
    5、HTML事件
    当页面完全加载后在window上面触发
    window.onload = function () {
        alert('Lee');
    };
    当页面完全卸载后在window上面触发
    window.onunload = function () {
    alert('Lee');
    }
    当用户选择文本框(input或textarea)中的一个或多个字符触发
    window.onselect = function () {
    alert('Lee');
    }
    当文本框(input或textarea)内容改变且失去焦点后触发。
    window.onchange = function () {
    alert('Lee');
    }
    当页面或者元素获得焦点时在window及相关元素上面触发。
    input.onfocus = function () {
        alert('Lee');
    }
    当页面或元素失去焦点时在window及相关元素上触发。
    input.onblur = function () {
        alert('Lee');
    }
    当用户点击提交按钮在<form>元素上触发。
    var form = document.getElementsByTagName('form')[0];
    form.onsubmit = function () {
        alert('Lee');
    }
    reset：当用户点击重置按钮在<form>元素上触发。
    form.onreset= function () {
		alert('Lee');
	};
    resize：当窗口或框架的大小变化时在window或框架上触发。
	window.onresize = function () {
		alert('Lee');
	};

    scroll：当用户滚动带滚动条的元素时触发。
        window.onscroll = function () {
            alert('Lee');
        };

*/


window.onload = function () {
    var input = document.getElementsByTagName('input')[0];
    var form = document.getElementsByTagName('form')[0];
    // onscroll = function () {
    //     alert('Lee');
    // }

}

