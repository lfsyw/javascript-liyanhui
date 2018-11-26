/*

函数式
function $(id) {
    return document.getElementById();
}






*/


var Base = {
    getId : function(id) {
        return document.getElementById(id);
    } ,
    getName : function(name) {
        return document.getElementsByName(name);
    },
    getTagName : function(tag) {
        return document.getElementsByTagName(tag);
    }
}