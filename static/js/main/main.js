//-----------------------------
//			 公用
//-----------------------------

var loadLoading = true;		//是否加载过滤效果
var AppRoot = _webRootPath;
var _debug_Mode = false;

//顶层标志
var PageRootName = "top";
var PageRootFlag = "";
function getPageRootFlag () {
	return PageRootFlag;
}
function setPageRootFlag(pageRootName) {
	PageRootFlag = pageRootName;
}
function getWindowPageRoot (this_window) {
	while (this_window && this_window.getPageRootFlag () != PageRootName) {
		this_window = this_window.parent;
	}
	return this_window;
}

//	主框架加载
var loadingObjs = new Array();
function MyOnload() {
	loadingObjs.push(Loading('main'));
	checkUserLoginInfo();
	myOnload();
}

//	子页面加载后的响应
function loadMessage(iframeName){
	myLoadMessage(iframeName);
}

//	显示首页
function showMainPage() {
	if(loadingObjs[0])
			loadingObjs[0].open();
		_openIframe('bodyFrame' , "./frame/mainbody.html");
}

//	设置用户登录信息
var loginUserId = "";
function checkUserLoginInfo() {
	loginUserId = "webmaster";
	setUserLoginState(false);
}
var mainFrmUserLogined = false;	//用户是否登录标志
function isLogin(){
	return mainFrmUserLogined;
}
function setUserLoginState(bl){
	if(typeof(bl) == "boolean")
		mainFrmUserLogined = bl;
}
//	登录后进入管理页面标志
var loginService = false;
function setLoginService(bl){
	if(typeof(bl) == "boolean")
		loginService = bl;
}
function isLoginService(){
	return loginService;
}

function $(name) {
	if(typeof(name) == "string")
		return document.getElementById(name);
	else {
		alertMessageBox('101' , "document.getElementBy(" + name + ")");
		return null;
	}
}

//	弹出页面
function openwin(url,name,top , left ,width,height , resizable , scrollbars,  status, toolbar , menubar , location)
{
	var Resizable = resizable || 'no';
	var Scrollbars = scrollbars || 'no';
	var Status = status || 'no';
	var Toolbar = toolbar || 'no';
	var Menubar = menubar || 'no';
	var Location = location || 'no';
	var newWindow;
	var _top = top || (window.screen.availHeight-height)/2;
	var _left = left || (window.screen.availWidth-width)/2;
	newWindow=window.open(url,name,"width="+width+",height="+height+",resizable="+Resizable+",scrollbars="+Scrollbars+",status="+Status+",toolbar="+Toolbar+",menubar="+Menubar+",location="+Location);
	try{
		newWindow.moveTo(_left,_top);
	}catch(e){
	}
	return newWindow;
}

var _debug = AppRoot + "js/main/main.js\n";
function alertMessageBox(erroCode , msg){
	if(_debug_Mode && erroCode && typeof(erroCode) == "number"){
		switch (erroCode) {
			case 101 : alert(_debug + "\u83B7\u53D6\u5BF9\u8C61id\u9519\u8BEF"); break;  //标签id  登录框获取img标签id错误  code=101
			case 201 : alert(_debug + " [debug]\n\t" + msg); break;	//用于debug
			case 301 : alert(window.location.href + " [debug]\n\t" + msg); break; //功能debug
		}
	}
}

//单击表头（更多）
function titleOnclick(tableId , obj){
	selectedLink('CMore' , '' , tableId);
}
//单击图片组
function photoGroupOnclick(link , target , attr){
	return selectedLink(link , '' , '99999');
}
//单击内容区超链接

