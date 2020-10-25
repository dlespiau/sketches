const canvasSketch = require("canvas-sketch");
const random = require("@ekinox/cetera/random");
const draw2D = require("@ekinox/cetera/draw");

const numTileX = 9;
const numTileY = 12;
const rand = new random.Seeded("Damien");

const settings = {
  dimensions: "a4",
  pixelsPerInch: 300,
  units: "px",
};

const palette0 = ["#ccf6c8", "#fafcc2", "#f6d6ad", "#f9c0c0"];
// grey, vintage, bright, pastel
const palette1 = ["#e0ece4", "#f7f2e7", "#d8d3cd", "#797a7e"];
// orange, turquoise, retro
const palette2 = ["#ff9a76", "#ffeadb", "#679b9b", "#637373"];

const sketch = () => {
  return ({ context, width, height }) => {
    const tile = {
      width: width / numTileX,
      height: height / numTileY,
      marginX: (0.2 * width) / numTileX,
      marginY: (0.2 * height) / numTileY,
    };
    const center = {
      x: width / 3,
      y: height / 3,
    };

    const draw = new draw2D.Draw(context, width, height);

    draw.background("hsl(0, 0%, 98%)");

    let step = 1;

    for (let i = 0; i < numTileX; i++) {
      for (let j = 0; j < numTileY; j++) {
        let palette = palette2;
        if (rand.float() > 0.3) {
          palette = palette1;
        }

        const bg = rand.rangeInt(0, palette.length - 1);
        context.fillStyle = palette[bg];

        const x = tile.width * i + tile.width / 2;
        const y = tile.height * j + tile.height / 2;

        /*
        const dir = {
          x: x - center.x,
          y: y - center.y,
        };
        const l = Math.sqrt(dir.x * dir.x + dir.y * dir.y);
        const unit = {
          x: dir.x / l,
          y: dir.y / l,
        };
        draw.setTranslation(x - unit.x * 100, y - unit.y * 900);
        */

        draw.setTranslation(x, y);

        const w = tile.width - tile.marginX;
        const h = tile.height - tile.marginY;
        const percent = rand.noise2D(
          (step / numTileX) * 0.55 + 0.4,
          (step / numTileY) * 0.55 + 0.4,
          16
        );
        draw.rect(w * percent, h * percent);

        /*
        const percent2 = rand.noise2D(
          (step / numTileX) * 0.55 + 0.4,
          (step / numTileY) * 0.55 + 0.4,
          32
        );

        context.fillStyle = palette[rand.rangeInt(0, palette.length - 1, [bg])];
        draw.rect(w * percent2, h * percent2);
        */

        step++;
      }
    }
  };
};

canvasSketch(sketch, settings);
