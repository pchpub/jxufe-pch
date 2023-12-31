function CKForm() {
	this.form = null;	// 表单
	this.action = null;	// 表单Action
	this.src = "../taglib/DataTable.jsp";	// 报表src
	this.expsrc = "../taglib/DataTable.excel.jsp";	// 导出
	this.tableId = null;	//
	
	this.cname = null;
	this._validate = null;	// 通用验证方式
	this._selfvali = null; // 自定义验证函数
	this._before = null;	//
	this._callBack = null;	// 自定义回调函数
	
	this.lastOptType = null; //表单提交类型
	this.Msg = null;	// 返回消息
	this.status = null;	//状态 200表示成功，500表示错误
}

CKForm.prototype.init = function(json) {	// 初始函数
	if(json['form'])
		this.form = typeof json['form'] == 'string' ? $(json['form']) : json['form'];
	else
		this.form = document.forms[0];
	
	this.action = json['action'];
	
	this.cname = json['cname'];
	this._validate = json['validate'];
	this._callBack = json['callback'];
	
	if(json['tableId']) this.tableId = json['tableId'];
	if(json['src']) this.src = json['src'];
	
	//this.initIframes();
}

CKForm.prototype.setAction = function(action) {	// 设置表单Action
	this.action = action;
}

CKForm.prototype.getAction = function() {	// 获取表单Action
	return this.action;
}

CKForm.prototype.setForm = function(fo) {	// 设置表单
}

CKForm.prototype.getForm = function() {	// 获取表单
	return this.form;
}

CKForm.prototype.setDataArea = function(src) {	// 设置数据显示区src
	this.src = src;
}

CKForm.prototype.getDataArea = function() {	// 获取报表显示区src
	return this.src;
}

CKForm.prototype.setTableId = function(id) {	// 设置tableId
	this.tableId = id;
}

CKForm.prototype.getTableId = function() {	// 获取tableId
	return this.tableId;
}

CKForm.prototype.getMsg = function() {	// 获取表单提交后的返回信息
	return this.Msg;
}

CKForm.prototype.setMsg = function() {	// 设置表单提交后的返回信息
	this.Msg = RetMessage.getMsg();
	
	//flag:0,opt:1,msg:kaf_success
	//flag:-1,opt:1,msg:kaf_fail
	this.status = this.Msg.split(',')[0].split(':')[1];
	this.status == 0 ? this.status = 200 : this.status = 500;
}

CKForm.prototype.setValidate = function(type) {	// 
	eval("this._validate = {" + type + "}");
}

CKForm.prototype.getValidate = function() {	// 
	return this._validate;
}

CKForm.prototype.save = function() {	// 保存记录
	if(!this.validate()) return;
	this.form.action = this.action;
	this.lastOptType = this.form.elements["hidOption"].value = (this.form.elements['hidKey'].value != "") ? "UPD" : "ADD";
	//IKLoader_StartLoading("",this);
	this.form.submit();
}

CKForm.prototype.del = function() {	// 删除记录
	this.form.action = this.action;
	if(this.form.elements['hidKey'].value == "") {
		alert("请选择一条记录！");
		return;
	}
	if (!confirm("是否删除选定记录？")) return;
	this.lastOptType = this.form.elements["hidOption"].value = "DEL";
	this.form.submit();
}

CKForm.prototype.query = function() {	// 查询表单
	
	if(this.tableId[this.form.target] == null) return;
	
	//this.form.action = this.src + "?tableId=" + this.tableId[this.form.target];
	if(!this.form.target)  {
		var target = null;
		for(var target in this.tableId) {
			this.form.action = this.src + "?tableId=" + this.tableId[target];	
			this.lastOptType = this.form.elements["hidOption"].value = "QRY";
			this.form.submit();
		}
	} else {
		this.form.action = this.src + "?tableId=" + this.tableId[this.form.target];	
		this.lastOptType = this.form.elements["hidOption"].value = "QRY";
		//IKLoader_StartLoading("",this);
		this.form.submit();
	}
	
	//this.form.elements["hidOption"].value = "QRY";
	//this.form.submit();
	return;
}

