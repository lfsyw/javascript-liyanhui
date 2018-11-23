/*

    获取form对象的方法
    var fm = document.getElementById('myForm');
    var fm = document.getElementsByTagName('form')[0];
    var fm = document.forms[0];  //HTML DOM通过0下标获取
    var fm = document.forms['yourForm'];  //html dom 通过name值获取 
    var fm = document.yourForm;  //向下兼容的方法，不推荐使用

    submit事件触发的一些问题
    阻止提交
    addEvent(fm,'submit',function(evt){
        preDef(evt);
    });
    PS:submit事件，用传统的方式：fm.onsubmit = function() {};
    fm.onsubmit = function(evt) {
        preDef(evt);
    }
    疑问：submit事件，为什么要用form对象来触发呢？为什么不能使input中的submit按钮触发呢？
    var sub = document.getElementById('sub');
    addEvent(sub,'submit',function(evt){
        preDef(evt);
    });

    PS: 把submit事件注册到input中的submit按钮，是无法触发submit事件的。
    PS: 必须把submit事件绑定到form对象上，才可以触发submit事件
    PS：只不过触发submit事件的流程是点击input中的submit按钮而已。

    addEvent(fm,'submit',function(){
        alert(1);
    });
    addEvent(sub,'click',function(){
        alert(1);
    });

    使用fm.submit()让非submit按钮实现提交
    var button = document.getElementById('button');
    addEvent(button,'click',function() {
        fm.submit();
    });
	var strong = document.getElementsByTagName('strong')[0];
	addEvent(strong, 'click', function () {
		fm.submit();				
	});


    使用ctrl+enter实现提交
    var fm = document.getElementById('myForm');
    addEvent(fm,'submit',function(evt){  //阻止submit提交
        preDef(evt);
    });
    addEvent(document,'keydown',function(evt){   //ctrl+enter提交
        var e = evt || window.event;
        if (e.ctrlKey && e.keyCode == 13) fm.submit();
    });






*/

window.onload = function () {
    var fm = document.getElementById('myForm');
    addEvent(fm,'submit',function(evt){
        preDef(evt);
    });
    
    addEvent(document,'keydown',function(evt){
        var e = evt || window.event;
        if (e.keyCode == 13) fm.submit();
    });

}   