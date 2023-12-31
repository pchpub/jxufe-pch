j$(document).ready(function() {
	
	// 初始化我的应用
	//j$("#content").html(myapps);
	
	// 初始化用户关注的服务 				
	//loadingUserDefinedMenus();

	// 初始化最近使用功能
	//showNormalUseMenuitem();	
	
	// 设置功能项对应的IPOS图标
	//initIPOSIcon();	
	
	j$("#content .con").click(function(){
        _webRootPath=getWebRootPath();
		var menuCode = j$(this).attr("id");
		if (!kutil.isNull(menuCode)) {
			// 可点击菜单，直接进入对应的功能模块 或下级导航流程图
			
			//alert(">> 你点击的功能项信息 = " + menuCode + "/" + menuName);
			if (menuCode != 'undefined') { 
				var menuitem = parent.kingo_usermenubean.getMenuItemByMenucode(menuCode);
				if (menuitem != null) { // 查找到对应的菜单项，视为功能模块
					
					var appid = menuitem.getAppid();
					var menuCode = menuitem.getMenucode();
					var menuName = menuitem.getMenuname();
					var linkfile = menuitem.getLinkfile();
					var iscanuse = menuitem.getIscanuse();
					
					// 是否支持SVG(矢量线的显示)
					var issvg = isSVG();
					if (issvg){
						//alert("issvg="+issvg);
						if (linkfile.indexOf(menuCode+".jsp")>-1 && linkfile.indexOf("SVG"+menuCode+".jsp")==-1){
							linkfile = linkfile.replace(menuCode+".jsp", "SVG"+menuCode+".jsp");
							//alert("linkfile="+linkfile);
						}
					}
					
					//alert(">> menucode/menuname/linkfile = " + menuCode + "/" + menuName + "/" + linkfile + "/" + iscanuse);
					var is_flow_menu = new String(linkfile).indexOf("/frame/menus/") > -1; //确定是否为流程图对应的菜单文件
					is_flow_menu = is_flow_menu || new String(linkfile).indexOf("/frame14/menus/") > -1; // 如果启用了教务新版
					//alert("is_flow_menu="+is_flow_menu);
					//将当前操作的菜单id写到Main_index.jsp中的menucode_current隐藏input中
					var frmdesk_src = parent.window.document.getElementById("frmdesk_src");
					var menucode_current = parent.window.document.getElementById("menucode_current");
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

							// window.document.location.href = pageUrl ;
		                    //alert("MenuTool.js:pageUrl = " + pageUrl + "/" + menuCode + "=" + menuName);
                            if (linkfile.startWith("http") || linkfile.startWith("https")){
                                window.open(linkfile);
                            }
							else if ( menuCode != "JWPT30" && menuCode != "ZZ" && menuCode != "TF"){
								showPage(menuName,menuCode,pageUrl); //打开最终的页面--这个方法在PopMenu.js里面
							} 
							else {
								if(menuCode == "ZZ" || menuCode == "TF"){//喜鹊儿、在线教学
									window.open(pageUrl);
								}else {
									// 定制青果超市访问
									doLoginKOL(linkfile);
								}
							}
							
						}
					} else {
						alert("您没有使用该功能项的权限!");					
					}					

				} else {
					// 未查找到对应的菜单项，设为控制参数图元
					//alert("未查找到对应的菜单项!");
					
					// 教务系统：控制参数图元，进入对应的控制参数设置模块(dm/mc)
					//alert(">> 你点击的控制参数信息 = " + menuCode + "/" + menuName);
					if (menuCode != 'undefined' && menuCode != null && menuCode != "") { 
						var url = _webRootPath + "frame/menu/getSwitchControlModuleHref.action" ;
						var params = {"dm" : menuCode} ;
						j$.ajax({
							type: "POST",
							url: url,
							data: params, 
							dataType: "text",
							async: false,  // 同步执行
							success: function(data) {
								//alert(">> scmHref = " + data);
								if (data != null && data != "") {
									window.document.location.href = data ;
								} else {
									//alert("抱歉,您没有访问该模块的权限!");
								}
							}
						});
					}
					
				}
			} else {
				alert("未定义相应的菜单功能项,请联系系统管理员!");
			}					
			
		}
	})

	j$(".ul_menu li").not(".noop").mouseover(function(){
		j$(this).find("a").css("color","red");
	}).mouseout(function(){
		j$(this).find("a").css("color","#FFF");
	})

	j$(".ul_menu li.noop").mouseover(function(){
		j$(this).css("cursor","default");
	})
	
	var _width = window.screen.availWidth;	
	if (_width <= 1024){
		j$("#content>div").removeClass().addClass("col-md-3 col-sm-4 col-xs-4");
	}
	
})
Array.prototype.contains = function(item){
    for(i=0;i<this.length;i++){
        if(this[i]==item){return true;}
    }
    return false;
};
String.prototype.startWith=function(str){
    var reg=new RegExp("^"+str);
    return reg.test(this);
}
// js获取应用上下文
function getWebRootPath() {
    //testGetRootPath();
    var webroot=document.location.href;
    //alert("webroot="+webroot);
    webroot=webroot.substring(webroot.indexOf('//')+2,webroot.length);
    webroot=webroot.substring(webroot.indexOf('/')+1,webroot.length);
    webroot=webroot.substring(0,webroot.indexOf('/'));
    var rootpath = "/" ;
    var webdirs = ['attached','ckyhqx','cms','common','css','custom'
        ,'demo','desk','dlrz','docmanager','dss','dx'
        ,'echarts','excel','ext','fckeditor','frame','frame14','gaojibiao','hcydzpgl','inc'
        ,'jbxx','jcgl','JGBZ','jgxm','js','jsgl','jspx','jxjh','jxkp','jxzy'
        ,'kbbp','KindEditor','kssw','kycg','kyfw','kyjf','kyjg','kykp','kyqk','kyxm','kyzy'
        ,'labopen','labtroop','labYqsbgl','lwsy'
        ,'mpgl','myjs','oa','public','regapp','rxgl'
        ,'sbsj','searchmanager','service','share','sjjx','sjybb','sms','student','sxgl','syjx','sys','sysdw','sysjs','syskf','syspg'
        ,'taglib','template','themes','tool','tsxx'
        ,'wj.cjgl','wj.grxx','wj.jxzy','wj.jxzz','wj.ktjx','wj.kwjl','wj.kwjl','wj.kwxl','wj.kwzy','wj.ptgl','wj.sjgl','wj.zxks'
        ,'wjstgdfw','workflow','wsxk','xkjs','xscj','xsxj','xtgl','yhgl','yqsbgl','zgks','zzzdgl','tmsgl'];
    if (!webdirs.contains(webroot))
    {
        // 非工程的一级目录名称，增加工程名
        rootpath = "/"+webroot;
    } else {
        // 工程的一级目录名称，直接取[协议+主机名+端口]值
        // window.location.host：包含端口 window.location.hostname：不包含端口
        rootpath = window.location.protocol + "//" + window.location.host + "/";
    }
    if("/"==rootpath){//处理为ROOT.war的情况
        rootpath = window.location.protocol + "//" + window.location.host + "/";
    }
    //alert("rootpath="+rootpath);
    return rootpath;
}
// 初始化用户权限
function initUserPrivilege($menus){
	$menus.each(function(){
		var menuCode = j$(this).attr("id");	
		if (!kutil.isNull(menuCode)) {
			if (menuCode != 'undefined') { 
				var menuitem = parent.kingo_usermenubean.getMenuItemByMenucode(menuCode);
				if (menuitem != null) { // 查找到对应的菜单项，视为功能模块
					var iscanuse = menuitem.getIscanuse();
					if (iscanuse == "1") {
						//alert("menuCode/iscanuse="+menuCode+"/"+iscanuse+"...addClass");
						j$("#"+menuCode).removeClass("noop");
					}
				} else {
					// 未查找到对应的菜单项，设为控制参数图元
					if (menuCode != 'undefined' && menuCode != null && menuCode != "") { 
						var url = _webRootPath + "frame/menu/getSwitchControlModuleHref.action" ;
						var params = {"dm" : menuCode} ;
						j$.ajax({
							type: "POST",
							url: url,
							data: params, 
							dataType: "text",
							async: false,  // 同步执行
							success: function(data) {
								if (data != null && data != "") {
									j$("#"+menuCode).removeClass("noop");
								}
							}
						});
					}
					
				}
			} else {
				// 不可操作
			}					
			
		}		
		
	})
}

