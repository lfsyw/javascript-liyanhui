/*
$(function () {
    alert();
});
*/
//个人中心
$('.g-header .m-member').hover(function () {
    $(this).css('background', 'url(./images/arrow2.png) no-repeat 55px center');
    $('.g-header .u-member-list').show();

}, function () {
    $(this).css('background', 'url(./images/arrow.png) no-repeat 55px center');
    $('.g-header .u-member-list').hide();
});

//登录框---动态判断高宽没有做
var login = $('#j-login');
var screen = $('#j-screen');
login.center(350,250).resize(function () {   
    if (login.css('display') == 'block') {
        screen.lock();
    }
});
$('.login').click(function () {
    login.css('display','block');
    login.center(350,250);
    screen.lock();
});
$('j-login .j-close').click(function () {
    login.css('display', 'none');
    screen.unlock();
}); 


//拖拽
login.drag($('#j-login h2').last());




