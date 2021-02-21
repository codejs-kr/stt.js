# stt.js

Speech To Text Javascript Library<br/>

## Install
```
npm install stt.js
```

## LiveDemo
https://play.codejs.co.kr/stt.js

## Browser support 
- Chrome >= 33
- Edge >= 82

https://caniuse.com/mdn-api_speechrecognitionevent

## Quick Start
Please first prepare your microphone

```javascript
import STT from 'stt.js';

const stt = new STT({
  continuous: true,
  interimResults: true,
});

stt.on('start', () => {
  // handle start event
});

stt.on('end', () => {
  // handle end event
});

stt.on('result', ({ finalTranscript, interimTranscript, results }) => {
  console.log('result :>> ', finalTranscript, interimTranscript, results);
  // handle recognition result
});

stt.on('error', (error) => {
  console.log('error :>> ', error);
  // no-speech|audio-capture|not-allowed|not-supported-browser
});

stt.start();
// stt.end();
```


## 인식률 측정

    맥북 내장 마이크 대략적인 거리별 인식 테스트 (4 ~ 6인 소회의실)
    조용한 환경에서 보통의 목소리 크기로 글을 읽어본 결과.
    - 1m 이내, 인식률 90% 이상
    - 1.2m 이내, 인식률 약 60 ~ 70%
    - 1.5m 초과, 인식률 약 10% 대로 문자 인식 어려움

    ※ 이어폰 마이크를 사용하면 더 나은 인식률을 보인다.
