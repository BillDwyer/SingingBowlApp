const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener('resize', function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

class SingingBowl {
  constructor() {
  }
  draw = () => {
    ctx.fillStyle = 'rgba(0, 0, 0, 1)'
    ctx.beginPath();
    ctx.arc(Math.floor(canvas.width/2), Math.floor(canvas.height/2), Math.floor(Math.min(canvas.width/4,canvas.height/4)), 0, 2 * Math.PI);
    if (ctx.isPointInPath(mouse.x, mouse.y)){
      ctx.fillStyle = 'rgba(255, 0, 0, 1)'
    };
    ctx.fill();
  }
  update = () => {

  };
}
const bowl = new SingingBowl();
let mouse = {
  x: undefined,
  y: undefined
};

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
