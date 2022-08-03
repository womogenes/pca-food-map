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

  cam = createEasyCam();
  // cam.setRotationConstraint(true, false, false);

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
  let [camX, camY, camZ] = cam.getPosition();

  let [q0, q1, q2, q3] = cam.getRotation();
  let phi = Math.atan2(2 * (q0 * q1 + q2 * q3), 1 - 2 * (q1 * q1 + q2 * q2));
  let theta = Math.asin(2 * (q0 * q2 - q3 * q1));
  let psi = Math.atan2(2 * q0 * q3 + q1 * q2, 1 - 2 * (q2 * q2 + q3 * q3));

  theta = camZ > 0 ? theta : -theta + PI;

  // console.log(theta);

  for (let i = 0; i < points.length; i++) {
    push();
    // rotateX(rotation.x);
    // rotateY(rotation.y);
    // rotateZ(rotation.z);

    translate(points[i].x, points[i].y, points[i].z);

    rotateY(-theta);
    //rotateX(phi);
    //rotateZ(psi);

    let d = dist(camX, camY, camZ, points[i].x, points[i].y, points[i].z);

    textSize(max(0, 100 / (d - 100)));
    text(labels[i], 0, 0);
    pop();
  }

  cam.beginHUD();
  textSize(24);
  text(frameRate(), 50, 50);
  cam.endHUD();

  // if (points.length > 0) noLoop();
};

function mouseDragged() {
  let gp;
  if (b.length != mouseArray) {
    cam.setRotation(current_rotation, 0);
    cam.setDistance(zoom);
  }
}

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
