"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ERROR_TYPES = void 0;
var mitt_1 = __importDefault(require("mitt"));
var types_1 = require("./types");
Object.defineProperty(exports, "ERROR_TYPES", { enumerable: true, get: function () { return types_1.ERROR_TYPES; } });
var env_1 = require("./env");
var speechRecognition = window.webkitSpeechRecognition;
var recognition = new speechRecognition();
var emitter = mitt_1.default();
// REF: https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition
var STT = /** @class */ (function () {
    function STT(_a) {
        var _this = this;
        var _b = _a.lang, lang = _b === void 0 ? navigator.language : _b, _c = _a.continuous, continuous = _c === void 0 ? false : _c, _d = _a.interimResults, interimResults = _d === void 0 ? false : _d, _e = _a.maxAlternatives, maxAlternatives = _e === void 0 ? 1 : _e;
        this.isRecognizing = false;
        this.finalTranscript = '';
        this.start = function () {
            if (!env_1.isSupportedBrowser) {
                emitter.emit('error', types_1.ERROR_TYPES.NOT_SUPPORTED_BROWSER);
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
        this.abort = function () {
            _this.recognition.abort();
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
            var results = event.results, resultIndex = event.resultIndex;
            var interimTranscript = '';
            if (typeof results === 'undefined') {
                recognition.onend = null;
                recognition.stop();
                return;
            }
            for (var i = resultIndex; i < results.length; ++i) {
                var transcript = results[i][0].transcript;
                if (results[i].isFinal) {
                    _this.finalTranscript += transcript;
                    console.log('isFinal :>> ', transcript, results);
                }
                else {
                    interimTranscript += transcript;
                }
            }
            emitter.emit('result', {
                results: results,
                interimTranscript: interimTranscript,
                finalTranscript: _this.finalTranscript,
            });
        };
        this.onError = function (event) {
            _this.isRecognizing = false;
            emitter.emit('error', event.error);
        };
        this.getIsRecognizing = function () {
            return _this.isRecognizing;
        };
        this.getRecognition = function () {
            return _this.recognition;
        };
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