const FIRST_CHAR = /\S/;
const TWO_LINE = /\n\n/g;
const ONE_LINE = /\n/g;

/**
 * 개행 처리
 */
export function linebreak(s: string) {
  return s.replace(TWO_LINE, '<p></p>').replace(ONE_LINE, '<br>');
}

/**
 * 첫문자를 대문자로 변환
 */
export function capitalize(s: string) {
  return s.replace(FIRST_CHAR, function (m) {
    return m.toUpperCase();
  });
}
