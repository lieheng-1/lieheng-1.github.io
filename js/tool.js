//浏览器检测
(function () {
	window.sys = {};
	var ua = navigator.userAgent.toLowerCase();
	var s=null;
	(s=ua.match(/chrome\/([\d\.]*)/)) ? sys.chrome = s[1] :
	(s=ua.match(/firefox\/([\d\.]*)/)) ? sys.firefox = s[1] :
	(s=ua.match(/msie\s([\d\.]*)/)) ? sys.ie = s[1] : 0;
})();

//判断class是否存在
function hasClass(element,className) {
	return element.className.match(new RegExp("(\\s|^)" + className + "(\\s|$)"))
} 

// DOM加载
function addDomLoaded(fn) {
	document.addEventListener("DOMContentLoaded",function(){
		fn();
		document.removeEventListener("DOMContentLoaded",arguments.callee,false)
	},false);
}

//获取计算后的Style
function getStyle(element,attr) {
	var style1 = window.getComputedStyle(element,null);
	var date = !!attr ? style1[attr] : style1;
	return date;
}

//获取浏览器滚动条位置
function getScroll() {
	return {
		top: document.documentElement.scrollTop,
		left: document.documentElement.scrollLeft
	}
}

//某一个值是否存在某个数组内
function inArray(array,value) {
	for(var i=0;i<array.length;i++){
		if(array[i]===value)return true;
	}
	return false;
}

//锁定滚动条位置为0
// function onscroll_fn() {
// 	document.documentElement.scrollTop = 0 ;
// }

//获得某个元素到整个网页文档顶部的距离。
function offsetTop(element){
	var top = element.offsetTop;
	var parent = element.parentOffset;
	while(parent != null){
		top = parent.offsetTop + top;
		parent = parent.parentOffset;
	}
	return top;
}

//为父节点提供特定的引索返回前一个引索
function prevIndex(current,parentNode){
	var length = parentNode.children.length;
	if(current==0){return length-1;}
	return parseInt(current)-1;
}
function nextIndex(current,parentNode){
	var length = parentNode.children.length;
	if(current==length-1){return 0;}
	return parseInt(current)+1;
}