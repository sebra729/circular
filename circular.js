(function () {
    var canvas = document.getElementById('gameCanvas'),
        ctx = canvas.getContext('2d'),
        score = 0,
		canvasWidth = Math.PI*150,
        canvasHeight = Math.PI*150,
        hiScore = 20,
        leftButton = document.getElementById('leftButton'),
        rightButton = document.getElementById('rightButton');


    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

var draw = {

    /*Clear the canvas*/
    clear: function () 
    {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    },   

    /*Create a circle on position (x,y) with radius and color*/
    circle: function (x, y, radius, col) 
    {
        ctx.fillStyle = col;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI*2, true);
        ctx.closePath();
        ctx.fill();
    },

    /*Set text to canvas*/
    text: function (str, x, y, size, col) 
    {
        ctx.font = 'bold ' + size + 'px monospace';
        ctx.fillStyle = col;
        ctx.fillText(str, x, y);
    }

};

/*Circle object*/
function circleObj(x, y, r, c)
{
    this.x = x;
    this.y = y;
    this.r = r;
    this.c = c;

    this.draw = function()
    {
        draw.circle(this.x, this.y, this.r, this.c);
    } ;
};

/*Text object*/
/*var testMsg = function(str, x, )
{
    this.x = x;
    this.y = y;
    this.size = size;
    this.col = col;
}*/

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    };
    return color;
};

/*Get words from textfile in the server-side
wordArr as global array*/
function getWords(){
    var div = document.getElementById("dom-target");
    var string = div.textContent;
    var wordArr = string.split("\n");
    // console.log(value = "Word list length "+ wordArr.length);
    return wordArr;
};

function printWords(nrOfWords, wordArr, circleArr){
    var randList = getRadomList(nrOfWords, wordArr.length);

    for(var i=0; i<nrOfWords;i++){
        var word = wordArr[randList[i]];
        var size = Math.floor(Math.random()*10+10);
        var x = Math.floor(Math.random()*(canvasWidth-ctx.measureText(word).width-size));
        var y = Math.floor(Math.random()*(canvasHeight-size)+size);
        var col = getRandomColor();

        while(true){
            for(var j=0;j<circleArr.length;j++){
                if(textCircleCollision(x, y, word, size, circleArr[j])){
                    //Inside other circle
                    console.log("collision");
                    var x = Math.floor(Math.random()*(canvasWidth-ctx.measureText(word).width-size));
                    var y = Math.floor(Math.random()*(canvasHeight-size)+size);
                    j = 0;
                }
            }
            draw.text(word, x, y, size, col);
            break;
        }  

        
    }
    
};

function getRadomList(nrOfElements, maxElements){
    var arr = [];
    for(var i=1;i<maxElements;i++){
        arr.push(i);
    }
    return shuffle(arr);
};

