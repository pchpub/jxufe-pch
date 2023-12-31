var _clickid = "apps";  // 当前点击的导航图标ID,初始定位在应用apps
jQuery(document).ready(function() {
	jQuery(".nav_menu ul li").click(function(){
		var className = jQuery(this).attr("class");
		if (className != "nobg"){
			jQuery("#nav ul li").removeClass("nav_bg");
			jQuery(this).addClass("nav_bg");
		}
		
		// 增加点击事件
		var id = jQuery(this).attr("id");
		if(id!="exit")
		{
			showPage(id);
		}
	})
	
	jQuery(".nav_menu ul li").mouseover(function(){				
		jQuery(this).css("cursor","pointer");
	}).mouseout(function(){
		jQuery(this).css("cursor","default");
	})

	jQuery(".nav_menu ul > li > img").mouseover(function(){		
		jQuery(this).css("cursor","pointer");		
		var pid = jQuery(this).parent().attr("id");
		jQuery(this).attr("src","img/nav/"+pid+"2.png");
		if(pid=="fullScreen"){
		    // 全屏
            j$(document).fullScreen(true);
		}
	}).mouseout(function(){
		var thisid = jQuery(this).parent().attr("id");
		if (thisid != _clickid){
			jQuery(this).css("cursor","default");
			var pid = jQuery(this).parent().attr("id");
			jQuery(this).attr("src","img/nav/"+pid+".png");
		}
		if(thisid=="fullScreen"){
		    // 退出全屏
            j$(document).fullScreen(false); 
		}
	})

	// 导航图标点击时，先全部设为原始白色图标，再将当前设为“红色”图标
	jQuery(".nav_menu ul > li > img").click(function(){		
		var thisid = jQuery(this).parent().attr("id");
		var $imgs = jQuery(".nav_menu ul > li > img").not("#"+thisid);
		$imgs.each(function(){
			var pid = jQuery(this).parent().attr("id");
			jQuery(this).attr("src","img/nav/"+pid+".png");
		})
		jQuery(this).attr("src","img/nav/"+thisid+"2.png");
		_clickid = thisid ;
	})	
	
	jQuery("#help").live("click",function(){
		showHelpCenter();
	});

	jQuery(".searchBtn").click(function(){
		showPage("search");
	});
	
	jQuery("#key").keyup(function(event){
	  if(event.keyCode ==13){
	    showPage("search");
	  }
	});	

	// 当前用户弹出用户信息
	jQuery("#divUser").click(function(){
		showUserinfo();
	})

	//var tipsbg = jQuery(".searchBtn").css("background-color");
	var tipsbg ='tomato';
	
	// title提示美化 background: 'tomato' '#FAA358'
	jQuery(".nav_menu ul li img")
		.tipso({
			useTitle  : true,
			background: tipsbg,
	      	color     : '#ffffff',
	      	position  : 'left',
	      	offsetY   : -5,	      	
	      	width     : 120
		});
	
	jQuery("#divUser,#divDate")
		.tipso({
			useTitle  : true,
			background: tipsbg,
	      	color     : '#ffffff',
	      	position  : 'top',
	      	offsetY   : -5,
	      	width     : 120
		});
		

	// 当前选择项定位
	//jQuery("#nav ul li").removeClass("nav_bg");
	//jQuery("#apps").parent().addClass("nav_bg");
	jQuery("#apps>img").attr("src","img/nav/apps2.png");
	
	jQuery("#key").focus();
	
})

