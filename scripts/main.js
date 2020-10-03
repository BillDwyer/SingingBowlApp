const canvas = document.getElementById('canvas');
const pressTest = document.getElementById('pressure');
const ctx = canvas.getContext('2d');
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouse = {
  x: undefined,
  y: undefined
};

class SingingBowl {
  constructor() {
    this.color = 'rgba(0, 0, 0, 1)';
    this.bowl = new Path2D();
    this.bowl.arc(Math.floor(canvas.width/2), Math.floor(canvas.height/2), Math.floor(Math.min(canvas.width/3,canvas.height/3)), 0, 2 * Math.PI);
  };
  draw() {
    ctx.fillStyle = this.color;
    if (ctx.isPointInPath(this.bowl,mouse.x, mouse.y)){
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    };
    ctx.fill(this.bowl);
  };
  ring(pressure) {
    if (ctx.isPointInPath(this.bowl,mouse.x, mouse.y)){
      var gainNode = audioCtx.createGain();
      var oscillator = audioCtx.createOscillator();
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      gainNode.gain.setValueAtTime(0,audioCtx.currentTime);
      oscillator.start(audioCtx.currentTime + .00001);
      var plog = Math.max(Math.min(Math.log10(pressure*100),1),.1);
      pressTest.textContent = plog;
      gainNode.gain.cancelScheduledValues(audioCtx.currentTime + .0001);
      gainNode.gain.setValueAtTime(.2*plog, audioCtx.currentTime + .0001);
      gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 1)
    };
  };
  resize() {
    this.bowl = new Path2D();
    this.bowl.arc(Math.floor(canvas.width/2), Math.floor(canvas.height/2), Math.floor(Math.min(canvas.width/3,canvas.height/3)), 0, 2 * Math.PI);
  };
};
const bowl = new SingingBowl();


window.addEventListener('resize', function (e) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  bowl.resize();
});

canvas.addEventListener('pointerdown', function (e) {
  mouse.x = event.x;
  mouse.y = event.y;
  bowl.ring(e.pressure);
});


window.addEventListener('pointermove', function (e) {
  mouse.x = event.x;
  mouse.y = event.y;
});

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  bowl.draw();
};

animate();
