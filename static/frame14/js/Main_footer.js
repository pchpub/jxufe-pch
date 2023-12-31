jQuery(document).ready(function() {
	
	//jQuery("#div_footer").addClass("footer_theme"+theme);	
	//jQuery("#div_copyright").addClass("copyright_theme"+theme);	
	
	jQuery("#expand").click(function(){
		doExpand();
	})
	
	jQuery("#hideleft").click(function(){
		doHideleft();
	})
	if(isinit=="1"){
	   initOnlinemessage();
	}
	//setTimeout(function(){doExpand();},4800);
})
function myShowModalDialog(url, width, height, fn) {
	if (navigator.userAgent.indexOf("IE") <= 0) {
		    window.returnCallBackValue354865588 = fn;
		     var paramsChrome = 'height=' + height + ', width=' + width + ', top=' + (((window.screen.height - height) / 2) - 50) +
		            ',left=' + ((window.screen.width - width) / 2) + ',toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no';
		    window.open(url, "newwindow", paramsChrome);
    }
	else {
		    var params = 'dialogWidth:' + width + 'px;dialogHeight:' + height + 'px;status:no;dialogLeft:'
		                 + ((window.screen.width - width) / 2) + 'px;dialogTop:' + (((window.screen.height - height) / 2) - 50) + 'px;';
		   var tempReturnValue = window.showModalDialog(url, "", params);
		     fn.call(window, tempReturnValue);
	 }
}
// 初始化未查看的在线消息
function initOnlinemessage(){
	var url=_contextPath+"/online/message?hidOption=initOnlineMessage";
	var params="records=2";
	jQuery.ajax({
		type: "POST",
		url: url,
		data: params, 
		dataType: "text",
		async: true,
		success: doPostInit
	})
	
	function doPostInit(response){
		jQuery("#msg_content").html(response);
	}
}

function doExpand(){
	var footercss = jQuery("#div_footer").css("display");
	var $obj = jQuery("#expand");
	var name = $obj.html();
	//if ("︾"==name) { // 收起/展开
	if (footercss == "block") {
		jQuery("#div_footer").fadeOut(1000);
		//$obj.html("︽").attr({title:"展开扩展栏"});
		$obj.css({"background-image":"url('"+_contextPath+"/frame14/img/actor_up.png')"}).attr({title:"展开扩展栏"});
		parent.document.getElementById("mfrRows").rows="59,*,25";						
	} else {
		jQuery("#div_footer").fadeIn(1000);
		//$obj.html("︾").attr({title:"收起扩展栏"});
		$obj.css({"background-image":"url('"+_contextPath+"/frame14/img/actor_down.png')"}).attr({title:"收起扩展栏"});
		parent.document.getElementById("mfrRows").rows="59,*,140";						
	}
	// 如果能找到节点【desk_lessonschedule】，则重新加载我的课表
	var mykb = parent.frames["frmbody"].frames["frmDesk"].document.getElementById("desk_lessonschedule");
	if (mykb){
		//parent.frames["frmbody"].frames["frmDesk"].loadingLessonSchedule();
		parent.frames["frmbody"].frames["frmDesk"].showMyjxzkb();
	}
}

// 隐藏左边导航栏
function doHideleft(){
	var $thisObj = jQuery("#hideleft");
	var $navObj = jQuery("#menuArea",parent.frames["frmbody"].document);
	var navcss = $navObj.css("display");
	//if (navcss=="block"){
	if (navcss!="none"){
		$navObj.css("display","none");
		//$thisObj.html("》").attr({title:"显示侧边栏"});
		$thisObj.css({"background-image":"url('"+_contextPath+"/frame14/img/actor_right.png')"}).attr({title:"显示侧边栏"});
	} else {
		//$navObj.css("display","block");
		$navObj.css("display","");  // FF下css block存在问题
		//$thisObj.html("《").attr({title:"隐藏侧边栏"});
		$thisObj.css({"background-image":"url('"+_contextPath+"/frame14/img/actor_left.png')"}).attr({title:"隐藏侧边栏"});
	}
}

