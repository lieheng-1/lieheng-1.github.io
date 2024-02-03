//拖拽功能
$().extend("drag",function () {
	var tags = arguments;//传入允许拖动的对象
	for (var i=0; i<this.elements.length;i++){
		this.elements[i].addEventListener("mousedown",onmousedown_fn,false);
		function onmousedown_fn (evt) {
			var _this = this;
			var top = evt.clientY +getScroll().top- _this.offsetTop;//鼠标按下位置  到  登录框top的距离
			var left = evt.clientX +getScroll().left- _this.offsetLeft;//鼠标按下位置  到  登录框left的距离
			var flag = false;
			// console.log(evt.target);
			for (var i=0; i<tags.length;i++){//检测传入允许拖动的对象
				if(evt.target == tags[i]) {flag=true;break;}
			}
			if(flag){
				document.addEventListener("mousemove",onmousemove_fn,false);
				document.addEventListener("mouseup",onmouseup_fn,false);
			};
			function onmousemove_fn(evt) {
				_this.style.top = evt.clientY +getScroll().top- top + "px";//设置 登录框实际top = 鼠标在窗口的移动位置 - 登录框内边距(鼠标位置与topl)
				_this.style.left = evt.clientX +getScroll().left- left + "px";
				// 元素完整保留在可视窗口的最大距离 = 可视窗口高度/宽度 - 元素高度/宽度
				var maxTop = document.documentElement.clientHeight - _this.offsetHeight;
				var maxLeft = document.documentElement.clientWidth - _this.offsetWidth;
				if(evt.clientY - top< 0) {
					_this.style.top = 0 + getScroll().top + "px";
				}else if(evt.clientY - top > maxTop) {
					_this.style.top = maxTop +getScroll().top+ "px";
				}
				if(evt.clientX - left < 0) {
					_this.style.left = 0 + getScroll().left + "px";
				}else if(evt.clientX - left > maxLeft) {
					_this.style.left = maxLeft +getScroll().left+ "px";
				}
			}
			function onmouseup_fn() {
				document.removeEventListener("mousemove",onmousemove_fn,false);
				document.removeEventListener("mouseup",onmouseup_fn,false);
			}
		}
	};
	return this;
})