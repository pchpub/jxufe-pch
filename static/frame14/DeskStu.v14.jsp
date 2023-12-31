











<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>用户中心</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">
	<meta http-equiv="keywords" content="教学综合;青果软件">
	<meta http-equiv="description" content="This is my page">
	<link rel="stylesheet" type="text/css" media="screen" href="../custom/bootstrap/css/bootstrap.min.css"/>
	<link rel="stylesheet" type="text/css" media="screen" href="../custom/font-awesome/css/font-awesome.css"/>
	<style type="text/css">

		.col-xs-6{
			padding-right: 8px;
			padding-left: 8px;
		}
		.div_wapper{
			border:1px solid #CCCCCC;
			margin-top:15px;
		}
		.div_header{
			height:30px;
			line-height:30px;
			background:#F2F2F2;
			border-bottom:1px solid #CCCCCC;
			text-align: left;
		}
		.div_header p,.div_header span{
			font-weight:bold;
			margin:0;
			font-size:14px;
			padding-left:10px;
		}
		.div_header p i,.div_header span i{
			margin-right:5px;
		}
		.content{
			padding: 10px;
			/**margin-top: 10px;*/
			min-height: 240px;
			overflow:auto;
		}
		/**
        ul {
            margin: 0;
            padding: 0;
            list-style-type: none;
            max-width: 100%;
        }
        ul>li {
            min-height: 21px;
            margin-bottom: 5px;
            list-style: none;
            cursor: pointer;
        }
        ul>li:hover{
            color: #468DBB;
        }
        */
		.fa {
			margin-left: 10px;
			margin-right: 10px;
		}
		.more{
			float: right;
			padding-right: 15px;
		}
		#desk_workprocessing{
			min-height: 270px;
			padding-top: 30px;
		}

		#desk_lessonschedule td.kb-content {
			width: 11%;
			text-align: center;
			background-color: #FFFFFF!important;;
			cursor: default;
			border: 1px solid #E5E5E5!important;
		}
		#desk_lessonschedule thead .mykb td.kb-content{
			background-color: #FFFFFF!important;
		}

	</style>

</head>

<body>
<div class="container-fluid">

	<div class="row">
		<div class="desk_content" id="desk_workprocessing" style="display: none;">
			loading...
		</div>
	</div>
	<div class="row">
		<div class="col-xs-6">
			<div class="div_wapper">
				<div class="div_header">
					<span><i class="fa fa-bell-o" aria-hidden="true"></i>通知公告</span>
					<span class="more" id="mt_schoolnotice"><i class="fa fa-bars"></i></span>
				</div>
				<div class="content" id="desk_notice">
				</div>
			</div>
		</div>
		<div class="col-xs-6">
			<div class="div_wapper">
				<div class="div_header">
					<span><i class="fa fa-download" aria-hidden="true"></i>文档下载</span>
					<span class="more" id="mt_docdownload"><i class="fa fa-bars"></i></span>
				</div>
				<div class="content" id="desk_docdownload">
				</div>
			</div>
		</div>
	</div>
	<div class="row">
		<div class="col-xs-6">
			<div class="div_wapper">
				<div class="div_header">
  						<span><i class="fa fa-calendar" aria-hidden="true"></i>我的课表<small id="desk_lessonschedule_jxz" style="display: none;"></small>
  						<select id="xnxq" name="xnxq" style="width: 160px; font-size: 12px;" onchange="showMyxnxqkb();"></select>
  						<img src="./img/nav_left.png" id="prejxz" title="上一周"></img>
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
  						<img src="./img/nav_right.png" id="nextjxz" title="下一周"></img>
  						</span>
					<span class="more"><span id="byterm">按学期</span> <span id="byweek">按周</span> <i id="mt_lessonschedule" class="fa fa-bars"></i></span>
				</div>
				<div class="content" id="desk_lessonschedule">
				</div>
			</div>
		</div>
		<div class="col-xs-6">
			<div class="div_wapper">
				<!--
                <div class="div_header alert-warning">
                    <span><i class="fa fa-warning" aria-hidden="true"></i>调课信息</span>
                    <span class="more" id="mt_changelesson"><i class="fa fa-bars"></i></span>
                </div>
                <div class="content" id="desk_tkxx">
                </div>
                 -->
				<div class="div_header alert-warning">
					
					<span id="url_spywlc3"><i class="fa fa-warning" aria-hidden="true"></i>申办事项</span>
					
					<span class="more" id="mt_spywlc"><i class="fa fa-bars"></i></span>
				</div>
				<div class="content" id="desk_dblc0" style="display: none;">
					loading......
				</div>
				<div class="content" id="desk_dblc1" style="display: none;">
					loading......
				</div>
				<div class="content" id="desk_dblc3" >
					loading......
				</div>
			</div>
		</div>
	</div>
</div>


<script type="text/javascript" src="../custom/js/SetRootPath.jsp"></script>
<script type="text/javascript" src="../custom/js/jquery.js"></script>

<script type="text/javascript">
    var dqxn = "2023";
    var dqxq = "0";
    var dqjxz = "17";

    // 新疆大学 缺省显示学期课表；否则显示周课表
    var schoolcode = G_SCHOOL_CODE;
    var kbmethod = "byweek";   // 周课表
    if (schoolcode == "10755"){
        kbmethod = "byterm";  // 学期课表
    } else {
        kbmethod = "byweek";  // 周课表
    }
    changeKbmethod(kbmethod);

    function changeKbmethod(kbmethod){
        if (kbmethod == "byterm"){
            kbmethod = "byterm";  // 学期课表
            jQuery("#byweek").css("color","#666666");
            jQuery("#byterm").css("color","#0000FF");
            jQuery("#prejxz,#jxz,#nextjxz").css("display","none");  // 隐藏周次选择
        } else {
            kbmethod = "byweek";  // 周课表
            jQuery("#byweek").css("color","#0000FF");
            jQuery("#byterm").css("color","#666666");
            jQuery("#prejxz,#jxz,#nextjxz").css("display","");
        }
    }

</script>

<script type="text/javascript" src="../custom/js/jkingo.noprint.js?v=20387170399599805612236"></script>
<script type="text/javascript" src="../custom/js/jwutil.js?v=37159170399599805640564"></script>
<script type="text/javascript" src="../frame14/DeskStuInfo.js?v=65987170399599805613691"></script>

<!--[if lt IE 9]>
<script type="text/javascript" src="../common/js/respond.min.js"></script>
<script type="text/javascript" src="../common/js/html5shiv.min.js"></script>
<![endif]-->

</body>
</html>
