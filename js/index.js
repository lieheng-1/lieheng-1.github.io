
$(function(){
	//个人中心————下拉菜单
		$("#header .member").hover(
			function(){
				$("#header .member_ul").show().animate({
				mul : {
					o: 100,
					h:120
				}
				})
			;},	//鼠标移入
			function(){
				$("#header .member_ul").animate({
				mul : {
					o: 0,
					h:0
				},
				fn:function(){
					$("#header .member_ul").hide();
				}
				})
			;}		//鼠标移出
		);

	//个人中心————登录/注册
		//顶部登录按钮被单击
		$("#header .login").click(function(){
			$("#login").show().lock().center(350,250);
			$("#screen").animate({
				attr:"o",
				target:50
			});
		}); 
		//顶部注册按钮被单击
		$("#header .reg").click(function(){
			$("#reg").show().lock().center(600,550);
			$("#screen").animate({
				attr:"o",
				target:50
			});
		}); 

	//注册框
		$("#reg").resize().drag($("#reg h2").first());//登录框添加窗口事件，添加拖拽（及限制拖拽范围）
		$("#reg .close").click(function(){ //登录关闭按钮被点击
			$("#reg").hide();
			$("#screen").animate({
				attr:"o",
				target:0,
				fn:function(){
					$("#reg").unlock();
				}
			});
		}); 

	//登录框
		$("#login").resize().drag($("#login h2").first());//登录框添加窗口事件，添加拖拽（及限制拖拽范围）
		$("#login .close").click(function(){ //登录关闭按钮被点击
			$("#login").hide();
			$("#screen").animate({
				attr:"o",
				target:0,
				fn:function(){
					$("#login").unlock();
				}
			});
		}); 

	//滑动导航
		$("#nav .high li").hover(function(){
			var _this=this;
			$("#nav .nav_bg").animate({
				speed: 3,
				mul:{
					x:_this.offsetLeft+20
				},
				fn:function() {
					$("#nav .white").animate({attr:"x",speed:5,target:-_this.offsetLeft});
				}
			})
		}
		,
		function(){
			var _this=this;
			$("#nav .nav_bg").animate({
				mul:{
					x:20
				},
				fn:function() {
					$("#nav .nav_bg .white").animate({attr:"x",speed:5,target:0})
				}
			})
		}
		);
	
	//左侧菜单
		$("#sidebar h2").toggle(function(){
			$(this).next().animate({mul:{h:0,o:0}})
		},function(){
			$(this).next().animate({mul:{h:152,o:100}})
		});

	//百度分享框
		$("#share").hover(
			function(){$(this).animate({
				mul: {
					x:0,
				}
			});},
			function(){$(this).animate({
				mul: {
					x:-212,
				}
			});}
		);

	//注册框表单验证
		$("form").first().reset();
			// $("form").form("user").value(); //获取form.获取name为user的对象.获取(设置)其value
		//用户名验证
			$("form").form("user").bind("focus",function(){
				$("#reg .info_user").css("display","block");
				$("#reg .error_user").css("display","none");
				$("#reg .succ_user").css("display","none");
			}).bind("blur",function(){
				$("#reg .info_user").css("display","none");
				if($(this).value().length != 0){
					if( check_user() )
						$("#reg .succ_user").css("display","block");
						else $("#reg .error_user").css("display","block");
				}else {
					$("#reg .error_user").css("display","none");
					$("#reg .succ_user").css("display","none");
				}
			});
			function check_user(){
				return /^[\w_]{2,20}$/.test($("form").form("user").value())
			}
		//密码验证
			$("form").form("pass").bind("focus",function(){
				$("#reg .info_pass").css("display","block");
				$("#reg .error_pass").css("display","none");
				$("#reg .succ_pass").css("display","none");
			}).bind("blur",function(){
				$("#reg .info_pass").css("display","none");
				if( $(this).value().length != 0 ) {
					if(check_pass()){
						$("#reg .succ_pass").css("display","block");
					}else $("#reg .error_pass").css("display","block");
				}else {
					$("#reg .error_pass").css("display","none");
					$("#reg .succ_pass").css("display","none");
				}
			});
			$("form").form("pass").bind("keyup",function(){
				check_pass();
			});
			function check_pass() {
				var value = $("form").form("pass").value();
				// 6-20个字符
				if( (value.length>=6) && (value.length<=20) ){
					$("#reg .info_pass .q1").html("●").css("color","green");
				}else {$("#reg .info_pass .q1").html("○").css("color","black");}
				// 只能包含大小写字母、数字和非空格字符
				if( /^[\S]+$/.test(value) ) {
					$("#reg .info_pass .q2").html("●").css("color","green");
				}else {$("#reg .info_pass .q2").html("○").css("color","black");}
				// 大、小写字母、数字、非空字符，2种以上
				var big_pass = ( /[A-Z]+/.test(value) ) ? 1 : 0;
				var small_pass = ( /[a-z]+/.test(value) ) ? 1 : 0;
				var number_pass = ( /[0-9]+/.test(value) ) ? 1 : 0;
				var char_pass = ( /[^\s\w]+/.test(value) ) ? 1 : 0;
				var code_length = big_pass + small_pass + number_pass + char_pass;
				if(code_length >= 2){
					$("#reg .info_pass .q3").html("●").css("color","green");
				}else {$("#reg .info_pass .q3").html("○").css("color","black");}
				// 安全级别 注：从要求高往低开始判断
				if( value.length>=10 && (code_length>=3) ) {
					$("#reg .info_pass .s").css("color","green");
					$("#reg .info_pass .s4").html("高");
				}else if( value.length>=8 && (code_length>=2) ){
					$("#reg .info_pass .s1").css("color","orange");
					$("#reg .info_pass .s2").css("color","orange");
					$("#reg .info_pass .s3").css("color","#ccc");
					$("#reg .info_pass .s4").css("color","orange").html("中");
				}else if( value.length>=1 ){
					$("#reg .info_pass .s1").css("color","red");
					$("#reg .info_pass .s2").css("color","#ccc");
					$("#reg .info_pass .s3").css("color","#ccc");
					$("#reg .info_pass .s4").css("color","red").html("低");
				}else {
					$("#reg .info_pass .s").css("color","#ccc");
					$("#reg .info_pass .s4").html("");
				}
				if( (value.length>=6) && (value.length<=20) && (/^[^\s]+$/.test(value)) && (code_length >= 2)){
							return true
				}else {
					return false;
				}
			}
		//密码确认验证
			$("form").form("notpass").bind("focus",function(){
				$("#reg .info_notpass").css("display","block");
				$("#reg .error_notpass").css("display","none");
				$("#reg .succ_notpass").css("display","none");
			}).bind("blur",function(){
				$("#reg .info_notpass").css("display","none");
				if($(this).value().length != 0){
					if(   check_notpass() )
						$("#reg .succ_notpass").css("display","block");
						else $("#reg .error_notpass").css("display","block");
				}else {
					$("#reg .error_notpass").css("display","none");
					$("#reg .succ_notpass").css("display","none");
				}
			});
			function check_notpass() {
				return ($("form").form("notpass").value() == $("form").form("pass").value())&&check_pass();
			}
		//提问
			$("form").form("ques").bind("change",function(){
				if(check_ques()){
					$("#reg .error_ques").css("display","none");
				}
				if(check_ans()){
					$("#reg .error_ans").css("display","none");
				}
			});
			function check_ques(){
				return ($("form").form("ques").value() != 0);
			}
		//回答验证
			$("form").form("ans").bind("focus",function(){
				$("#reg .info_ans").css("display","block");
				$("#reg .error_ans").css("display","none");
				$("#reg .succ_ans").css("display","none");
			}).bind("blur",function(){
				$("#reg .info_ans").css("display","none");
				if($(this).value().length != 0){
					if(check_ans()){
						$("#reg .succ_ans").css("display","block");
					}else {
						$("#reg .error_ans").css("display","block")
					};
				}else {
					$("#reg .error_ans").css("display","none");
					$("#reg .succ_ans").css("display","none");
				}
			});
			function check_ans() {
				return ($("form").form("ans").value().length >=2 && check_ques());
			}
		//电子邮件验证
			$("form").form("email").bind("focus",function(){
				if(  ($(this).value().length >= 1) && ($(this).value().indexOf("@")==-1) ){
					$("#reg .all_email").css("display","block");
				}else{
					$("#reg .all_email").css("display","none");
				}
				$("#reg .info_email").css("display","block");
				$("#reg .error_email").css("display","none");
				$("#reg .succ_email").css("display","none");
			}).bind("blur",function(){
				$("#reg .all_email").css("display","none");
				$("#reg .info_email").css("display","none");
				if($(this).value().length != 0){
					if(check_email())
						$("#reg .succ_email").css("display","block");
						else $("#reg .error_email").css("display","block");
				}else {
					$("#reg .error_email").css("display","none");
					$("#reg .succ_email").css("display","none");
				}
			});
			$("form").form("email").bind("keyup",function(event){
				$("#reg .all_email span").html($(this).value());
				var all_email_flag = ($(this).value().length >= 1) && ($(this).value().indexOf("@")==-1);
				if(  all_email_flag ){
					$("#reg .all_email").css("display","block");
				}else{
					$("#reg .all_email").css("display","none");
				};
				if(this.index == undefined) this.index=-1;
				// event.keyCode 38↑ 40↓ 13Enter
				if((event.keyCode == 40) && all_email_flag){
					this.index++;
					if(this.index >= $("#reg .all_email li").length())  this.index =0;
					$("#reg .all_email li").css("background","#fff");
					$("#reg .all_email li").css("color","#666");
					$("#reg .all_email li").eq(this.index).css("background","#EFF5FE");
					$("#reg .all_email li").eq(this.index).css("color","#70A5F5");
				}
				if((event.keyCode == 38) && all_email_flag){
					this.index--;
					if(this.index <= -1)  this.index =$("#reg .all_email li").length()-1;
					$("#reg .all_email li").css("background","#fff");
					$("#reg .all_email li").css("color","#666");
					$("#reg .all_email li").eq(this.index).css("background","#EFF5FE");
					$("#reg .all_email li").eq(this.index).css("color","#70A5F5");
				}
				if((event.keyCode == 13) && all_email_flag && (this.index!=-1)){
					$(this).value($("#reg .all_email li").eq(this.index).text());
					$("#reg .all_email").css("display","none");
					this.index=-1;
				}
			});
			$("#reg .all_email li").bind("mousedown",function(){
				$("form").form("email").value($(this).text());
			}).hover(function(){
				$(this).css("color","#70A5F5").css("background","#EFF5FE");
			},function(){
				$(this).css("color","#666").css("background","#fff");
			});
			function check_email() {
				return (/^[\w\._\-]+@[\w_\-]+(\.[a-zA-Z]{2,4}){1,2}$/.test($("form").form("email").value()))
			}
		//生日年月日验证
			var year = $("form").form("year");
			var month = $("form").form("month");
			var day = $("form").form("day");
			var day30 = [4,6,9,11];
			var day31 = [1,3,5,7,8,10,12];
			for (var i=1900;i<=2019;i++){
				year.first().add(new Option(i,i) , undefined);
			}
			for (var j=1;j<=12;j++){
				month.first().add(new Option(j,j) , undefined);
			}
			month.bind("change",select_day);
			year.bind("change",select_day);
			day.bind("change",function(){
				if(check_birthday()){
					$("#reg .error_birthday").css("display","none");
				}
			})
			function select_day() {
				day.first().options.length = 1 ;
				var cur_day = 0;
				if(year.first().value !=0 && month.first().value !=0){
					if( inArray(day31,parseInt(month.first().value)) ) {
						cur_day = 31;
					}else if( inArray(day30,parseInt(month.first().value)) ){
						cur_day = 30;
					}else if( month.first().value==2 ){
						if( year.first().value%4==0 &&  year.first().value%400==0 ){
							cur_day = 29;
						}else {
							cur_day = 28;
						}
					}
				}
				for (var i=1;i<=cur_day;i++){
					day.first().add(new Option(i,i) , undefined);
				}
			}
			function check_birthday(){
				return ((year.value() != 0)&&(month.value() != 0)&&(day.value() != 0));
			}
		//备注
			$("form").form("ps").bind("keyup",check_ps).bind("paste",function(){
				setTimeout(check_ps,50);
			});;
			$("#reg .ps .clear_ps").click(function(){
				$("form").form("ps").value($("form").form("ps").value().substring(0,200));
				check_ps();
			});
			function check_ps(){
				$("#reg .ps .num").eq(0).text(200 - $("form").form("ps").value().length);
				$("#reg .ps .num").eq(1).text($("form").form("ps").value().length - 200);
				if( $("form").form("ps").value().length>200){
					$("#reg .ps").eq(0).hide();
					$("#reg .ps").eq(1).show();
					return false;
				}else {
					$("#reg .ps").eq(0).show();
					$("#reg .ps").eq(1).hide();
					return true;
				}
			}
		//提交
			$("form").form("sub").click(function(){
				var flag = true;
				if(!check_user()){
					flag = false;
					$("#reg .error_user").css("display","block");
				}
				if(!check_pass()){
					flag = false;
					$("#reg .error_pass").css("display","block");
				}
				if(!check_notpass()){
					flag = false;
					$("#reg .error_notpass").css("display","block");
				}
				if(!check_ques()){
					flag = false;
					$("#reg .error_ques").css("display","block");
				}
				if(!check_ans()){
					flag = false;
					$("#reg .error_ans").css("display","block");
				}
				if(!check_email()){
					flag = false;
					$("#reg .error_email").css("display","block");
				}
				if(!check_birthday()){
					flag = false;
					$("#reg .error_birthday").css("display","block");
				}
				if(!check_ps()){
					flag = false;
				}else if(flag){
					if($("form").form("ps").value().length==0){
						$("form").form("ps").value("这个人很懒，什么都没留下。")
						$("#reg .ps .num").eq(0).text(187);
					}
				}
				if(flag){
					setTimeout($("form").first().submit(),200);
				}
			});

	//轮播器
		//模式选择
		var banner_type = 2; //切换模式：1表示透明度，2表示上下滚动；
		var banner_time = 3; //切换速度：表示轮播器几秒一张；
		//轮播器初始化
		$("#banner ul li").eq(0).css("background","#aaa");
		$("#banner strong").html($("#banner img").eq(0).attr("alt"))
		// 透明度初始化
		$("#banner img").opacity(0);
		$("#banner img").eq(0).opacity(100);

		var banner_index = 1;//轮播器显示引索 默认刷新后下一次自动展示第二张（引索为1）。
		// banner_index=1，下行循环从引索1（即第二张开始）
		var banner_timer = setInterval(banner_fn,banner_time*1000);//开启轮播器循环播放
		$("#banner ul li").hover(function(){
			clearInterval(banner_timer);	//指上去就停止循环
			if(  $(this).css("backgroundColor")!= "rgb(170, 170, 170)"  ){
				banner_index = $(this).index(); //将banner_index设定为实际指上去的引索。
				banner(banner_index);//在上一个条件下，将实际指上去的引索在轮播器上显示
			}
		},function(){
			++banner_index;
			// banner_index=实际指上去的引索+1，即循环从下一张开始）；
			banner_timer = setInterval(banner_fn,banner_time*1000); //移出去就开始循环
		});
		function banner_fn(){//根据banner_index递增并循环，执行banner()使得轮播器依次循环显示特定引索照片。
			if(banner_index >= $("#banner img").length()) banner_index = 0;
			banner(banner_index++);
		}
		function banner(now,prev) {//根据banner_index提供的引索，轮播器显示特定引索照片。
			var prev = now-1==-1 ? $("#banner img").length()-1 : now-1;//前一个显示的引索
			$("#banner ul li").css("background","#333");
			$("#banner ul li").eq(now).css("background","#aaa");
			$("#banner strong").html($("#banner img").eq(now).attr("alt"));
			$("#banner img").css("zIndex","1");
			if(banner_type==1){
				$("#banner img").eq(prev).animate({attr: "o",target:0,t:20,speed:60});
				$("#banner img").eq(now).css("zIndex","2").animate({attr: "o",target:100,t:20,speed:60});
			}else if(banner_type=2){
				$("#banner img").eq(prev).opacity(100).animate({attr: "y",target:"150",t:20,speed:40});
				$("#banner img").eq(now).css("zIndex","2").css("top","-150px").opacity(100).animate({attr: "y",target:0,t:20,speed:30});
			}

		}

	//照片——延迟加载
		$("#photo img").opacity(30);
		_wait_load();
		$(window).bind("scroll",_wait_load);
		$(window).bind("resize",_wait_load);
		function _wait_load(){
			setTimeout(function(){
				var photo = $("#photo img");
				var scroll_bottom = window.innerHeight + getScroll().top; 
				for(var i=0;i<photo.length();i++){
					var _this = photo.ge(i);
					var high = offsetTop(_this);
					if(scroll_bottom >= high){
						$(_this).attr("src",$(_this).attr("xsrc")).animate({attr:"o",target:100});
					}
				}
			},100);
		}

//图片展示——预加载
	//图片展示，窗口事件，拖拽
	$("#photo_big").resize().drag($("#photo_big h2").first());
	
	//图片展示框 的触发
	$("#photo img").click(function(){
		$("#photo_big").show().lock().center(620,511);
		$("#screen").animate({
			attr:"o",
			target:50
		});
		var big_src = $(this).attr("bigsrc");
		var temp_img = new Image();
		temp_img.src = big_src;
		$(temp_img).bind("load",function(){
				$("#photo_big .big img").css("top","0").opacity(0).animate({
					attr:"o",
					target: 100,speed:30
				}).attr("src",big_src);
		});
		var children_dl = this.parentNode.parentNode;//结构是 #photo_big>dl*12{dt>img} ， 可见有意义的引索是dl的
		prev_next_photo_big(children_dl);
		// 测试图片地址 "http://bbsfiles.vivo.com.cn/vivobbs/attachment/forum/201512/11/141332pxke9fit2tasa5eb.jpg"
	}); 

	//图片展示框 的关闭按钮
	$("#photo_big .close").click(function(){ //登录关闭按钮被点击
		$("#photo_big").hide();
		$("#screen").animate({
			attr:"o",
			target:0,
			fn:function(){
				$("#photo_big").unlock();
			}
		});
		// $("#photo_big .big").css("backgroundColor","rgba(38,38,38,1)");
		$("#photo_big .big img").css("top","80px").attr("src","images/big_loading2.gif");
	}); 

	//图片展示框 的左、中、右悬停效果
		$("#photo_big .bigleft").hover(function(){
			$("#photo_big .left").animate({attr:"o",target:"50",speed:13});
		},function(){
			$("#photo_big .left").animate({attr:"o",target:"0",speed:13});
		});
		$("#photo_big .bigright").hover(function(){
			$("#photo_big .right").animate({attr:"o",target:"50",speed:13});
		},function(){
			$("#photo_big .right").animate({attr:"o",target:"0",speed:13});
		});
		$("#photo_big .bigcenter").hover(function(){
			$("#photo_big .left").animate({attr:"o",target:"50",speed:13});
			$("#photo_big .right").animate({attr:"o",target:"50",speed:13});
			$("#photo_big .center").animate({attr:"o",target:"50",speed:13});
		},function(){
			$("#photo_big .left").animate({attr:"o",target:"0",speed:13});
			$("#photo_big .right").animate({attr:"o",target:"0",speed:13});
			$("#photo_big .center").animate({attr:"o",target:"0",speed:13});
		});

	//图片展示框 的左、右点击切换效果
	$("#photo_big .left").click(function(){
		$("#photo_big .big img").css("top","80px").attr("src","images/big_loading2.gif");

		var temp_img = new Image();
		temp_img.src = $(this).attr("src");
		$(temp_img).bind("load",function(){
			$("#photo_big .big img").css("top","0").opacity(0).attr("src",temp_img.src).animate({
						attr:"o",
						target: 100,speed:30
					});
		});
		var index = prevIndex($("#photo_big img").attr("index"),$("#photo").first());
		var children_dl = $("#photo dl").ge(index);
		prev_next_photo_big(children_dl);
	});
	$("#photo_big .right").click(function(){
		$("#photo_big .big img").css("top","80px").attr("src","images/big_loading2.gif");

		var temp_img = new Image();
		temp_img.src = $(this).attr("src");
		$(temp_img).bind("load",function(){
			$("#photo_big .big img").css("top","0").opacity(0).attr("src",temp_img.src).animate({
						attr:"o",
						target: 100,speed:30,t:50
					});
		});
		var index = nextIndex($("#photo_big img").attr("index"),$("#photo").first());
		var children_dl = $("#photo dl").ge(index);
		prev_next_photo_big(children_dl);
	});
	function prev_next_photo_big(children_dl){
		var prev = prevIndex($(children_dl).index(),children_dl.parentNode);
		var next = nextIndex($(children_dl).index(),children_dl.parentNode);
		var prev_img = new Image();
		prev_img.src = $("#photo dl dt img").eq(prev).attr("bigsrc");
		var next_img = new Image();
		next_img.src = $("#photo dl dt img").eq(next).attr("bigsrc");
		$("#photo_big img").attr("index",$(children_dl).index());
		$("#photo_big .left").attr("src",prev_img.src);
		$("#photo_big .right").attr("src",next_img.src);
		$("#photo_big .center").html(($(children_dl).index()+1) + "/" + $("#photo img").length());
		$("#photo_big .center").animate({attr:"o",target:"50",speed:13});
		setTimeout(function(){
			$("#photo_big .center").animate({attr:"o",target:"0",speed:13});
		},800)
	}
});
