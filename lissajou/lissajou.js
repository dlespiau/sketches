const canvasSketch = require("canvas-sketch");
const { dist, map, radians } = require("@ekinox/cetera");
const draw2D = require("@ekinox/cetera/draw");

const settings = {
  dimensions: [2048, 2048],
};

function lissajou(
  freqX,
  phaseX,
  freqY,
  width,
  height,
  { modX = 0, modY = 0 } = {}
) {
  const curve = new draw2D.Shape();

  for (let i = -width / 2; i < width / 2; i += 1) {
    const angle = map(i, -width / 2, width / 2, 0, 2 * Math.PI);
    const x =
      Math.sin(freqX * angle + radians(phaseX)) * Math.cos(angle * modX);
    const xt = map(x, -1, 1, -width / 2, width / 2);
    curve.vertex(
      xt,
      (height / 2) * Math.sin(freqY * angle) * Math.cos(angle * modY)
    );
  }

  return curve;
}

function drawShape(draw, s, radius) {
  const v = s.vertices;

  for (let i = 0; i < v.length; i++) {
    for (let j = 0; j < v.length; j++) {
      if (i === j) {
        continue;
      }

      const d = dist(v[i][0], v[i][1], v[j][0], v[j][1]);
      if (d > radius) {
        // we only connect points closer than radius.
        continue;
      }

      const a = Math.pow(1 / (d / radius + 1), 6);

      draw.ctx.strokeStyle = `rgba(0, 47, 167, ${a})`;
      draw.line(v[i][0], v[i][1], v[j][0], v[j][1]);
    }
  }
}

const curves = [
  {
    freqX: 13,
    phaseX: 45,
    freqY: 5,
    modX: 0,
    modY: 0,
    radius: 150,
  },
  {
    freqX: 2,
    phaseX: 90,
    freqY: 2,
    modX: 8,
    modY: 16,
    radius: 100,
  },
  {
    freqX: 4,
    phaseX: 90,
    freqY: 4,
    modX: 16.01,
    modY: 16.07,
    radius: 100,
  },
  {
    freqX: 4,
    phaseX: 1,
    freqY: 5,
    modX: 11,
    modY: 4,
    radius: 120,
  },
  {
    freqX: 4,
    phaseX: 90,
    freqY: 5,
    modX: 23,
    modY: 8,
    radius: 120,
  },
];

const sketch = () => {
  return ({ context, width, height }) => {
    const draw = new draw2D.Draw(context, width, height);

    draw.background("hsl(0, 0%, 98%)");

    draw.setTranslation(width / 2, height / 2);

    width *= 0.9;
    height *= 0.9;

    const p = curves[3];
    const curve = lissajou(p.freqX, p.phaseX, p.freqY, width, height, p);
    context.lineWidth = 1;
    context.fillStyle = "#ff0000";
    drawShape(draw, curve, p.radius);
    context.strokeStyle = "#002fa7";
    /*
    draw.shape(curve, {
      method: "point",
      closed: true
    });
    */
  };
};

canvasSketch(sketch, settings);
