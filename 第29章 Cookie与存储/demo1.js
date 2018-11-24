/*
alert(typeof document.cookie);  //string

向本地磁盘写入cookie
document.cookie = 'user = 李炎恢';
alert(document.cookie);

PS：本地不存在域名，所以域就为空；



编码问题
document.cookie = 'user=' + encodeURIComponent('李炎恢');   //这个已经写入磁盘了，所以不要这句也可以获取cookie
alert(decodeURIComponent(document.cookie));

过期时间，就是到了这个时间点，就会自动清理cookie
在会话结束时，就是关闭浏览器后自动清理cookie了

当火狐浏览器关闭后，火狐的cookie被删除了，
但不影响其他浏览器的cookie，因为每个浏览器都各自保存了自己的cookie，不通用一个cookie


完整形式
document.cookie = 'user=值; [expires=失效时间; path=路径访问; domain=域名访问; secure=安全的https限制通信]'

*/

var date = new Date();
// alert(data);
date.setDate((data.getDate() + 7));
document.cookie = 'user=' + encodeURIComponent('李炎恢') + '; expires=' + Date;