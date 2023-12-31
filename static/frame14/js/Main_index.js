jQuery(document).ready(function() {
	
	//alert("isPasswordPolicy="+isPasswordPolicy);
	if ("0" == isPasswordPolicy) {
		doModifyPassword();
	}	
    else if ("1"==isAdmin && istop=="1") {
		// 如果是管理员,并且是本系统的访问来源,需要设置学年学期
		doSetYearTerm();
	}
    else if(_usertype=="STU" && G_SCHOOL_CODE=="10718"){//陕西师范大学
        doOpenXyyj();
    }

	// 初始化用户关注的服务
	loadingUserDefinedMenus("init");
    
	// 调整关注的服务的高度: 获取网页可见区域的宽度和高度
	var clientH = document.body.clientHeight;
	if (clientH>610){
		jQuery("#userDefinedArea").css("height","375px");
	}
	if (clientH<350){
		jQuery("#userDefinedArea").css("height","175px");
	}
	     		
	// 最近使用功能初始化
	kingo_list_normal_use_menuitem = new NormalUseMenuBeanList();
	kingo_list_normal_use_menuitem.init();

	// 即时消息*循环扫描(5*60*1000=300000 5分钟);
	if(isinitOnlineMessage=="1"){
	   window.setInterval("Scan_POPMsg('pop_im')",300000);
	}
	// 关注的服务[定制功能]				
	jQuery("#userDefined").click(function(){
	    // 清除导航区的导航信息
	    clearBannerDirection();
		// 加载定制服务页面
		loadingWorkarea(_webRootPath+"/common/userDefined/userDefined.yhzdygn.jsp");
	})
	
	// 关注的服务,最近使用功能(userNormalUse),通知公告,掌上校园鼠标事件		
	jQuery("#userDefined,#schoolNotice,#palmcampus").mouseover(function(){
		jQuery(this).css("cursor","pointer");
	}).mouseout(function(){
		jQuery(this).css("cursor","");
	})
	
	// 校内通知
	jQuery("#schoolNotice").click(function(){
	    // 清除导航区的导航信息
	    clearBannerDirection();
		// 加载定制服务页面
		loadingWorkarea(_webRootPath+"/cms/SchoolNotice.jsp");					
	})
	
	// 青果掌上校园
	jQuery("#palmcampus").click(function(){
		//window.open("http://www.palmcampus.com/","_blank");		
	    // 清除导航区的导航信息
	    clearBannerDirection();
		// 加载定制服务页面
		loadingWorkarea(_webRootPath+"/common/workflow/myaudit.detail.jsp");	
		//loadingWorkarea(_webRootPath+"/frame14/menu/myapps.user.jsp");
	})
	
	// 菜单数据初始化(延迟500秒加载菜单权限信息)
	setTimeout(
		function(){
			kingo_usermenubean = new UserMenuBean();
		}, 50) ;

	// 加载桌面 2018-11-20日调整
	//setTimeout(
	//	function(){			
		 	jQuery("#frmTool_info").css("display","none");
			//loadingWorkarea("${pageContext.request.contextPath}/frame14/Desk.v14.jsp");
			var _appurl = _webRootPath+"/frame14/menu/myapps.jsp?random="+Math.floor(Math.random()*100+1);
		 	loadingWorkarea(_appurl);
 	//	}, 1);
	
})

// 实践教学增加 ......begin......
var openBBS = false;
function myOnload(){
	
}
function getPara(name) {
	return publicIframeGetHrefParameterUnicode(name);
}
function myLoadMessage(iframeName){
	/**
	if(loadingObjs[0]){
		loadingObjs[0].close();
	}
	*/
}
// 实践教学增加 ......done......

/**
* 加载工作区内容	
* url      -- 要加载内容的URL
* frmname  -- Iframe的ID，为空值取ｆｒｍＤｅｓｋ
*/
function loadingWorkarea(url, frmname){
	if (!frmname){ frmname = "frmDesk"; }
	window.document.getElementById(frmname).contentWindow.location.replace(url);	
}
	
