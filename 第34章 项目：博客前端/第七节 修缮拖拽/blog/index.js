//个人中心
$().getClass('m-member').hover(function () {
    $(this).css('background', 'url(./images/arrow2.png) no-repeat 55px center');
    $().getClass('u-member-list').show();

}, function () {
    $(this).css('background', 'url(./images/arrow.png) no-repeat 55px center');
    $().getClass('u-member-list').hide();
});

//登录框---动态判断高宽没有做
var login = $().getId('j-login');
var screen = $().getId('j-screen');
login.center(350,250).resize(function () {   
    if (login.css('display') == 'block') {
        screen.lock();
    }
});
$().getClass('login').click(function () {
    login.css('display','block');
    login.center(350,250);
    screen.lock();
});
$().getClass('j-close').click(function () {
    login.css('display', 'none');
    screen.unlock();
}); 

//拖拽
login.drag();
//var oDiv = document.getElementById('j-login');



/*
拖拽流程
1、先点下去
2、在点下去的物体被选中，进行move移动
3、抬起鼠标，停止移动
4、点击某个物体，用oDiv即可，move和up是全局区域，也就是整个文档通用，应该用document




*/
var kejian = document.getElementById('kejian');
kejian.scrollIntoView({ behavior: "smooth"});
