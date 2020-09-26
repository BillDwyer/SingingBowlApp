const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener('resize', function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
ctx.beginPath();
ctx.arc(Math.floor(canvas.width/2), Math.floor(canvas.height/2), Math.floor(Math.min(canvas.width/4,canvas.height/4)), 0, 2 * Math.PI);
ctx.fill();

class SingingBowl {
  constructor(x,y) {
    this.x = x;
    this.y = y;

  };
  draw = () => {
    ctx.beginPath();
    ctx.arc(Math.floor(canvas.width/2), Math.floor(canvas.height/2), Math.floor(Math.min(canvas.width/4,canvas.height/4)), 0, 2 * Math.PI);
    ctx.fill();
  };
  update = () => {

  };
}

let mouse = {
  x: undefined,
  y: undefined
};

window.addEventListener('mousemove', function (e) {
  mouse.x = event.x;
  mouse.y = event.y;
});
