// TODO: emitter
import { linebreak, capitalize } from './utils';

const speechRecognition = window.webkitSpeechRecognition;
const recognition = new speechRecognition();

class STT {
  recognition: any;
  isRecognizing: boolean;
  finalTranscript: string = '';

  constructor({ language = 'ko' }) {
    this.recognition = recognition;
    this.recognition.lang = language;
    this.recognition.continuous = true;
    this.recognition.interimResults = true;

    this.recognition.onstart = this.onStart;
    this.recognition.onresult = this.onResult;
    this.recognition.onend = this.onResult;
    this.recognition.onerror = this.onError;
  }

  start() {
    console.log('start');
    if (this.isRecognizing) {
      this.stop();
      return;
    }

    this.recognition.start();
  }

  stop() {
    this.recognition.stop();
  }

  onStart() {
    console.log('onStart');
    this.isRecognizing = true;
  }

  onResult(event) {
    console.log('onResult');

    let interimTranscript = '';
    if (typeof event.results === 'undefined') {
      recognition.onend = null;
      recognition.stop();
      return;
    }

    for (let i = event.resultIndex; i < event.results.length; ++i) {
      const transcript = event.results[i][0].transcript;

      if (event.results[i].isFinal) {
        this.finalTranscript += transcript;
      } else {
        interimTranscript += transcript;
      }
    }

    this.finalTranscript = capitalize(this.finalTranscript);
    // final_span.innerHTML = linebreak(finalTranscript);
    // interim_span.innerHTML = linebreak(interimTranscript);
  }

  onEnd() {
    console.log('onEnd');
    this.isRecognizing = false;
  }

  onError() {
    console.log('onError');
    this.isRecognizing = false;
  }

  initialize() {
    // do something
  }
}

export default STT;
