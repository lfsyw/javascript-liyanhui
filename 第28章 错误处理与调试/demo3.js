




addEvent(window, 'load', function () {
	var a = 1;
	var box = document.getElementById('box');
	addEvent(box, 'click', function () {
		this.innerHTML = '被点了！';
	});
	a = 2;
	b = 1;
	a = 3;
	b = 2;
});