







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
            'attr' : 'o',
            'start' : 30,
            'target': 100,
            'step' : 7, 
            'type' : 0,
        });
    });
});