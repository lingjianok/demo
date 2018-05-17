(function(){
	let $user = $(".login_user input");
	let $pass = $(".login_pass input");
	let $btn = $(".login_btn");
	let $hint = $(".login_hint");
	$btn.click(function(){
		let user = $user.val();
		let pass = $pass.val();
		if(user&&pass){
			$.ajax({
				type:"post",
				url:"php/login.php",
				data:{
					name: user,
					pass: pass
				}
			}).then(function(d){
				if(d=="yes"){
					let obj = {
						"username": user,
						"password": pass
					}
					obj=JSON.stringify(obj);
					$.cookie("user",obj,{expires:30});
					location.href = "index.html";
				}else{
					$hint.css("visibility","visible");
				}
			});
		}
		
	})
})();
