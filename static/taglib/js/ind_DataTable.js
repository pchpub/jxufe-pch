	//分页
	function doPanigator (obj){
		var currentNum=parseInt(document.getElementById("hidPageNo").value,10);
		var totalPage=parseInt(document.getElementById("totalPage").innerHTML,10);
		if(currentNum<=0) return;
		
		if(obj.id=="first") currentNum=1;
		if(obj.id=="prev") currentNum--;				
		if(obj.id=="next") currentNum++;
		if(obj.id=="last") currentNum = totalPage;
		
		if(currentNum<=0 || currentNum>totalPage) return;
		document.getElementById("hidPageNo").value=currentNum;
		gotoPageNum(currentNum);
	}
	
	//换页
	function gotoPageNum(currPageCount)
	{
		var url = document.getElementById("panigatorAction").value;
		url = url + "?currPageCount="+currPageCount;
		document.getElementById("kingo_ui_datatable_form").action = url;
		document.getElementById("kingo_ui_datatable_form").submit();
	}

	//转到页码
	function goToPageNo(e,obj)
	{
		var e = window.event?window.event:e;
		var x=e.keyCode;
		if(x!=13) return false;			
		if(x<48||x>57) e.returnValue=false;
		
		if(obj.value=="")
		{
			alert("须录入页码!");
			return false;
		
		}else if(obj.value!="" && (isNaN(obj.value)))
		{
			alert("须录入正确的页码!");
			return false;
	
		}else if(obj.value<=0) 
		{	
			alert("须录入正确的页码!");
			return false;
		}
		
		var totoPageNum=parseInt(document.getElementById("totalPage").innerHTML,10);
		var pageXno=parseInt(obj.value,10);
		if(pageXno<1) pageXno=1; 
		if(pageXno>totoPageNum) pageXno=totoPageNum;
	
		document.getElementById("hidPageNo").value=pageXno;
		
		gotoPageNum(pageXno);
	}
	
	// 转到页码(链接)
	function goToPageNoLink(obj) {
		if(obj.value == "") {
			alert("须录入页码！");
			return false;
		} else if(obj.value != "" && (isNaN(obj.value))) {
			alert("须录入正确的页码！");
			return false;
		} else if(obj.value <= 0) {	
			alert("须录入正确的页码！");
			return false;
		}
		
		var totoPageNum = parseInt(document.getElementById("totalPage").innerHTML, 10);
		var pageXno = parseInt(obj.value, 10);
		if(pageXno < 1) {
		    pageXno = 1;
		}
		if(pageXno > totoPageNum) {
		    pageXno = totoPageNum;
		}
	
		document.getElementById("hidPageNo").value = pageXno;
		
		gotoPageNum(pageXno);
	}
	
	//更新翻页区域
	function reloadPage(iAction,iPS,iPN)
	{
		document.getElementById('totalPage').innerHTML=iPS;			
		document.getElementById('currentPage').innerHTML=iPN;
		document.getElementById('goPageNo').value=iPN;
		document.getElementById('hidPageNo').value=iPN;
		document.getElementById('panigatorAction').value=iAction;
		
	}

	function drawPanigator(){
		if (typeof isVersion20 == "undefined"){
			drawPanigator14();
		} else {
			drawPanigator20();
		}
	}
	
	function drawPanigator14(){
		var vHTMLStr="";
		vHTMLStr+="<table width='100%' height='100%' border='0' cellspacing='0' cellpadding='0'><tr>";
		
		vHTMLStr+="<td align='left'>&ensp;第&ensp;<font color='red'><span id='currentPage'>0</span></font>&ensp;页&ensp;&ensp;";
		vHTMLStr+="共&ensp;<font color='red'><span id='totalPage'>0</span></font>&ensp;页</td>";
		vHTMLStr+="<td nowrap align='right' >";
		
		vHTMLStr+="<a href='#' id='first' onclick='doPanigator(this);return false;'>首页</a>&ensp;&ensp;";
		vHTMLStr+="<a href='#' id='prev' onclick='doPanigator(this);return false;'>上页</a>&ensp;&ensp;";
		vHTMLStr+="<a href='#' id='next' onclick='doPanigator(this);return false;'>下页</a>&ensp;&ensp;";
		vHTMLStr+="<a href='#' id='last' onclick='doPanigator(this);return false;'>末页</a>";
		
		vHTMLStr+="<input type='hidden' id='panigatorAction' name='panigatorAction' >";
		vHTMLStr+="<input id='hidPageNo' type='hidden' name='hidPageNo' value='0'>";
		
		vHTMLStr+="&ensp;&ensp;<a href='#' onclick='goToPageNoLink(document.getElementById(\"goPageNo\"));return false;'>转到</a>第&ensp;<input id='goPageNo' name='goPageNo' class='text_center' onkeypress='goToPageNo(event,this)' size=3 type='text' title='录入页码后，按回车即可换页。' maxlength='3' >&ensp;页&ensp;</td>";
		
		vHTMLStr+="</td></tr></table>";
		document.write(vHTMLStr);
	}
	
	// bootstrap分页样式
	function drawPanigator20(){
		var vHTMLStr=[];
		vHTMLStr.push('<div class="table-page">');
		vHTMLStr.push('<div class="pull-left">');
		vHTMLStr.push('<span class="page-list">第<span id="currentPage">0</span>页</span>');
		vHTMLStr.push('<span class="page-list">共<span id="totalPage">0</span>页</span>	');
		vHTMLStr.push('</div>');
		vHTMLStr.push('<div class="pull-right change-page">');
		vHTMLStr.push('<a href="javascript:void(0);" id="first" onclick="doPanigator(this);return false;">首页</a>');
		vHTMLStr.push('<a href="javascript:void(0);" id="prev" onclick="doPanigator(this);return false;">上页</a>');
		vHTMLStr.push('<a href="javascript:void(0);" id="next" onclick="doPanigator(this);return false;">下页</a>');
		vHTMLStr.push('<a href="javascript:void(0);" id="last" onclick="doPanigator(this);return false;">末页</a>');
		vHTMLStr.push('<span class="jump-page">转到第');
		vHTMLStr.push('<span>');
		vHTMLStr.push('<input id="goPageNo" name="goPageNo" onkeypress="goToPageNo(event,this)" size=3 type="text" title="录入页码后，按回车即可换页。" maxlength="3" >');
		vHTMLStr.push('</span>页</span></div>');
		vHTMLStr.push('<input type="hidden" id="panigatorAction" name="panigatorAction"/>');
		vHTMLStr.push('<input id="hidPageNo" type="hidden" name="hidPageNo" value="0">');
		vHTMLStr.push('</div>');
		document.write(vHTMLStr.join(""));
	}	
	
	function dblSelectedTr(obj){
	    var flag="1";
        try{
            flag=parent.dblSelectedTr_before(obj);
        }catch(e){
            flag="1";
		}
		if(flag=="1"){
            if (typeof isVersion20 == "undefined"){
                //changeRowBgColor(obj);
                changeRowBgColor_selectedtheme(obj);  // 统一为 selectedBlue  2020-08-25
            } else {
                changeRowBgColor_selectedtheme(obj);
            }
            setValue(obj);
            /*if(parent.document.getElementById("btnSave")){//双击将保存按钮置为不可用
                parent.document.getElementById("btnSave").disabled=true;
            }*/
            try{
                parent.dblSelectedTr(obj);
            }catch(e){}
		}
	}
	
	function sglSelectedTr(obj){
		if (typeof isVersion20 == "undefined"){
			//changeRowBgColor(obj);
			changeRowBgColor_selectedtheme(obj);  // 统一为 selectedBlue  2020-08-25
		} else {
			changeRowBgColor_selectedtheme(obj);
		}
		//setValue(obj);//180712请勿打开该函数
		try{
			parent.sglSelectedTr(obj);
		}catch(e){}
	}
	
	//全选功能 obj : this
	function selectAllCheckBox(obj){
		//var parent_div = jQuery(obj).parent().parent().parent().parent().parent().attr("class");
		//var obj_checked = obj.checked ;
		//alert("obj_checked="+obj_checked+"/parent_div="+parent_div);
		var element = window.document.getElementsByTagName("input");
		var len = element.length;
		if(len >= 1 ){
	    	for (i=0;i<len;i++){
	        	if(element[i].type=="checkbox" && element[i].getAttribute("kind")=="checkbox" && !element[i].disabled){
	        		element[i].checked=obj.checked;
	        		try {
	        		    parent.selectAllCheckBoxCustomFunc(obj, element[i].parentNode.parentNode);
	        		} catch (e) {}
	        	}
	    	}
	    }else {
	    	obj.checked = ! obj.checked;
	    }
	}
	
	/*
	function setValue(obj){
		var tr=obj;
		var json={};
		var n=tr.cells.length;
		for(var i=0;i<n;i++){
			if(tr.cells[1].getAttribute("name") != null)
				json[tr.cells[i].getAttribute("name")] = ts_getInnerText(tr.cells[i]);
		}
		var element=parent.document.forms[0].elements;
		var m=element.length;
		
		for(var j=0;j<m;j++){
			var key=element[j].getAttribute("id");
			var value = json[key];
			if(element[j].type == "text" || element[j].type == "hidden" 
				|| element[j].type == "select-one" || element[j].type == "textarea")
				value == undefined ? null : element[j].value = value;
			else if(element[j].type == "checkbox"){
				if(value == "true")
					element[j].checked = true;
				else
					element[j].checked = false;
			}
		}
	}
	*/
	
	function setValue(obj){
		var tr=obj;
		var json={};
		var n=tr.cells.length;
		var element=parent.document.forms[0].elements;
		var m=element.length;
		
		for(var i=0;i<n;i++){
			var td_name = tr.cells[i].getAttribute("name");
			if(td_name != null)
			{
				json[tr.cells[i].getAttribute("name")] = ts_getInnerText(tr.cells[i]);
				for(var j=0;j<m;j++){
					var key = element[j].getAttribute("id");
					if(td_name == key){
						var value = json[key];
						if(element[j].type == "text" || element[j].type == "hidden" 
							|| element[j].type == "select-one" || element[j].type == "textarea")
							value == undefined ? null : element[j].value = value;
						else if(element[j].type == "checkbox"){
							if(value == "true")
								element[j].checked = true;
							else
								element[j].checked = false;
						}
					}
				}
			}
		}
	}
	
	function ts_getInnerText(el){
	    if(el.innerText || el.innerText=="")return el.innerText;//IE下获取
	    if(el.textContent || el.textContent=="")return el.textContent;//FF下获取
	    if(el.hasChildNodes())return el.childNodes[0].value; //获取子结点元素值
	}
	
	function getOptionType(){
		document.oncontextmenu=new Function("return false;");
		var message = document.getElementById("message").innerHTML;
		if(message== "success"){parent.showMsg("数据操作成功!","ActionForm1");}
		else if(message== "fail")parent.showMsg("数据操作失败!","ActionForm1");
	}

	var __changeRowBgColor = function (obj){	
		var pivId,pivColor,vColor,pivFontColor;
		vColor='#89BFA7';
		
		// 以table header的底色作为双击后的底色（2015.08.17 for 教务V14改版）
		var trh_class = jQuery("tr.H").attr("class");
		var cur_theme = new String(trh_class).replace("H tr_h",""); // 从表头的样式类中获取用户主题样式
		jQuery("tr.E").addClass("tr_e"+cur_theme); 
		jQuery(obj).removeClass("tr_e"+cur_theme);
		vColor = jQuery("tr.H").css("background-color");  // 获取表头的背景色，用于双击选中行的赋值
		//alert("vColor="+vColor + "/tr.H.class="+trh_class+"cur_theme="+cur_theme);										
											
		pivId=document.getElementById("pivRow").getAttribute("valueId");
		pivColor=document.getElementById("pivRow").getAttribute("pivColor");						
		pivFontColor=document.getElementById("pivRow").getAttribute("pivFontColor");	
		if (pivFontColor=="Noting" ){									
			document.getElementById("pivRow").setAttribute ("pivColor",obj.style.backgroundColor);	
			document.getElementById("pivRow").setAttribute ("pivFontColor",obj.style.color);
			document.getElementById("pivRow").setAttribute ("valueId",obj.id);
			obj.style.backgroundColor =vColor;	
			obj.style.color="#ffffff";
			return true;					
		}
		else if(pivId==obj.id){									
			return false;
		}
		else{			
			var pObj = document.getElementById(pivId);
			pObj.style.backgroundColor = pivColor;
			pObj.style.color = pivFontColor;
			document.getElementById("pivRow").setAttribute ("pivColor",obj.style.backgroundColor);	
			document.getElementById("pivRow").setAttribute ("pivFontColor",obj.style.color);	
			document.getElementById("pivRow").setAttribute ("valueId",obj.id);
			obj.style.backgroundColor=vColor;							
			obj.style.color="#ffffff";
			return true;         							
		}
	}
			
	var changeRowBgColor = function (obj){	
		var pivId,pivColor,vColor,pivFontColor;
		vColor='#89BFA7';
		try{
		  vColor=parent.parent.Skin.getRowClickColor();//这个是拿到动态双击颜色
		}catch(e){
			try{
			vColor=parent.parent.parent.Skin.getRowClickColor();//这个是拿到动态双击颜色
			}catch(e){}
		}	
		try{
            //可能未引用jquery.js,未定义jQuery对象
            //vColor = jQuery("tr.H").css("background-color"); // 获取表头的背景色，用于双击选中行的赋值
            var theme = _stylePathPrefix;
            jQuery(obj).parent().find("tr").removeClass("selected"+theme);
            jQuery(obj).addClass("selected"+theme);
		}catch(e){
		}
		pivId=document.getElementById("pivRow").getAttribute("valueId");
		pivColor=document.getElementById("pivRow").getAttribute("pivColor");						
		pivFontColor=document.getElementById("pivRow").getAttribute("pivFontColor");				
		if (pivFontColor=="Noting" ){									
			document.getElementById("pivRow").setAttribute ("pivColor",obj.style.backgroundColor);	
			document.getElementById("pivRow").setAttribute ("pivFontColor",obj.style.color);
			document.getElementById("pivRow").setAttribute ("valueId",obj.id);
			obj.style.backgroundColor =vColor;							
			obj.style.color="#ffffff";
			return true;					
		}
		else if(pivId==obj.id){									
			return false;
		}
		else{														
			var pObj = document.getElementById(pivId);
			pObj.style.backgroundColor = pivColor;
			pObj.style.color = pivFontColor;
			document.getElementById("pivRow").setAttribute ("pivColor",obj.style.backgroundColor);	
			document.getElementById("pivRow").setAttribute ("pivFontColor",obj.style.color);	
			document.getElementById("pivRow").setAttribute ("valueId",obj.id);
			obj.style.backgroundColor=vColor;							
			obj.style.color="#ffffff";
			return true;         							
		}
	}
	
	var changeRowBgColor_selectedtheme = function (obj){
		var theme = _stylePathPrefix;
		/**
		var selected = document.getElementsByClassName("selected"+theme);
		if(selected.length>0){
			for(var i=0;i<selected.length;i++){
				selected[i].classList.remove("selected"+theme);
			}
		}
		obj.classList.add("selected"+theme);
		*/
		jQuery(obj).parent().find("tr").removeClass("selected"+theme);
		jQuery(obj).addClass("selected"+theme);
	}	
	
	function datalist_scroll(){
		//document.getElementById('kingo_datalist_headframe').style.posRight = document.getElementById('kingo_datalist_bodyframe').scrollLeft;
		document.getElementById('kingo_datalist_headframe').scrollLeft = document.getElementById('kingo_datalist_bodyframe').scrollLeft;
	}
	
	function autoAdjustPosition(){
                window.setTimeout(function(){
                	
			var listframeHeight = document.body.clientHeight;
			var headframeHeight = document.getElementById('kingo_datalist_headframe').offsetHeight;
			var bodyframeHeight = listframeHeight  - headframeHeight;
			document.getElementById('kingo_datalist_bodyframe').style.height = bodyframeHeight+"px";
			//document.getElementById('kingo_datalist_headframe').style.width = document.getElementById('kingo_datalist_bodyframe').style.width;
		},100);
	}
	
	function showAllContent(tableObj,index){
	   //console.log("showAllContent.begin."+new Date().getTime());	
       var rowArr=tableObj.rows;
       //console.log("rowArr.length="+rowArr.length+"/"+new Date().getTime());
       if (rowArr.length>1000){
       	  // 检索的记录数大于1000,则不加title信息
       	  return ;
       }
       for(var i=0;i<rowArr.length;i++){
         var tdArr=rowArr[i].cells;
         for(var j=index;j<tdArr.length;j++){
           if(tdArr[j].childNodes.length<2&&(tdArr[j].innerHTML.indexOf("<")==-1&&tdArr[j].innerHTML.indexOf("/>")==-1)){
                // replaceAll 是jkingo.js中的方法，此处不引用replaceAll 
             	//tdArr[j].title=tdArr[j].innerHTML.replaceAll("&nbsp;"," ").replaceAll("&ensp;"," ");
             	var reg1 = new RegExp("&nbsp;","g");//g,表示全部替换
             	var reg2 = new RegExp("&ensp;","g");//g,表示全部替换
             	tdArr[j].title=tdArr[j].innerHTML.replace(reg1," ").replace(reg2," ");
           }
        }
       }
       //console.log("showAllContent.done."+new Date().getTime());
    }
    
	function calTableHead(){
	
		var divwidth = jQuery(".datalist").outerWidth();
		var tablewidth = jQuery(".datalist table").outerWidth(); 		
 		//alert("tablewidth="+tablewidth+"/divwidth="+divwidth + "/torf="+(tablewidth > divwidth));
 		//if(tablewidth > divwidth){
 			//console.log($(".datalist .table thead").offset().top+"/"+$(".datalist .table thead").offset().left);
	  		jQuery(".fixedTable").css("width",tablewidth+"px");
	  		var tds = jQuery(".datalist").find("thead td");
	  		var newTds = [];
	  		jQuery.each(tds,function(index,item){
	  			var thisItem = jQuery(item);
	  			if(thisItem.css("display") != "none"){
	  				var str = [];	
	  				var id = thisItem.attr("id");
                    if(id!=undefined){//封装的列没有id，不启用排序
                        str.push('<td onclick=\'kSort("'+id+'",this)\' width="'+(thisItem.attr("width") ? thisItem.attr("width") : thisItem.css("width"))+'"');
                    }else{
                        str.push('<td width="'+(thisItem.attr("width") ? thisItem.attr("width") : thisItem.css("width"))+'"');
                    }
                    str.push((thisItem.attr("style") ? ' style="'+thisItem.attr("style")+'"':''));
	  				newTds.push(str.join("")+'>'+thisItem.html()+'</td>');
	  			}
	  		});
	  		//console.log(newTds.join(""));
	  		// clone header 
	  		var appendHtml = '<table width="100%" class="table table-striped table-bordered table-hover"><thead><tr class="text-center">'+newTds.join("")+'</tr></thead></table>';
	  		jQuery(".fixedTable").empty().append(appendHtml);
	  		
			// set .fixedTable left position
			var _theadObj = jQuery(".datalist .table thead");
			if (_theadObj!=null && _theadObj.length>0) {
				var _hideheaderleft = jQuery(".datalist .table thead").offset().left ;
				jQuery(".fixedTable").css("left", _hideheaderleft);
			}

	  		// 隐藏占用空间  : visibility : hidden 
	  		// 隐藏不占用空间： display:none;
	  		//jQuery(".datalist>table>thead>tr>td").find("input").css("visibility","hidden");
	  		//jQuery(".fixedTable>table>thead>tr>td").find("input").css("visibility","visible");
 		//}
	}    
    var lastObject=null;
    function kSort(id,obj){
    	if(id!=undefined&&kNeedSort=='1'){
    		try{
    			if(lastObject!=null&&lastObject!=obj){
					jQuery(lastObject).css("background-image","url()");
				}
			}catch(e){}
    		jQuery("#"+id).click();
    		if(!jQuery(obj).css('background-image')){
    			jQuery(obj).css("background-image","url(../custom/images/sortdown.png)");
    		
    		}else{
    			if(jQuery(obj).css('background-image').indexOf('sortdown.png')==-1){
    				jQuery(obj).css("background-image","url(../custom/images/sortdown.png)");
    			}else{
    				jQuery(obj).css("background-image","url(../custom/images/sortup.png)");
    			}
    		}
    		//jQuery(obj).css("background-size", "100%");
    		jQuery(obj).css("background-position", "right");
    		jQuery(obj).css("background-repeat", "no-repeat");
    		lastObject=obj;
    		
    	}
    }
    
	// 设置数据列表区域高度等同于父Iframe的高度
    function calcParentFrameHeight(){
		var _frames = window.parent.frames;
		for(var i=0;i<_frames.length;i++)
		{
		  if(_frames[i].window.document == window.document)
		  {
		  	var _ifname = _frames[i].name ;
		  	//alert("ind_DataTable::_ifname="+_ifname);
		  	var _height = "";
		  	if (_ifname == ""){
		  		// 弹窗直接调用数据列表的情况 cKWindow.setSrc("../taglib/DataTable.jsp?tableId=10138
		  		// iframe 未定义id和name值
		  		_height = jQuery("#CKWindowContainer", parent.document).css("height");
		  		_height = _height.replace("px","") - 35;
		  		//alert("framename="+_ifname+"/_height2="+_height);
		  	} else {
		  		_height = jQuery("#"+_ifname, parent.document).height();
		  	}
		  	var _pwinH = parent.document.body.clientHeight;
		  	//alert("framename="+_ifname+"/_height="+_height+"/_pwinH="+_pwinH);
			jQuery("body").css("height", _height);
			// 2021-03-25日 有分页导航区时修正数据列表区的高度
			if (jQuery(".pagination-outer").height()!=null) {
			  if (_height >= 600) {
				  //alert(jQuery(".datalist").css("height") + ":" + jQuery(".pagination-outer").height());
				  if (_height >= 900) {
					  jQuery(".datalist").css("height", "95%");
				  } else {
					  jQuery(".datalist").css("height", "93%");
				  }
			  } else {
				  if (_height <= 300) {
					  jQuery(".datalist").css("height", "87%");  //85%横向滚动条被覆盖了一大部份。
				  } else {
					  jQuery(".datalist").css("height", "91%");
				  }
			  }
			} else {
			  //alert(".pagination-outer is null .");
			}

			// 主窗体不出现滚动条
			try{
				var j_frmDesk = jQuery("#frmDesk", parent.parent.document);
				//alert(j_frmDesk[0].name);
				if (j_frmDesk){
			    	j_frmDesk.attr("scrolling","no");
				}
			}catch(e){
			}		
			
		  }
		} 
	}
	
	// 设置表格标题背景色和文本居中显示
	function calTableHeadBgColor(){
		var _bgcolor = getTableHeadBgColor();
		//alert("_stylePathPrefix :"+_stylePathPrefix+"/_bgcolor="+_bgcolor);
		//jQuery(".datalist .table thead").css("background-color","#FFFFFF");
		//jQuery(".fixedTable .table thead").css("background-color",_bgcolor).css("color","#FFFFFF") ;
		jQuery(".table thead").css("background-color",_bgcolor).css("color","#FFFFFF") ;
	}
	
	function getTableHeadBgColor(){
		var _bgcolor = "#F7F7F7";
		if (_stylePathPrefix == "blue"){
			_bgcolor = "#0085C2"; //"#468DBB"; //"#ABCADE";
		} else if (_stylePathPrefix == "green"){
			_bgcolor = "#6CB975"; //"#A9D4A7";
		} else if (_stylePathPrefix == "purple"){
			_bgcolor = "#9B7AC4"; //"#B49CD3";
		} else if (_stylePathPrefix == "red"){
			_bgcolor = "#891616"; //"#DB5858";  //#D22E2E
		}
		return _bgcolor ;
	} 

   function initShowAllContent(){
       var tbody=document.getElementsByTagName("tbody")[0];
       if(tbody!=null&&tbody!=""){
          showAllContent(tbody,0);
       }
   }  		
	
	// IE6下Array不支持indexOf方法----Array原型链扩展 
	if(!Array.prototype.indexOf){
		Array.prototype.indexOf = function(val){
		   var value = this;
		   for(var i =0; i < value.length; i++){
		      if(value[i] == val)
		        return i;
		   }
		   return -1;
		};
	}	
	
	//重新计算数据数据列表区域的高度
   function autoResizeFrmreport(){
		var _menucode = getCurrentMenucode();
		//var _includes = calc_menucodes.includes(_menucode);  //IE兼容模式不支持此方法
		//if (_includes){
		var _includes = calc_menucodes.indexOf(_menucode);
		if (_includes>0){
			// 白名单中的功能代码，重新计算数据数据列表区域的高度
			var winH = parent.document.body.clientHeight;
			var theOptAreaH = jQuery("#theOptArea",parent.document).outerHeight();
			// 如果有特殊情况，依据功能代码定制业务逻辑
			var _plusheight = getPlusHeight(_menucode);
			var _height = winH - theOptAreaH - _plusheight - 20;
			//console.log("winH:"+winH+",theOptAreaH:"+theOptAreaH+",_height:"+_height);
			jQuery("#theRptArea", parent.document).css("height",_height+"px");
	 		// 依据有无分页设置数据列表的高度
	 		var _pagediv = jQuery(".pagination-outer");
	 		if (typeof _pagediv.html() == "undefined"){
	 			// 没有分页
	 			jQuery(".datalist").css("height",_height);
	 		} else {
	 			// 有分页
	 			var _pageHeight = _pagediv.outerHeight();
	 			var _datalistHeight = _height - _pageHeight ;
	 			if (_datalistHeight < 100) {
	 				_datalistHeight = 100;
	 			}
	 			jQuery(".datalist").css("height",_datalistHeight);
	 			_pagediv.css("top",_datalistHeight+3);
	 		}
		}
   }
   
	//判断是否有滚动条 true 有滚动条 false 没有
	// 调用 hasScrolled($(".dataTables_scrollBody"), 'horizontal')；  
	function hasScrolled(element, direction) {
	    if (direction === 'vertical') {
	        return element[0].scrollHeight > element.innerHeight();
	    } else if (direction === 'horizontal') {
	        return element[0].scrollWidth > element.innerWidth();
	    }
	}

	// 判断浏览器的类型和版本
    //var result = validBrowserVersion();
    //console.log(result.type+parseInt(result.version));
    function validBrowserVersion(){
        var explorer = window.navigator.userAgent.toLowerCase() ;
        var versionIsOk = true;
        //ie
        if (explorer.indexOf("msie") >= 0) {
            var ver=parseInt(explorer.match(/msie ([\d.]+)/)[1]);
            //return {type:"IE",version:ver};
            return "IE " + ver;
        }
        //firefox
        else if (explorer.indexOf("firefox") >= 0) {
            var ver=explorer.match(/firefox\/([\d.]+)/)[1];
            //return {type:"Firefox",version:ver};
            return "Firefox " + ver;
        }
        //Chrome
        else if(explorer.indexOf("chrome") >= 0){
            var ver=explorer.match(/chrome\/([\d.]+)/)[1];
            //return {type:"Chrome",version:ver};
            return "Chrome " + ver;
        }
        //Opera
        else if(explorer.indexOf("opera") >= 0){
            var ver=explorer.match(/opera.([\d.]+)/)[1];
            //return {type:"Opera",version:ver};
            return "Opera " + ver;
        }
        //Safari
        else if(explorer.indexOf("safari") >= 0){
            var ver=explorer.match(/version\/([\d.]+)/)[1];
            //return {type:"Safari",version:ver};
            return "Safari " + ver;
        } else {
        	//return {type:"N/A",version:0};
        	return "N/A ";
        }
    }    
    
    function isIE(){
        var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串 
        var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器 
        return isIE;
    }
    
	function IEVersion() {
        var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串 
        var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器 
        var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器 
        var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
        if(isIE) {
            var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
            reIE.test(userAgent);
            var fIEVersion = parseFloat(RegExp["$1"]);
            if(fIEVersion == 7) {
                return 7;
            } else if(fIEVersion == 8) {
                return 8;
            } else if(fIEVersion == 9) {
                return 9;
            } else if(fIEVersion == 10) {
                return 10;
            } else {
                return 6;//IE版本<=7
            }  
        } else if(isEdge) {
            return 'edge';//edge
        } else if(isIE11) {
            return 11; //IE11 
        }else{
            return -1;//不是ie浏览器
        }
    }
   
   // 获取附加的占用高度
   function getPlusHeight(_menucode){
   	 var _plusheight = 0;
	 var _includes = plus_menucodes.indexOf(_menucode);
	 if (_includes>0){
		 _plusheight = 15;
	 }
   	 return _plusheight ;
   }
   
  	// 获取当前操作功能代码
   function getCurrentMenucode(){
		var _menucode = "";
		var _menucode_current = parent.parent.window.document.getElementById("menucode_current");
		if (!_menucode_current || _menucode_current == ""){
			_menucode_current = parent.window.document.getElementById("menucode_current");
		}
		if(_menucode_current){
			_menucode = _menucode_current.value;
		}
		return _menucode ;
   }    

	//需要重新计算数据列表高度的功能项
	var plus_menucodes = 
		[
			//"130101",  //录入理论课程信息
			"130102",  //申请增开理论课程
			"130103",  //审核增开理论课程
			"130404",  //设置替代课程/环节
			//"130105",  //处理错误理论课程[修改]
			"130108",  //批量设置课程/环节标签
			"130201",  //录入实践环节信息
			"130202",  //申请增开实践环节
			"130203",  //审核增开实践环节
			"130205"  //处理错误实践环节[修改]
    	];

	//需要重新计算数据列表高度的功能项
	var calc_menucodes = 
		[
			//"10",  //基础资源
			"1002",  //校区信息
			"1102",  //部门信息
			"1103",  //设置教学承担单位
			"1104",  //设置教学管理部门
			"1105",  //院(系)/部信息
			"1106",  //处室与科室信息
			"1107",  //系(教研室)/研究室/实验室信息
			"1201",  //专业大类
			"1202",  //专业信息
			"1203",  //专业方向
			"1402",  //楼房信息
			"1403",  //设置教学场地信息
			"1407",  //申请增开实验室
			"1408",  //审核增开实验室
			//"13",  //课程/环节管理
			//"130100",  //录入课组信息
			//"130101",  //录入理论课程信息
			"130102",  //申请增开理论课程
			"130103",  //审核增开理论课程
			//"130105",  //处理错误理论课程[修改]
			"130108",  //批量设置课程/环节标签
			"130109",  //设置课程/环节分组标准
			"130201",  //录入实践环节信息
			"130202",  //申请增开实践环节
			"130203",  //审核增开实践环节
			"130205",  //处理错误实践环节[修改]
			"130302",  //录入课程/环节教学大纲
			"130303",  //审核课程/环节教学大纲
			//"130404",  //设置替代课程/环节
			"130405",  //审核申请替代课程(教务处)
			"130406",  //审核申请替代课程(承担单位)
	 		//"20",  //师资管理
			//"2201"  //登记导师资格
			,"2101"  //教职工信息
			,"2201"  //导师资格
			,"2102"  //外聘教师信息
			,"2403"  //登记助教费
    	];
	