function CPos(x, y, w, h)
{
	 this.x = x;  // left
	 this.y = y;  // top
	 this.w = w;  // width
	 this.h = h;  // height
}

function GetObjPos(ATarget)
{
	 var target = ATarget;
	 var pos = new CPos(target.offsetLeft, target.offsetTop, target.offsetWidth, target.offsetHeight);
	 return pos;
}	

function initPosition($module) {
	//alert("initPosition()...");
	var minX = 0, minY = 0, maxX = 0, maxY = 0;
	
	// 遍历页面 class=module 的所有元素, 获取最小左上点、最大右下点的位置
	$module.each(function() {
		var pos = GetObjPos(this);
		var x = pos.x;
		var y = pos.y;
		var w = pos.w;
		var h = pos.h;
		var id = j$(this).attr("id");
		//alert("id/x/y/w/h = " + id + "/" + x + "/" + y + "/" + w + "/" + h);
		if (minX == 0) {minX = x;}
		if (minY == 0) {minY = y;}
		minX = Math.min(x,minX);
		minY = Math.min(y,minY);
		maxX = Math.max(x+w,maxX);
		maxY = Math.max(y+h,maxY);
	}) 
	
	alert("min/max = " + minX + "/" + minY + "/" + maxX + "/" + maxY);
	// 获取网页可见区域的宽度和高度
	var clientW = document.body.clientWidth;
	var clientH = document.body.clientHeight;
	//alert("clientW/clientH = " + clientW + "/" + clientH);
	// 设置流程图的高度和宽度
	var myWidth = maxX - minX ;
	var myHeight = maxY - minY;
	// 设置流程图的上边距和左边距，使页面居中
	var marginTop = (clientH - (maxY-minY))/2 - minY;
	//alert(">> marginTop = " + marginTop);
	//if (marginTop<0) { marginTop = 0; }
	var marginLeft = (clientW - (maxX-minX))/2 - minX;   // body未居中时的设值
	var textAlign = j$("body").css("text-align");
	if ("center" == textAlign.toLowerCase()) {
		marginLeft = - minX ; // body居中时的设值(IE下起作用，FF下不起作用)
	}
	//alert("myWidth/myHeight/marginLeft/marginTop = " + myWidth + "/" + myHeight + "/"+ marginLeft + "/" + marginTop);
	if (marginLeft < 0){
		marginLeft = 0;
		//$("#frmDesk",parent.document).css("overflow-x","auto");
	}
	if (marginTop < 0) {
		marginTop = 0;
		//$("#frmDesk",parent.document).css("overflow-y","auto");
	}
	// 页面居中属性赋值
	j$("#flowChartDiv").css("width", myWidth)
					  .css("height", myHeight)
					  .css("margin-left", marginLeft)
					  .css("margin-top", marginTop);

	// 查找字体图形,设置文本为正常体和灰色
	/**
	$("img[src*='font.png']").each(function() {
		var $pmodule = $(this).parent().parent();
		$pmodule.css("font-weight","normal").css("color","gray"); //"#d4d0c8"
	})
	*/

	// 设置线条的颜色和粗细
	/**
	// strokecolor = "black" strokeweight = "1.35pt  "#B2DDFC"
	$("*[id^=line]").each(function(){
		$(this).attr("strokecolor", "gray").attr("strokeweight", "1pt");
	})
	*/
}

