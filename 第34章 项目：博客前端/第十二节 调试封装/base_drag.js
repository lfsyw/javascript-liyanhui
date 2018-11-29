$().extend('drag',function () {
    var tags = arguments;
    for (var i = 0; i < this.elements.length; i++) {
        //this.elements[i].onmousedown = function (e) {
        addEvent(this.elements[i],'mousedown',function (e) {
            //preDef(e);  //阻止默认行为 
            if (trim(this.innerHTML).length == 0) e.preventDefault();  //判断内容是否为空阻止默认行为
            var _this = this;
            var diffX = e.clientX - _this.offsetLeft; //点击的点到窗口左边的距离-div左边到窗口左边的距离=点击点到div左边的距离
            var diffY = e.clientY - _this.offsetTop;
            
            //自定义拖拽区
            var flag = false;

            for (var i= 0;i < tags.length;i++) {
                if (e.target == tags[i]) {
                    flag = true;  //只要有一个是true，就立刻返回
                    break;
                }
            }

           if (flag) {
                //document.onmousemove = function (e) {}
                addEvent(document,'mousemove',move);
                //document.onmouseup = function () {}
                addEvent(document,'mouseup',up);
           } else {
               removeEvent(document,'mousemove',move);
               removeEvent(document,'mouseup',up);
           }
            function move (e) {
                var left = e.clientX - diffX;
                var top = e.clientY - diffY;
    
                if (left < 0) {
                    left = 0;
                }else if (left >getInner().width - _this.offsetWidth) {
                    left = getInner().width - _this.offsetWidth;
                }
    
                if (top < 0) {
                    top = 0;
                } else if (top > getInner().height - _this.offsetHeight) {
                    top = getInner().height - _this.offsetHeight;
                }
                
                _this.style.left = left + 'px';  //点击之后动态获取点击点到窗口左边的距离
                _this.style.top = top + 'px';
    
                if (typeof _this.setCapture != 'undefined') {
                    _this.setCapture();
                } 
            }
            function up () {
                //this.onmousemove = null;
                removeEvent(document,'mousemove',move);
                // this.onmouseup = null;
                removeEvent(document,'mouseup',up);
                if (typeof _this.releaseCapture != 'undefined') {
                    _this.releaseCapture();
                }
            }
        
        });
    }
    return this;
}) ;

