const cvs = document.querySelector("canvas");
const ctx = cvs.getContext("2d");
cvs.width = 1280;
cvs.height = innerHeight;
const numberOfRings = 4;
const ringRadiusOffset = 20;
const ringRadius = 400;
const waveOffset = 10;
const colors = ["#B9c4c9", "#52958B", "#128277", "#004D47"];
let startAngle = 0;

function createRings() {
  for (let i = 0; i < numberOfRings; i++) {
    let radius = i * ringRadiusOffset + ringRadius;
    let offsetAngle = (i * waveOffset * Math.PI) / 180;
    drawRing(radius, colors[i], offsetAngle);
  }
  startAngle >= 360 ? (startAngle = 0) : startAngle++;
}

let centerX = cvs.width / 2;
let centerY = cvs.height / 2;

const maxWavesAmplitude = 20;
const numberOfWaves = 6;

function drawRing(radius, color, offsetAngle) {
  ctx.globalAlpha = 0.3;
  ctx.fillStyle = color;
  ctx.fill();

  ctx.beginPath();

  for (let j = -180; j < 180; j++) {
    let currentAngle = ((j + startAngle) * Math.PI) / 180;
    let displacement = 0;
    let now = Math.abs(j);

    if (now > 70) {
      displacement = (now - 70) / 70;
    }
    if (displacement >= 1) {
      displacement = 1;
    }

    let waveAmplitude =
      radius +
      displacement *
        Math.sin((currentAngle + offsetAngle) * numberOfWaves) *
        maxWavesAmplitude;
    let x = centerX + Math.cos(currentAngle) * waveAmplitude;
    let y = centerY + Math.sin(currentAngle) * waveAmplitude;
    j > -180 ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
  }

  ctx.closePath();
}

function animate() {
  requestAnimationFrame(animate);
  cvs.width |= 0; //ctx.clearRect(0, 0, cvs.width, cvs.height);
  createRings();
}
animate();
