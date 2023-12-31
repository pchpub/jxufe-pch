/*
	parameter : divName	组件所在页面DIV名称
	parameter : width	组件所在页面宽度名称
	parameter : textId	文本框id 和name 属性值
	parameter : defaultValue	文本框默认显示值
	parameter : objName	实例化对象名称
*/

var _object_Array = new Array();
var _object_Name = new Array();
var TextGroupDriver = null;
var clickFlag = 0;
var objIdFlag = 0;
function TextGroupWare(divName , width , textId , defaultValue , objName, path){
	this.DIV = divName || "textgroupwareDiv";
	this.OBJNAME = objName;
	this.OBJID = 0;
	
	this.TEXTINPUT = null;
	this.TEXT_ID = textId || "nj";
	this.TEXT_DEFAULTVALUE = defaultValue || "2008";
	
	this.TEXT_VALUE_PER = 1;
	this.TEXT_VALUE_AREA = 50;
	this.GROUPWARE_BACKGROUNDCOLOR = "#ffffff";
	this.DIV_ID = null;
	this.DIV_WIDTH = parseInt(width || "60");
	this.DIV_HEIGHT = 18;
	
	this.READONLY_BACKGROUNDCOLOR = "#CFCFCF";
	
	this.DISABLED_BACKGROUNDCOLOR = "#ffffff";
	this.DISABLED_INPUT_FONT_BACKGROUNDCOLOR = "#ffffff";
	this.DISABLED_TEXT_VALUE_PER = this.TEXT_VALUE_PER;
	this.IF_DISABLED = false;
	
	var bathPath = path || "../";
	this.BUTTON_IMG_UP = bathPath + "images/button/smartup.gif";
	this.BUTTON_IMG_DOWN = bathPath + "images/button/smartdown.gif";
	
	this.TIMEREQUEST = 100;
	$(divName).style.cssFloat="left";
	
	this.ONCLICK = null;
	this.ONCLICKED = null;
	
	this.init();
}

TextGroupWare.prototype.init = function(){

	if(this.DIV_ID == null) {
		$(this.DIV).style.width = this.DIV_WIDTH;
		$(this.DIV).style.borderTop = "1px solid #D4D0C8";
		$(this.DIV).style.borderLeft = "1px solid #D4D0C8";
		$(this.DIV).style.borderRight = "1px solid #D4D0C8";
		_object_Array.push(this);
		_object_Name.push(this.OBJNAME);
		this.OBJID = _object_Array.length - 1;
		$(this.DIV).appendChild(this.createDiv(this.DIV_WIDTH , this.DIV_HEIGHT , "kingo155"));
		//document.body.innerText = $(this.DIV).innerHTML;
	}
};

TextGroupWare.prototype.setTimeRequest = function(value){
	if(this.IF_DISABLED) {
		
	}else {
		if(typeof(value) == "number"){
			if(value >= 20)
				this.TIMEREQUEST = value;
		} else if(typeof(value) == "string"){
			if(parsInt(value) >= 20)
				this.TIMEREQUEST = parseInt(value);
		}
	}
}

TextGroupWare.prototype.setDefaultValue = function(value){
	if(this.IF_DISABLED) {
		
	}else {	
		if(typeof(value) == "number"){
			this.TEXT_DEFAULTVALUE = value;
		} else if(typeof(value) == "string"){
			this.TEXT_DEFAULTVALUE = parseInt(value);
		}
		this.TEXTINPUT.value = value;
	}
}

TextGroupWare.prototype.setValueArea = function(value){
	if(this.IF_DISABLED) {
		
	}else {
		if(typeof(value) == "number"){
			this.TEXT_VALUE_AREA = value;
		} else if(typeof(value) == "string"){
			this.TEXT_VALUE_AREA = parseInt(value);
		}
	}
}

TextGroupWare.prototype.setValuePer = function(value){
	if(this.IF_DISABLED) {
		
	}else {
		if(typeof(value) == "number"){
			this.TEXT_VALUE_PER = value;
		} else if(typeof(value) == "string"){
			this.TEXT_VALUE_PER = parseInt(value);
		}
	}
}


