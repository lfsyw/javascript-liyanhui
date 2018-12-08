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
    login.show();
    login.center(350, 250);
    screen.lock().animate({
        attr: 'o',
        target: 30,
        t: 30,
        step: 10
    });
});
$('#j-login .j-close').click(function () {
    login.hide();
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
    reg.show();
    reg.center(600, 550);
    screen.lock().animate({
        attr: 'o',
        target: 30,
        t: 30,
        step: 10
    });
});
$('#j-reg .j-close').click(function () {
    reg.hide();
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
$('form').eq(0).first().reset();

$('form').eq(0).form('user').bind('focus', function () {
    $('#j-reg .info_user').show();
    $('#j-reg .error_user').hide();
    $('#j-reg .succ_user').hide();
}).bind('blur', function () {
    if (trim($(this).value()) == '') {
        $('#j-reg .info_user').hide();
        $('#j-reg .error_user').hide();
        $('#j-reg .succ_user').hide();
    } else if (!check_user()) {
        $('#j-reg .error_user').show();
        $('#j-reg .info_user').hide();
        $('#j-reg .succ_user').hide();
    } else {
        $('#j-reg .succ_user').show();
        $('#j-reg .error_user').hide();
        $('#j-reg .info_user').hide();
    }
});

function check_user() {
    var flag = true;
    if (!/[\w]{2,20}/.test(trim($('form').eq(0).form('user').value()))) {
        $('#j-reg .error_user').html('输入不合法，请重新输入！');
        return false;
    } else {
        $('#j-reg .info_user').hide();
        $('#j-reg .loading').show();
        ajax({
            method: 'post',
            url: 'is_user.php',
            data: $('form').eq(0).serialize(),
            success: function (text) {
                if (text == 1) {
                    $('#j-reg .error_user').html('用户名被占用！');
                    flag = false;
                } else {
                    flag = true;
                }
                $('#j-reg .loading').hide();
            },
            async: false
        });
    }
    return flag;
}

//密码验证
$('form').eq(0).form('pass').bind('focus', function () { //获得焦点
    $('#j-reg .info_pass').show();
    $('#j-reg .error_pass').hide();
    $('#j-reg .succ_pass').hide();
}).bind('blur', function () { //失去焦点
    if (trim($(this).value()) == '') { //空
        $('#j-reg .info_pass').hide();
        $('#j-reg .error_pass').hide();
        $('#j-reg .succ_pass').hide();
    } else {
        if (check_pass()) { //正确
            $('#j-reg .info_pass').hide();
            $('#j-reg .error_pass').hide();
            $('#j-reg .succ_pass').show();
        } else { //错误
            $('#j-reg .info_pass').hide();
            $('#j-reg .error_pass').show();
            $('#j-reg .succ_pass').hide();
        }
    }
});

//密码强度验证
$('form').eq(0).form('pass').bind('keyup', function () {
    check_pass();

});
//密码验证函数
function check_pass() {
    var value = trim($('form').eq(0).form('pass').value());
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
        $('#j-reg .info_pass .q2').html('●').css('color', '#008000');
    } else {
        $('#j-reg .info_pass .q2').html('○').css('color', '#666');
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
        $('#j-reg .info_pass .q3').html('●').css('color', '#008000');
    } else {
        $('#j-reg .info_pass .q3').html('○').css('color', '#666');
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
        $('#j-reg .info_pass .s1').css('color', '#008000');
        $('#j-reg .info_pass .s2').css('color', '#008000');
        $('#j-reg .info_pass .s3').css('color', '#008000');
        $('#j-reg .info_pass .s4').html('高').css('color', '#008000');
    } else if (value_length >= 8 && code_length >= 2) {
        $('#j-reg .info_pass .s1').css('color', '#f60');
        $('#j-reg .info_pass .s2').css('color', '#f60');
        $('#j-reg .info_pass .s3').css('color', '#ccc');
        $('#j-reg .info_pass .s4').html('中').css('color', '#f60');
    } else if (value_length >= 1) {
        $('#j-reg .info_pass .s1').css('color', '#800000');
        $('#j-reg .info_pass .s2').css('color', '#ccc');
        $('#j-reg .info_pass .s3').css('color', '#ccc');
        $('#j-reg .info_pass .s4').html('低').css('color', '#800000');
    } else {
        $('#j-reg .info_pass .s1').css('color', '#ccc');
        $('#j-reg .info_pass .s2').css('color', '#ccc');
        $('#j-reg .info_pass .s3').css('color', '#ccc');
        $('#j-reg .info_pass .s4').html(' ');
    }

    if (value_length >= 6 && value_length <= 20 && !/\s/.test(value) && code_length >= 2) {
        return true;
    } else {
        return false;
    }
}

//密码确认
$('form').eq(0).form('notpass').bind('focus', function () { //获得焦点
    $('#j-reg .info_notpass').show();
    $('#j-reg .error_notpass').hide();
    $('#j-reg .succ_notpass').hide();
}).bind('blur', function () {
    if (trim($(this).value()) == '') { //空
        $('#j-reg .info_notpass').hide();
        $('#j-reg .error_notpass').hide();
        $('#j-reg .succ_notpass').hide();
    } else if (check_notpass()) {
        $('#j-reg .info_notpass').hide();
        $('#j-reg .error_notpass').hide();
        $('#j-reg .succ_notpass').show();
    } else {
        $('#j-reg .info_notpass').hide();
        $('#j-reg .error_notpass').show();
        $('#j-reg .succ_notpass').hide();
    }
});

function check_notpass() {
    if (trim($('form').eq(0).form('notpass').value()) == trim($('form').eq(0).form('pass').value())) {
        return true;
    }
}

//提问
$('form').eq(0).form('ques').bind('change', function () {
    if (check_ques()) $('#j-reg .error_ques').hide();
});

function check_ques() {
    if ($('form').eq(0).form('ques').value() != 0) return true;
}

//回答
$('form').eq(0).form('ans').bind('focus', function () {
    $('#j-reg .info_ans').show();
    $('#j-reg .error_ans').hide();
    $('#j-reg .succ_ans').hide();
}).bind('blur', function () {
    if (trim($(this).value()) == '') {
        $('#j-reg .info_ans').hide();
    } else if (check_ans()) {
        $('#j-reg .info_ans').hide();
        $('#j-reg .error_ans').hide();
        $('#j-reg .succ_ans').show();
    } else {
        $('#j-reg .info_ans').hide();
        $('#j-reg .error_ans').show();
        $('#j-reg .succ_ans').hide();
    }
});

function check_ans() {
    if (trim($('form').eq(0).form('ans').value()).length >= 2 && trim($('form').eq(0).form('ans').value()).length <= 32) {
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
$('form').eq(0).form('email').bind('focus', function () {

    //补全界面
    $('#j-reg .all_email').show();

    $('#j-reg .info_email').show();
    $('#j-reg .error_email').hide();
    $('#j-reg .succ_email').hide();
}).bind('blur', function () {

    //补全界面
    $('#j-reg .all_email').hide();

    if (trim($(this).value()) == '') {
        $('#j-reg .info_email').hide();
    } else if (check_email()) {
        $('#j-reg .info_email').hide();
        $('#j-reg .error_email').hide();
        $('#j-reg .succ_email').show();
    } else {
        $('#j-reg .info_email').hide();
        $('#j-reg .error_email').show();
        $('#j-reg .succ_email').hide();
    }
});

function check_email() {
    if (/^[\w\-\.]+@[\w\-]+(\.[a-zA-Z]{2,4}){1,2}$/.test(trim($('form').eq(0).form('email').value()))) return true;
}

//电子邮件补全系统键入功能
$('form').eq(0).form('email').bind('keyup', function (event) {
    if (this.value.indexOf('@') == -1) {
        $('#j-reg .all_email').show();
        $('#j-reg .all_email li span').html(this.value);
    } else {
        $('#j-reg .all_email').hide()
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
        $(this).value($('#j-reg .all_email li').eq(this.index).text());
        $('#j-reg .all_email').hide();
        this.index = undefined;
    }
});

//电子邮件补全系统点击获取
//PS: click事件是点击弹起后出发的，而blur失去了焦点后，没有点击弹起元素，导致无法触发
$('#j-reg .all_email li').bind('mousedown', function () {
    $('form').eq(0).form('email').value($(this).text());
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
var year = $('form').eq(0).form('year');
var month = $('form').eq(0).form('month');
var day = $('form').eq(0).form('day');

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
    if (check_birthday()) $('#j-reg .error_birthday').hide();
});

function check_birthday() {
    if (year.value() != 0 && month.value() != 0 && day.value() != 0) return true;
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
$('form').eq(0).form('ps').bind('keyup', check_ps).bind('paste', function () {
    //粘贴事件会在内容粘贴到文本框之前触发
    setTimeout(check_ps, 50);
});

//清尾
$('#j-reg .clear').click(function () {
    $('form').eq(0).form('ps').value($('form').eq(0).form('ps').value().substring(0, 5));
    check_ps();
});

function check_ps() {
    var num = 200 - $('form').eq(0).form('ps').value().length;
    if (num >= 0) {
        $('#j-reg .ps').eq(0).show();
        $('#j-reg .num').eq(0).html(num);
        $('#j-reg .ps').eq(1).hide();
        return true;
    } else {
        $('#j-reg .ps').eq(0).hide();
        $('#j-reg .num').eq(1).html(Math.abs(num)).css('color', '#ff0000');
        $('#j-reg .ps').eq(1).show();
        return false;
    }
}

//提交
$('form').eq(0).form('sub').click(function () {
    var flag = true;

    if (!check_user()) {
        $('#j-reg .error_user').show();
        flag = false;
    }

    if (!check_pass()) {
        $('#j-reg .error_pass').show();
        flag = false;
    }

    if (!check_notpass()) {
        $('#j-reg .error_notpass').show();
        flag = false;
    }
    if (!check_ques()) {
        $('#j-reg .error_ques').show();
        flag = false;
    }
    if (!check_ans()) {
        $('#j-reg .error_ans').show();
        flag = false;
    }
    if (!check_email()) {
        $('#j-reg .error_email').show();
        flag = false;
    }
    if (!check_birthday()) {
        $('#j-reg .error_birthday').show();
        flag = false;
    }
    if (!check_ps()) {
        flag = false;
    }
    if (flag) {
        var _this = this;
        $('#loading').show().center(200, 40);
        $('#loading p').html('正在提交注册中....');
        _this.disabled = true;
        $(_this).css('backgroundPosition', 'right');
        ajax({
            method: 'post',
            url: 'add.php',
            data: $('form').eq(0).serialize(),
            success: function (text) {
                if (text == 1) {
                    $('#loading').hide();
                    $('#success').show().center(200, 40);
                    $('#success p').html('注册成功，请登录');
                    setTimeout(function () {
                        $('#success').hide();
                        reg.hide();
                        $('#j-reg .succ').hide();
                        $('#j-reg .ps .num').html('200');
                        $('form').eq(0).first().reset();
                        _this.disabled = false;
                        $(_this).css('backgroundPosition', 'left');

                        screen.animate({
                            attr: 'o',
                            target: 0,
                            t: 30,
                            step: 10,
                            fn: function () {
                                screen.unlock();
                            }
                        });
                    }, 1500);
                };
            },
            async: true
        });
    }


    //alert($('form').eq(0).eq(0).serialize())
});

/*
function serialize(form) {
    var parts = {};
    for(var i = 0;i < form.elements.length;i ++) {
        var filed = form.elements[i];
        switch (filed.type) {
            case undefined :
            case 'submit' :
            case 'reset' :
            case 'reset' :
            case 'button' :
              break;
            case 'radio' :
            case 'checkbox' :
              if (!filed.selected) break;
            case 'select-one' :
            case 'select-multiple' :
              for (var j = 0;j < filed.options.length;j++) {
                  var option = filed.options[j];
                  if (option.selected) {
                      var optValue = '';
                      if (option.hasAttribute) {
                        optValue = (option.hasAttribute('value') ? option.value : option.text);
                      } else {
                        optValue = (option.attribute('value').specified ? option.value : option.text);
                      }
                      parts[filed.name] = optValue; 
                  }
              }
              break;
            default :
                parts[filed.name] = filed.value;
        }
    }
    return parts;
}
*/
//登录ajax
$('form').eq(1).form('sub').click(function () {
    if (/[\w]{2,20}/.test(trim($('form').eq(1).form('user').value())) && $('form').eq(1).form('pass').value().length >= 6) {
        var _this = this;
        $('#loading').show().center(200, 40);
        $('#loading p').html('正在尝试登录...');
        _this.disabled = true;
        $(_this).css('backgroundPosition', 'right');
        ajax({
            method: 'post',
            url: 'is_user.php',
            data: $('form').eq(1).serialize(),
            success: function (text) {
                $('#loading').hide();
                if (text == 0) { //失败
                    $('#j-login .info').html('登录失败：用户名或密码不合法!');
                } else { //成功
                    $('#login .info').html('');
                    $('#success').show().center(200, 40);
                    $('#success p').html('登录成功，请稍后...');
                    setCookie('user', trim($('form').eq(1).form('user').value()));
                    setTimeout(function () {
                        $('#success').hide();
                        login.hide();
                        $('form').eq(1).first().reset();
                        screen.animate({
                            attr: 'o',
                            target: 0,
                            t: 30,
                            step: 10,
                            fn: function () {
                                screen.unlock();
                            }
                        });
                        $('.g-header .reg').hide();
                        $('.g-header .login').hide();
                        $('.g-header .info').show().html(getCookie('user') + '，您好！');
                    }, 1500);
                }
            },
            async: true
        });
    } else {
        $('#j-login .info').html('登录失败：用户名或密码不合法!');
    }
});

//setCookie('user','张勇');
//alert(getCookie('user'));


//轮播器初始化
//$('.g-banner img').css('display','none');
//$('.g-banner img').eq(0).css('display','block');
$('.g-banner img').opacity(0);
$('.g-banner img').eq(0).opacity(100);
$('.g-banner ul li').eq(0).css('color', '#000');
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
        banner(this, banner_index == 0 ? $('.g-banner ul li').length() - 1 : banner_index - 1);
    }

}, function () {
    banner_index = $(this).index() + 1;
    banner_timer = setInterval(banner_fn, 3000);
});

function banner(obj, prev) {

    $('.g-banner ul li').css('color', '#999');
    $(obj).css('color', '#333');
    $('.g-banner strong').html($('.g-banner img').eq($(obj).index()).attr('alt'));

    if (banner_type == 1) {
        $('.g-banner img').eq(prev).animate({
            attr: 'o',
            target: 100,
            t: 30,
            step: 10
        }).css('zIndex', 1);
        $('.g-banner img').eq($(obj).index()).animate({
            attr: 'o',
            target: 100,
            t: 30,
            step: 10
        }).css('zIndex', 2);
    } else if (banner_type == 2) {
        $('.g-banner img').eq(prev).animate({
            attr: 'y',
            target: 150,
            t: 30,
            step: 10
        }).css('zIndex', 1).opacity(100);
        $('.g-banner img').eq($(obj).index()).animate({
            attr: 'y',
            target: 0,
            t: 30,
            step: 10
        }).css('top', '-150px').css('zIndex', 2).opacity(100);
    }

}

function banner_fn() {
    if (banner_index >= $('.g-banner ul li').length()) banner_index = 0;
    banner($('.g-banner ul li').eq(banner_index).first(), banner_index == 0 ? $('.g-banner ul li').length() - 1 : banner_index - 1);
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
var wait_load = $('.wait_load');
wait_load.opacity(0);
$(window).bind('scroll', _wait_load);
$(window).bind('resize', _wait_load);

function _wait_load() {
    setTimeout(function () {
        for (var i = 0; i < wait_load.length(); i++) {
            var _this = wait_load.ge(i);
            if (getInner().height + getScroll().top >= offsetTop(_this)) {
                $(_this).animate({
                    attr: 'o',
                    target: 100,
                    t: 30,
                    step: 10
                }).attr('src', $(_this).attr('data-src'));
            }
        }
    }, 100);
};

//图片弹窗
var photo_big = $('#photo_big');
photo_big.center(620, 510).resize(function () {
    if (photo_big.css('display') == 'block') {
        screen.lock();
    }
});
$('#g-photo .wait_load').click(function () {
    photo_big.center(620, 510).show();;
    screen.lock().animate({
        attr: 'o',
        target: 30,
        t: 30,
        step: 10
    });

    var temp_img = new Image(); //创建一个临时区域的图片对象

    $(temp_img).bind('load', function () {
        $('#photo_big .big img').attr('src', temp_img.src).animate({
            attr: 'o',
            target: 100,
            t: 30,
            step: 10
        }).css('width', '600px').css('height', '450px').css('top', 0).opacity(0);
    });

    temp_img.src = $(this).attr('bigSrc');

    var children = this.parentNode.parentNode;
    //alert($(children).index());

    prev_next_img(children);

});
$('#photo_big .j-close').click(function () {
    photo_big.hide();
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

    $('#photo_big .big img').attr('src', './images/wait_load.jpg').css('width', '32px').css('height', '32px').css('top', '190px');
});
//拖拽
photo_big.drag($('#photo_big h2').last());

//图片加载
// $('#photo_big .big img').attr('src', 'https://images.unsplash.com/photo-1422157245273-e08b638b4b00?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80').animate({
//     attr : 'o',
//     target : 100,
//     t : 30,
//     step : 10
// }).css('width', '600px').css('height', '450px').css('top', 0).opacity(0);

//问题1，loading的样式被大图的高和宽改变了
//问题2，动画的渐变效果没有出现

//创建一个临时的图片对象，用以保存图片
//alert($('#photo_big .big img').first());
//alert(new Image());
/*
var temp_img = new Image(); //创建一个临时区域的图片对象

$(temp_img).bind('load', function () {
    $('#photo_big .big img').attr('src', temp_img.src).animate({
        attr: 'o',
        target: 100,
        t: 30,
        step: 10
    }).css('width', '600px').css('height', '450px').css('top', 0).opacity(0);
});
//IE必须把src这个属性放在load事件的下面才有效
temp_img.src = 'https://images.unsplash.com/photo-1422360902398-0a91ff2c1a1f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjF9&auto=format&fit=crop&w=1016&q=80'; //src属性可以在后台加载这张图片到本地缓存
*/


//图片鼠标滑过
$('#photo_big .big .left').hover(function () {
    $('#photo_big .big .sl').animate({
        attr: 'o',
        target: 50,
        t: 30,
        step: 10
    });
}, function () {
    $('#photo_big .big .sl').animate({
        attr: 'o',
        target: 0,
        t: 30,
        step: 10
    });
});
$('#photo_big .big .right').hover(function () {
    $('#photo_big .big .sr').animate({
        attr: 'o',
        target: 50,
        t: 30,
        step: 10
    });
}, function () {
    $('#photo_big .big .sr').animate({
        attr: 'o',
        target: 0,
        t: 30,
        step: 10
    });
});

//图片上一张 
$('#photo_big .big .left').click(function () {
    var current_img = new Image();
    $(current_img).bind('load', function () {
        $('#photo_big .big img').attr('src', $(this).attr('src')).animate({
            attr: 'o',
            target: 100,
            t: 30,
            step: 10
        }).opacity(0).css('width', '600px').css('height', '450px').css('top', 0);
    });
    current_img.src = $(this).attr('src');
    var children = $('.g-photo dl dt img').ge(prevIndex($('#photo_big .big img').attr('index'), $('.g-photo').first())).parentNode.parentNode;
    prev_next_img(children);


});

//图片下一张
$('#photo_big .big .right').click(function () {

    $('#photo_big .big img').attr('src', $(this).attr('src')).animate({
        attr: 'o',
        target: 100,
        t: 30,
        step: 10
    }).opacity(0);
    var children = $('.g-photo dl dt img').ge(nextIndex($('#photo_big .big img').attr('index'), $('.g-photo').first())).parentNode.parentNode;
    prev_next_img(children);


});

function prev_next_img(children) {
    var prev = prevIndex($(children).index(), children.parentNode);
    var next = nextIndex($(children).index(), children.parentNode);

    var prev_img = new Image();
    var next_img = new Image();

    prev_img.src = $('.g-photo dl dt img').eq(prev).attr('bigSrc');
    next_img.src = $('.g-photo dl dt img').eq(next).attr('bigSrc');
    $('#photo_big .big .left').attr('src', prev_img.src);
    $('#photo_big .big .right').attr('src', next_img.src);
    $('#photo_big .big img').attr('index', $(children).index());
    $('#photo_big .big .index').html(parseInt($(children).index()) + 1 + '/' + $('.g-photo dl dt img').length());
}


//调用ajax
/*
$(document).click(function () {
    ajax({
        method : 'post',   //提交方式
        url : 'demo.php',   //数据地址
        data : {            //数据
            'name' : 'Lee',
            'age' : 100
        },
        success : function (text) {  //成功返回数据
            //alert(text);
        },
        async : true
    });
});
*/

//博客发文弹窗
var blog = $('#blog');
blog.center(580, 320).resize(function () {
    if (blog.css('display') == 'block') {
        screen.lock();
    }
});
$('.u-member-list .j-blog').click(function () {
    blog.show();
    blog.center(580, 320);
    screen.lock().animate({
        attr: 'o',
        target: 30,
        t: 30,
        step: 10
    });
});
$('#blog .j-close').click(function () {
    blog.hide();
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
$('#blog').drag($('#blog h2').last());

$('form').eq(2).form('sub').click(function () {
    if (trim($('form').eq(2).form('title').value()).length <= 0 || trim($('form').eq(2).form('title').value()).length <= 0) {
        $('#blog .info').html('发表失败： 标题或内容不得为空！');
    } else {
        var _this = this;
        $('#loading').show().center(200, 40);
        $('#loading p').html('正在发表博文...');
        _this.disabled = true;
        $(_this).css('backgroundPosition', 'right');
        ajax({
            method: 'post',
            url: 'add_blog.php',
            data: $('form').eq(2).serialize(),
            success: function (text) {
                $('#loading').hide();
                if (text == 1) {
                    $('#blog .info').html('');
                    $('#success').show().center(200, 40);
                    $('#success p').html('发表成功，请稍后...');
                    setTimeout(function () {
                        $('#success').hide();
                        $('#blog').hide();
                        $('form').eq(2).first().reset();
                        screen.animate({
                            attr: 'o',
                            target: 0,
                            t: 30,
                            step: 10,
                            fn: function () {
                                screen.unlock();
                                $('.g-index').html('<span class="loading"></span>');
                                $('.g-index .loading').show();
                                ajax({
                                    method: 'post',
                                    url: 'get_blog.php',
                                    data: {},
                                    success: function (res) {
                                        $('.g-index .loading').hide();
                                        var json = JSON.parse(res);
                                        var item = '';
                                        console.log(json);
                                        for (var i = 0; i < json.length; i++) {
                                            item += '<div class="content"><h2><em>' + json[i].date + '</em>' + json[i].title + '</h2><p>' + json[i].content + '</p></div>'
                                        }

                                        $('.g-index').html(item);
                                        for (var i = 0; i < json.length; i++) {
                                            $('#index .content').eq(i).animate({
                                                attr: 'o',
                                                target: 100,
                                                t: 30,
                                                step: 10
                                            });
                                        }
                                    },
                                    async: true
                                });
                            }
                        });
                        _this.disabled = false;
                        $(_this).css('backgroundPosition', 'left');
                    }, 1500);
                }
            },
            async: true
        });
    }
});

//获取博文列表
$('.g-index').html('<span class="loading"></span>');
$('.g-index .loading').show();
ajax({
    method: 'post',
    url: 'get_blog.php',
    data: {},
    success: function (res) {
        $('.g-index .loading').hide();
        var json = JSON.parse(res);
        var item = '';
        //console.log(json);
        for (var i = 0; i < json.length; i++) {
            item += '<div class="content"><h2><em>' + json[i].date + '</em>' + json[i].title + '</h2><p>' + json[i].content + '</p></div>'
        }

        $('.g-index').html(item);
        for (var i = 0; i < json.length; i++) {
            $('#index .content').eq(i).animate({
                attr: 'o',
                target: 100,
                t: 30,
                step: 10
            });
        }
    },
    async: true
});


//换肤功能
var skin = $('#skin');
skin.center(580, 320).resize(function () {
    if (skin.css('display') == 'block') {
        screen.lock();
    }
});
$('.u-member-list .j-skin').click(function () {
    skin.show();
    skin.center(580, 320);
    screen.lock().animate({
        attr: 'o',
        target: 30,
        t: 30,
        step: 10
    });
    $('#skin skin_bg').html('<span class="loading"></span>');
    ajax({
        method : 'post',   //提交方式
        url : 'get_skin.php',   //数据地址
        data : {
            'type' : 'all'
        },
        success : function (res) {  //成功返回数据
            //console.log(res)
            var json = JSON.parse(res);
            //console.log(json);
            var html = '';
            for (var i= 0;i < json.length; i++) {
                html += `<dl>
                <dt><img src="./images/${json[i].small_bg}" big-bg="${json[i].big_bg}" bg-color="${json[i].bg_color}" alt=""></dt>
                <dd>${json[i].bg_text}</dd>
            </dl>`
            }
            $('#skin .skin_bg').html(html).opacity(0).animate({
                attr : 'o',
                target: '100',
                t : 30,
                step : 10
            });
            $('#skin dl dt img').click(function () {
                $('body').css('background',$(this).attr('bg-color') + ' ' + 'url(./images/' + $(this).attr('big-bg') + ') repeat-x');
                //修改默认样式
                ajax({
                    method : 'post',
                    url : 'get_skin.php',
                    data : {
                        'type' : 'set',
                        'big_bg' : $(this).attr('big-bg')
                    },
                    success : function (text) {
                        $('#success').show().center(200, 40);
                        $('#success p').html('皮肤更换成功...');
                        setTimeout(function () {
                            $('#success').hide();
                        }, 1500);
                    },
                    async : true
                
                });
            
            });
        },
        async : true
    });

});
//默认显示背景样式
ajax({
    method : 'post',
    url : 'get_skin.php',
    data : {
        'type' : 'main'
    },
    success : function (text) {
        var json = JSON.parse(text);
        //console.log(json);
        $('body').css('background', json.bg_color + ' ' + 'url(images/' + json.big_bg + ') repeat-x');
    },
    async : true

});
$('#skin .j-close').click(function () {
    skin.hide();
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
$('#skin').drag($('#skin h2').last());

