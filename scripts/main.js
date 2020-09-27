const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();
var gainNode = audioCtx.createGain();
gainNode.gain.value = .05;
gainNode.connect(audioCtx.destination);

canvas.width = 1000 //window.innerWidth;
canvas.height = 1000 //window.innerHeight;
window.addEventListener('resize', function () {
  //canvas.width = window.innerWidth;
  //canvas.height = window.innerHeight;
});

class SingingBowl {
  constructor() {
    this.color = 'rgba(0, 0, 0, 1)'
    this.bowl = new Path2D();
    this.bowl.arc(Math.floor(canvas.width/2), Math.floor(canvas.height/2), Math.floor(Math.min(canvas.width/4,canvas.height/4)), 0, 2 * Math.PI);
  }
  draw = () => {
    ctx.fillStyle = this.color;
    if (ctx.isPointInPath(this.bowl,mouse.x, mouse.y)){
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    };
    ctx.fill(this.bowl);
  }
  update = () => {

  }
  ring = () => {
    if (ctx.isPointInPath(this.bowl,mouse.x, mouse.y)){
      if (this.color === 'rgba(0, 0, 0, 1)'){
        this.color = 'rgba(0,255,0,1)'
      }
      else{
        this.color = 'rgba(0, 0, 0, 1)';
      };
    };
    var oscillator = audioCtx.createOscillator();
    oscillator.connect(gainNode);
    oscillator.start(audioCtx.currentTime + .0001);
    oscillator.stop(audioCtx.currentTime + .8);
  }
}
const bowl = new SingingBowl();
let mouse = {
  x: undefined,
  y: undefined
};

canvas.addEventListener("mouseup", function (e) {
  bowl.ring()
}, false);


window.addEventListener('mousemove', function (e) {
  mouse.x = event.x;
  mouse.y = event.y;
});

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  bowl.draw();
};

animate();