function showPage(str) {
    // 获取Iframe对象(IE,FF下适用写法:document.getElementById(frmName).contentWindow.document)
    var frmbody = parent.document.getElementById("frmbody").contentWindow.document ;
    var frmTool = frmbody.getElementById("frmTool").contentWindow.document ;
    var frmDesk = frmbody.getElementById("frmDesk").contentWindow.document ;
    // 清除导航区的导航信息
    frmTool.getElementById("banner_direction").innerHTML = "&nbsp;"; 
    frmTool.getElementById("banner_attention").innerHTML = "&nbsp;"; 
    //将当前操作的菜单id写到Main_index.jsp中的menucode_current隐藏input中
    jQuery("#menucode_current", frmbody).val("");
    jQuery("#frmdesk_src", frmbody).val("");
    jQuery("#frmTool_info", frmbody).css("display","none");
    jQuery("#frmDesk", frmbody).attr("scrolling","auto");
    //alert(jQuery("#frmDesk", frmbody).attr("scrolling"));
    
    switch(str) {
    	case "home":
    		// 跳转到桌面页面
			if (userType == "STU") { // STU: 用户类型为学生
	    		//frmDesk.location.replace(_contextPath+"/frame/DeskStu.jsp");
	    		//frmDesk.location.replace(_contextPath+"/frame14/Desk.v14.jsp");  
	    		frmDesk.location.replace(_contextPath+"/frame14/DeskStu.v14.jsp");  
			} else {
	    		//frmDesk.location.replace(_contextPath+"/frame14/Desk.v14.jsp");  
	    		frmDesk.location.replace(_contextPath+"/frame14/DeskStu.v14.jsp");  
			}			    		
            break;
        case "theme":
            // 跳转到自定义主题风格页面
            frmDesk.location.replace(_contextPath+"/theme/themeservlet?p=getThemePage");
            //frmDesk.location.replace(_contextPath+"/theme/themeservlet?p=getThemePage4Panel");
            break;
        case "message":
            // 跳转到在线消息页面
			if (userType == "STU" || teaFsMessage!="1") { 
				// STU: 用户类型为学生查看消息
	            frmDesk.location.replace(_contextPath+"/common/popmsg/popmsg.getReceiveLog.jsp");			            
            } else {
            	//frmDesk.location.replace(_contextPath+"/common/popmsg/popmsg.sendOnlineMessage.jsp");
	            //frmDesk.location.replace(_contextPath+"/common/popmsg/onlinemessage.html");			            
	            frmDesk.location.replace(_contextPath+"/common/popmsg/onlinemessage.jsp");			            
            }
            break;
        case "spMessage":
            // 跳转到手机短信页面
            frmDesk.location.replace(_contextPath+"/common/spmsg/spmsg.sendSpMessage.jsp");
            break;
        case "email":
            // 跳转到电子邮件页面
            frmDesk.location.replace(_contextPath+"/common/email/email.sendEmail.jsp");
            break;
        case "help":
			showHelpCenter(); // 显示帮助中心
            break;
        case "exit":
			LogExit(this);  //  退出系统
            break;
        case "modifyPassword":
            // 跳转到修改密码页面
            frmDesk.location.replace(_contextPath+"/frame/desk/showUserModifyPassword.action");
            doModifyPassword();
            break;
       case "userDefined":
       		frmDesk.location.replace(_contextPath+"/common/userDefined/userDefined.yhzdygn.jsp");
       		break;
       case "mywork":
       		// 个人事务
		    jQuery("#frmTool_info",frmbody).css("display","");
			if (userType == "STU") { 
				// STU: 用户类型为学生
	    		frmDesk.location.replace(_contextPath+"/frame14/menus/JW93.jsp");
	    	} else {
       			frmDesk.location.replace(_contextPath+"/frame14/menus/JW92.jsp");
       		}
       		break;
       case "apps":
       		// 我的应用
		    jQuery("#frmTool_info",frmbody).css("display","none");
       		frmDesk.location.replace(_contextPath+"/frame14/menu/myapps.jsp");
       		break;
       case "schedule":
       		// 日程
			jQuery("#frmDesk", frmbody).attr("scrolling","no");       		
		    jQuery("#frmTool_info",frmbody).css("display","");
       		frmDesk.location.replace(_contextPath+"/frame/desk/showLessonSchedule4User.action");
       		break;
       case "notice":
       		// 通知公告
		    jQuery("#frmTool_info",frmbody).css("display","");
       		frmDesk.location.replace(_contextPath+"/cms/SchoolNotice.jsp");
       		break;
       case "document":
       		// 文档 
		    jQuery("#frmTool_info",frmbody).css("display","");
       		frmDesk.location.replace(_contextPath+"/docmanager/showFileInfos.action");
       		break;
       case "search":
       		// 搜索：传入输入值并查询
			var url = _contextPath+"/common/userDefined/user.function.jsp?key="+toUTF8(jQuery("#key").val());
			frmDesk.location.replace(url);	
			jQuery('#key', frmDesk).val($("#key").val()); 	
			jQuery('#btnQry', frmDesk).triggerHandler("click"); 
       		break;
       case "funsearch":
       		// 搜索：传入输入值并查询
			var url = _contextPath+"/common/userDefined/user.funsearch.jsp?key=";
			frmDesk.location.replace(url);	
			//jQuery('#key', frmDesk).val($("#key").val()); 	
			//jQuery('#btnQry', frmDesk).triggerHandler("click"); 
       		break;
    }
}	    


/**
 * 将字符串转化为UTF8的字符编码 
 * （前端做2次转码，后端做1次转码）
 */
function toUTF8(initValue) {
	if (initValue == null || initValue.length == 0) {
		return initValue;
	} else {
		return encodeURIComponent(encodeURIComponent(initValue));
	}
}

// 帮助中心
function showHelpCenter(){
    // 当前操作的菜单和访问路径
    var frmbody = parent.document.getElementById("frmbody").contentWindow.document ;
    var menucode_current = jQuery("#menucode_current", frmbody).val();
    var frmdesk_src = jQuery("#frmdesk_src", frmbody).val();
    //alert("menucode_current/pageUrl= " + menucode_current+"/"+frmdesk_src);
    var help = _contextPath+"/help/index.html";
    window.open(help);
}

