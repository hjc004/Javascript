<?php 

$username = isset($_POST['username'])?$_POST["username"]:"";
$password = isset($_POST['password'])?$_POST["password"]:"";

if(empty($_POST['username'])||empty($_POST['password']))
{
    exit('请输入用户名和密码');
}
else
{
    if($_POST['username']=='admin'||$_POST['password']=='123456'){
        echo '登陆成功';
    }
    else
    {
        exit('用户名和密码错误');
    }
}

?>