// 初始化用户关注的服务 				
function loadingUserDefinedMenus(operation){

    // 清除导航区的导航信息
    if (operation == "init"){
    	clearBannerDirection();
    }
    // 初始化用户关注的服务
	var url = _webRootPath+"/frame/menu/getUserDefinedMenus4Leftnav.action";				
	// var url = _webRootPath+"/frame/menu/getUserDefinedMenus.action";				
	// 依据屏幕分辨率显示关注的服务记录数
	//屏幕分辨率的高：window.screen.height 
	//屏幕分辨率的宽：window.screen.width 
	//网页可见区域宽：document.body.clientWidth 
	//网页可见区域高：document.body.clientHeight 
	var _height = window.screen.height ;
	var params = "records=6";  
	if (_height>=900 && _height<960){
		params = "records=10";
	}else if (_height>=960 && _height<1024){
		params = "records=12";
	} else if (_height>=1024){
		params = "records=14";
	} else if (_height<=720){
		params = "records=5";
	} else {
	    // >720 .. <900
		params = "records=6";
	}
	
	jQuery.ajax({
		type: "POST",
		url: url,
		data: params, 
		dataType: "text",
		success: setUDM
	})					
	
	function setUDM(response){
		jQuery("#menuArea2").html(response);
	}
}

// 初始化左侧栏通知公告 				
function loadingLeftSchooldNotice(){
    // 初始化用户关注的服务
	var url = _webRootPath+"/cms/stuSchoolNotice.action";
	var params = "";
	jQuery.ajax({
		type: "POST",
		url: url,
		data: params, 
		dataType: "text",
		success: setLeftSchooldNotice
	})					
	
	function setLeftSchooldNotice(response){
		jQuery("#school_notice_info").html(response);
	}
}

//  是否支持SVG
function isSVG() {
	var vgtype = window.SVGAngle || document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1") ? "SVG" : "VML";
	return vgtype == "SVG";
}
			
