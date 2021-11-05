const balls = document.getElementsByClassName('ball');

document.onmousemove = (event) => {
  const x = (event.clientX * 100) / window.innerWidth + '%';
  const y = (event.clientY * 100) / window.innerHeight + '%';
  for (let i=0;i<2;i++){
  balls[i].style.left = x;
  balls[i].style.top = y;
  balls[i].transform = 'translate(-' + x + ',-' + y + ')';
  }
};

const eyes = document.getElementsByClassName("eyes");
const eyeL = document.querySelector("#left")
const eyeR = document.querySelector("#Right")

document.onclick = (click)=>{
  if(eyeL.style.height!=="130px"){
  eyeL.style.height =130;
  eyeR.style.height =130;
  } else{
  eyeL.style.height= eyeR.style.height = Math.random()*130;
  
  }
}

