let m = 2; // Slope
let b = 50; // y-intercept
let currentX = -300; // Start from the leftmost point
let scale = 2; // Zoom factor
let currentAnnotationX = -300; // Start from the leftmost point for annotations
let animateLine = false; // Condition to start the red line animation
let lastAnnotationTimestamp = 0; // Last time when an annotation was drawn
let annotationDelay = 1000; // 1 second delay between annotations

const LinearRegressionPlot = function (s) {
  s.setup = function () {
    s.createCanvas(600, 600);
    s.background(0);
  };

  s.draw = function () {
    s.background(0);

    // Drawing the coordinate system
    s.stroke(255);
    s.line(0, s.height / 2, s.width, s.height / 2); // X-axis
    s.line(s.width / 2, 0, s.width / 2, s.height); // Y-axis

    // Displaying the function
    s.noStroke();
    s.fill(255);
    s.textSize(20);
    s.text(`y = ${m}x + ${b}`, 10, 30);

    // Displaying X and Y labels
    s.text("X", s.width - 20, s.height / 2 + 20);
    s.text("Y", s.width / 2 + 10, 20);

    for (let x = -300; x <= currentAnnotationX && x <= 300; x += 50) {
      let y = m * x + b;
      let adjustedX = s.width / 2 + x / scale; // Adjusting X coordinate
      let adjustedY = s.height / 2 - y / scale; // Adjusting Y coordinate

      s.stroke(150);
      s.line(adjustedX, s.height / 2, adjustedX, adjustedY);
      s.line(s.width / 2, adjustedY, adjustedX, adjustedY);

      s.noStroke();
      s.fill(255);
      s.textSize(12);
      s.text(x, adjustedX, s.height / 2 + 20);
      s.text(Math.round(y), s.width / 2 - 30, adjustedY);
    }

    if (currentAnnotationX < 300 && !animateLine) {
      if (s.millis() - lastAnnotationTimestamp > annotationDelay) {
        currentAnnotationX += 50;
        lastAnnotationTimestamp = s.millis();
      }
    }

    if (currentAnnotationX >= 300 && !animateLine) {
      setTimeout(() => {
        animateLine = true;
      }, 1000); // 1 second delay before starting the red line animation
    }

    if (animateLine) {
      // Plotting y = mx + b with animation
      s.stroke(255, 0, 0);
      let startX = s.width / 2 + -300 / scale;
      let startY = s.height / 2 - (m * -300 + b) / scale;
      let endX = s.width / 2 + currentX / scale;
      let endY = s.height / 2 - (m * currentX + b) / scale;

      s.line(startX, startY, endX, endY); // Red line

      if (currentX < 300) {
        currentX++;
      }
    }
  };
};

let p = new p5(LinearRegressionPlot);
