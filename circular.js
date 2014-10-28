(function () {
    var canvas = document.getElementById('gameCanvas'),
        ctx = canvas.getContext('2d'),
        score = 0,
		canvasWidth = 500,
        canvasHeight = 400,
        hiScore = 20,
        laps=5,
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

    this.draw = function(){
        draw.circle(this.x, this.y, this.r, this.c);
    };
    this.position = function(x, y){
        this.x = x;
        this.y = y;
    }
};

/*Text object*/
var textObj = function(word, x, y, size, col)
{
    this.word = word;
    this.x = x;
    this.y = y;
    this.size = size;
    this.col = col;

    this.draw = function(){
        draw.text(word, x, y, size, col);
    }
}

//////////////////////////// Help functions ////////////////////////////
/*Generates and return a random color*/
function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    };
    return color;
};

/*Generates a array with randomized values from 0 to maxElements*/
function getRadomList(maxElements){
    var arr = [];
    for(var i=0;i<maxElements;i++){
        arr.push(i);
    }
    return shuffle(arr);
};

/*Help function to suffle elements in an array
Return: suffled array*/
function shuffle(o){ //v1.0
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

/*Help function*/
function clamp(num, min, max) {
    return num < min ? min : (num > max ? max : num);
};

/*Get position for a text where it dont intersect with circles or other text
Return x any y coordinates*/
function getTextPosition(word, printedWordArr, size, circleArr){
    var pos = getTextPositionOutOfCircles(word, size, circleArr);
    var stop = 0;
    for(var k=0;k<printedWordArr.length;k++){
        if(text2TextIntesecton(pos.x, pos.y, size, word, printedWordArr[k])){
            //Inside other text
            console.log("collision text2text");
            k = -1;
            pos = getTextPositionOutOfCircles(word, size, circleArr);
            stop++;
            if(stop >= 50){
                break;
            };
        }
    }
    return {x: pos.x, y: pos.y};
}

/*Get position where text dont intesect the circles
Return x any y coordinates*/
function getTextPositionOutOfCircles(word, size, circleArr){
    //To get the proper width of the text. 
    ctx.font = 'bold ' + size + 'px monospace';
    var x = Math.floor(Math.random()*(canvasWidth-ctx.measureText(word).width));
    var y = Math.floor(Math.random()*(canvasHeight-size)+size);
    var stop = 0;
    for(var j=0;j<circleArr.length;j++){
        if(text2CircleIntersection(x, y, word, size, circleArr[j])){
            //Inside other circle
            console.log("collision text2circle");
            var x = Math.floor(Math.random()*(canvasWidth-ctx.measureText(word).width));
            var y = Math.floor(Math.random()*(canvasHeight-size)+size);
            j = -1;
            stop++;
            if(stop >= 50){
                break;
            }
        }
    }
    return {x: x, y: y};
}
/////////////////////////////////////////////////////////////////////////

//////////////////////////// Get data ////////////////////////////
/*Get words from the dom
Return: Array with all words*/
function getWords(){
    var div = document.getElementById("dom-words");
    var wordArr = JSON.parse(div.textContent);
    // console.log(wordArr[0]);
    // console.log(value = "Word list length "+ wordArr.length);
    return wordArr;
};

/*Get the answers from the dom
Return: Array with answers*/
function getAnswers(){
    var div = document.getElementById("dom-answers");
    var answerArr = JSON.parse(div.textContent);
    // console.log(answerArr);
    // console.log(value = "Word list length "+ answerArr.length);
    return answerArr;
}

//////////////////////////////////////////////////////////////////


//////////////////////////// Print functions ////////////////////////////
/*Print out the words 
Checks for intersaction with circles and other text
Params: nrOfWords, the number of word to be visable. 
wordArr, array with words. 
answer, the anwer ext and color. 
circleArr array with reference to the circles*/
function printWords(nrOfWords, wordArr, answer, circleArr){
    var randList = getRadomList(wordArr.length);
    var printedWordArr = [];

    /*This should be the answer circle*/
    var size = Math.floor(Math.random()*10+10);
    var pos = getTextPositionOutOfCircles(answer.answer, size, circleArr);
    var one = new textObj(answer.answer, pos.x, pos.y, size, answer.color);
    printedWordArr.push(one);
    one.draw();

    for(var i=0; i<nrOfWords-1;i++){
        var word = wordArr[randList[i]];
        var size = Math.floor(Math.random()*10+10);
        var col = getRandomColor();

        var pos = getTextPosition(word, printedWordArr, size, circleArr);

        var printedWord = new textObj(word, pos.x, pos.y, size, col);
        printedWordArr.push(printedWord);
        printedWord.draw();   
    }

    return printedWordArr;
};

/*Print out circles witout overlaping circles
return array with reference to the circles.
Params: nrOfCircles number of circles that are to be printed*/
function printCircles(nrOfCircles, answerColor){
    var circleFactor  = 4;
    var circleArr = [];

    //answer circle;
    var radius = Math.floor(Math.random()*6)*2*circleFactor+4*circleFactor;
    var x = Math.floor(Math.random()*(canvasWidth-2*radius)+radius);
    var y = Math.floor(Math.random()*(canvasHeight-2*radius)+radius);

    var c = new circleObj(x, y, radius, answerColor);
    circleArr.push(c);
    c.draw();

    for(var i=0; i<nrOfCircles-1; i++){
        radius = Math.floor(Math.random()*6)*2*circleFactor+4*circleFactor;
        x = Math.floor(Math.random()*(canvasWidth-2*radius)+radius);
        y = Math.floor(Math.random()*(canvasHeight-2*radius)+radius);
        
        /*Keeps the color of the answere unique*/
        while(true){
            var col = getRandomColor();
            var stop = 0;
            if(col !== answerColor){
                break;
            }else if(stop >= 50){
                break;
            }
            stop++;
        }

        while(true){
            var stop = 0;
            for(var j=0;j<circleArr.length;j++){
                if(circle2CircleIntersection(x, y, radius, circleArr[j])){
                    //Circle intersect 
                    console.log("collision circle2circle");
                    x = Math.floor(Math.random()*(canvasWidth-2*radius)+radius);
                    y = Math.floor(Math.random()*(canvasHeight-2*radius)+radius);
                    // To get j back to 0 if collision.
                    j = -1;
                    stop ++;
                }
                if(stop >= 50){
                    break;
                }
            }
            //new circle
            var circle = new circleObj(x, y, radius, col);
            circleArr.push(circle);
            circle.draw();
            break;
        }        
    }
    return circleArr;
}

////////////////////////////////////////////////////////////////////////////

//////////////////////////// Intesect functions ////////////////////////////

/*Check if text and circle intersact
Return boolean
TODO: Test  
*/
function text2CircleIntersection(x, y, word, size, circle){
    var closestX = clamp(circle.x, x, x+Math.round(ctx.measureText(word).width)+size);
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

/*Checks if text intersect with other text
Retunrs boolean*/
function text2TextIntesecton(x, y, size, word, otherWord){
    var wordWidth = Math.round(ctx.measureText(word).width+size);
    var wordHight = size;
    var otherWordWidth = Math.round(ctx.measureText(otherWord.word).width+otherWord.size);
    var otherWordHight = otherWord.size;
    // console.log((x+wordWidth)+otherWord.x + (otherWord.x+otherWordWidth)+x + y+(otherWord.y+otherWord.size) + otherWord.y+(y+size));
    if((x+wordWidth)<otherWord.x || (otherWord.x+otherWordWidth)<x || y<(otherWord.y-otherWord.size) || otherWord.y<(y-size)){
        return false;
    }
    return true;
}

/*Cecks if a circle colides whitin an other circle
TODO: Check if circle is inside the other circle --Done
TODO: Test 
http://math.stackexchange.com/questions/275514/two-circles-overlap*/
function circle2CircleIntersection(x, y, radius, otherCircle){
    
    // Importent to compare int to int.
    var dist = Math.round(Math.pow(x-otherCircle.x,2)+Math.pow(y-otherCircle.y,2));
    var radDist = Math.round(Math.pow(radius+otherCircle.r,2));
    if(dist <= radDist){
        // Circles intersect
        return true;
    }
    return false;
}

//////////////////////////// Event functions ////////////////////////////
/*Get coordinates of the mause pointer att event
http://miloq.blogspot.se/2011/05/coordinates-mouse-click-canvas.html*/
function getPosition(event){
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

    /*First element in allCircles containes the right answer*/
    for(var i=0; i<allCircles.length; i++){
        if (Math.pow(pos.x - allCircles[i].x, 2)+Math.pow(pos.y-allCircles[i].y,2)<Math.pow(allCircles[i].r,2)) 
        {
            if(i==0){
                score += 1;
                laps--;
                if(laps == 0){

                }
                buildScene(event.target.wordArr, event.target.answerArr);
                break;
            }else{
                draw.circle(allCircles[i].x, allCircles[i].y, allCircles[i].r-1, 'white');
                score -= 1;
            }
            
        }

        if (score > hiScore) 
        {
            hiScore = score;
        }
        console.log("score" + score);
    }   
}

///////////////////////////////////////////////////////////////////////////

/*bilds the scene with circles and words 
chooses randomly which answer to print*/
function buildScene(wordArr, answerArr){
    draw.clear();

    draw.text('Score: '+score, 0, 12, 12, 'black');
    draw.text('Hi: '+hiScore, canvasWidth-ctx.measureText('Hi:    ').width, 12, 12, 'black');

    //allCircles global array containg all printed circles.
    if(answerArr.length >0){
        var rand = Math.floor(Math.random()*answerArr.length);
        allCircles = printCircles(10, answerArr[rand].color);
        var printedWordArr = printWords(10, wordArr, answerArr[rand], allCircles);
    }else{
        allCircles = printCircles(5, answerArr.color);
        var printedWordArr = printWords(5, wordArr, answerArr, allCircles);
    }
    
}

function welcomeScreen(){
    draw.clear();

    var size = 40;
    ctx.font = 'bold ' + size + 'px monospace';
    draw.text('Welcome!', Math.round(canvasWidth/2-ctx.measureText("Welcome!").width/2),  Math.round(canvasHeight/3), 'black');

    var msg = "In the game you shold look for a text message like (Choose Red) when you" 
    size = 12;
    draw.text(msg, 10, Math.round(canvasHeight/3)*2, size, 'black');
    msg = "have found it you should click the circle with the same color as the text.";
    draw.text(msg, 10, Math.round(canvasHeight/3)*2+size, size, 'black');
} 

//////////////////////////// Main scope ////////////////////////////

var wordArr = getWords();
var answerArr = getAnswers();



buildScene(wordArr, answerArr);
// welcomeScreen();

canvas.addEventListener("mouseup", onMauseClick, false);
canvas.wordArr = wordArr;
canvas.answerArr = answerArr;

// c = new circleObj(30, 30, 10*3.14, 'red');
// c.draw();


// function loop() 
// { 
// };
// setInterval(loop, 30);

}());