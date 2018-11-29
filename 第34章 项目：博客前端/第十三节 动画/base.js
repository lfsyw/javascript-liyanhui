
// 前台调用
var $ = function (args) {
    return new Base(args);
}

//基础库
function Base(args) {
    //创建一个数组，来保存获取的节点和节点数组
    this.elements = [];

    if (typeof args == 'string') {
        //css模拟
        if (args.indexOf(' ') != -1){
            var elements = args.split(' '); //把节点拆开，分别保存到数组里面
            var childElements = [];   //存放临时节点对象的数组，解决被覆盖的问题。
            var node = [];            //用来存放父节点
            for (var i = 0;i < elements.length;i++) {
                if (node.length == 0) node.push(document);		//如果默认没有父节点，就把document放入
                switch (elements[i].charAt(0)) {  //返回第0个位置的字符
                    case '#' :
                        childElements = [];   //清理掉临时节点，以便父节点失效，子节点有效
                        childElements.push(this.getId(elements[i].substring(1)));
                        node = childElements;  //保存父节点，因为childElements要清理，所以需要创建node数组
                        break;
                    case '.' :
                        childElements = [];
                        for (var j = 0;j < node.length; j++) {
                            var temps = this.getClass(elements[i].substring(1),node[j]);
                            for (var k = 0;k < temps.length; k++) {
                                childElements.push(temps[k]);
                            }
                        }
                        node = childElements; 
                        break;
                    default:
                        childElements = [];
                        for (var j = 0;j < node.length; j++) {
                            var temps = this.getTagName(elements[i],node[j]);
                            for (var k = 0;k < temps.length; k++) {
                                childElements.push(temps[k]);
                            }
                        }
                        node = childElements; 
                }
            }
            this.elements = childElements;
        } else {
            //find模拟
            switch (args.charAt(0)) {  //返回第0个位置的字符
                case '#' :
                    this.elements.push(this.getId(args.substring(1)));//截取第二个位置之后的所有字符串
                    break;
                case '.' :
                    this.elements = this.getClass(args.substring(1));
                    break;
                default:
                    this.elements = this.getTagName(args);
            }
        }
    } else if (typeof args == 'object') {
            if (args != undefined) { //_this是一个对象，undefined也是一个对象，区别于typeof返回的带单引号的'undefined'
            this.elements[0] = args;
        };
    } else if (typeof args == 'function'){
        this.ready(args);
    }

}

//addDomLoaded
Base.prototype.ready = function (fn) {
    addDomLoaded(fn);
}

//获取ID节点
Base.prototype.getId = function (id) {
    return document.getElementById(id);
}

//获取元素节点数组
Base.prototype.getTagName = function (tag, parentNode) {
    var node = null;
	var temps = [];
	if (parentNode != undefined) {
		node = parentNode;
	} else {
		node = document;
    }
    
    var tags = node.getElementsByTagName(tag);
    for (var i = 0; i < tags.length; i++) {
        temps.push(tags[i]);
    }
    return temps;
}
//获取CLASS节点数组
Base.prototype.getClass = function (className, parentNode) {
    //处理class重复问题
    var node = null;  
    var temps = [];
    if (parentNode != undefined) {
        node = parentNode;
    } else {
        node = document;
    }
    
    var all = node.getElementsByTagName('*');
    for (var i = 0; i < all.length; i++) {
        if (all[i].className == className) {
            temps.push(all[i]);
        }
    }
    return temps;
}

//设置CSS选择器子节点
Base.prototype.find = function (str) {
    var childElements = [];
    for (var i = 0; i < this.elements.length; i++) {
        switch (str.charAt(0)) {  
            case '#' :
                childElements.push(this.getId(str.substring(1)));
                break;
            case '.' :
                var temps = this.getClass(str.substring(1),this.elements[i]);
                for (var j = 0; j < temps.length; j++) {
                    if (temps[j].className == str.substring(1)) {
                        childElements.push(temps[j]);
                    }
                }
                break;
            default:
                var temps = this.getTagName(str, this.elements[i]);
                for (var j = 0; j < temps.length; j++) {
                    childElements.push(temps[j]);
                }
        }
    }
    this.elements = childElements;
    return this;
}

//获取某一个节点,并返回这个节点对象
Base.prototype.ge = function (num) {
    return this.elements[num];
}

