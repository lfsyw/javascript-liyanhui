//设置动画
$().extend('animate',function (obj) {
    for (var i = 0; i < this.elements.length; i++) {
        var element = this.elements[i];
        var attr = obj['attr'] == 'x' ? 'left' :
            obj['attr'] == 'y' ? 'top' :
            obj['attr'] == 'w' ? 'width' :
            obj['attr'] == 'h' ? 'height' :
            obj['attr'] == 'o' ? 'opacity' : 'left'; //可选，left和top，width和height值，不传递默认为left

        var start = obj['start'] != undefined ? obj['start'] :
            attr == 'opacity' ? parseFloat(getStyle(element, attr)) * 100 :
            parseInt(getStyle(element, attr));

        var t = obj['t'] != undefined ? obj['t'] : 10; //可选，默认是50毫秒执行一次
        var step = obj['step'] != undefined ? obj['step'] : 20; //可选，每次运行10像素

        var speed = obj['speed'] != undefined ? obj['speed'] : 6; //可选，默认缓冲速度为6
        var type = obj['type'] == 0 ? 'constant' : obj['type'] == 1 ? 'buffer' : 'buffer'; //可选，0表示匀速，1表示缓冲，默认缓冲

        var alter = obj['alert']; //增量
        var target = obj['target']; //目标量

        if (alter != undefined && target == undefined) {
            target = alter + start; //增量，运行的目标点
        } else if (alter == undefined && target == undefined) {
            throw new Error('alter增量或target目标量必须传一个！');
        }

        if (start > target) step = -step;

        if (attr == 'opacity') {
            element.style.opacity = start / 100;
            element.style.filter = 'alpha(opacity=' + start + ')';
        } else {
            element.style[attr] = start + 'px';
        }
        clearInterval(window.timer);
        timer = setInterval(function () {
            if (type == 'buffer') {
                step = attr == 'opacity' ? (target - parseFloat(getStyle(element, attr)) * 100) / speed :
                    (target - parseInt(getStyle(element, attr))) / speed;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
            }
            if (attr == 'opacity') {

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


            } else {
                if (step == 0) {
                    setTarget();
                } else if (step > 0 && Math.abs(parseInt(getStyle(element, attr)) - target) <= step) {
                    setTarget();
                } else if (step < 0 && (parseInt(getStyle(element, attr)) - target) <= Math.abs(step)) {
                    setTarget();
                } else {
                    element.style[attr] = parseInt(getStyle(element, attr)) + step + 'px';
                }
            }
        }, t);

        function setTarget() {
            element.style[attr] = target + 'px';
            clearInterval(timer);
        }

        function setOpacity() {
            element.style.opacity = parseInt(target) / 100;
            element.style.filter = 'alpha(opacity' + parseInt(target) + ')';
            clearInterval(timer);
        }
    }
    return this;
});
