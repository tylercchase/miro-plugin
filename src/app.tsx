import {createRoot} from 'react-dom/client';

import '../src/assets/style.css';
import { FC, useEffect } from 'react';
import { StickyNote, StickyNoteColor } from '@mirohq/websdk-types';
import { StickyNoteStyle } from '@mirohq/websdk-types/stable/index';

let stickyNotes : {[x: number]: {[y: number]: StickyNote}}= {
}

async function addSticky() {
  const stickyNote = await miro.board.createStickyNote({
    content: 'Hello, World2!',
  });
  stickyNotes[0] = stickyNotes[0] || {}
  stickyNotes[0][0] = stickyNote;
  setInterval(updateStickyNotes, 1000)
  await miro.board.viewport.zoomTo(stickyNote);
}
let toggle = false

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
    addSticky();
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
      <div className="cs1 ce12">
        <a
          className="button button-primary"
          target="_blank"
          href="https://developers.miro.com"
        >
          Read the documentation
        </a>
      </div>
    </div>
  );
};

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(<App />);
