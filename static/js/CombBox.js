var COMB_MARGIN_TOP = "3px"; // 距离父对象的距离
var COMB_BORDER_STYLE = "1px solid black"; // div边框样式
var COMB_BACKGROUNDCOLOR = "#FFFFFF"; // div背景色
var COMB_UNIT_HEIGHT = 20; // div每行的高度
var COMB_DEFAULT_NUM = 5; // 默认行数

var COMB_TR_OVER_COLOR = "#0A246A"; // 鼠标悬停时候tr的颜色
var COMB_TR_FONT_OVER_COLOR = "#FFFFFF"; // 鼠标悬停时候tr内字体的颜色
var COMB_TR_OUT_COLOR = "#FFFFFF"; // 鼠标离开tr时候的颜色
var COMB_TR_FONT_OUT_COLOR = "#000000"; // 鼠标离开tr时候tr内字体的颜色

var COMB_TOTAL_COUNT = 200; // 最大记录数
var COMB_FILTRATE_STYLE = "0"; // 过滤风格, 默认为从左开始
var COMB_LOAD_DATABOOK = false; // 是否从数据字典直接加载数据, 默认为否

var COMB_INIT_DATA_WHEN_INIT = "0"; // 初始化数据方式, 0表示只在实例化的时候初始化一次
var COMB_INIT_DATA_WHEN_INPUT = "1"; // 初始化数据方式, 1表示实时初始化
var COMB_AUTO_SET_VALUE_WHEN_ONLY_ONE_RESULT = false; // 是否只有一条记录时自动填充标志, 默认为否

var COMB_AUTO_LOAD_BOTTOM_DATA_GENE = 2; // 底部数据动态加载模式的因子

var COMB_DEBUG1 = false; // debug switch

function CKCombBox(json) {
	if(json==null){
		json = {};
	}
	this.combObjectName = json._name;
	this.combDivId = json._divId;
	this.combIframeId = this.combDivId+"Iframe";
	this.combTbodyId = this.combDivId+"Tbody";
	this.combValueId = json._valueId; // 页面接收值的对象id
	this.combParentId = json._parentId; // 页面接收名称的对象id
	this.combParent = document.getElementById(this.combParentId); // 父对象
	this.combParentWidth = this.combParent.style.width; // 父对象宽度
	this.combWidth = json._width || this.combParentWidth; // div宽度
	this.combNum = json._num || COMB_DEFAULT_NUM; // 记录个数
	this.combFiltrateStyle = json._filtrate_style || COMB_FILTRATE_STYLE; // 过滤风格, 默认为从左开始
	this.combValue = new Array(); // 值
	this.combName = new Array(); // 名称
	this.combFillName = new Array(); // 填充父对象的名称
	this.combClassName = json._className; // xml配置的节点名
	this.combParameter = "";//json._parameter; // 额外参数
	this.combTotalCount = json._totalCount || COMB_TOTAL_COUNT; // 最大记录数
	this.combRequestUrl = "../taglib/CombBoxServlet.jsp"; // servlet的请求路径
		
	this.comb_length1 = 0;
	this.comb_length2 = 0;
	
	if (document.getElementById(this.combIframeId) != null)
		document.getElementById(this.combIframeId).parentNode.removeChild(document.getElementById(this.combIframeId));
	if (document.getElementById(this.combDivId) != null)
		document.getElementById(this.combDivId).parentNode.removeChild(document.getElementById(this.combDivId));
	
	this.combColor = json._color || COMB_BACKGROUNDCOLOR; // 背景色
	
	// onmouseover事件属性
	this.combTrOverColor = json._tr_over_color || COMB_TR_OVER_COLOR; // 鼠标悬停时候tr的颜色
	this.combTrFontOverColor = json._tr_font_over_color || COMB_TR_FONT_OVER_COLOR; // 鼠标悬停时候tr内字体的颜色
	
	// onmouseout事件属性
	this.combTrOutColor = json._tr_out_color || COMB_TR_OUT_COLOR; // 鼠标离开tr时候的颜色
	this.combTrFontOutColor = json._tr_font_out_color || COMB_TR_FONT_OUT_COLOR; // 鼠标离开tr时候的颜色
	
	// 是否从数据字典直接加载标志
	this.combLoadDataBook = json._loadDataBook || COMB_LOAD_DATABOOK;
	// 初始化数据方式
	this.combInitDataStyle = json._initDataStyle || COMB_INIT_DATA_WHEN_INIT;
	// 是否第一条记录自动填充
	this.combAutoSetValueWhenOnlyOneResult = json._autoSetValueWhenOnlyOneResult || COMB_AUTO_SET_VALUE_WHEN_ONLY_ONE_RESULT;
	this.combFullMatchFlag = false;
	// 底部数据动态加载模式
	this.combAutoLoadBottomData = true; // 默认启用, false为不启用
	this.combAutoLoadBottomData_gene = COMB_AUTO_LOAD_BOTTOM_DATA_GENE; // 底部数据动态加载模式的因子
		
	this.xmlDoc = null;
	//this.jsonInfo = null;
	// 是否初始化时加载数据 init data when you instantiation
	if (this.combInitDataStyle == COMB_INIT_DATA_WHEN_INIT) {
	    this.xmlDoc = this.getXmlInfo();
	    //this.jsonInfo = this.getJsonInfo();
	}
	
	this.combHeight = "";
	// 当前滚动到第几行数据了
	this.combScrollIndexNow = 0;
	
	this.tieCombBoxEvent();
}

