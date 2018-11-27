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
login.drag([$().getTagName('h2').getElement(0)]);




