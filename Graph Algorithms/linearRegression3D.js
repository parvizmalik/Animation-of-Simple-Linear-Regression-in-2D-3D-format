let startDraggable = { x: -100, y: -100, z: 0 };
let endDraggable = { x: 100, y: 100, z: 200 };
let draggingStart = false;
let draggingEnd = false;

const DraggablePlane = function (s) {
  s.setup = function () {
    s.createCanvas(600, 600, s.WEBGL);
  };

  s.draw = function () {
    s.background(0);

    s.orbitControl(); // Allows you to drag and move the scene

    // Draw the 3D axes
    drawAxes();

    if (draggingStart) {
      startDraggable.x = s.mouseX - s.width / 2;
      startDraggable.y = -(s.mouseY - s.height / 2); // WebGL's Y-axis is inverted
    } else if (draggingEnd) {
      endDraggable.x = s.mouseX - s.width / 2;
      endDraggable.y = -(s.mouseY - s.height / 2);
    }

    // Draw the plane represented by the linear regression model
    drawPlane();

    // Drawing handles for dragging
    s.fill(255, 0, 0);
    s.push();
    s.translate(startDraggable.x, startDraggable.y, startDraggable.z);
    s.sphere(10);
    s.pop();

    s.push();
    s.translate(endDraggable.x, endDraggable.y, endDraggable.z);
    s.sphere(10);
    s.pop();
  };

  s.mousePressed = function () {
    if (
      s.dist(
        s.mouseX,
        s.mouseY,
        startDraggable.x + s.width / 2,
        startDraggable.y + s.height / 2
      ) < 10
    ) {
      draggingStart = true;
    } else if (
      s.dist(
        s.mouseX,
        s.mouseY,
        endDraggable.x + s.width / 2,
        endDraggable.y + s.height / 2
      ) < 10
    ) {
      draggingEnd = true;
    }
  };

  s.mouseReleased = function () {
    draggingStart = false;
    draggingEnd = false;
  };

  function drawAxes() {
    s.stroke(255);
    s.strokeWeight(2);
    s.line(-s.width / 2, 0, 0, s.width / 2, 0, 0); // X-axis
    s.line(0, -s.height / 2, 0, 0, s.height / 2, 0); // Y-axis
    s.line(0, 0, -200, 0, 0, 200); // Z-axis
  }

  function drawPlane() {
    let ax = endDraggable.x - startDraggable.x;
    let ay = endDraggable.y - startDraggable.y;
    let az = endDraggable.z - startDraggable.z;

    s.fill(100, 150, 255, 150);
    s.beginShape();
    s.vertex(startDraggable.x, startDraggable.y, startDraggable.z);
    s.vertex(endDraggable.x, endDraggable.y, endDraggable.z);
    s.vertex(endDraggable.x, endDraggable.y, startDraggable.z);
    s.vertex(startDraggable.x, startDraggable.y, endDraggable.z);
    s.endShape(s.CLOSE);
  }
};

let p = new p5(DraggablePlane);