//2013.11.17 追加url-完整的访问路径, frmname-Iframe名称
CKForm.prototype.exp = function(url, frmname) {	// 查询表单
	var titleName="";
	try{
		titleName=window.document.getElementById("divTitle").innerHTML;
	}catch(e){}
	if(this.tableId[this.form.target] == null) return;
	
	//this.form.action = this.src + "?tableId=" + this.tableId[this.form.target];
	if(!this.form.target)  {
		var target = null;
		for(var target in this.tableId) {
			if (url && frmname){ 
				document.getElementById(frmname).contentWindow.location.href = url ;
			} else {
				this.form.action = this.expsrc + "?tableId=" + this.tableId[target]+"&titleName="+encodeURI(encodeURI(titleName));	
				//this.lastOptType = this.form.elements["hidOption"].value = "EXP";
				this.form.submit();
			}
		}
	} else {
		if (url && frmname){ 
			document.getElementById(frmname).contentWindow.location.href = url ;
		} else {
			this.form.action = this.expsrc + "?tableId=" + this.tableId[this.form.target]+"&titleName="+encodeURI(encodeURI(titleName));	
			//this.lastOptType = this.form.elements["hidOption"].value = "EXP";
			//IKLoader_StartLoading("",this);
			this.form.submit();
		}
	}
	
	//this.form.elements["hidOption"].value = "QRY";
	//this.form.submit();
	return;
}

CKForm.prototype.reset = function() {	// 查询表单
	this.form.reset();
	try{$("hidKey").value = "";}catch(e){}
	return;
}

CKForm.prototype.validate = function() {	// 表单验证函数
	try {
		this.CommonValidate(); 		
	} catch(ex) {
		if(ex.message.indexOf('#') != -1) {
			var strs = ex.message.split('#');
			//alert(strs[1]);
			IKWin_ShowTip(strs[1]);
			if(this.form.elements[strs[0]].select) this.form.elements[strs[0]].select();
			else this.form.elements[strs[0]].focus();
		} else {
			//alert(ex.message);
			IKWin_ShowTip(ex.message);
		}

		return false;
	}
	return true;
}

CKForm.prototype.CommonValidate = function() {	// 通用表单验证函数
	if(!this._validate) return;

	var type_fun = { 
		noEmpty : IsEmpty,
		isSpace : CheckSpace,
		isZh : IsOnlyChinese,
		isEn : IsOnlyEnglish,
		isNum : IsOnlyNumeric,
		isInt : IsInteger,
		isDouble : IsDouble,
		isEmail : IsEmail,
		isIP : IsIP,
		isTel : IsTel,
		isMobile : IsMobileTel
	};
	
	var type_msg = {
		noEmpty : '不能为空',
		isSpace : '不能含有空格',
		isZh : '不能含有中文之外的字符',
		isEn : '不能含有英文字母之外的字符',
		isNum : '不能含有数字之外的字符',
		isInt : '不能为非整数',
		isDouble : '不能为非浮点数',
		isEmail : '邮箱地址|格式不正确',
		isIP : 'IP地址|格式不正确',
		isTel : '电话号码|格式不正确',
		isMobile : '手机号码|格式不正确'
	};
	
	for(var id in this._validate) {
		var elem = this.form.elements[id];		
		if(!elem) throw new Error('待验证的表单元素(id=' + id + ')不存在，请检查!');
		
		elem = Trim(elem.value);		
		var mod = this._validate[id];
		if(mod.indexOf("_NULL") != -1) {
			mod = mod.substring(0, mod.indexOf("_NULL"));
			if(IsEmpty(elem)) continue;				
		}
		
		if(!type_fun[mod]) throw new Error('您所请求的验证方式(' + id + ':' + mod + ')不存在！');
		
		elem = type_fun[mod](elem);
		if(this._validate[id] == 'noEmpty' || this._validate[id] == 'isSpace') elem = !elem;
		
		if(!elem) throw new Error(id + '#' + ((this.cname && this.cname[id]) ? this.cname[id] + (type_msg[mod].indexOf('|') != -1 ? type_msg[mod].split('|')[1] : type_msg[mod]) : (type_msg[mod].indexOf('|') != -1 ? type_msg[mod].replace('|', '') : type_msg[mod])));
	}
	
	return;
}

