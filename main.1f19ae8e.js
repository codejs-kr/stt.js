// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../../../Users/JS-HOME/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../../../Users/JS-HOME/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../../../Users/JS-HOME/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"main.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../../../Users/JS-HOME/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"../node_modules/mitt/dist/mitt.es.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(n) {
  return {
    all: n = n || new Map(),
    on: function (t, e) {
      var i = n.get(t);
      i && i.push(e) || n.set(t, [e]);
    },
    off: function (t, e) {
      var i = n.get(t);
      i && i.splice(i.indexOf(e) >>> 0, 1);
    },
    emit: function (t, e) {
      (n.get(t) || []).slice().map(function (n) {
        n(e);
      }), (n.get("*") || []).slice().map(function (n) {
        n(t, e);
      });
    }
  };
}
},{}],"../dist/env.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isSupportedBrowser = void 0;

var checkIsSupportedBrowser = function checkIsSupportedBrowser() {
  return typeof window.webkitSpeechRecognition === 'function';
};

exports.isSupportedBrowser = checkIsSupportedBrowser();
},{}],"../dist/utils.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.capitalize = exports.linebreak = void 0;
var FIRST_CHAR = /\S/;
var TWO_LINE = /\n\n/g;
var ONE_LINE = /\n/g;
/**
 * 개행 처리
 * @param {string} s
 */

function linebreak(s) {
  return s.replace(TWO_LINE, '<p></p>').replace(ONE_LINE, '<br>');
}

exports.linebreak = linebreak;
/**
 * 첫문자를 대문자로 변환
 * @param {string} s
 */

function capitalize(s) {
  return s.replace(FIRST_CHAR, function (m) {
    return m.toUpperCase();
  });
}

exports.capitalize = capitalize;
},{}],"../dist/index.js":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var mitt_1 = __importDefault(require("mitt"));

var env_1 = require("./env");

var utils_1 = require("./utils");

var speechRecognition = window.webkitSpeechRecognition;
var recognition = new speechRecognition();
var emitter = mitt_1.default(); // ref https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition

var STT =
/** @class */
function () {
  function STT(_a) {
    var _this = this;

    var _b = _a.lang,
        lang = _b === void 0 ? navigator.language : _b,
        _c = _a.continuous,
        continuous = _c === void 0 ? false : _c,
        _d = _a.interimResults,
        interimResults = _d === void 0 ? false : _d;
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
        } else {
          interimTranscript += transcript;
        }
      } // emit result


      emitter.emit('result', {
        finalTranscript: utils_1.linebreak(_this.finalTranscript),
        interimTranscript: utils_1.linebreak(interimTranscript),
        results: event.results
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
}();

exports.default = STT;
},{"mitt":"../node_modules/mitt/dist/mitt.es.js","./env":"../dist/env.js","./utils":"../dist/utils.js"}],"main.js":[function(require,module,exports) {
"use strict";

require("./main.scss");

var _dist = _interopRequireDefault(require("../dist"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var stt = new _dist.default({
  lang: 'ko-KR',
  continuous: true,
  interimResults: true
});
var $resultWrap = document.querySelector('#result');
var $finalText = document.querySelector('#final-text');
var $interimText = document.querySelector('#interim-text');
var $btnMic = document.querySelector('#btn-mic');
var $btnTTS = document.querySelector('#btn-tts');
var $iconMusic = document.querySelector('#icon-music');
var $audio = document.querySelector('#audio');

function bindSttEvents() {
  stt.on('start', function () {
    console.log('start :>> ');
    $btnMic.className = 'on';
    $finalText.innerHTML = '';
    $interimText.innerHTML = '';
  });
  stt.on('end', function () {
    console.log('end :>> ');
    $btnMic.className = 'off';
  });
  stt.on('result', function (_ref) {
    var finalTranscript = _ref.finalTranscript,
        interimTranscript = _ref.interimTranscript;
    console.log('result :>> ', finalTranscript, interimTranscript);
    $finalText.innerHTML = finalTranscript;
    $interimText.innerHTML = interimTranscript;
    fireCommand(interimTranscript);
  });
  stt.on('error', function (error) {
    // no-speech|audio-capture|not-allowed|not-supported-browser
    console.log('error :>> ', error);
    $btnMic.className = 'off';
    alert(error);
  });
}

function bindDomEvents() {
  $btnMic.addEventListener('click', function () {
    stt[stt.getIsRecognizing() ? 'stop' : 'start']();
  });
  $btnTTS.addEventListener('click', function () {
    var text = $finalText.innerText || '아직 내용이 없습니다.';
    textToSpeech(text);
  });
}
/**
 * 명령어 처리
 */


function fireCommand(string) {
  if (string.endsWith('레드')) {
    $resultWrap.style.backgroundColor = 'red';
  } else if (string.endsWith('블루')) {
    $resultWrap.style.backgroundColor = 'blue';
  } else if (string.endsWith('그린')) {
    $resultWrap.style.backgroundColor = 'green';
  } else if (string.endsWith('옐로우')) {
    $resultWrap.style.backgroundColor = 'yellow';
  } else if (string.endsWith('오렌지')) {
    $resultWrap.style.backgroundColor = 'orange';
  } else if (string.endsWith('그레이')) {
    $resultWrap.style.backgroundColor = 'grey';
  } else if (string.endsWith('골드')) {
    $resultWrap.style.backgroundColor = 'gold';
  } else if (string.endsWith('화이트')) {
    $resultWrap.style.backgroundColor = 'white';
  } else if (string.endsWith('블랙')) {
    $resultWrap.style.backgroundColor = 'black';
    $resultWrap.style.color = 'white';
  } else if (string.endsWith('알람') || string.endsWith('알 람')) {
    alert('알람');
  } else if (string.endsWith('노래 켜') || string.endsWith('음악 켜')) {
    $audio.play();
    $iconMusic.classList.add('visible');
  } else if (string.endsWith('노래 꺼') || string.endsWith('음악 꺼')) {
    $audio.pause();
    $iconMusic.classList.remove('visible');
  } else if (string.endsWith('볼륨 업') || string.endsWith('볼륨업')) {
    $audio.volume += 0.2;
  } else if (string.endsWith('볼륨 다운') || string.endsWith('볼륨다운')) {
    $audio.volume -= 0.2;
  } else if (string.endsWith('스피치') || string.endsWith('말해줘') || string.endsWith('말 해 줘')) {
    textToSpeech($finalText.innerHTML || '아직 내용이 없습니다.');
  }
}
/**
 * 문자를 음성으로 읽어 줍니다.
 * 지원: 크롬, 사파리, 오페라, 엣지
 */


function textToSpeech(text) {
  console.log('textToSpeech', arguments); // speechSynthesis options
  // const u = new SpeechSynthesisUtterance();
  // u.text = text;
  // u.lang = 'ko-KR';
  // u.rate = 1.5;
  // speechSynthesis.speak(u);
  // simple version

  window.speechSynthesis.speak(new SpeechSynthesisUtterance(text));
}

function init() {
  bindDomEvents();
  bindSttEvents();
}

init();
},{"./main.scss":"main.scss","../dist":"../dist/index.js"}],"../../../Users/JS-HOME/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "7433" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../Users/JS-HOME/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","main.js"], null)
//# sourceMappingURL=/main.1f19ae8e.js.map