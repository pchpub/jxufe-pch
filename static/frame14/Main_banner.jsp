<!DOCTYPE html>
<html>

<head>
	<title>Banner</title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<link rel="stylesheet" href="/custom/bootstrap/css/bootstrap.min.css" />
	<link rel="stylesheet" href="/custom/tipso/css/tipso.css" />
	<link rel="stylesheet" href="/frame14/css/Main_banner.css" type="text/css" />
	<link rel="stylesheet" href="/custom/css/blue/KingoCommon.css?v=47621170399019809089595" type="text/css" />

	<script type="text/javascript">
		var _contextPath = "";
		var userType = "STU";
		var teaFsMessage = "1";
		var isOnlyRkjs = "0";
		var isOnlyStu = "1";
		var dbtime = new Date().getTime();
	</script>

</head>

<body>

	<div class="container-fluid">
		<div class="banner_nav_Bottom">
			<div class="banner_logo">
				<img src="../frame/images/logo.png"></img>
				<span class="banner_titleName">教学管理服务平台</span>
			</div>
			<div class="pull-right nav_menu">
				<div class="row col-xs-12" style="height: 30px; float: right; margin-top: 5px;">
					<span class="currentTime" title="平台当前时间" id="divDate">loading ...... </span>
					<span class="currentUser" title="当前用户" id="divUser">
						江西财经大专&ensp;同学
					</span>
					<span class="systemversion-new" style="float: right; margin-left:30px; cursor: pointer;"
						onclick="parent.parent.window.location.replace('/frame/homes.html')">新版</span>
				</div>
				<div class="row" style="height: 30px;float: right;">
					<ul>
						<li id="home">
							<img src="img/nav/home.png" title="我的桌面"></img>
						</li>
						<li id="apps" class="nav_bg">
							<img src="img/nav/apps.png" title="我的应用"></img>
						</li>
						<li id="funsearch">
							<img src="img/nav/funsearch.png" title="功能搜索"></img>
						</li>
						<li id="schedule">
							<img src="img/nav/schedule.png" title="我的课表"></img>
						</li>
						<li id="notice">
							<img src="img/nav/notice.png" title="校内通知"></img>
						</li>
						<li id="document">
							<img src="img/nav/document.png" title="文档下载"></img>
						</li>
						<li id="message">
							<img src="img/nav/message.png" title="我的消息"></img>
						</li>
						<li id="theme">
							<img src="img/nav/theme.png" title="主题风格"></img>
						</li>
						<li id="fullScreen" class="nobg" style="display:none">
							<img src="img/nav/fullScreen.png" title="全屏"></img>
						</li>
						<li id="help" class="nobg">
							<img src="img/nav/help.png" title="平台帮助"></img>
						</li>
						<li id="exit" class="nobg" onclick="LogExit(this);">
							<img src="img/nav/exit.png" title="退出系统"></img>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>

	<input type="hidden" id="theme" name="theme" value="2">
	<input type="hidden" id="themename" name="themename" value="blue">
	<input type="hidden" id="contextPath" name="contextPath" value="">

</body>
<script type="text/javascript" src="/js/Themes.js"></script>
<script type="text/javascript" src="/custom/tipso/js/jquery-1.8.3.min.js"></script>
<script type="text/javascript" src="/custom/tipso/js/tipso.js"></script>
<script type="text/javascript" src="../custom/js/jkingo.js"></script>
<script type="text/javascript" src="/custom/js/jquery.fullscreen-min.js"></script>
<script type="text/javascript" src="/frame14/js/Main_banner.js"></script>
<!--[if lt IE 9]>		
	  	<script type="text/javascript" src="/common/js/respond.min.js"></script>
  		<script type="text/javascript" src="/common/js/html5shiv.min.js"></script>
  	<![endif]-->

</html>