CKForm.prototype.callBack = function() {	// 回调函数
	if(this._callBack) {
		switch(this.lastOptType) {
			case 'ADD' :
			case 'UPD' :
				if(window[this._callBack[0]]) window[this._callBack[0]]();
				break;
			case 'DEL' :
				if(window[this._callBack[1]]) window[this._callBack[1]]();
				break;
			case 'QRY' :
				if(window[this._callBack[2]]) window[this._callBack[2]]();
				break;
		}
		
		/*for(var i = 0; i < this._callBack.length; i++) {
			alert(this._callBack[i]);
			window[this._callBack[i]]();
		}*/
	}
}

CKForm.prototype.setCallBack = function(fun) {	// 设置自定义回调函数
	this._callBack = fun;
}

CKForm.prototype.getElements = function(tagName, typeName, name) {	// 获取某一表单下的指定元素
	var elems = tagName ? form.getElementsByTagName(tagName) : form.elements;

	if (!typeName && !name)
		return elems;
	
	var matchingElems = [];
	for (var i = 0, l = elems.length; i < l; i++) {
		var elem = elems[i];
		if ((typeName && elem.type != typeName) || (name && elem.name != name))
			continue;
		
		matchingElems.push(elem);
	}

	return matchingElems;
}

CKForm.prototype.isButton = function(elem) {	// 判断表单控件的类型是否是 button、reset 和 submit，是则返回 true
	return (elem.type == 'button' || elem.type == 'reset' || elem.type == 'submit') ? true : false;
}

CKForm.prototype.disable = function(elem) {	// 使表单控件无法交互
	if(Object.isString(elem))
		elem = $(elem);
	
	elem.blur();
	elem.disabled = true;
}

CKForm.prototype.enable = function(elem) {	// 恢复表单控件的交互功能
	if(Object.isString(elem))
		elem = $(elem);
	
	elem.focus();
	elem.disabled = false;
}

CKForm.prototype.initIframes = function() {
	if(!this.tableId) return;
	for(var o in this.tableId) {
		$(o).src = this.src + "?tableId=" + this.tableId[o];
	}
}

// 实例CKForm对象
var objForm = new CKForm();
/*-----------------------------------------
           InterFace Function           
-------------------------------------------*/
var _obj2Form;
function IKForm_RefreshData(webroot){
	objForm.setMsg();
	objForm.callBack();
}


/*==================================================================================================================*/
/*           RetMessage Object            */
/*========================================*/
var __msg_array = new Array();

var RetMessage = new Object();
RetMessage.getMsg = function(retindex) {
	var i = __msg_array.length;
	var retmsg = "";
	retindex = IsNull(retindex, "0");
	var json = __msg_array[i - 1];
	retmsg = json["msg"]
	/*for (i = 0; i < __msg_array.length; i++) {
		var json = __msg_array[i];
		if (json["retindex"] == retindex) {
			retmsg = json["msg"];
			break;
		}
	}*/
	return retmsg;
}
var ts = 0;
RetMessage.setMsg = function(isFresh, webroot, retindex, msg) {
	var i = __msg_array.length;
	retindex = IsNull(retindex, "0");
	if (msg) {
		var json = {};
		json["retindex"] = retindex;
		json["msg"] = msg;
		__msg_array[i] = json;
	}

	// 刷新页面
	if (isFresh == "1")
		try {
			IKForm_RefreshData(webroot);
		} catch (e) {
		}
}

