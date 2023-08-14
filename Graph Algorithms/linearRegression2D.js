let G = {
  V: [
    [100, 200], // vertex 0 coordinates on canvas
    [260, 100], // vertex 1
    [260, 300], // vertex 2
    [420, 200], // vertex 3
  ],
  E: [
    [0, 1],
    [0, 2],
    [1, 2],
    [1, 3],
    [2, 3],
  ], // edges
};

let data = [
  { x: 100, y: 200 },
  { x: 260, y: 100 },
  { x: 260, y: 300 },
  { x: 420, y: 200 },
];

let m = 0; // Slope
let b = 0; // y-intercept

const LinearRegressionAndGraphExample = function (s) {
  let tnr;
  s.preload = function () {
    tnr = s.loadFont("../lib/font/times.ttf"); // loads font (Times new roman)
  };

  s.setup = function () {
    s.createCanvas(600, 600);
    s.background(200);

    s.g = new Graph_U(s, {
      V: G.V,
      E: G.E,
      font: tnr,
      start: 40,
      color_e: [7, 97, 7],
      color_v: s.color(255, 255, 0), // using the p5.js color function for yellow
    });

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
    s.background(200);

    // Show the graph
    s.g.show();

    // Draw the line of best fit
    let x1 = 0;
    let y1 = m * x1 + b;
    let x2 = s.width;
    let y2 = m * x2 + b;
    s.stroke(255, 0, 0);
    s.line(x1, y1, x2, y2);

    // Draw the data points
    s.stroke(0);
    for (let point of data) {
      s.ellipse(point.x, point.y, 10, 10);
    }
  };
};

let p = new p5(LinearRegressionAndGraphExample);
