







/*


$(function () {
    var box = document.getElementById('box');
    // alert(box);
    //alert(getStyle(box,'left'));

    setInterval(() => {
        box.style.left = getStyle(box,'left') + 1 + 'px'
    }, 50);
});
*/
$(function () {
	$('#button').click(function () {
        $('#box').animate({
            attr: 'x',
            alter : 50,
            step : 7,
            speed : 10,   
        });
    });
});