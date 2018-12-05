
//个人中心
$('.g-header .m-member').hover(function () {
    $(this).css('background', 'url(./images/arrow2.png) no-repeat 55px center');
    $('.g-header .u-member-list').show().animate({
        t: 30,
        step: 10,
        mul: {
            o: 100,
            h: 120
        }

    });

}, function () {
    $(this).css('background', 'url(./images/arrow.png) no-repeat 55px center');
    $('.g-header .u-member-list').animate({
        t: 30,
        step: 10,
        mul: {
            o: 0,
            h: 0
        },
        fn: function () {
            $('.g-header .u-member-list').hide();
        }
    });
});

//登录框---动态判断高宽没有做
var login = $('#j-login');
var screen = $('#j-screen');
login.center(350, 250).resize(function () {
    if (login.css('display') == 'block') {
        screen.lock();
    }
});
$('.login').click(function () {
    login.css('display', 'block');
    login.center(350, 250);
    screen.lock().animate({
        attr: 'o',
        target: 30,
        t: 30,
        step: 10
    });
});
$('#j-login .j-close').click(function () {
    login.css('display', 'none');
    //先执行渐变动画，动画完毕后再执行关闭unlock
    screen.animate({
        attr: 'o',
        target: 0,
        t: 30,
        step: 10,
        fn: function () {
            screen.unlock();
        }
    });
});
//注册框
var reg = $('#j-reg');
reg.center(600, 550).resize(function () {
    if (reg.css('display') == 'block') {
        screen.lock();
    }
});
$('.reg').click(function () {
    reg.css('display','block');
    reg.center(600, 550);
    screen.lock().animate({
        attr: 'o',
        target: 30,
        t: 30,
        step: 10
    });
});
$('#j-reg .j-close').click(function () {
    reg.css('display', 'none');
    //先执行渐变动画，动画完毕后再执行关闭unlock
    screen.animate({
        attr: 'o',
        target: 0,
        t: 30,
        step: 10,
        fn: function () {
            screen.unlock();
        }
    });
});
//拖拽
login.drag($('#j-login h2').last());
$('#j-reg').drag($('#j-reg h2').last());
//百度分享初始化位置
$('#share').css('top', getScroll().top + (getInner().height - parseInt(getStyle($('#share').first(), 'height'))) / 2 + 'px');
// 滚动条事件
$(window).bind('scroll', function () {
   setTimeout(function () {
    $('#share').animate({
        attr: 'y',
        target: getScroll().top + (getInner().height - parseInt(getStyle($('#share').first(), 'height'))) / 2,
        t: 10
    });
   }, 100);
})

//百度分享收缩的效果
$('#share').hover(function () {
    $(this).animate({
        attr: 'x',
        target: 0
    });
}, function () {
    $(this).animate({
        attr: 'x',
        target: -211
    });
});

//滑动导航
$('.g-nav .about li').hover(function () {
    var target = $(this).first().offsetLeft;
    $('.g-nav .nav_bg').animate({
        attr: 'x',
        target: target + 20,
        t: 30,
        step: 10,
        fn: function () {
            $('#nav .white').animate({
                attr: 'x',
                target: -target
            });
        }
    });
}, function () {
    $('.g-nav .nav_bg').animate({
        attr: 'x',
        target: 20,
        t: 30,
        step: 10,
        fn: function () {
            $('#nav .white').animate({
                attr: 'x',
                target: 0
            });
        }
    });
});

//左侧菜单栏
$('.g-sidebar h2').toggle(function () {
    $(this).next().animate({
        mul: {
            h: 0,
            o: 0
        }
    });
}, function () {
    $(this).next().animate({
        mul: {
            h: 150,
            o: 100
        }
    });
});

//表单验证

//初始化表单操作
$('form').first().reset();

$('form').form('user').bind('focus', function () {
    $('#j-reg .info_user').css('display', 'block');
    $('#j-reg .error_user').css('display', 'none');
    $('#j-reg .succ_user').css('display', 'none');
}).bind('blur', function () {
    if (trim($(this).value()) == '') {
        $('#j-reg .info_user').css('display', 'none');
        $('#j-reg .error_user').css('display', 'none');
        $('#j-reg .succ_user').css('display', 'none');
    } else if (!check_user()) {
        $('#j-reg .error_user').css('display', 'block');
        $('#j-reg .info_user').css('display', 'none');
        $('#j-reg .succ_user').css('display', 'none');
    } else {
        $('#j-reg .succ_user').css('display', 'block');
        $('#j-reg .error_user').css('display', 'none');
        $('#j-reg .info_user').css('display', 'none');
    }
});

