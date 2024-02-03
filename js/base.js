
//前台调用
var $ = function (args) {
	return new Base(args);
};

//基础库
function Base(args) {
	//创建一个数组，用来保存获取的节点和节点数组
	this.elements = [];
	if(typeof args == "string"){
		//css模拟
		if(args.indexOf(" ") != "-1"){
			var elements = args.split(" ");
			var childElements=[];//临时存放得到的节点
			var node = [document]; //存放父节点
			for (var i=0; i<elements.length;i++){
				childElements=[];
				//清空，清空符合上一轮(elements[i-1])要求的节点，重新push符合新一轮(elements[i])要求的节点。
				switch (elements[i].charAt(0)) {
					case "#" : 
						childElements.push(this.getId(elements[i].substring(1)));
						node = childElements;//把得到的符合要求的节点替换为父节点，以缩小父节点范围
						break;
					case "." : 
						var temps = [];
						for (var k=0;k<node.length;k++){
							temps = this.getClass(elements[i].substring(1),node[k]);//以node作为父节点，逐步缩小get的范围
							for (var j=0;j<temps.length;j++){
								childElements.push(temps[j]);
							}
						}
						node = childElements;//把得到的符合要求的节点替换为父节点，以缩小父节点范围
						break;
					default : 
						var temp=[];
						for (var k=0;k<node.length;k++){
							temps = this.getTagName(elements[i],node[k]);//以node作为父节点，逐步缩小get的范围
							for (var j=0;j<temps.length;j++){
								childElements.push(temps[j]);
							}
						}
						node = childElements;//把得到的符合要求的节点替换为父节点，以缩小父节点范围
				}
			};
			this.elements = childElements;
			return this;
		}else {
			//find模拟
			switch (args.charAt(0)) {
				case "#" : this.elements.push(this.getId(args.substring(1)));
					break;
				case "." : this.elements = this.getClass(args.substring(1));
					break;
				default : this.elements = this.getTagName(args);
			}
		}
	}else if(typeof args == "object"){
		if (args != undefined) {
			this.elements[0] = args;
		}
	}else if(typeof args == "function"){
		addDomLoaded(args);
	}
}

// DOM加载 addDOMCtontLoaded
Base.prototype.ready = function (fn){
	addDomLoaded(fn);
};

//获取ID节点
Base.prototype.getId = function(id) {
	return document.getElementById(id);
};

//获取元素节点数组
Base.prototype.getTagName = function(tagname,parentNode) {
	var node = null;
	var temps = [];
	if(parentNode != undefined){
		node = parentNode;
	}else {
		node = document;
	};
	var tags = node.getElementsByTagName(tagname);
	for (var i=0; i<tags.length;i++){
		temps.push(tags[i]);
	};
	return temps;
};

//获取CLASS节点数组
Base.prototype.getClass = function(className,parentNode) {
	var node = null;
	var temps = [];
	if(parentNode != undefined){
		node = parentNode;
	}else {
		node = document;
	};
	var all = node.getElementsByTagName("*");
	for (var i=0; i<all.length; i++){
		// if(all[i].className == className) 
		if(  (new RegExp("(\\s|^)" + className + "(\\s|$)")).test(all[i].className)    )
		{
			temps.push(all[i]);
		};
	};
	return temps;
};

//添加CLASS
Base.prototype.addClass = function(className) {
	for (var i=0; i<this.elements.length; i++){
		if(!hasClass(this.elements[i],className)) {
			this.elements[i].className += " " + className;
		};
	};
	return this;
};

//删除CLASS
Base.prototype.removeClass = function (className) {
	for (var i=0; i<this.elements.length; i++){
		if(!hasClass(this.elements[i],className)) {
			this.elements[i].className = this.elements[i].className.replace(new RegExp("(\\s|^)" + className + "(\\s|$)"),"")
		};
	};
	return this;
};

//添加link或style的CSS规则
Base.prototype.addRule = function(num,selectorText,cssText,position) {
	try {	//用try-catch(e) 防止不兼容的谷歌报错
		var sheet = document.styleSheets[num];//取得第一个<link rel="stylesheet">
		sheet.insertRule(selectorText + "{" + cssText + "}",position);//IE9、火狐、QQ浏览器支持；谷歌不支持
		return this;
	} catch(e) {}
};

