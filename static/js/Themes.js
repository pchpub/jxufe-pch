/**
 * 换肤功能，新增加一种皮肤后要建立相应的css文件，文件命名用themes_皮肤名称.css,
 * 然后还需要在下面getRowClickColor中增加相应的值，还有Window.js的getTitleColor中增加相应的值
 */
var _skintype = "";

var Skin = {
	getSkin : function(path){
		if(_skintype == null || _skintype==""){
			path = path || "../";
			
			/*
			var url = path + "getuserskinservlet";
			var xmlHttp = getXMLHttp(url,"get",false);
			if(xmlHttp.status == 200){
				var text = xmlHttp.responseText;
				if(text!=null&&text!=""){
					_skintype = text.split(",")[1];
				}else{
					_skintype = "default";
				}
			}
			*/
			//_skintype = "classical/css/blue/blue";
			_skintype = "classical/css/green/green";
		}
		return _skintype;
	},
	loadSkin : function(themePath,path){
		if(themePath != null && themePath != "")
			_skintype = themePath;
		else
			_skintype = this.getSkin(path);
		path = path || "../";
		
		if(_skintype != null && _skintype != ""){
			//alert(path+_skintype+"themes_skin");
			AppendCssFile(path+_skintype,"themes_skin");
			//alert("skin里面"+path+_skintype);
			this.setSkin();
			//alert("skin里面000"+path+_skintype);
			
		}
	},
	setSkin : function(){
		try{
			_skin = _skintype;
		}catch(e){}
		try{
			parent._skin = _skintype;
		}catch(e){}
	},
	getRowClickColor : function(){//设置报表中单击一行时的颜色
		try{
			return parent.SkinColor.getRowClickColor();
		}catch(e){
			switch(_skintype){
				case "default":return "#5DB396";
				case "blue":return "#3EA9ED";
				case "red":return "#F786BB";
				case "yellow":return "#3EA922";
				case "green":return "#9FD828";
				case "purple":return "#B49CD3";
			}
			if (_skintype.indexOf("/blue")!=-1){
			   return "#ABCADE";
			}else if (_skintype.indexOf("/green")!=-1){
			   return "#A9D4A7";
			}
			return "#5DB396";
		}
	}
}

function AppendCssFile(fn, fid){
	var el=document.createElement("link");
	el.setAttribute("id",fid);
	el.setAttribute("rel", "stylesheet");
	el.setAttribute("type", "text/css");
	el.setAttribute("media","screen");
	el.setAttribute("href", fn);
	if (typeof(el)!="undefined"){
		document.getElementsByTagName("head")[0].appendChild(el);
	}
}

