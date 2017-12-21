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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 * 工具集
 * Class MatrixKit 矩阵工具
 * Class BoxKit 宫坐标系工具
 */

var MatrixKit = {
	//生成二维数组中的行
	cRow: function cRow() {
		var arg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

		var arr = new Array(9);
		arr.fill(arg);
		return arr;
	},
	cMatrix: function cMatrix() {
		var _this = this;

		var arg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

		// fill(cRow(arg)) 参数为函数引用，所以改变第一行参数的值，则改变所有行该位置参数的值
		//return (new Array(9)).fill(cRow(arg));

		//运行结果的值传递给了数组元素
		return Array.from({ length: 9 }, function () {
			return _this.cRow(arg);
		});
	},


	/**
   * 洗牌算法
   * 二维数组 指针从上到下，依次下移一位；
   * 随机选中一位数与当前指针所指数进行交换
   * 返回 最终生成的数组
 **/
	shuffle: function shuffle() {
		var Array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

		var eIndex = Array.length - 2;
		for (var i = 0; i <= eIndex; i++) {
			var j = Math.round(Math.random() * (Array.length - 1));

			var _ref = [Array[j], Array[i]];
			Array[i] = _ref[0];
			Array[j] = _ref[1];
		}

		return Array;
	},


	/**
  * fn 检查输入参数
  * @ argm
  * @ matrix 要填入的矩阵
  * @ rowIndex 填入的行号
  * @ colIndex 填入的列号
  * @ n 要填入的数字
  **/
	checkFillNubAble: function checkFillNubAble(_ref2) {
		var matrix = _ref2.matrix,
		    rowIndex = _ref2.rowIndex,
		    colIndex = _ref2.colIndex,
		    n = _ref2.n;

		// 获取 boxIndex;
		var _BoxKit$convertToBoxI = BoxKit.convertToBoxIndex(rowIndex, colIndex),
		    boxIndex = _BoxKit$convertToBoxI.boxIndex;

		//获取行，列，宫 数据


		var rowData = matrix[rowIndex];
		var columnData = this.cRow().map(function (v, i) {
			return matrix[i][colIndex];
		});
		var boxData = BoxKit.getBoxData(matrix, boxIndex);

		//数据检查
		for (var i = 0; i < 9; i++) {
			if (n === rowData[i] || n === columnData[i] || n === boxData[i]) return false;
		}

		return true;
	}
};

var BoxKit = {

	//获取 BoxIndex 数据
	getBoxData: function getBoxData(matrix, boxIndex) {
		var boxArr = [],
		    startRowIndex = void 0,
		    startColIndex = void 0,
		    rowIndex = void 0,
		    colIndex = void 0;

		startRowIndex = Math.floor(boxIndex / 3) * 3;
		startColIndex = boxIndex % 3 * 3;

		for (var cellIndex = 0; cellIndex < 9; cellIndex++) {
			rowIndex = startRowIndex + Math.floor(cellIndex / 3);
			colIndex = startColIndex + cellIndex % 3;

			boxArr.push(matrix[rowIndex][colIndex]);
		}

		return boxArr;
	},


	//根据 rowIndex 与 colIndex 获取 boxIndex && cellIndex
	convertToBoxIndex: function convertToBoxIndex(rowIndex, colIndex) {
		return {
			boxIndex: Math.floor(rowIndex / 3) * 3 + Math.floor(colIndex / 3),
			cellIndex: rowIndex % 3 * 3 + colIndex % 3
		};
	},
	convertFromBoxIndex: function convertFromBoxIndex(boxIndex, cellIndex) {
		return {
			rowIndex: Math.floor(boxIndex / 3) * 3 + Math.floor(cellIndex / 3),
			colIndex: boxIndex % 3 * 3 + cellIndex % 3
		};
	}
};

// 导出工具集的工具方法
module.exports = function () {
	function ToolKit() {
		_classCallCheck(this, ToolKit);
	}

	_createClass(ToolKit, null, [{
		key: "matrixKit",

		//get 定义 matrixkit 读取器
		get: function get() {
			return MatrixKit;
		}
	}, {
		key: "boxKit",
		get: function get() {
			return BoxKit;
		}
	}]);

	return ToolKit;
}();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Grid = __webpack_require__(2);
var PopupNumber = __webpack_require__(7);

