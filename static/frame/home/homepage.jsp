











<!DOCTYPE html>
<html>
<head>
	<title>平台首页</title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">
	<meta http-equiv="keywords" content="青果软件,智慧校园,教学管理,教务系统">
	<meta http-equiv="description" content="教学管理服务平台">

	<link rel="stylesheet" type="text/css" media="screen" href="../../custom/bootstrap/css/bootstrap.min.css"/>
	<link rel="stylesheet" type="text/css" media="screen" href="../../custom/font-awesome/css/font-awesome.min.css"/>
	<link rel="stylesheet" type="text/css" media="screen" href="css/homepage.css?v=1.02"/>

</head>

<body class="homepage-body" style="background-color: #F5F5F5;">

<div class="container-fluid">

	<div class="row">
		<div class="col-xs-12">
			<div class="desk_content" id="desk_workprocessing" style="display: none;">
				loading...
			</div>
		</div>
	</div>

	<div class="row">
		<div class="col-xs-4" id="rw_todoing">
			<div class="div_wapper div_top" id="div_toding1">
				<ul id="myTodoingTab" class="nav nav-tabs">
					<li class="active">
						<a href="#desk_todoing" onclick="loadingWdsqNotice();" data-toggle="tab">申办事项</a>
					</li>
					<span class="more" id="mt_sbsx" style="float:right; padding-top: 8px;"><i class="fa fa-bars"></i></span>
				</ul>
				<div class="myTodoingTabContent" class="tab-content">
					<div class="tab-pane fade in active content" id="desk_todoing">
					</div>
				</div>
			</div>
		</div>
		<div class="col-xs-4" id="rw_dblc1">
			<div class="div_wapper div_top" id="div_toding2">
				<ul id="myTodoingTab" class="nav nav-tabs">
					<li id="li_dblc1" class="active">
						<a href="#desk_dblc1" onclick="loadingDblcNotice();" data-toggle="tab">待办事项</a>
					</li>
					<span class="more" id="mt_spywlc" style="float:right; padding-top: 8px;"><i class="fa fa-bars"></i></span>
				</ul>
				<div class="myTodoingTabContent" class="tab-content">
					<div class="tab-pane fade in active content" id="desk_dblc1">
					</div>
				</div>
			</div>
		</div>
		<div class="col-xs-4" id="rw_finished">
			<div class="div_wapper div_top" id="div_toding3">
				<ul id="myTodoingTab" class="nav nav-tabs">
					<li id="li_dblc2" class="active">
						<a href="#desk_finished" onclick="loadingZblcNotice();" data-toggle="tab">已办事项</a>
					</li>
					<span class="more" id="mt_ybsx" style="float:right; padding-top: 8px;"><i class="fa fa-bars"></i></span>
				</ul>
				<div class="myTodoingTabContent" class="tab-content">
					<div class="tab-pane fade in active content" id="desk_finished">
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="row">
		<div class="col-xs-8">
			<div class="div_wapper" id="div_notice">
				<div class="div_header">
					<span class="span_title">通知公告</span>
					<span class="more" id="mt_schoolnotice"><i class="fa fa-bars"></i></span>
				</div>
				<div class="content" id="desk_notice">
				</div>
			</div>
		</div>
		<div class="col-xs-4">
			<div class="div_wapper" id="div_messages">
				<div class="div_header">
					<span class="span_title">消息提醒</span>
					<span class="more" id="mt_messages"><i class="fa fa-bars"></i></span>
				</div>
				<div class="content" id="desk_messages">
				</div>
			</div>
		</div>
	</div>

	<div class="row">
		<div class="col-xs-8">
			<div class="div_wapper" id="div_lessonschedule">
				<div class="div_header">
  						<span class="span_title">教学安排<small id="desk_lessonschedule_jxz" style="display: none;"></small>
  						<select id="xnxq" name="xnxq" style="width: 168px; font-size: 12px;" onchange="showMyxnxqkb();"></select>
  						<img src="../../frame14/img/nav_left.png" id="prejxz" title="上一周"></img>
  						<select id="jxz" name="jxz" style="width: 45px; font-size: 12px;" onchange="showMyjxzkb();">
  							<option value="1">1</option>
  							<option value="2">2</option>
  							<option value="3">3</option>
  							<option value="4">4</option>
  							<option value="5">5</option>
  							<option value="6">6</option>
  							<option value="7">7</option>
  							<option value="8">8</option>
  							<option value="9">9</option>
  							<option value="10">10</option>
  							<option value="11">11</option>
  							<option value="12">12</option>
  							<option value="13">13</option>
  							<option value="14">14</option>
  							<option value="15">15</option>
  							<option value="16">16</option>
  							<option value="17">17</option>
  							<option value="18">18</option>
  							<option value="19">19</option>
  							<option value="20">20</option>
  							<option value="21">21</option>
  							<option value="22">22</option>
  							<option value="23">23</option>
  							<option value="24">24</option>
  							<option value="25">25</option>
  							<option value="26">26</option>
  							<option value="27">27</option>
  							<option value="28">28</option>
  							<option value="29">29</option>
  							<option value="30">30</option>
  						</select>
  						<img src="../../frame14/img/nav_right.png" id="nextjxz" title="下一周"></img>
  						</span>
					<span class="more"><span id="byterm">学期课表</span>&ensp;&ensp;<span id="byweek">周课表</span> <i id="mt_lessonschedule" class="fa fa-bars"></i></span>
				</div>
				<div class="content" id="desk_lessonschedule">
				</div>
			</div>
		</div>

		<div class="col-xs-4">

			<div class="col-xs-12" style="padding: 0px 0px;">
				<div class="div_wapper" id="div_docdownload">
					<div class="div_header">
						<span class="span_title">文档下载</span>
						<span class="more" id="mt_docdownload"><i class="fa fa-bars"></i></span>
					</div>
					<div class="content" id="desk_docdownload">
					</div>
				</div>
			</div>
			<div class="col-xs-12"  style="padding: 0px 0px;">
				<div class="div_wapper" id="div_xiqueer">
					<div class="div_header">
						<span class="span_title">掌上校园</span>
						<span class="more" id="mt_xiqueer">
	  							<a href='http://www.xiqueer.com/' target="_blank"><img src="./img/xiqeer-title.png"></img>&ensp;&ensp;</a>
	  						</span>
					</div>
					<div id="desk_xiqueer" class="content" style="text-align:center;">
						<img style="height:115px;width:115px; margin-right:20px;"  src="./img/android.png">
						<img style="height:115px;width:115px;"  src="./img/IOS.png">
						<div>Android&ensp;&ensp;扫码下载<a style="color:blue;font-size:12px;" href='http://www.xiqueer.com/' target="_blank">喜鹊儿</a>APP&ensp;&ensp;iOS</div>
					</div>
				</div>
			</div>

		</div>

	</div>

	<div class="row" style="display: none;">
		<div class="col-xs-7">
			<div class="div_wapper" id="div_normalusemenu">
				<ul id="myServiceTab" class="nav nav-tabs">
					<li class="active"><a href="#desk_recentlyusemenu" data-toggle="tab">最近使用</a></li>
					<li style="display:none;"><a href="#desk_recommend" data-toggle="tab">推荐服务</a></li>
					<span class="more" id="mt_myservice" style="float:right;"><i class="fa fa-bars"></i></span>
				</ul>
				<div id="myServiceTabContent" class="tab-content">
					<div class="tab-pane fade in active content" id="desk_recentlyusemenu">
					</div>
					<div class="tab-pane fade content" id="desk_recommend">
					</div>
				</div>
			</div>
		</div>
		<div class="col-xs-5">
			<div class="div_wapper" id="div_normalusemenu">
				<ul id="myServiceTab" class="nav nav-tabs">
					<li class="active">
						<a href="#desk_normalusemenu" data-toggle="tab">我的关注</a>
					</li>
					<span class="more" id="mt_myservice" style="float:right;"><i class="fa fa-bars"></i></span>
				</ul>
				<div id="myServiceTabContent" class="tab-content">
					<div class="tab-pane fade in active content" id="desk_normalusemenu">
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