// 参考BaseTool.js文件中 printHTML方法 生成扁平化流程图文件
function genFlatFlowchart() {

	var menuCode = "JW000401"; //$("#menuCode").val();
	if (menuCode == null || menuCode.length == 0) {
		alert(">> 请先选择待生成流程图的功能项! ");
		return ;
	}		
	
	// 生成静态HTML文件
	//var url = "http://kingo154:8081/KingoJW/menuDefine";
	var url = _webRootPath + "menuDefine";
	//alert(">> url = " + url);
	j$.ajax({
		type: "POST",
		url: url,
		data: {"optype": "genFlatFlowchart",
			   "menuCode": menuCode // "JW000401"-管理部门信息
			   },  
		dataType: "text",
		async: false,
		success: function(data) {
			alert(">> ajax.data = " + data + "/" + (data == "1") + "/" + (data == 1));
			if(data == 1) {
				alert("已成功生成静态页面文件!");
				//window.open(menuCode+'.jsp', '', '');
			}
		}
	})
		
}


// 初始化用户关注的服务 				
function loadingUserDefinedMenus(){

	var url = _webRootPath+"frame/menu/getUserDefinedMenus4Leftnav.action";
	var params = "records=999";			
	jQuery.ajax({
		type: "POST",
		url: url,
		data: params, 
		dataType: "text",
		success: setUDM
	})					
	
	function setUDM(response){
		//alert("response="+response);
		jQuery("#myfocus").html(response);
	}
}

