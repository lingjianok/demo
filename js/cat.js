

	let goodsData = [];
	let sidArr = [];
	let numArr = [];
	let $has = $(".has");
	let $empty = $(".empty");
	let $allNum = $(".all_num");
	let $checkNum = $(".check_num");
	let $allprice = $(".cat_stat_count_num");
	//1、建立猜你喜欢列表
	$.ajax(
		{url:"php/goods.php"}
	).then(function(d){
		let $like = $(".like_list");
		let $html="";
		goodsData = JSON.parse(d);
		goodsData.map(function(val,i,arr){
			$html+=`<div class="like_good">
				<img src="${val.src}" sid="${val.sid}"/>
				<p>￥${val.price}</p>
				<h3>${val.tit}</h3>
				<button class="addcat">
					加入购物车
				</button>
			</div>`
		});
		$like.html($html);
	});
	
	//2.cookie数值化
	cookieToArr();
	
	//3.根据cookie加载购物车
	if(sidArr.length && numArr.length){
		$empty.hide();
		$has.show();
		createGoods();
	}else{
		$empty.show();
		$has.hide();
	}
	
	//4.点击加入购物车存cookie
	$(".like_list").on("click",".addcat",function(){
		let sid = $(this).siblings("img").attr('sid');
		let index = sidArr.indexOf(sid);
		if(index!=-1){
			numBtn(1,$(".cat_good:visible").eq(index).find(".cat_good_num_btnr")[0]);
		} else {
			sidArr.push(sid);
			numArr.push(1);
			$.cookie("sidArr",sidArr,{expires:30});
			$.cookie("numArr",numArr,{expires:30});
			fnClone(sid,1);
			$(".cat_good:visible:last").find(".check_btn").prop("checked",true);
		}
	});
	//5.点击删除按钮
	$(".has").on("click",".cat_good_operation_btn",function(){
		if(confirm('你确定要删除吗？')){
			let sid = $(this).parents(".cat_good").find("img").attr("sid");
			let index = sidArr.indexOf(sid);
			sidArr.splice(index,1);
			numArr.splice(index,1);
			setCookie();
			$(this).parents(".cat_good").remove();
		}
	});
	
	//5.点击全选事件
	$(".has").on("change",".checkall_inp",function(){
		$(".has input:checkbox:visible").prop("checked",$(this).prop("checked"));
		allcount();
	});
	
	//6.点击商品复选框事件
	$(".has").on("change",".check_btn",function(){
		let check = [...$(".has .check_btn:visible")].every(function(ele,index,arr){
			return $(ele).prop("checked");
		});
		$(".checkall_inp").each(function(index,ele){
			$(ele).prop("checked",check)
		})
		allcount();
	});
	
	
	//7.改变商品数量的事件
	$(".has").on("input", ".cat_good_num_inp",function(){
		fnInput(this);
	});
	
	//8.点击加按钮改变商品数量
	$(".has").on("click",".cat_good_num_btnr",function(){
		numBtn(1,this);
	});
	
	//点击减按钮
	$(".has").on("click",".cat_good_num_btnl",function(){
		numBtn(-1,this);
	});
	
	
	
	
	
	
	
	
	
	
	
	//方法1、cookie数组化;
	function cookieToArr(){
		sidArr = $.cookie("sidArr").split(",");
		numArr = $.cookie("numArr").split(",");
	};
	function setCookie(){
		$.cookie("sidArr",sidArr.toString(),{expires:30});
		$.cookie("numArr",numArr.toString(),{expires:30});
	};
	//方法2、根据cookie初始化购物车
	function createGoods(){
		$.ajax(
			{url:"php/goods.php"}
		).then(function(d){
			goodsData = JSON.parse(d);
			sidArr.map((sid,index)=>{
				goodsData.map((msg)=>{
					if(sid==msg.sid){
						let $clone=$(".cat_good:hidden").clone(true);
						$clone.css("display","block");
						$clone.find(".cat_good_msg img").prop("src",msg.src).attr("sid",sid);
						$clone.find(".cat_good_msg_tit span").html(msg.tit);
						$clone.find(".cat_good_price span").html(msg.price);
						$clone.find(".cat_good_num_inp").val(numArr[index]);
						$(".cat_goods_list").append($clone);
						allcount();//计算
					}
				});
			});
		});
	};
	//方法3、克隆添加
	function fnClone(sid,num){
		goodsData.map((msg)=>{
			if(sid==msg.sid){
				let $clone=$(".cat_good:hidden").clone(true);
				$clone.css("display","block");
				$clone.find(".cat_good_msg img").prop("src",msg.src).attr("sid",sid);
				$clone.find(".cat_good_msg_tit span").html(msg.tit);
				$clone.find(".cat_good_price span").html(msg.price);
				$clone.find(".cat_good_num_inp").val(num);
				$(".cat_goods_list").append($clone);
				allcount();//计算
			};
		});
	}
	//方法4、计算单品价格
	function count(){
		$(".cat_good_count span").each(function(index,ele){
			let price = +$(this).parents(".cat_good").find(".cat_good_price span").html();
			let num = +$(this).parents(".cat_good").find(".cat_good_num_inp").val();
			let result = (price*num).toFixed(2);
			$(this).html(result);
		});
	};
	//方法5、计算总数
	function countAllNum(){
		let num = 0;
		let $list = $(".cat_good_num_inp:visible");
		if($list.length==1){
			num = $list.val();
		} else if($list.length>1){
			$list.each((index,ele)=>{
				num += +$(ele).val();
			});
		}
		$allNum.html(num);
	};
	//方法6、计算选中数与总价
	function countCheckPrice(){
		let num = 0;
		let price = 0;
		let $list = $(".check_btn:visible:checked");
		if($list.length==1){
			num = $list.parents(".cat_good").find(".cat_good_num_inp").val();
			price = +$list.parents(".cat_good").find(".cat_good_count span").html()
		} else if($list.length>1){
			$list.each((index,ele)=>{
				num += +$(ele).parents(".cat_good").find(".cat_good_num_inp").val();
				price += +$(ele).parents(".cat_good").find(".cat_good_count span").html();
			});
		}
		$checkNum.html(num);
		$allprice.html(price.toFixed(2));
	};
	
	//方法7、所有计算一遍
	function allcount(){
		count();
		countAllNum();
		countCheckPrice()
	};
	
	//方法8、单品数量改变时触发的函数
	function fnInput(ele){
		let sid = $(ele).parents(".cat_good").find(".cat_good_msg img").attr("sid");
		let index = sidArr.indexOf(sid);
		if(+$(ele).val()>=99){
			$(ele).val("99");
		}else if (+$(ele).val()<=1){
			$(ele).val("1");
		}
		numArr[index]=$(ele).val();
		$.cookie("numArr",numArr,{expires:30});
		allcount();
	}
	
	//方法9、点击加减按钮的函数
	function numBtn(n,ele){
		let num = +$(ele).siblings(".cat_good_num_inp").val();
		$(ele).siblings(".cat_good_num_inp").val(num+n);
		//调用单品数量改变时触发的函数
		fnInput($(ele).siblings(".cat_good_num_inp"));
	};