</div>

<script type="text/javascript" src="../../custom/js/SetRootPath.jsp"></script>
<script type="text/javascript" src="../../custom/js/jquery-1.12.3.min.js"></script>
<script type="text/javascript" src="../../custom/bootstrap/js/bootstrap.min.js"></script>
<script type="text/javascript" src="../../custom/js/jkingo.noprint.js"></script>
<script type="text/javascript" src="../../custom/js/jwutil.js"></script>

<script type="text/javascript">

    var dqxn = "2023";
    var dqxq = "0";
    var dqjxz = "17";
    var usertype = "STU";
    var kfflag="0";

    // 新疆大学 缺省显示学期课表；否则显示周课表
    var schoolcode = G_SCHOOL_CODE;
    var kbmethod = "byweek";   // 周课表
    if (schoolcode == "10755"){
        kbmethod = "byterm";  // 学期课表
    } else {
        kbmethod = "byweek";  // 周课表
    }
    if(schoolcode=="14266" || schoolcode=="13973" || schoolcode=="13508"){//广州华商职业学院、厦门城市职业学院、郑州经贸学院
        jQuery("#div_docdownload").css("height","450px");
        jQuery("#div_xiqueer").css("display","none");
    }
    changeKbmethod(kbmethod);

    function changeKbmethod(kbmethod){
        if (kbmethod == "byterm"){
            kbmethod = "byterm";  // 学期课表
            jQuery("#byweek").css("color","#666666");
            jQuery("#byterm").css("color","#358AE2");
            jQuery("#prejxz,#jxz,#nextjxz").css("display","none");  // 隐藏周次选择
        } else {
            kbmethod = "byweek";  // 周课表
            jQuery("#byweek").css("color","#358AE2");
            jQuery("#byterm").css("color","#666666");
            jQuery("#prejxz,#jxz,#nextjxz").css("display","");
        }
    }

</script>

<script type="text/javascript" src="js/homepage.js?v=61887170399036498197109"></script>
</body>
</html>