//显示对应地址的页面(用于关注的服务)
var LeftParentMenuName="";
var prefix = "&nbsp;&#20027;&#25511;&#30028;&#38754;";  //汉字[主控界面：]的unicode码
prefix = "<a href='javascript:void(0);' onclick=\"parent.showMain();\">"+prefix+"</a>";
function showMyPage(pageTitle,menucode,pageUrl,pmenuname,pmenucode,plinkfile){
    var frmDesk = window.document.getElementById("frmDesk").contentWindow.document ;
    var frmTool = window.document.getElementById("frmTool").contentWindow.document ;
	// 主区域显示点击的页面
	if (pageUrl.indexOf('menucode=')==-1){
        if (pageUrl.indexOf('?')==-1)
          pageUrl = pageUrl+"?menucode="+menucode;
        else
          pageUrl = pageUrl+"&menucode="+menucode;
    }
    
	// 是否支持SVG(矢量线的显示)
	var issvg = isSVG();
	if (issvg){
		//alert("issvg="+issvg);
		if (pageUrl.indexOf(menucode+".jsp")>-1 && pageUrl.indexOf("SVG"+menucode+".jsp")==-1){
			pageUrl = pageUrl.replace(menucode+".jsp", "SVG"+menucode+".jsp");
			//alert("pageUrl="+pageUrl);
		}
	}    
	frmDesk.location.replace("../"+pageUrl);
	
	// 当前操作导航提示信息			  
	var url="<a style=\"text-decoration : none;\" onclick=\"parent.showPage('"+pageTitle+"','"+menucode+"','.."+pageUrl+"')\" href=\"javascript:void(0)\" menucode='"+menucode+"'>"+pageTitle+"</a>";
	if(""!=plinkfile&&""!=pmenucode){
		url="<a style=\"text-decoration : none;\" onclick=\"parent.showPage('"+pmenuname+"','"+pmenucode+"','.."+plinkfile+"')\" href=\"javascript:void(0)\" menucode='"+pmenucode+"'>"+pmenuname+"</a>"+"\u2192"+url;
	}
    window.document.getElementById("frmTool_info").style.display = "";
    var banner_direction = frmTool.getElementById("banner_direction");
	banner_direction.innerHTML=prefix+"\u2192"+url;

    var url = _webRootPath + "/frame/menu/isMyservice.action";
    var params = "hidKey="+menucode;
    jQuery.ajax({
        type: "POST",
        url: url,
        data: params,
        dataType: "text",
        success: showMyservice
    })
	/*
    // 加关注,addMyservice方法位于Main_tools.jsp中
	var attention = "<img src='../frame14/img/nav/focus.png' title='&#20851;&#27880;' style='border:0px;'></img>"; //汉字[+关注]的unicode码
	var appraise = "<img src='../frame14/img/nav/appraise.png' title='\u8bc4\u4ef7' style='border:0px;width:20px;height:20px'></img>"; //汉字[+评价]的unicode码
    var banner_attention = frmTool.getElementById("banner_attention");
    var attinfo = "<span style='float:right' id='sp_define'><a  href='javascript:void(0);' onclick='addMyservice(\""+menucode+"\",\""+pageTitle+"\")'>"+attention+"</a>";
   	attinfo += "&ensp;&ensp;<a  href='javascript:void(0);' onclick='appraiseMyservice(\""+menucode+"\",\""+pageTitle+"\")'>"+appraise+"</a></span>";
    banner_attention.innerHTML = attinfo;
    */
}
function showMyservice(response) {
    var frmTool = window.document.getElementById("frmTool").contentWindow.document ;
    if(response!=""){
        var str=response.split("|");
        var menucode=str[0];
        var menuName=str[1];
        var isdefined=str[2];
        var isappraised=str[3];
        var attention ="",appraise="",attinfo="";
        attention = "<img src='../frame14/img/nav/appraise.png' title='&#20851;&#27880;' style='border:0px;width:20px;height:20px;margin-bottom:2px;'></img>"; //汉字[+关注]的unicode码
        appraise = "<img src='../frame14/img/nav/focus.png' title='\u8bc4\u4ef7' style='border:0px;width:20px;height:20px;margin-bottom:5px;'></img>"; //汉字[+评价]的unicode码
        // 加关注,addMyservice方法位于Main_tools.jsp中
        attinfo = "<span style='float:right' id='sp_define'><a id='a_define' href='javascript:void(0);' onclick='addMyservice(\""+menucode+"\",\""+menuName+"\")'>"+attention+"</a>";
        attinfo += "&ensp;&ensp;<a id='a_appraise' href='javascript:void(0);' onclick='appraiseMyservice(\""+menucode+"\",\""+menuName+"\")'>"+appraise+"</a></span>";
        if(isdefined=="1" && isappraised=="0"){
            attention = "<img src='../frame14/img/nav/appraised.png' title='&#21462;&#28040;&#20851;&#27880;' style='border:0px;width:20px;height:20px;margin-bottom:2px;'></img>";
            appraise = "<img src='../frame14/img/nav/focus.png' title='\u8bc4\u4ef7' style='border:0px;width:20px;height:20px;margin-bottom:5px;'></img>";
            attinfo = "<span style='float:right' id='sp_define'><a id='a_define' href='javascript:void(0);' onclick='delMyservice(\""+menucode+"\",\""+menuName+"\")'>"+attention+"</a>";
            attinfo += "&ensp;&ensp;<a id='a_appraise' href='javascript:void(0);' onclick='appraiseMyservice(\""+menucode+"\",\""+menuName+"\")'>"+appraise+"</a></span>";
        }
        else if(isdefined=="1" && isappraised=="1"){
            attention = "<img src='../frame14/img/nav/appraised.png' title='&#21462;&#28040;&#20851;&#27880;' style='border:0px;width:20px;height:20px;margin-bottom:2px;'></img>";
            appraise = "<img src='../frame14/img/nav/focused.png' title='&#26597;&#30475;&#35780;&#20215;' style='border:0px;width:20px;height:20px;margin-bottom:5px;'></img>";
            attinfo = "<span style='float:right' id='sp_define'><a id='a_define' href='javascript:void(0);' onclick='delMyservice(\""+menucode+"\",\""+menuName+"\")'>"+attention+"</a>";
            attinfo += "&ensp;&ensp;<a id='a_appraise' href='javascript:void(0);' onclick='appraiseMyservice(\""+menucode+"\",\""+menuName+"\")'>"+appraise+"</a></span>";
        }
        else if(isdefined=="0" && isappraised=="1"){
            attention = "<img src='../frame14/img/nav/appraise.png' title='&#20851;&#27880;' style='border:0px;width:20px;height:20px;margin-bottom:2px;'></img>";
            appraise = "<img src='../frame14/img/nav/focused.png' title='&#26597;&#30475;&#35780;&#20215;' style='border:0px;width:20px;height:20px;margin-bottom:5px;'></img>";
            attinfo = "<span style='float:right' id='sp_define'><a id='a_define' href='javascript:void(0);' onclick='addMyservice(\""+menucode+"\",\""+menuName+"\")'>"+attention+"</a>";
            attinfo += "&ensp;&ensp;<a id='a_appraise' href='javascript:void(0);' onclick='appraiseMyservice(\""+menucode+"\",\""+menuName+"\")'>"+appraise+"</a></span>";
        }
        var banner_attention = frmTool.getElementById("banner_attention");
        banner_attention.innerHTML = attinfo;
    }
}
// 主控界面:显示全部功能
function showMain(){
    var frmDesk = window.document.getElementById("frmDesk").contentWindow.document ;
    var frmTool = window.document.getElementById("frmTool").contentWindow.document ;
    var banner_direction = frmTool.getElementById("banner_direction");
    var banner_attention = frmTool.getElementById("banner_attention");
	banner_direction.innerHTML = prefix;
    banner_attention.innerHTML = "";
    
	// 隐藏[附加功能]
	var frmTool = document.getElementById("frmTool").contentWindow.document ;
	jQuery("#banner_plusmenu", frmTool).css("display","none");
			    
    jQuery("#frmTool_info").css("display","");
    loadingWorkarea(_webRootPath+"/frame14/menu/myapps.jsp");
}

   // 清除导航区的导航信息
