import './main.scss';
import STT from '../dist';

const stt = new STT({
  lang: 'ko-KR',
  continuous: true,
  interimResults: true,
});
console.log('STT :>> ', stt);

const $resultWrap = document.querySelector('#result');
const $finalText = document.querySelector('#final-text');
const $interimText = document.querySelector('#interim-text');
const $btnMic = document.querySelector('#btn-mic');

function bindSttEvents() {
  stt.on('start', () => {
    console.log('start :>> ');
    $btnMic.className = 'on';
    $finalText.innerHTML = '';
    $interimText.innerHTML = '';
  });

  stt.on('end', () => {
    console.log('end :>> ');
    $btnMic.className = 'off';
  });

  stt.on('result', ({ finalTranscript, interimTranscript }) => {
    console.log('result :>> ', finalTranscript, interimTranscript);

    $finalText.innerHTML = finalTranscript;
    $interimText.innerHTML = interimTranscript;
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
