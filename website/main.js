import './main.scss';
import STT from '../dist';

const stt = new STT({ language: 'ko' });
console.log('STT :>> ', stt);

const $btnMic = document.querySelector('#btn-mic');
const $resultWrap = document.querySelector('#result');

function bindSttEvents() {
  stt.on('start', () => {
    console.log('start :>> ');

    $btnMic.className = 'on';
    final_span.innerHTML = '';
    interim_span.innerHTML = '';
  });

  stt.on('end', () => {
    console.log('end :>> ');
    $btnMic.className = 'off';
  });

  stt.on('result', ({ finalTranscript, interimTranscript }) => {
    console.log('result :>> ', finalTranscript, interimTranscript);

    final_span.innerHTML = finalTranscript;
    interim_span.innerHTML = interimTranscript;
  });

  stt.on('error', (error) => {
    // no-speech|audio-capture|not-allowed|not-supported-browser
    console.log('error :>> ', error);
    $btnMic.className = 'off';
    alert(error);
  });
}

function bindDomEvents() {
  $btnMic.addEventListener('click', () => {
    stt[stt.getIsRecognizing() ? 'stop' : 'start']();
  });
}

function init() {
  bindDomEvents();
  bindSttEvents();
}
init();