//删除link或style的CSS规则
Base.prototype.removeRule = function(num,index) {
	try {	//用try-catch(e) 防止不兼容的谷歌报错
		var sheet = document.styleSheets[num];//取得第一个<link rel="stylesheet">
		sheet.deleteRule(index);//IE9、火狐、QQ浏览器支持；谷歌不支持
		return this;
	} catch (e) {}
};

//设置CSS选择器子节点
Base.prototype.find = function(str) {
	var childElements=[];
	for (var i=0; i<this.elements.length;i++){
		switch (str.charAt(0)) {
			case "#" : 
				childElements.push(this.getId(str.substring(1)));
				break;
			case "." : 
				var temps = this.getClass(str.substring(1),this.elements[i])
				for (var j=0;j<temps.length;j++){
					childElements.push(temps[j]);
				}
				break;
			default : 
				var temps = this.getTagName(str,this.elements[i])
				for (var j=0;j<temps.length;j++){
					childElements.push(temps[j]);
				}
		}
	};
	this.elements = childElements;
	return this;
};

//获取首个节点，并返回这个节点对象
Base.prototype.first = function() {
	return this.elements[0];
};

//获取末个节点，并返回这个节点对象
Base.prototype.last = function() {
	return this.elements[this.elements.length-1]
};

//获取某组节点的数量
Base.prototype.length = function() {
	return this.elements.length
}

//获取某一节点的属性
Base.prototype.attr = function(attr,value) {
	for (var i=0; i<this.elements.length;i++){
		if(arguments.length == 1){
			return this.elements[i].getAttribute(attr);
		}else if(arguments.length == 2){
			this.elements[i].setAttribute(attr,value)
		}
	};
	return this;
}

//获取某个节点在整个节点组中实第几个索引
Base.prototype.index = function() {
	var all_node = this.elements[0].parentNode.children;
	for (var i=0; i<all_node.length; i++) {
		if(this.elements[0] == all_node[i]) {
			return i
		}
	}
}


//获取节点数组的某一个
Base.prototype.ge = function(num) {
	return this.elements[num];
};

//获取某一个节点，并且Base对象
Base.prototype.eq = function(num) {
	var element = this.elements[num];
	this.elements = [];
	this.elements[0] = element;
	return this;
};

//获取当前节点的下一个元素节点
Base.prototype.next = function(num) {
	for (var i=0; i<this.elements.length;i++){
		this.elements[i]=this.elements[i].nextSibling;
		if(this.elements[i] == null) throw new Error("找不到下一个同级节点");
		if(this.elements[i].nodeType == 3) this.next();
	};
	return this;
};

//获取当前节点的上一个元素节点
Base.prototype.prev = function(num) {
	for (var i=0; i<this.elements.length;i++){
		this.elements[i]=this.elements[i].previousSibling;
		if(this.elements[i] == null) throw new Error("找不到下一个同级节点");
		if(this.elements[i].nodeType == 3) this.prev();
	};
	return this;
};

//设置CSS
Base.prototype.css = function(attr,value) {
	for (var i=0; i<this.elements.length;i++){
		if(arguments.length == 1){return getStyle(this.elements[i],attr)};
		if(arguments.length == 0){return getStyle(this.elements[i])};
		this.elements[i].style[attr] = value;
	};
	return this;
};

//设置表单字段元素
Base.prototype.form = function(name) {
	for (var i=0; i<this.elements.length;i++){
		this.elements[i] = this.elements[i][name]
	};
	return this;
};
Base.prototype.value = function(str) {
	for (var i=0; i<this.elements.length;i++){
		if(arguments.length == 0){return this.elements[i].value}
		this.elements[i].value = str;
	};
	return this;
};


//设置innerHTML
Base.prototype.html = function(value) {
	for (var i=0; i<this.elements.length;i++){
		if(arguments.length == 0){return this.elements[i].innerHTML}
		this.elements[i].innerHTML = value;
	};
	return this;
};

//设置innerText
Base.prototype.text = function(value) {
	for (var i=0; i<this.elements.length;i++){
		if(arguments.length == 0){return this.elements[i].innerText}
		this.elements[i].innerText = value;
	};
	return this;
};

