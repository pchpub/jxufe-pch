/**
* 菜单导航流程图运行时事件定义
*/
var browser = "MSIE";  // 使用到的浏览器类型
var origImgSrc = null; // 流程节点初始背景图
jQuery(document).ready(function() {
	
	browser = getOs();
	
	// 显示流程图（调整到流程图位置和权限等初始化完成后显示流程图）
	var $module = $(".module");
	
	if (parent.kingo_usermenubean) {  // 为空表示预览；否则表示正常的用户点击操作
		// 依据用户设置的主题样式初始化流程图主题样式
		initUserThemes($module);
		// 依据用户权限初始化流程图中功能项
		initPrivilege($module);
	} else {
		// 预览赋予权限
		initPrivilege4Preview($module);
	}

	$("#flowChartDiv").show(); //.css("border", "1px solid red");
	// 加载的菜单功能流程图页面居中(屏幕居中：上下左右)
	// <body style="text-align:center;">
	// <div style="position:relative; width:800px; height:450px; border:1px solid green; margin:0 auto; text-align:left;">
	initPosition($module);
	
	// 初始化用户附加功能 	
	var _menucode=request("menucode");	
	if (_menucode){
		if (_menucode.indexOf('S')>-1 || _menucode.indexOf('T')>-1){
			//alert(_menucode+":"+_menucode.indexOf('S'));
		} else {
    		parent.loadingUserAttachMenus(_menucode);
    	}
    }
		
	// 流程节点单击：依据[1.不可点击/2.可点击/3.弹出层菜单]三种情况作不同的处理。
	$module.click(function(e){
		
		var $self = $(this);  
		var $title = $self.children(".title");
		var menuCode = $self.attr("menuId");
		var menuName = $title.html();
		
		if (!parent.kingo_usermenubean){
			return ;
		}
		// origImgSrc 在mouseover时获取
		if (origImgSrc.indexOf("baseMode4.png")>0 || origImgSrc.indexOf("baseMode84.png")>0||origImgSrc.indexOf("JcbaseMode43.png")>0||origImgSrc.indexOf("JcbaseMode45.png")>0) {  // 弹出层菜单选择
			
			$("div.menu").css("display","none");  // 2020-10-10 预先隐藏所有的弹出菜单显示
			var myMenu = createPopMenu(menuCode); 
			myMenu.show(e ,"right");
			
		} else if (origImgSrc.indexOf("baseMode1.png")>0 
				|| origImgSrc.indexOf("baseMode3.png")>0
            || origImgSrc.indexOf("JcbaseMode44.png")>0
            || origImgSrc.indexOf("baseMode6.png")>0
				|| origImgSrc.indexOf("baseMode81.png")>0 
				|| origImgSrc.indexOf("baseMode83.png")>0 
				|| origImgSrc.indexOf("baseMode_cs")>0 
				){ 

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
							if ( menuCode != "JWPT30"){
								showPage(menuName,menuCode,pageUrl); //打开最终的页面--这个方法在PopMenu.js里面
							} else {
								// 定制青果超市访问
								doLoginKOL(linkfile);
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
						var url = _webRootPath + "/frame/menu/getSwitchControlModuleHref.action" ;
						var params = {"dm" : menuCode} ;
						$.ajax({
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
			
		} else if (origImgSrc.indexOf("baseMode_help.png")>0 ) { 
			
			// 显示帮助信息
			showHelp();	
			
		}
		/**
		else if (origImgSrc.indexOf("baseMode6.png")>0){ 
			// 控制参数图元，进入对应的控制参数设置模块(dm/mc)
			//alert(">> 你点击的控制参数信息 = " + menuCode + "/" + menuName);
			if (menuCode != 'undefined' && menuCode != null && menuCode != "") { 
				var url = _webRootPath + "/frame/menu/getSwitchControlModuleHref.action" ;
				var params = {"dm" : menuCode} ;
				$.ajax({
					type: "POST",
					url: url,
					data: params, 
					dataType: "text",
					async: false,  // 同步执行
					success: function(data) {
						if (data != null && data != "") {
							//alert(">> scmHref = " + data);
							window.document.location.href = data ;
						} 
					}
				});
			}
			
		} 
		*/
		
	});
	
	// 流程节点鼠标移入: 
	// 1 如果不可点击，不更换背景图
	// 2 如果可点击[可点击和弹出菜单状态2种情况]，更换背景图为对应的背景图
	$module.mouseover(function(){
		var $self = $(this);
		var $img = $self.find("img");
		origImgSrc = $img.attr("src");		
		if (origImgSrc.indexOf("baseMode1.png")>0) { // 直接跳转的流程节点
			$img.attr("src", _webRootPath + "/frame/menus/images/" + _stylePathPrefix + "/baseMode1_click.png");						
		}
		if (origImgSrc.indexOf("baseMode3.png")>0) { // 带下级导航图的流程节点
			$img.attr("src", _webRootPath + "/frame/menus/images/" + _stylePathPrefix + "/baseMode3_click.png");						
		}

        if (origImgSrc.indexOf("JcbaseMode44.png")>0) { // 带下级导航图的流程节点
            $img.attr("src", _webRootPath + "/frame/menus/images/" + _stylePathPrefix + "/JcbaseMode44_click.png");
        }

		if (origImgSrc.indexOf("baseMode4.png")>0) { // 带弹出菜单的流程节点
			$img.attr("src", _webRootPath + "/frame/menus/images/" + _stylePathPrefix + "/baseMode4_click.png");						
		}

		if (origImgSrc.indexOf("baseMode81.png")>0) { // 直接跳转的输出流程节点
			$img.attr("src", _webRootPath + "/frame/menus/images/" + _stylePathPrefix + "/baseMode81_click.png");						
		}
		if (origImgSrc.indexOf("baseMode83.png")>0) { // 带下级导航图的输出流程节点
			$img.attr("src", _webRootPath + "/frame/menus/images/" + _stylePathPrefix + "/baseMode83_click.png");						
		}
		if (origImgSrc.indexOf("baseMode84.png")>0) { // 带弹出菜单的输出流程节点
			$img.attr("src", _webRootPath + "/frame/menus/images/" + _stylePathPrefix + "/baseMode84_click.png");						
		}
		
		if (origImgSrc.indexOf("actor_right.png")>0) { // 带下级导航的流程节点
			$img.css("cursor", "pointer");						
		}

        if (origImgSrc.indexOf("JcbaseMode43.png")>0) { // 带弹出菜单的流程节点
            $img.attr("src", _webRootPath + "/frame/menus/images/" + _stylePathPrefix + "/JcbaseMode43_click.png");
        }

        if (origImgSrc.indexOf("JcbaseMode45.png")>0) { // 带弹出菜单的流程节点
            $img.attr("src", _webRootPath + "/frame/menus/images/" + _stylePathPrefix + "/JcbaseMode45_click.png");
        }

		
	});
	
	// 流程节点鼠标移出: 
	// 1 如果不可点击，不更换背景图
	// 2 如果可点击[可点击和弹出菜单状态2种情况]，恢复初始的背景图
	$module.mouseout(function(){
		var $self = $(this);
		var $img = $self.find("img");
		//alert(">> origImgSrc = " + origImgSrc);
		$img.attr("src", origImgSrc);
	});
	
	
	// 显示帮助信息
	// <span id=JW91 class=help>帮助中心</span>
	$(".help").parent().parent().click(function(){
		showHelp();
	})

	// 改变尺寸重新初始化流程图位置确保居中显示
	$(window).resize(function(){
		//window.location.reload();
		initPosition($module);
	})
	
});

// 登录青果超市
function doLoginKOL(kol_url){
	// 获取访问参数调用青果超市访问
	var _url = _webRootPath + "/cas/LoginKOL?action=getKolLoginParams";
	//alert("_url="+_url);
	var params = "";
	$.ajax({
		type: "POST",
		url: _url,
		data: "", 
		dataType: "text",
		async: false,  // 同步执行
		success: function(data) {
			//alert("data="+data);
			params = data ;
		}
	});
	//alert("params = " + params);
	
	// 重新加载青果超市的body部分
	// 青果超市登录页
	//var kol_login = "http://192.168.0.153/KOL30/default.aspx";
	// 青果超市主页面
	//var kol_app   = "http://192.168.0.153/KOL30/CS/AppStore.aspx";
	// 如果用户名为空系统转入到青果超市登录页； 否则转入到青果超市主页面
	//var kol_url = "http://192.168.0.153/KOL30/doLogin.aspx" ;
	kol_url = kol_url + "?" + params;
	//alert("kol_url = " + kol_url);
	var frame_body = $(parent.document.getElementById("frmDesk"));
	frame_body.attr("src",kol_url);
}

// 显示帮助信息
function showHelp(){
	var name = $(".help").html();
	var id = $(".help").attr("id");
	//alert("进入帮助中心：id="+id+"/name="+name);
	var helpfile = _webRootPath+"/_help/index.htm?id="+id ;
	//alert("helpfile="+helpfile);
	//window.open(helpfile);
	alert("帮助中心正在完善中......");
}

/**
 * 依据菜单代码动态生成弹出菜单：依据用户权限获取可访问的菜单项；生成菜单
 * 
 * <pre> 菜单项数据示例 
 	<root>
	 <menu>
	   <ul>
		<li enabled="false">更换模板</li>
		<li onclick="doClick(this);">一个真实的我</li>
		<li onclick="doClick(this);">工作与事业</li>
	   </ul>
	 </menu>
	</root>
 * </pre>
 * 
 * @return
 */
function createPopMenu(menuCode) {
	
	// ../js/UserMenuBean.js  获取缓存的与用户权限关联的菜单项数据	
	var subMenuItems = parent.kingo_usermenubean.getMenuItemIdByParentForPicturePage(menuCode);
	//alert(">> subMenuItems = " + subMenuItems.length);
	var submenuCount = subMenuItems.length ;
	
	// 组织菜单数据
	var dataBuffer = [],
		maxChars = 0, // 最大字符数
		maxCharsLen = 0, // 最长字符
		i = 0;

	var listyle = "";
	for (var j=0; j<subMenuItems.length; j++){
		var menu = subMenuItems[j];	
		var menuName = menu.getMenuname();
		maxChars = Math.max(maxChars, menuName.length);
	}	
	// 下拉列表记录数>=16时,分2栏显示
	if (submenuCount >= 16){
		var _width = 12.7 * (maxChars + 1) - 15;
		listyle=" style='float:left; width:"+_width+"px;' ";
	}	

	dataBuffer[i++] = '<root>';
	dataBuffer[i++] = '<menu>';
	dataBuffer[i++] = '<ul>';

	for (var j=0; j<subMenuItems.length; j++){
		var menu = subMenuItems[j];	
		var menuCode = menu.getMenucode();
		var menuName = menu.getMenuname();
		var linkfile = menu.getLinkfile();
		var iscanuse = menu.getIscanuse();
		//alert(">> j/menucode/menuname/linkfile = " + j + "/" + menuCode + "/" + menuName + "/" + linkfile + "/" + iscanuse);
		if (submenuCount >= 16){
			if (iscanuse == 1) {
				dataBuffer[i++] = '<li id="popmenu_' + menuCode + '"' + listyle + ' onclick="doClick(this,\'' + linkfile + '\');">' + menuName + '</li>';
			} else {
				dataBuffer[i++] = '<li enabled="false" id="popmenu_' + menuCode + '"'+ listyle + ' >' + menuName + '</li>';
			}
		} else {
			if (iscanuse == 1) {
				dataBuffer[i++] = '<li id="popmenu_' + menuCode + '" onclick="doClick(this,\'' + linkfile + '\');">' + menuName + '</li>';
			} else {
				dataBuffer[i++] = '<li enabled="false" id="popmenu_' + menuCode + '" >' + menuName + '</li>';
			}
		}
		
		maxChars = Math.max(maxChars, menuName.length);
		maxCharsLen = Math.max(maxChars, getLengthB(menuName));
		
	}
		
	dataBuffer[i++] = '</ul>';
	dataBuffer[i++] = '</menu>';
	dataBuffer[i++] = '</root>';

	var data = dataBuffer.join("");
	// alert(">> menu data = " + data);
	//alert(">> maxChars/maxCharsLen = " + maxChars + "/" + maxCharsLen);
	
	var myMenu = new Menu();
	myMenu.width = 13.7 * (maxChars + 1); // 201;  14像素*字符数
	//myMenu.width = 7 * maxCharsLen; // 201;  7像素*半角字符数
	
	// 下拉列表记录数>=16时,分2栏显示
	if (submenuCount >= 16){
		myMenu.width = 12.7 * (maxChars + 1) * 2 ; 
	}
	
	//alert(">> maxChars/maxCharsLen/myMenu.width = " + maxChars + "/" + maxCharsLen + "/" + myMenu.width);
	
	myMenu.xmlString = data;
	//myMenu.xml = "data/data.xml";
	myMenu.init();	
	return myMenu;	
}

function getLengthB(str){
	//var lenb = str.replace(/[^\x00-\xff]/g,'xx').length;
	var result = DBC2SBC(str);
	var lenb = result.length ;
	return lenb;
}

/**  
 *   
 * @param {String}  str 字符串  
 * @return {String} 将全角全部转换为半角的字符串  
 */  
function DBC2SBC(str) 
{ 
	var result=""; 
	for(var i=0;i<str.length;i++) 
	{ 
		code = str.charCodeAt(i);//获取当前字符的unicode编码 
		if (code >= 65281 && code <= 65373)//在这个unicode编码范围中的是所有的英文字母已经各种字符 
		{ 
			var d=str.charCodeAt(i)-65248; 
			result += String.fromCharCode(d);//把全角字符的unicode编码转换为对应半角字符的unicode码 
		} 
		else if (code == 12288)//空格 
		{ 
			var d=str.charCodeAt(i)-12288+32; 
			result += String.fromCharCode(d); 
		} 
		else 
		{ 
			result += str.charAt(i); 
		} 
	} 
	return result; 
} 

/**
 * obj-- this
 * @param obj
 * @return
 */
function doClick(obj, linkfile) {
	var menuCode = $(obj).attr("id").replace("popmenu_","");   // 当前id属性去掉前缀
	var menuName = obj.innerHTML;
	
	// 跳转到指定的链接路径
	var pageUrl = _webRootPath + linkfile ;
	//将当前操作的菜单id写到Main_index.jsp中的menucode_current隐藏input中
	parent.window.document.getElementById("menucode_current").value=menuCode;
    if (pageUrl.indexOf("?")==-1)
        pageUrl = pageUrl + "?menucode=" + menuCode;
    else
        pageUrl = pageUrl + "&menucode=" + menuCode;							
	// window.document.location.href = pageUrl ;
	//alert(">> 你点击的是: " + menuCode + "=" + menuName + "/tourl = " + linkfile);
	showPage(menuName,menuCode,pageUrl); //打开最终的页面--这个方法在PopMenu.js里面
	
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
		var id = $(this).attr("id");
		//alert("id/x/y/w/h = " + id + "/" + x + "/" + y + "/" + w + "/" + h);
		if (minX == 0) {minX = x;}
		if (minY == 0) {minY = y;}
		minX = Math.min(x,minX);
		minY = Math.min(y,minY);
		maxX = Math.max(x+w,maxX);
		maxY = Math.max(y+h,maxY);
	}) 
	
	//alert("min/max = " + minX + "/" + minY + "/" + maxX + "/" + maxY);
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
	var textAlign = $("body").css("text-align");
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
	$("#flowChartDiv").css("width", myWidth)
					  .css("height", myHeight)
					  .css("margin-left", marginLeft)
					  .css("border","0px solid red");
	if (browser=="MSIE"){
		// IE系列
		$("#flowChartDiv").css("margin-top", marginTop-10);
	} else {
		// Firefox, Chrome等
		$("#flowChartDiv").css("margin-top", marginTop-10);
	}
	
	$("body").css("border","0px solid blue")
			 .css("overflow-x","hidden")
			 .css("overflow-y","auto");

	// 查找字体图形,设置文本为正常体和灰色
	$("img[src*='font.png']").each(function() {
		var $pmodule = $(this).parent().parent();
		$pmodule.css("font-weight","normal").css("color","gray"); //"#d4d0c8"
	})

	// 设置矢量线条和箭头的颜色和粗细
	// green blue purple 
	var _strokecolor = "gray";
	if (_stylePathPrefix == "green"){
		_strokecolor = "#00B277";//2022-3-26"#6FC47A";
	} else if (_stylePathPrefix == "blue") {
		_strokecolor = "#3B9ECB";
	} else if (_stylePathPrefix == "purple") {
		_strokecolor = "#4A4EFF";//2022-3-19"#A688CD";
	} else if (_stylePathPrefix == "red") {
		_strokecolor = "#D22E2E";
	}
			
	// strokecolor = "black" strokeweight = "1.35pt  "#B2DDFC"
	$("*[id^=line]").each(function(){
		$(this).attr("strokecolor", _strokecolor).attr("strokeweight", "1pt");
		$(this).css("stroke", _strokecolor);
		// brokenType="4"  marker-end="url(#arrow)"
		var brokenType = $(this).attr("brokentype"); // 属性名用小写
		//console.log("brokenType="+brokenType);
		if (brokenType == "4"){
			// 不带箭头的线条，无箭头
			$(this).attr("marker-end", "none");
		}
	})
	
	// 设置矢量箭头的颜色与风格一致
	$("*[id^=arrow]>path").each(function(){
		//alert(_strokecolor+":"+$(this).attr("stroke")+":"+$(this).attr("fill"));
		$(this).attr("stroke", _strokecolor).attr("fill", _strokecolor);
	})	
}

//遍历页面 class=module 的所有元素, 初始化用户主题样式
function initUserThemes($module) {

	var date=new Date();
	var path=_webRootPath+"/theme/themeservlet?p=getUserThemes&date="+date.getTime();
	//alert("initUserThemes.path="+path);
	jQuery.get(path,null,function(data){
		// 1,2,3@1,2,3
		//alert("initUserThemes.data="+data);
		var css = new String(data).split("@");
		var colorvalues = new String(css[1]).split(",");
		var color1 = colorvalues[0];
		var color2 = colorvalues[1];
		var color3 = colorvalues[2];
		//alert("color1="+color1+"&color2="+color2+"&color3="+color3);

		$module.each(function() {
			
			var $self = $(this);
			var $img = $self.find("img");
			var myImgSrc = $img.attr("src");		
			
			// 依据用户自定主题样式流程图的风格
			if (myImgSrc.indexOf("baseMode_cs")>0) {
				//alert("myImgSrc="+myImgSrc);
				var newImgSrc = myImgSrc;
				if (myImgSrc.indexOf("baseMode_cs1")>0) {
					var newImgSrc = new String(myImgSrc).replace("baseMode_cs1","baseMode_cs"+color1);
					//alert("myImgSrc/newImgSrc="+myImgSrc+"/"+newImgSrc);
				}
				if (myImgSrc.indexOf("baseMode_cs2")>0) {
					var newImgSrc = new String(myImgSrc).replace("baseMode_cs2","baseMode_cs"+color2);
				}
				if (myImgSrc.indexOf("baseMode_cs3")>0) {
					var newImgSrc = new String(myImgSrc).replace("baseMode_cs3","baseMode_cs"+color3);
				}
				$img.attr("src", newImgSrc);					
			}
			
		}) // $module.each
	}) // jQuery.get
} // initUserThemes

//遍历页面 class=module 的所有元素, 初始化权限图标
function initPrivilege($module) {

	//alert("initPrivilege:_stylePathPrefix="+_stylePathPrefix);
	
	$module.each(function() {
		
		var $self = $(this);
		var $img = $self.find("img");
		var myImgSrc = $img.attr("src");		
		
		if (myImgSrc.indexOf("baseMode5.png")>0) {  // 虚拟流程节点字体变灰，鼠标形状 箭头
			$img.parent().parent().css("color", "#AAA").css("cursor","default");			
		} 
		else if (myImgSrc.indexOf("font.png")>0
				|| myImgSrc.indexOf("baseMode70.png")>0
				|| myImgSrc.indexOf("actor_")>0 ) {  // 文本节点/底框图节点/角色鼠标形状 箭头
			$img.parent().parent().css("cursor","default");			
		}		
		else if (myImgSrc.indexOf("baseMode1.png")>0  	 // 直接跳转的流程节点(菜单功能项)  
				|| myImgSrc.indexOf("baseMode3.png")>0   // 带下级导航图的流程节点
				|| myImgSrc.indexOf("JcbaseMode44.png")>0   // 带下级导航图的流程节点
				|| myImgSrc.indexOf("baseMode4.png")>0   // 带下拉菜单的流程节点
				|| myImgSrc.indexOf("baseMode6.png")>0   // 控制参数图标
				|| myImgSrc.indexOf("baseMode81.png")>0  // 直接跳转的输出结果节点
				|| myImgSrc.indexOf("baseMode83.png")>0  // 带下级导航图的输出结果节点
				|| myImgSrc.indexOf("baseMode84.png")>0  // 带下拉菜单的输出结果节点
				|| myImgSrc.indexOf("baseMode_cs")>0     // 教务V14改版新增流程节点
                || myImgSrc.indexOf("JcbaseMode43.png")>0     // 教务V17.2教材模块新增流程节点
            || myImgSrc.indexOf("JcbaseMode45.png")>0     // 教务V17.2教材模块新增流程节点

			) {  
	
			var menuCode = $self.attr("menuId");
			if (menuCode != 'undefined') { 
				var menuitem = parent.kingo_usermenubean.getMenuItemByMenucode(menuCode);
				var iscanuse = 0;
				if (menuitem != null) {
					var iscanuse = menuitem.getIscanuse();	
				} else {
					//alert("未查找到对应的菜单项!");
					iscanuse = 0;
				}
				//console.log("menuCode="+menuCode+"/iscanuse="+iscanuse);
				if (iscanuse == 0) { // 您没有使用该功能项的权限!
					if (myImgSrc.indexOf("baseMode1.png")>0) {
						$img.attr("src", _webRootPath + "/frame/menus/images/" + _stylePathPrefix + "/baseMode1_noqx.png");
						$img.parent().parent().css("color", "#AAA").css("cursor","default");
					} else if (myImgSrc.indexOf("baseMode3.png")>0) {
						$img.attr("src", _webRootPath + "/frame/menus/images/" + _stylePathPrefix + "/baseMode3_noqx.png");
						$img.parent().parent().css("color", "#AAA").css("cursor","default");
					}else if (myImgSrc.indexOf("JcbaseMode44.png")>0) {
                        $img.attr("src", _webRootPath + "/frame/menus/images/" + _stylePathPrefix + "/JcbaseMode44_noqx.png");
                        $img.parent().parent().css("color", "#AAA").css("cursor","default");
                    }
					else if (myImgSrc.indexOf("baseMode4.png")>0) {
						$img.attr("src", _webRootPath + "/frame/menus/images/" + _stylePathPrefix + "/baseMode4_noqx.png");
						$img.parent().parent().css("color", "#AAA").css("cursor","default");
					} else if (myImgSrc.indexOf("baseMode6.png")>0) {
						$img.attr("src", _webRootPath + "/frame/menus/images/" + _stylePathPrefix + "/baseMode6_noqx.png");
						$img.parent().parent().css("color", "#AAA").css("cursor","default");
					} else if (myImgSrc.indexOf("baseMode81.png")>0) {
						$img.attr("src", _webRootPath + "/frame/menus/images/" + _stylePathPrefix + "/baseMode81_noqx.png");
						$img.parent().parent().css("color", "#AAA").css("cursor","default");
					} else if (myImgSrc.indexOf("baseMode83.png")>0) {
						$img.attr("src", _webRootPath + "/frame/menus/images/" + _stylePathPrefix + "/baseMode83_noqx.png");
						$img.parent().parent().css("color", "#AAA").css("cursor","default");
					} else if (myImgSrc.indexOf("baseMode84.png")>0) {
						$img.attr("src", _webRootPath + "/frame/menus/images/" + _stylePathPrefix + "/baseMode84_noqx.png");
						$img.parent().parent().css("color", "#AAA").css("cursor","default");
						
					} else if (myImgSrc.indexOf("baseMode_cs")>0) {
						$img.attr("src", _webRootPath + "/frame/menus/images/" + _stylePathPrefix + "/baseMode_noqx.png");
						$img.parent().parent().css("color", "#DDD").css("cursor","default");
						$img.parent().parent().children("div[class=title]").css("color", "#CCC").css("cursor","default");
						//$img.parent().parent().children("div[class=title]").css("color", "#E3E6DB").css("cursor","default");
					} else if (myImgSrc.indexOf("JcbaseMode43.png")>0) {
                        $img.attr("src", _webRootPath + "/frame/menus/images/" + _stylePathPrefix + "/JcbaseMode43_noqx.png");
                        $img.parent().parent().css("color", "#AAA").css("cursor","default");
                    }
                    else if (myImgSrc.indexOf("JcbaseMode45.png")>0) {
                        $img.attr("src", _webRootPath + "/frame/menus/images/" + _stylePathPrefix + "/JcbaseMode45_noqx.png");
                        $img.parent().parent().css("color", "#AAA").css("cursor","default");
                    }
                }
			}		
		}
	
	})

}

//遍历页面 class=module 的所有元素, 初始化权限图标
function initPrivilege4Preview($module) {

	//alert("initPrivilege");
	
	$module.each(function() {
		
		var $self = $(this);
		var $img = $self.find("img");
		var myImgSrc = $img.attr("src");		
		
		if (myImgSrc.indexOf("baseMode5.png")>0) {  // 虚拟流程节点字体变灰，鼠标形状 箭头
			$img.parent().parent().css("color", "#AAA").css("cursor","default");			
		} 
		else if (myImgSrc.indexOf("font.png")>0
				|| myImgSrc.indexOf("baseMode70.png")>0
				|| myImgSrc.indexOf("actor_")>0 ) {  // 文本节点/底框图节点/角色鼠标形状 箭头
			$img.parent().parent().css("cursor","default");			
		}		
		else if (myImgSrc.indexOf("baseMode1.png")>0  	// 直接跳转的流程节点(菜单功能项)  
				|| myImgSrc.indexOf("baseMode3.png")>0  // 带下级导航图的流程节点
            	|| myImgSrc.indexOf("JcbaseMode44.png")>0  // 带下级导航图的流程节点
				|| myImgSrc.indexOf("baseMode4.png")>0  // 带下拉菜单的流程节点
				|| myImgSrc.indexOf("baseMode_cs")>0    // 教务V14改版新增流程节点
            	|| myImgSrc.indexOf("JcbaseMode43.png")>0  // 带下拉菜单的流程节点
            || myImgSrc.indexOf("JcbaseMode45.png")>0  // 带下拉菜单的流程节点
			) {  
	
			var menuCode = $self.attr("menuId");
			if (menuCode != 'undefined') { 
				// 您没有使用该功能项的权限!
				if (myImgSrc.indexOf("baseMode1.png")>0) {
					//$img.attr("src", _webRootPath + "/frame/menus/images/" + _stylePathPrefix + "/baseMode1_click.png");
					//$img.parent().parent().css("color", "#AAA").css("cursor","default");
				} else if (myImgSrc.indexOf("baseMode3.png")>0) {
					//$img.attr("src", _webRootPath + "/frame/menus/images/" + _stylePathPrefix + "/baseMode3_click.png");
					//$img.parent().parent().css("color", "#AAA").css("cursor","default");
				} else if (myImgSrc.indexOf("JcbaseMode44.png")>0) {
                    //$img.attr("src", _webRootPath + "/frame/menus/images/" + _stylePathPrefix + "/baseMode3_click.png");
                    //$img.parent().parent().css("color", "#AAA").css("cursor","default");
                } else if (myImgSrc.indexOf("baseMode4.png")>0) {
					//$img.attr("src", _webRootPath + "/frame/menus/images/" + _stylePathPrefix + "/baseMode4_click.png");
					//$img.parent().parent().css("color", "#AAA").css("cursor","default");
				} else if (myImgSrc.indexOf("baseMode_cs")>0) {
					//$img.attr("src", _webRootPath + "/frame/menus/images/" + _stylePathPrefix + "/baseMode_noqx.png");
					//$img.parent().parent().css("color", "#DDD").css("cursor","default");
					//$img.parent().parent().children("div[class=title]").css("color", "#CCC").css("cursor","default");
					$img.parent().parent().children("div[class=title]").css("cursor","default");
				} else if (myImgSrc.indexOf("JcbaseMode43.png")>0) {
                    //$img.attr("src", _webRootPath + "/frame/menus/images/" + _stylePathPrefix + "/baseMode4_click.png");
                    //$img.parent().parent().css("color", "#AAA").css("cursor","default");

                }else if (myImgSrc.indexOf("JcbaseMode45.png")>0) {
                    //$img.attr("src", _webRootPath + "/frame/menus/images/" + _stylePathPrefix + "/baseMode4_click.png");
                    //$img.parent().parent().css("color", "#AAA").css("cursor","default");

                }
			}		
		}
	
	})

}

// 浏览器类型判断
function getOs() {   
	//alert("navigator.userAgent="+navigator.userAgent);
    var OsObject = "";   
    if(navigator.userAgent.indexOf("MSIE")>0) {   
        return "MSIE"; // IE浏览器
    }
    if(isFirefox=navigator.userAgent.indexOf("Firefox")>0) {   
        return "Firefox"; // Firefox浏览器
    }
    if(isSafari=navigator.userAgent.indexOf("Safari")>0) {   
        return "Safari"; // Safan浏览器
    }
    if(isCamino=navigator.userAgent.indexOf("Camino")>0){   
        return "Camino"; // Camino浏览器
    }
    if(isMozilla=navigator.userAgent.indexOf("Gecko/")>0){   
        return "Gecko"; // Gecko浏览器
    }   
}

function request(paras) { 
	var url = location.href; 
	var paraString = url.substring(url.indexOf("?")+1,url.length).split("&"); 
	var paraObj = {} 
	for (i = 0; j = paraString[i]; i++) { 
	    paraObj[j.substring(0,j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=")+1,j.length); 
	} 
	var returnValue = paraObj[paras.toLowerCase()]; 
	if(typeof(returnValue) == "undefined") { 
	    return ""; 
	} else { 
	    return returnValue; 
	} 
}

//  是否支持SVG
function isSVG() {
	var vgtype = window.SVGAngle || document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1") ? "SVG" : "VML";
	return vgtype == "SVG";
}