TextGroupWare.prototype.createDiv = function(width , height , id){
	var div = document.createElement("DIV");
	div.id = this.DIV_ID = id;
	
	div.style.height = height + "px";
	div.style.padding = "0px";
	div.style.border = "1px solid #CFCFCF";
	
	if(!this.TextGroupWareIsIE()){
		div.style.width = width - 1 + "px";
	}
	else {
		div.style.width = width + 1 + "px";
	}
	div.style.borderRight = "1px solid #ccc";
	//div.style.borderBottom = "1px solid " + this.GROUPWARE_BACKGROUNDCOLOR;
	div.style.backgroundColor = this.GROUPWARE_BACKGROUNDCOLOR;
	div.appendChild(this.createTextDiv());
	div.appendChild(this.createButtonDiv());
	return div;
	/*var div = document.createElement("DIV");
	div.id = this.DIV_ID = id;
	
	div.style.height = height + "px";
	div.style.padding = "0px";
	div.style.border = "1px solid " + this.GROUPWARE_BACKGROUNDCOLOR;
	div.style.borderTop = "2px solid #404040";
	if(!this.TextGroupWareIsIE()){
		div.style.width = width - 1 + "px";
		div.style.borderLeft = "2px solid #404040";
	}
	else {
		div.style.width = width + 1 + "px";
		div.style.borderLeft = "1px solid #404040";
	}
	div.style.borderRight = "1px solid #404040";
	//div.style.borderBottom = "1px solid " + this.GROUPWARE_BACKGROUNDCOLOR;
	div.style.backgroundColor = this.GROUPWARE_BACKGROUNDCOLOR;
	div.appendChild(this.createTextDiv());
	div.appendChild(this.createButtonDiv());
	return div;*/
}

TextGroupWare.prototype.createTextDiv = function () {
	var div = document.createElement("DIV");
	div.style.width = (this.DIV_WIDTH * 2 / 3) + "px";
	div.style.height = this.DIV_HEIGHT + "px";
//	div.style.margin = "auto";
//	div.style.marginTop = "0px";
	div.style.styleFloat = "left";//IE浏览器
	div.style.cssFloat = "left"; //非IE
	div.style.textAlign = "left";
	div.appendChild(this.createTextInput());
	return div;
}

TextGroupWare.prototype.createButtonDiv = function () {
	var div = document.createElement("DIV");
	div.style.width = (this.DIV_WIDTH / 3 - 2) + "px";
	div.style.height = this.DIV_HEIGHT + "px";
	div.style.styleFloat = "left";//IE浏览器
	div.style.cssFloat = "left"; //非IE
	/*if(!this.TextGroupWareIsIE()){
		div.style.margin = "auto";
		div.style.marginTop = "-18px";
		div.style.marginLeft = (this.DIV_WIDTH * 2 / 3) + "px";
	}*/
	//div.style.backgroundColor = this.GROUPWARE_BACKGROUNDCOLOR;
	div.appendChild(this.createUpButton());
	div.appendChild(this.createDownButton());
	return div;
}

TextGroupWare.prototype.createTextInput = function () {
	//var input = null;
	var input = document.createElement("INPUT");
	input.setAttribute("name" , this.TEXT_ID);
	/*if(!this.TextGroupWareIsIE()) {
		input = document.createElement("INPUT");
		input.setAttribute("name" , this.TEXT_ID);
	} else {
		//alert(this.TEXT_ID)
		input = document.createElement("INPUT");
		input.setAttribute("name" , this.TEXT_ID);
		//input = window.document.createElement("<input name='" + this.TEXT_ID + "' />");
		//alert("*")
	}*/
	input.type = "text";
	input.id = this.TEXT_ID;
	input.value = this.TEXT_DEFAULTVALUE;
	input.style.border = "0px";
	input.style.width = (this.DIV_WIDTH * 2 / 3) + "px";
	input.style.height = this.DIV_HEIGHT + "px";
	input.style.textAlign = "center";
	input.style.lineHeight = "16px";
	input.readOnly = "true";
	this.TEXTINPUT = input;
	return input;
}

TextGroupWare.prototype.createUpButton = function () {
	var this_obj = _object_Array[this.OBJID];
	var this_obj_name = _object_Name[this.OBJID];
	var input = document.createElement("INPUT");
	input.type = "button";
	input.style.width = "100%";
	input.style.height = (this.DIV_HEIGHT / 2) + "px"; 
	input.style.border = "0px";
	input.style.cursor = "pointer";
	input.style.styleFloat = "left";
	input.style.backgroundImage = "url(" + this.BUTTON_IMG_UP + ")";
	input.onclick =  function (){
		this_obj.TextValueUp();
		try{this_obj.ONCLICK();}catch(e){}
	};
	input.onmousedown = function() {
		objIdFlag = this_obj.OBJID;
		this_obj.clearInterval();
		clickFlag = 1;
		setTimeout("if(clickFlag == 1 && TextGroupDriver == null) TextGroupDriver = window.setInterval('_object_Array[" + objIdFlag + "].TextValueUp ();' , " + this_obj.TIMEREQUEST + ");" , 500);
	};
	input.onmouseup = function () {
		this_obj.clearInterval();
	};
	input.onmouseout = function () {
		this_obj.clearInterval();
		try{this_obj.ONCLICKED();}catch(e){}
	};
	return input;
}