function clearBannerDirection(){
    var banner_direction = window.document.getElementById("frmTool").contentWindow.document.getElementById("banner_direction");
    if (banner_direction)
		banner_direction.innerHTML="&nbsp;";
    var banner_attention = window.document.getElementById("frmTool").contentWindow.document.getElementById("banner_attention");
    if (banner_attention)
		banner_attention.innerHTML="&nbsp;";
}		

// 显示校内通知
function toschoolnotice(schoolNoticeId) {
	var obj = new Object(); 
	obj.optype = "view";			
	var url = _webRootPath + "/cms/viewSchoolNoticeDetail.action?schoolNoticeId=" + schoolNoticeId;
	myShowModalDialog(url, 800, 600, function (retStr) {
	});	
}
function toschoolnotice_bj(schoolNoticeId) {
	var obj = new Object(); 
	obj.optype = "view";			
	var url = _webRootPath + "/wjstgdfw/AssistantSendNoticeView.jsp?optype=view&schoolNoticeId="+schoolNoticeId;
	myShowModalDialog(url, 800, 600, function (retStr) {
	});	
}		
function myShowModalDialog(url, width, height, fn) {
    //if (navigator.userAgent.indexOf("Chrome") >=0 || navigator.userAgent.indexOf("Firefox")>=0 ) {
    if (navigator.userAgent.indexOf("IE")<0 ) {
        window.returnCallBackValue354865588 = fn;
        var paramsChrome = 'height=' + height + ', width=' + width + ', top=' + (((window.screen.height - height) / 2) - 50) +
            ',left=' + ((window.screen.width - width) / 2) + ', status=no';
        var pop=window.open(url, "newwindow", paramsChrome);
        pop.moveTo((screen.width - width) / 2, (screen.height - height) / 2);
    }
    else {
        var params = 'dialogWidth:' + width + 'px;dialogHeight:' + height + 'px;status:no;scroll=auto;dialogLeft:'
                    + ((window.screen.width - width) / 2) + 'px;dialogTop:' + (((window.screen.height - height) / 2) - 50) + 'px;';
        var tempReturnValue = window.showModalDialog(url, "", params);
        fn.call(window, tempReturnValue);
    }
}
// 文档下载
function todocmanager(fileId) {
	var url = _webRootPath + "/docmanager/FileMain.jsp?pfileId=" + fileId;
	var obj = new Object(); 
	//var result = window.showModalDialog(url, obj, "dialogWidth=980px;dialogHeight=630px;status=no;help=no;scroll=auto"); 			
	//ymPrompt.win({message:url,width:980, height:500,title:'文档管理',handler:docmanagerHandler,maxBtn:false,minBtn:false,iframe:true});
	//ymPrompt.max();
	myShowModalDialog(url, 980, 630, function (retStr) {
	});	
}

