var PopMenu_MARGIN_TOP = "3px"; // 距离父对象的距离
var PopMenu_BORDER_STYLE = "1px solid red"; // div边框样式
var PopMenu_BACKGROUNDCOLOR = "#FFFFFF"; // div背景色
var PopMenu_UNIT_HEIGHT = 24; // div每行的高度
var PopMenu_Default_Width = 0;//菜单的宽度
var PopMenu_Default_Height = 24;//菜单的高度

var PopMenu_TR_OVER_COLOR = "#4F8F6D"; // 鼠标悬停时候tr的颜色
var PopMenu_TR_FONT_OVER_COLOR = "#FFFFFF"; // 鼠标悬停时候tr内字体的颜色
var PopMenu_TR_OUT_COLOR = "#4F8F22"; // 鼠标离开tr时候的颜色
var PopMenu_TR_FONT_OUT_COLOR = "#000000"; // 鼠标离开tr时候tr内字体的颜色

//var PopMenu_TR_BackgroundImage_Checked = "images/";

var COMB_DEBUG1 = false; // debug switch?1?7?1?7?0?5?0?6?0?2?1?7?1?7?0?3?1?7?1?7
var PopMenu_Exist_Flag = false;//标志是否已经有弹出的菜单
var BannerTagName = "&#8594;";
var LeftParentMenuName = "";

function PopMenu(json) {
	if(json==null)
		json = {};
    this.PopMenu_Name = json._name
    this.PopMenu_ParentMenuId = json._menuId
	this.PopMenu_DivId = json._name;
	this.PopMenu_Parent = json._parentId;//父对象
	this.PopMenu_IframeId = json._name+"Iframe";
	this.PopMenu_Width  = PopMenu_Default_Width; // div宽度
	this.PopMenu_Height = PopMenu_Default_Height; // div宽度
	this.PopMenu_Parameter = "";//json._parameter; // 额外参数
	this.PopMenu_BaseUrl    = json._basePath;
	this.PopMenu_RequestUrl = json._basePath+"taglib/PopMenuServlet.jsp"; // servlet的请求路径
	this.PopMenu_length1 = 0;
	this.PopMenu_length2 = 0;
	this.PopMenuName = new Array(); // 菜单名称
	this.PopMenuPath = new Array(); // 菜单路径
	this.PopMenuCode = new Array(); // 菜单代码
	if (document.getElementById(this.PopMenu_IframeId) != null)
		document.getElementById(this.PopMenu_IframeId).parentNode.removeChild(document.getElementById(this.PopMenu_IframeId));
	if (document.getElementById(this.PopMenu_DivId) != null)
		document.getElementById(this.PopMenu_DivId).parentNode.removeChild(document.getElementById(this.PopMenu_DivId));
	
	this.PopMenu_Color =PopMenu_BACKGROUNDCOLOR; // 背景色
	
	// onmouseover事件属性
	this.PopMenu_TrOverColor     = PopMenu_TR_OVER_COLOR; // 鼠标悬停时候tr的颜色
	this.PopMenu_TrFontOverColor = PopMenu_TR_FONT_OVER_COLOR; // 鼠标悬停时候tr内字体的颜色
	
	// onmouseout事件属性
	this.PopMenu_TrOutColor = PopMenu_TR_OUT_COLOR; // ?1?7?1?7?1?7?1?7鼠标离开tr时候的颜色
	this.PopMenu_TrFontOutColor = PopMenu_TR_FONT_OUT_COLOR; // ?1?7?1?7?1?7?1?7鼠标离开tr时候的颜色
	this.PopMenu_Max_Width = PopMenu_Default_Width;
	this.xmlDoc = null;
	this.PopMenu_Height = "";
	this.tiePopMenu_Event();
    this.show();
    //PopMenu_Exist_Flag = true;
}

/**
  * 显示窗体
  * show combBox's window
  */
PopMenu.prototype.show = function () {
	this.deleteDiv(); // 清除div delte div
	 // 清空数组 init array
    this.PopMenuPath.splice(0, this.PopMenuPath.length);
	this.PopMenuName.splice(0, this.PopMenuName.length);
	this.PopMenuCode.splice(0, this.PopMenuCode.length);
	this.filtrateXmlValueByCache(); // 加载数据到数组里面 filtrate value
	this.PopMenu_Height = this.setHeight(); // 计算高度 get height for div
	if(this.PopMenuName.length == 0)
		return null;
    this.createDiv(this.PopMenu_Parent); // 生成信息 create div
}

/**
  * ?1?7?1?7?1?7清除div
  * delete div
  */
PopMenu.prototype.deleteDiv = function() {
    if (document.getElementById(this.PopMenu_IframeId) != null) {
		document.body.removeChild(document.getElementById(this.PopMenu_IframeId));// == null;
		//document.getElementById(this.combIframeId).style.display = "none";
	}
	if (document.getElementById(this.PopMenu_DivId) != null) {
		document.body.removeChild(document.getElementById(this.PopMenu_DivId));// == null;
		//document.getElementById(this.combDivId).style.display = "none";
	}
	//PopMenu_Exist_Flag = false;
}

