
let Grid = require("./ui/grid.js")
let PopupNumber = require('./ui/popupnumbers')

// 绘制九宫格
let CGrid = new Grid($('#grid'));
CGrid.build();
CGrid.layout();

// 弹出面板实例
let popupNumb = new PopupNumber($('#popupPanel'));
// 弹出面版事件绑定
CGrid.bindPopup(popupNumb);

//按钮事件绑定
$('#check').on('click',e => {
	CGrid.check();
})
$('#reset').on('click',e => {
	CGrid.reset();
})
$('#clear').on('click',e => {
	CGrid.clear();
})
$('#rebuild').on('click',e => {
	CGrid.rebuild();
})