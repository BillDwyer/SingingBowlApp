const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

ctx.beginPath();
ctx.arc(75, 75, 50, 0, 2 * Math.PI);
ctx.fill();