function check_user() {
    if (/[\w]{2,20}/.test(trim($('form').form('user').value()))) return true;
}

//密码验证
$('form').form('pass').bind('focus', function () { //获得焦点
    $('#j-reg .info_pass').css('display', 'block');
    $('#j-reg .error_pass').css('display', 'none');
    $('#j-reg .succ_pass').css('display', 'none');
}).bind('blur', function () { //失去焦点
    if (trim($(this).value()) == '') { //空
        $('#j-reg .info_pass').css('display', 'none');
        $('#j-reg .error_pass').css('display', 'none');
        $('#j-reg .succ_pass').css('display', 'none');
    } else {
        if (check_pass()) { //正确
            $('#j-reg .info_pass').css('display', 'none');
            $('#j-reg .error_pass').css('display', 'none');
            $('#j-reg .succ_pass').css('display', 'block');
        } else { //错误
            $('#j-reg .info_pass').css('display', 'none');
            $('#j-reg .error_pass').css('display', 'block');
            $('#j-reg .succ_pass').css('display', 'none');
        }
    }
});

//密码强度验证
$('form').form('pass').bind('keyup', function () {
    check_pass();

});
//密码验证函数
function check_pass() {
    var value = trim($('form').form('pass').value());
    var value_length = value.length;
    var code_length = 0;


    //第一个必须条件的验证6-20位之间
    if (value_length >= 6 && value_length <= 20) {
        $('#j-reg .info_pass .q1').html('●').css('color', '#008000');
    } else {
        $('#j-reg .info_pass .q1').html('○').css('color', '#666');
    }
    //第二个必须条件的验证，字母或数字或非空字符，任意一个即可
    if (value_length > 0 && !/\s/.test(value)) {
        $('#reg .info_pass .q2').html('●').css('color', '#008000');
    } else {
        $('#reg .info_pass .q2').html('○').css('color', '#666');
    }
    //第三个必须条件的验证，大写字母，小写字母，数字，非空字符 任意两种混拼即可
    if (/[\d]/.test(value)) {
        code_length++;
    }

    if (/[a-z]/.test(value)) {
        code_length++;
    }

    if (/[A-Z]/.test(value)) {
        code_length++;
    }

    if (/[^\w]/.test(value)) {
        code_length++;
    }
    if (code_length >= 2) {
        $('#reg .info_pass .q3').html('●').css('color', '#008000');
    } else {
        $('#reg .info_pass .q3').html('○').css('color', '#666');
    };

    //安全级别
    /*
        高：大于等于10个字符，三种不同类别的字符混拼
        中：大于等于8个字符，两种不同类别的字符混拼
        低：大于等于1个字符。
        无：没有字符
        判断的时候务必要从高到低判断，防止高级别无法执行
    */
    if (value_length >= 10 && code_length >= 3) {
        $('#reg .info_pass .s1').css('color', '#008000');
        $('#reg .info_pass .s2').css('color', '#008000');
        $('#reg .info_pass .s3').css('color', '#008000');
        $('#reg .info_pass .s4').html('高').css('color', '#008000');
    } else if (value_length >= 8 && code_length >= 2) {
        $('#reg .info_pass .s1').css('color', '#f60');
        $('#reg .info_pass .s2').css('color', '#f60');
        $('#reg .info_pass .s3').css('color', '#ccc');
        $('#reg .info_pass .s4').html('中').css('color', '#f60');
    } else if (value_length >= 1) {
        $('#reg .info_pass .s1').css('color', '#800000');
        $('#reg .info_pass .s2').css('color', '#ccc');
        $('#reg .info_pass .s3').css('color', '#ccc');
        $('#reg .info_pass .s4').html('低').css('color', '#800000');
    } else {
        $('#reg .info_pass .s1').css('color', '#ccc');
        $('#reg .info_pass .s2').css('color', '#ccc');
        $('#reg .info_pass .s3').css('color', '#ccc');
        $('#reg .info_pass .s4').html(' ');
    }

    if (value_length >= 6 && value_length <= 20 && !/\s/.test(value) && code_length >= 2) {
        return true;
    } else {
        return false;
    }
}