RetMessage.delMsg = function() {
	__msg_array = new Array();
}

RetMessage.setMsgCookie = function(isFresh, webroot, retindex, msg) {
	var _msg_str;
	_msg_str = Cookie.getCookie("kingo_ret_msg");
	retindex = IsNull(retindex, "0");
	if (msg) {
		if (!_msg_str)
			_msg_str = retindex + ":" + msg;
		else
			_msg_str = _msg_str + "#" + retindex + ":" + msg;
	}
	Cookie.setCookie("kingo_ret_msg", _msg_str);
	// 刷新页面
	if (isFresh == "1")
		try {
			IKForm_RefreshData(webroot);
		} catch (e) {
		}
}

RetMessage.getMsgCookie = function(retindex) {
	var i;
	var retmsg = "";
	var _msg_array = new Array();
	_msg_array = Cookie.getCookie("kingo_ret_msg");
	for (i = 0; i < _msg_array.length; i++) {
		var json = _msg_array[i];
		if (json["retindex"] == retindex) {
			retmsg = json["msg"];
		}
	}
	return retmsg;
}

RetMessage.delMsgCookie = function() {
	Cookie.deleteCookie("kingo_ret_msg");
}


/*==================================================================================================================*/
/*           CKLoader Object            */
/*======================================*/
//获取对象的高度
function $height(obj){return parseInt(obj.style.height)||obj.offsetHeight;}

var __ld_dir=4;
var __ld_pos=0;
var __ld_len=0;
var __ld_objTimer;
var __ld_status=""; // OK,正常结束； SORRY,发生异常

function CKLoader(name){
	this._bgAlpha=0;	//遮罩透明度
	this._bgAlphaColor="#000000";
	this._docWidth=0;
	this._docHeight=0;
	
	this._insName=name||"(new CKLoader())";	
	this._width=280;
	this._height=150;	
	this._callFunc=null;
			
	var browser=function(s){return navigator.userAgent.toLowerCase().indexOf(s)!=-1}; 
	this._isOpera=browser("opera"); 
	this._isIE=browser("msie")!=-1&&(document.all&&!this.isOpera);	
}

//设定消息框的宽度
CKLoader.prototype.setWidth=function(w){
	if(/\d/.test(w)&&w>=this._width){this._width=w;}
};
//设定消息框的高度
CKLoader.prototype.setHeight=function(h){
	if(/\d/.test(h)&&h>=this._height){this._height=h;}
};

//设定loader启动后执行的函数的名称
CKLoader.prototype.setFunc=function(func){this._callFunc=func;};

//设定事件处理后返回的状态文本
CKLoader.prototype.setStatusText=function(str){this._statusText=str;};

CKLoader.prototype.doCallBack=function(){try{
	//执行回调函数
	if(this._callFunc){
		if(typeof this._callFunc=="function") this._callFunc(this._statusText);
		else eval(this._callFunc+"('"+this._statusText+"')");
	}
}catch(err){alert('[CKLoader] 检测到无效的回调函数!')}
};

CKLoader.prototype.closeLoader=function(){
	if(this._getFormMsg()) __ld_status="OK"; //转换条件
	
	var isReady=__ld_status=="OK"||__ld_status=="SORRY";
	if(!isReady){setTimeout(function(){CKLoader.prototype.closeLoader()},500);return}
	
	_close=function(){oKLoader._destory();if(__ld_objTimer) window.clearInterval(__ld_objTimer)};
	setTimeout("_close()",1000);
	this._resetFormMsg();

	//执行回调函数
	this.doCallBack();	
};

