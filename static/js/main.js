
var $w = $(window);
var w = 50000;
var h = 50000;
var deltaX = 0;
var lDeltaX = 0;
var deltaY = 0;
var lDeltaY = 0;

var keyMap = {
	37:'left',
	38:'up',
	39:'right',
	40:'down'
}

var rotationMap = {
	'front': [0,0,0],
	'right': [0,-90,0],
	'back': [0,180,0],
	'left': [0,90,0],
	'top': [-90,0,0],
	'bottom': [90,0,0]
}

$(function (){
	window.scrollTo(w/2, h/2);
	lDeltaX = 0;
	lDeltaY = 0;
	var timer;

	var $shop = $('nav');

	var $container = $('#container');
	var cube = new Cube();
	var $cube = cube.render().$el;

	$('#intermediary').append(
		$cube
	);

	//$shop.css('left', $container.offset().left-$shop.width()*2);

	var idx = 0;
	var x = 0;
	var y = 0;
	var z = 0;
	var suppress = false;
	var keyed = false;

	$('.rotate').on('click', function (){
		keyed = true;
		$cube.addClass('smoothing');

		z += 90;

		x = 90 * Math.round(x / 90);
		y = 90 * Math.round(y / 90);

		$cube.css('transform', 'translateZ(-45vh) rotateZ('+z+'deg) rotateX('+y+'deg) rotateY('+x+'deg)');
		$cube.get(0).addEventListener('webkitTransitionEnd', function (){
			$cube.removeClass('smoothing');
			keyed = false;

			// reset deltas when realligning cube to grid
			lDeltaX = 0;
			lDeltaY = 0;
			window.scrollTo(w/2, h/2);
		},false);
	});

	$(document).on('click','img.lock', function (evt){
		keyed = true;
		var face = $(evt.target).data('face');
		$cube.addClass('smoothing')

		y = rotationMap[face][0];
		x = rotationMap[face][1];
		z = rotationMap[face][2];

		$cube.css('transform', 'translateZ(-45vh) rotateZ('+z+'deg) rotateX('+y+'deg) rotateY('+x+'deg)');
		$cube.get(0).addEventListener('webkitTransitionEnd', function (){
			$cube.removeClass('smoothing ');
			keyed = false;

			// reset deltas when realligning cube to grid
			lDeltaX = 0;
			lDeltaY = 0;
			window.scrollTo(w/2, h/2);
		},false);
	});

	$(document).on('scroll keydown',function(evt){

		switch(evt.type){
			case 'keydown':
			if(typeof keyMap[evt.keyCode] == "undefined") break;
				keyed = true;

				$cube.addClass('smoothing');

				switch(keyMap[evt.keyCode]){
					case 'up':
						y -= 90;
						break;
					case 'down':
						y += 90;
						break;
					case 'left':
						x += 90;
						break;
					case 'right':
						x -= 90;
						break;
				}

				x = 90 * Math.round(x / 90);
				y = 90 * Math.round(y / 90);

				//console.log('x',x,'y',y,'z',z);

				$cube.css('transform', 'translateZ(-45vh) rotateZ('+z+'deg) rotateX('+y+'deg) rotateY('+x+'deg)');
				$cube.get(0).addEventListener('webkitTransitionEnd',function (){
					$cube.removeClass('smoothing');
					keyed = false;

					// reset deltas when realligning cube to grid
					lDeltaX = 0;
					lDeltaY = 0;
					window.scrollTo(w/2, h/2);
				},false);
			break;

			case 'scroll':
				if(keyed) break;

				if(!suppress){
					var _x = ($w.scrollLeft()-w/2);
					var _y = ($w.scrollTop()-h/2);

					x +=  (_x - lDeltaX) * 0.1;
					y +=  (_y - lDeltaY) * 0.1;

					lDeltaX = _x; lDeltaY = _y;

					$cube.css('transform', 'translateZ(-45vh) rotateZ('+z+'deg) rotateX('+y+'deg) rotateY('+x+'deg)');
				}else{
					suppress = false;
					lDeltaX = 0;
					lDeltaY = 0;
				}

				clearTimeout(timer);
				timer = setTimeout(function (){
					suppress = true;
					window.scrollTo(w/2, h/2);
				},250);
			break;
		}
	})
});