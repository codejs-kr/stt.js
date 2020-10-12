import './main.scss';
import STT from '../dist';

const stt = new STT({});
console.log('STT :>> ', stt);

stt.events.on('start', () => {
  alert('onstart');
});

stt.events.on('end', () => {
  alert('onend');
});

stt.start();

export default {};
