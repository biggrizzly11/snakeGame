$(document).ready(function(){
	// canvas
	//$('body').append('<p>asdfadf</p>');
// canvas is how many jquery games are created.  getContet("2d") - this is telling js that the context is going to be two dimentional
	var canvas = $('#canvas')[0];
	var ctx = canvas.getContext("2d");
	var w = $('#canvas').width();
	var h = $('#canvas').height();

	var cw = 10;
	var d;
	var food;
	var score;

	ctx.fillStyle = 'white';
	ctx.fillRect(0,0,w,h);
	ctx.strokeStyle = "black";
	ctx.strokeRect(0,0,w,h);

	// game

	var snakeArray;


	function init(){
		d = 'right';

		creatSnake();
		createFood();
		score = 0;
		// snake timer to move the snake loops every 60ms
		if(typeof gameLoop != "undefined"){
			clearInterval(gameLoop);
		}
		gameLoop = setInterval(paint, 60);
	}
	

	function creatSnake(){
		var length = 5;
		snakeArray = [];

		for (var i = length - 1; i >= 0; i--) {
			snakeArray.push({x:i,y:0});
			//console.log(snakeArray);
		}
	}


	// grow snake
	function createFood(){

		// random square with x/y between the canvas of 0-44  because there are 45(450/10)
		food = {
			x: Math.round(Math.random()*(w-cw)/cw),
			y: Math.round(Math.random()*(h-cw)/cw),
		};

	}


	function paint(){

		ctx.fillStyle = 'white';
		ctx.fillRect(0,0,w,h);
		ctx.strokeStyle = "black";
		ctx.strokeRect(0,0,w,h);


		var nx = snakeArray[0].x;
		var ny = snakeArray[0].y;

		if (d === 'right'){
			nx++;
		} else if (d === 'left') {
			nx--;
		} else if (d === 'up'){
			ny--;
		} else if (d === 'down') {
			ny++;
		}

		// game over
		 if (nx === -1 || nx === w/cw || ny === -1 || ny === h/cw || checkCollision(nx,ny,snakeArray)) {

		 	//init();

		 	return;
		 }


		 // Make snake grow.  If food maches head square of snake then creat a new head instead of moving tail
		 if (nx === food.x && ny === food.y) {
		 	var tail = {
		 		x: nx,
		 		y: ny
		 		};

		 		score++;

		 		createFood();
		 	} else {
		 		var tail = snakeArray.pop();

				tail.x = nx; 
				tail.y = ny;
		 	}
		 



		snakeArray.unshift(tail);

		for (var i = 0; i < snakeArray.length; i++) {
			var c = snakeArray[i];

			paintCell(c.x,c.y);
		}

		paintCell(food.x,food.y);

		var scoreText = "Score: " + score;
		ctx.fillText(scoreText, 5, h-5);
	}


	function paintCell(x,y){

			ctx.fillStyle = "#A8CC83";
			ctx.fillRect(x*cw, y*cw, cw, cw);
			ctx.strokeStyle = "white";
			ctx.strokeRect(x*cw, y*cw, cw, cw);
	}


	function checkCollision(x,y,array){
		// checks to see if the xy cordinance exist in an array or not
		for (var i = 0; i < array.length; i++) {
			if(array[i].x == x && array[i].y == y){
				return true;
			}

			return false;
		}

	}

	// keyboard controls
	// (e) stands for event.  The e means this function is handling an event
	$(document).keydown(function(e){

		// which contains the keycode of what was entered
		var key = e.which; 
		// 37 is the placeholder of the down arrow
		if(key === 37 && d != 'right'){
			d = 'left';
		} else if (key === 38 && d != 'down') {
			d = 'up';
		} else if (key === 39 && d != 'left') {
			d = 'right';
		} else if (key === 40 && d != 'up') {
			d = 'down';
		}

		console.log(key);
		console.log(d);

	});

	
$('#start').on('click', function(){
	init();
});

$('#stop').on('click', function(){
	//.stop(init())
});	

});























