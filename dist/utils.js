"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.capitalize = exports.linebreak = void 0;
var FIRST_CHAR = /\S/;
var TWO_LINE = /\n\n/g;
var ONE_LINE = /\n/g;
/**
 * 개행 처리
 */
function linebreak(s) {
    return s.replace(TWO_LINE, '<p></p>').replace(ONE_LINE, '<br>');
}
exports.linebreak = linebreak;
/**
 * 첫문자를 대문자로 변환
 */
function capitalize(s) {
    return s.replace(FIRST_CHAR, function (m) {
        return m.toUpperCase();
    });
}
exports.capitalize = capitalize;
//# sourceMappingURL=utils.js.map