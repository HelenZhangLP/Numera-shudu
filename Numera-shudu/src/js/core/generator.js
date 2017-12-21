/*
 * fn 生成数独解决方案
 * 数字 1-9
 * from row0 to row8
 * 3 随机选择一列添入数字 n
 * 3-1 检查是否可以填入
 * 3-2-false 当前行所有随机列均不可以填入，返回上一行，继续选择随机列
 * 3-2-true 递归调用
 */

 const ToolKit = require('./toolkit')

 class Generator {

 	constructor() {
 		this._matrix = null;
 		this.orderRandom = null;
 	}

 	get matrix(){
 		return this._matrix;
 	}

 	generator() {
 		while(!this.initGenerator()) {
 		}
 	}
 	
 	initGenerator(){
 		/*
 		 * 随机位置 @orderRandom
 		 **/

 		this._matrix = ToolKit.matrixKit.cMatrix();
 		this.orderRandom = ToolKit.matrixKit.cMatrix()
 			.map(row => row.map((v,i)=>i))
 			.map(row => ToolKit.matrixKit.shuffle(row));

 		//填数 1-9
 		for (var i = 1; i <= 9; i++) {
 			if(!this.fillNumer(i)) return false;
 		}

 		return true;
 	}

 	fillNumer(n){
 		return this.fillNRow(n,0)
 	}

 	//0-8 行，从第 0 行开始填数
 	fillNRow(n,index){
 		if (index > 8) {
 			return true;
 		}

 		let row = this._matrix[index];
 		let orders = this.orderRandom[index];

 		for (var i = 0; i < 9; i++) {
 			// colR 随机某一列
 			let colR = orders[i];

 			//判断当前列是否有数值
 			if(row[colR]){
 				continue;
 			}

 			//检查不可以填入
	 		if(!ToolKit.matrixKit.checkFillNubAble({matrix:this._matrix,n:n,rowIndex:index,colIndex:colR})){
	 			//继续选择随机列
	 			continue;
	 		}

	 		//输入成功，继续递归至下一行
 			row[colR] = n;
 			if(!this.fillNRow(n,index+1)){
 				row[colR] = 0;
 				continue;
 			}

 			return true;
 		}

 		return false;
 	}
 }


 module.exports = Generator;