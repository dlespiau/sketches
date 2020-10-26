const canvasSketch = require("canvas-sketch");
const random = require("@ekinox/cetera/random");
const draw2D = require("@ekinox/cetera/draw");

const rand = new random.Seeded("Karen");

const numTiles = 64;

const settings = {
  dimensions: [2048, 2048],
};

const palette0 = ["#ccf6c8", "#fafcc2", "#f6d6ad", "#f9c0c0"];
// grey, vintage, bright, pastel
const palette1 = ["#e0ece4", "#f7f2e7", "#d8d3cd", "#797a7e"];
const palette2 = ["#ff9a76", "#ffeadb", "#679b9b", "#637373"];
const palette3 = ["#ffd31d", "#fae7cb", "#ffb385", "#ff7272"];
const palette = palette3;

const sketch = () => {
  return ({ context, width, height }) => {
    const draw = new draw2D.Draw(context, width, height);
    const tile = {
      width: width / numTiles,
      height: height / numTiles,
    };

    draw.background("hsl(0, 0%, 98%)");
    draw.setTranslation(0, tile.width / 2);

    for (let i = 0; i < numTiles; i++) {
      for (let j = 0; j < numTiles; j++) {
        const x = tile.width * i;
        const y = tile.height * j;
        const w = tile.width;
        const h = tile.height;

        context.lineCap = "round";

        /*
        Quadrant

        let color = palette[2];
        if (
          (i < numTiles / 2 && j < numTiles / 2) ||
          (i >= numTiles / 2 && j >= numTiles / 2)
        ) {
          color = palette[3];
        }
        */

        /*
        Bands
        if (j % 4 == 3 || j % 4 == 2) {
          continue;
        }

        let color = palette[3];
        if (j % 16 == 1 || j % 16 == 0) {
          color = palette[0];
        } else if (j % 16 == 4 || j % 16 == 5) {
          color = palette[2];
        } else if (j % 16 == 8 || j % 16 == 9) {
          color = palette[1];
        }
        */

        if (rand.boolean()) {
          context.lineWidth = 16;
          context.strokeStyle = palette[3];
          draw.line(x, y, x + w, y + h);
        } else {
          context.lineWidth = 16;
          context.strokeStyle = palette[3];
          draw.line(x, y + h, x + w, y);
        }
      }
    }
  };
};

canvasSketch(sketch, settings);
