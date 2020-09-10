const speechRecognition = window.webkitSpeechRecognition;
const recognition = new speechRecognition();

const FIRST_CHAR = /\S/;
const TWO_LINE = /\n\n/g;
const ONE_LINE = /\n/g;

class STT {
  recognition: any;

  constructor({}) {
    this.recognition = recognition;
    this.recognition.continuous = true;
    this.recognition.interimResults = true;
  }

  start() {}

  stop() {}

  onResult() {}

  onError() {}

  initialize() {
    // do something
  }
}

export default STT;