// 修改密码
function doModifyPassword() {
	var url = _webRootPath + "/frame/desk/showUserModifyPassword4PostLogin.action";
	var h=356;
    if(("12872"==_schoolCode || "12764"==_schoolCode || "14045"==_schoolCode || "10842"==G_SCHOOL_CODE || "14502"==G_SCHOOL_CODE) && (_usertype=="STU" || _usertype=="TEA")) {//杭州职业技术学院、四川建筑职业技术学院、绵阳城市学院、三门峡职业技术学院、皖北卫生职业学院
        h=375;
    }
	ymPrompt.win({message:url,width:400, height:h,title:'',handler:doHanlerUpdatePassword,maxBtn:false,minBtn:false,closeBtn:false,iframe:true});
	function doHanlerUpdatePassword(tp){
		var result = tp.flag ;
		if ("saveOk" == result){
			// 密码修改成功，加载桌面
			jQuery("#hid_PasswordPolicy").val("1");
			window_onload();
		} else {
			// 重新登陆
			window.top.location.href = _webRootPath+"/DoLogoutServlet";
		}
	}
}
//学业预警
function doOpenXyyj() {
    var loader=new ClassPathLoader("forecastInfo","../student/data/classPath.xml");
    var path=loader.getClassPath();
    //Ajax.doPost("../STU_DynamicInitDataAction.do?classPath="+path,"",fInitData);
    Ajax.doPost("../DyxyyjtzAction.do?xn="+_curxn+"&xq="+_curxq_m,"",fInitData);
}
function fInitData() {
    //var xmlDoc=this.responseXML.documentElement;
    //var item_len = xmlDoc.getElementsByTagName("item").length ;
    var doc=this.responseText;
    if(doc && doc != "{}") {
    //if(item_len>0){
        var width=window.document.body.offsetWidth;
        var height=window.document.body.offsetHeight;
        var json = {"_title":"学业预警","_width":"760px","_height":"580","_top":(height-580)/2,
            "_left":(width-760)/2,"_isStop":true,"_isMove":true,"_imgsrc":"../images/", "_func":"doafterSetYearTerm"};
        _cKwindow_=new CKWindow(json);
        _cKwindow_.setSrc(_webRootPath+"/student/stu.xsxj.xjyd.xyyj.html","100%","100%");
        _cKwindow_.openWindow();
    }
}
function closePop(){
    _cKwindow_.closeWindow();
}
var flag_setYearTerm=true;
// 设置学年学期	
function doSetYearTerm() {
	var width=window.document.body.offsetWidth;
	var height=window.document.body.offsetHeight;
    var menucode=parent.frames["frmbody"].document.getElementById("menucode_current").value;
	var json = {"_title":"设置学年学期","_width":"360px","_height":"180","_top":(height-345)/2,
		"_left":(width-360)/2,"_isStop":true,"_isMove":true,"_imgsrc":"../images/", "_func":"doafterSetYearTerm"};
	_cKwindow_=new CKWindow(json);
	_cKwindow_.setSrc(_webRootPath+"/frame/Main_setYearTerm.jsp?menucode=JW042101&fmenucode="+menucode,"100%","100%");
	_cKwindow_.openWindow();
}
function doafterSetYearTerm(){
	
	_cKwindow_.closeWindow();
	if(flag_setYearTerm){
		// 学年学期修改成功，重新加载Main_footer.jsp
		parent.document.getElementById("frmfoot").contentWindow.location.href = _webRootPath+"/frame/desk/showSystemInfoV14.action";
	}else {
		// 重新登录,转到登录首页
		window.top.location.href=_webRootPath+"/DoLogoutServlet";
	}
}	

// 显示附加功能
function showMyPlus(pageTitle,menucode,pageUrl,pmenuname,pmenucode,plinkfile){
	showMyPage(pageTitle,menucode,pageUrl,pmenuname,pmenucode,plinkfile);
    hidePlusMenu();		//隐藏层
}


// 初始化用户附加功能 				
function loadingUserAttachMenus(pmenucde){

	var url = _webRootPath+"/frame/menu/getUserAttachMenus.action";
	var params = "pmenucde="+pmenucde;
	//alert(url+"?"+params);
	jQuery.ajax({
		type: "POST",
		url: url,
		data: params, 
		dataType: "text",
		success: setMyMenu
	})					
	
	function setMyMenu(response){
		jQuery("#fgDiv").html(response);
		if (response!=null && response != ""){
			var li_count = jQuery("#fgDiv>ul").attr("count");
			//alert("li_count="+li_count);
			var li_column = Math.ceil(li_count/16.0);
			//alert("li_column="+li_column);
			jQuery("#fgDiv").css("width", (li_column*270)+"px");
			// 显示[附加功能]
			var frmTool = document.getElementById("frmTool").contentWindow.document ;
			jQuery("#banner_plusmenu", frmTool).css("display","");
		} else {
			// 隐藏[附加功能]
			var frmTool = document.getElementById("frmTool").contentWindow.document ;
			jQuery("#banner_plusmenu", frmTool).css("display","none");
		}
	}
}

