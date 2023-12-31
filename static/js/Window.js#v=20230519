Array.prototype.contains = function(item){
    for(i=0;i<this.length;i++){
        if(this[i]==item){return true;}
    }
    return false;
};

//以下三处js、图片和css的路径为默认路径，如果在使用中路径与此处不一致可修改或动态设置
var _iWinID = 0;		//对象的ID,标识一个对象
var _jsPath="../js/";	//js路径
var _imagesPath = "../images/";//图片路径
var __curzindex=2000;//当前zindex
var _popWindowCssPath;

// 动态加载CSS
var __file_initlist="" 
function MyAppendFile(fn, fid){
	var el;
	var ft='js';
	if (fn.indexOf('.css')!=-1) ft='css';

	if (ft=="css"){
   		el=document.createElement("link");
   		el.setAttribute("id",fid);
   		el.setAttribute("rel", "stylesheet");
   		el.setAttribute("type", "text/css");  
   		el.setAttribute("href", fn);
	}else{
   		el=document.createElement("script");
   		el.setAttribute("id",fid);
   		el.setAttribute("type","text/javascript");
   		el.setAttribute("src", fn);
	}

	if (typeof(el)!="undefined"){
    		if (__file_initlist.indexOf("["+fn+"]")==-1){
    		document.getElementsByTagName("head")[0].appendChild(el);
		__file_initlist+="["+fn+"]";
		}
	}
}

//js获取项目根路径，如： http://localhost:8083/uimcardprj
function testGetRootPath(){
    //获取当前网址，如： http://localhost:8083/uimcardprj/share/meun.jsp
    var curWwwPath=window.document.location.href;
	console.log("curWwwPath::"+curWwwPath);
    //获取主机地址之后的目录，如： uimcardprj/share/meun.jsp
    var pathName=window.document.location.pathname;
	console.log("pathName::"+pathName);
    var pos=curWwwPath.indexOf(pathName);
	console.log("pos::"+pos);
    //获取主机地址，如： http://localhost:8083
    var localhostPaht=curWwwPath.substring(0,pos);
	console.log("localhostPaht::"+localhostPaht);
    //获取带"/"的项目名，如：/uimcardprj
    var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);
	console.log("projectName::"+projectName);
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
		,'kbbp','KindEditor','kssw','kycg','jycg','kyfw','kyjf','kyjg','kykp','kyqk','kyxm','kyzy'
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

function loadThem() {
    var xmlReq;
    
    if (window.XMLHttpRequest) {
		xmlReq = new XMLHttpRequest();
	} else {
		var prefixes = ["MSXML2", "Microsoft", "MSXML", "MSXML3"];
		for (var i = 0; i < prefixes.length; i = i + 1) {
			try {
				xmlReq= new ActiveXObject(prefixes[i] + ".XmlHttp");
			} catch (ex) {
			}
		}
	}
    
    
    /*if (window.ActiveXObject) {
		xmlReq = new ActiveXObject("Microsoft.XMLHTTP");
	} else {
		if (window.XMLHttpRequest) {
			xmlReq = new XMLHttpRequest();
		}
	}*/
	var href = window.location.href.split("/"); // 2011-09-22clu新增,处理jsp下相对路径不对的问题
	//var href2 = href[0]+"//"+href[1]+href[2]+"/"+href[3]; // 2011-09-22clu新增,处理jsp下相对路径不对的问题
    //*var href2 = href[0]+"//"+href[1]+href[2]+(href[3] != "fjzyyjw" ? "" : "/"+href[3]); // 2013-04-25clu临时处理当项目在root.war下路径错误问题，因为是写死了所以不通用待进一步完善。
	//xmlReq.open("POST", "../theme/themeservlet?p=getPopPath",true);
	var href2 = getWebRootPath();
	//alert(href2+"/theme/themeservlet?p=getPopPath");
	xmlReq.open("POST", href2+"/theme/themeservlet?p=getPopPath",true);
	xmlReq.send(null);
	xmlReq.onreadystatechange=function() {
		if(xmlReq.readyState == 4) {
			if(xmlReq.status == 200) {
				//alert("0");
				_popWindowCssPath = xmlReq.responseText;
			    //MyAppendFile("../"+_popWindowCssPath,"cssKWin");
			    MyAppendFile(href2+"/"+_popWindowCssPath,"cssKWin");
			}
		}
	}
}
loadThem();
//window.setTimeout("loadThem()",500);
/**
 * 弹出窗口控件
 */