/**
  * 通过缓存取菜单
  * filtrate value
  */
PopMenu.prototype.filtrateXmlValueByCache = function () {
    var d1 = new Date();
    var info = kingo_usermenubean.getMenuItemsByParentID(this.PopMenu_ParentMenuId);
    var length = info.length;
    var max_length = 1;
    for(var i = 0; i < length; i++) {
        this.PopMenuPath.push(info[i].getLinkfile());
        this.PopMenuCode.push(info[i].getMenucode());
        var temp = info[i].getMenuname();
        this.PopMenuName.push(temp);
        if (temp!=null&&temp!==""&&temp.length>max_length){
            max_length = temp.length;
        }
    }
    this.PopMenu_Max_Width = max_length * 16;
    if (this.PopMenu_Max_Width<150) this.PopMenu_Max_Width = 150;
    this.PopMenu_Width = this.PopMenu_Max_Width
    if (COMB_DEBUG1) {
       //document.getElementById("time1").innerHTML = "解析XML并且过滤的性能评估：" + ((new Date()) - d1) + "毫秒";
    }
}

// 计算需要的高度?1?7?0?0?1?2?1?7
PopMenu.prototype.setHeight = function () {
	var temp = 0;
	var length = this.PopMenuName.length;
	temp = PopMenu_UNIT_HEIGHT * length+2;
	return temp + "px";
}
// 计算需要的高度?1?7?0?0?1?2?1?7
PopMenu.prototype.getHeight = function () {
	var temp = 0;
	var length = this.PopMenuName.length;
	temp = PopMenu_UNIT_HEIGHT * length;
	return temp ;
}

/**
  * 生成窗体
  * create combBox's window
  */
PopMenu.prototype.createDiv = function (o) {
    var heightmenu = this.getHeight();
	var left = 202;
	var top = o.offsetHeight;
	while(o) {
		left += o.offsetLeft || 0;
		top += o.offsetTop || 0;
		o = o.offsetParent;
	}
	var width = window.innerWidth || document.body.clientWidth;
	if(width - left < this.PopMenu_Width) {
			left = left - this.PopMenu_Width-12;
	}
		
	var height = window.innerHeight || document.body.clientHeight;
	if (height - top <heightmenu) {
		if (top<heightmenu) {//如果弹出的菜单往上都放不了就
		      top =  2;
		}else{
		    top = top - heightmenu-2;
		}
	}else{
	    top = top - parseInt(this.PopMenu_Parent.offsetHeight,10);//this.PopMenu_Parent.offsetHeight这个是弹出的那个三角形高度
	}
	left += "px";
	top += "px";
	if(window.navigator.userAgent.indexOf("MSIE 6.0") > -1) {
		o = document.createElement("iframe");
		o.setAttribute("id", this.PopMenu_IframeId);
		//o.style.marginTop = COMB_MARGIN_TOP;
		o.style.position = "absolute";
		o.style.width = this.PopMenu_Width;
		o.style.height = this.PopMenu_Height;
		o.style.left = left;
		o.style.top = top;
		o.border = "0";
		o.style.display = "block";
		o.style.border = "0px solid black";
		o.style.filter = "alpha(opacity=0)";
		o.style.zIndex = "9998";
		document.body.appendChild(o);
	};

	o = document.createElement("div");
	o.setAttribute("id", this.PopMenu_DivId);
	//o.style.marginTop = COMB_MARGIN_TOP;
	o.style.position = "absolute";
	o.style.width = this.PopMenu_Width;
	o.style.height = this.PopMenu_Height;
	o.style.left = left;
	o.style.top = top;
	o.style.display = "block";
	//o.style.border = COMB_BORDER_STYLE;
	o.style.backgroundColor = this.PopMenu_BACKGROUNDCOLOR;
	o.style.zIndex = "9999";
	o.innerHTML = this.setDiv();
	document.body.appendChild(o);
}



