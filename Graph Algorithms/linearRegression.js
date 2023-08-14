let data = [
  { x: 50, y: 150 },
  { x: 150, y: 250 },
  { x: 250, y: 150 },
  { x: 350, y: 300 },
  { x: 450, y: 450 },
];

const LinearRegression2DExample = function (s) {
  let m = 0; // Slope
  let b = 0; // Intercept

  // Function to calculate the slope and y-intercept
  function calculateLine() {
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

  s.setup = function () {
    s.createCanvas(600, 600);
    s.background(200);
    calculateLine();
  };

  s.draw = function () {
    s.background(200);

    let x1 = 0;
    let y1 = m * x1 + b;
    let x2 = s.width;
    let y2 = m * x2 + b;
    s.stroke(255, 0, 0);
    s.line(x1, y1, x2, y2);

    s.stroke(0);
    for (let point of data) {
      s.ellipse(point.x, point.y, 5, 5);
    }
  };
};

let p = new p5(LinearRegression2DExample);
