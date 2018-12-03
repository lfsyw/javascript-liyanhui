







$(function () {
    $('#button').toggle(function(){
        $('#box').css('background','blue');
    },function(){
        $('#box').css('background','red');
    },function(){
        $('#box').css('background','green');
    });
});