// div值
PopMenu.prototype.setDiv = function () {
    var d1 = new Date();
	var divInfo = "";
	var _path = "";
	var url_base = this.PopMenu_BaseUrl.substr(0,this.PopMenu_BaseUrl.length-1);
	if (this.PopMenuName.length > 0) {
		var length = this.PopMenuName.length;
		if (COMB_DEBUG1) {
		    //document.getElementById("count").innerHTML = "数据个数：" + length;
		}
		divInfo = "<div onmouseout=\"setPopMenuDivOutEvent(this,event)\" ";
		divInfo += " class=\"popmenu_div\" style=\"width:"+this.PopMenu_Width+"; height:"+this.PopMenu_Height+";\">";
		divInfo += "<table class=\"popmenu_table\" cellpadding=\"0\" cellspacing=\"0\">";
		for (var i = 0; i < length; i++) {
			divInfo += "<tr id=\""+this.PopMenu_DivId+i+"\" value=\""+this.PopMenu_DivId+i+"\"";
			divInfo += " onmouseover=\"setPopMenuTrOverEvent(this,event, '"+this.PopMenu_Name+"')\"";
			divInfo += " onmouseout=\"setPopMenuTrOutEvent(this,event,'"+this.PopMenu_Name+"')\" class=\"td_child_menu\"";
			if (this.PopMenuPath[i].indexOf("http://")!=-1||this.PopMenuPath[i].indexOf("https://")!=-1)//这个地方是为了数据字典那样的有全路径的菜单特殊处理
			   _path = this.PopMenuPath[i];
			else
			   _path = url_base+this.PopMenuPath[i];
			divInfo += " onclick=\"OpenWindowByUrl(event,this,'"+this.PopMenuName[i]+"','"+_path+"','"+this.PopMenu_Name+"','"+this.PopMenuCode[i]+"')\">";
			divInfo += "<td id=\""+this.PopMenu_DivId+i+"_name\"  style=\"text-align:left;padding-left:12px;;height:"+PopMenu_UNIT_HEIGHT+"px\">"+this.PopMenuName[i]+"</td>";
			divInfo += "</tr>";
		}
		divInfo +="</table>";
		divInfo += "</div>";
	}
	if (COMB_DEBUG1) {
	   // document.getElementById("time2").innerHTML = "生成表示层的性能评估：" + ((new Date()) - d1) + "毫秒";
	}
	return divInfo;
}



// ?1?7?1?9?1?7摧毁div
PopMenu.prototype.destory = function() {
	if (document.activeElement.id != this.PopMenu_Parent 
	    && document.activeElement.id.indexOf(this.PopMenu_DivId) == -1 
	    && this.isMouseOut(getEvent())) {
		this.deleteDiv();
	}
}

// 判断非IE
PopMenu.prototype.isIe = function() {
	var iePos = navigator.userAgent.indexOf("MSIE");
	if(iePos == -1)
		return false;
	else
		return true;
}

// 判断鼠标是否在div之外?0?8?1?7?1?7
PopMenu.prototype.isMouseOut = function(e) {
	// 获得div的左上角坐标和右下角坐标
	var obj = document.getElementById(this.PopMenu_DivId);
	if (obj == null)
		return true;
	var PLeft = 0;
	var PTop = 0;
	var PRight = 0;
	var PBottom = 0;
	var objWidth = obj.offsetWidth;
	var objHeight = obj.offsetHeight;
	if(this.isIe) {
		while (obj){
			PLeft += obj.offsetLeft || 0;
			PTop += obj.offsetTop || 0;
			obj = obj.parentNode;
		}
	} else {
		PLeft += obj.offsetLeft;
		PTop += obj.offsetTop;
	}
	PRight = PLeft+objWidth;
	PBottom = PTop+objHeight;
	// 获得鼠标当前的坐标
	e = window.event ? window.event : e;
	var mouse_x = e.clientX;
	var mouse_y = e.clientY;
	//alert(mouse_x+"<>"+mouse_y+"<>"+PLeft+"<>"+PTop+"<>"+PRight+"<>"+PBottom);
	if (mouse_x < PLeft || mouse_x > PRight || mouse_y < PTop || mouse_y > PBottom)
		return true;
	else
		return false;
}




// tie event to combBox's parent
  PopMenu.prototype.tiePopMenu_Event = function () {
    var obj = this;
	var body = document.getElementsByTagName("body")[0];
	if(body.addEventListener){
		body.addEventListener("click", destoryPopMenu, false);
	} else {
		body.attachEvent("onclick", destoryPopMenu);
	}
	
	/**
	  * 摧毁combBox
	  * destory combBox
	  */
	function destoryPopMenu() {
	    if (obj) {
	        obj.destory();
	    }
	}
}

// tr的onmouseover事件?1?7?0?4?1?7
function setPopMenuTrOverEvent(obj,e, combObjectName) {
	//obj.style.backgroundColor = eval(combObjectName+".PopMenu_TrOverColor");
	//obj.style.color = eval(combObjectName+".PopMenu_TrFontOverColor");
	obj.className = "td_child_menu_mouseover";
	e = e ? e : window.event;//阻止冒泡，阻止冒泡到div的onclick上去了
	e.stopPropagation ? e.stopPropagation() : (e.cancelBubble = true);
}

