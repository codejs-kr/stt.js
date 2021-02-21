"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSupportedBrowser = void 0;
var checkIsSupportedBrowser = function () {
    return typeof window.webkitSpeechRecognition === 'function';
};
exports.isSupportedBrowser = checkIsSupportedBrowser();
//# sourceMappingURL=env.js.map