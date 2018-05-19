(function(){
	let data = [
		{
			"mid": "//img12.360buyimg.com/n1//s360x360_jfs/t3181/241/9127406531/110691/43733c57/58cf4f7aN28c7d04d.jpg",
			"big": "//img12.360buyimg.com/n1//s600x600_jfs/t3181/241/9127406531/110691/43733c57/58cf4f7aN28c7d04d.jpg"
		},
		{
			"mid": "//img12.360buyimg.com/n1//s360x360_jfs/t4336/347/2294419571/88970/faefbb3e/58cf4f7cN148a2ace.jpg",
			"big": "//img12.360buyimg.com/n1//s600x600_jfs/t4336/347/2294419571/88970/faefbb3e/58cf4f7cN148a2ace.jpg"
		},
		{
			"mid": "//img12.360buyimg.com/n1//s360x360_jfs/t3058/190/9211372737/97226/6b76fb07/58cf4f7bN9992c970.jpg",
			"big": "//img12.360buyimg.com/n1//s600x600_jfs/t3058/190/9211372737/97226/6b76fb07/58cf4f7bN9992c970.jpg"
		},
		{
			"mid": "//img12.360buyimg.com/n1//s360x360_jfs/t4336/347/2294419571/88970/faefbb3e/58cf4f7cN148a2ace.jpg",
			"big": "//img12.360buyimg.com/n1//s600x600_jfs/t4336/347/2294419571/88970/faefbb3e/58cf4f7cN148a2ace.jpg"
		},
		{
			"mid": "//img12.360buyimg.com/n1//s360x360_jfs/t4294/112/2305624367/107708/cd95ef6/58cf4f7cN2e199138.jpg",
			"big": "//img12.360buyimg.com/n1//s600x600_jfs/t4294/112/2305624367/107708/cd95ef6/58cf4f7cN2e199138.jpg"
		},
		{
			"mid": "//img12.360buyimg.com/n1//s360x360_jfs/t4162/233/2303781568/118908/e6fa3485/58cf4f79Ncb2140af.jpg",
			"big": "//img12.360buyimg.com/n1//s600x600_jfs/t4162/233/2303781568/118908/e6fa3485/58cf4f79Ncb2140af.jpg"
		}
	];

	let $midImg = $(".proImg_border .proImg img");
	let $bigImg = $(".J_zoom img");
	let $midBox = $(".proImg_border .proImg");
	let $bigBox = $(".J_zoom");
	let $midZoom = $(".zoomCursor");
	let $btnl = $(".cBtn.prev");
	let $btnr = $(".cBtn.next");
	let nScale = 0;
	//鼠标移入小图的却换事件
	$(".hideBox").on("mouseover","b",function(){
		let i = $(this).index();
		$(this).addClass("cur").siblings().removeClass("cur");//小图标切换
		$midImg.attr("src",data[i].mid);
		$bigImg.attr("src",data[i].big);
		$midZoom.css({
			width : $bigBox.width() * nScale,
			height : $bigBox.height() * nScale
		});
	});
	
	//显示和隐藏放大镜
	$midBox.hover(
		function(){
			$midZoom.show();
			$bigBox.show();
			nScale =  $midBox.width()/$bigImg.width();
			resetZoom($midZoom);
		},
		function(){
			$midZoom.hide();
			$bigBox.hide();
		}
	);
	
	//移动放大镜
	$midBox.on("mousemove",function(e){
		let w = $midZoom.width();
		let h = $midZoom.height();
		let mw = $midBox.width();
		let mh = $midBox.height();
		let y=e.pageY-$midBox.offset().top - h/2;
		let x=e.pageX-$midBox.offset().left - w/2;
		x<=0?x=0:"";
		y<=0?y=0:"";
		x>=mw-w?x=mw-w:"";
		y>=mh-h?y=mh-h:"";
		$midZoom.css({
			top: y,
			left: x
		});
		$bigImg.css({
			top: -y/nScale,
			left: -x/nScale
		})
	});
	
	//左右箭头添加事件
	(function(num){
		let index = 0;
		let $box = $(".hideBox .mBox");
		let $lis = $box.find("b");
		let w = $lis.width();
		let max = $lis.length - num;
		$btnl.css({color:"#fff"});
		if(max>0){
			$btnl.on("click",function(){
				index--;
				fn();
			});
			$btnr.on("click",function(){
				index++;
				fn();
			});
		}else {
			$btnr.css({color:"#fff"});
		}
		
		function fn(){
			if(index<=0){
				index = 0;
				$btnl.css({color:"#fff"});
				$btnr.css({color:"#333"});
			}else if(index>=max){
				index = max;
				$btnr.css({color:"#fff"});
				$btnl.css({color:"#333"});
			}else {
				$btnl.css({color:"#333"});
				$btnr.css({color:"#333"});
			}
			$box.css({left:-w*index});
		}
		
	})(5);
	
//	调整比例函数
	function resetZoom(obj){
		obj.css({
			width : $bigBox.width() * nScale,
			height : $bigBox.height() * nScale
		});
	}
})();

//加入购物车
(function(){
	let $btn=$(".cartbox");
	let sidArr = [];
	let numArr = [];
	cookieToArr();
	function cookieToArr(){
		if($.cookie("sidArr")==""||!$.cookie("sidArr")){
			sidArr = [];
			numArr = [];
		}else {
			sidArr = $.cookie("sidArr").split(",");
			numArr = $.cookie("numArr").split(",");
		}
	};
	function setCookie(){
		$.cookie("sidArr",sidArr.toString(),{expires:30});
		$.cookie("numArr",numArr.toString(),{expires:30});
	};
	$btn.on("click", function(e){
		//运动部分
		let startX = e.pageX;
		let startY = e.pageY;
		let endX = $(".hd_prism_cart").offset().left;
		let endY = $(".hd_prism_cart").offset().top;
		let $img = $(".proImg img");
		let $new = $img.clone(false);
		$new.appendTo($("body")).css({
			position:"absolute",
			top: startY,
			left: startX,
			width: 30
		}).animate({
			top: endY,
			left: endX
		},500,function(){
			$(this).remove();
		});
		
		//改变cook部分
		cookieToArr();
		let sid = $(this).attr("sid");
		let num = +$("#cartnum").val();
		let index = sidArr.indexOf(sid);
		if(index==-1){
			sidArr.push(sid);
			numArr.push(num);
			setCookie();
		}else{
			console.log(num);
			num = num + +numArr[index];
			if(num>=99){
				num = 99;
			}
			numArr[index] = num;
			setCookie();
		}
	});
})();


//改变数量的限制
(function(){
	$("body").on("input", "#cartnum",function(){
		let val = $(this).val();
		val = val.replace(/[^0-9]/g,"");
		if(+val>=99){
			$(this).val("99");
		}else if(+val<=1){
			$(this).val("1");
		}else{
			$(this).val(val);
		}
	});
})();