// tr的onmouseout事件?1?7?0?4?1?7
function setPopMenuTrOutEvent(obj,e, combObjectName) {
	//obj.style.backgroundColor = eval(combObjectName+".PopMenu_TrOutColor");
	//obj.style.color = eval(combObjectName+".PopMenu_TrFontOutColor");
	obj.className= "td_child_menu";
	e = e ? e : window.event;//阻止冒泡，阻止冒泡到div的onclick上去了
	e.stopPropagation ? e.stopPropagation() : (e.cancelBubble = true);
}
// div的onmouseout事件为了销毁div
function setPopMenuDivOutEvent(obj, e) {
	 destoryPopMenuWhenNoAction();
	 e = e ? e : window.event;//阻止冒泡，阻止冒泡到div的onclick上去了
	 e.stopPropagation ? e.stopPropagation() : (e.cancelBubble = true);
}

// 给父对象赋值
function OpenWindowByUrl(e,obj,menuItemName,menuItemPath, popMenuName,menuItemCode) {
    obj.classname = "td_child_menu_mouseover";
    var pageUrl = menuItemPath;
    if (pageUrl.indexOf("#")>-1) {alert("未设置对应菜单("+menuItemCode+")的页面地址！"+pageUrl); return;};
	showPage(menuItemName,menuItemCode,pageUrl);//打开最终的页面
	e = e ? e : window.event;//阻止冒泡，阻止冒泡到div的onclick上去了
	e.stopPropagation ? e.stopPropagation() : (e.cancelBubble = true);
	eval(popMenuName+".deleteDiv()");//这是把那个弹出的菜单消逝
}

//显示对应地址的页面
function showPage(pageTitle,menucode,pageUrl){
	// alert(">> LeftPopMenu::00::showPage()::pageTitle,menucode,pageUrl = " + pageTitle + "/" + menucode + "/" + pageUrl + "/schoolCode="+_schoolCode);
	// 是否流程图文件, 如果是流程图文件并且学校代码不是00000,则调用相应学校的流程图文件
	// 每个学校建有单独的以学校代码为子目录的流程图文件夹
	/** 此部分需求调整测试中
	if ("00000" != _schoolCode) {
		var isFlowjsp = new String(pageUrl).indexOf("/frame/menus/");
		if(isFlowjsp){
			pageUrl = new String(pageUrl).replace("/frame/menus/"+_schoolCode+"/", "/frame/menus/");
			pageUrl = new String(pageUrl).replace("/frame/menus/", "/frame/menus/"+_schoolCode+"/");
		}	
	}
	*/
	
	//if ("JW19" == menucode || "JW1219" == menucode || "JW1319" == menucode){ 
		// 转到实践教学子系统(2015.06.26日河南大学实践教学集成)
		//showSjjx(pageTitle,menucode,pageUrl);
		
	//} else {
	
		// 追加menucode的请求参数
	    if (pageUrl.indexOf('menucode=')==-1){//?????????????????带测试看看有问题没
	        if (pageUrl.indexOf('?')==-1)
	          pageUrl = pageUrl+"?menucode="+menucode;//为了后面加载的时候得到子节点
	        else
	          pageUrl = pageUrl+"&menucode="+menucode;
	    }
    
		// 是否支持SVG(矢量线的显示)
		var issvg = isSVG();
		if (issvg){
			//alert("LeftPopMenu.issvg="+issvg);
			if (pageUrl.indexOf(menucode+".jsp")>-1 && pageUrl.indexOf("SVG"+menucode+".jsp")==-1){
				pageUrl = pageUrl.replace(menucode+".jsp", "SVG"+menucode+".jsp");
				//alert("LeftPopMenu.pageUrl="+pageUrl);
			}
		}    
		
		if (typeof eval("parent.isVersion20") === "function"){
	    	if (parent.isVersion20()) {
	    		// V20版本
	    		parent.NormalPageOpenByMenucode(menucode);
	    		return ;
	    	}
    	}
    
	    var newHref = "<a style=\"text-decoration : none;\" href=\"javascript:void(0)\" menucode='"+menucode+"' onclick=\"parent.showPage('"+pageTitle+"','"+menucode+"','"+pageUrl+"')\" >"+pageTitle+"</a>";
	    if (LeftParentMenuName!="")
	      newHref = "<a  style=\"text-decoration : none;\" href=\"javascript:void(0)\" menucode='"+menucode+"' onclick=\"parent.showPage('"+LeftParentMenuName+"("+pageTitle+")','"+menucode+"','"+pageUrl+"')\" >"+LeftParentMenuName+"("+pageTitle+")</a>";
	    LeftParentMenuName = "";//一定要记得在这个地方把标志清空
	    displayOnBanner(menucode,pageTitle,newHref,pageUrl);
	    
		var _isFrameExisted = isFrameExisted4Flowchart("frmDesk") ;
	    if (_isFrameExisted) {
	    	//window.frames("frmDesk").location.replace(pageUrl);
	    	window.document.getElementById("frmDesk").contentWindow.location.replace(pageUrl);
	    } else {
	    	//parent.window.frames("frmDesk").location.replace(pageUrl);
	    	parent.window.document.getElementById("frmDesk").contentWindow.location.replace(pageUrl);
		}	    	

	//}
}

