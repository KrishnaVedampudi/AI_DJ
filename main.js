song = "";
leftWristX = 0;
rightWristX = 0;
leftWristY = 0;
rightWristY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;

function preload()
{
    song = loadSound("music.mp3");
}

function setup()
{
    canvas = createCanvas(500, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();    
    
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);    
}

function modelLoaded () {
    console.log('Pose Net is initialized');
}

function gotPoses(results)
{
    if(results.length > 0)
    {   
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log(results);        
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("Left Wrist X = "+leftWristX+"Left Wrist Y = "+leftWristY);
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;        
        console.log("Right Wrist X = "+rightWristX+"Right Wrist Y = "+rightWristY);
    }    
}

function draw()
{
    image(video, 0, 0, 500, 500);    
    fill("red");
    stroke("red");
    circle(rightWristX, rightWristY ,20);
    if(scoreRightWrist > 0.2)
    {
    if(rightWristY > 0 && rightWristY <= 100)
    {
        console.log('speed is 0.5');
        document.getElementById('speed').innerHTML = "Speed is = 0.5x";
        song.rate(0.5);
    }else if(rightWristY > 101 && rightWristY <= 200)
    {
        console.log('speed is 1.0');
        document.getElementById('speed').innerHTML = "Speed is = 1x";
        song.rate(1);
    }else if(rightWristY > 201 && rightWristY <= 300)
    {
        console.log('speed is 1.5');
        document.getElementById('speed').innerHTML = "Speed is = 1.5x";
        song.rate(1.5);
    }else if(rightWristY > 301 && rightWristY <= 400)
    {
        console.log('speed is 2');
        document.getElementById('speed').innerHTML = "Speed is = 2x";
        song.rate(2);
    }else if(rightWristY > 401 && rightWristY <= 500)
    {
        console.log('speed is 2.5');
        document.getElementById('speed').innerHTML = "Speed is = 2.5x";
        song.rate(2.5);
    }
}
    if(scoreLeftWrist > 0.2)
    {              
        circle(leftWristX, leftWristY, 20);
        inNumberLeftWristY = Number(leftWristY);
        remove_decimals = floor(inNumberLeftWristY);
        volume = remove_decimals/500;
        document.getElementById("volume").innerHTML="Volume = "+volume;
        song.setVolume(volume);
    }  
}
function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}