song = "";
leftWX = 0;
leftWY = 0;
rightWX = 0;
rightWY = 0;
scoreleftW = 0;
scorerightW=0;


function preload() {
    song = loadSound("music.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log('Pose Net Is initalized');
}

function draw() {
    image(video, 0, 0, 600, 500);

    fill("#FF0000");
    stroke("#FF0000");
    circle(rightWX,rightWY,20);
    if(scorerightW>0.2){
        if(rightWY>0 && rightWY<=100){
            document.getElementById("speed").innerHTML="Speed = 0.5x";
            song.rate(0.5);
        }
        else if(rightWY>100 && rightWY<=200){
            document.getElementById("speed").innerHTML="Speed = 1x";
            song.rate(1);
        }
        else if(rightWY>200 && rightWY<=300){
            document.getElementById("speed").innerHTML="Speed = 1.5x";
            song.rate(1.5);
        }
        else if(rightWY>300 && rightWY<=400){
            document.getElementById("speed").innerHTML="Speed = 2x";
            song.rate(2);
        }
        else if(rightWY>400 && rightWY<=500){
            document.getElementById("speed").innerHTML="Speed = 2.5x";
            song.rate(2.5);
        }
    }

    if (scoreleftW > 0.2) {
        circle(leftWX, leftWY, 20);
        inNoleftWY = Number(leftWY);
        r_d = floor(inNoleftWY);
        volume = r_d / 500;
        document.getElementById("volume").innerHTML = "Volume = " + volume;
        song.setVolume(volume);
    }

}
function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        scorerightW=results[0].pose.keypoints[10].score;
        scoreleftW = results[0].pose.keypoints[9].score;
        console.log("score left Wrist = " + scoreleftW);
        console.log("Score Right Wrist = " +scorerightW);

        leftWX = results[0].pose.leftWrist.x;
        leftWY = results[0].pose.leftWrist.y;

        console.log("leftWristX= " + leftWX + "leftWristY= " + leftWY);

        rightWX = results[0].pose.rightWrist.x;
        rightWY = results[0].pose.rightWrist.y;

        console.log("rightWristX= " + rightWX + "rightWristY= " + rightWY);
    }
}