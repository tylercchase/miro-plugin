import { createRoot } from "react-dom/client";

import "../src/assets/style.css";
import { FC, useEffect } from "react";
import {
  Shape,
  ShapeStyle,
} from "@mirohq/websdk-types";

let stickyNotes: { [x: number]: { [y: number]: Shape } } = {};

function setupBoard() {
  // we want a 40x40 space of shapes.
  // make it the first time, afterwards grab
  let shapes = miro.board.get({
    type: "shape",
  });
  console.log(shapes)

  const video = document.getElementById("bad-apple-video") as HTMLVideoElement;
  video.addEventListener("loadeddata", () => {
    video.play();
    animate();
  });
}

function animate() {
  const video = document.getElementById("bad-apple-video") as HTMLVideoElement;
  const canvas = document.getElementById(
    "bad-apple-canvas"
  ) as HTMLCanvasElement;
  const width = 40;
  const height = 40;

  const context = canvas.getContext("2d") as CanvasRenderingContext2D;
  context.drawImage(video, 0, 0);

  const imageData = context.getImageData(0, 0, width, height);
  const data = imageData.data;
  const step = 1;
  for (let x = 0; x < width; x += step) {
    for (let y = 0; y < height; y += step) {
      const i = y * width + x;
      if (data[i] === 0) {
        // should show white
      } else {
        // should show black (gray?)
      }
    }
  }
  requestAnimationFrame(animate);
}

function setShapeFill(shape: Shape, isDrawn: bool) {
  let style = {
    fillColor: isDrawn ? "#0000ff" : "#ffffff", // Default shape fill color: transparent (no fill)
    fillOpacity: 1.0, // Default fill color opacity: no opacity
  } as ShapeStyle;
  shape.style = style;
}


const App: FC = () => {
  useEffect(() => {
    setupBoard();
  }, []);

  return (
    <div className="grid wrapper">
      <div className="cs1 ce12">
        <img src="/src/assets/congratulations.png" alt="" />
      </div>
      <div className="cs1 ce12">
        <h1>Congratulations!</h1>
        <p>You've just created your first Miro app!</p>
        <p>
          To explore more and build your own app, see the Miro Developer
          Platform documentation.
        </p>
      </div>
      <video
        src="/src/assets/bad_apple.mp4"
        id="bad-apple-video"
        className="test"
        controls
      ></video>
      <canvas id="bad-apple-canvas"></canvas>
    </div>
  );
};

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);
root.render(<App />);
