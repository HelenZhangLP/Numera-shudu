/*
 * fn 检查数独
 */

 const CheckerKit = {

 	checkArray(arr){

 		let length = arr.length;
 		let resultArr = new Array(length);
 		resultArr.fill(true);

 		for (var i = 0; i < length; i++) {
 			//判断当前值是否有效
 			if(!arr[i]) {
 				resultArr[i] = false;
 				continue;
 			}

 			if(!resultArr[i]) continue;

 			//检查是否重复
 			for (var j = i+1; j < length - i; j++) {
 				if(arr[i] == arr[j]) {
 					resultArr[i] = resultArr[j] = false;
 				}
 			}
 		}

 		return resultArr;
 	}
 	
 }

 const ToolKit = require('./ToolKit');

 class Checker {
 	/**
		_matrix 要检查的矩阵
		_markerMatrix 检查结果标记
 	*/
 	constructor(matrix) {
 		this._matrix = matrix;
 		this._markerMatrix = ToolKit.matrixKit.cMatrix(true);
 	}

 	get markerMatrix(){
 		return this._markerMatrix;
 	}

 	get resMarkerMatrix(){
 		return this._success;
 	}

 	check() {
 		/**
			行、列、宫数据检查
 		*/
 		this.rowCheck();
 		this.colCheck();
 		this.boxCheck();

 		// _success 标记 _markerMatrix 最终检查结果
 		this._success = this._markerMatrix.every(row => row.every(cell => cell));
 	}

 	rowCheck(){
 		var row;
 		for (var rowIndex = 0; rowIndex < 9; rowIndex++) {
 			row = CheckerKit.checkArray(this._matrix[rowIndex]);
 			for (var colIndex = 0; colIndex < 9; colIndex++) {
 				if(!row[colIndex]) this._markerMatrix[rowIndex][colIndex] = false;
 			}
 		}
 	}

 	colCheck(){
 		var colMatrix = [], marColumn = [];
 		for (var rowIndex = 0; rowIndex < 9; rowIndex++) {
 			colMatrix[rowIndex] = [];
 			for (var cellIndex = 0; cellIndex < 9; cellIndex++) {
 				colMatrix[rowIndex].push(this._matrix[cellIndex][rowIndex]);
 			}
 		}

 		for (var rowIndex = 0; rowIndex < 9; rowIndex++) {
 			marColumn = CheckerKit.checkArray(colMatrix[rowIndex]);
 			for (var i = 0; i < 9; i++) {
 				if(!marColumn[i]) this._markerMatrix[i][rowIndex] = false;
 			}
 		}
 	}

 	boxCheck(){
 		var boxData = [],boxKit = ToolKit.boxKit,marBox = [];
 		for (var boxIndex = 0; boxIndex < 9; boxIndex++) {
 			boxData = boxKit.getBoxData(this._matrix,boxIndex);
 			marBox = CheckerKit.checkArray(boxData);
 			for (var cellIndex = 0; cellIndex < 9; cellIndex++) {
 				const {rowIndex,colIndex} = boxKit.convertFromBoxIndex(boxIndex,cellIndex)
 				if(!marBox[cellIndex]) this._markerMatrix[rowIndex][colIndex] = false;
 			}
 		}
 	}
 }


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
 