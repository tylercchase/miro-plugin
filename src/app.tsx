import { createRoot } from "react-dom/client";

import "../src/assets/style.css";
import { FC, useEffect } from "react";
import {
  StickyNote,
  StickyNoteColor,
  StickyNoteStyle,
} from "@mirohq/websdk-types";

let boardNotes: StickyNote[]
async function setupBoard() {
  // we want a 40x40 space of shapes.
  // make it the first time, afterwards grab
  boardNotes =  await miro.board.get({
    type: "sticky_note",
  })
  boardNotes.sort((a: StickyNote,b: StickyNote): number => {
    if(a.y < b.y) {return 1}
    else if(a.y > b.y){ return -1}
    else {return a.x < b.x ? 1 : -1}
  })
  boardNotes.reverse(); // I want it top->bottom left->right
  console.log(boardNotes);

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
  const width = 100;
  const height = 100;

  const context = canvas.getContext("2d") as CanvasRenderingContext2D;
  context.drawImage(video, 0, 0);

  const imageData = context.getImageData(0, 0, width, height);
  const data = imageData.data;
  const step = 10;
  for (let x = 0; x < width; x += step) {
    for (let y = 0; y < height; y += step) {
      const i = (y * width + x) * 4;
      const boardIndex = (y/step * 10 + (x/step));
      console.log(boardIndex)
      if (data[i] === 0) {
        setShapeFill(boardNotes[boardIndex], true)
        // should show black
      } else {
        setShapeFill(boardNotes[boardIndex], false)
        // should show white 
      }
    }
  }
  setTimeout(requestAnimationFrame.bind(null, animate), 10000);
  // requestAnimationFrame(animate);
}

async function setShapeFill(shape: StickyNote, isDrawn: bool) {
  let style = {
    fillColor: isDrawn ? 'black' : 'light_pink'//StickyNoteColor.Black : StickyNoteColor.LightPink, // Default shape fill color: transparent (no fill)
  } as StickyNoteStyle;
  shape.style = style;
  shape.sync();
}

function onStartButton() {
  const video = document.getElementById('bad-apple-video') as HTMLVideoElement;
  video.play();
  // video.currentTime = 20.0;
  animate();
}
const App: FC = () => {
  useEffect(() => {
    setupBoard();
  }, []);

  return (
    <div>
    <div className="grid wrapper">
      <button onClick={onStartButton}>Start</button>
      <video
        src="/src/assets/bad_apple.mp4"
        id="bad-apple-video"
        className="test"
        controls
      ></video>
      <canvas id="bad-apple-canvas"></canvas>
    </div>
    <div className="grid wrapper">
    </div>
    </div>
  );
};

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);
root.render(<App />);
