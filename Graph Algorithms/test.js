let data = [
  { x: 100, y: 200 },
  { x: 260, y: 100 },
  { x: 260, y: 300 },
  { x: 420, y: 200 },
];

let m = 0;
let b = 0;
let dataIndex = 0;
let frameCounter = 0;

const LinearRegressionExample = function (s) {
  s.setup = function () {
    s.createCanvas(600, 600);
    s.background(0); // Changing the background color to black
    computeLine();
  };

  function computeLine() {
    let x_sum = 0;
    let y_sum = 0;
    for (let point of data) {
      x_sum += point.x;
      y_sum += point.y;
    }
    let x_mean = x_sum / data.length;
    let y_mean = y_sum / data.length;

    let numerator = 0;
    let denominator = 0;
    for (let point of data) {
      numerator += (point.x - x_mean) * (point.y - y_mean);
      denominator += (point.x - x_mean) ** 2;
    }
    m = numerator / denominator;
    b = y_mean - m * x_mean;
  }

  s.draw = function () {
    s.background(0);

    for (let i = 0; i <= dataIndex && i < data.length; i++) {
      let point = data[i];
      s.stroke(0, 255, 0); // Changing the point color to green for visibility against the black background
      s.ellipse(point.x, point.y, 10, 10);
      s.fill(255); // White text
      s.text(i, point.x + 8, point.y - 8); // Display the point number
      if (i > 0) {
        let previousPoint = data[i - 1];
        s.line(previousPoint.x, previousPoint.y, point.x, point.y); // Drawing line between consecutive data points
      }
    }

    if (frameCounter % 60 === 0 && dataIndex < data.length) {
      dataIndex++;
    }

    if (dataIndex === data.length) {
      let x1 = 0;
      let y1 = m * x1 + b;
      let x2 = s.width;
      let y2 = m * x2 + b;
      s.stroke(255, 0, 0);
      s.line(x1, y1, x2, y2);
    }

    frameCounter++;
  };
};

let p = new p5(LinearRegressionExample);
