/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createCss = __webpack_require__(1);

	var _createCss2 = _interopRequireDefault(_createCss);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var $imgs = [],
	    $length = [],
	    $oldload = void 0,
	    $load = [],
	    $layzImgTimeout = void 0,
	    $layzImgLoadTimeout = void 0,
	    t = void 0,
	    $winHeight = window.innerHeight;

	var lazyImgScroll = function lazyImgScroll() {
	    t = document.documentElement.scrollTop || (document.body != null ? document.body.scrollTop : 0);
	    clearTimeout($layzImgTimeout);
	    t += $winHeight;
	    $layzImgTimeout = setTimeout(function () {
	        for (var i = 0; i < $length; i++) {
	            var $top;
	            if ($imgs[i].dataset.top == undefined) {
	                $top = $imgs[i].offsetTop;
	                var $p = $imgs[i].offsetParent;
	                while ($p && $p.tagName != "BODY") {
	                    $top += $p.offsetTop;
	                    $p = $p.offsetParent;
	                }
	                $imgs[i].dataset.top = $top;
	            }
	            $top = $imgs[i].dataset.top;

	            if ($top >= t - $winHeight * 1 && $top <= t && !$imgs[i].dataset.isload) {
	                $imgs[i].src = $imgs[i].dataset.src;
	                $imgs[i].dataset.isload = true;
	                $imgs[i].onload = function () {
	                    this.style.opacity = "1.0";
	                    this.onload = null;
	                };
	            }
	        }
	    }, 50);
	};

	var init = function init() {
	    (0, _createCss2.default)();
	};

	exports.default = {
	    install: function install(vue, optons) {
	        init();

	        var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
	        $oldload = window.onload;
	        if (MutationObserver != null) {
	            $load.push(function () {
	                var observer = new MutationObserver(function (mutations, observer) {
	                    clearTimeout($layzImgLoadTimeout);
	                    $layzImgLoadTimeout = setTimeout(function () {
	                        lazyImg();
	                        window.onscroll();
	                    }, 200);
	                });
	                observer.observe(document, {
	                    subtree: true,

	                    childList: true
	                });
	            });
	        } else {
	            $load.push(function () {
	                document.body.addEventListener('DOMSubtreeModified', function () {
	                    $layzImgLoadTimeout = setTimeout(function () {
	                        lazyImg();
	                        window.onscroll();
	                    }, 200);
	                }, false);
	            });
	        }
	        window.onscroll = lazyImgScroll;
	        window.lazyImg = lazyImg;
	        $load.push(lazyImg);
	        $load.push(lazyImgScroll);
	        window.onload = function () {
	            $oldload && $oldload();
	            $load.forEach(function (p) {
	                p();
	            });
	        };
	        window.onscroll();
	    }
	};

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function () {
	    var createCss = document.createElement('style');
	    createCss.innerHTML = '.lazyImg{opacity: 0;\n        transform: translateZ(0);\n        -webkit-transition-duration: .5s;\n        -moz-transition-duration: .5s;\n        -o-transition-duration: .5s;\n        transition-duration: .5s;\n    }';
	    document.body.appendChild(createCss);
	};

/***/ }
/******/ ]);