//  是否支持SVG
function isSVG() {
	var vgtype = window.SVGAngle || document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1") ? "SVG" : "VML";
	return vgtype == "SVG";
}

function showSjjx(pageTitle,menucode,pageUrl){
	// 通过cookie传递来源系统和账号信息
	var from = encodeURIComponent("appjw");
	var uname = encodeURIComponent(_kingo_loginid);
	var utype = encodeURIComponent(_kingo_usertype);
	var roles = encodeURIComponent(_kingo_rolecodes);
	//alert("_webRootPath="+_kingo_http_port+"/_kingo_context_path="+_kingo_context_path);
	//alert("from="+from+"/uname="+uname+"/utype="+utype+"/roles="+roles);	
	addCookie("from",from,1);
	addCookie("uname",uname,1);
	addCookie("utype",utype,1);
	addCookie("roles",roles,1);
	//addCookie("token",token,1);
	// 转到配置的实践教学主页面,并完成自动登录
	var url = _kingo_http_port + new String(pageUrl).replace(_kingo_context_path,"");
	window.open(url);
}

//处理导航栏的显示
function displayOnBanner(newmenucode,newTitle,newHref,pageUrl){
	//var prefix = "&nbsp;&#24403;&#21069;&#20301;&#32622;&#65306;";  //汉字[当前位置：]的unicode码
	var prefix = "&nbsp;&#20027;&#25511;&#30028;&#38754;";  //汉字[主控界面：]的unicode码
	// window.frames['frmDesk'].location.replace(_contextPath+"/frame14/menus/JW91.jsp");
	prefix = "<a href='javascript:void(0);' onclick=\"parent.showMain();\">"+prefix+"</a>";
    var banner_direction = getBanner_direction_obj(); // 当前操作提示
    
    var inner = banner_direction.innerHTML;
    if (inner=="") return prefix+"\u2192"+newHref;
    //if (newmenucode.length==2) return "&nbsp;当前位置："+newHref;//这是当点击是为管理人员或者为科研服务人员的时候
    var islevel1 = newmenucode.length<=2 &&
    				( 
    				   new String(newmenucode).indexOf("0") > -1 
    				|| new String(newmenucode).indexOf("T") > -1  // 教师应用
    				|| new String(newmenucode).indexOf("S") > -1  // 学生应用
    				)
    				;  // JW下的第一级菜单
	if ( islevel1 
		 || pageUrl.indexOf("teacherstudentmenu.jsp")>-1   // 为教职工提供的服务 和 为学生提供的服务 
	){
		banner_direction.innerHTML = prefix+"\u2192"+newHref;
	} else {
	    var oldhrefs = banner_direction.getElementsByTagName("a");
	    //var result_href = [""+prefix+""]; // 汉字[当前位置：]的unicode码
	    var result_href = []; // 汉字[当前位置：]的unicode码
	    for (var i=0;i<oldhrefs.length;i++){
	       var href = oldhrefs[i].getAttribute("menucode");
	       //if (newmenucode.indexOf(href)!=-1&&newmenucode!=href){
	       if (newmenucode!=href){
	       	   var outer = oldhrefs[i].outerHTML;
	       	   var iscontain = (new String(outer).indexOf("parent.showMain()") > -1) ;
	           result_href.push(outer);
	           //if (!iscontain)  //全部追加分隔符
		           result_href.push(BannerTagName);  // 追加模块与子模块之间的分隔符
	       }else{
	          break;
	       }
	    }
	   result_href.push(newHref);
	   
	   if (new String(result_href.join("")).indexOf("parent.showMain()") > -1){ // 包含有“主控界面”前缀
	     banner_direction.innerHTML = result_href.join("");   
	   }else{
	     banner_direction.innerHTML = prefix+"\u2192"+result_href.join("");   
	   }
   }
   
   // 显示加关注信息
   showBannerAttentionTips(newmenucode, newTitle);
   
   var _isFrameExisted = isFrameExisted4Flowchart("frmTool") ;
   if (_isFrameExisted) {
   	  	kingo_list_normal_use_menuitem.setNewNormalItem(pageUrl,banner_direction.innerHTML,newTitle,newmenucode);
   } else {
      	parent.kingo_list_normal_use_menuitem.setNewNormalItem(pageUrl,banner_direction.innerHTML,newTitle,newmenucode);
   }
}	

