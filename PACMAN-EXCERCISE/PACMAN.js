var posX = 0;
var posY = 0;
const pacArray = [
    ['PacMan1.png', 'PacMan2.png'],
    ['PacMan3.png', 'PacMan4.png'],
    ['PacMan5.png', 'PacMan6.png'],
    ['PacMan7.png', 'PacMan8.png']
];
var direction = 0;
var focus = 0;
var timeOut;
let temp2 =['left',0,0,0,0];
var setTKey = 0;


function Run() {
    setTkey = 1; 
    document.onkeydown = checkKey;
    if (direction && temp2[0]==="left") {
        posX -= 15;
    } else if (temp2[0]==="left"){
        posX += 15;
    }
    if (direction && temp2[0]==="top") {
        posY -= 15;
    } else if (temp2[0]==="top"){
        posY += 15;
    }
    let img = document.getElementById("PacMan");
    let imgWidth = img.width
    focus = (focus + 1) % 2;
    console.log(temp2[1]);
    direction = checkPageBounds(direction, imgWidth,temp2);
    

    img.src = pacArray[direction + temp2[4]][focus];

    if (temp2[0]==="left"){
    img.style.left = posX + 'px';
    } else{
    img.style.top = posY + 'px'
    }
    // Use setTimeout to call Run every 200 millesecs
    timeOut = setTimeout(Run,200);
}

    
let temp3 = posX;
let maxDim;
function checkPageBounds(direction, imgWidth, arrXY) {
    if(arrXY[0]==="left"){
        temp3 = posX;
        maxDim = 0.986*window.innerWidth;
    } else {
        temp3 = posY;
        maxDim = 0.7346938775*(window.innerHeight);
    }
    let temp1 = maxDim - temp3;
    if((direction === 0 )&&(temp1<=imgWidth)){
        direction=1;
        arrXY[2]=1;
    } else if ((direction === 1 )&&(temp3<=arrXY[3])){
        direction = 0;
        arrXY[2]=0;
    } else {
        direction = arrXY[2];
        return direction;
    };

    return direction;
}

var mySound; 
function cleartime(){
  clearTimeout(timeOut);
  mySound.stop();
  setTKey=0;
}



function checkKey(e) {
// returns parameters to change direction  [<Top or Left>, <Window Height or Width>, <direction 0 or 1>, <image>                     ]

e = e || window.event;

if (e.keyCode == '38') {
    temp2 = ['top',0,1,0,2];
}
else if (e.keyCode == '40') {
    temp2 = ['top',0,0,0,2];
}
else if (e.keyCode == '37') {
    temp2 = ['left',1,1,0,0];
}
else if (e.keyCode == '39') {
    temp2 = ['left',1,0,0,0];
}

}

function startsound(){
if(setTKey===0){
    setTKey=1; 
console.log("T1",setTKey);
mySound = new sound("./wakawaka.mp3");
mySound.play();
Run();
}
}

function sound(src) {
this.sound = document.createElement("audio");
this.sound.src = src;
this.sound.setAttribute("preload", "auto");
this.sound.setAttribute("controls", "none");
this.sound.style.display = "none";
document.body.appendChild(this.sound);
this.play = function(){
    this.sound.play();
}
this.stop = function(){
    this.sound.pause();
}    
}
