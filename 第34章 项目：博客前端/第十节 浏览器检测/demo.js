




/*
(function getState() {    //闭包
    alert(' ');
})();

*/




(function () {
    
    window.sys = {};              //让外部可以访问，保存浏览器信息对象
    var ua  = navigator.userAgent.toLowerCase();  //获取浏览器信息字符串
    var s;                        //浏览器信息数组，浏览器名称+版本
    //alert(ua);
   //alert(ua.match(/msie ([\d.]+)/));   //msie 7.0,7.0
   //alert(ua.match(/firefox\/([\d.]+)/));  //firefox/63.0,63.0
   //alert(ua.match(/chrome\/([\d.]+)/));  //chrome/69.0.3497.92,69.0.3497.92
   //alert(ua.match(/opr\/([\d.]+)/));   //opr/56.0.3051.116,56.0.3051.116
   //alert(ua.match(/safari\/([\d.]+)/)); 
   //alert(ua.match(/version\/([\d.]+).*safari/));
   
   
/*  
    if ((/msie ([\d.]+)/).test(ua)) {    //IE浏览器
        s = ua.match(/msie ([\d.]+)/);
        sys.ie = s[1];
    }
    if ((/firefox\/([\d.]+)/).test(ua)) {   //火狐浏览器
        s = ua.match(/firefox\/([\d.]+)/);
        sys.firefox = s[1];
    }
    if ((/chrome\/([\d.]+)/).test(ua)) {    //谷歌浏览器
        s = ua.match(/chrome\/([\d.]+)/);
        sys.chrome = s[1];
    } 
    if ((/opr\/([\d.]+)/).test(ua)) {        //欧朋浏览器,新版不好判断
        s = ua.match(/opr\/([\d.]+)/);   
        sys.opera = s[1];
    }
    if ((/version\/([\d.]+).*safari/).test(ua)) {     //苹果浏览器
        s = ua.match(/version\/([\d.]+).*safari/);
        sys.safari = s[1];
    }
*/

    (s = ua.match(/msie ([\d.]+)/)) ? sys.ie = s[1] :
    (s = ua.match(/firefox\/([\d.]+)/)) ? sys.firefox = s[1] :
    (s = ua.match(/chrome\/([\d.]+)/)) ? sys.chrome = s[1] :
    (s = ua.match(/opr\/([\d.]+)/)) ? sys.opera = s[1] :
    (s = ua.match(/version\/([\d.]+).*safari/)) ? sys.safari = s[1] : 0;

})();

alert(sys.safari);




//三元
//true ? s=1 : 0;
// (s=1) ? b=1 : (s=2) ? b=2 : (s=3) ? b=3 : 0;
// alert(b);