// 显示加关注信息
function showBannerAttentionTips(newmenucode, newTitle){
	//var attention = "&#43;&#20851;&#27880;"; //汉字[+关注]的unicode码
    var attention = "<img src='../frame14/img/nav/appraise.png' title='&#20851;&#27880;' style='border:0px;width:20px;height:20px;margin-bottom:2px;'></img>"; //汉字[+关注]的unicode码
    var appraise = "<img src='../frame14/img/nav/focus.png' title='\u8bc4\u4ef7' style='border:0px;width:20px;height:20px;margin-bottom:5px;'></img>"; //汉字[+评价]的unicode码
    var banner_attention = getBanner_attention_obj(); // 加关注
    // 加关注,addMyservice方法位于Main_tools.jsp中
    if (banner_attention){
        var attinfo = "<span style='float:right' id='sp_define'><a id='a_define' href='javascript:void(0);' onclick='addMyservice(\""+newmenucode+"\",\""+newTitle+"\")'>"+attention+"</a>";
        attinfo += "&ensp;&ensp;<a id='a_appraise' href='javascript:void(0);' onclick='appraiseMyservice(\""+newmenucode+"\",\""+newTitle+"\")'>"+appraise+"</a></span>";
        banner_attention.innerHTML = attinfo;
    }
    var url = _webRootPath + "/frame/menu/isMyservice.action";
    if(_webRootPath!=""){
        if(_webRootPath.substr(_webRootPath.length-1,1)=="/"){
            url = _webRootPath + "frame/menu/isMyservice.action";
        }
        else{
            url = _webRootPath + "/frame/menu/isMyservice.action";
        }
    }
    else{
        //url = "../../frame/menu/isMyservice.action";
	}

    var params = "hidKey="+newmenucode;
    jQuery.ajax({
        type: "POST",
        url: url,
        data: params,
        dataType: "text",
        success: showMyservice
    })
	/*
	var attention = "<img src='../frame14/img/nav/focus.png' title='&#20851;&#27880;' style='border:0px;'></img>"; //汉字[+关注]的unicode码
	var appraise = "<img src='../frame14/img/nav/appraise.png' title='\u8bc4\u4ef7' style='border:0px;width:20px;height:20px'></img>"; //汉字[+评价]的unicode码
    var banner_attention = getBanner_attention_obj(); // 加关注
   // 加关注,addMyservice方法位于Main_tools.jsp中
   if (banner_attention){
   	  var attinfo = "<span style='float:right' ><a  href='javascript:void(0);' onclick='addMyservice(\""+newmenucode+"\",\""+newTitle+"\")'>"+attention+"</a>";
   	  attinfo += "&ensp;&ensp;<a  href='javascript:void(0);' onclick='appraiseMyservice(\""+newmenucode+"\",\""+newTitle+"\")'>"+appraise+"</a></span>";
   	  banner_attention.innerHTML = attinfo;
   }
   */
}
function showMyservice(response) {
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
        var banner_attention = getBanner_attention_obj(); // 加关注
        if (banner_attention){
            banner_attention.innerHTML = attinfo;
        }

    }
}
// 当前操作导航信息提示区(并显示该区域)
function getBanner_direction_obj(){
    var banner_direction ;
    var _isFrameExisted = isFrameExisted4Flowchart("frmTool") ;
    if (_isFrameExisted) {
	    banner_direction = window.document.getElementById("frmTool").contentWindow.document.getElementById("banner_direction");
	    if (window.document.getElementById("frmTool_info")){
		    window.document.getElementById("frmTool_info").style.display = "";
		}
	} else  {
	    banner_direction = parent.window.document.getElementById("frmTool").contentWindow.document.getElementById("banner_direction");
	    if (parent.window.document.getElementById("frmTool_info")){
	    	parent.window.document.getElementById("frmTool_info").style.display = "";
	    }
	}
	return banner_direction ;
}

// 加关注提示区
function getBanner_attention_obj(){
    var banner_attention ;
    var _isFrameExisted = isFrameExisted4Flowchart("frmTool") ;
    if (_isFrameExisted) {
	    banner_attention = window.document.getElementById("frmTool").contentWindow.document.getElementById("banner_attention");
	} else  {
	    banner_attention = parent.window.document.getElementById("frmTool").contentWindow.document.getElementById("banner_attention");
	}
	return banner_attention ;
}

// (流程图页面)判断frame对象是否存在，不存在则引用父窗口中的frame
function isFrameExisted4Flowchart(frameName){
	try{
		window.document.getElementById(frameName).contentWindow.document;
		return true ;
	}catch(e){
		return false;
	}
}
	
