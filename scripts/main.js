const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
ctx.beginPath();
ctx.arc(250, 250, 250, 0, 2 * Math.PI);
ctx.fill();