// 初始化最近使用功能
function showNormalUseMenuitem(){
     
     var result_href = [''];
	 var normalusers = parent.kingo_list_normal_use_menuitem.normalMenuList ;     
     if (normalusers.length>0){
	      var length = normalusers.length;
	      for (var i=0;i<length;i++){
	          var objItem = normalusers[i];
	          var menucode = objItem.getMenucode();
	          var menuname = objItem.getMenuname();
	          var pageUrl =  objItem.getPageUrl();
	          //&diams;这个是一个图片，html内置的
	          result_href.push('<span style="color:#EC9C14;font-size:13px;">&diams;</span><a href="javascript:void(0)" style="text-decoration : none;color:black;margin-top:12px;padding-left:6px;" ');
	          result_href.push('');
	          result_href.push(' title=\''+menuname+'\'');
	          result_href.push(' onclick="NormalPageOpenByMenucode(\''+menucode+'\')" menucode=\''+menucode+'\'> ');
	          if (menuname.length>12)
	             result_href.push(menuname.substr(0,12)+"");//标题太长时候省略
	          else
	              result_href.push(menuname);
	   		  result_href.push('</a>\n');
	   		  if (i!=length) result_href.push('<br>');
	      }
	      //alert("最近使用："+result_href.join(""));
		  jQuery("#normal_use_menu").html(result_href.join(""));
		  
    } else {
		
		  jQuery("#normal_use_menu").html("没有最近使用功能！");
		    	
    }
}

// 设置功能项对应的IPOS图标
function initIPOSIcon() {
	jQuery("a.input").prepend("<img src='"+_webRootPath+"frame14/img/ipo/input.png'/>");
	jQuery("a.process").prepend("<img src='"+_webRootPath+"frame14/img/ipo/process.png'/>");
	jQuery("a.output").prepend("<img src='"+_webRootPath+"frame14/img/ipo/output.png'/>");
	jQuery("a.setting").prepend("<img src='"+_webRootPath+"frame14/img/ipo/setting.png'/>");
}

//  是否支持SVG
function isSVG() {
	var vgtype = window.SVGAngle || document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1") ? "SVG" : "VML";
	return vgtype == "SVG";
}