// 浏览器类型判断
function getOs() {   
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

/**
  * 去掉字符串的左右空格
  * delete left and right space
  */
String.prototype.Trim = function() {
    return this.replace(/(^\s*)|(\s*$)/g,'');
}

/**
  * 获得当前的event
  * get event this page
  */
function getEvent() {
    if(window.event)
        return window.event;
    // arguments 该对象代表正在执行的函数和调用它的函数的参数
    // callee 属性 返回正被执行的 Function 对象
    // caller 返回一个对函数的引用，该函数调用了当前函数
    var f = arguments.callee;
    while(caller = f.caller) {
        f = f.caller;
    }
    return f.arguments[0];
}

//**********************************************常用功能增加的东西*********************************
//**********************************************\--------------/*********************************
//**********************************************常用功能增加的东西*********************************
//常用的菜单的项对象
function NormalUseMenuBean(){
   this.menucode = "";
   this.bannerHTML = "";//点击后在导航栏显示的内容
   this.menuname = "";
   this.pageUrl = "";//点击要打开的路径
   this.currenthit = "0"; // 是否当前点击
}
 NormalUseMenuBean.prototype.setMenucode= function(menucode){
   this.menucode = menucode;
}
 NormalUseMenuBean.prototype.getMenucode= function(){
   return this.menucode ;
}
 NormalUseMenuBean.prototype.setBannerHTML= function(bannerHTML){
   this.bannerHTML = bannerHTML;
}
 NormalUseMenuBean.prototype.getBannerHTML= function(){
    return this.bannerHTML ;
}
 NormalUseMenuBean.prototype.setMenuname= function(menuname){
   this.menuname = menuname;
}
 NormalUseMenuBean.prototype.getMenuname= function(){
    return this.menuname ;
}
 NormalUseMenuBean.prototype.setPageUrl= function(pageUrl){
   this.pageUrl = pageUrl;
}
 NormalUseMenuBean.prototype.getPageUrl= function(){
    return this.pageUrl ;
}
 NormalUseMenuBean.prototype.setCurrenthit= function(currenthit){
	   this.currenthit = currenthit;
}
 NormalUseMenuBean.prototype.getCurrenthit= function(){
    return this.currenthit ;
}
 
//常用功能的包容对象-----这里还要处理删除的对象不然会越来越大
function NormalUseMenuBeanList(){
    this.normalMenuList = new Array();
}

//全局变量存储信息
//var kingo_list_normal_use_menuitem = new NormalUseMenuBeanList();
//var kingo_list_normal_count = 5;//常用功能最多显示的个数

// 初始化加载最近使用功能，并显示出来
// add 2011-11-23 
NormalUseMenuBeanList.prototype.init = function() {
    var url = _webRootPath + "/frame/normalusemenu/getNormalUseMenus.action";
    if(_webRootPath!=""){
        if(_webRootPath.substr(_webRootPath.length-1,1)=="/"){
            url = _webRootPath + "frame/normalusemenu/getNormalUseMenus.action";
        }
        else{
            url = _webRootPath + "/frame/normalusemenu/getNormalUseMenus.action";
        }
    }
    else{
        //url = "../../frame/normalusemenu/getNormalUseMenus.action";
	}
	var myarray = [];  // 接收最近使用功能的数组，ajax回调中不能使用类属性
    jQuery.ajax({
 		type: "POST",
 		url: url,
 		data: {}, 
 		dataType: "json",
 		async: false,  // 同步执行 
 		success: function(data) {
	 	   	var rows = data;
			$.each(rows, function(i) {
				var row = rows[i];
		    	var pageUrl = row['pageUrl'],
			    	bannerTitle = row['bannerTitle'],
			    	menuCode = row['menuCode'],
			    	menuName = row['menuName'];
				//alert("pageUrl/menuCode/menuName = " + pageUrl + "/" + menuCode + "/" + menuName);
				//alert("bannerTitle = " + bannerTitle);
				var obj = new NormalUseMenuBean();
				obj.setPageUrl(pageUrl);
				obj.setMenucode(menuCode);
				obj.setMenuname(menuName);
				obj.setBannerHTML(bannerTitle);
				obj.setCurrenthit("0");
				myarray.push(obj);
			}); 	   		
 		}
 	})
 	// 赋值给类变量
 	this.normalMenuList = myarray ;
    // 显示结果
    this.displayOnPage();
}

/**
 * 获取当前使用功能菜单数组
 * @return
 */
NormalUseMenuBeanList.prototype.getCurrentNormalUseMenus = function() {
 	return this.normalMenuList ;
}

//存储条目点击后需要在导航栏显示的信息，这里是因为不能直接把这个值放到a的标签里面的缘故
//这个方法是调用的接口
NormalUseMenuBeanList.prototype.setNewNormalItem = function(pageUrl,oldbannerHtml,menuname,menucode){

   //alert(">> setNewNormalItem::pageUrl/oldbannerHtml/menuname/menucode = " + pageUrl + "/" + oldbannerHtml + "/" + menuname + "/" + menucode);
   //if (menucode.length<=6) return;//只显示那些具体的页面菜单
   // 是否有效的业务功能模块(页面路径中不包含有/menus/)
   var isValidJWPT = pageUrl.length > 0 && (pageUrl.indexOf("/menus/")!=-1);
   if (isValidJWPT){
      return ;
   }   
   
   var newnormalMenuList = new Array();
   
   var obj = new NormalUseMenuBean(); // 当前点击菜单项赋值
   obj.setPageUrl(pageUrl);
   obj.setMenucode(menucode);
   obj.setMenuname(menuname);
   obj.setBannerHTML(oldbannerHtml);
   obj.setCurrenthit("1");
   
   if (this.normalMenuList.length<1){
      this.normalMenuList.push(obj);
   }else{
       var  bool = false;
       for (var i=0;i<this.normalMenuList.length;i++){
           var temp = this.normalMenuList[i];
           if (temp.getMenucode()!=menucode){//过滤掉已经有的
               newnormalMenuList.push(temp);
           }
       }
       this.normalMenuList.splice(0,this.normalMenuList.length);//清空数据
       var length = newnormalMenuList.length;//取前面的kingo_list_normal_count个
       if (length>kingo_list_normal_count-1) {
          length = kingo_list_normal_count-1;
       }
	   this.normalMenuList.push(obj); //把新的加到第一
       for (var i=0;i<length;i++){//
           this.normalMenuList.push(newnormalMenuList[i]);
       }
   }
   this.displayOnPage();//显示结果
   //屏蔽 2012-11-01 改为批量提交保存
   this.saveToDB(pageUrl,oldbannerHtml,menuname,menucode); // 持久化[最近常用功能]
   
}

// 清空内存区域的最近使用功能列表，并刷新显示区
NormalUseMenuBeanList.prototype.clear = function() {
	this.normalMenuList = new Array();
	this.displayOnPage();
}

// 持久化[最近常用功能]  add 2011-11-23   
NormalUseMenuBeanList.prototype.saveToDB = function(pageUrl,oldbannerHtml,menuname,menucode){
	   var url = _webRootPath + "/frame/normalusemenu/saveNormalUseMenu.action";
    if(_webRootPath!=""){
        if(_webRootPath.substr(_webRootPath.length-1,1)=="/"){
            url = _webRootPath + "frame/normalusemenu/saveNormalUseMenu.action";
        }
        else{
            url = _webRootPath + "/frame/normalusemenu/saveNormalUseMenu.action";
        }
    }
    else{
        //url = "../../frame/normalusemenu/saveNormalUseMenu.action";
    }
	   var params = {
			   		 "normalUseMenu.pageUrl":base64.encode64(pageUrl),
			   		 "normalUseMenu.bannerTitle":base64.encode64(oldbannerHtml), 
			   		 "normalUseMenu.menuCode":base64.encode64(menucode), 
			   		 "normalUseMenu.menuName":base64.encode64(menuname)
	   				}
	   jQuery.ajax({
			type: "POST",
			url: url,
			data: params, 
			dataType: "text",
			success: function(data) {
		   		// @to-do nothing
		   		// alert(data);
			}
		})	   
}

NormalUseMenuBeanList.prototype.displayOnPage = function(){
     var result_href = [''];
     var normal_td = document.getElementById("normal_use_menu");
     if (this.normalMenuList.length>0){
      var length = this.normalMenuList.length;
      for (var i=0;i<length;i++){
          var objItem = this.normalMenuList[i];
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
    }
    normal_td.innerHTML = result_href.join("");
}

//常用功能的点击事件根据菜单的代码要显示的信
function NormalPageOpenByMenucode(menucode){
     var oldbannerHtml = "";
     var pageUrl = "";
     for (var i=0;i<kingo_list_normal_use_menuitem.normalMenuList.length;i++){
           var temp = kingo_list_normal_use_menuitem.normalMenuList[i];
           if (temp.getMenucode()==menucode){//如果里面有了
              oldbannerHtml = temp.getBannerHTML();
              pageUrl = temp.getPageUrl();
              break;
           }
       }
   var banner_direction = window.frames["frmTool"].document.getElementById("banner_direction");
   banner_direction.innerHTML = oldbannerHtml;
   window.frmDesk.location.replace(pageUrl);
}
//***********************************************************************************************

	/**
	* 添加cookie
	* objName  -- cookie名称
	* objValue -- cookie值
	* objHours -- cookie过期时间
	*/	
	function addCookie(objName,objValue,objHours){      
	    var str = objName + "=" + escape(objValue);
        var domain = document.domain ;
	    if(objHours > 0){                               //如果不设定过期时间，浏览器关闭时cookie自动消失
	        var date = new Date();
	        var ms = objHours*3600*1000;
	        date.setTime(date.getTime() + ms);
	        str += "; expires=" + date.toGMTString() + ";path=/;domain="+domain;  // path,domain-跨域cookie设置，同一站点下不同应用的共享cookie
	   }
	   parent.document.cookie = str;
	}	
	
	/**
	* 取cookies函数       
	*/
	function getCookie(name)
	{
	    var arr = parent.document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
		if(arr != null) return unescape(arr[2]); return null;
	}
			
	/**
	* 删除cookie
	*/		
	function delCookie(name)
	{
		var domain = document.domain ;	
	    var exp = new Date();
	    exp.setTime(exp.getTime() - 1);
	    var cval=getCookie(name);
	    if(cval!=null) document.cookie= name + "="+cval+";expires="+exp.toGMTString() + ";path=/;domain="+domain;;
	}				
	