//设置透明度
Base.prototype.opacity = function(value) {
	for (var i=0; i<this.elements.length;i++){
		if(arguments.length == 0){return Math.round(getStyle(this.elements[i],"opacity")*100)}
		this.elements[i].style.opacity = value/100;
	};
	return this;
};

//触发点击事件
Base.prototype.click = function (fn) {
	for (var i=0; i<this.elements.length;i++){
		this.elements[i].addEventListener("click",fn,false)
	};
	return this;
};

//设置事件发生器
Base.prototype.bind = function (event,fn) {
	for (var i=0; i<this.elements.length;i++){
		this.elements[i].addEventListener(event,fn,false);
	};
	return this;
}


//设置鼠标移入移出的方法
Base.prototype.hover = function(over_fn,out_fn) {
	for (var i=0; i<this.elements.length;i++){
		this.elements[i].addEventListener("mouseover",over_fn,false);
		this.elements[i].addEventListener("mouseout",out_fn,false);
	};
	return this;
};

//设置鼠标点击切换方法
Base.prototype.toggle = function() {
	for (var i=0; i<this.elements.length;i++){
		(function(elements,args){
			var count = 0;
			elements.addEventListener("click",toggle_fn,false);
			function toggle_fn() {
				args[count++ % args.length].call(this);
			}
		})(this.elements[i],arguments);
	};
	return this;
}

//设置显示
Base.prototype.show = function() {
	for (var i=0; i<this.elements.length;i++){
		this.elements[i].style.display = "block";
	};
	return this;
};

//设置隐藏
Base.prototype.hide = function() {
	for (var i=0; i<this.elements.length;i++){
		this.elements[i].style.display = "none";
	};
	return this;
};

//设置居中
Base.prototype.center = function(width,height) {
	var top = (document.documentElement.clientHeight - height)/2;
	var left = (document.documentElement.clientWidth - width)/2;
	for (var i=0; i<this.elements.length;i++){
		this.elements[i].style.top = top + getScroll().top + "px";
		this.elements[i].style.left = left + getScroll().left + "px";
		if(this.elements[i].offsetTop <= 0+getScroll().top){
			this.elements[i].style.top=getScroll().top + "px";
		}
		if(this.elements[i].offsetLeft<=0+getScroll().left){
			this.elements[i].style.left=getScroll().left+ "px";
		}
	};
	return this;
};

//锁屏功能
Base.prototype.lock = function() {
	for (var i=0; i<this.elements.length;i++){
		document.getElementById("screen").style.display = "block";
		document.documentElement.style.overflow = "hidden";
		// window.addEventListener("scroll",onscroll_fn,false);
	};
	return this;
};
//解锁功能
Base.prototype.unlock = function() {
	for (var i=0; i<this.elements.length;i++){
		document.getElementById("screen").style.display = "none";
		document.documentElement.style.overflow = "auto";
		// window.removeEventListener("scroll",onscroll_fn,false);
	};
	return this;
};

//触发浏览器窗口大小改变事件
Base.prototype.resize = function (fn) {
	for (var i=0; i<this.elements.length;i++){
		var element = this.elements[i];
		window.addEventListener("resize",onresize_fn,false);
		function onresize_fn() {
			if(typeof fn == "function") fn();
			var maxTop = document.documentElement.clientHeight - element.offsetHeight;
			var maxLeft = document.documentElement.clientWidth - element.offsetWidth;
			if(element.offsetTop > maxTop) {
				element.style.top = maxTop +getScroll().top + "px";
				if(element.offsetTop <= 0+getScroll().top){
					element.style.top=getScroll().top + "px";
				}
			}
			if(element.offsetLeft > maxLeft) {
				element.style.left = maxLeft +getScroll().left + "px";
				if(element.offsetLeft<=0+getScroll().left){
					element.style.left=getScroll().left+ "px";
				}
			}
		};
	};
	return this
};

//插件入口
Base.prototype.extend = function (name,fn) {
	Base.prototype[name] = fn;
};