//获取首个节点，并返回这个节点对象
Base.prototype.first = function () {
	return this.elements[0];
};
//获取末个节点，并返回这个节点对象
Base.prototype.last = function () {
	return this.elements[this.elements.length - 1];
};
//获取某一个节点，并返回Base对象
Base.prototype.eq = function (num) {
    var element = this.elements[num];
    this.elements = [];
	this.elements[0] = element;
	return this;
}

//设置CSS
Base.prototype.css = function (attr, value) {
    for (var i = 0; i < this.elements.length; i++) {
        if (arguments.length == 1) {
            return getStyle(this.elements[i], attr);
        }
        this.elements[i].style[attr] = value;
    }
    return this;
}

//添加Class
Base.prototype.addClass = function (className) {
    for (var i = 0; i < this.elements.length; i++) {
        if (!hasClass(this.elements[i], className)) {
            this.elements[i].className += ' ' + className;
        }
    }
    return this;
}
//移除Class
Base.prototype.removeClass = function (className) {
    for (var i = 0; i < this.elements.length; i++) {
        if (hasClass(this.elements[i], className)) {
            this.elements[i].className = this.elements[i].className.replace(new RegExp('(\\s|^)' + className + '(\\s|$)'), ' ');
        }
    }
    return this;
}

//添加link或style的CSS规则
Base.prototype.addRule = function (num, selectorText, cssText, position) {
    var sheet = document.styleSheets[num];
    insertRule(sheet, selectorText, cssText, position);
    return this;
}

//移除link或style的CSS规则
Base.prototype.removeRule = function (num, index) {
    var sheet = document.styleSheets[num];
    deleteRule(sheet, index);
    return this;
}

//设置innerHtml
Base.prototype.html = function (str) {
    for (var i = 0; i < this.elements.length; i++) {
        if (arguments.length == 0) {
            return this.elements[i].innerHTML;
        }
        this.elements[i].innerHTML = str;
    }
    return this;
}

//触发点击事件
Base.prototype.click = function (fn) {
    for (var i = 0; i < this.elements.length; i++) {
        this.elements[i].onclick = fn;
    }
    return this;
}

//设置鼠标移入移除方法
Base.prototype.hover = function (over, out) {
    for (var i = 0; i < this.elements.length; i++) {
        addEvent(this.elements[i],'mouseover', over);
        addEvent(this.elements[i],'mouseout', out);
    }
    return this;
}

//设置显示
Base.prototype.show = function () {
    for (var i = 0; i < this.elements.length; i++) {
        this.elements[i].style.display = 'block';
    }
    return this;
}

//设置显示
Base.prototype.hide = function () {
    for (var i = 0; i < this.elements.length; i++) {
        this.elements[i].style.display = 'none';
    }
    return this;
}


//设置物体居中
Base.prototype.center = function (width, height) {
    var top = (getInner().height - width) / 2;
    var left = (getInner().width - height) / 2;
    for (var i = 0; i < this.elements.length; i++) {
        this.elements[i].style.top = top + 'px';
        this.elements[i].style.left = left + 'px';
    }
    return this;
}

//触发浏览器窗口事件
Base.prototype.resize = function (fn) {
    for (var i = 0; i < this.elements.length; i++) {
        var element = this.elements[i];
        addEvent(window,'resize',function () {
            fn();
            if (element.offsetLeft > getInner().width - element.offsetWidth) {
                element.style.left = getInner().width - element.offsetWidth + 'px';
            }
            if (element.offsetTop > getInner().height - element.offsetHeight) {
				element.style.top = getInner().height - element.offsetHeight + 'px';
			}
        });
    }
    return this;
}

//锁屏功能
Base.prototype.lock = function () {
    for (var i = 0; i < this.elements.length; i++) {
        this.elements[i].style.width = getInner().width + 'px';
        this.elements[i].style.height = getInner().height + 'px';
        this.elements[i].style.display = 'block';
        document.documentElement.style.overflow = 'hidden';
        addEvent(window,'scroll',scrollTop);

    }
    return this;
}
Base.prototype.unlock = function () {
    for (var i = 0; i < this.elements.length; i++) {
        this.elements[i].style.display = 'none';
        document.documentElement.style.overflow = 'auto';
        removeEvent(window,'scroll',scrollTop);
    }
    return this;
}

