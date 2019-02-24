/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

eval("throw new Error(\"Module build failed: Error: Cannot find module '@babel/plugin-proposal-class-properties' from '/home/summers/Projects/devnexus-pwa'\\n    at Function.module.exports [as sync] (/home/summers/Projects/devnexus-pwa/node_modules/resolve/lib/sync.js:40:15)\\n    at resolveStandardizedName (/home/summers/Projects/devnexus-pwa/node_modules/@babel/core/lib/config/files/plugins.js:78:29)\\n    at resolvePlugin (/home/summers/Projects/devnexus-pwa/node_modules/@babel/core/lib/config/files/plugins.js:27:10)\\n    at loadPlugin (/home/summers/Projects/devnexus-pwa/node_modules/@babel/core/lib/config/files/plugins.js:35:18)\\n    at createDescriptor (/home/summers/Projects/devnexus-pwa/node_modules/@babel/core/lib/config/config-descriptors.js:135:21)\\n    at /home/summers/Projects/devnexus-pwa/node_modules/@babel/core/lib/config/config-descriptors.js:101:12\\n    at Array.map (<anonymous>)\\n    at createDescriptors (/home/summers/Projects/devnexus-pwa/node_modules/@babel/core/lib/config/config-descriptors.js:100:27)\\n    at createPluginDescriptors (/home/summers/Projects/devnexus-pwa/node_modules/@babel/core/lib/config/config-descriptors.js:96:10)\\n    at /home/summers/Projects/devnexus-pwa/node_modules/@babel/core/lib/config/config-descriptors.js:47:19\\n    at plugins (/home/summers/Projects/devnexus-pwa/node_modules/@babel/core/lib/config/config-descriptors.js:37:25)\\n    at mergeChainOpts (/home/summers/Projects/devnexus-pwa/node_modules/@babel/core/lib/config/config-chain.js:291:68)\\n    at /home/summers/Projects/devnexus-pwa/node_modules/@babel/core/lib/config/config-chain.js:246:7\\n    at buildRootChain (/home/summers/Projects/devnexus-pwa/node_modules/@babel/core/lib/config/config-chain.js:82:20)\\n    at loadConfig (/home/summers/Projects/devnexus-pwa/node_modules/@babel/core/lib/config/index.js:50:53)\\n    at transformSync (/home/summers/Projects/devnexus-pwa/node_modules/@babel/core/lib/transform-sync.js:13:36)\\n    at Object.transform (/home/summers/Projects/devnexus-pwa/node_modules/@babel/core/lib/transform.js:20:65)\\n    at transpile (/home/summers/Projects/devnexus-pwa/node_modules/babel-loader/lib/index.js:55:20)\\n    at Object.module.exports (/home/summers/Projects/devnexus-pwa/node_modules/babel-loader/lib/index.js:179:20)\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiIwLmpzIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///0\n");

/***/ })
/******/ ]);