// 绘制九宫格
var CGrid = new Grid($('#grid'));
CGrid.build();
CGrid.layout();

// 弹出面板实例
var popupNumb = new PopupNumber($('#popupPanel'));
// 弹出面版事件绑定
CGrid.bindPopup(popupNumb);

//按钮事件绑定
$('#check').on('click', function (e) {
	CGrid.check();
});
$('#reset').on('click', function (e) {
	CGrid.reset();
});
$('#clear').on('click', function (e) {
	CGrid.clear();
});
$('#rebuild').on('click', function (e) {
	CGrid.rebuild();
});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 * fn 生成九宫格
 */
var matrixTool = __webpack_require__(0);
var Sudoku = __webpack_require__(3);
var Check = __webpack_require__(5);

var Grid = function () {
	function Grid(wrap) {
		_classCallCheck(this, Grid);

		this._wrap = wrap;
		this.popupModel = $('#popupModel');
	}

	//构建九宫格


	_createClass(Grid, [{
		key: 'build',
		value: function build() {
			var sudo = new Sudoku();
			sudo.make();
			var matrix = sudo.sudoMatrix;

			// m.map(function(index,item){
			// 	item.map(index,item){
			// 		return $('span').text(item);
			// 	}
			// })

			var cellCon = matrix.map(function (rowVal) {
				return rowVal.map(function (cellVal, cIndex) {
					return $('<span>').addClass((cIndex + 1) % 3 == 0 ? 'col-right-border' : '').addClass(function () {
						return cellVal > 0 ? 'full' : 'empty';
					}).text(cellVal);
					// var span = document.createElement('span'),
					// 	text = document.createTextNode(12);
					// return span.appendChild(text);
				});
			});

			var rowCon = cellCon.map(function (val, rIndex) {
				return $('<div>').addClass((rIndex + 1) % 3 == 0 ? 'row-bottom-border row' : 'row').append(val);
			});

			this._wrap.append(rowCon);
		}
	}, {
		key: 'layout',
		value: function layout() {
			var width = $('span', this._wrap).width();
			$('span', this._wrap).height(width).css({
				'line-height': width + 'px'
			});
		}

		// 绑定弹出面版事件

	}, {
		key: 'bindPopup',
		value: function bindPopup($popupPanel) {
			// 事件代理 ？？？
			this._wrap.on('click', 'span', function (e) {
				var $cell = $(e.target);
				if ($cell.is('.full')) return;
				$popupPanel.popup($cell);
			});
		}

		//重建迷盘

	}, {
		key: 'rebuild',
		value: function rebuild() {
			this._wrap.empty();
			this.build();
			this.layout();
		}

		/* 用户输入检测
   * 检测数据 9*9 的二维数组
   * 检测方法
  **/

	}, {
		key: 'check',
		value: function check() {
			// 获取迷盘上的数字
			var data = this._wrap.children().map(function (i, div) {
				return $(div).children().map(function (i, v) {
					return parseInt($(v).text());
				});
			}).toArray().map(function ($data) {
				return $data.toArray();
			});

			// 检测迷盘数据
			var check = new Check(data);

			if (check.check()) {
				this._wrap.find("span:not('full')").addClass('full');
			};

			// 检测不通过，标记 error
			var markMatrix = check.markerMatrix;

			this._wrap.children().each(function (rowIndex, div) {
				return $(div).children().each(function (colIndex, span) {
					if (markMatrix[rowIndex][colIndex] || $(span).is('.full')) {
						$(span).removeClass('error');
					} else {
						$(span).addClass('error');
					}
				});
			});
		}

		//清空错误标志

	}, {
		key: 'reset',
		value: function reset() {
			this._wrap.find('span.error').removeClass('error').addClass('empty');
		}

		//清除用户输入，恢复迷盘

	}, {
		key: 'clear',
		value: function clear() {
			this._wrap.find("span:not('.full')").each(function (i, v) {
				$(v).removeClass('markFirst markEnd error').text(0).addClass('empty');
			});
		}
	}]);

	return Grid;
}();

module.exports = Grid;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 * class 生成数独游戏迷盘
 * 1. 生成解决方案 generator
 * 2. 随机去除部分数据（按比例）
 */

var Generator = __webpack_require__(4);

