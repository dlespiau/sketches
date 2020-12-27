const canvasSketch = require("canvas-sketch");
const { map, radians } = require("@ekinox/cetera");
const draw2D = require("@ekinox/cetera/draw");

const settings = {
  dimensions: [2048, 2048],
};

function lissajou(freqX, phaseX, freqY, width, height) {
  const curve = new draw2D.Shape();

  for (let i = -width / 2; i < width / 2; i += 1) {
    const angle = map(i, -width / 2, width / 2, 0, 2 * Math.PI);
    const x = Math.sin(freqX * angle + radians(phaseX));
    const xt = map(x, -1, 1, -width / 2, width / 2);
    curve.vertex(xt, (height / 2) * Math.sin(freqY * angle));
  }

  return curve;
}

const sketch = () => {
  return ({ context, width, height }) => {
    const draw = new draw2D.Draw(context, width, height);

    draw.background("hsl(0, 0%, 98%)");
    draw.setTranslation(width / 2, height / 2);

    width *= 0.9;
    height *= 0.9;

    const curve = lissajou(11, 90, 13, width, height);
    context.lineWidth = 18;
    context.strokeStyle = "#002fa7";
    draw.shape(curve, { closed: true });
  };
};

canvasSketch(sketch, settings);
