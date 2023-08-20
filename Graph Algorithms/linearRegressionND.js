let aSlider, bSlider, cSlider, dSlider;
let aVal, bVal, cVal, dVal;

const Visualization3D = function (s) {
  s.setup = function () {
    s.createCanvas(600, 600, s.WEBGL);
    s.background(0);

    // Create sliders for A, B, C, D coefficients
    aSlider = s.createSlider(-10, 10, 1, 0.1);
    bSlider = s.createSlider(-10, 10, 1, 0.1);
    cSlider = s.createSlider(-10, 10, 1, 0.1);
    dSlider = s.createSlider(-100, 100, 1, 1);

    aSlider.position(10, s.height - 100);
    bSlider.position(10, s.height - 70);
    cSlider.position(10, s.height - 40);
    dSlider.position(10, s.height - 10);

    aVal = s.createDiv("A: " + aSlider.value());
    bVal = s.createDiv("B: " + bSlider.value());
    cVal = s.createDiv("C: " + cSlider.value());
    dVal = s.createDiv("D: " + dSlider.value());

    aVal.position(160, s.height - 100);
    bVal.position(160, s.height - 70);
    cVal.position(160, s.height - 40);
    dVal.position(160, s.height - 10);

    aVal.style("color", "white");
    bVal.style("color", "white");
    cVal.style("color", "white");
    dVal.style("color", "white");
  };

  s.draw = function () {
    s.background(0);
    s.rotateX(s.frameCount * 0.01);
    s.rotateY(s.frameCount * 0.01);
    s.stroke(255);
    s.strokeWeight(0.5);
    s.noFill();

    let a = aSlider.value();
    let b = bSlider.value();
    let c = cSlider.value();
    let d = dSlider.value();

    // Update the coefficient display
    aVal.html("A: " + a.toFixed(2));
    bVal.html("B: " + b.toFixed(2));
    cVal.html("C: " + c.toFixed(2));
    dVal.html("D: " + d.toFixed(2));

    // Draw a grid
    for (let i = -300; i < 300; i += 10) {
      s.line(-300, i, 0, 300, i, 0);
      s.line(i, -300, 0, i, 300, 0);
      s.line(0, -300, i, 0, 300, i);
      s.line(0, i, -300, 0, i, 300);
    }

    // Draw the plane: Ax + By + Cz = D
    // We'll visualize the plane by taking 4 corner points.
    let corners = [
      { x: -300, y: (-a * -300 - c * -300 - d) / b },
      { x: 300, y: (-a * 300 - c * -300 - d) / b },
      { x: 300, y: (-a * 300 - c * 300 - d) / b },
      { x: -300, y: (-a * -300 - c * 300 - d) / b },
    ];

    s.beginShape();
    s.fill(150, 100, 255, 150); // semi-transparent color for the plane
    corners.forEach((corner) => {
      s.vertex(corner.x, corner.y, -300);
      s.vertex(corner.x, corner.y, 300);
    });
    s.endShape(s.CLOSE);
  };
};

let p = new p5(Visualization3D);
