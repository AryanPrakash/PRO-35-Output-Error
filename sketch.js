var balloon,balloonImage1,balloonImage2; 
var database; 
var position; 
function preload()
{ 
    bg =loadImage("cityImage.png"); 
    balloonImage1=loadAnimation("Hot Air Ballon-01.png"); 
    balloonImage2=loadAnimation("Hot Air Ballon-01.png","Hot Air Ballon-01.png", "Hot Air Ballon-01.png","HotAirBallon-02.png","HotAirBallon-02.png", "HotAirBallon-02.png","HotAirBallon-03.png","HotAirBallon-03.png","HotAirBallon-03.png");
} 
//Function to set initial environment 
function setup() 
{ 
    database=firebase.database(); 
    createCanvas(1500,700); 
    balloon=createSprite(250,650,150,150); 
    balloon.addAnimation("hotAirBalloon",balloonImage1); 
    balloon.scale=0.5; 
    var balloonposition=database.ref('balloon/position'); 
    balloonposition.on("value",readposition, showError); 
    textSize(20); 
} 
// function to display UI 
function draw() 
{ 
    background(bg); 
    if(keyDown(LEFT_ARROW)){ 
        updateposition(-10,0); 
        balloon.addAnimation("hotAirBalloon",balloonImage2); 
    } 
    else if(keyDown(RIGHT_ARROW))
    { 
        updateposition(10,0); 
        balloon.addAnimation("hotAirBalloon",balloonImage2); 
    } 
    else if(keyDown(UP_ARROW))
    { 
        updateposition(0,-10); 
        balloon.addAnimation("hotAirBalloon",balloonImage2); 
        balloon.scale=balloon.scale -0.005; 
    } 
    else if(keyDown(DOWN_ARROW))
    { 
        updateposition(0,+10);
        balloon.addAnimation("hotAirBalloon",balloonImage2); 
        balloon.scale=balloon.scale+0.005; 
    } 
    drawSprites(); 
    fill(0); 
    stroke("white"); 
    textSize(25); 
    text("**Use arrow keys to move Hot Air Balloon!",40,40); 
} 
function updateposition(x,y){ 
    database.ref('balloon/position').set(
        { 
            'x': position.x + x , 
            'y': position.y + y }) 
        } 
        function readposition(data)
        { 
            position = data.val(); 
            console.log(position.x); 
            balloon.x = position.x; 
            balloon.y = position.y; 
        } 
        function showError(){ 
    console.log("Error in writing to the database"); 
}