// TODO: emitter

const speechRecognition = window.webkitSpeechRecognition;
const recognition = new speechRecognition();

const FIRST_CHAR = /\S/;
const TWO_LINE = /\n\n/g;
const ONE_LINE = /\n/g;

class STT {
  recognition: any;
  isRecognizing: boolean;

  constructor({ language = "ko" }) {
    this.recognition = recognition;
    this.recognition.lang = language;
    this.recognition.continuous = true;
    this.recognition.interimResults = true;

    this.recognition.onstart = this.onStart;
    this.recognition.onresult = this.onResult;
  }

  start() {
    console.log("start");
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
    console.log("onStart");
    this.isRecognizing = true;
  }

  onResult() {}

  onError() {}

  initialize() {
    // do something
  }
}

export default STT;
