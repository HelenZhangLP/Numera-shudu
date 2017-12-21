
/*
 * fn 生成九宫格
 */
let matrixTool = require('../core/toolkit');
let Sudoku = require('../core/sudoku');
let Check = require('../core/checker');


class Grid {
	constructor(wrap){
		this._wrap = wrap;
		this.popupModel = $('#popupModel');
	}

	//构建九宫格
	build(){
		let sudo = new Sudoku();
		sudo.make();
		let matrix = sudo.sudoMatrix;

		// m.map(function(index,item){
		// 	item.map(index,item){
		// 		return $('span').text(item);
		// 	}
		// })

		let cellCon = matrix.map(rowVal => rowVal.map((cellVal,cIndex)=>{
			return $('<span>')
					.addClass((cIndex+1)%3==0?'col-right-border':'')
					.addClass(()=>cellVal > 0?'full':'empty')
					.text(cellVal);
			// var span = document.createElement('span'),
			// 	text = document.createTextNode(12);
			// return span.appendChild(text);
		}))


		let rowCon = cellCon.map((val,rIndex)=>{
			return $('<div>').addClass((rIndex+1)%3==0?'row-bottom-border row':'row').append(val);
		})

		this._wrap.append(rowCon);
	}


	layout() {
		let width = $('span',this._wrap).width();
		$('span',this._wrap).height(width).css({
			'line-height':width+'px'
		})
	}

	// 绑定弹出面版事件
	bindPopup($popupPanel) {
		// 事件代理 ？？？
		this._wrap.on('click','span', e => {
			const $cell = $(e.target);
			if ($cell.is('.full')) return;
			$popupPanel.popup($cell);
		})
	}

	//重建迷盘
	rebuild() {
		this._wrap.empty();
		this.build();
		this.layout();
	}

	/* 用户输入检测
	 * 检测数据 9*9 的二维数组
	 * 检测方法
	**/
	check() {
		// 获取迷盘上的数字
		const data = this._wrap.children().map(
			(i,div) => $(div).children().map(
				(i,v) => parseInt($(v).text())
			)
		)
		.toArray()
		.map($data => $data.toArray());

		// 检测迷盘数据
		const check = new Check(data);

		if(check.check()) {
			this._wrap.find("span:not('full')").addClass('full');
		};

		// 检测不通过，标记 error
		const markMatrix = check.markerMatrix;

		this._wrap.children().each(
			(rowIndex,div) => $(div).children().each(
				(colIndex,span) => {
					if (markMatrix[rowIndex][colIndex]
						||$(span).is('.full')) {
						$(span).removeClass('error');
					} else {
						$(span).addClass('error');
					}
				}
			)
		)


	}


	//清空错误标志
	reset() {
		this._wrap.find('span.error').removeClass('error').addClass('empty');
	}

	//清除用户输入，恢复迷盘
	clear() {
		this._wrap.find("span:not('.full')")
			.each((i,v) => {
				$(v).removeClass('markFirst markEnd error')
					.text(0)
					.addClass('empty')
			})
	}
}

module.exports = Grid;