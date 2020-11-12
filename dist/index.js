"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mitt_1 = __importDefault(require("mitt"));
var env_1 = require("./env");
var utils_1 = require("./utils");
var speechRecognition = window.webkitSpeechRecognition;
var recognition = new speechRecognition();
var emitter = mitt_1.default();
// ref https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition
var STT = /** @class */ (function () {
    function STT(_a) {
        var _this = this;
        var _b = _a.lang, lang = _b === void 0 ? navigator.language : _b, _c = _a.continuous, continuous = _c === void 0 ? false : _c, _d = _a.interimResults, interimResults = _d === void 0 ? false : _d;
        this.isRecognizing = false;
        this.finalTranscript = '';
        this.start = function () {
            if (!env_1.isSupportedBrowser) {
                emitter.emit('error', 'not-supported-browser');
                return;
            }
            if (_this.isRecognizing) {
                _this.stop();
                return;
            }
            _this.finalTranscript = '';
            _this.recognition.start();
        };
        this.stop = function () {
            _this.recognition.stop();
        };
        this.onStart = function () {
            _this.isRecognizing = true;
            emitter.emit('start');
        };
        this.onEnd = function () {
            _this.isRecognizing = false;
            emitter.emit('end');
        };
        this.onResult = function (event) {
            var interimTranscript = '';
            if (typeof event.results === 'undefined') {
                recognition.onend = null;
                recognition.stop();
                return false;
            }
            for (var i = event.resultIndex; i < event.results.length; ++i) {
                var transcript = event.results[i][0].transcript;
                if (event.results[i].isFinal) {
                    _this.finalTranscript += transcript;
                    console.log('isFinal :>> ', transcript, event.results);
                }
                else {
                    interimTranscript += transcript;
                }
            }
            // emit result
            emitter.emit('result', {
                finalTranscript: utils_1.linebreak(_this.finalTranscript),
                interimTranscript: utils_1.linebreak(interimTranscript),
                results: event.results,
            });
        };
        this.onError = function (event) {
            _this.isRecognizing = false;
            emitter.emit('error', event.error);
        };
        this.getIsRecognizing = function () {
            return _this.isRecognizing;
        };
        this.recognition = recognition;
        this.recognition.lang = lang;
        this.recognition.continuous = continuous;
        this.recognition.interimResults = interimResults;
        this.recognition.onstart = this.onStart;
        this.recognition.onend = this.onEnd;
        this.recognition.onresult = this.onResult;
        this.recognition.onerror = this.onError;
    }
    STT.prototype.on = function (eventName, listener) {
        emitter.on(eventName, listener);
    };
    STT.prototype.off = function (eventName, listener) {
        emitter.off(eventName, listener);
    };
    return STT;
}());
exports.default = STT;
//# sourceMappingURL=index.js.map