function selectedLink(src , trNum , tableId){
	var paras = "&type=";
	if(tableId == "10"){					//实习日记
		paras += "CPracticeDiary";//"practicediary";
	} else if(tableId == "131") {		//实践周日记
		paras += "CPracticeWeekDiary";//"practiceweekdiary";
	} else if(tableId == "401") {		//实践周日记
		paras += "CWorkSay";//"practiceweekdiary";
	} else if(tableId == "193") {		//项目交流
		paras += "CCommunicate";//"Communicate";
	} else if(tableId == "82"){				//竞赛结果
		paras += "CCupList";//"cuplist";
	} else if(tableId == "17"){				//基地风采
		paras += "CBaseSight";//"CBaseSight";
	} else if(tableId == "80") {				//作品展示
		paras += "CParticipativeWorks";//"participativeworks";
	} else if(tableId == "7"){				//文件制度
		paras += "CBylaw";//"bylaw";
	} else if(tableId == "99999"){			//图片组
		paras += "CPhotoGroup";//"photogroup";
	} else if(tableId == "224"){			//图片组
		paras += "CPracticeStu";//"社会实践优秀学生";
	} else if(tableId == "355"){			//图片组
		paras += "CPracticeDiary_DG";//"顶岗实习日志";
	} else {								// 默认
		paras += "CCommon";//"";
	}
	if(src == 'CMore') {
		paras = "&type=CMore";
		src += tableId;
	}
	try{return viewContent(src , paras);}catch(e){}
	//alert(src);
}


//
/** 展示内容
*	id	: 内容id
*	type : 内容类别
*/
function viewContent(id , type){
	return openwin(AppRoot + 'MainFrm.html?id=' + id + type , '' , 10 , 0 , window.screen.availWidth , window.screen.availHeight - 40 , null,'yes',null,null,null,null);
}

/** 弹出页面
*	根目录下   /src
*/
function newSourceWindow(src , name) {
	return openwin(AppRoot + src , name , window.screen.availHeight/4 , 0 , window.screen.availWidth , window.screen.availHeight/2 , null,'yes',null,null,null,null);
}

/** 新全屏窗口
*/
function newFullWindow(src){
	return openwin(AppRoot + src , '' , 10 , 0 , window.screen.availWidth , window.screen.availHeight - 40 , null,'yes',null,null,null,null);
}

//-----------------------------
//			区域
//-----------------------------
//	工具区
function _mouseInTool (obj){
	var flag = obj.getAttribute("flag");
	if(flag != "1") {
		obj.style.fontSize = "120%";
		obj.style.color = "#005BAA";
		obj.style.backgroundColor = "#DAD8D9";
	}
}

function _mouseOutTool(obj) {
	var flag = obj.getAttribute("flag");
	if(flag != "1") {
		obj.style.fontSize = "110%";
		obj.style.color = "white";
		obj.style.backgroundColor = "";
	}
}

function _clickTool(obj) {
	if(obj){
		obj.setAttribute("flag" , "1");
		obj.style.backgroundColor = "white";
		_removeFlag(obj.getAttribute("name"));
		var serverName = obj.getAttribute("name");
		var url = "about:blank";
		switch (serverName) {
			case "0" :	//首页
				 url = './frame/mainbody.html'; break;	//打开首页
			case "1" :	//基地建设
				if(isLogin()){	// 已登录
					 url = './pub/jdjs.html'; 	//
				}
				else  url = './pub/jdjs.html'; break;
			case "2" :	//顶岗实习
				if(isLogin()){	// 已登录
					 url = './pub/dgsx.html'; 	//
				}
				else  url = './pub/dgsx.html'; break;
			case "3" :	//专业实习
				if(isLogin()){	// 已登录
					 url = './pub/zysx.html'; 	//
				}
				else  url = './pub/zysx.html'; break;
			case "4" :	//社会实践
				if(isLogin()){	// 已登录
					 url = './pub/shsj.html'; 	//
				}
				else  url = './pub/shsj.html'; break;
			case "5" :	//毕业论文
				if(isLogin()){	// 已登录
					 url = './pub/bylw.html'; 	//
				}
				else  url = './pub/bylw.html'; break;
			case "6" :	//学科竞赛
				if(isLogin()){	// 已登录
					 url = './pub/xkjs.html'; 	//
				}
				else  url = './pub/xkjs.html'; break;
			case "7" :	//大学生科研项目
				if(isLogin()){	// 已登录
					 url = './pub/dxskyxm.html'; 	//
				}
				else  url = './pub/dxskyxm.html'; break;
			case "8" :	//实验室建设
				if(isLogin()){	// 已登录
					 url = './pub/sysjs.html'; 	//
				}
				else  url = './pub/sysjs.html'; break;
			case "9" :	//实践周
				if(isLogin()){	// 已登录
					 url = './pub/sjz.html'; 	//
				}
				else  url = './pub/sjz.html'; break;	
		}
		setLoginService(false);	//用户离开管理页面 标志
		if(loadingObjs[0])
			loadingObjs[0].open();
		_openIframe('bodyFrame' , url);
	}
}

