let mic;
let cols;
let rows;
let size = 10;
let d = [];
let max;

let colors = [
  "#f72585",
  "#b5179e",
  "#7209b7",
  "#560bad",
  "#480ca8",
  "#3a0ca3",
  "#3f37c9",
  "#4361ee",
  "#4895ef",
  "#4cc9f0",
];
let ring = 2;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  mic = new p5.AudioIn();
  userStartAudio().then(function () {
    mic.start();
  });

  rows = height / size;
  cols = width / size;

  max = sqrt(pow(width / 2, 2) + pow(height / 2, 2));

  for (let i = 0; i < cols; i++) {
    d[i] = [];
    for (let j = 0; j < rows; j++) {
      let x = size * i + size / 2;
      let y = size * j + size / 2;

      d[i][j] = dist(x, y, width / 2, height / 2);
    }
  }
}

function draw() {
  background(0);

  let amplitude = mic.getLevel() * 5000;

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = size * i + size / 2;
      let y = size * j + size / 2;
      let index = floor(map(abs(d[i][j]), 0, max, 0, colors.length * ring));
      c = colors[index % colors.length];
      fill(c);
      ellipse(x, y, size, size);

      d[i][j] -= amplitude;
    }
  }
  function windowResized() {
    resizeCanvas(window.innerWidth, window.innerHeight);
  }
}


