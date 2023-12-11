song = "";
leftWX = 0;
leftWY = 0;
rightWX = 0;
rightWY = 0;

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
}
function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        leftWX = results[0].pose.leftWrist.x;
        leftWY = results[0].pose.leftWrist.y;

        console.log("leftWristX= " + leftWX + "leftWristY= " + leftWY);

        rightWX = results[0].pose.rightWrist.x;
        rightWY = results[0].pose.rightWrist.y;

        console.log("rightWristX= " + rightWX + "rightWristY= " + rightWY);
    }
}