//MyAppendFile("../css/ctl_popwinc.css","cssKWin");

_page_scripts=null;
function getJsPath_(){
	var _page_scripts=document.getElementsByTagName("script");
	var xh=-1;
	var path = "";
	while(_page_scripts.length>(xh+1)&&path==""){
		xh++;
		if(_page_scripts[xh].src.indexOf("/")==-1)//如果该js位于当前目录下，则循环下一个
			continue;
		path = _page_scripts[xh].src.substring(0,_page_scripts[xh].src.lastIndexOf("/")+1);
		if(path=="./"){//如果路径为"./"也表示当前路径，则循环下一个
			path = "";
		}
	}
	return path;
}

function getImagesPath_(){
	if(_jsPath.indexOf('js/')!=-1){
	return _jsPath.replace('js/','images/');
	}else return 'images/';
}

function CKWindow(json){
	if(json==null)
		json = {};
	this.Title = json._title || ""; //标题
	this.tWidth = json._width || '780px';//宽度
	this.tHeight = json._height || '440px';//高度
	// 宽度和高度如果为百分比，则转化为整数像素
	if (this.tWidth.indexOf("%")>-1){
		var bWidth = document.body.clientWidth ;
		this.tWidth = Math.floor( bWidth * parseInt(this.tWidth.replace("%","")) / 100 ) ;
	}
	if (this.tHeight.indexOf("%")>-1){
		var bHeight = document.body.clientHeight ;
		this.tHeight = Math.floor( bHeight * parseInt(this.tHeight.replace("%","")) / 100 ) ;
	}		
	this.documentobj = json._document || document;
	this.tTop = json._top || (this.documentobj.body.clientHeight-(this.tHeight.replace("px","")))/2+this.documentobj.body.scrollTop;
	this.tLeft = json._left || (this.documentobj.body.clientWidth-(this.tWidth.replace("px","")))/2+this.documentobj.body.scrollLeft;
	this.IsStop = json._isStop == null?true:json._isStop;//是否启用遮罩
	this.IsMove = json._isMove == null?true:json._isMove;//是否可移动
    this.imgClose = json._imgClose == null?true:json._imgClose;//是否可关闭
	this.imgsrc = json._imgsrc == null?_imagesPath:json._imgsrc;//图片路径
	this.zindex = json._zindex == null?(__curzindex+100):json._zindex;
	this.closeFunc = json._closeFunc == null?null:json._closeFunc;
	__curzindex = this.zindex;
	this.func = json._func;
	this.isClose = false;
	this.isCloseOrHid = json._isCloseOrHid == null?true:json._isCloseOrHid;//设置当点击关闭按钮时是关闭窗口还是隐藏窗口
	this.ID = _iWinID++;
	if(this.IsStop){
		this._showMask();//启用遮罩
	}else
		this.createIframeDiv();
}
/**
 * 创建一个窗口,该窗口是隐藏的
 */
