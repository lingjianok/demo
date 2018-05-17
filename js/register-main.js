require.config({
	paths:{
		"jquery": "jquery",
		"jquerycookie": "jquery.cookie"
	}
});
require(['jquery','jquerycookie'], function($){
	
	let login=[false,false,false,false];
	let $user = $(".regist_username input");
	let $num = $("#num");
	let $pass = $("#password");
	let $repass = $("#repass");
	let $submit = $("#submit");
	//提示文字左浮动
	$('.regist_form>li input').on('click',function(){
		let $span = $(this).next();
		$span.animate({left: -$span.width()-5});
	});
	
	//用户名验证
	$user.on('focus',function(){
		//得到光标的提示语
		$(this).parent().next().find('.regist_ysame_enter').show().siblings().hide();
	});
	$user[0].addEventListener("blur",function(){
		let val = $(this).val();
		let $hint = $(this).parent().next();
		let reg = /^[a-zA-Z\u4e00-\u9fa5][a-zA-Z0-9_\u4e00-\u9fa5]{3,19}$/
		if(reg.test(val)){//如果正则匹配成功
			$.ajax({		//发送数据
				type:"post",
				url:"php/reg.php",
				data:{
					username: val
				}
			}).then(function(d){
				if(d=="yes"){		//如果用户名已注册
					$(".user_fall").show().html("用户名已注册").siblings().hide();
					login[0]=false;
				}else{
					$(".user_succeed").show().siblings().hide();
					login[0]=true;
				}
			});
		}else{
			$(".user_fall").show().siblings().hide();
			login[0]=false;
		}
	});
	
	//手机号验证
	(function(){
		let $target = $(".regist_phNum .regist_ysame_enter");
		$num.on("input",function(){
			let val = $num[0].value;
			let reg=/^1[3-9][0-9]{9}$/;
			if(reg.test(val)){
				$target.hide();
				login[1]=true;
			}else{
				$target.show().html("请填写正确的手机号码，以便接受短信");
				login[1]=false;
			}
		});
		$num.blur(function(){
			if(login[1]){
				return false;
			}else{
				$target.show().html("请填写正确的手机号码");
			}
		});
	})();
	
	
	//密码强度验证
	(function(){
		let reg1=/\d+/;
		let reg2=/[a-zA-Z]+/;
		let reg3=/\W+/;
		let $success = $(".passhint .success");
		let $fall = $(".passhint .fall");
		let $span = $success.find("span");
		$pass.click(function(){
			$fall.show();
			$fall.removeClass("empty");
			$success.hide();
		});
		$pass.on("input",function(){
			let val = $pass[0].value;
			let cont = 0;
			if(val.length>=6&&val.length<=20){
				$fall.show().hide();
				$success.show();
				login[2]=true;
				if(reg1.test(val)){
					cont++;
				}
				if(reg2.test(val)){
					cont++;
				}
				if(reg3.test(val)){
					cont++;
				}
				switch(cont){
					case 1: 
						$span.html('弱');
						$success.find("div").css({background:"#fff"});
						$success.find("div:eq(0)").css({background:"#0f0"});
					break;
					case 2:
						$span.html('中');
						$success.find("div").css({background:"#fff"});
						$success.find("div:lt(2)").css({background:"#ff0"});
					break;
					case 3:
						$span.html('强');
						$success.find("div").css({background:"#fff"});
						$success.find("div").css({background:"#f00"});
					break;
				}
			}else{
				$fall.show().html("6-20位大小写字母、符号或数字组成");
				$success.hide();
				login[2]=false;
			}
		});
		$pass.blur(function(){
			let val = $pass[0].value;
			if(val.length == 0){
				$fall.show().addClass("empty").html("密码不能为空");
			}else if(!(val.length>=6&&val.length<=20)){
				$fall.show().addClass("empty").html("密码应为6-20位");
			}
		});
		
		//密码确认验证
		$repass.on("input",function(){
			if($pass[0].value == $repass[0].value){
				login[3] = true;
			}else {
				login[3] = false;
			}
		});
		
		//点击注册
		$submit.click(function(){
			let stop = login.every((val)=>val);
			console.log(stop);
			console.log(login);
			if(!stop){
				return false;
			}
		})
	}());
});