function _clickTool_(obj) {
	if(obj){
		obj.setAttribute("flag" , "1");
		obj.style.backgroundColor = "white";
		_removeFlag(obj.getAttribute("name"));
		var serverName = obj.getAttribute("name");
		var url = "about:blank";
		switch (serverName) {
			case "0" :	//首页
				 url = './mainbody.html'; break;	//打开首页
			case "1" :	//基地建设
				if(isLogin()){	// 已登录
					 url = '../pub/jdjs.html'; 	//
				}
				else  url = '../pub/jdjs.html'; break;
			case "2" :	//顶岗实习
				if(isLogin()){	// 已登录
					 url = '../pub/dgsx.html'; 	//
				}
				else  url = '../pub/dgsx.html'; break;
			case "3" :	//专业实习
				if(isLogin()){	// 已登录
					 url = '../pub/zysx.html'; 	//
				}
				else  url = '../pub/zysx.html'; break;
			case "4" :	//社会实践
				if(isLogin()){	// 已登录
					 url = '../pub/shsj.html'; 	//
				}
				else  url = '../pub/shsj.html'; break;
			case "5" :	//毕业论文
				if(isLogin()){	// 已登录
					 url = '../pub/bylw.html'; 	//
				}
				else  url = '../pub/bylw.html'; break;
			case "6" :	//学科竞赛
				if(isLogin()){	// 已登录
					 url = '../pub/xkjs.html'; 	//
				}
				else  url = '../pub/xkjs.html'; break;
			case "7" :	//大学生科研项目
				if(isLogin()){	// 已登录
					 url = '../pub/dxskyxm.html'; 	//
				}
				else  url = '../pub/dxskyxm.html'; break;
			case "8" :	//实验室建设
				if(isLogin()){	// 已登录
					 url = '../pub/sysjs.html'; 	//
				}
				else  url = '../pub/sysjs.html'; break;
			case "9" :	//实践周
				if(isLogin()){	// 已登录
					 url = '../pub/sjz.html'; 	//
				}
				else  url = '../pub/sjz.html'; break;	
		}
		setLoginService(false);	//用户离开管理页面 标志
		_openIframe_('bodyFrame' , url);
	}
}

function _removeFlag(name){
	var tds = document.getElementsByTagName("td");
	if(tds) {
		for(i = 0 ; i < tds.length; i++){
			if(tds[i].getAttribute("name") != null && tds[i].getAttribute("name") != name) {
				tds[i].setAttribute("flag" , "0");
				tds[i].style.backgroundColor = "";
				tds[i].style.color = "white";
				tds[i].style.fontSize = "100%";
			}
		}
	}
}

//	内容区
	//	打开iframe
function openIframe(name , src) {
	switch(name) {
		case "left": _openIframe('leftFrame' , src); break;
		case "center": _openIframe('centerFrame' , src); break;
		case "right": _openIframe('rightFrame' , src); break;
	}
}

function _openIframe(iframeName , src){
	if(typeof(src) == "string" && typeof(iframeName) == "string" ){
		$(iframeName).src = src;
	}
}

function _openIframe_(iframeName , src){
	if(typeof(src) == "string" && typeof(iframeName) == "string" ){
		$("inmain").innerHTML = "<iframe id='bodyFrame' name='bodyFrame' width='100%' height='100%' src='' frameborder='0' scrolling='no' ></iframe>";
		$(iframeName).src = src;
	}
}