CKWindow.prototype.createWindow = function(){

	var htmlDiv = this.documentobj.createElement("DIV");//创建一个浮动的div窗口
	htmlDiv.id = "CKWindowContainer";
	htmlDiv.name = "CKWindowContainer";
	htmlDiv.className = "addValue";
	htmlDiv.style.display = "none";
	htmlDiv.style.height = this.tHeight;
	htmlDiv.style.width = this.tWidth;
	htmlDiv.style.top = this.tTop;
	htmlDiv.style.left = this.tLeft;
	htmlDiv.style.zIndex = this.zindex;
	htmlDiv.style.position = 'absolute';
	//htmlDiv.style.border="0px";
	var hdlDiv = this.documentobj.createElement("DIV");//创建窗口的标题栏
	hdlDiv.className = "hdl";
	hdlDiv.style.width = "100%";
	//hdlDiv.style.border="1px solid black";
	//hdlDiv.style.borderBottom="0px solid black";
	hdlDiv.style.border="0px solid #CCC";
	hdlDiv.style.borderBottom="0px solid #CCC";
	if(this.IsMove){//设置移动事件
		hdlDiv.onmouseup = function(){endMove();};
		hdlDiv.onmouseover = function(){changecursor(this);};
		hdlDiv.onmousemove = function(){moveIt()};
		hdlDiv.setAttribute('ifmdivid',this.ifmDiv.id);
		hdlDiv.setAttribute('body',this.documentobj.body);
		if(this.IsStop)//需要遮照,则设置让遮罩不会跟随浮动层一起移动
		    hdlDiv.onmousedown = function(){initMove(this,this.getAttribute('body'))};
		else
			hdlDiv.onmousedown = function(){initMove(this,this.getAttribute('body'),document.getElementById(this.getAttribute('ifmdivid')))};
	}
	var titleDiv = this.documentobj.createElement("DIV");
	titleDiv.innerHTML = "<span id='sp_title'><strong>&nbsp;"+this.Title+"</strong><span>";//设置标题
	titleDiv.style.width = (parseInt(htmlDiv.style.width)-35)+"px";//
	titleDiv.style.height = "24px";
	titleDiv.style.cssFloat = "left";
	titleDiv.style.styleFloat = "left";
	var imgDiv = this.documentobj.createElement("DIV");//标题栏中的关闭图标
	var img = this.documentobj.createElement("IMG");
	//img.src = this.imgsrc+"popwin_delete.jpg";
	img.src = this.imgsrc+"popwin_delete.png";
	img.onmouseover = function(){this.style.cursor='default';};
	img.alt = "关闭";
	img.setAttribute('ID',this.ID);
	img.setAttribute('func',this.func);
	if(this.isCloseOrHid)
		img.onclick = function(){getCKWindow(this.ID==null?this.getAttribute("ID"):this.ID).closeWindow(this.getAttribute("func")==null?this.getAttribute("func"):this.getAttribute("func"));};
	else
	  	img.onclick = function(){getCKWindow(this.ID==null?this.getAttribute("ID"):this.ID).hiddenWindow()};
	imgDiv.style.cssFloat = "right";
	imgDiv.style.styleFloat = "right";
	imgDiv.style.marginTop = "3px";
	if (isSVG()){
		imgDiv.style.marginRight = "5px";  // 10px --> 5px
	} else {
		imgDiv.style.marginRight = "0px";
	}
	if(this.imgClose==true){
        imgDiv.style.display="";
	}
	else{
        imgDiv.style.display="none";
	}
	imgDiv.appendChild(img);
	hdlDiv.appendChild(titleDiv);
	hdlDiv.appendChild(imgDiv);
	htmlDiv.appendChild(hdlDiv);
	this.loadDivOrIframe(htmlDiv);
	this.documentobj.body.appendChild(htmlDiv);
	this.hDiv = htmlDiv;
    objarray.push(this);//将自身对象加入到数据组中,用于删除对象
}

//在窗口显示前重新调整窗口的宽度和高度
CKWindow.prototype.adjustDiv = function(){
	if(parseInt(this.hDiv.clientWidth)!= parseInt(this.hDiv.style.width)){
	    //	this.hDiv.childNodes[0].style.width = this.hDiv.clientWidth;
	    	this.hDiv.childNodes[0].childNodes[0].style.width = (parseInt(this.hDiv.clientWidth)-25)+"px";
	}
	if(!this.IsStop){//如果没有启用遮罩,则将遮罩层缩小到和浮动div一样大小
		this.ifmDiv.style.top = this.tTop;
		this.ifmDiv.style.left = this.tLeft;
		this.ifmDiv.style.width = this.tWidth;
		this.ifmDiv.style.height = this.tHeight;
		if(parseInt(this.ifmDiv.style.width)!=parseInt(this.hDiv.clientWidth)){
			this.ifmDiv.childNodes[0].style.width = this.hDiv.clientWidth+2+"px";
		}
		if(parseInt(this.ifmDiv.style.height)!=parseInt(this.hDiv.clientHeight)){
			this.ifmDiv.childNodes[0].style.height = this.hDiv.clientHeight+2+"px";
		}
  }
}

