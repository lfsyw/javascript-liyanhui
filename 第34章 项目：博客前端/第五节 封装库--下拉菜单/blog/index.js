/*



















*/

window.onload = function () {
   
    $().getClass('m-member').hover(function() {
        //$().getClass('m-member').css('background','url(./images/arrow2.png) no-repeat 55px center;');
        $(this).css('background', 'url(./images/arrow2.png) no-repeat 55px center');
       $().getClass('u-member-list').show();
       
    },function() {
        //$().getClass('m-member').css('background','url(./images/arrow2.png) no-repeat 55px center');
        $(this).css('background', 'url(./images/arrow.png) no-repeat 55px center');
        $().getClass('u-member-list').hide();
        
    });
};