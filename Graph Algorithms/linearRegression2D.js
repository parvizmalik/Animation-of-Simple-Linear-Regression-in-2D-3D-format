let startPoint = { x: 100, y: 300 };
let endPoint = { x: 500, y: 300 };
let draggingStart = false;
let draggingEnd = false;

const DraggableRegression = function (s) {
  s.setup = function () {
    s.createCanvas(600, 600);
    s.background(0);
  };

  s.draw = function () {
    s.background(0);

    // Drawing the coordinate system
    s.stroke(255);
    s.line(0, s.height / 2, s.width, s.width / 2); // X-axis
    s.line(s.width / 2, 0, s.width / 2, s.height); // Y-axis

    // Drawing the draggable regression line
    s.stroke(255, 0, 0);
    s.line(startPoint.x, startPoint.y, endPoint.x, endPoint.y);

    // Drawing handles for the line
    s.fill(255, 0, 0);
    s.ellipse(startPoint.x, startPoint.y, 10);
    s.ellipse(endPoint.x, endPoint.y, 10);

    // Display the linear regression equation
    displayEquation();
  };

  s.mousePressed = function () {
    if (s.dist(s.mouseX, s.mouseY, startPoint.x, startPoint.y) < 10) {
      draggingStart = true;
    } else if (s.dist(s.mouseX, s.mouseY, endPoint.x, endPoint.y) < 10) {
      draggingEnd = true;
    }
  };

  s.mouseReleased = function () {
    draggingStart = false;
    draggingEnd = false;
  };

  s.mouseDragged = function () {
    if (draggingStart) {
      startPoint.x = s.mouseX;
      startPoint.y = s.mouseY;
    } else if (draggingEnd) {
      endPoint.x = s.mouseX;
      endPoint.y = s.mouseY;
    }
  };

  function displayEquation() {
    let deltaY = endPoint.y - startPoint.y;
    let deltaX = endPoint.x - startPoint.x;

    let m = deltaY / deltaX;
    let b = startPoint.y - m * startPoint.x + s.height / 2; // Adjusting for the coordinate system's center y

    s.fill(255);
    s.textSize(16);
    s.text(`y = ${m.toFixed(2)}x + ${b.toFixed(2)}`, 10, s.height - 10);
  }
};

let p = new p5(DraggableRegression);