var objarray=new Array();

/**
 * 打开一个窗口,先创建一个隐藏的窗口再显示它
 */
CKWindow.prototype.openWindow = function (){
	this.createWindow();
	this.showWindow();
}
//加载窗口
CKWindow.prototype.showModalDialog = function(json){
	
	var ev = SearchEvent();
	this.Title = json._title || this.title;
	this.tWidth = json._width || this.tWidth;
	this.tHeight = json._height || this.tHeight;
	this.tTop = json._top || ev.y || ev.pageY;
	this.tLeft = json._left || ev.x || ev.pageX;
	this.IsStop = json._isStop==null?this.IsStop:json._isStop;
	this.IsMove = json._isMove==null?this.IsMove:json._isMove;
	this.imgsrc = json._imgsrc || this.imgsrc || "images/";
	this.func = json._func || this.func;
	this.setSrc(json._src,this.tWidth,this.tHeight,json._scroll);
	this.openWindow();
}
/**
 * 加载页面要显示的信息
 */
CKWindow.prototype.loadDivOrIframe = function(div){
   if(this.dataDiv!=null){
	  div.appendChild(this.dataDiv);
   }else if(this.tiframe!=null){
      div.appendChild(this.tiframe);
   }
}
/**
 * 关闭窗口
 */
CKWindow.prototype.closeWindow = function (__fun){
	if(this.closeFunc){
		if(typeof this.closeFunc=="function"){
			this.closeFunc();
		}else{
			try{
				eval(this.closeFunc+"()");
			}catch(e){}
		}
	}
	if(__fun){
		if(typeof __fun=="function"){
			__fun();
		}else{
			try{
				eval(__fun+"()");
			}catch(e){}
		}
	}
//	this.ifmDiv.removeChild(this.ifmDiv.childNodes[0]);//移除遮罩中的iframe
	this.ifmDiv.style.display = 'none';
	this.hDiv.style.display = 'none';
//	while(this.hDiv.childNodes.length>0)//移除窗口的所有子节点
//		this.hDiv.removeChild(this.hDiv.childNodes[0]);
	this.documentobj.body.removeChild(this.hDiv);//移除窗口
	this.documentobj.body.removeChild(this.ifmDiv);//移除遮罩
	this.ifmDiv = null;
	this.hDiv = null;
	__curzindex -= 100;
	this.isClose = true;//标识窗口已关闭
	for(var i=0;i<objarray.length;i++){
		if(objarray[i]!=null&&objarray[i].ID==this.ID){
			delete window.objarray[i];
			delete objarray[i];
			objarray[i] = null;
			break;
		}
	}
	if (navigator.appVersion.indexOf("MSIE")>=0) {
		CollectGarbage();
	}
}
/**
 * 隐藏窗口
 */
CKWindow.prototype.hiddenWindow = function(){
	this.ifmDiv.style.display = "none";
	this.hDiv.style.display = "none";
}
/**
 * 显示窗口
 */
CKWindow.prototype.showWindow = function(){
	this.ifmDiv.style.display = "block";
	this.hDiv.style.display = "block";
	this.adjustDiv();
}

/**
 * 通过CKWindow的ID得到相应的对象
 */
function getCKWindow(oid){
	for(var i=0;i<objarray.length;i++){
		if(objarray[i]!=null&&objarray[i].ID==oid){
			return objarray[i];
		}
	}
	return null;
}

/**
 * 创建一个frame遮罩，用iframe主要是为了遮住select
 */
CKWindow.prototype.onloadIframe = function(div){
	var ifm =  this.documentobj.createElement("iframe");
    ifm.setAttribute('frameBorder', 0); 
    ifm.style.cssText = 'border: 0 none;'; 
	ifm.marginheight = "0";
	ifm.marginwidth = "0";
	ifm.hspace = "0";
	ifm.vspace = "0";
	ifm.scrolling = "no";
	ifm.style.width = div.offsetWidth==0?div.style.width:div.offsetWidth;
	ifm.style.height = div.offsetHeight==0?div.style.height:div.offsetHeight;
	//div.innerHTML = "";
	div.appendChild(ifm);
}