function shuffle(o){ //v1.0
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

function textCircleCollision(x, y, word, size, circle){

    // // ctx.font = 'bold ' + size + 'px monospace';
    // var texWidth = Math.round(ctx.measureText(word).width);
    // // console.log("Text width" + texWidth);
    // var textHight = size;

    // var circleDistX = Math.round(Math.abs(circle.x - x + texWidth/2));
    // var circleDistY = Math.round(Math.abs(circle.y - y - textHight/2));
    // // console.log("before compare " + circleDistX + " " + circleDistY + " " + Math.round(texWidth/2 + circle.r) 
    // //     + " " + Math.round(textHight/2 + circle.r) + " " + Math.round(Math.pow(circleDistX-texWidth/2,2)+Math.pow(circleDistY-textHight/2, 2))
    // //     + " " + Math.round(Math.pow(circle.r,2)));

    // if(circleDistX > Math.round(texWidth/2 + circle.r)) {return false;};
    // if(circleDistY > Math.round(textHight/2 + circle.r)) {return false;};

    // if(circleDistX <= Math.round(texWidth/2)) {return true};
    // if(circleDistY <= Math.round(textHight/2)) {return true};

    // cornerDist = Math.round(Math.pow(circleDistX-texWidth/2,2)+Math.pow(circleDistY-textHight/2, 2));

    // console.log(cornerDist <= Math.round(Math.pow(circle.r,2)));
    // return(cornerDist <= Math.round(Math.pow(circle.r,2)));

    var closestX = clamp(circle.x, x, x+Math.round(ctx.measureText(word).width));
    var closestY = clamp(circle.y, y-size, y);

    var distX = circle.x - closestX;
    var distY = circle.y - closestY;

    var dist = Math.round(Math.pow(distX,2)+Math.pow(distY,2));
    var radDist = Math.round(Math.pow(circle.r,2));

    if(dist < radDist){
        return true;
    }

    return false;
}

function clamp(num, min, max) {
    return num < min ? min : (num > max ? max : num);
};

/*Cecks if a cicle colides whitin an other circle*/
function circleCollision(x, y, radius, otherCircle){
    
    // Importent to compare int to int.
    var dist = Math.round(Math.pow(x-otherCircle.x,2)+Math.pow(y-otherCircle.y,2));
    var radDist = Math.round(Math.pow(radius+otherCircle.r,2));
    if(dist < radDist){
        // console.log("Collision ");
        return true;
    }

    // console.log("Check " + dist + " < " + radDist);
    return false;
}



function printCircles(nrOfCircles){
    var circleArr = [];

    //Answare circle;
    var c = new circleObj(30, 30, 10*3.14, 'red');
    circleArr.push(c);
    c.draw();

    for(var i=0; i<nrOfCircles; i++){
        var radius = Math.floor(Math.random()*6)*2*Math.PI+4*Math.PI;
        var x = Math.floor(Math.random()*(canvasWidth-2*radius)+radius);
        var y = Math.floor(Math.random()*(canvasHeight-2*radius)+radius);
        var col = getRandomColor();

        while(true){
            for(var j=0;j<circleArr.length;j++){
                if(circleCollision(x, y, radius, circleArr[j])){
                    //Inside other circle
                    x = Math.floor(Math.random()*(canvasWidth-2*radius)+radius);
                    y = Math.floor(Math.random()*(canvasHeight-2*radius)+radius);
                    j = 0;
                }
            }
            //new circle
            var circle = new circleObj(x, y, radius, col);
            circleArr.push(circle);
            draw.circle(x, y, radius, col);
            break;
        }        
    }
    return circleArr;
}

/*http://miloq.blogspot.se/2011/05/coordinates-mouse-click-canvas.html*/
function getPosition(event)
{
  if (event.x != undefined && event.y != undefined)
    {
      x = event.x;
      y = event.y;
    }
    else // Firefox method to get the position
    {
      x = event.clientX + document.body.scrollLeft +
          document.documentElement.scrollLeft;
      y = event.clientY + document.body.scrollTop +
          document.documentElement.scrollTop;
    }

  // var canvas = document.getElementById("canvas");

  x -= canvas.offsetLeft;
  y -= canvas.offsetTop;

  // console.log("x: " + x + " y: " +y);
  return {x: x, y: y};
}

function onMauseClick(event){

    var pos = getPosition(event);
    console.log("x: " + pos.x + " y: " +pos.y);
    if (Math.pow(pos.x - allCircles[0].x, 2)+Math.pow(pos.y-allCircles[0].y,2)<Math.pow(allCircles[0].r,2)) 
    {
        score += 1;
    }

    if (score > hiScore) 
    {
        hiScore = score;
    }
    console.log("score" + score);

}

var wordArr = getWords();
var allCircles = printCircles(5);

printWords(5, wordArr, allCircles);

canvas.addEventListener("mousedown", onMauseClick, false);

// c = new circleObj(30, 30, 10*3.14, 'red');
// c.draw();


draw.text('Score: '+score, 0, 12, 12, 'black');
draw.text('Hi: '+hiScore, 260, 20, 12, 'black');


// function loop() 
// { 
// };
// setInterval(loop, 30);

}());