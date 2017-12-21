/*
 * fn 处理弹层功能面板
 * 点击 grid
 * 弹出 弹层 和 面板
 * 
 */

 module.exports = class PopupNumbers{

 	constructor($panel) {
 		this.popupModel = $('#popupModel');
 		//??? hide() 的作用
 		this._panel = $panel;
 		$panel.hide().removeClass("hidden");
 		$('#popupModel').hide().removeClass("hidden");

 		this._gridCell = null;


 		this._panel.on('click','span', e => {
 			const $span = $(e.target), $cell = this._gridCell;
 			if ($span.hasClass('empty')){
 					$cell.text(0)
 					.addClass('empty')
 			} else if ($span.hasClass('markFirst')) {
 				$cell.hasClass('markFirst') 
 					? this._gridCell.removeClass('markFirst') 
 					: this._gridCell.addClass('markFirst')
 			} else if ( $span.hasClass('markEnd') ) {
 				$cell.hasClass('markEnd') 
 					? this._gridCell.removeClass('markEnd') 
 					: this._gridCell.addClass('markEnd');
			} else {
				$cell.text($span.text()).removeClass('empty');
			}

 			this.flagPopup();
 			// this.popupModel.hide();
 			// this._panel.hide();
 		})
 		
 	}

 	popup($cell) {
 		this._gridCell = $cell;
 		const {top,left} = $cell.position();

 		this._panel
 		//`` 用于包表达式
	 		.css({
	 			'left': `${left}px`,
	 			'top': `${top}px`
	 		});

	 	this.flagPopup();
	 	// this.popupModel.show();
 		// this._panel.show();
 	}

 	flagPopup () {
 		if (this.popupModel.hasClass('hidden') 
 			|| this._panel.hasClass('hidden')
 			|| this.popupModel.css('display') == 'none'
 			|| this._panel.css('display') == 'none')
 		{
 			this.popupModel.show();
 			this._panel.show();
 		} else {
 			this.popupModel.hide();
 			this._panel.hide();
 		}
 	}
 }