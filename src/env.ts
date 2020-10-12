const checkIsSupportedBrowser = () => {
  return typeof window.webkitSpeechRecognition === 'function';
};

export const isSupportedBrowser = checkIsSupportedBrowser();