//密码确认
$('form').form('notpass').bind('focus', function () { //获得焦点
    $('#j-reg .info_notpass').css('display', 'block');
    $('#j-reg .error_notpass').css('display', 'none');
    $('#j-reg .succ_notpass').css('display', 'none');
}).bind('blur', function () {
    if (trim($(this).value()) == '') { //空
        $('#j-reg .info_notpass').css('display', 'none');
        $('#j-reg .error_notpass').css('display', 'none');
        $('#j-reg .succ_notpass').css('display', 'none');
    } else if (check_notpass()) {
        $('#j-reg .info_notpass').css('display', 'none');
        $('#j-reg .error_notpass').css('display', 'none');
        $('#j-reg .succ_notpass').css('display', 'block');
    } else {
        $('#j-reg .info_notpass').css('display', 'none');
        $('#j-reg .error_notpass').css('display', 'block');
        $('#j-reg .succ_notpass').css('display', 'none');
    }
});

function check_notpass() {
    if (trim($('form').form('notpass').value()) == trim($('form').form('pass').value())) {
        return true;
    }
}

//提问
$('form').form('ques').bind('change', function () {
    if (check_ques()) $('#j-reg .error_ques').css('display', 'none');
});

function check_ques() {
    if($('form').form('ques').value() != 0) return true;
}

//回答
$('form').form('ans').bind('focus', function () {
    $('#j-reg .info_ans').css('display', 'block');
    $('#j-reg .error_ans').css('display', 'none');
    $('#j-reg .succ_ans').css('display', 'none');
}).bind('blur', function () {
    if (trim($(this).value()) == '') {
        $('#j-reg .info_ans').css('display', 'none');
    } else if (check_ans()) {
        $('#j-reg .info_ans').css('display', 'none');
        $('#j-reg .error_ans').css('display', 'none');
        $('#j-reg .succ_ans').css('display', 'block');
    } else {
        $('#j-reg .info_ans').css('display', 'none');
        $('#j-reg .error_ans').css('display', 'block');
        $('#j-reg .succ_ans').css('display', 'none');
    }
});

function check_ans() {
    if (trim($('form').form('ans').value()).length >= 2 && trim($('form').form('ans').value()).length <= 32) {
        return true;
    }
}

//电子邮件
/*
邮件名： a-zA-Z0-9_-
域名：a-zA-Z0-9_-
域名后缀： a-zA-Z
后缀种类： .com, .net, .cn, .asia, .mobi, .com.cn, .net.cn

*/
$('form').form('email').bind('focus', function () {

    //补全界面
    $('#j-reg .all_email').css('display', 'block');

    $('#j-reg .info_email').css('display', 'block');
    $('#j-reg .error_email').css('display', 'none');
    $('#j-reg .succ_email').css('display', 'none');
}).bind('blur', function () {

    //补全界面
    $('#j-reg .all_email').css('display', 'none');

    if (trim($(this).value()) == '') {
        $('#j-reg .info_email').css('display', 'none');
    } else if (check_email()) {
        $('#j-reg .info_email').css('display', 'none');
        $('#j-reg .error_email').css('display', 'none');
        $('#j-reg .succ_email').css('display', 'block');
    } else {
        $('#j-reg .info_email').css('display', 'none');
        $('#j-reg .error_email').css('display', 'block');
        $('#j-reg .succ_email').css('display', 'none');
    }
});

function check_email() {
    if (/^[\w\-\.]+@[\w\-]+(\.[a-zA-Z]{2,4}){1,2}$/.test(trim($('form').form('email').value()))) return true;
}

