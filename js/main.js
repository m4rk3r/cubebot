var $w = $(window);
var w = 50000;
var h = 50000;
var deltaX = 0;
var deltaY = 0;

$(function (){
	window.scrollTo(w/2, h/2);
	var timer;

	var $cube = $('#cube');
	var init_transform = 'translateX('+(window.innerWidth*0.5 + w*0.5-$cube.width()*0.5)+'px) '+
						 'translateY('+(window.innerHeight*0.5 + h*0.5-$cube.height()*0.5)+'px)';
	
	//$cube.css('transform', init_transform);
	var suppress = false;

	$(window).on('scroll', function (evt){ 
		deltaX = ($w.scrollLeft()-w/2);
		deltaY = ($w.scrollTop()-h/2);

		// 'scale('+(1-deltaY *0.001)+','+(1-deltaY*0.001)+')
		$cube.css('transform', 'translateY(-25px) translateZ(-500px) rotateX('+deltaY*0.1+'deg) rotateY('+deltaX*0.1+'deg)');

		console.log('x:',deltaX,'y:',deltaY);

		clearTimeout(timer);
		timer = setTimeout(function (){
			console.log('resetting window position');
			window.scrollTo(w/2, h/2);
		},250);
	});
})