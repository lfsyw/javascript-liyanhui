//设置动画
$().extend('animate',function (obj) {
    for (var i = 0; i < this.elements.length; i++) {
        var element = this.elements[i];
        var attr = obj['attr'] == 'x' ? 'left' :
            obj['attr'] == 'y' ? 'top' :
            obj['attr'] == 'w' ? 'width' :
            obj['attr'] == 'h' ? 'height' :
            obj['attr'] == 'o' ? 'opacity' :
            obj['attr'] != undefined ? obj['attr'] : 'left'; //可选，left和top，width和height值，不传递默认为left

        var start = obj['start'] != undefined ? obj['start'] :
            attr == 'opacity' ? parseFloat(getStyle(element, attr)) * 100 :
            parseInt(getStyle(element, attr));

        var t = obj['t'] != undefined ? obj['t'] : 10; //可选，默认是50毫秒执行一次
        var step = obj['step'] != undefined ? obj['step'] : 20; //可选，每次运行10像素

        var speed = obj['speed'] != undefined ? obj['speed'] : 6; //可选，默认缓冲速度为6
        var type = obj['type'] == 0 ? 'constant' : obj['type'] == 1 ? 'buffer' : 'buffer'; //可选，0表示匀速，1表示缓冲，默认缓冲

        var alter = obj['alert']; //增量
        var target = obj['target']; //目标量
        var mul = obj['mul'];

        if (alter != undefined && target == undefined) {
            target = alter + start; //增量，运行的目标点
        } else if (alter == undefined && target == undefined && mul == undefined) {
            throw new Error('alter增量或target目标量必须传一个！');
        }

        if (start > target) step = -step;

        if (attr == 'opacity') {
            element.style.opacity = start / 100;
            element.style.filter = 'alpha(opacity=' + start + ')';
        } else {
            //element.style[attr] = start + 'px';
        }

    
        if (mul == undefined) {
            mul = {};
            mul[attr] = target;
        }


        clearInterval(element.timer);
        element.timer = setInterval(function () {
            /*
                问题1： 多个动画执行了多个列队动画，我们要求不管多少个动画只执行一个列队动画
                问题2： 多个动画数值差别太大，导致动画无法执行到目标值，原因是定时器提前清理掉了

                解决1: 不管多少个动画，只提供一次列队动画的机会
                解决2： 多个动画按最后一个分动画执行完毕后再清理即可
            */
            //创建一个布尔值，这个值可以了解多个动画是否全部执行完毕
            var flag = true ; //表示都执行完毕了


            for (var i in mul) {
                attr =  i == 'x' ? 'left' : 
                        i == 'y' ? 'top' : 
                        i == 'w' ? 'width' :
                        i == 'h' ? 'height' :
                        i == 'o' ? 'opacity' :
                        i != undefined ? i : 'left';

                target = mul[i];
           
                if (type == 'buffer') {
                    step = attr == 'opacity' ? (target - parseFloat(getStyle(element, attr)) * 100) / speed :
                        (target - parseInt(getStyle(element, attr))) / speed;
                    step = step > 0 ? Math.ceil(step) : Math.floor(step);
                }
                if (attr == 'opacity') {  //透明度动画
                    if (step == 0) {
                        setOpacity()
                    } else if (step > 0 && Math.abs(parseFloat(getStyle(element, attr)) * 100 - target) <= step) {
                        setOpacity()
                    } else if (step < 0 && (parseFloat(getStyle(element, attr)) * 100 - target) <= Math.abs(step)) {
                        setOpacity()
                    } else {
                        var temp = element.style.opacity = parseFloat(getStyle(element, attr)) * 100;
                        element.style.opacity = parseInt(temp + step) / 100;
                        element.style.filter = 'alpha(opacity' + parseInt(temp + step) + ')';
                    }
                    if (parseInt(target) != parseInt(parseFloat(getStyle(element, attr)) * 100)) flag =false;

                } else {  //运动动画
                    if (step == 0) {
                        setTarget();
                    } else if (step > 0 && Math.abs(parseInt(getStyle(element, attr)) - target) <= step) {
                        setTarget();
                    } else if (step < 0 && (parseInt(getStyle(element, attr)) - target) <= Math.abs(step)) {
                        setTarget();
                    } else {
                        element.style[attr] = parseInt(getStyle(element, attr)) + step + 'px';
                    }
                    if (parseInt(target) != parseInt(getStyle(element, attr))) flag = false;
                   
                }
                //document.getElementById('test').innerHTML += i +'--' + parseInt(target) + '--'+parseInt(getStyle(element, attr))+ '--'+ flag +'<br />';
            }

            if (flag) {
                clearInterval(element.timer);
                if (obj.fn != undefined) obj.fn();
            }
        }, t);



        function setTarget() {
            element.style[attr] = target + 'px';
        }

        function setOpacity() {
            element.style.opacity = parseInt(target) / 100;
            element.style.filter = 'alpha(opacity' + parseInt(target) + ')';
        }
    }
    return this;
});
