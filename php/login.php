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
	
	
	if(isset($_POST['name'])){//前端ajax传输过来的额
		$username=$_POST['name'];//获取用户名
		$password=md5($_POST['pass']);//获取密码
	}else{
		exit('非法操作');
	}
	
	//匹配用户名和密码是否同时相等
	$query="select * from user where username='$username' and password='$password'";
	$result=mysql_query($query);
	
	if(mysql_fetch_array($result)){
		echo "yes";//登陆成功
	}else{
		echo false;//登陆失败
	}
?>