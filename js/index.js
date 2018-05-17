

//登录检测
(function(){
	let cookie = $.cookie("user");
	if(cookie){
		let username = JSON.parse(cookie).username;
		$("#user").html("Hi,"+username);
	}
})();

//头部广告
(function(){
	$(".hd_adv").on("click",function(e){
		if(e.target.tagName=="SPAN"){
			$(this).animate({
				marginTop:"-80px"
			})
		}
	});
})();

//搜索框效果
(function(){
	let $obj = $(".hd_search_main").clone(true)
	$obj.appendTo($(".top_hd_search div"));
	$(window).on("scroll",function(){
		if($(window).scrollTop()>=1000){
			$(".top_hd_search ").stop().animate({
				top:0
			});
		}else {
			$(".top_hd_search").stop().animate({
				top:"-60px"
			});
		}
	})
	
})();

//banner图
(function(){
	$.ajax({
		url: "php/banner.php"
	})
	.then(function(d){
		let data = JSON.parse(d);
		let sUl = `<ul class="clear">`;
		let sOl = `<ol class="a_btn">`;
		$.each(data,function(i,cont){
			sUl+=`<li><a href="#" style=background-image:url(${cont.url});></a></li>`;
			sOl+= `<li><a href="#"></a></li>`;
		});
		sUl+="</ul>";
		sOl+="</ol>";
		sbtn = `<button class="btn_left">&lt;</button>
				<button class="btn_right">&gt;</button>-->`;
		$box = $(".banner");
		$box.html(sUl + sOl + sbtn);
		new Lunbo($box);
	});
	
	function Lunbo($obj){
		this.obj = $obj;
		this.num = 0;
		this.$lists = $obj.find("ul li");
		this.$aBtns = $obj.find("ol li a");
		this.btn_l = $obj.find(".btn_left");
		this.btn_r = $obj.find(".btn_right");
		this.len = this.$lists.length;
		this.timer = null;
		this.init();
	}
	Lunbo.prototype= {
		constructor: Lunbo,
		init: function(){
			this.showobj(this);
			this.aBtn();
			this.btn();
			this.loop();
		},
		aBtn: function(){
			let This = this;
			this.$aBtns.on('mouseover', function(){
				$(this).addClass("active")
			  	.parent().siblings().find("a").removeClass("active");
			   	This.num = $(this).parent().index();
			   	This.$lists.eq(This.num).show().siblings().hide();
			});
		},
		btn:function(){
			let This=this;
			let $obj = this.obj;
			let $btns = $obj.find("button");
			$btns.hide();
			$obj.hover(function(){
				$btns.show();
			},function(){
				$btns.hide();
			});
			this.btn_r.on("click",function(){
				This.num++;
				if(This.num>=This.len){
					This.num=0;
				}
				This.showobj(This);
			});
			this.btn_l.on("click",function(){
				This.num--;
				if(This.num<0){
					This.num=This.len-1;
				}
				This.showobj(This);
			});
		},
		showobj:function(t){
			t.$lists.eq(t.num).show().siblings().hide();
			t.$aBtns.eq(t.num).addClass("active")
			  	.parent().siblings().find("a").removeClass("active");
		},
		loop:function(){
			let This=this;
			this.timer = setInterval(fn,2000);
			this.obj.hover(function(){
				clearInterval(This.timer);
			},function(){
				This.timer = setInterval(fn,2000);
			});
			function fn(){
				This.num++;
				if(This.num>=This.len){
					This.num=0;
				}
				This.showobj(This);
			}
		}
	}
})();

//二级导航数据引入
(function(){
	$.ajax({
		url:"php/nav.php"
	}).then(function(d){
		let data = JSON.parse(d);;
		let $box = $(".main_nav_sub_l");
		let html = '';
		data.forEach(function(curr){
			curr.list = JSON.parse(curr.list);
			let str = "";
			curr.list.map(function(val){
				str+=`<a href="#">${val}</a>`;
			});
			str = `
				<dl class="clear">
					<dt>
						<a href="#">${curr.title}</a>
						<i>></i>
					</dt>
					<dd>
						${str}
					</dd>
				</dl>
			`;
			html+=str;
		});
		$box.html(html);
	});
})();



/* 国产食品
   ============================================*/
$.ajax(
	{url: "php/gc.php"}
).then(function(d){
	let data = JSON.parse(d);
	let str = "";
	data.map(function(curr,i,arr){
		str+=`
			<li class="goods_show_lived">
				<a href="#">
					<h4>${curr.title}</h4>
					<p>${curr.p}</p>
					<img src="${curr.src}" alt="" />
				</a>
			</li>
		`;
	});
	str=`<ul>${str}</ul>`;
	$(".goods_show:eq(0)").html(str);
});

/*
 	楼梯效果
   ===========================================*/
(function(){
	let $stairs = $('.stairs');
	let $floors = $(".floor");
	$(window).on("scroll",function(){
		let scrollTop=$(window).scrollTop();
		let top = $floors.eq(0).offset().top;
		let h = $floors.eq(0).height();
		
		//楼梯显示与隐藏
		if(scrollTop>=top-h/2){
			$stairs.show();
		}else{
			$stairs.hide();
		}
		//楼梯楼层匹配
		$floors.each(function(i,ele){
			let floor_top = $(ele).offset().top;
			if(floor_top + h/2 > scrollTop){
				$stairs.find("a").eq(i).addClass('active')
				.parent().siblings().find("a").removeClass('active');
				return false;
			}
		});
	});
		//点击按跳转相应的楼层
		$stairs.find("a").not(":last").on("click",function(){
			let i = $(this).parent().index();
			let top = $floors.eq(i).offset().top;
			$("html,body").animate({scrollTop: top});
		});
		$stairs.find("a:last").on("click",function(){
			$("html,body").animate({scrollTop: 0});
		});
})();
