
$(document).ready(function (){
	var canvas=document.getElementById("myCanvas");
	var ctx=canvas.getContext("2d");
	var ball_x = canvas.width/2;
	var ball_y = canvas.height-30;
	var dx = 2;
	var dy = -2;
	var ball_radius = 10;
	var rightPressed = false;
	var leftPressed = false;
	
	var brickRows = 3;
	var brickColumns = 9;
	var brickWidth = 75;
	var brickHeight = 20;
	var bricks = [];
	var brickOffsetTop = 20;
	var brickOffsetLeft = 20;
	var brickPadding = 10;

	var score = 0;
	function drawBall(){
		ctx.beginPath();
		ctx.arc(ball_x,ball_y,ball_radius,0,Math.PI*2);
		ctx.fillStyle = "#009813";
		ctx.fill();
		ctx.closePath();
	}

	$(document).on('keydown',function(e){
		if(e.keyCode == 39){
			rightPressed = true;
		}
		else if(e.keyCode == 37){
			leftPressed=true;
		}
	});
	$(document).on('keyup',function(e){
		if(e.keyCode == 39){
			rightPressed = false;
		}
		else if(e.keyCode == 37){
			leftPressed = false;
		}
	});


	function setupBricks(){
		for(var c=0;c<brickColumns;c++){
			bricks[c] = [];	
			for(var r=0;r<brickRows;r++){
				bricks[c][r] = {x:0,y:0,visible:1};	
			}
		}	
	}

	//Draw the bricks and set up the stage
	function drawBricks(){
		for(var c=0;c<brickColumns;c++){
			for(var r=0;r<brickRows;r++){
				// The visible property is used to distinguish between blocks that have been hit and those that have not been hit
				if(bricks[c][r].visible == 1){
					var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
            		var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
            		bricks[c][r].x=brickX;
            		bricks[c][r].y=brickY;
                    ctx.beginPath();
		            ctx.rect(brickX, brickY, brickWidth, brickHeight);
		            ctx.fillStyle = "#0095DD";
		            ctx.fill();
		            ctx.closePath();
	        	}
			}
		}
	}

	function drawScore(){
		ctx.font="16px Arial";
		ctx.fillStyle="#0099dd";
		 ctx.fillText("Score: "+score, 8, 20);
	}

	function paddle()
	{
		this.paddleWidth=75;
		this.paddleHeight=10;
		this.x=(canvas.width-this.paddleWidth)/2;
		this.y=canvas.height;
		this.render=function (){
			ctx.beginPath();
			ctx.rect(this.x,this.y-this.paddleHeight,this.paddleWidth,this.paddleHeight);
			ctx.fillStyle="#006693";
			ctx.fill();
			ctx.closePath();	
		};
		this.move=function(){
			if(rightPressed && this.x<canvas.width-this.paddleWidth){
				this.x += 7;
			}
			else if(leftPressed && this.x>0){
				this.x -= 7;
			}
		}
	}

	function detectCollision() {
		for(var c=0; c<brickColumns; c++) {
        	for(var r=0; r<brickRows; r++) {
	            var b = bricks[c][r];
	            if(b.visible == 1){
		            if(ball_x > b.x && ball_x < b.x+brickWidth && ball_y > b.y && ball_y< b.y+brickHeight) {
		                dy = -dy;
		                score++;
		                b.visible=0;

		                if(score == brickColumns*brickRows){
		                	alert("CONGRATULATIONS!YOU WIN");
		                	document.location.reload();
		                }
		       		}
           		}
        	}
    	}
	}


	var p=new paddle();
	setupBricks();
		function draw(){
		ctx.clearRect(0,0,canvas.width,canvas.height);
		p.render();
		p.move();
		drawBall();
		drawScore();
		drawBricks();
		detectCollision();
		if(ball_x + dx > canvas.width-ball_radius || ball_x + dx < ball_radius) {
     	   dx = -dx;
    	}
    	if(ball_y + dy < ball_radius) {
        	dy = -dy;
    	}
    	if(ball_y+dy>canvas.height-ball_radius){
    		if(ball_x > p.x && ball_x < p.x+p.paddleWidth){
    			dy=-dy;	
    		}
    		else{
    			alert("GAME OVER");
    			document.location.reload();
    		}
    	}
		ball_x += dx;
		ball_y += dy;
	}
	
	setInterval(draw,10);
})