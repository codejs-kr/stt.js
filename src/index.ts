import mitt from 'mitt';
import { isSupportedBrowser } from './env';
import { linebreak, capitalize } from './utils';

const speechRecognition = window.webkitSpeechRecognition;
const recognition = new speechRecognition();
const emitter = mitt();

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

  on(eventName, listener) {
    emitter.on(eventName, listener);
  }

  off(eventName, listener) {
    emitter.off(eventName, listener);
  }

  start() {
    if (!isSupportedBrowser) {
      return {
        isSupportedBrowser,
      };
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
    console.log('onStart');
    this.isRecognizing = true;
    // emit start
    emitter.emit('start');
  }

  onEnd() {
    console.log('onEnd');
    this.isRecognizing = false;
    // emit end
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

    // emit
    // linebreak(finalTranscript)
    // linebreak(interimTranscript)

    // final_span.innerHTML = linebreak(finalTranscript);
    // interim_span.innerHTML = linebreak(interimTranscript);
  }

  onError(event) {
    this.isRecognizing = false;
    
    // emit error
    // event.error.match(/no-speech|audio-capture|not-allowed/)
    emitter.emit('error', event.error);
  }
}

export default STT;