//电子邮件补全系统键入功能
$('form').form('email').bind('keyup', function (event) {
    if (this.value.indexOf('@') == -1) {
        $('#j-reg .all_email').css('display', 'block');
        $('#j-reg .all_email li span').html(this.value);
    } else {
        $('#j-reg .all_email').css('display', 'none')
    }

    $('#j-reg .all_email li').css('background', 'none');
    $('#j-reg .all_email li').css('color', '#666');
    if (event.keyCode == 40) {
        if (this.index == undefined || this.index >= $('#j-reg .all_email li').length() - 1) {
            this.index = 0;
        } else {
            this.index++;
        }
        $('#j-reg .all_email li').eq(this.index).css('background', '#e5edf2');
        $('#j-reg .all_email li').eq(this.index).css('color', '#369');
    }
    if (event.keyCode == 38) {
        if (this.index == undefined || this.index <= 0) {
            this.index = $('#j-reg .all_email li').length() - 1;
        } else {
            this.index--;
        }
        $('#j-reg .all_email li').eq(this.index).css('background', '#e5edf2');
        $('#j-reg .all_email li').eq(this.index).css('color', '#369');
    }

    if (event.keyCode == 13) {
        $(this).value($('#reg .all_email li').eq(this.index).text());
        $('#reg .all_email').css('display', 'none');
        this.index = undefined;
    }
});

//电子邮件补全系统点击获取
//PS: click事件是点击弹起后出发的，而blur失去了焦点后，没有点击弹起元素，导致无法触发
$('#j-reg .all_email li').bind('mousedown', function () {
    $('form').form('email').value($(this).text());
});


//电子邮件补全系统鼠标移入移出效果
$('#j-reg .all_email li').hover(function () {
    $(this).css('background', '#e5edf2');
    $(this).css('color', '#369');
}, function () {
    $(this).css('background', 'none');
    $(this).css('color', '#666');
});

//年 月 日
var year = $('form').form('year');
var month = $('form').form('month');
var day = $('form').form('day');

var day30 = [4, 6, 9, 11];
var day31 = [1, 3, 5, 7, 8, 10, 12];

//注入年
for (var i = 1950; i <= 2013; i++) {
    year.first().add(new Option(i, i), undefined)
}
//注入月
for (var i = 1; i <= 12; i++) {
    month.first().add(new Option(i, i), undefined);
}

year.bind('change', select_day);
month.bind('change', select_day);

day.bind('change', function () {
    if (check_birthday()) $('#j-reg .error_birthday').css('display', 'none');
});
function check_birthday() {
    if (year.value() != 0 && month.value() != 0 && day.value() != 0 ) return true;
}

function select_day() {
    if (year.value() != 0 && month.value() != 0) {

        //清理之前的注入
        day.first().options.length = 1;

        //不确定的日
        var cur_day = 0;
        //注入日
        if (inArray(day31, parseInt(month.value()))) {
            cur_day = 31;
        } else if (inArray(day30, parseInt(month.value()))) {
            cur_day = 30;
        } else {
            if ((parseInt(year.value()) % 4 == 0 && parseInt(year.value()) % 100 != 0) || parseInt(year.value()) % 400 == 0) {
                cur_day = 29;
            } else {
                cur_day = 28;
            }
        }
        for (var i = 1; i <= cur_day; i++) {
            day.first().add(new Option(i, i), undefined);
        }

    } else {
        //清理之前的注入
        day.first().options.length = 1;
    }
}

//备注
$('form').form('ps').bind('keyup', check_ps).bind('paste', function () {
    //粘贴事件会在内容粘贴到文本框之前触发
    setTimeout(check_ps, 50);
});

//清尾
$('#j-reg .clear').click(function () {
    $('form').form('ps').value($('form').form('ps').value().substring(0, 5));
    check_ps();
});

function check_ps() {
    var num = 200 - $('form').form('ps').value().length;
    if (num >= 0) {
        $('#j-reg .ps').eq(0).css('display', 'block');
        $('#j-reg .num').eq(0).html(num);
        $('#j-reg .ps').eq(1).css('display', 'none');
        return true;
    } else {
        $('#j-reg .ps').eq(0).css('display', 'none');
        $('#j-reg .num').eq(1).html(Math.abs(num)).css('color', '#ff0000');
        $('#j-reg .ps').eq(1).css('display', 'block');
        return false;
    }
}

