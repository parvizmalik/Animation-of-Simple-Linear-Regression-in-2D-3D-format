let data = [
  { x: 50, y: 150, z: 100 },
  { x: 150, y: 250, z: 200 },
  { x: 250, y: 150, z: 150 },
  { x: 350, y: 300, z: 250 },
  { x: 450, y: 450, z: 300 },
];

let rotationX = 0;
let rotationY = 0;

const Regression3DExample = function (s) {
  s.setup = function () {
    s.createCanvas(800, 800, s.WEBGL);
    s.background(200);
  };

  s.draw = function () {
    s.background(200);
    s.rotateX(rotationX);
    s.rotateY(rotationY);

    // Draw data points
    s.stroke(0);
    s.fill(0, 0, 255); // Blue color for points
    for (let point of data) {
      s.push();
      s.translate(point.x - s.width / 2, point.y - s.height / 2, point.z);
      s.sphere(5);
      s.pop();
    }

    // Here, we'd calculate and draw our plane of best fit.
    // A plane is defined by a point and a normal vector.
    // However, computing this for 3D linear regression is complex.
    // For the sake of this visualization, I'm skipping that.

    // To help in understanding the 3D space, draw axes
    drawAxes(s);
  };

  s.mouseDragged = function () {
    let dx = s.mouseX - s.pmouseX;
    let dy = s.mouseY - s.pmouseY;
    rotationY += dx * 0.01;
    rotationX += dy * 0.01;
  };
};

let p = new p5(Regression3DExample);

function drawAxes(s) {
  // X-axis
  s.stroke(255, 0, 0);
  s.line(-s.width / 2, 0, 0, s.width / 2, 0, 0);
  // Y-axis
  s.stroke(0, 255, 0);
  s.line(0, -s.height / 2, 0, 0, s.height / 2, 0);
  // Z-axis
  s.stroke(0, 0, 255);
  s.line(0, 0, -s.width / 2, 0, 0, s.width / 2);
}