//设置动画attr,start,step,target,t
Base.prototype.animate = function(obj){
	//obj = {attr(left),start(自身),step,alert,type,speed}
	for (var i=0; i<this.elements.length;i++){
		var element = this.elements[i];
		var mul = obj["mul"];
		var attr = attr_select(obj["attr"]);
		var start = obj["start"] != undefined ? obj["attr"]=="opacity" ? parseFloat(getStyle(element,attr))*100 : 
		obj["start"] : 
		parseInt(getStyle(element,attr));
		var step = obj["step"] != undefined ? obj["step"] : 10;
		var t = obj["t"] != undefined ? obj["t"] : 20;
		var speed = obj["speed"] != undefined ? obj["speed"] : 8;
		var type = obj["type"] == 0 ? "contant" : obj["type"] == 1 ? "buffer" : "buffer";
		//确认target到底是什么（根据alert）
		var target = obj["target"];
		if(!obj["alert"] && (obj["target"] == undefined) && (mul==undefined)) {	//有target就依target，没有依alert，连alert都没有就抛出错误
			throw new Error("请输入增量alert或目标量target。")
		}else if(!!obj["alert"] && (obj["target"] == undefined)){
			target = obj["alert"] + start;
		}
		//确认step是正还是负，根据start和target
		if(start > target) step = -step;
		//重设HTML起始点，根据js
		if(attr == "opacity"){
			if(obj["start"] != undefined){
				element.style.opacity = start / 100;
			}
		}else {
			if(obj["start"] != undefined){
				element.style[attr] = start + "px";
			}
		}
		if(mul == undefined){
			mul = {};
			mul[attr] = target;
		}
		// console.log("target:"+target+"\ step:"+step+"\ attr:"+attr+"\ start:"+start);
		clearInterval(element.timer);
		element.timer = setInterval(function(){
			var flag = true;
			for (var i in mul){
				attr = attr_select(i);
				target = mul[i];
				if(type =="buffer"){
					if(attr == "opacity"){
						step = (target - parseFloat(getStyle(element,attr))*100)/speed;
					}else {
						step = (target - parseInt(getStyle(element,attr)))/speed;
					}
					if(step>0) {	
						//取整，step为0.9取1慢慢过渡(用Math.ceil()向上取整)
						//		step为-0.9取-1慢慢过渡(用Math.floor()向下取整)
						step=Math.ceil(step)
					}else {step=Math.floor(step)}
				}
				if(attr == "opacity") {
					if((step == 0) ||(step == -0)){
						setOpacity();
					}else if(step>0 && parseFloat(getStyle(element,"opacity"))*100 >= (target-step)){
						setOpacity();
					}else if(step<0 && parseFloat(getStyle(element,"opacity"))*100 <= (target-step)){
						setOpacity();
					}else {
						element.style.opacity = parseFloat((getStyle(element,"opacity")*100 + step)/100);
					}
					if(  parseInt(parseFloat(getStyle(element,"opacity")*100)) != target ) {flag = false};
					// console.log(target,parseInt(parseFloat(getStyle(element,"opacity")*100)),flag);
					//多次*100会出问题，而且此处没机会用parseInt，因为他会将57.99999取57，再次运算后还是57.9999一直重复。
				}else {
					// console.log(step>0);
					if((step == 0) ||(step == -0)){
						setTarget();
					}else if(step>0 && parseInt(getStyle(element,attr)) >= (target-step)){
						setTarget()
					}else if(step<0 && parseInt(getStyle(element,attr)) <= (target-step)){
						setTarget();
					}else {
						element.style[attr] = parseFloat(getStyle(element,attr)) + step + "px";
					}
					if(  parseFloat(getStyle(element,attr)) != target ) {flag = false};
				}
			}
			// console.log(target+"\ "+attr+"\ S:"+element.style[attr]+"\ 计:"+getStyle(element,attr)+"\ "+step+"\ "+flag);
			if(flag){
				clearInterval(element.timer);
				if(obj.fn != undefined){obj.fn();};
			}
		},t);
		function attr_select(input_value) { //属性简写
			var a = "left";
			switch (input_value) {
				case undefined :
					a = "left";
					break;
				case "x": 
					 a = "left";
					break;
				case "y":
					a = "top";
					break;
				case "h":
					a = "height";
					break;
				case "w":
					a = "width";
					break;
				case "o":
					a = "opacity";
					break;
				default: 
					a = input_value;
			}
			return a; 
		}
		function setTarget() {
			element.style[attr] = target + "px";
		}
		function setOpacity() {
			element.style.opacity = target / 100;
			
		}
	};
	return this
};