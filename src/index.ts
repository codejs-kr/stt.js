import mitt from 'mitt';
import { ERROR_TYPES } from './types';
import { isSupportedBrowser } from './env';

const speechRecognition = window.webkitSpeechRecognition;
const recognition = new speechRecognition();
const emitter = mitt();

// REF: https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition
class STT {
  private recognition: ReturnType<typeof speechRecognition>;
  private isRecognizing: boolean = false;
  private finalTranscript: string = '';

  constructor({ lang = navigator.language, continuous = false, interimResults = false, maxAlternatives = 1 }) {
    this.recognition = recognition;
    this.recognition.lang = lang;
    this.recognition.continuous = continuous;
    this.recognition.interimResults = interimResults;
    this.recognition.maxAlternatives = maxAlternatives;

    this.recognition.onstart = this.onStart;
    this.recognition.onend = this.onEnd;
    this.recognition.onresult = this.onResult;
    this.recognition.onerror = this.onError;
  }

  on(eventName: string, listener: () => void) {
    emitter.on(eventName, listener);
  }

  off(eventName: string, listener: () => void) {
    emitter.off(eventName, listener);
  }

  start = () => {
    if (!isSupportedBrowser) {
      emitter.emit('error', ERROR_TYPES.NOT_SUPPORTED_BROWSER);
      return;
    }

    if (this.isRecognizing) {
      this.stop();
      return;
    }

    this.finalTranscript = '';
    this.recognition.start();
  };

  stop = () => {
    this.recognition.stop();
  };

  abort = () => {
    this.recognition.abort();
  };

  onStart = () => {
    this.isRecognizing = true;
    emitter.emit('start');
  };

  onEnd = () => {
    this.isRecognizing = false;
    emitter.emit('end');
  };

  onResult = (event: { results: any[]; resultIndex: number }) => {
    const { results, resultIndex } = event;
    let interimTranscript: string = '';

    if (typeof results === 'undefined') {
      recognition.onend = null;
      recognition.stop();
      return;
    }

    for (let i = resultIndex; i < results.length; ++i) {
      const transcript = results[i][0].transcript;
      if (results[i].isFinal) {
        this.finalTranscript += transcript;
        console.log('isFinal :>> ', transcript, results);
      } else {
        interimTranscript += transcript;
      }
    }

    emitter.emit('result', {
      results,
      interimTranscript,
      finalTranscript: this.finalTranscript,
    });
  };

  onError = (event: { error: string }) => {
    this.isRecognizing = false;
    emitter.emit('error', event.error);
  };

  getIsRecognizing = () => {
    return this.isRecognizing;
  };

  getRecognition = () => {
    return this.recognition;
  };
}

export { ERROR_TYPES };

export default STT;
