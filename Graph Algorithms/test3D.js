let data = [
  { x: 100, y: 200, z: 50 },
  { x: 260, y: 100, z: 100 },
  { x: 260, y: 300, z: 150 },
  { x: 420, y: 200, z: 200 },
];

let dataIndex = 0;
let frameCounter = 0;

const shapes = ["sphere", "cylinder", "cone", "box"];
const colors = [
  [255, 0, 0], // Red for point 0
  [0, 255, 0], // Green for point 1
  [0, 0, 255], // Blue for point 2
  [255, 255, 0], // Yellow for point 3
];

const LinearRegression3DExample = function (s) {
  s.setup = function () {
    s.createCanvas(600, 600, s.WEBGL);
    s.background(0);
  };

  s.draw = function () {
    s.background(0);

    if (dataIndex === data.length) {
      s.rotateX(frameCounter * 0.005);
      s.rotateY(frameCounter * 0.005);
    }

    for (let i = 0; i <= dataIndex && i < data.length; i++) {
      let point = data[i];
      s.stroke(255);
      s.fill(...colors[i]);
      s.push();
      s.translate(point.x - s.width / 2, point.y - s.height / 2, point.z);

      switch (shapes[i]) {
        case "sphere":
          s.sphere(10);
          break;
        case "cylinder":
          s.cylinder(10, 20);
          break;
        case "cone":
          s.cone(10, 20);
          break;
        case "box":
          s.box(20);
          break;
        default:
          break;
      }

      s.pop();
    }

    for (let i = 0; i < dataIndex && i < data.length - 1; i++) {
      let pointA = data[i];
      let pointB = data[i + 1];
      s.stroke(255); // White lines for visibility
      s.line(
        pointA.x - s.width / 2,
        pointA.y - s.height / 2,
        pointA.z,
        pointB.x - s.width / 2,
        pointB.y - s.height / 2,
        pointB.z
      );
    }

    if (frameCounter % 60 === 0 && dataIndex < data.length) {
      dataIndex++;
    }

    frameCounter++;
  };
};

let p = new p5(LinearRegression3DExample);
