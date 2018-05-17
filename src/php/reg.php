<?php
	header('content-type:text/html;charset=utf-8');	//utf8编码
	
	//1.连接数据库，设置主机，用户名，密码(无密码不用填)
	$conn=@mysql_connect('localhost','root');
	if(!$conn){
		die('数据库连接失败：'.mysql_error());
	}
	
	//2.选择数据库,设置字符集
	mysql_select_db('yhd');
	mysql_query('SET NAMES UTF8');
	
	
	//验证用户名是否存在，存在获取，不存在，退出顺便输出非法操作
	if(isset($_POST['username'])||isset($_POST['submit'])){//满足失去焦点和点击注册按钮都走上面
		$username=@$_POST['username'];//获取姓名，反馈给前端用户名是否存在
	}else{
		exit('非法操作');//阻止直接对验证页面进行预览
	}
	
	//和数据库进行匹配
	$result=mysql_query("select * from user where username='$username'");
	
	//返回结果
	if(mysql_fetch_array($result)){//找到内容，有重复
		echo "yes";//有重复
	}else{
		echo "no";//没有重复
	}
	

	//获取前端的数据，传递到数据库里面。
	if(isset($_POST['submit'])){
		$user=$_POST['username'];
		$pass=md5($_POST['password']);
		$num=$_POST['num'];
		//将接受的值放入数据库
	   mysql_query("insert user value(null,'$user','$pass','$num')");
	   header('location:../index.html');
	}
?>