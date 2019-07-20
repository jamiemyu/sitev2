const canvas = document.getElementById('canvas');
const barCanvas = document.getElementById('bar-canvas');
const CANVAS_WIDTH = 1000;
const CANVAS_HEIGHT = 600;
const BAR_CANVAS_HEIGHT = 100;
const BACKGROUND_COLOR = "white";
const BAR_COLOR = generateRandomColor();
const COLOR = "black";
const WIDTH = 10;

// Stores all shape objects drawn during animation.
const shapeArr = [];

const growScale = 2;
const shrinkScale = 1.2;

function renderBeatAnimation() {
    const point = {
		x: generateRandomValue(300, 700),
		y: generateRandomValue(100, 500),
	};
    const shapeObject = {
        point,
        radius: generateRandomValue(5, 25),
        color: generateRandomColor(),
        width: generateRandomValue(1, 2),
    };
	drawCircle(canvas, point, shapeObject.radius, {color: shapeObject.color, width: shapeObject.width})
    shapeArr.push(shapeObject);
}

function shrinkShapes() {
    // 1) Clear all existing shapes first.
	const context = canvas.getContext("2d");
	context.clearRect(0, 0, canvas.width, canvas.height);

    // 2) "Animate" existing shapes by re-drawing them on the canvas and
    // shrinking or growing them based on the boolean isGrowing (flips back and
    // forth).
    shapeArr.forEach((shape) => {
        drawCircle(canvas, shape.point, shape.radius / shrinkScale, {color: shape.color, width: shape.width});
    });
}

function growShapes() {
    // 1) Clear all existing shapes first.
	const context = canvas.getContext("2d");
	context.clearRect(0, 0, canvas.width, canvas.height);

    // 2) "Animate" existing shapes by re-drawing them on the canvas and
    // shrinking or growing them based on the boolean isGrowing (flips back and
    // forth).
    shapeArr.forEach((shape) => {
        drawCircle(canvas, shape.point, shape.radius * growScale, {color: shape.color, width: shape.width});
    });
}

function drawBars(canvas) {
	const context = canvas.getContext("2d");
	const numBars = 100;
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.fillStyle = BAR_COLOR;
	for (let n = 0; n < numBars; n++) {
		bar_x = n * (CANVAS_WIDTH / numBars);
		bar_width = 2;
		bar_height = -(data[n] / 6);
		context.fillRect(bar_x, canvas.height, bar_width, bar_height);
	}
}

// The Archimedean spiral is expressed as r=a+b(angle).
// Convert that into x, y coordinate, it will be expressed as:
// x=(a+b*angle)*cos(angle)
// y=(a+b*angle)*sin(angle)
// Returns the (x, y) point to draw at to form the spiral.
function drawSpiral(canvas, i, startingPoint) {
  const angle = 0.1 * i;
  const x = (1 + angle) * Math.cos(angle) + startingPoint.x;
  const y = (1 + angle) * Math.sin(angle) + startingPoint.y;
  return {x, y};
}

function generateRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Generates a random set of points (x, y) for a certain range [min, max] (inclusive)
function generateRandomPoint(range) {
  return {
    x: generateRandomValue(range.min, range.max),
    y: generateRandomValue(range.min, range.max),
  };
}

// Generates a random value between [min, max] (inclusive).
function generateRandomValue(minValue = 1, maxValue = 10) {
  min = Math.ceil(minValue);
  max = Math.floor(maxValue);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function drawBackground(
  canvas, 
  canvasDimensions, 
  color = BACKGROUND_COLOR) {
    const context = canvas.getContext("2d");
    context.canvas.width = canvasDimensions.width;
    context.canvas.height = canvasDimensions.height;
    context.fillStyle = color;
    context.fillRect(0, 0, canvasDimensions.width, canvasDimensions.height);
}

function drawLine(
  canvas, 
  startPoint, 
  endPoint, 
  lineProperties) {
    const context = canvas.getContext("2d");
    context.beginPath();
    context.moveTo(startPoint.x, startPoint.y);
    context.lineTo(endPoint.x, endPoint.y);
    context.lineWidth = lineProperties.width || WIDTH;
    context.strokeStyle = lineProperties.color || COLOR;
    context.stroke();
}

function drawSemiCircle(context, startPoint, radius, startAngle, endAngle, width, color) {
  context.beginPath();
  context.arc(startPoint.x, startPoint.y, radius, startAngle, endAngle);
  context.lineWidth = width;
  context.strokeStyle = color;
  context.stroke();
  context.closePath();
}

function drawCircle(canvas, 
  centerPoint,
  radius,
  circleProperties) {
    const color = circleProperties.color || COLOR;
    const context = canvas.getContext("2d");
    context.fillStyle = color;
    context.beginPath();
    context.arc(centerPoint.x, centerPoint.y, radius, 0, 2 * Math.PI);
    context.fill();
    context.lineWidth = circleProperties.width || WIDTH;
    context.strokeStyle = color;
    context.stroke();
}

function drawSquigglyLine(
  canvas, 
  startPoint, 
  radius,
  lineProperties) {
    const width = lineProperties.width || WIDTH;
    const color = lineProperties.color || COLOR;
    const context = canvas.getContext("2d");
    
    const endPoint = {
      x: startPoint.x + 6 * radius,
      y: startPoint.y,
    };
    
    const vector = {
      x: endPoint.x - startPoint.x,
      y: endPoint.y - startPoint.y,
    };
    const length = Math.sqrt(vector.x * vector.x + vector.y * vector.y);
    const normalVector = {
      x: vector.x / length,
      y: vector.y / length,
    };
    
    drawSemiCircle(
      context, 
      {x: startPoint.x, y: startPoint.y}, 
      radius, 
      0, 
      Math.PI, 
      width, 
      color);
    drawSemiCircle(
      context, 
      {x: (startPoint.x + 2 * radius), y: startPoint.y}, 
      radius,  
      Math.PI, 
      0,
      width, 
      color);
    drawSemiCircle(
      context, 
      {x: (startPoint.x + 4 * radius), y: startPoint.y}, 
      radius, 
      0, 
      Math.PI, 
      width, 
      color);
    drawSemiCircle(
      context, 
      {x: endPoint.x, y: endPoint.y}, 
      radius,  
      Math.PI, 
      0,
      width, 
      color);
}