function showPlusMenu(){
   //显示隐藏层
   jQuery('#bgDiv').css('display', 'block')    //遮挡背景层(半透明)
		.width(window.innerWidth+"px")
		.height(window.innerHeight+"px");  
   jQuery('#fgDiv').css('display', 'block')
		.css('right','5px')
		.css('top','30px');  //逻辑业务窗口
	/**
   jQuery('#fgDiv').css('display', 'block')
		.css('left',(window.innerWidth-300)/2+"px")
		.css('top',(window.innerHeight-100)/2+"px");  //逻辑业务窗口
	*/
	// 重置附加功能层边框颜色
	var lhcolor = jQuery(".leftmenu_header").css("background-color");
	jQuery("#fgDiv").css("border-color",lhcolor);
};

function hidePlusMenu(){
   //隐藏层 隐藏起来
   jQuery('#bgDiv').css('display', 'none');  //遮挡背景层(半透明)
   jQuery('#fgDiv').css('display', 'none');  //逻辑 添加/修改 界面
};

jQuery(document).ready(function() {
	
	jQuery('#fgDiv').mouseleave(function(){
		hidePlusMenu();
	})
	
	jQuery("#left-nav li").click(function(){
	
		//设选中节点为活动节点
		jQuery("#left-nav li").removeClass("active");
		jQuery(this).addClass("active");
		//点击事件，跳转到对应的功能页面
		var menuCode = jQuery(this).attr("id");
		//alert("menucode="+menuCode);
		if (!(menuCode == null || menuCode.length == 0)) {
			// 可点击菜单，直接进入对应的功能模块 或下级导航流程图
			
			//alert(">> 你点击的功能项信息 = " + menuCode + "/" + menuName);
			if (menuCode != 'undefined') { 
				var menuitem = kingo_usermenubean.getMenuItemByMenucode(menuCode);
				if (menuitem != null) { // 查找到对应的菜单项，视为功能模块
					
					var appid = menuitem.getAppid();
					var menuCode = menuitem.getMenucode();
					var menuName = menuitem.getMenuname();
					var linkfile = menuitem.getLinkfile();
					var iscanuse = menuitem.getIscanuse();
					
					//alert(">> menucode/menuname/linkfile = " + menuCode + "/" + menuName + "/" + linkfile + "/" + iscanuse);
					var is_flow_menu = new String(linkfile).indexOf("/frame/menus/") > -1; //确定是否为流程图对应的菜单文件
					is_flow_menu = is_flow_menu || new String(linkfile).indexOf("/frame14/menus/") > -1; // 如果启用了教务新版
					//alert("is_flow_menu="+is_flow_menu);
					//将当前操作的菜单id写到Main_index.jsp中的menucode_current隐藏input中
					var frmdesk_src = window.document.getElementById("frmdesk_src");
					var menucode_current = window.document.getElementById("menucode_current");
					if (frmdesk_src) frmdesk_src.value=linkfile; 
					if (menucode_current) menucode_current.value=menuCode; 
					
					if (iscanuse == 1) {
						if (linkfile == null || linkfile.length == 0) {
							alert("该功能项未配置链接路径,请联系系统管理员!");
						} else {
							// 跳转到指定的链接路径
							var pageUrl = _webRootPath + linkfile ;
		                    if (pageUrl.indexOf("?")==-1)
		                        pageUrl = pageUrl + "?menucode=" + menuCode;
		                    else
		                        pageUrl = pageUrl + "&menucode=" + menuCode;
		                        
							showPage(menuName,menuCode,pageUrl); //打开最终的页面--这个方法在LeftPopMenu.js里面
							
						}
					} else {
						alert("您没有使用该功能项的权限!");					
					}					

				} 
			} else {
				alert("未定义相应的菜单功能项,请联系系统管理员!");
			}					
			
		}
	})

})
