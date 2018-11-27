








var button = document.getElementById('button');
addEvent(button,'click',fn1);
addEvent(document,'click',fn2)
//removeEvent(button,'click',fn1);
// removeEvent(button,'click',fn);
function fn1(e) {
    e.stopPropagation();
    alert(1+this.value+e.clientX);
}
function fn2(e) {
   //alert(document);
}
function fn3(e) {
    alert(3+this.value +e.clientX);
}
var a = document.getElementsByTagName('a')[0];
addEvent(a,'click',function (e) {
    //e.preventDefault();
})