module.exports = function () {
  function Sudo() {
    _classCallCheck(this, Sudo);

    this._level = 5;
    this._matrix = null;
    this.sudoMatrix = null;
  }

  _createClass(Sudo, [{
    key: 'make',
    value: function make() {
      var _this = this;

      var gen = new Generator();
      gen.generator();
      this._matrix = gen.matrix;

      this.sudoMatrix = this._matrix.map(function (row) {
        return row.map(function (cell) {
          return Math.random() * 9 > _this._level ? 0 : cell;
        });
      });
    }
  }]);

  return Sudo;
}();

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 * fn 生成数独解决方案
 * 数字 1-9
 * from row0 to row8
 * 3 随机选择一列添入数字 n
 * 3-1 检查是否可以填入
 * 3-2-false 当前行所有随机列均不可以填入，返回上一行，继续选择随机列
 * 3-2-true 递归调用
 */

var ToolKit = __webpack_require__(0);

var Generator = function () {
  function Generator() {
    _classCallCheck(this, Generator);

    this._matrix = null;
    this.orderRandom = null;
  }

  _createClass(Generator, [{
    key: 'generator',
    value: function generator() {
      while (!this.initGenerator()) {}
    }
  }, {
    key: 'initGenerator',
    value: function initGenerator() {
      /*
       * 随机位置 @orderRandom
       **/

      this._matrix = ToolKit.matrixKit.cMatrix();
      this.orderRandom = ToolKit.matrixKit.cMatrix().map(function (row) {
        return row.map(function (v, i) {
          return i;
        });
      }).map(function (row) {
        return ToolKit.matrixKit.shuffle(row);
      });

      //填数 1-9
      for (var i = 1; i <= 9; i++) {
        if (!this.fillNumer(i)) return false;
      }

      return true;
    }
  }, {
    key: 'fillNumer',
    value: function fillNumer(n) {
      return this.fillNRow(n, 0);
    }

    //0-8 行，从第 0 行开始填数

  }, {
    key: 'fillNRow',
    value: function fillNRow(n, index) {
      if (index > 8) {
        return true;
      }

      var row = this._matrix[index];
      var orders = this.orderRandom[index];

      for (var i = 0; i < 9; i++) {
        // colR 随机某一列
        var colR = orders[i];

        //判断当前列是否有数值
        if (row[colR]) {
          continue;
        }

        //检查不可以填入
        if (!ToolKit.matrixKit.checkFillNubAble({ matrix: this._matrix, n: n, rowIndex: index, colIndex: colR })) {
          //继续选择随机列
          continue;
        }

        //输入成功，继续递归至下一行
        row[colR] = n;
        if (!this.fillNRow(n, index + 1)) {
          row[colR] = 0;
          continue;
        }

        return true;
      }

      return false;
    }
  }, {
    key: 'matrix',
    get: function get() {
      return this._matrix;
    }
  }]);

  return Generator;
}();

module.exports = Generator;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 * fn 检查数独
 */

var CheckerKit = {
  checkArray: function checkArray(arr) {

    var length = arr.length;
    var resultArr = new Array(length);
    resultArr.fill(true);

    for (var i = 0; i < length; i++) {
      //判断当前值是否有效
      if (!arr[i]) {
        resultArr[i] = false;
        continue;
      }

      if (!resultArr[i]) continue;

      //检查是否重复
      for (var j = i + 1; j < length - i; j++) {
        if (arr[i] == arr[j]) {
          resultArr[i] = resultArr[j] = false;
        }
      }
    }

    return resultArr;
  }
};

var ToolKit = __webpack_require__(6);

