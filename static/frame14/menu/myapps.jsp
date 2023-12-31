




<!DOCTYPE html>
<html lang="zh-cn">
<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	    <meta name="viewport" content="width=device-width, initial-scale=1.0">
	    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
		<meta http-equiv="Pragma" content="no-cache">
		<meta http-equiv="Cache-Control" content="no-cache">
		<meta http-equiv="Expires" content="0">	    
		<title>我的应用</title>
		<link rel="stylesheet" href="/custom/bootstrap/css/bootstrap.min.css" />
		<style>
			
			.appTitle{
				margin: 20px 40px 20px 40px;
				font-weight: bold;
				border-bottom: 1px solid #DDDDDD;
				padding-bottom: 10px;
				display: none;
			}			
			.con{

				margin-bottom: 10px;
				padding-bottom: 10px;
				border-bottom: 1px dotted #DDDDDD;
				height: 60px;
				text-align: left;
				
			}
			.conRight{
				margin-left: 40px;
			}
			.abg{
				width:32px;
				height:32px;
				display:block;
				margin-right:8px;
				float: left;
			}
			.con a{
				cursor: pointer;
				    margin-bottom: 4px;
				    font-family: "MicroSoft YaHei";
				    font-weight: bold;
				    color: #014cd2;
				    text-decoration: none;
			}
			.con a:hover{
				text-decoration: underline;
			}
			.con span {
			    font-family: arial,"Sim Sun";
			    font-size: 12px;
			    color: #666;
			}
			
			hr {
			    margin-top: 6px;
			    margin-bottom: 0px;
			    border: 0;
			    border-top: 0px solid #eee;
			}			
			
			.appContent{
				/**margin: 0 20px;*/
				margin: 30px 15px 10px 15px;  /*上右下左*/
				overflow: hidden;
			}			
			
		</style>
		
		<script type="text/javascript">
			var myapps = "" ;
		</script>
		
	</head>
	<body>
	
		<div class="container-fluid">
			<div class="row">
				<div class="appTitle">
	我的应用
				</div>
				<div class="appContent" id="content">
					<div class='col-md-3 col-sm-4 col-xs-6'><div class='con' id='482'><div><a class='abg' style='background:url(../img/app/jhpy.png) no-repeat left;'></a></div><div class='conRight'><a class='app'>课程认定</a><hr class=’br’/><span>课程认定</span></div></div></div><div class='col-md-3 col-sm-4 col-xs-6'><div class='con' id='S0'><div><a class='abg' style='background:url(../img/app/xsyy.png) no-repeat left;'></a></div><div class='conRight'><a class='app'>学生服务</a><hr class=’br’/><span>全流程学生个人事务</span></div></div></div>
				</div>
			</div>
		</div>
	</body>
	<script type='text/javascript' src='/custom/js/SetRootPath.jsp?random=57.0'></script>
	<!--<script type="text/javascript" src="/custom/js/SetRootPath.jsp"></script>-->	
	<script type="text/javascript" src="/custom/js/jquery.js"></script>
	<script type="text/javascript" src="/custom/js/jkingo.noprint.js"></script>
	<!--<script type="text/javascript" src="/frame14/menus/js/LeftPopMenu.js"></script>
	<script type="text/javascript" src="/frame14/menu/myapps.js"></script>-->	
	<script type='text/javascript' src='/frame14/menus/js/LeftPopMenu.js?random=41.0'></script>
	<script type='text/javascript' src='/frame14/menu/myapps.js?random=71.0'></script>
	<!--[if lt IE 9]>		
	  	<script type="text/javascript" src="/common/js/respond.min.js"></script>
  		<script type="text/javascript" src="/common/js/html5shiv.min.js"></script>
  	<![endif]-->     
	
	<script type="text/javascript">
		
		jQuery(document).ready(function() {
	// 主功能界面为自适应滚动条
			jQuery("#frmDesk", parent.document).attr("scrolling","auto");
		})
		
	</script>
	
</html>