//----------------------------- 登录框 -------------------------------
//	刷新验证码
function refreshRandImg(imgId){
	if(typeof(imgId) == "string") {
		$(imgId).style.display = "";
		$(imgId).src = AppRoot + "imagerandomcheckedcodeservlet?dateTime=" + (new Date().getTime());
	}
}

//	捕获回车键登录
function gologin(e , obj){
	var e = window.event?window.event:e;
	var x=e.keyCode;
	if(x!=13) return false;
	if(x<48||x>57) e.returnValue=false;
	obj.select();
	document.getElementById("loginBtn").onclick();
}



//--------------------------------- 公共 --------------------------------------
function isIE(){
	var iePos = navigator.userAgent.indexOf("MSIE");
		if(iePos == -1) return false;//不是IE
		else return true;
}

var lockSelectValue = "";

function lockSelect (selectId) {
	if(selectId != null && selectId != "" && typeof($(selectId)) == "object" &&  ($(selectId).nodeName == "select" || $(selectId).nodeName == "SELECT")) {
		var slt = $(selectId);
		slt.onclick = function () {lockSelectValue = slt.value;};
		slt.onchange = function () {slt.value = lockSelectValue;};
	} else {
		alertMessageBox(201 , '\n未找到id为 ' + selectId + ' 的select组件!\n');
	}
}

function unLockSelect (selectId) {
	if(selectId != null && selectId != "" && typeof($(selectId)) == "object" && ($(selectId).nodeName == "select" || $(selectId).nodeName == "SELECT")) {
		var slt = $(selectId);
		slt.onclick = function () {};
		slt.onchange = function () {};
	} else {
		alertMessageBox(201 , '\n未找到id为 ' + selectId + ' 的select组件!\n');
	}
}


/** 获取window.location.href "?" 参数值 (_,a-z,A-Z,0-9)适合函数名
*	parameterName	: 参数名称
*/
function publicIframeGetHrefParameter(parameterName){
	if(typeof(parameterName) == "string") {
		var regularexpression = new RegExp( parameterName + "=([a-z,A-Z,_,0-9]*)&?","g"); 	// i 忽略大小写标志; g 全文搜索;
		if(window.location.href.split("?")[1]){
			var parameterValue = regularexpression.exec(window.location.href.split("?")[1]);
			if(parameterValue){
				if(parameterValue[1])
				return parameterValue[1];
			}
		}
	}
	return null;
}

/** 获取window.location.href "?" 参数值 (包含Unicode 汉字)
*	parameterName	: 参数名称
*/
function publicIframeGetHrefParameterUnicode(parameterName){
	if(typeof(parameterName) == "string") {
		var regularexpression = new RegExp( parameterName + "=([\u4e00-\ud7a3,0-9,a-z,A-Z,.,_]*)","g"); 	// i 忽略大小写标志; g 全文搜索;
		if(window.location.href.split("?")[1]){
			var parameterValue = regularexpression.exec(window.location.href.split("?")[1]);
			if(parameterValue){
				if(parameterValue[1])
				return parameterValue[1];
			}
		}
	}
	return null;
}