var Checker = function () {
  /**
  _matrix 要检查的矩阵
  _markerMatrix 检查结果标记
  */
  function Checker(matrix) {
    _classCallCheck(this, Checker);

    this._matrix = matrix;
    this._markerMatrix = ToolKit.matrixKit.cMatrix(true);
  }

  _createClass(Checker, [{
    key: 'check',
    value: function check() {
      /**
      行、列、宫数据检查
      */
      this.rowCheck();
      this.colCheck();
      this.boxCheck();

      // _success 标记 _markerMatrix 最终检查结果
      this._success = this._markerMatrix.every(function (row) {
        return row.every(function (cell) {
          return cell;
        });
      });
    }
  }, {
    key: 'rowCheck',
    value: function rowCheck() {
      var row;
      for (var rowIndex = 0; rowIndex < 9; rowIndex++) {
        row = CheckerKit.checkArray(this._matrix[rowIndex]);
        for (var colIndex = 0; colIndex < 9; colIndex++) {
          if (!row[colIndex]) this._markerMatrix[rowIndex][colIndex] = false;
        }
      }
    }
  }, {
    key: 'colCheck',
    value: function colCheck() {
      var colMatrix = [],
          marColumn = [];
      for (var rowIndex = 0; rowIndex < 9; rowIndex++) {
        colMatrix[rowIndex] = [];
        for (var cellIndex = 0; cellIndex < 9; cellIndex++) {
          colMatrix[rowIndex].push(this._matrix[cellIndex][rowIndex]);
        }
      }

      for (var rowIndex = 0; rowIndex < 9; rowIndex++) {
        marColumn = CheckerKit.checkArray(colMatrix[rowIndex]);
        for (var i = 0; i < 9; i++) {
          if (!marColumn[i]) this._markerMatrix[i][rowIndex] = false;
        }
      }
    }
  }, {
    key: 'boxCheck',
    value: function boxCheck() {
      var boxData = [],
          boxKit = ToolKit.boxKit,
          marBox = [];
      for (var boxIndex = 0; boxIndex < 9; boxIndex++) {
        boxData = boxKit.getBoxData(this._matrix, boxIndex);
        marBox = CheckerKit.checkArray(boxData);
        for (var cellIndex = 0; cellIndex < 9; cellIndex++) {
          var _boxKit$convertFromBo = boxKit.convertFromBoxIndex(boxIndex, cellIndex),
              rowIndex = _boxKit$convertFromBo.rowIndex,
              colIndex = _boxKit$convertFromBo.colIndex;

          if (!marBox[cellIndex]) this._markerMatrix[rowIndex][colIndex] = false;
        }
      }
    }
  }, {
    key: 'markerMatrix',
    get: function get() {
      return this._markerMatrix;
    }
  }, {
    key: 'resMarkerMatrix',
    get: function get() {
      return this._success;
    }
  }]);

  return Checker;
}();

/**
check.js 单元测试
Generator 生成 81 组数据矩阵
check 检测
*/

/*
const Generator = require('./generator')
const gen = new Generator();
gen.generator();
const matrix = gen.matrix;
	matrix[0][0] = 0;
matrix[1][8] = 0;
matrix[2][3] = 0;
console.log('matrix',matrix);
 const check = new Checker(matrix);
check.check();
console.log(check.markerMatrix);
*/

module.exports = Checker;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 * 工具集
 * Class MatrixKit 矩阵工具
 * Class BoxKit 宫坐标系工具
 */

var MatrixKit = {
	//生成二维数组中的行
	cRow: function cRow() {
		var arg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

		var arr = new Array(9);
		arr.fill(arg);
		return arr;
	},
	cMatrix: function cMatrix() {
		var _this = this;

		var arg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

		// fill(cRow(arg)) 参数为函数引用，所以改变第一行参数的值，则改变所有行该位置参数的值
		//return (new Array(9)).fill(cRow(arg));

		//运行结果的值传递给了数组元素
		return Array.from({ length: 9 }, function () {
			return _this.cRow(arg);
		});
	},


	/**
   * 洗牌算法
   * 二维数组 指针从上到下，依次下移一位；
   * 随机选中一位数与当前指针所指数进行交换
   * 返回 最终生成的数组
 **/
	shuffle: function shuffle() {
		var Array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

		var eIndex = Array.length - 2;
		for (var i = 0; i <= eIndex; i++) {
			var j = Math.round(Math.random() * (Array.length - 1));

			var _ref = [Array[j], Array[i]];
			Array[i] = _ref[0];
			Array[j] = _ref[1];
		}

		return Array;
	},


	/**
  * fn 检查输入参数
  * @ argm
  * @ matrix 要填入的矩阵
  * @ rowIndex 填入的行号
  * @ colIndex 填入的列号
  * @ n 要填入的数字
  **/
	checkFillNubAble: function checkFillNubAble(_ref2) {
		var matrix = _ref2.matrix,
		    rowIndex = _ref2.rowIndex,
		    colIndex = _ref2.colIndex,
		    n = _ref2.n;

		// 获取 boxIndex;
		var _BoxKit$convertToBoxI = BoxKit.convertToBoxIndex(rowIndex, colIndex),
		    boxIndex = _BoxKit$convertToBoxI.boxIndex;

		//获取行，列，宫 数据


		var rowData = matrix[rowIndex];
		var columnData = this.cRow().map(function (v, i) {
			return matrix[i][colIndex];
		});
		var boxData = BoxKit.getBoxData(matrix, boxIndex);

		//数据检查
		for (var i = 0; i < 9; i++) {
			if (n === rowData[i] || n === columnData[i] || n === boxData[i]) return false;
		}

		return true;
	}
};

