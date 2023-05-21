song = "";

score_leftWrist = 0;


score_rightWrist = 0;
 

leftWristx = 0;
leftWristy = 0;

rightWristx = 0;
rightWristy = 0;

function preload(){
song = loadSound("mm.mp3");
}


function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded(){
console.log("Posenet is Initialized");
}

function gotPoses(results){
if(results.length > 0 ){
    console.log(results);

    score_leftWrist = results[0].pose.keypoints[9].score;
    score_rightWrist = results[0].pose.keypoints[10].score;
    console.log("score of right wrist =" + score_rightWrist + "score of left wrist = " + score_leftWrist);
    

    leftWristx = results[0].pose.leftWrist.x;
    leftWristy = results[0].pose.leftWrist.y;
    console.log("LeftWristX = " + leftWristx + "LeftWristY = " + leftWristy );

    RightWristx = results[0].pose.rightWrist.x;
    RightWristy = results[0].pose.rightWrist.y;
    console.log("RightWristX = " + rightWristx + "RightWristY = " + rightWristy );
}
}


function draw(){
    image(video, 0, 0, 600, 500);  
    fill("#FF0000");
    stroke("#FF0000");

    if(score_rightWrist > 0.2){
        
        circle(RightWristx, RightWristy, 20);

        if(RightWristy >0 && RightWristy <=100)
        {
            document.getElementById("speed").innerHTML = "Speed = 0.5x";
            song.rate(0.5);
           
        }

       else if(RightWristy >100 && RightWristy <=200)
        {
            document.getElementById("speed").innerHTML = "Speed = 1x";
            song.rate(1);
       
        }

       else if(RightWristy >200 && RightWristy <=300)
        {
            document.getElementById("speed").innerHTML = "Speed = 1.5x";
            song.rate(1.5);
          
        }

        if(RightWristy >300 && RightWristy <=400)
        {
            document.getElementById("speed").innerHTML = "Speed = 2x";
            song.rate(2);
          
        }

        if(RightWristy >400 && RightWristy <=500)
        {
            document.getElementById("speed").innerHTML = "Speed = 2.5x";
            song.rate(2.5);
          
        }

    }

    if(score_leftWrist > 0.2)
    {
    circle(leftWristx,leftWristy,20);
    In_number_leftwr = Number(leftWristy);
    remove_decimals = floor(In_number_leftwr);
    volume = remove_decimals/500;
    document.getElementById("volume").innerHTML = "Volume = " + volume;
    song.setVolume(volume);
    }
}

function play(){
    song.play();
    song.setVolume(25);
    song.rate(0.7);
}