/**
 * 创建一个div,置于浮动窗口下面，用于遮住select
 */
CKWindow.prototype.createIframeDiv = function (){
	var iframeDiv = this.documentobj.createElement("DIV");
	iframeDiv.style.position = 'absolute';
//	iframeDiv.className = "iframediv";
	iframeDiv.style.display = "none";
	iframeDiv.style.top = this.tTop;
	iframeDiv.style.left = this.tLeft;
	iframeDiv.style.width = this.tWidth;
	iframeDiv.style.height = this.tHeight;
	iframeDiv.style.zIndex = (this.zindex-50)||"2100";
	iframeDiv.style.backgroundColor = 'white';
	iframeDiv.style.filter = "alpha(opacity = 100)";
	iframeDiv.id = iframeDiv.uniqueID;
	this.documentobj.body.appendChild(iframeDiv);
	this.ifmDiv = iframeDiv;
	this.onloadIframe(iframeDiv);
}

//创建遮罩层
CKWindow.prototype._showMask = function(_zindex){
	var iframeDiv = this.documentobj.createElement("DIV");
	iframeDiv.style.position = 'absolute';
	iframeDiv.className = "iframediv";
	iframeDiv.id = "bigmask";
	iframeDiv.name = "bigmask";
	iframeDiv.style.display = "none";
	iframeDiv.style.top = '0px';
	iframeDiv.style.left = '0px';
	iframeDiv.style.zIndex = (this.zindex-50)||"2100";
	var myheight = this.documentobj.body.scrollHeight;//默认为滚动高度
	if(this.documentobj.body.clientHeight>myheight)//如果没有滚动条则设为clientHeight
		myheight = this.documentobj.body.clientHeight;
	var mywidth = this.documentobj.body.scrollWidth;
	if(this.documentobj.body.clientWidth>mywidth)
		mywidth = this.documentobj.body.clientWidth;
	iframeDiv.style.width = mywidth+"px";
	iframeDiv.style.height = myheight+"px";
	this.documentobj.body.appendChild(iframeDiv);
	this.ifmDiv = iframeDiv;
	this.onloadIframe(iframeDiv);
}
/**
 * 设置一段html代码作为填充对象
 */
CKWindow.prototype.setHTML = function (html){
	this.dataDiv = this.documentobj.createElement("DIV");//创建一个DIV,用于填充用户的html
	this.dataDiv.innerHTML = html;
}

CKWindow.prototype.getHTML = function(){
	return this.dataDiv.innerHTML;
}

/**
 * 设置一个页面地址填充到iframe中
 */
CKWindow.prototype.setSrc = function (hsrc,_width,_height,_scroll){
  this.tiframe = this.documentobj.createElement("iframe");
  this.tiframe.src = hsrc;
  var fname = "frame"+(new Date().getTime());
  this.tiframe.id = fname;
  this.tiframe.name = fname;
  //this.tiframe.style.border="1px solid black";
  //this.tiframe.style.borderTop="1px solid gray";
  this.tiframe.style.border="0px none #ccc";
  if(_width!=null)
	  try {
		  if(_width.indexOf("%")==-1){//如果是width是像素，取较大的作为窗口的width
			  var _w=parseInt(_width.slice(0,_width.length-2))-parseInt(this.tWidth.slice(0,this.tWidth.length-2));
			  if(_w>0){
				  this.tWidth=_width;
			  }
		  }
		} catch (ex) {};
      this.tiframe.width = "100%";//_width;//保证和头部的width是一样的
  
  if(_height!=null){
      this.tiframe.height = _height;
  }
  // 2019-11-11
  if (new String(this.tWidth).indexOf("px")>-1){
	this.tWidth = new String(this.tWidth).replace("px","")
  }
  if (new String(this.tHeight).indexOf("px")>-1){
	 this.tHeight = new String(this.tHeight).replace("px","")
  }	  
  if (this.tWidth>300) {
  	this.tiframe.width = this.tWidth+"px";
  	this.tWidth = parseInt(this.tWidth);
  } else {
  	this.tiframe.width = this.tWidth+"px";
  	this.tWidth = parseInt(this.tWidth);
  }
  if (this.tHeight>240) {
  	 this.tiframe.height = this.tHeight+"px";
  	 this.tHeight = parseInt(this.tHeight)+30;
  } else {  	 
  	 this.tiframe.height = this.tHeight+"px";
  	 this.tHeight = parseInt(this.tHeight)+30;
  }
  
  if(_scroll!=null) { //设置滚动条属性,分别为on,yes,auto
      this.tiframe.scrolling = _scroll;
  } else {
  	  this.tiframe.scrolling = "auto";
  }
  this.tiframe.frameborder="0";
}

