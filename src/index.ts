import mitt from 'mitt';
import { isSupportedBrowser } from './env';
import { linebreak, capitalize } from './utils';

const speechRecognition = window.webkitSpeechRecognition;
const recognition = new speechRecognition();
const emitter = mitt();

class STT {
  recognition: typeof speechRecognition;
  isRecognizing: boolean;
  finalTranscript: string = '';

  constructor({ language = 'ko' }) {
    this.recognition = recognition;
    this.recognition.lang = language;
    this.recognition.continuous = true;
    this.recognition.interimResults = true;

    this.recognition.onstart = this.onStart;
    this.recognition.onend = this.onResult;
    this.recognition.onresult = this.onResult;
    this.recognition.onerror = this.onError;
  }

  on(eventName: string, listener: () => void) {
    emitter.on(eventName, listener);
  }

  off(eventName: string, listener: () => void) {
    emitter.off(eventName, listener);
  }

  start() {
    if (!isSupportedBrowser) {
      emitter.emit('error', 'not-supported-browser');
      return;
    }

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
    this.isRecognizing = true;
    emitter.emit('start');
  }

  onEnd() {
    this.isRecognizing = false;
    emitter.emit('end');
  }

  onResult(event) {
    if (typeof event.results === 'undefined') {
      recognition.onend = null;
      recognition.stop();
      return false;
    }

    let interimTranscript = '';
    for (let i = event.resultIndex; i < event.results.length; ++i) {
      const transcript = event.results[i][0].transcript;

      if (event.results[i].isFinal) {
        this.finalTranscript += transcript;
      } else {
        interimTranscript += transcript;
      }
    }

    this.finalTranscript = capitalize(this.finalTranscript);

    // emit result
    emitter.emit('result', {
      finalTranscript: linebreak(this.finalTranscript),
      interimTranscript: linebreak(interimTranscript),
    });
  }

  onError(event) {
    this.isRecognizing = false;
    emitter.emit('error', event.error);
  }
}

export default STT;
