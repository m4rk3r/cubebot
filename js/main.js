var $w = $(window);
var w = 50000;
var h = 50000;
var deltaX = 0;
var lDeltaX = 0;
var deltaY = 0;
var lDeltaY = 0;

$(function (){
	window.scrollTo(w/2, h/2);
	lDeltaX = 0;
	lDeltaY = 0;
	var timer;

	var $cube = $('#cube');
	var init_transform = 'translateX('+(window.innerWidth*0.5 + w*0.5-$cube.width()*0.5)+'px) '+
						 'translateY('+(window.innerHeight*0.5 + h*0.5-$cube.height()*0.5)+'px)';
	//$cube.css('transform', init_transform);

	var suppress = false;

	$(window).on('scroll', function (evt){ 
		if(!suppress){
			var _x = ($w.scrollLeft()-w/2);
			var _y = ($w.scrollTop()-h/2);
			
			deltaX +=  _x - lDeltaX;
			deltaY +=  _y - lDeltaY;

			lDeltaX = _x; lDeltaY = _y;

			$cube.css('transform', 'translateY(-25px) translateZ(-500px) rotateX('+deltaY*0.1+'deg) rotateY('+deltaX*0.1+'deg)');
		}else{
			suppress = false;
			lDeltaX = 0;
			lDeltaY = 0;
		}

		clearTimeout(timer);
		timer = setTimeout(function (){
			suppress = true;
			console.log('resetting window position');
			window.scrollTo(w/2, h/2);
		},250);
	});
})