/**************处理DIV的移动***************/
var isDrag = false;
var oldX=0,oldY=0;
var handl,pNode,ifmNode;

/**
 * 改变鼠标样式
 */
function changecursor(obj){
	obj.style.cursor = "move";
}

/**
 * 初使化参数,参数分别为事件、标题行DIV、当前移动DIV的父结点、当前移动DIV下面的遮罩层
 */
function initMove(ohdl,oparentNode,oifmNode){
    var ev = SearchEvent();
    isDrag=true;
    oldX=ev.x||ev.pageX;
    oldY=ev.y||ev.pageY;
    handl = ohdl;
    pNode = oparentNode;
    ifmNode = oifmNode;
    if(handl.setCapture)handl.setCapture();
}
/**
 * 结束移动
 */
function endMove(){
	moveIt();
    isDrag=false;
    handl.releaseCapture();
    if(document.releaseCapture) document.releaseCapture();
}

/**
 * 移动浮动的DIV
 */
function moveIt(){
    if(isDrag){
    	var ev = SearchEvent();
	    var x = ev.x||ev.pageX;
	    var y = ev.y||ev.pageY;
	    var newleft = parseInt(handl.parentNode.offsetLeft) + (x - oldX);//div将要移动到的x坐标
	    var newtop = parseInt(handl.parentNode.offsetTop) + (y - oldY);//div将要移动到的y坐标
	    if(newleft<1)
	        newleft=1;
	    if(newtop<1)
	        newtop=1;
	    if(newleft>(pNode.scrollWidth-handl.clientWidth-5))
	        newleft = pNode.scrollWidth-handl.clientWidth-5;
	    if(newtop>(pNode.scrollHeight-handl.parentNode.clientHeight-3))
	        newtop = pNode.scrollHeight-handl.parentNode.clientHeight-3;
	    if(isNaN(newleft)||isNaN(newtop))
	        return;
	    //控制div在body内移动
	    handl.parentNode.style.left = newleft+"px";
	    handl.parentNode.style.top = newtop+"px";
	    if(ifmNode!=null){
	        ifmNode.style.left = newleft+"px";
	        ifmNode.style.top = newtop+"px";
	    }
	    oldX = x;
	    oldY = y;
    }
}
/**
 * 获取当前事件
 */
function SearchEvent(){
  //IE
   if(document.all){
  	if(window.event)
    	return window.event;
    else
    	return parent.window.event;
  }
  //firefox
  func=SearchEvent.caller;
  while(func!=null)
  {
    var arg0=func.arguments[0];
    if(arg0)
    {//arg0.constructor 表示创建arg0的函数
      if(arg0.constructor==Event || arg0.constructor == MouseEvent || arg0.constructor == KeyboardEvent){
        return arg0;
      }
    }
    func=func.caller;
  }
  return null;
}

/**
* 谷歌浏览器不支持showModalDialog，此为替代方法
*/
function myShowModalDialog(url, width, height, fn) {
    if (navigator.userAgent.indexOf("Chrome") > 0 || navigator.userAgent.indexOf("Firefox") > 0) {
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
    if (navigator.userAgent.indexOf("Chrome") > 0 || navigator.userAgent.indexOf("Firefox") > 0) {
        window.opener.returnCallBackValue354865588.call(window.opener, value);
    }
    else {
        window.returnValue = value;
    }
}

//  是否支持SVG
function isSVG() {
	var vgtype = window.SVGAngle || document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1") ? "SVG" : "VML";
	return vgtype == "SVG";
}