//数据加载过程...
CKLoader.prototype.startLoading=function(msg){
	this._init();
	this._createWin_Loader(msg);
	
	animate=function(){
		var elem = document.getElementById('progress');
		if(elem != null){
		if (__ld_pos==0) __ld_len += __ld_dir;			
		if (__ld_len>32 || __ld_pos>99) __ld_pos += __ld_dir;			
		if (__ld_pos>99) __ld_len -= __ld_dir;			
		if (__ld_pos>99 && __ld_len==0) __ld_pos=0;
		elem.style.left  = __ld_pos; 
		elem.style.width = __ld_len;}
	}
	__ld_objTimer = setInterval(animate,20);
	
	this.closeLoader();
};


//加载前的初始化
CKLoader.prototype._init=function(){
	__ld_pos=0;
	__ld_len=0;	
	__ld_status="";
	//this._showMask("loaderShield");	//显示背景层
};

//隐退后的处理
CKLoader.prototype._destory=function(){
	//this._removeMask("loaderShield");//隐藏背景层
	$("loaderWinContainer").style.display="none";	//隐藏容器
};

CKLoader.prototype._createWin_Loader=function(content){
	//第一次需要创建一个容器
	var outerStyle="WIDTH:200px; LEFT: 40%; margin:auto; POSITION: absolute; TOP: 40%; TEXT-ALIGN: center; z-index:10001";

	if(!$("loaderWinContainer")){	
		//内容容器层
		var content_div="\
		<DIV class=loader id=loader>\
			<DIV align=center id=loaderMsg></DIV>\
			<DIV class=loader_bg id=loader_bg><div class=progress id=progress></div></DIV>\
		</DIV>";		
			
		var outContainer=document.createElement("div");
		this._addCSS(outContainer,outerStyle);
		outContainer.id="loaderWinContainer";
		outContainer.innerHTML=content_div;
		document.body.appendChild(outContainer);
		outContainer=null;		
	}
	
	$("loaderMsg").innerHTML=content;	//内容
	
	//显示消息容器
	this._addCSS($("loaderWinContainer"),outerStyle);	//居中定位消息框
	$("loaderWinContainer").style.display="";			//显示容器
		
	//第一次创建loader增加以下监听事件
	if(!this.hasAddEvent){
		//this._addEvent("keydown",this._listenKeydown);	//键盘按下事件
		
		var s=this;
		//重新计算遮罩大小，只有在遮罩显示的条件下才能执行此操作
		resizeMask=function(){if($("loaderShield")&&$("loaderShield").style.display!="none") s._showMask()}
		//this._addEvent("resize",resizeMask,window);
		//this._addEvent("scroll",resizeMask,window);
		this.hasAddEvent=1;
	}	
};

//-------------------------------------------------------------
//显示遮罩层
CKLoader.prototype._showMask=function(divID){
	//第一次需要创建一个蒙板层
	var obj=$(divID);
	if(!obj){
		var shieldStyle="position:absolute;top:0px;left:0px;width:0;height:0;background:"+this._bgAlphaColor+";text-align:center;z-index:10000;filter:alpha(opacity="+(this._bgAlpha*100)+");opacity:"+this._bgAlpha+";";
		try{//IE
			document.body.appendChild(document.createElement("<div id='"+divID+"' style=\""+shieldStyle+"\"></div>"));			
			document.body.appendChild(document.createElement("<iframe id='"+divID+"Iframe'></iframe>"));//为IE创建Iframe遮罩
		}catch(e){
			var oShield=document.createElement("div");
			oShield.id=divID;
			oShield.setAttribute("style",shieldStyle);
			document.body.appendChild(oShield);
			oShield=null;
		}
	}	
	
	//计算蒙板的高宽，每次弹出都应该更新宽高
	obj=$(divID);
	obj.style.display="none";	//如果显示则先隐藏便于后面计算页面的高宽
	var rootEl=this._rootEl;
	//使用scrollTop和scrollWidth判断是否有滚动条更加准确，但需要加上onscroll监听,一旦发现有scrollTop或scrollLeft则使用scrollWidth/Height
	//this._docHeight=((rootEl.scrollTop==0)?rootEl.clientHeight:rootEl.scrollHeight)+"px";
	//this._docWidth=((rootEl.scrollLeft==0)?rootEl.clientWidth:rootEl.scrollWidth)+"px";
	this._docHeight="615px";
	this._docWidth="1000px";
	obj.style.width=this._docWidth;
	obj.style.height=this._docHeight;
	rootEl=null;
		
	//添加Iframe遮罩，仅在IE下才会存在Iframe遮罩
	var psIframe=$(divID+"Iframe");
	if(psIframe){
		this._addCSS(psIframe,obj.style.cssText+";z-index:9999;filter:alpha(opacity=0);opacity:0");
		psIframe.style.display="";
	}
	
	//显示蒙板
	obj.style.display="";
	//禁止对页面的任何操作
	document.body.onselectstart = function(){return false};
	document.body.oncontextmenu = function(){return false};
};