//提交
$('form').form('sub').click(function () {
    var flag = true;

    if (!check_user()) {
        $('#j-reg .error_user').css('display', 'block');
        flag = false;
    }

    if (!check_pass()) {
        $('#j-reg .error_pass').css('display', 'block');
        flag = false;
    }

    if (!check_notpass()) {
        $('#j-reg .error_notpass').css('display', 'block');
        flag = false;
    }
    if (!check_ques()) {
        $('#j-reg .error_ques').css('display', 'block');
        flag = false;
    }
    if (!check_ans()) {
        $('#j-reg .error_ans').css('display', 'block');
        flag = false;
    }
    if (!check_email()) {
        $('#j-reg .error_email').css('display', 'block');
        flag = false;
    }
    if (!check_birthday()) {
        $('#j-reg .error_birthday').css('display', 'block');
        flag = false;
    }
    if (!check_ps()) {
        flag = false;
    }
    if (flag) {
        $('form').first().submit();
    }

});



//轮播器初始化
//$('.g-banner img').css('display','none');
//$('.g-banner img').eq(0).css('display','block');
$('.g-banner img').opacity(0);
$('.g-banner img').eq(0).opacity(100);
$('.g-banner ul li').eq(0).css('color','#000');
$('.g-banner strong').html($('.g-banner img').eq(0).attr('alt'));

//轮播器计数器
var banner_index = 1;

//轮播器的种类
var banner_type = 1;

//自动轮播器
var banner_timer = setInterval(banner_fn, 3000);

//手动轮播器
$('.g-banner ul li').hover(function () {
    clearInterval(banner_timer);

    if ($(this).css('color') != 'rgb(51, 51, 51)' && $(this).css('color') != '#333') { //如果是非选定状态
        banner(this,banner_index == 0 ? $('.g-banner ul li').length() - 1 : banner_index - 1);
    }
   
}, function () {
    banner_index = $(this).index() + 1;
    banner_timer = setInterval(banner_fn, 3000);
});

function banner(obj,prev) {

    $('.g-banner ul li').css('color', '#999');
    $(obj).css('color', '#333');
    $('.g-banner strong').html($('.g-banner img').eq($(obj).index()).attr('alt'));

    if (banner_type == 1) {
        $('.g-banner img').eq(prev).animate({
            attr : 'o',
            target : 100,
            t : 30,
            step : 10
        }).css('zIndex',1);
        $('.g-banner img').eq($(obj).index()).animate({
            attr : 'o',
            target : 100,
            t : 30,
            step : 10
        }).css('zIndex',2);
    } else if (banner_type == 2) {
        $('.g-banner img').eq(prev).animate({
            attr : 'y',
            target : 150,
            t : 30,
            step : 10
        }).css('zIndex',1).opacity(100);
        $('.g-banner img').eq($(obj).index()).animate({
            attr : 'y',
            target : 0,
            t : 30,
            step : 10
        }).css('top','-150px').css('zIndex',2).opacity(100);
    }

}

function banner_fn() {
    if (banner_index >= $('.g-banner ul li').length()) banner_index = 0;
    banner($('.g-banner ul li').eq(banner_index).first(),banner_index == 0 ? $('.g-banner ul li').length() - 1 : banner_index - 1);
    banner_index++;
}


//图片延迟加载，
//问题1：将data-src地址替换到src中去
//当图片进入可见区域的时候，将图片的data-src地址替换到src即可

//alert($('.wait_load').eq(0).attr('data-src'));

//$('.wait_load').eq(0).attr('src',$('.wait_load').eq(0).attr('data-src'));

//问题2：获取图片元素到最外层顶点元素的距离
//alert(offsetTop($('.wait_load').first()));

//问题3：获取页面可视区域的最低点的位置
//alert(getInner().height+getScroll().top);
var wait_load =$('.wait_load'); 
wait_load.opacity(0);
$(window).bind('scroll',function () {
    setTimeout(function () {
        for (var i = 0;i < wait_load.length(); i ++) {
            var _this = wait_load.ge(i);
            if (getInner().height + getScroll().top >= offsetTop(_this)) {
                $(_this).animate({
                    attr : 'o',
                    target : 100,
                    t : 30,
                    step : 10
                }).attr('src', $(_this).attr('data-src'));
            }   
        }
    },100);
});