
const kit = {
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
		return Array.from({length:9},()=>this.cRow())

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
	}
}

module.exports = kit;