TextGroupWare.prototype.createDownButton = function () {
	var this_obj = _object_Array[this.OBJID];
	var this_obj_name = _object_Name[this.OBJID];
	var input = document.createElement("INPUT");
	input.type = "button";
	input.style.width = "100%";
	input.style.height = (this.DIV_HEIGHT / 2) + "px";
	input.style.border = "0px";
	input.style.cursor = "pointer";
	//input.style.marginTop = "0px";
	input.style.styleFloat = "left";
	input.style.backgroundImage = "url(" + this.BUTTON_IMG_DOWN + ")";
	//input.onclick = this.OBJNAME + ".TextValueUp(" + this.OBJNAME + ".TEXTINPUT);";
	input.onclick = function () {
		this_obj.ENABLE_ONCLICKED = true;
		this_obj.TextValueDown();
		try{this_obj.ONCLICK();}catch(e){}
	};
	input.onmousedown = function() {
		objIdFlag = this_obj.OBJID;
		this_obj.clearInterval();
		clickFlag = 1;
		setTimeout("if(clickFlag == 1 && TextGroupDriver == null) TextGroupDriver = window.setInterval('_object_Array[" + objIdFlag + "].TextValueDown ();' , " + this_obj.TIMEREQUEST + ");" , 500);
	};
	input.onmouseup = function () {
		this_obj.clearInterval();
	};
	input.onmouseout = function () {
		this_obj.clearInterval();
		try{this_obj.ONCLICKED();}catch(e){}
	};
	return input;
}

//IE 火狐
TextGroupWare.prototype.TextGroupWareIsIE = function () {
	var iePos = navigator.userAgent.indexOf("MSIE");
	if(iePos == -1) {
		//不是IE
		return false;
	}else{
		return true;
	}
}

TextGroupWare.prototype.TextValueUp = function () {
	if(this.IF_DISABLED) {
		
	}else {
		var currenTextValue = parseFloat(this.TEXTINPUT.value);
		if (currenTextValue < (parseInt(this.TEXT_DEFAULTVALUE) + this.TEXT_VALUE_AREA ) && currenTextValue > (parseInt(this.TEXT_DEFAULTVALUE) - this.TEXT_VALUE_AREA)){
			if(parseFloat(currenTextValue) + this.TEXT_VALUE_PER != (parseInt(this.TEXT_DEFAULTVALUE) + this.TEXT_VALUE_AREA )) {
				this.TEXTINPUT.value = parseFloat(currenTextValue) + this.TEXT_VALUE_PER;
				var isDefineNjChange = !(typeof nj_change == "undefined") ; 
				if (isDefineNjChange) { // 如果定义了nj_change()函数，则运行
					nj_change();
				}
			}
		}
		else  
			this.clearInterval();
	}
}

TextGroupWare.prototype.TextValueDown = function () {
	if(this.IF_DISABLED) {
		
	}else {
		var currenTextValue = parseFloat(this.TEXTINPUT.value);
		if (currenTextValue < (parseInt(this.TEXT_DEFAULTVALUE) + this.TEXT_VALUE_AREA ) && currenTextValue > (parseInt(this.TEXT_DEFAULTVALUE) - this.TEXT_VALUE_AREA))
			if(parseFloat(currenTextValue) - this.TEXT_VALUE_PER != (parseInt(this.TEXT_DEFAULTVALUE) - this.TEXT_VALUE_AREA )) {
				this.TEXTINPUT.value = parseFloat(currenTextValue) - this.TEXT_VALUE_PER;
				var isDefineNjChange = !(typeof nj_change == "undefined") ; 
				if (isDefineNjChange) { // 如果定义了nj_change()函数，则运行
					nj_change();
				}
			}
		else this.clearInterval();
	}
}

TextGroupWare.prototype.clearInterval = function () {
	if(TextGroupDriver != null){
		window.clearInterval(TextGroupDriver);
	}
	TextGroupDriver = null;
	clickFlag = 0;
}

TextGroupWare.prototype.disable = function () {
	this.IF_DISABLED = true;
	if(this.TEXTINPUT != null) {
		try{
			this.TEXTINPUT.style.backgroundColor = this.DISABLED_BACKGROUNDCOLOR;
			this.TEXTINPUT.style.color = this.DISABLED_INPUT_FONT_BACKGROUNDCOLOR;
			this.TEXTINPUT.disabled = this.IF_DISABLED;
		} catch (e) {}
	}
}

TextGroupWare.prototype.enable = function () {
	this.IF_DISABLED = false;
	if(this.TEXTINPUT != null) {
		try{
			this.TEXTINPUT.style.backgroundColor = "";
			this.TEXTINPUT.style.color = "black";
			this.TEXTINPUT.disabled = this.IF_DISABLED;
		} catch (e) {}
	}
}

TextGroupWare.prototype.readOnly = function (bl) {
    if (bl) {
        this.TEXTINPUT.style.backgroundColor = this.READONLY_BACKGROUNDCOLOR;
        this.setValuePer(0);
    } else {
        this.TEXTINPUT.style.backgroundColor = this.GROUPWARE_BACKGROUNDCOLOR;
        this.setValuePer(1);
    }
}



