"use strict";
// TODO: emitter
Object.defineProperty(exports, "__esModule", { value: true });
var speechRecognition = window.webkitSpeechRecognition;
var recognition = new speechRecognition();
var FIRST_CHAR = /\S/;
var TWO_LINE = /\n\n/g;
var ONE_LINE = /\n/g;
var STT = /** @class */ (function () {
    function STT(_a) {
        var _b = _a.language, language = _b === void 0 ? 'ko' : _b;
        this.recognition = recognition;
        this.recognition.lang = language;
        this.recognition.continuous = true;
        this.recognition.interimResults = true;
        this.recognition.onstart = this.onStart;
        this.recognition.onresult = this.onResult;
    }
    STT.prototype.start = function () {
        console.log('start');
        if (this.isRecognizing) {
            this.stop();
            return;
        }
        this.recognition.start();
    };
    STT.prototype.stop = function () {
        this.recognition.stop();
    };
    STT.prototype.onStart = function () {
        console.log('onStart');
        this.isRecognizing = true;
    };
    STT.prototype.onResult = function () { };
    STT.prototype.onError = function () { };
    STT.prototype.initialize = function () {
        // do something
    };
    return STT;
}());
exports.default = STT;
//# sourceMappingURL=index.js.map