function showMessageTips(msgid, msg){
	//alert("msgid="+msgid+"/msg="+msg);
	var showmsg = "<a href='javascript:void(0)' onclick=\"viewMessageDetail14('"+msgid+"')\"><img src='"+_contextPath+"/images/news-nav.gif'></img>"+msg+"</a>";
	//if (typeof(reValue) != "undefined"){
	if(msg != ''){	
		jQuery("#msgid").val(msgid);
		jQuery("#msg_content").html(showmsg);
		jQuery("#popmsg").html("");
	}
	
	// 如果未展开，则展开消息显示区域
	var footercss = jQuery("#div_footer").css("display");
	var $obj = jQuery("#expand");
	var name = $obj.html();
	//if ("︾"==name) { // 展开
	if (footercss == "block") {
	} else {
		jQuery("#div_footer").fadeIn(1000);
		//$obj.html("︾").attr({title:"收起扩展栏"});
		$obj.css({"background-image":"url('"+_contextPath+"/frame14/img/actor_down.png')"}).attr({title:"收起扩展栏"});
		parent.document.getElementById("mfrRows").rows="59,*,140";						
	}				
	
}

// 个人信息
function showUseInfo1() {
	var url = _contextPath+"/frame/desk/showUserInfo.action";
	var obj = new Object(); 
	var result = window.showModalDialog(url, obj, "dialogWidth=780px;dialogHeight=565px;status=no;help=no;scroll=no;minimize:no;maximize:yes;");
}

// 弹窗显示用户信息（谷歌浏览器不支持showModalDialog）
function showUseInfo() {
	var url = _contextPath+"/frame/desk/showUserInfo.action";
	var maxWidth="960"; //screen.availWidth;
	var maxHeight="605"; //screen.availHeight;
	myShowModalDialog(url, maxWidth, maxHeight, function (result) {
		if (result != null) {
			//var flag = result.flag;
		}
	});	
}

// 设置学年学期
function setXnxq() {
	// ${kingo_copyright}
    var menucode=parent.frames["frmbody"].document.getElementById("menucode_current").value;
	var url = _contextPath+"/frame/Main_footer_setYearTerm.jsp?menucode=JW042101&fmenucode="+menucode;
	var obj = new Object();
	/*
	var result = window.showModalDialog(url, obj, "dialogWidth=270px;dialogHeight=135px;status=no;help=no;scroll=no");
	if(result != null) {
		if (result.flag == "saveOk")
			window.location.reload();
	} 
	*/
	var li_width = "270";
    var li_height = 135;
    //if(schoolcode=="11305") //蚌埠学院
	//{
		li_width = "410";
        li_height = 165;
	//}
	myShowModalDialog(url, li_width, li_height, function (result) {
		if (result != null) {
			if (result == "saveOk")
			    window.location.reload();
		}
	});				
}
	
// 常用功能
function doUserDefined() {
	parent.frames("frmbody").frames("frmDesk").location.replace(_contextPath+"/common/userDefined/userDefined.yhzdygn.jsp");
}
		
// 修改密码
function doModifyPassword1() {
	var url = _contextPath+"/frame/desk/showUserModifyPassword.action";
	var obj = new Object(); 
	var result = window.showModalDialog(url, obj, "dialogWidth=420px;dialogHeight=310px;status=no;help=no;scroll=no;toolbar=no;menubar=no;scrollbars=no;location=no");
}

// 弹窗显示修改密码（谷歌浏览器不支持showModalDialog）
function doModifyPassword() {
	var url = _contextPath+"/frame/desk/showUserModifyPassword.action";
	var maxWidth="450"; 
	var maxHeight="360";
    if(("12872"==schoolcode || "12764"==schoolcode || "14045"==schoolcode || "10842"==schoolcode || "14502"==schoolcode) && (usertype=="STU" || usertype=="TEA")) {//杭州职业技术学院、四川建筑职业技术学院、绵阳城市学院、三门峡职业技术学院、皖北卫生职业学院
        maxHeight=400;
    }
	myShowModalDialog(url, maxWidth, maxHeight, function (result) {
		if (result != null) {
			//var flag = result.flag;
		}
	});	
}