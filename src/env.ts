export const checkIsSupportedBrowser = () => {
  return typeof window.webkitSpeechRecognition === 'function';
};