//------------------------------ 加载过度效果 -----------------------------------
function Loading (statusId) {
	var wait = new Object();
	var clientHeight = scrollTop = 0;
	wait.isIE = isIE();
	wait.width = "0";
	wait.height = "0";
	
	var p = document.getElementById(statusId);
	if(p){
		wait.width = p.offsetWidth==0?p.style.width:p.offsetWidth;
		wait.height = p.offsetHeight==0?p.style.height:p.offsetHeight;
		
		var Pleft = 0;
		var Ptop = 0;
		if(wait.isIE)
			while (p){
				Pleft += p.offsetLeft || 0;
				Ptop += p.offsetTop || 0;
				p = p.parentNode;
			}
		else {
			Pleft = p.offsetLeft;
			Ptop = p.offsetTop;
		}
		wait.top = Ptop;
		wait.left = Pleft;
	}
	wait.statusId == null;

	wait.init = function () {
		if(document.getElementById(statusId + "apdwait")) {
			wait.statusId = document.getElementById(statusId + "apdwait");
		} else {
			var _zindex = "9999";
			var iframeDiv = null;
			//if(isIE()){
			//		iframeDiv = document.createElement("DIV");
			//		iframeDiv.setAttribute("name" , statusId + "apdwait");
			//	}else 
			//		iframeDiv = document.createElement("<DIV NAME=\""+statusId + "apdwait\"></DIV>");
			iframeDiv = document.createElement("DIV");
			iframeDiv.setAttribute("name" , statusId + "apdwait");
			iframeDiv.style.position = 'absolute';
			iframeDiv.className = "iframediv";
			iframeDiv.id = statusId + "apdwait";
			iframeDiv.style.top = wait.top;
			iframeDiv.style.left = wait.left;
			iframeDiv.style.width = wait.width;
			iframeDiv.style.height = wait.height;
			
			iframeDiv.style.textAlign = "center";
			iframeDiv.style.lineHeight = iframeDiv.style.height;
			//iframeDiv.style.border = "1px solid red";
			iframeDiv.style.zIndex = _zindex==null?"10000":_zindex;
			var ifm =  document.createElement("iframe");
			ifm.frameBorder = "0";
			ifm.marginHeight = "0";
			ifm.marginWidth = "0";
			ifm.hspace = "0";
			ifm.vspace = "0";
			ifm.scrolling = "no";
			ifm.style.width = iframeDiv.offsetWidth==0?iframeDiv.style.width:iframeDiv.offsetWidth;
			ifm.style.height = iframeDiv.offsetHeight==0?iframeDiv.style.height:iframeDiv.offsetHeight;
			ifm.name = ifm.uniqueID;
			ifm.id = ifm.name;
			ifm.src= AppRoot + "js/sjjx/systembusy.html";
			iframeDiv.innerHTML = "";
			iframeDiv.appendChild(ifm);
			document.body.appendChild(iframeDiv);
			iframeDiv.style.display = "none";		
			wait.statusId = iframeDiv;
		}
	};
	
	wait.open = function () {
		if(loadLoading){
			if(!wait.statusId)
				this.init();
			if(wait.isIE)
				wait.statusId.style.filter = "alpha(opacity = 100)";
			else wait.statusId.style.MozOpacity = "0.9";
			wait.statusId.style.display = "";
		}
	};
	
	var closeTimes = 9;
	wait.close = function () {
		if(loadLoading){
			if(wait.statusId){
				closeTimes -= 2;
				if(closeTimes > 0){
					if(wait.isIE)
						wait.statusId.style.filter = "alpha(opacity = "+closeTimes+"0)";
					else 
						wait.statusId.style.MozOpacity = "0." + closeTimes;
					setTimeout(arguments.callee,50);
				}else {
					wait.statusId.style.display = "none";
					closeTimes = 10;
					wait.statusId = null;
				}
			}
		}
	};
	
	return wait;
}
//------------------------------ end 加载过度效果 -----------------------------------

//--------------------------------------------------------
//						xml参数解析						 |
//--------------------------------------------------------