// 打开帮助文档(保存文件位于../uploads/help.chm)
function doHelp(){
	var show_filename = encodeURI(encodeURI("青果教务系统应用培训教程.chm"));
	var url = _contextPath+"/docmanager/fileDownload.action?name="+show_filename+"&fileSavePath=help.chm";
	window.location.target  = "_download";
	window.location.href  = url;
}
  
function LogExit(theObj) {
    try{
		var vM = theObj.getAttribute("alt");
		
		if(vM == "exit") {//退出
			if(!confirm('是否退出当前系统？')) {
			    return false;
			}
			window.top.close();
		} else {//注销
			if(confirm('是否退出当前系统？')) {
			//if(confirm('是否注销登录？')) {
				window.top.location.href=_contextPath+"/DoLogoutServlet";
			}
		}	
	} catch(e) {}
}

// 计算数据库服务器与客户端的时间差
var clienttime = new Date().getTime();
var difftime = dbtime-clienttime ; 

function showTimes(){

	//获取当前日期
	var now = new Date(new Date().getTime() + difftime);
	//var time = now.getTime();    //获取当前时间(从1970.1.1开始的毫秒数)
		 
 	//定义星期
	var week;
	switch (now.getDay()){
		case 1: week="星期一"; break;
		case 2: week="星期二"; break;
		case 3: week="星期三"; break;
		case 4: week="星期四"; break;
		case 5: week="星期五"; break;
		case 6: week="星期六"; break;
		default:week="星期天"; break;
	}

	var year = now.getFullYear();

	//月日时分秒判断,小于10，前面补0
	var month = now.getMonth()+1;
	if(month<10){
		month="0"+month;
	}

	var day = now.getDate();
   	if(day<10){
  		day="0"+day;
   	}

	var hours =now.getHours();
	if(hours<10){
		hours="0"+hours;
	}

	var minutes =now.getMinutes();
	if(minutes<10){
    	minutes="0"+minutes;
	}

	var seconds=now.getSeconds();
  	if(seconds<10){
    	seconds="0"+seconds;
	}

	//拼接年月日时分秒
	//var date_str = year+"年"+month+"月"+day+"日 "+hours+":"+minutes+":"+seconds+" "+week;
	var date_str = year+"-"+month+"-"+day+"&ensp;"+hours+":"+minutes+":"+seconds+"&ensp;"+week;

 	//显示在id为showtimes的容器里
	document.getElementById("divDate").innerHTML= date_str;
}

//设置1秒调用一次showTimes函数，第一次是立即执行
showTimes();
//设置1秒调用一次showTimes函数
setInterval("showTimes()",1000);

// 弹窗显示用户信息
function showUserinfo1() {
	var url = _contextPath+"/frame/desk/showUserInfo.action";
	var obj = new Object(); 
	var result = window.showModalDialog(url, obj, "dialogWidth=780px;dialogHeight=565px;status=no;help=no;scroll=no;minimize:no;maximize:yes;");
}

// 弹窗显示用户信息（谷歌浏览器不支持showModalDialog）
function showUserinfo() {
	var url = _contextPath+"/frame/desk/showUserInfo.action";
	var maxWidth="960"; //screen.availWidth;
	var maxHeight="605"; //screen.availHeight;
	myShowModalDialog(url, maxWidth, maxHeight, function (result) {
		if (result != null) {
			//var flag = result.flag;
		}
	});	
}
 
function myShowModalDialog(url, width, height, fn) {
    if (navigator.userAgent.indexOf("Chrome") > 0) {
        window.returnCallBackValue354865588 = fn;
        var paramsChrome = 'height=' + height + ', width=' + width + ', top=' + (((window.screen.height - height) / 2) - 50) +
            ',left=' + ((window.screen.width - width) / 2) + ',toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no';
		//alert("paramsChrome="+paramsChrome);                   
        window.open(url, "newwindow", paramsChrome);
    }
    else {
        var params = 'dialogWidth:' + width + 'px;dialogHeight:' + height + 'px;status:no;dialogLeft:'
                    + ((window.screen.width - width) / 2) + 'px;dialogTop:' + (((window.screen.height - height) / 2) - 50) + 'px;'
                    + "location=no;status=no;help=no;scroll=no;minimize:no;maximize:no;";
		//alert("params="+params);                   
        var tempReturnValue = window.showModalDialog(url, "", params);
        fn.call(window, tempReturnValue);
    }
}
function myReturnValue(value) {
    if (navigator.userAgent.indexOf("Chrome") > 0) {
        window.opener.returnCallBackValue354865588.call(window.opener, value);
    }
    else {
        window.returnValue = value;
    }
}