
var keyMap = {
	37:'left',
	38:'up',
	39:'right',
	40:'down'
}

$(function (){
	//var $cube = $('#cube');
	var cube = new Cube();
	var $cube = cube.render().$el;

	$('#intermediary').append(
		$cube
	);

	var idx = 0;
	var x = 0;
	var y = 0;
	var z = 0;

	$('.rotate').on('click', function (){
		z += 90;
		$cube.css('transform', 'rotateZ('+z+'deg) rotateX('+y+'deg) rotateY('+x+'deg)');
	})

	$(document).on('keyup',function(evt){
		if(typeof keyMap[evt.keyCode] == "undefined") return;

		console.log( keyMap[evt.keyCode] );

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

		console.log('x',x,'y',y,'z',z)

		$cube.css('transform', 'rotateZ('+z+'deg) rotateX('+y+'deg) rotateY('+x+'deg)');
	})
});