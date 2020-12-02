import './main.scss';
import STT from '../dist';

const stt = new STT({
  continuous: true,
  interimResults: true,
});

const DEFAULT_MESSAGE = '입력된 내용이 없습니다.';
const $resultWrap = document.querySelector('#result');
const $finalText = document.querySelector('#final-text');
const $interimText = document.querySelector('#interim-text');
const $btnMic = document.querySelector('#btn-mic');
const $btnTTS = document.querySelector('#btn-tts');
const $iconMusic = document.querySelector('#icon-music');
const $audio = document.querySelector('#audio');
const $commands = document.querySelector('#commands');
const $btnOpener = document.querySelector('#btn-commands-opener');

function bindSttEvents() {
  stt.on('start', () => {
    console.log('start :>> ');
    $btnMic.classList.replace('off', 'on');
    $finalText.innerHTML = '';
    $interimText.innerHTML = '';
  });

  stt.on('end', () => {
    console.log('end :>> ');
    $btnMic.classList.replace('on', 'off');
  });

  stt.on('result', ({ finalTranscript, interimTranscript }) => {
    console.log('result :>> ', finalTranscript, interimTranscript);

    $finalText.innerHTML = finalTranscript;
    $interimText.innerHTML = interimTranscript;
    fireCommand(interimTranscript);
  });

  stt.on('error', (error) => {
    console.log('error :>> ', error);
    // no-speech|audio-capture|not-allowed|not-supported-browser
    $btnMic.classList.replace('on', 'off');

    switch (error) {
      case 'not-allowed':
        alert('마이크 권한이 필요합니다.');
        break;
      default:
        alert(error);
    }
  });
}

function bindDomEvents() {
  $btnMic.addEventListener('click', () => {
    stt[stt.getIsRecognizing() ? 'stop' : 'start']();
  });

  $btnTTS.addEventListener('click', () => {
    const text = $finalText.innerText || DEFAULT_MESSAGE;
    textToSpeech(text);
  });

  $btnOpener.addEventListener('click', () => {
    if ($btnOpener.classList.contains('active')) {
      $btnOpener.classList.remove('active');
      $commands.classList.remove('active');
    } else {
      $btnOpener.classList.add('active');
      $commands.classList.add('active');
    }
  });
}

/**
 * 명령어 처리
 */
function fireCommand(string) {
  if (string.endsWith('레드')) {
    $resultWrap.style.backgroundColor = 'red';
  } else if (string.endsWith('블루')) {
    $resultWrap.style.backgroundColor = 'blue';
  } else if (string.endsWith('그린')) {
    $resultWrap.style.backgroundColor = 'green';
  } else if (string.endsWith('옐로우')) {
    $resultWrap.style.backgroundColor = 'yellow';
  } else if (string.endsWith('오렌지')) {
    $resultWrap.style.backgroundColor = 'orange';
  } else if (string.endsWith('그레이')) {
    $resultWrap.style.backgroundColor = 'grey';
  } else if (string.endsWith('골드')) {
    $resultWrap.style.backgroundColor = 'gold';
  } else if (string.endsWith('화이트')) {
    $resultWrap.style.backgroundColor = 'white';
  } else if (string.endsWith('블랙')) {
    $resultWrap.style.backgroundColor = 'black';
    $resultWrap.style.color = 'white';
  } else if (string.endsWith('알람') || string.endsWith('알 람')) {
    alert('알람');
  } else if (string.endsWith('노래 켜') || string.endsWith('음악 켜')) {
    $audio.play();
    $iconMusic.classList.add('visible');
  } else if (string.endsWith('노래 꺼') || string.endsWith('음악 꺼')) {
    $audio.pause();
    $iconMusic.classList.remove('visible');
  } else if (string.endsWith('볼륨 업') || string.endsWith('볼륨업')) {
    $audio.volume += 0.2;
  } else if (string.endsWith('볼륨 다운') || string.endsWith('볼륨다운')) {
    $audio.volume -= 0.2;
  } else if (string.endsWith('스피치') || string.endsWith('말해줘') || string.endsWith('말 해 줘')) {
    textToSpeech($finalText.innerHTML || DEFAULT_MESSAGE);
  }
}

/**
 * 문자를 음성으로 읽어 줍니다.
 * 지원: 크롬, 사파리, 오페라, 엣지
 */
function textToSpeech(text) {
  console.log('textToSpeech', arguments);

  // speechSynthesis options
  // const u = new SpeechSynthesisUtterance();
  // u.text = text;
  // u.lang = 'ko-KR';
  // u.rate = 1.5;
  // speechSynthesis.speak(u);

  // simple version
  window.speechSynthesis.speak(new SpeechSynthesisUtterance(text));
}

function init() {
  bindDomEvents();
  bindSttEvents();
}
init();
