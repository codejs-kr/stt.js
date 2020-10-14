import './main.scss';
import STT from '../dist';

const stt = new STT({});
console.log('STT :>> ', stt);

stt.on('start', () => {
  console.log('start :>> ');
});

stt.on('end', () => {
  console.log('end :>> ');
});

stt.on('result', ({ finalTranscript, interimTranscript }) => {
  console.log('result :>> ', finalTranscript, interimTranscript);
});

stt.on('error', (error) => {
  console.log('error :>> ', error);
});

stt.start();

export default {};
