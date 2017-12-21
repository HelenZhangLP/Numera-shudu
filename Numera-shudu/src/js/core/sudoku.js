/*
 * class 生成数独游戏迷盘
 * 1. 生成解决方案 generator
 * 2. 随机去除部分数据（按比例）
 */

 const Generator = require('./generator')

 module.exports = class Sudo{

 	constructor(){
 		this._level = 5;
 		this._matrix = null;
 		this.sudoMatrix = null;
 	}

 	make(){
 		var gen = new Generator();
		gen.generator();
		this._matrix = gen.matrix;

		this.sudoMatrix = this._matrix.map(row => {
			return row.map(cell =>  {
				return Math.random() * 9 > this._level ? 0 : cell
			} );
		});
 	}

 }