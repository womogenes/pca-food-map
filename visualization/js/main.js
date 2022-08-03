import { projectWorldToCanvas } from './world2screen.js';

let canvas;
let points = [];
let labels = [];
let cam;
let latinModernRoman;

document.oncontextmenu = () => false;

window.preload = () => {
  latinModernRoman = loadFont('assets/lmroman10-regular.otf');
};

window.setup = () => {
  canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  canvas.parent('#sketch-container');
  addScreenPositionFunction();

  cam = createEasyCam();
  cam.setRotationConstraint(false, false, false);

  textFont(latinModernRoman, 24);
};

window.draw = () => {
  background(0);
  ambientLight(200);
  directionalLight(128, 128, 128, -1, -1, -1);

  scale(30);

  // Plot axes
  strokeWeight(2);
  stroke('#f00');
  line(-8, 0, 0, 8, 0, 0);
  stroke('#0f0');
  line(0, -8, 0, 0, 8, 0);
  stroke('#88f');
  line(0, 0, -8, 0, 0, 8);

  // Plot foods
  noStroke();
  fill('#fff');

  for (let point of points) {
    push();
    translate(point.x, point.y, point.z);
    sphere(0.05);
    pop();
  }

  // Labels
  fill('#fff');
  let rotation = cam.getRotation();

  cam.beginHUD();
  textSize(24);
  for (let i = 0; i < points.length; i++) {
    push();
    let { x, y } = screenPosition([points[i][0] * 30, points[i][1] * 30]);
    text(labels[i], x, y);
    pop();

    ellipse(x + width, y + height, 100, 100);
  }

  cam.endHUD();

  // if (points.length > 0) noLoop();
};

(async () => {
  let rawData = JSON.parse(
    await (await fetch('data/food_3d_points.json')).text()
  );
  points = rawData.points;
  labels = rawData.labels;
  console.log(`Data loaded`);

  // Process the data a little
  points = points.map((p) => createVector(p[0], p[1], p[2]));
})();