//移除遮罩层
CKLoader.prototype._removeMask=function(divID){	
	$(divID).style.display="none"; //隐藏蒙板
	if($(divID+"Iframe")) $(divID+"Iframe").style.display="none";//隐藏IE下创建的Iframe遮罩	
	document.body.onselectstart = function(){return true};
	document.body.oncontextmenu = function(){return true};
};

//为元素添加css文本样式的方法
//obj:要添加css的对象，css:css文本,append:追加还是覆盖，默认覆盖
CKLoader.prototype._addCSS=function(obj,css,append){
	if(!append){
		this._isOpera?obj.setAttribute("style",css):obj.style.cssText=css;
	}else{
		this._isOpera?obj.setAttribute("style",obj.getAttribute("style")+css):obj.style.cssText+=css;
	}
}

//绑定事件的函数
CKLoader.prototype._addEvent=function(env,fn,obj){
	obj=obj||document; //alert(obj.value);
	if(this._isIE){
		obj.attachEvent("on"+env,fn);
	}else{
		obj.addEventListener(env,fn,false);
	}
};

//启用蒙板时监听键盘事件
CKLoader.prototype._listenKeydown=function(){
	//loader隐藏时直接退出
	if(!$("loaderWinContainer")||$("loaderWinContainer").style.display=="none") return true;
	
	var ev=window.event||arguments[0];
	if(ev.keyCode==13) return true;	//允许回车键
	//屏蔽所有键盘操作包括刷新等
	try{
		ev.keyCode=0;
		ev.cancelBubble=true;
		ev.returnValue=false;
	}catch(e){
		try{//避免IE下event.keycode=0执行出错后转向此处而报错
		ev.stopPropagation();
		ev.preventDefault();
		}catch(e){}
	}
}

//-- 获取接口接收的Form信息(参数)
CKLoader.prototype._getFormMsg=function(){ 
	var IsOK=false;

	//if($("hidState").value!="") IsOK=true;
	if(_oKForm2Loader){
	if(_oKForm2Loader.status) IsOK=true;
	}

	return(IsOK);
}
CKLoader.prototype._resetFormMsg=function(){
	//$("hidState").value="";
	_oKForm2Loader=null;
}

///////////////////////////////////////////////////////////////////////////
var oKLoader;
function initKLoader(a){
	if(!document.body){setTimeout(function(){inioKLoader(a)},1);return}
	oKLoader=oKLoader||new CKLoader("oKLoader");
	oKLoader.setWidth(a[0]);
	oKLoader.setHeight(a[1]);
	oKLoader.setFunc(a[2]);	
	oKLoader.startLoading(a[3]);
}

function StartLoading() {
	initKLoader([200,180,"callNext","正在加载数据...请稍候"]);
}

function StartLoading_(message, width, height, func) {
	initKLoader([width,height,func,message]);
}

function callNext(retStatus){
//alert(retStatus);
}


/*========================================*/
/*           InterFace Function            */
/*========================================*/
var _oKForm2Loader;
function IKLoader_StartLoading(Flag,objForm){
	_oKForm2Loader=objForm;
	StartLoading();
}