var BoxKit = {

	//获取 BoxIndex 数据
	getBoxData: function getBoxData(matrix, boxIndex) {
		var boxArr = [],
		    startRowIndex = void 0,
		    startColIndex = void 0,
		    rowIndex = void 0,
		    colIndex = void 0;

		startRowIndex = Math.floor(boxIndex / 3) * 3;
		startColIndex = boxIndex % 3 * 3;

		for (var cellIndex = 0; cellIndex < 9; cellIndex++) {
			rowIndex = startRowIndex + Math.floor(cellIndex / 3);
			colIndex = startColIndex + cellIndex % 3;

			boxArr.push(matrix[rowIndex][colIndex]);
		}

		return boxArr;
	},


	//根据 rowIndex 与 colIndex 获取 boxIndex && cellIndex
	convertToBoxIndex: function convertToBoxIndex(rowIndex, colIndex) {
		return {
			boxIndex: Math.floor(rowIndex / 3) * 3 + Math.floor(colIndex / 3),
			cellIndex: rowIndex % 3 * 3 + colIndex % 3
		};
	},
	convertFromBoxIndex: function convertFromBoxIndex(boxIndex, cellIndex) {
		return {
			rowIndex: Math.floor(boxIndex / 3) * 3 + Math.floor(cellIndex / 3),
			colIndex: boxIndex % 3 * 3 + cellIndex % 3
		};
	}
};

// 导出工具集的工具方法
module.exports = function () {
	function ToolKit() {
		_classCallCheck(this, ToolKit);
	}

	_createClass(ToolKit, null, [{
		key: "matrixKit",

		//get 定义 matrixkit 读取器
		get: function get() {
			return MatrixKit;
		}
	}, {
		key: "boxKit",
		get: function get() {
			return BoxKit;
		}
	}]);

	return ToolKit;
}();

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 * fn 处理弹层功能面板
 * 点击 grid
 * 弹出 弹层 和 面板
 * 
 */

module.exports = function () {
  function PopupNumbers($panel) {
    var _this = this;

    _classCallCheck(this, PopupNumbers);

    this.popupModel = $('#popupModel');
    //??? hide() 的作用
    this._panel = $panel;
    $panel.hide().removeClass("hidden");
    $('#popupModel').hide().removeClass("hidden");

    this._gridCell = null;

    this._panel.on('click', 'span', function (e) {
      var $span = $(e.target),
          $cell = _this._gridCell;
      if ($span.hasClass('empty')) {
        $cell.text(0).addClass('empty');
      } else if ($span.hasClass('markFirst')) {
        $cell.hasClass('markFirst') ? _this._gridCell.removeClass('markFirst') : _this._gridCell.addClass('markFirst');
      } else if ($span.hasClass('markEnd')) {
        $cell.hasClass('markEnd') ? _this._gridCell.removeClass('markEnd') : _this._gridCell.addClass('markEnd');
      } else {
        $cell.text($span.text()).removeClass('empty');
      }

      _this.flagPopup();
      // this.popupModel.hide();
      // this._panel.hide();
    });
  }

  _createClass(PopupNumbers, [{
    key: 'popup',
    value: function popup($cell) {
      this._gridCell = $cell;

      var _$cell$position = $cell.position(),
          top = _$cell$position.top,
          left = _$cell$position.left;

      this._panel
      //`` 用于包表达式
      .css({
        'left': left + 'px',
        'top': top + 'px'
      });

      this.flagPopup();
      // this.popupModel.show();
      // this._panel.show();
    }
  }, {
    key: 'flagPopup',
    value: function flagPopup() {
      if (this.popupModel.hasClass('hidden') || this._panel.hasClass('hidden') || this.popupModel.css('display') == 'none' || this._panel.css('display') == 'none') {
        this.popupModel.show();
        this._panel.show();
      } else {
        this.popupModel.hide();
        this._panel.hide();
      }
    }
  }]);

  return PopupNumbers;
}();

/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map