var xmlParameterType = new Array("zysxnjxnxq","zysx_xnxq","zysx_nj","sys_bynj", "kyxm_xnxq", "kyxm_nj", "xkjs_xnxq", "xkjs_nj" , "dgsxnjxnxq" , "dgsx_xnxq" , "dgsx_nj", "xmnd_nd", "shsj_xnxq", "shsj_nj","zhsj_xnxq","zhsj_nj");
function getDateTitles (type) {
	var arr = new Array();
	switch(type) {
		case "zysxnjxnxq" :
			arr.push("nj");arr.push("xn"); arr.push("xq"); break;	//学年学期 xml结构 对应 页面id
		case "dgsxnjxnxq" :
			arr.push("nj");arr.push("xn"); arr.push("xq"); break;	//学年学期 xml结构 对应 页面id
		case "zysx_xnxq" :
			arr.push("zysx_xn"); arr.push("zysx_xq"); break;	//学年学期 xml结构 对应 页面id
		case "dgsx_xnxq" :
			arr.push("dgsx_xn"); arr.push("dgsx_xq"); break;	//学年学期 xml结构 对应 页面id
		case "zhsj_xnxq" :
			arr.push("zhsj_xn"); arr.push("zhsj_xq"); break;	//学年学期 xml结构 对应 页面id
		case "zysx_nj" :
			arr.push("nj"); break;	//系统设置 毕业年届
		case "zhsj_nj" :
			arr.push("nj"); break;	//系统设置 毕业年届
		case "dgsx_nj" :
			arr.push("nj"); break;	//系统设置 顶岗实习
		case "kyxm_xnxq" :
			arr.push("kyxm_xn"); arr.push("kyxm_xq"); break;	//学年学期 xml结构 对应 页面id
		case "xkjs_nj" :
			arr.push("nj"); break;	//系统设置 毕业年届
		case "xkjs_xnxq" :
			arr.push("xkjs_xn"); arr.push("xkjs_xq"); break;	//学年学期 xml结构 对应 页面id
		case "kyxm_nj" :
			arr.push("nj"); break;	//系统设置 毕业年届
		case "sys_bynj" :
			arr.push("bynj"); break;	//系统设置 毕业年届
		case "xmnd_nd" :
			arr.push("nd"); break;	//科研项目 项目年度
		case "shsj_xnxq" :
			arr.push("shsj_xn"); arr.push("shsj_xq"); break;	//学年学期 xml结构 对应 页面id
		case "shsj_nj" :
			arr.push("nj"); break;	//年级 xml结构 对应 页面id
	}
	if(arr.length == 0) {
		//自定义
		try {arr = getCustomDateTitles(type);} catch(e) {alertMessageBox(201 , e.description + "\n\nabstract function getCustomDateTitles(" + type + "){\n\t\t\t//ToDo;\n\t}");}
	}
	return arr;
}

//得到节点值
function getText(oNode) {
    var sText = "";
    for (var i = 0; i < oNode.childNodes.length; i++) {
       if (oNode.childNodes[i].hasChildNodes()) {
           sText += getText(oNode.childNodes[i]);
       } else {
       		sText += oNode.childNodes[i].nodeValue;
       }
    }
  //  sText = sText.replace("[CDATA[","");
 //   sText = sText.replace("]]","");
    return sText;
}

//还原xml值
function setValueByXml(DataTitleType , xml){
	var arr = getDateTitles(DataTitleType);
	if(arr != null && xml.xml != ""){
		//var e = isIE() ? 1 : 1;
		//var _e = e == 1 ? 0 : 1;
		recs = xml.getElementsByTagName("xmlpars")[0].getElementsByTagName(DataTitleType);
		for(i = 0 ; i < arr.length ; i++){
			try{
				if($(arr[i])) $(arr[i]).value = getText(recs[0].childNodes[i]);
			}catch(e) {
				alertMessageBox(201 , "Exception : " + e.description + "\n\n[" + arr[i] + "] is not available!\n\ncoursed by xml childNode value <[" + arr[i] + "]>[value]</[" + arr[i] + "]/>");
			}
			try {
				if($(arr[i] + "copy")) $(arr[i] + "copy").value = getText(recs[0].childNodes[i]);
			}catch(e) {
				alertMessageBox(201 , "Exception : " + e.description + "\n\n[" + arr[i] + "] is not available!\n\ncoursed by xml childNode value <[" + arr[i] + "copy]>[value]</[" + arr[i] + "copy]/>");
			}
		}
	} else {
		alertMessageBox(201 , "setValueByXml null value");
	}
}

//获得xml参数

function mainGetXmlParameter(type , xml){
	if(typeof(type) == "number"){
		setValueByXml(xmlParameterType[type] , xml);
	} else if(typeof(type) == "string") {
		setValueByXml(type , xml);
	}
}


