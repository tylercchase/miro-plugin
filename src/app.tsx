import { createRoot } from "react-dom/client";

import "../src/assets/style.css";
import { FC, useEffect } from "react";
import {
  Shape,
  ShapeStyle,
} from "@mirohq/websdk-types";

let boardShapes: Shape[]
async function setupBoard() {
  // we want a 40x40 space of shapes.
  // make it the first time, afterwards grab
  boardShapes =  await miro.board.get({
    type: "shape",
  })
  boardShapes.reverse(); // I want it top->bottom left->right
  // console.log(boardShapes)

  const video = document.getElementById("bad-apple-video") as HTMLVideoElement;


  video.addEventListener("loadeddata", () => {
    animate();
  });
}

function animate() {
  const video = document.getElementById("bad-apple-video") as HTMLVideoElement;
  const canvas = document.getElementById(
    "bad-apple-canvas"
  ) as HTMLCanvasElement;
  const width = 20;
  const height = 20;

  const context = canvas.getContext("2d") as CanvasRenderingContext2D;
  context.drawImage(video, 0, 0);

  const imageData = context.getImageData(0, 0, width, height);
  const data = imageData.data;
  const step = 1;
  for (let x = 0; x < width; x += step) {
    for (let y = 0; y < height; y += step) {
      const i = y * width + x;
      if (data[i] === 0) {
        console.log(boardShapes[i])
        // setShapeFill(boardShapes[i], true)
        // should show black
      } else {
        // setShapeFill(boardShapes[i], false)
        // should show white 
      }
    }
  }
  setTimeout(requestAnimationFrame.bind(null, animate), 10);
  // requestAnimationFrame(animate);
}

async function setShapeFill(shape: Shape, isDrawn: bool) {
  let style = {
    fillColor: isDrawn ? "#0000ff" : "#ffffff", // Default shape fill color: transparent (no fill)
    fillOpacity: 1.0, // Default fill color opacity: no opacity
  } as ShapeStyle;
  shape.style = style;
}

function onStartButton() {
  const video = document.getElementById('bad-apple-video') as HTMLVideoElement;
  video.play();

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
      <button onClick={onStartButton}>Start</button>
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
