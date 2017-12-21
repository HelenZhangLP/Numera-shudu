/*
 * 工具集
 * Class MatrixKit 矩阵工具
 * Class BoxKit 宫坐标系工具
 */

const MatrixKit = {
	//生成二维数组中的行
	cRow(arg = 0) {
		const arr = new Array(9);
		arr.fill(arg);
		return arr;
	},

	cMatrix(arg = 0) {
		// fill(cRow(arg)) 参数为函数引用，所以改变第一行参数的值，则改变所有行该位置参数的值
		//return (new Array(9)).fill(cRow(arg));

		//运行结果的值传递给了数组元素
		return Array.from({length:9},()=>this.cRow(arg))

	},

	/**
	  * 洗牌算法
	  * 二维数组 指针从上到下，依次下移一位；
	  * 随机选中一位数与当前指针所指数进行交换
	  * 返回 最终生成的数组
	**/
	shuffle(Array=[]) {
		const eIndex = Array.length - 2;
		for (var i = 0; i <= eIndex; i++) {
			let j = Math.round(Math.random()*(Array.length-1));
			
			[Array[i],Array[j]] = [Array[j],Array[i]];
			
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
	checkFillNubAble ({matrix, rowIndex, colIndex, n}) {
		// 获取 boxIndex;
		let { boxIndex } = BoxKit.convertToBoxIndex(rowIndex,colIndex);

		//获取行，列，宫 数据
		let rowData = matrix[rowIndex];
		let columnData = this.cRow().map((v,i)=>matrix[i][colIndex]);
		let boxData = BoxKit.getBoxData(matrix,boxIndex);

		//数据检查
		for (var i = 0; i < 9; i++) {
			if (n === rowData[i]
				|| n === columnData[i]
				|| n === boxData[i]) return false;
		}

		return true;
	}
}

const BoxKit = {

	//获取 BoxIndex 数据
	getBoxData(matrix,boxIndex){
		let boxArr = [],
			startRowIndex,startColIndex,
			rowIndex,colIndex;

		startRowIndex = Math.floor(boxIndex/3)*3;
		startColIndex = boxIndex % 3 * 3;

		for(let cellIndex = 0; cellIndex < 9; cellIndex++) {
			rowIndex = startRowIndex + Math.floor(cellIndex/3);
			colIndex = startColIndex + cellIndex % 3;

			boxArr.push(matrix[rowIndex][colIndex]);
		}

		return boxArr;
	},

	//根据 rowIndex 与 colIndex 获取 boxIndex && cellIndex
	convertToBoxIndex(rowIndex,colIndex){
		return {
			boxIndex: Math.floor(rowIndex/3)*3 + Math.floor(colIndex/3),
			cellIndex: rowIndex%3*3 + colIndex%3
		}
	},

	convertFromBoxIndex(boxIndex,cellIndex){
		return {
			rowIndex: Math.floor(boxIndex/3)*3 + Math.floor(cellIndex/3),
			colIndex: boxIndex%3*3 + cellIndex%3
		}
	}


}

// 导出工具集的工具方法
module.exports = class ToolKit{
	//get 定义 matrixkit 读取器
	static get matrixKit(){
		return MatrixKit;
	}
	static get boxKit(){
		return BoxKit;
	}
}