//设置动画
Base.prototype.animate = function (obj) {
    for (var i = 0; i < this.elements.length; i++) {
        var element = this.elements[i];
        var attr =  obj['attr'] == 'x' ? 'left' : 
                    obj['attr'] == 'y' ? 'top' :                   
                    obj['attr'] == 'w' ? 'width' :
                    obj['attr'] == 'h' ? 'height' : 
                    obj['attr'] == 'o' ? 'opacity' : 'left' ;                            //可选，left和top，width和height值，不传递默认为left
        
        var start = obj['start'] != undefined ? obj['start'] : 
                    attr == 'opacity' ? parseFloat(getStyle(element,attr)) * 100 :
                                        parseInt(getStyle(element,attr));   
        
        var t = obj['t'] != undefined ? obj['t'] : 50;                                 //可选，默认是50毫秒执行一次
        var step = obj['step'] != undefined ? obj['step'] : 10;		                   //可选，每次运行10像素

        var speed = obj['speed'] != undefined ? obj['speed'] : 6;                           //可选，默认缓冲速度为6
        var type = obj['type'] == 0 ? 'constant' : obj['type'] == 1 ? 'buffer' : 'buffer';  //可选，0表示匀速，1表示缓冲，默认缓冲
        
        var alter = obj['alert'];     //增量
        var target = obj['target'];    //目标量

		if (alter != undefined && target == undefined) {
			target = alter + start;    //增量，运行的目标点
		} else if (alter == undefined && target == undefined) {
			throw new Error('alter增量或target目标量必须传一个！');
		}

        if (start > target) step = -step;

        if (attr == 'opacity') {
            element.style.opacity = start /100;
            element.style.filter = 'alpha(opacity='+ start +')';
        } else {
            element.style[attr] = start + 'px';
        }

       //alert(start);

        clearInterval(window.timer);
        timer =setInterval(function () {

            if (type == 'buffer') {
                step = attr == 'opacity' ? (target - parseFloat(getStyle(element, attr)) * 100) / speed :
                                            (target - parseInt(getStyle(element, attr))) / speed ;
				step = step > 0 ? Math.ceil(step) : Math.floor(step);   
			}

            //如果放在else后面，会慢一拍，先执行303，然后50毫秒再执行300，所以会后退一下
            //如果放在if前面，到达303的时候，同时剪到300，这个时候就看不出来减去的过程
            //element.style[attr] = getStyle(element,attr) + step + 'px';  


            /*
			getStyle(element, attr) 303
			getStyle(element, attr) >= target
			element.style[attr] = target + 'px'; 300px 剪到300

			getStyle(element, attr) 296
			element.style[attr] = target + 'px'; 300px 加到300


			296 - target = 296 - 300 = -4

			Math.abs(-4) = 4 < step  = 4 < 7 = true
			element.style[attr] = target + 'px'; 300px 加到300
			这样的话，就是296 直接到 300的过程，不需要跳到303了


			289 - 300 = abs(-11) 11 < 7 = false
            */
            if (attr == 'opacity') {
                
                if (step == 0) {
                    setOpacity()
                } else if (step > 0 && Math.abs(parseFloat(getStyle(element,attr)) * 100 -target) <= step) { 
                    setOpacity()  
                } else if (step < 0 && (parseFloat(getStyle(element,attr)) * 100 -target) <= Math.abs(step)){
                    setOpacity()
                } else {
                    var temp = element.style.opacity = parseFloat(getStyle(element, attr)) * 100;
                    element.style.opacity = parseInt(temp + step) / 100;
                    element.style.filter = 'alpha(opacity'+ parseInt(temp + step) +')';
                }
                

            }
            else {
                if (step == 0) {
                    setTarget();
                } else if (step > 0 && Math.abs(parseInt(getStyle(element,attr))-target) <= step) { 
                    setTarget();  
                } else if (step < 0 && (parseInt(getStyle(element,attr))-target) <= Math.abs(step)){
                    setTarget();
                } else {
                    //放在else永远不会和停止运动同时执行，就不会出现303同时剪到300的问题
                    //但是会出现不同时剪到300的问题，导致突兀
                    element.style[attr] = parseInt(getStyle(element,attr)) + step + 'px';  
                }
            } 
          // document.getElementById('aaa').innerHTML += getStyle(element,attr) + '</br>';
        }, t);

        function setTarget() {
            element.style[attr] = target + 'px';
            clearInterval(timer);
        }
        function setOpacity() {
            element.style.opacity = parseInt(target) /100;
            element.style.filter = 'alpha(opacity'+ parseInt(target) +')';
            clearInterval(timer);
        }
    }
    return this;
}

//插件入口
Base.prototype.extend = function (name,fn) {
    Base.prototype[name] = fn;
}

