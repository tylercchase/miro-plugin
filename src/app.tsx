import {createRoot} from 'react-dom/client';

import '../src/assets/style.css';
import { FC, useEffect } from 'react';
import { Shape, StickyNote, StickyNoteColor } from '@mirohq/websdk-types';
import { StickyNoteStyle } from '@mirohq/websdk-types/stable/index';

let stickyNotes : {[x: number]: {[y: number]: Shape}}= {
}

async function addSticky() {
//   const stickyNote = await miro.board.createStickyNote({
//     content: 'Hello, World2!',
//   });
  const shape = await miro.board.createShape({shape: 'rectangle'})
  stickyNotes[0] = stickyNotes[0] || {}
  stickyNotes[0][0] = shape;
//   setInterval(updateStickyNotes, 1000)

  const videoElement = document.getElementById('bad-apple-video')
  const canvasElement = document.getElementById('bad-apple-canvas')

//   await miro.board.viewport.zoomTo(stickyNote);
}
let toggle = false


function setupBoard() {
 // we want a 40x40 space of shapes.
 // make it the first time, afterwards grab
 const video = document.getElementById('bad-apple-video') as HTMLVideoElement;
video.addEventListener('loadeddata', () => {
animate()
})
}

function animate() {
 const video = document.getElementById('bad-apple-video') as HTMLVideoElement;
 const canvas = document.getElementById('bad-apple-canvas') as HTMLCanvasElement;
 const width = 40;
 const height = 40;

 const context = canvas.getContext("2d") as CanvasRenderingContext2D;
 context.drawImage(video, 0,0);

 const imageData = context.getImageData(0,0,width, height)
 const data = imageData.data;
 const step = 1;
 for(let x=0; x < width; x += step) {
	for(let y = 0; y < height; y += step) {
		const i = (y * width + x)
		console.log(data[i])
	}
 }
 requestAnimationFrame(animate)
}

async function updateStickyNotes() {
	let style: StickyNoteStyle =  {
	fillColor: toggle ? 'black' : 'gray' as StickyNoteColor, // Default value: light yellow
	textAlign: 'center', // Default alignment: center
	textAlignVertical: 'middle', // Default alignment: middle
	}
	toggle = !toggle;
	stickyNotes[0][0].style = style;
	console.log('test');
	stickyNotes[0][0].sync();
}

const App: FC = () => {
  useEffect(() => {
    // addSticky();
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
      <video src='/src/assets/bad_apple.mp4' id='bad-apple-video' className='test' controls>
	  </video>
	  <canvas id='bad-apple-canvas'></canvas>
    </div>
  );
};

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(<App />);
