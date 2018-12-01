/*
$(function () {
    alert();
});
*/
//个人中心
$('.g-header .m-member').hover(function () {
    $(this).css('background', 'url(./images/arrow2.png) no-repeat 55px center');
    $('.g-header .u-member-list').show().animate({
        t: 30,
        step: 10,
        mul : {
            o : 100,
            h : 120
        }

    });

}, function () {
    $(this).css('background', 'url(./images/arrow.png) no-repeat 55px center');
    $('.g-header .u-member-list').animate({
        t : 30,
        step : 10,
        mul : {
            o : 0,
            h : 0
        },
        fn : function() {
            $('.g-header .u-member-list').hide();
        } 
    });
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
    screen.lock().animate({
        attr: 'o',
        target: 30,
        t : 30,
        step: 10
    });
});
$('j-login .j-close').click(function () {
    login.css('display', 'none');
    //先执行渐变动画，动画完毕后再执行关闭unlock
    screen.animate({
        attr: 'o',
        target: 0,
        t : 30,
        step: 10,
        fn: function () {
            screen.unlock();
        }
    });
}); 


//拖拽
login.drag($('#j-login h2').last());

//百度分享初始化位置
$('#share').css('top',getScroll().top + (getInner().height - parseInt(getStyle($('#share').first(),'height'))) / 2 + 'px');
// 滚动条事件
addEvent(window,'scroll',function () {
    $('#share').animate ({
        attr : 'y',
        target : getScroll().top + (getInner().height - parseInt(getStyle($('#share').first(),'height'))) / 2,
        t : 10
    });   
});
//百度分享收缩的效果
$('#share').hover(function () {
    $(this).animate({
        attr: 'x',
        target : 0
    }); 
},function () {
    $(this).animate({
        attr: 'x',
        target: -211
    });
});

//滑动导航
$('.g-nav .about li').hover(function () {
    var target = $(this).first().offsetLeft;
    $('.g-nav .nav_bg').animate({
        attr : 'x',
        target : target + 20,
        t : 30,
        step : 10,
        fn : function () {
            $('#nav .white').animate({
                attr : 'x',
                target : -target
            });
        }
    });
},function () {
    $('.g-nav .nav_bg').animate({
        attr : 'x',
        target : 20,
        t : 30,
        step : 10,
        fn : function () {
            $('#nav .white').animate({
                attr : 'x',
                target : 0
            });
        }
    });
});