/**
  * 显示窗体
  * show combBox's window
  */
CKCombBox.prototype.show = function () {
    // 是否实时加载数据 init data every time when you input keycode
    if (this.combInitDataStyle == COMB_INIT_DATA_WHEN_INPUT) {
	    this.xmlDoc = this.getXmlInfo();
	}
    // 清空数组 init array
    this.combValue.splice(0, this.combValue.length);
	this.combName.splice(0, this.combName.length);
	this.combFillName.splice(0, this.combFillName.length);
	
	this.deleteDiv(); // 清除div delte div
	
	this.filtrateXmlValue(); // 过滤条件 filtrate value
	this.combHeight = this.setHeight(); // 计算高度 get height for div
	if(this.combValue.length == 0)
		return null;
    this.createDiv(this.combParent); // 生成信息 create div
}

/**
  * 生成窗体
  * create combBox's window
  */
CKCombBox.prototype.createDiv = function (o) {
	var left = 0;
	var top = o.offsetHeight;
	while(o) {
		left += o.offsetLeft || 0;
		top += o.offsetTop || 0;
		o = o.offsetParent;
	}
	left += "px";
	top += "px";
	if(window.navigator.userAgent.indexOf("MSIE 6.0") > -1) {
		o = document.createElement("iframe");
		o.setAttribute("id", this.combIframeId);
		o.style.marginTop = COMB_MARGIN_TOP;
		o.style.position = "absolute";
		o.style.width = this.combWidth;
		o.style.height = this.combHeight;
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
	o.setAttribute("id", this.combDivId);
	o.style.marginTop = COMB_MARGIN_TOP;
	o.style.position = "absolute";
	o.style.width = this.combWidth;
	o.style.height = this.combHeight;
	o.style.left = left;
	o.style.top = top;
	o.style.display = "block";
	o.style.border = COMB_BORDER_STYLE;
	o.style.backgroundColor = this.combColor;
	o.style.zIndex = "9999";
	o.innerHTML = this.setDiv();
	document.body.appendChild(o);
	
	if (this.combAutoLoadBottomData) {
		var comb_obj_copy = this;
		// div的滚动事件
		o.firstChild.onscroll = function() {
			setCombDivOnscrollEvent(this, comb_obj_copy);
		}
	} else {
		o.firstChild.onscroll = null;
	}
}

// 计算需要的高度
CKCombBox.prototype.setHeight = function () {
	var temp = 0;
	var length = this.combValue.length;
	if (length > this.combNum)
		temp = COMB_UNIT_HEIGHT * this.combNum;
	else
		temp = COMB_UNIT_HEIGHT * length;
	return temp + "px";
}

// div值
CKCombBox.prototype.setDiv = function () {
    var d1 = new Date();
	var divInfo = [];
	if (this.combValue.length > 0) {
		var length = this.combValue.length;
		if (COMB_DEBUG1) {
		    document.getElementById("count").innerHTML = "数据个数：" + length;
		}
		divInfo.push("<div class=\"combBox_div\" style=\"width:"+this.combWidth+"; height:"+this.combHeight+";\">");
		divInfo.push("<table class=\"combBox_table\" cellpadding=\"0\" cellspacing=\"0\">");
		divInfo.push("<tbody id=\""+this.combTbodyId+"\">");
		if (this.combAutoLoadBottomData) {
			var first_tr_size = length >= (this.combNum * this.combAutoLoadBottomData_gene) ? (this.combNum * this.combAutoLoadBottomData_gene) : length;
			for (var i = 0; i < first_tr_size; i++) {
				divInfo.push("<tr id=\""+this.combDivId+i+"\" value=\""+this.combDivId+i+"\"");
				divInfo.push(" onmouseover=\"setCombTrOverEvent(this, '"+this.combObjectName+"');\"");
				divInfo.push(" onmouseout=\"setCombTrOutEvent(this, '"+this.combObjectName+"');\"");
				divInfo.push(" onclick=\"setCombParentValue(this, '"+this.combObjectName+"');\">");
				divInfo.push("<td id=\""+this.combDivId+i+"_value\" class=\"combBox_hidden_td\">"+this.combValue[i]+"</td>");
				divInfo.push("<td id=\""+this.combDivId+i+"_fillName\" class=\"combBox_hidden_td\">"+this.combFillName[i]+"</td>");
				divInfo.push("<td id=\""+this.combDivId+i+"_name\" class=\"combBox_show_td\" style=\"height:"+COMB_UNIT_HEIGHT+"px\">"+this.combName[i]+"</td>");
				divInfo.push("</tr>");
			}
			// 设置当前滚动位置
			this.combScrollIndexNow = this.combNum * this.combAutoLoadBottomData_gene;
		} else {
			for (var i = 0; i < length; i++) {
				divInfo.push("<tr id=\""+this.combDivId+i+"\" value=\""+this.combDivId+i+"\"");
				divInfo.push(" onmouseover=\"setCombTrOverEvent(this, '"+this.combObjectName+"');\"");
				divInfo.push(" onmouseout=\"setCombTrOutEvent(this, '"+this.combObjectName+"');\"");
				divInfo.push(" onclick=\"setCombParentValue(this, '"+this.combObjectName+"');\">");
				divInfo.push("<td id=\""+this.combDivId+i+"_value\" class=\"combBox_hidden_td\">"+this.combValue[i]+"</td>");
				divInfo.push("<td id=\""+this.combDivId+i+"_fillName\" class=\"combBox_hidden_td\">"+this.combFillName[i]+"</td>");
				divInfo.push("<td id=\""+this.combDivId+i+"_name\" class=\"combBox_show_td\" style=\"height:"+COMB_UNIT_HEIGHT+"px\">"+this.combName[i]+"</td>");
				divInfo.push("</tr>");
			}
		}
		divInfo.push("</tbody>");
		divInfo.push("</table>");
		divInfo.push("</div>");
		
		// conditon of setting value automatically
	    if (length == 1 && this.combAutoSetValueWhenOnlyOneResult && this.combFullMatchFlag) {
	        document.getElementById(this.combValueId).value = this.combValue[0];
	        this.combParent.value = this.combFillName[0];
	        try {
			    combBoxSetValueCallBack(this.combObjectName);
			} catch (e) {}
	    }
	}
	if (COMB_DEBUG1) {
	    document.getElementById("time2").innerHTML = "生成表示层的性能评估：" + ((new Date()) - d1) + "毫秒";
	}
	return divInfo.join("");
}

/**
 * 生成指定行的内容
 * @param index: 数组位置
 * @return tr对象
 */
CKCombBox.prototype.createTrInfo = function (index) {
	var combObjectName2 = this.combObjectName;
	// 行对象
	var tr_obj = document.createElement("tr"); // 创建行对象
	tr_obj.setAttribute("id", (this.combDivId+index));
	tr_obj.setAttribute("value", (this.combDivId+index));
	
	tr_obj.onmouseover = function() {
		setCombTrOverEvent(tr_obj, combObjectName2);
	}
	tr_obj.onmouseout = function() {
		setCombTrOutEvent(tr_obj, combObjectName2);
	}
	tr_obj.onclick = function() {
		setCombParentValue(tr_obj, combObjectName2);
	}
	
	//-------------------------------------------------------------------------
	//-------------------------------------------------------------------------
	
	// 列对象(主键)
	var td_value_obj = document.createElement("td"); // 创建列对象
	td_value_obj.setAttribute("id", (this.combDivId+index+"_value"));
	td_value_obj.className = "combBox_hidden_td";
	// td的文本内容
	var td_value_info_obj = document.createTextNode(this.combValue[index]);
	td_value_obj.appendChild(td_value_info_obj);
	
	//-------------------------------------------------------------------------
	//-------------------------------------------------------------------------
	
	// 列对象(填充的值)
	var td_fillName_obj = document.createElement("td"); // 创建列对象
	td_fillName_obj.setAttribute("id", (this.combDivId+index+"_fillName"));
	td_fillName_obj.className = "combBox_hidden_td";
	td_fillName_obj.style.height = COMB_UNIT_HEIGHT+"px";
	// td的文本内容
	var td_fillName_info_obj = document.createTextNode(this.combFillName[index]);
	td_fillName_obj.appendChild(td_fillName_info_obj);
	
	//-------------------------------------------------------------------------
	//-------------------------------------------------------------------------
	
	// 列对象(名称)
	var td_name_obj = document.createElement("td"); // 创建列对象
	td_name_obj.setAttribute("id", (this.combDivId+index+"_name"));
	td_name_obj.className = "combBox_show_td";
	// td的文本内容
	var td_name_info_obj = document.createTextNode(this.combName[index]);
	td_name_obj.appendChild(td_name_info_obj);
	
	// 将列对象填充到行对象中
	tr_obj.appendChild(td_value_obj);
	tr_obj.appendChild(td_fillName_obj);
	tr_obj.appendChild(td_name_obj);
	
	return tr_obj
}

/**
  * 清除div
  * delete div
  */
CKCombBox.prototype.deleteDiv = function() {
    if (document.getElementById(this.combIframeId) != null) {
		document.body.removeChild(document.getElementById(this.combIframeId));// == null;
	}
	if (document.getElementById(this.combDivId) != null) {
		document.body.removeChild(document.getElementById(this.combDivId));// == null;
	}
}

// 摧毁div
CKCombBox.prototype.destory = function() {
	if (document.activeElement.id != this.combParentId 
	    && document.activeElement.id.indexOf(this.combDivId) == -1 
	    && this.isMouseOut(getEvent())) {
		this.deleteDiv();
	}
}

// 判断非IE
CKCombBox.prototype.isIe = function() {
	var iePos = navigator.userAgent.indexOf("MSIE");
	if(iePos == -1)
		return false;
	else
		return true;
}

// 判断鼠标是否在div之外
CKCombBox.prototype.isMouseOut = function(e) {
	// 获得div的左上角坐标和右下角坐标
	var obj = document.getElementById(this.combDivId);
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
	if (mouse_x < PLeft || mouse_x > PRight || mouse_y < PTop || mouse_y > PBottom)
		return true;
	else
		return false;
}

/**
  * 获得基础数据
  * get base info
  */
CKCombBox.prototype.getXmlInfo = function () {
    var xmlHttp2; // = createXMLHttp();
    var xmlDoc;
	if (window.ActiveXObject) {
		xmlHttp2 = new ActiveXObject("Microsoft.XMLHTTP");
	} else {
		if (window.XMLHttpRequest) {
			xmlHttp2 = new XMLHttpRequest();
		}
	}
	function xmlHandle() {
	    if (xmlHttp2.readyState == 4) {
	        if (xmlHttp2.status == 200) {
	            xmlDoc = xmlHttp2.responseXML.documentElement;
			}
		}
	}
	var btype = getOs();
	var param = this.getAjaxServletParam();
	
    xmlHttp2.onreadystatechange = (btype!="Firefox") ? (xmlHandle) : (xmlHandle());
    xmlHttp2.open ("POST", this.combRequestUrl, false);
    xmlHttp2.setRequestHeader("content-length", param.length); 
    xmlHttp2.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xmlHttp2.send(param);
    xmlHttp2.onreadystatechange = (btype!="Firefox") ? (xmlHandle) : (xmlHandle());
    return xmlDoc;
}

/**
  * 获得ajax的servlet的路径
  * get url of ajax's servlet
  */
CKCombBox.prototype.getAjaxServletParam = function() {
    var param = "className="+this.combClassName;
    if (this.combLoadDataBook) {
        param += "&loadDataStyle=loadDataBook";
    } else {
        param += "&loadDataStyle=loadClass";
    }
    
    try {
        this.combParameter = setCombBoxOtherParameter(this.combObjectName);
    } catch(e) {}
    if (this.combParameter != null && this.combParameter != "") {
	    if (this.combParameter.indexOf("&") != 0) {
	        param += "&";
	    }
	    param += this.combParameter;
	} else {
	    param += "&"+this.combParent.id+"="+this.combParent.value;
	}
	this.escapeParam(param);
	return this.escapeParam(param);
}

/**
  * escape parameter
  */
CKCombBox.prototype.escapeParam = function(param) {
    var temp1 = param.split("&");
    var length = temp1.length;
    var newParam = "";
    if (length > 0) {
        for (var i = 0; i < length; i++) {
            var temp2 = temp1[i].split("=");
            newParam += temp2[0];
            newParam += "=";
            newParam += escape(escape(temp2[1]));
            newParam += "&";
        }
    }
    return newParam;
}

/**
  * 过滤值
  * filtrate value
  */
CKCombBox.prototype.filtrateXmlValue = function () {
    var d1 = new Date();
    var info = this.xmlDoc.getElementsByTagName("info");
    var length = info.length;
    var m = 0;
    for(var i = 0; i < length; i++) {
        var filtrateCount = parseInt(info[i].getElementsByTagName("filtrateCount")[0].firstChild.nodeValue, 10);
        var bl = false;
        for (var j = 0; j < filtrateCount; j++) {
        	var txt1 = "";
        	try{txt1 = info[i].getElementsByTagName("filtrateInfo"+j)[0].firstChild.nodeValue;}
        	catch(e){}
        	var txt2 = "";
            try{txt2 = this.combParent.value;}
            catch(e){}
            if (isStringMatchString(this.combFiltrateStyle, txt1, txt2)
                && info[i].getElementsByTagName("filtrateInfo"+j)[0] != null) {
                this.combValue.push(info[i].getElementsByTagName("value")[0].firstChild.nodeValue);
                this.combName.push(info[i].getElementsByTagName("name")[0].firstChild.nodeValue);
                this.combFillName.push(info[i].getElementsByTagName("fillName")[0].firstChild.nodeValue);
                bl = true;
                // conditon of setting value automatically
                if ((m == 0) && this.combAutoSetValueWhenOnlyOneResult) {
                    this.combFullMatchFlag = (isStringMatchString("3", info[i].getElementsByTagName("filtrateInfo"+j)[0].firstChild.nodeValue, this.combParent.value));
                }
                m++;
                break;
            }
        }
        if (m >= this.combTotalCount) {
            break;
        }
    }
    if (COMB_DEBUG1) {
        document.getElementById("time1").innerHTML = "解析XML并且过滤的性能评估：" + ((new Date()) - d1) + "毫秒";
    }
}

/**
  * 过滤值
  * filtrate value
  */
CKCombBox.prototype.filtrateJsonValue = function () {
    var d1 = new Date();
    var length = this.jsonInfo.length;
    var m = 0;
    for(var i = 0; i < length; i++) {
        var filtrateCount = this.jsonInfo[i].filtrateCount;
        var bl = false;
        for (var j = 0; j < filtrateCount; j++) {
            var filtrateInfo = eval(this.combObjectName+".jsonInfo["+i+"].filtrateInfo"+j);
            if (isStringMatchString(this.combFiltrateStyle, filtrateInfo, document.getElementById(this.combParentId).value)) {
                this.combValue.push(this.jsonInfo[i].value);
                this.combName.push(this.jsonInfo[i].name);
                bl = true;
                m++;
                break;
            }
        }
        if (m >= this.combTotalCount) {
            break;
        }
    }
    if (COMB_DEBUG1) {
        document.getElementById("time1").innerHTML = "解析json并且过滤的性能评估：" + ((new Date()) - d1) + "毫秒";
    }
}

// tie event to combBox's parent
CKCombBox.prototype.tieCombBoxEvent = function () {
    var obj = this;
    var body = document.getElementsByTagName("body")[0];
    if(body.addEventListener) {
	    body.addEventListener("click", destoryCombBox, false);
    } else {
	    body.attachEvent("onclick", destoryCombBox);
    }
    this.combParent.onfocus = function() {
        obj.show();
    }
    this.combParent.onkeydown = function() {
        obj.comb_length1 = Trim(obj.combParent.value).length;
    }
    this.combParent.onkeyup = function() {
        obj.comb_length2 = Trim(obj.combParent.value).length;
	    var bl = obj.comb_length1 != obj.comb_length2;
	    if (bl) {
	        document.getElementById(obj.combValueId).value = "";
	        obj.show();
	    }
    }
    /**
      * 摧毁combBox
      * destory combBox
      */
    function destoryCombBox() {
        if (obj) {
            obj.destory();
        }
    }
}

/**
  * 禁用底部数据动态加载模式
  */
CKCombBox.prototype.disabledAutoLoadBottomData = function () {
	this.combAutoLoadBottomData = false;
}

/**
  * 启用底部数据动态加载模式
  */
CKCombBox.prototype.enabledAutoLoadBottomData = function () {
	this.combAutoLoadBottomData = true;
}

/**
 * 内部div的onscroll事件
 * @param div_obj: 内部的div对象
 * @param comb_obj_copy: 模糊下拉框的对象副本
 */
function setCombDivOnscrollEvent(div_obj, comb_obj_copy) {
	var n1 = parseInt(div_obj.scrollTop, 10);
	var n2 = parseInt(div_obj.clientHeight, 10);
	var n3 = parseInt(div_obj.scrollHeight, 10);
	
	// 数据的长度
	var length = comb_obj_copy.combValue.length;
	// 当滚动条到达底部的时候
	if (n1 + n2 == n3) {
		//this.combScrollIndexNow
		// 获取当前模糊下拉框的tbody对象
		var thisCombTbody_obj = document.getElementById(comb_obj_copy.combTbodyId);
		// 后续数据的起始位置
		var index = comb_obj_copy.combScrollIndexNow;
		// 后续数据的结束位置
		var maxIndex = index + comb_obj_copy.combNum * comb_obj_copy.combAutoLoadBottomData_gene;
		maxIndex = maxIndex > length ? length : maxIndex;
		for (var i = index; i < maxIndex; i++) {
			thisCombTbody_obj.appendChild(comb_obj_copy.createTrInfo(i));
		}
		// 设置后续数据位置
		comb_obj_copy.combScrollIndexNow = maxIndex;
	}
}

// tr的onmouseover事件
function setCombTrOverEvent(obj, combObjectName) {
	obj.style.backgroundColor = eval(combObjectName+".combTrOverColor");
	obj.style.color = eval(combObjectName+".combTrFontOverColor");
}

// tr的onmouseout事件
function setCombTrOutEvent(obj, combObjectName) {
	obj.style.backgroundColor = eval(combObjectName+".combTrOutColor");
	obj.style.color = eval(combObjectName+".combTrFontOutColor");
}

// 给父对象赋值
function setCombParentValue(obj, combObjectName) {
	document.getElementById(eval(combObjectName+".combValueId")).value = document.getElementById(obj.id+"_value").innerHTML;
	document.getElementById(eval(combObjectName+".combParentId")).value = document.getElementById(obj.id+"_fillName").innerHTML;
	if (document.getElementById(eval(combObjectName+".combIframeId")) != null) {
		document.body.removeChild(document.getElementById(eval(combObjectName+".combIframeId"))); // == null;
	}
	if (document.getElementById(eval(combObjectName+".combDivId")) != null) {
		document.body.removeChild(document.getElementById(eval(combObjectName+".combDivId"))); // == null;
	}
	try {
	    combBoxSetValueCallBack(combObjectName);
	} catch (e) {}
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
  * 字符串匹配
  * is child string matches father string
  * @param: style 匹配风格, 0为左匹配, 1为包含匹配, 2为右匹配
  *               matching's style
  *               0: father string like "child string %"
  *               1: father string like "% child string %"
  *               2: father string like "% child string"
  *               3: father string == child string
  *               4: return true.
  */
function isStringMatchString(style, fatherString, childString) {
    if (style == "0") {
        var length = fatherString.length > childString.length ? childString.length : fatherString.length;
        return fatherString.substring(0, length) == childString;
    } else if (style == "1") {
        return fatherString.indexOf(childString) > -1;
    } else if (style == "2") {
        var length = Math.abs(fatherString.length - childString.length) - 1;
        length = length < 0 ? 0 : length;
        return fatherString.substring(length1, fatherString.length) == childString;
    } else if (style == "3") {
        return fatherString == childString;
    } else if (style == "4") {
        return true;
    }
    return false;
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