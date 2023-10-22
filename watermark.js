(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["watermark"] = factory();
	else
		root["watermark"] = factory();
})(window, function() {
return  (function(modules) { 
 	
 	var installedModules = {};

 	
 	function __webpack_require__(moduleId) {

 		
 		if(installedModules[moduleId]) {
 			return installedModules[moduleId].exports;
 		}
 		
 		var module = installedModules[moduleId] = {
 			i: moduleId,
 			l: false,
 			exports: {}
 		};

 		
 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

 		
 		module.l = true;

 		
 		return module.exports;
 	}


 	
 	__webpack_require__.m = modules;

 	
 	__webpack_require__.c = installedModules;

 	
 	__webpack_require__.d = function(exports, name, getter) {
 		if(!__webpack_require__.o(exports, name)) {
 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
 		}
 	};

 	
 	__webpack_require__.r = function(exports) {
 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
 		}
 		Object.defineProperty(exports, '__esModule', { value: true });
 	};

 	
 	
 	
 	
 	
 	__webpack_require__.t = function(value, mode) {
 		if(mode & 1) value = __webpack_require__(value);
 		if(mode & 8) return value;
 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
 		var ns = Object.create(null);
 		__webpack_require__.r(ns);
 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
 		return ns;
 	};

 	
 	__webpack_require__.n = function(module) {
 		var getter = module && module.__esModule ?
 			function getDefault() { return module['default']; } :
 			function getModuleExports() { return module; };
 		__webpack_require__.d(getter, 'a', getter);
 		return getter;
 	};

 	
 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

 	
 	__webpack_require__.p = "";


 	
 	return __webpack_require__(__webpack_require__.s = 0);
 })

 ([

 (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1).default;


 }),

 (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var style_image_namespaceObject = {};
__webpack_require__.r(style_image_namespaceObject);
__webpack_require__.d(style_image_namespaceObject, "atPos", function() { return atPos; });
__webpack_require__.d(style_image_namespaceObject, "lowerRight", function() { return lowerRight; });
__webpack_require__.d(style_image_namespaceObject, "upperRight", function() { return upperRight; });
__webpack_require__.d(style_image_namespaceObject, "lowerLeft", function() { return lowerLeft; });
__webpack_require__.d(style_image_namespaceObject, "upperLeft", function() { return upperLeft; });
__webpack_require__.d(style_image_namespaceObject, "center", function() { return center; });
var text_namespaceObject = {};
__webpack_require__.r(text_namespaceObject);
__webpack_require__.d(text_namespaceObject, "atPos", function() { return text_atPos; });
__webpack_require__.d(text_namespaceObject, "lowerRight", function() { return text_lowerRight; });
__webpack_require__.d(text_namespaceObject, "lowerLeft", function() { return text_lowerLeft; });
__webpack_require__.d(text_namespaceObject, "upperRight", function() { return text_upperRight; });
__webpack_require__.d(text_namespaceObject, "upperLeft", function() { return text_upperLeft; });
__webpack_require__.d(text_namespaceObject, "center", function() { return text_center; });

function sequence() {
  for (var _len = arguments.length, funcs = new Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  return function (value) {
    return funcs.reduce(function (val, fn) {
      return fn.call(null, val);
    }, value);
  };
}

function identity(x) {
  return x;
}

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function setAndResolve(img, src, resolve) {
  img.onload = function () {
    return resolve(img);
  };

  img.src = src;
}
function getLoader(resource) {
  var type = _typeof(resource);

  if (type === 'string') {
    return loadUrl;
  }

  if (resource instanceof Image) {
    return identity;
  }

  return loadFile;
}
function image_load(resources, init) {
  var promises = [];

  for (var i = 0; i < resources.length; i++) {
    var resource = resources[i];
    var loader = getLoader(resource);
    var promise = loader(resource, init);
    promises.push(promise);
  }

  return Promise.all(promises);
}
function loadUrl(url, init) {
  var img = new Image();
  typeof init === 'function' && init(img);
  return new Promise(function (resolve) {
    img.onload = function () {
      return resolve(img);
    };

    img.src = url;
  });
}
function loadFile(file) {
  var reader = new FileReader();
  return new Promise(function (resolve) {
    var img = new Image();

    reader.onloadend = function () {
      return setAndResolve(img, reader.result, resolve);
    };

    reader.readAsDataURL(file);
  });
}
function createImage(url, onload) {
  var img = new Image();

  if (typeof onload === 'function') {
    img.onload = onload;
  }

  img.src = url;
  return img;
}
function drawImage(img, canvas) {
  var ctx = canvas.getContext('2d');
  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0);
  return canvas;
}
function imageToCanvas(img, pool) {
  var canvas = pool.pop();
  return drawImage(img, canvas);
}
function mapToCanvas(images, pool) {
  return images.map(function (img) {
    return imageToCanvas(img, pool);
  });
}
function canvas_dataUrl(canvas) {
  var parameters = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    type: 'image/png',
    encoderOptions: 0.92
  };
  return canvas.toDataURL(parameters.type, parameters.encoderOptions);
}
var url = /^data:([^;]+);base64,(.*)$/;
function split(dataUrl) {
  return url.exec(dataUrl).slice(1);
}
function decode(base64) {
  return window.atob(base64);
}
function uint8(data) {
  var length = data.length;
  var uints = new Uint8Array(length);
  for (var i = 0; i < length; i++) {
    uints[i] = data.charCodeAt(i);
  }
  return uints;
}
var blob_blob = sequence(split, function (parts) {
  return [decode(parts[1]), parts[0]];
}, function (blob) {
  return new Blob([uint8(blob[0])], {
    type: blob[1]
  });
});
function atPos(xFn, yFn, alpha) {
  alpha || (alpha = 1.0);
  return function (target, watermark) {
    var context = target.getContext('2d');
    context.save();
    context.globalAlpha = alpha;
    context.drawImage(watermark, xFn(target, watermark), yFn(target, watermark));
    context.restore();
    return target;
  };
}
function lowerRight(alpha) {
  return atPos(function (target, mark) {
    return target.width - (mark.width + 10);
  }, function (target, mark) {
    return target.height - (mark.height + 10);
  }, alpha);
}
function upperRight(alpha) {
  return atPos(function (target, mark) {
    return target.width - (mark.width + 10);
  }, function (target, mark) {
    return 10;
  }, alpha);
}
function lowerLeft(alpha) {
  return atPos(function (target, mark) {
    return 10;
  }, function (target, mark) {
    return target.height - (mark.height + 10);
  }, alpha);
}
function upperLeft(alpha) {
  return atPos(function (target, mark) {
    return 10;
  }, function (target, mark) {
    return 10;
  }, alpha);
}
function center(alpha) {
  return atPos(function (target, mark) {
    return (target.width - mark.width) / 2;
  }, function (target, mark) {
    return (target.height - mark.height) / 2;
  }, alpha);
}
function text_atPos(xFn, yFn, text, font, fillStyle, alpha) {
  alpha || (alpha = 1.0);
  return function (target) {
    var context = target.getContext('2d');
    context.save();
    context.globalAlpha = alpha;
    context.fillStyle = fillStyle;
    context.font = font;
    var metrics = context.measureText(text);
    context.fillText(text, xFn(target, metrics, context), yFn(target, metrics, context));
    context.restore();
    return target;
  };
}
function text_lowerRight(text, font, fillStyle, alpha, y) {
  return text_atPos(function (target, metrics) {
    return target.width - (metrics.width + 10);
  }, function (target) {
    return y || target.height - 10;
  }, text, font, fillStyle, alpha);
}
function text_lowerLeft(text, font, fillStyle, alpha, y) {
  return text_atPos(function () {
    return 10;
  }, function (target) {
    return y || target.height - 10;
  }, text, font, fillStyle, alpha);
}
function text_upperRight(text, font, fillStyle, alpha, y) {
  return text_atPos(function (target, metrics) {
    return target.width - (metrics.width + 10);
  }, function () {
    return y || 20;
  }, text, font, fillStyle, alpha);
}
function text_upperLeft(text, font, fillStyle, alpha, y) {
  return text_atPos(function () {
    return 10;
  }, function () {
    return y || 20;
  }, text, font, fillStyle, alpha);
}
function text_center(text, font, fillStyle, alpha, y) {
  return text_atPos(function (target, metrics, ctx) {
    ctx.textAlign = 'center';
    return target.width / 2;
  }, function (target, metrics, ctx) {
    ctx.textBaseline = 'middle';
    return target.height / 2;
  }, text, font, fillStyle, alpha);
}
var style_image = style_image_namespaceObject;
var style_text = text_namespaceObject;
function style_result(draw, sources) {
  var canvas = draw.apply(null, sources);
  return {
    canvas: canvas,
    sources: sources
  };
}
function extend(first, second) {
  var secondKeys = Object.keys(second);
  secondKeys.forEach(function (key) {
    return first[key] = second[key];
  });
  return first;
}
function clone(obj) {
  return extend({}, obj);
}
function CanvasPool() {
  var canvases = [];
  return {
    pop: function pop() {
      if (this.length === 0) {
        canvases.push(document.createElement('canvas'));
      }

      return canvases.pop();
    },
    get length() {
      return canvases.length;
    },
    release: function release(canvas) {
      var context = canvas.getContext('2d');
      context.clearRect(0, 0, canvas.width, canvas.height);
      canvases.push(canvas);
    },
    clear: function clear() {
      canvases.splice(0, canvases.length);
    },
    get elements() {
      return canvases;
    }
  };
}
var shared = CanvasPool();
 var canvas_pool = (shared);
 __webpack_require__.d(__webpack_exports__, "default", function() { return watermark; });
var defaults = {
  init: function init() {},
  type: 'image/png',
  encoderOptions: 0.92
};
function mergeOptions(options) {
  return extend(clone(defaults), options);
}
function release(result, pool, parameters) {
  var canvas = result.canvas,
      sources = result.sources;
  var dataURL = canvas_dataUrl(canvas, parameters);
  sources.forEach(pool.release);
  return dataURL;
}
function watermark(resources) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var promise = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var opts = mergeOptions(options);
  promise || (promise = image_load(resources, opts.init));
  return {
    dataUrl: function dataUrl(draw) {
      var promise = this.then(function (images) {
        return mapToCanvas(images, canvas_pool);
      }).then(function (canvases) {
        return style_result(draw, canvases);
      }).then(function (result) {
        return release(result, canvas_pool, {
          type: opts.type,
          encoderOptions: opts.encoderOptions
        });
      });
      return watermark(resources, opts, promise);
    },
    load: function load(resources, init) {
      var promise = this.then(function (resource) {
        return image_load([resource].concat(resources), init);
      });
      return watermark(resources, opts, promise);
    },
    render: function render() {
      var promise = this.then(function (resource) {
        return image_load([resource]);
      });
      return watermark(resources, opts, promise);
    },
    blob: function blob(draw) {
      var promise = this.dataUrl(draw).then(blob_blob);
      return watermark(resources, opts, promise);
    },
    image: function image(draw) {
      var promise = this.dataUrl(draw).then(createImage);
      return watermark(resources, opts, promise);
    },
    then: function then() {
      for (var _len = arguments.length, funcs = new Array(_len), _key = 0; _key < _len; _key++) {
        funcs[_key] = arguments[_key];
      }

      return promise.then.apply(promise, funcs);
    }
  };
}
;

watermark.image = style_image;
watermark.text = style_text;

watermark.destroy = function () {
  return canvas_pool.clear();
};

 })
 ]);
});
