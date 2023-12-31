function CKDList(){
    this._CtrlList = null;
    this._Others = null;
    this._OptionList = new Array();
    this._ObjInput = null;
    this._AryData = new Array();
    this.xmlhttp = null;
    this.sellen = null;
    this.classname = null;
    this.selNum = null;
    this.preUrl = "../taglib/DroplistControl.jsp";
    this.whichSelect = '0';
    this.selOnchanges = new Array();
    this.urlParm = "";//设置form的参数组成的url,用于list类型
    this.formParm = "";
    this.initSelValue = new Array();//初始化时各下拉框默认值
    this.initdroplist = true;//是否是第一次加载数据

    // 新下拉框的成员属性
    this.basePath = "../";
    this.sel_id; // 下拉框id,可以是字符串,也可以是一个数组
    this.requestUrl = "taglib/DroplistControl.jsp?flag=datasource"; // servlet的请求路径
}

function filedata(){
this._ListData=new Array();
}

var KGDList_objs=new Array();
var KGDList_objs_num=-1;

function getXmlHttp()
{ 
     var myXmlObj = null;
     if(window.XMLHttpRequest)
     {   
         myXmlObj = new XMLHttpRequest();
     } 
     else 
     {   
	     var prefixes=["MSXML2","Microsoft","MSXML","MSXML3"];
	     for(var i=0;i<prefixes.length;i++)
	     {
		     try
		     {
			     myXmlObj = new ActiveXObject(prefixes[i]+".XMLHTTP");
			     return myXmlObj;
		      }
		     catch(ex){};  
	      }
         
     }
     return myXmlObj;       
}

 
///////////////////////////////////////////////////////////////////////////
CKDList.prototype.initXmlHttp=function(url,state)
{   
	this.xmlhttp=getXmlHttp();
	if(this.xmlhttp==null){return;}	
	var objkgd=this;
	objkgd.xmlhttp.open('GET',url,true);
	objkgd.xmlhttp.onreadystatechange=function()
	{   
		if(objkgd.xmlhttp.readyState==4) 
		{   
			if(objkgd.xmlhttp.status==200)
			{   
			    objkgd.oper(state);
			 }
		}
	
	};
	objkgd.xmlhttp.send(null);
	
}



CKDList.prototype.IKInitDropList=function(sels,which,other){
   var url=this.preUrl+"?flag=mode&classname="+which;
   this.classname=which;
   this.others=other;
   this._CtrlList=sels;
   this.initXmlHttp(url,'mode');
}

CKDList.prototype.initDropList_IL=function(){
    
    //this.classname=which;
    this.initCommon(this._CtrlList,this.classname,this,this.others,'instant');
    var seltxt="";
    this.selNum=0;
    var url=this.preUrl+"?id="+seltxt+"&classname="+this.classname+"&state=0"+"&flag=instant";
    this.initXmlHttp(url,'instant');

}

CKDList.prototype.initDropList_list=function(str){
	 var strLists=str.split('|');
	 this.urlParm="&class="+strLists[1];
	 if(strLists.length>2){
	 this.formParm=strLists[2];
	  var objIDs=strLists[2].split(",");
	  for(var i=0;i<objIDs.length;i++){
	  	if(objIDs=="null")continue;
	  	var objInput=$(objIDs[i]);
	  	if(objInput==null){
	  	 alert('没有id名为'+objIDs[i]+"对象");return false;	
	  	 }
	  	else{
	  		var objValue=objInput.value;
	  		if(objInput.disabled==true)objValue="";
	  	 this.urlParm=this.urlParm+"&"+objInput.name+"="+objValue;	
	  	} 
	   }
	 }
    this.initCommon(this._CtrlList,this.classname,this,this.others,'list');
    var seltxt="";
    this.selNum=0;
    var url=this.preUrl+"?id="+seltxt+"&classname="+strLists[3]+"&state=0"+"&flag=list"+this.urlParm;
    this.initXmlHttp(url,'list');

}


CKDList.prototype.initDropList_file_xml=function(){
    this.initDropList_xml(this._CtrlList,this.classname,this.others,'file');
}
CKDList.prototype.initDropList_file_js=function(){
    this.initDropList_js(this._CtrlList,this.classname,this.others,'file');
}

CKDList.prototype.IKloadDropList_js=function(sels,data,other)
{   
	this._AryData=data;
	this.initCommon(sels,'no',this,other);
	this.firstFillData();
}

CKDList.prototype.initDropList_js=function(sels,which,other,isFile){ 
    isFile=IsNull(isFile,"");
	var scr1=document.createElement("script");
	scr1.language="javascript";
	scr1.type="text/javascript";
	if(scr1==null)
	{
		alert("没有ID为"+"的script元素");
		return;
	}
	
	scr1.src=this.preUrl+"?classname="+which+"&isfile="+isFile+"&flag=js";
	document.getElementsByTagName("head")[0].appendChild(scr1);
	this.initCommon(sels,which,this,other);
	KGDList_objs_num++;
    KGDList_objs[KGDList_objs_num]=this;
	switch(KGDList_objs_num)
	{
		case 0:window.setTimeout("KGDList_objs[0].firstFillData()",1000);break;
		case 1:window.setTimeout("KGDList_objs[1].firstFillData()",1000);break;
		case 2:window.setTimeout("KGDList_objs[2].firstFillData()",1000);break;
		case 3:window.setTimeout("KGDList_objs[3].firstFillData()",1000);break;
		case 4:window.setTimeout("KGDList_objs[4].firstFillData()",1000);break;
		case 5:window.setTimeout("KGDList_objs[5].firstFillData()",1000);break;
		case 6:window.setTimeout("KGDList_objs[6].firstFillData()",1000);break;
		case 7:window.setTimeout("KGDList_objs[7].firstFillData()",1000);break;
		case 8:window.setTimeout("KGDList_objs[8].firstFillData()",1000);break;
		case 9:window.setTimeout("KGDList_objs[9].firstFillData()",1000);break;
		default:return;
	}
	
		
}

CKDList.prototype.initDropList_xml=function(sels,which,other,isfile){
    isfile=IsNull(isfile,"");
    this.selNum=0;
	this.initCommon(sels,which,this,other);
	var url=this.preUrl+"?classname="+which+"&isfile="+isfile+"&flag=xml";
	this.initXmlHttp(url);
		
}

CKDList.prototype.oper=function(state)
{   
    if(typeof(state)=="undefined")state="";
	if(state==''||state=="instant"||state=="list")
	{  	
		var resxml=this.xmlhttp.responseXML; 
		if(resxml==null)return;	
		var root=resxml.documentElement;
		var items=root.getElementsByTagName("item");
		var itelen=items.length;
		if(state=="")
		{
			for(var i=0;i<itelen;i++)
			{
				var txt=items[i].childNodes[0].firstChild.data;
				var txt1=items[i].childNodes[1].firstChild.data;
				var obj_prekey=items[i].childNodes[2].firstChild;
				var txt2;
				if(obj_prekey==null)txt2="";
				else txt2=items[i].childNodes[2].firstChild.data;
				if(txt2=="")
				{
					var opt=new Option();
					opt.value=txt;opt.text=txt1;
					if(this.initdroplist==true&&this.initSelValue[0]==opt.value)
				      opt.selected=true;
					this._OptionList[0].options.add(opt); 
				}
				this._AryData[txt]=[txt1,txt2]; 
			}
			if(this._Others!='no')
			{
			var ss=this._Others.split("|");
			var opt1=new Option();opt1.value="other";opt1.text=ss[1];
			this._OptionList[0].options.add(opt1);
			}
		
		}
		
	    else 
		    {   
				for(var i=0;i<itelen;i++)
				 {
				      var opt=new Option();
				      opt.value=items[i].childNodes[0].firstChild.data;
				      opt.text=items[i].childNodes[1].firstChild.data;
				      if(this.initdroplist==true&&this.initSelValue[this.selNum]==opt.value)
				      opt.selected=true;
				      this._OptionList[this.selNum].options.add(opt);
			     }
			     
			    if(this._Others!='no')
			     {
					  var ss=this._Others.split("|");
					  var opt1=new Option();opt1.value="other";opt1.text=ss[1];
					  this._OptionList[this.selNum].options.add(opt1);
				 }
				 
				 
			 }
			 
	      if(this.initdroplist==true)//首次加载时
				  { var stts=this._CtrlList[this.whichSelect].split("|");
				  	if(this.initSelValue[this.selNum]!=undefined||stts[1]=='no')
				    {   try{ if(this.selNum==0&&stts[1]=='no')
				                this._OptionList[0].remove(0);
	                         var n=this.selNum;
	                         var evalStr=this.selOnchanges[n].replace('this',"this._OptionList[n]");
	                          eval(evalStr);  
                            }
                           catch(e){}
                           
                        if(this._OptionList[this.selNum].length==0||this._OptionList[this.selNum].value=='')
                        this.initdroplist=false; 
                         
                        if(this.selNum<this.sellen-1) 
                        { if(state=='')
					  	  this.selChange(''+(this.selNum+1));
					  	  else
					  	  this.selChange(''+(this.selNum+1),state);
					  	}
					  	else
					  	this.initdroplist=false;
				    }
				    else
				    {
				    this.initdroplist=false;	
				    }
				  }
				  
				else
				   { 
				     if(this.whichSelect!='0') 	
                     try{ 
	                      var n=parseInt(this.whichSelect)-1;
	                      var evalStr=this.selOnchanges[n].replace('this',"this._OptionList[n]");
	                      eval(evalStr);  
                       }catch(e){}	
                     var stts1=this._CtrlList[this.selNum].split("|"); 
                      if(stts1[1]=='no') 	
                         try{ 
	                      var n=parseInt(this.whichSelect);
	                      var evalStr=this.selOnchanges[n].replace('this',"this._OptionList[n]");
	                      eval(evalStr);  
                       }catch(e){}
                       
					 for(var d=this.selNum;d<this.sellen-1;d++)
					   {
							var stts=this._CtrlList[d].split("|");
							//当二级下拉列表框没有空选择项时，初始默认选择一项，那三级下拉列表框要检索出它的数据
							if(stts[1]=='no')this.selChange(''+(this.selNum+1),state);
							else break;
					   }
				    
				   }
	 
	}
    else if(state=='mode')
    {
	     var datamode=this.xmlhttp.responseText;
	     var strCase=datamode;
	     var strmode=datamode.split('|');
	     if(strmode.length>1)
	      { if(strmode[0].startsWith("db"))
	      	 strCase='dball';
	      	 else if(strmode[0].startsWith("list"))  
	      	 strCase='list';
	      }
	     switch(strCase)
	      {
		     case "db":this.initDropList_IL();break;
		     case "xml":this.initDropList_file_xml();break;
		     case "js":this.initDropList_file_js();break;
		     case "dball":this.initDropList_db();break;
		     case "list":this.initDropList_list(datamode);break;
		     case "no":break;
		     default:break;
	      }
    }
   else if(state=='databook')
   {    var resxml=this.xmlhttp.responseXML; 
		if(resxml==null)return;	
		var root=resxml.documentElement;
		var items=root.getElementsByTagName("item");
		var itelen=items.length;
	    if(this._CtrlList[0].split('|')[1]=='no'){
		this._OptionList[0].remove(0);	
		}
		
		for(var i=0;i<itelen;i++)
				 {
				      var opt=new Option();
				      opt.value=items[i].childNodes[0].firstChild.data;
				      opt.text=items[i].childNodes[1].firstChild.data;
				      if(this.initdroplist==true&&this.initSelValue[0]==opt.value)
				      opt.selected=true;
				      this._OptionList[0].options.add(opt);
			     }
   	     try{        
	                 var evalStr=this.selOnchanges[0].replace('this',"this._OptionList[0]");
	                 eval(evalStr);  
             }catch(e){}
   }
   
	
		
}



CKDList.prototype.firstFillData=function()  
{   
    if(this._AryData.length==0)
    {
	    var listobj="obj_"+this.classname;
	    this._AryData=eval(listobj)._ListData;
    }
    
	for(key in this._AryData)
	{
		var datastr=this._AryData[key][1];
		if(datastr=='')
		{
			var opt=new Option();
			opt.value=key;opt.text=this._AryData[key][0];
			this._OptionList[0].options.add(opt);  //初始化第一个下拉列表框的数据
		}	    
	}

	if(this._Others!='no')
	{ 
		var ss=this._Others.split("|");
		var opt1=new Option();opt1.value="other";opt1.text=ss[1];
		this._OptionList[0].options.add(opt1);
	}
}

CKDList.prototype.initCommon=function(sels,which,kglist,other,state)//公用的初始化
{     
	other=IsNull(other,'no');
    if(Object.isArray(sels))
    {
	this._CtrlList=sels;
	}
	else //级数只有一级，sels是一个字符串
	{ 
		this._CtrlList=new Array(1);
		this._CtrlList[0]=sels;
	}

	this.classname=which;
	this._Others=other;	
	this.sellen=this._CtrlList.length;
     
	if(other!='no')
	{
		var ss=other.split("|");
		this._ObjInput=$(ss[0]);
		if(this._ObjInput==null){alert("没有ID名为:"+ss[0]+"的对象");return;}
	}
	
	for(var j=0;j<this.sellen;j++)
	{
		if(this._CtrlList[j].indexOf("|")==-1)
		{
			this._OptionList[j]= $(this._CtrlList[j]);
			if(this._OptionList[j]==null)
			{
			  alert("没有ID名为:"+this._CtrlList[j]+"的对象");return;
			}
			
		}
		else
		{   
			var  strs=this._CtrlList[j].split('|');
			if(j==0&&strs.length==2&&strs[1]!='no')
			this.initSelValue[j]=strs[1];
			else if(strs.length==3)
			this.initSelValue[j]=strs[2];
			this._OptionList[j]= $(strs[0]);
		}
		
		if(this._OptionList[j].onchange!=null)
		{   
			var str=this._OptionList[j].onchange.toString();
			var startindex=str.indexOf("{");
			var endindex=str.lastIndexOf("}");
			this.selOnchanges[j]=str.substring(startindex+1,endindex);
		}
	}
	this._OptionList[0].innerHTML='';
	var opt1=new Option();opt1.value="";opt1.text='';
	this._OptionList[0].options.add(opt1);
	switch(this.sellen)//根据下拉列表框的级数和是否有其它选项来决定哪些下拉列表框有onchange事件
	{   
		case 1:
		this._OptionList[0].onchange=function(){kglist.selChange('1',state);};break;
		case 2:this._OptionList[0].onchange=function(){kglist.selChange('1',state);};
		this._OptionList[1].onchange=function(){kglist.selChange('2',state);};break;
		case 3:this._OptionList[0].onchange=function(){kglist.selChange('1',state);};
		this._OptionList[1].onchange=function(){kglist.selChange('2',state);};
		this._OptionList[2].onchange=function(){kglist.selChange('3',state);};break;
		case 4:this._OptionList[0].onchange=function(){kglist.selChange('1',state);};
		this._OptionList[1].onchange=function(){kglist.selChange('2',state);}; 
		this._OptionList[2].onchange=function(){kglist.selChange('3',state);};
		this._OptionList[3].onchange=function(){kglist.selChange('4',state);};break;      
		default:return;       
	}
  
} 
 

//公用的下拉列表框onchange事件
CKDList.prototype.selChange=function(which,state)
{    
	var seltxt="";
	var num=parseInt(which);this.whichSelect=which;this.selNum=which;
	seltxt=this._OptionList[num-1].value;
	if(seltxt=='other')
	{
		for(var k=num;k<this._OptionList.length;k++)
		{
		this._OptionList[k].innerHTML=""; 
		}
		this._ObjInput.style.visibility='';
		this._ObjInput.name=this._OptionList[num-1].name;
		return ;
	}
	else
	{
		if(this._ObjInput!=null) this._ObjInput.style.visibility='hidden';

	} 
	
	if(this.sellen==num){
	  try{
	  	var evalStr=this.selOnchanges[num-1].replace('this',"this._OptionList[num-1]");
	    eval(evalStr);  
		}
		catch(e){
		}	
	 return ; 
		
	}  
	
	for(var j=num;j<this._OptionList.length;j++){
		for(var i=0,len=this._OptionList[j].length;i<len;i++)
		this._OptionList[j].remove(0); 
	}
	if(seltxt=="")return;//当选择空项时
	var strs=this._CtrlList[num].split("|");
	if(strs[1]!='no') 
	{ 
		var opt1=new Option();opt1.value="";opt1.text=strs[1];
		this._OptionList[num].options.add(opt1);
	}
	 
    if(IsNull(state,"")==""){
	for(key in this._AryData){ 
		if(this._AryData[key][1]==seltxt){
		var opt=new Option();
		opt.value=key;opt.text=this._AryData[key][0];
		if(this.initdroplist==true&&this.initSelValue[this.selNum]==opt.value)
		opt.selected=true;
		this._OptionList[num].options.add(opt);
		}
	}
	if(this._Others!='no')
	{            //往下拉列表框填充最后一项为"其它"的数据
		var ss=this._Others.split("|");
		var opt1=new Option();opt1.value="other";opt1.text=ss[1];
		this._OptionList[num].options.add(opt1);
	}
	if(this.initdroplist==true)//首次加载时
	{ var stts=this._CtrlList[this.whichSelect].split("|");
	  if(this.initSelValue[this.selNum]!=undefined||stts[1]=='no')
				    {   try{ 
	                         var n=this.selNum;
	                         var evalStr=this.selOnchanges[n].replace('this',"this._OptionList[n]");
	                          eval(evalStr);  
                            }
                           catch(e){}
                           
                        if(this._OptionList[this.selNum].length==0||this._OptionList[this.selNum].value=='')
                        this.initdroplist=false; 
                         
                        if(this.selNum<this.sellen-1) 
                        { 
					  	  this.selChange(''+(this.selNum+1));
					  	}
					  	else
					  	this.initdroplist=false;
				    }
				    else
				    {
				    this.initdroplist=false;	
				    }
    }
    else
    {  
    	try{
			var evalStr=this.selOnchanges[num-1].replace('this',"this._OptionList[num-1]");
		    eval(evalStr); 	
			}
			catch(e){
			}
		 var stts1=this._CtrlList[this.selNum].split("|"); 
            if(stts1[1]=='no') 	
                   try{ 
	                      var n=parseInt(this.whichSelect);
	                      var evalStr=this.selOnchanges[n].replace('this',"this._OptionList[n]");
	                      eval(evalStr);  
                      }catch(e){}	
		for(var d=num;d<this.sellen-1;d++)
		{
			var stts=this._CtrlList[d].split("|");
			//当二级下拉列表框没有空选择项时，初始默认选择一项，那三级下拉列表框要检索出它的数据
			if(stts[1]=='no')this.selChange(''+(num+1));
			else break;
					
		}
			
     }
     	
    }
    else {
	    this.selNum=num;
	    var url=this.preUrl+"?id="+seltxt+"&classname="+this.classname+"&state="+num+"&flag="+state;
	    if(state=="list")
	    {
	      if(this.formParm!="")	
	      {
		    var formparms=this.formParm.split(",");
		    var urlparms=this.urlParm.split("&");
		    for(var i=0;i<formparms.length;i++){
		    	var urlparm=urlparms[i+2].split('=');
		    	if($(formparms[i]).disabled==true)
		    	  {  if(urlparm[1]!='')
		    	  	  this.urlParm=this.urlParm.replace(urlparms[i+2],urlparm[0]+"="+'');
		    	  	continue;
		    	  }
		    	if($(formparms[i]).value!=urlparm[1])
		    	this.urlParm=this.urlParm.replace(urlparms[i+2],urlparm[0]+"="+$(formparms[i]).value);
		    }
	      }
	    url+=this.urlParm;
	    }
	    this.initXmlHttp(url,state);
    
    }
   
	
}


CKDList.prototype.initDropList_db=function(sels,which,other){
    this.initDropList_xml(this._CtrlList,this.classname,this.others);
    
    //this.initDropList_js(sels,which,other);

}
//特殊处理取数据字典的数据
CKDList.prototype.IKInitDropList_DataBook=function(sels,which,other){
    this.initCommon(sels,which,this,other,'databook');
    var url=this.preUrl+"?classname="+this.classname+"&flag=databook";
    this.initXmlHttp(url,'databook');
    //this.initDropList_js(sels,which,other);

}



///////////////////////////////////////////////////////////////////////////////////////////////
//                                        新下拉框分界线                                             //
///////////////////////////////////////////////////////////////////////////////////////////////

/**
  * 初始化下拉框
  * sel: 下拉框id的数组
  */
CKDList.prototype.initCKDList = function(sel, json) {
    if (json != null) {
       this.basePath = json.basePath || "../";
    }
    this.requestUrl = this.basePath+this.requestUrl; // 拼装servlet完整的请求路径

    if (Object.isArray(sel)) {
	    this.sel_id = sel;
	} else { // 级数只有一级,sels是一个字符串
		this.sel_id = new Array(1);
		this.sel_id[0] = sel;
	}

    if (this.setIndexAndValidate(this)) {
        this.initCommonControl(this);
    } else {
        return false;
    }
}

/**
  * 初始化下拉框
  * ckdlObj: 下拉框对象
  */
CKDList.prototype.initCommonControl = function(ckdlObj) {
	var length = ckdlObj.sel_id.length;
	if (length > 0) {
	    var sel_obj = document.getElementById(ckdlObj.sel_id[0].split("|")[0]);
	    ckdlObj.fillData_first(ckdlObj, sel_obj);
	}
	if (length > 1) {
	    for (var i = 1; i < length; i++) {
	        // 为父级下拉框对象
	        var sel_obj = document.getElementById(ckdlObj.sel_id[i-1].split("|")[0]);
	        // 为父级下拉框填加onchange事件
	        sel_obj.onchange = function() {
	            ckdlObj.onChangeEvent(ckdlObj, this);
	        };
	    }
	    // 为最后一级下拉框增加index属性
	    var sel_obj = document.getElementById(ckdlObj.sel_id[length-1].split("|")[0]);
    }
}

/**
  * 设置下拉框级数
  * ckdlObj: 下拉框对象
  */
CKDList.prototype.setIndexAndValidate = function(ckdlObj) {
    var length = ckdlObj.sel_id.length;
    for(var i = 0; i < length; i++) {
        var id = ckdlObj.sel_id[i].split("|")[0];
        var sel_obj = document.getElementById(id);
        if (sel_obj == null) {
            alert("没有id名为"+id+"的对象！");
            return false;
        }
        if (sel_obj.getAttribute("data_id") == null) {
            alert("须为id名为"+id+"的对象设置data_id属性并填写数据源id！");
            return false;
        }
        sel_obj.setAttribute("index", i);
        sel_obj.length = 0;
    }
    return true;
}

/**
  * 为下拉框填充数据
  * ckdlObj: 下拉框对象实例
  * sel_obj: 下拉框对象
  */
CKDList.prototype.fillData_first = function(ckdlObj, sel_obj) {
    var this_sel_index = sel_obj.getAttribute("index");
    var temp = ckdlObj.sel_id[this_sel_index].split("|");
    var this_sel_obj = document.getElementById(temp[0]);
    var default_value = "";
    
    sel_obj.length = 0;
    
    if (ckdlObj.sel_id[this_sel_index].indexOf("|no") == -1) {
        var opt = new Option();
	    opt.value = "";
	    opt.text = "";
	    this_sel_obj.options.add(opt);
    }
    // 取默认值
    if (temp.length >= 2) {// && temp[temp.length-1] != "no") {
        default_value = temp[temp.length-1];
        //ckdlObj.sel_id[this_sel_index] = ckdlObj.sel_id[this_sel_index].substring(0, ckdlObj.sel_id[this_sel_index].lastIndexOf("|"));
        //ckdlObj.sel_id[this_sel_index] = ckdlObj.sel_id[this_sel_index].substring(0, ckdlObj.sel_id[this_sel_index].indexOf("|"));
    }
    
    // 父级下拉框数据源id
    var father_sel_data_id = "";
    
    // 获得xml数据
    ckdlObj.xmlDoc = ckdlObj.getXmlInfo(ckdlObj, father_sel_data_id, this_sel_obj.getAttribute("data_id"), this_sel_obj.getAttribute("index"));
    
    // 解析并拼装数据
    var item_info = ckdlObj.xmlDoc.getElementsByTagName("item");
    var length = item_info.length;
    for(var i = 0; i < length; i++) {
        var opt = new Option();
	    opt.value = item_info[i].getElementsByTagName("key")[0].firstChild.nodeValue;
	    opt.text = item_info[i].getElementsByTagName("value")[0].firstChild.nodeValue;
	    opt.selected = (opt.value == default_value);
	    this_sel_obj.options.add(opt);
    }
    
    // 当本级下拉框设置了no属性 并且 不是最后一级下拉框, 则下级下拉框要自动加载数据
    if (ckdlObj.sel_id[this_sel_index].indexOf("|no") > -1 && parseInt(this_sel_index, 10)+1 < ckdlObj.sel_id.length) {
        var this_sel_obj = document.getElementById(ckdlObj.sel_id[this_sel_index].split("|")[0]);
        ckdlObj.fillData(ckdlObj, this_sel_obj);
    }
    
    // 当本级下拉框设置了默认值 并且 不是最后一级下拉框, 则下级下拉框要自动加载数据
    if (default_value != "" && parseInt(this_sel_index, 10)+1 < ckdlObj.sel_id.length) {
        var this_sel_obj = document.getElementById(ckdlObj.sel_id[this_sel_index].split("|")[0]);
        ckdlObj.fillData(ckdlObj, this_sel_obj);
    }
}

/**
  * 为下拉框填充数据
  * ckdlObj: 下拉框对象实例
  * father_sel_obj: 父级下拉框对象
  */
CKDList.prototype.fillData = function(ckdlObj, father_sel_obj) {
    var father_sel_index = father_sel_obj.getAttribute("index");
    var this_sel_index = parseInt(father_sel_index, 10) + 1;
    
    var temp = ckdlObj.sel_id[this_sel_index].split("|");
    var this_sel_obj = document.getElementById(temp[0]);
    var default_value = "";
    this_sel_obj.length = 0;
    
    if (ckdlObj.sel_id[this_sel_index].indexOf("|no") == -1) {
        var opt = new Option();
	    opt.value = "";
	    opt.text = "";
	    this_sel_obj.options.add(opt);
    }
    // 取默认值
    if (temp.length >= 2) {// && temp[temp.length-1] != "no") {
        default_value = temp[temp.length-1];
        //ckdlObj.sel_id[this_sel_index] = ckdlObj.sel_id[this_sel_index].substring(0, ckdlObj.sel_id[this_sel_index].lastIndexOf("|"));
        //ckdlObj.sel_id[this_sel_index] = ckdlObj.sel_id[this_sel_index].substring(0, ckdlObj.sel_id[this_sel_index].indexOf("|"));
    }
    // 父级下拉框数据源id
    var father_sel_data_id = document.getElementById(ckdlObj.sel_id[father_sel_index].split("|")[0]).getAttribute("data_id");
    
    
    // 获得xml数据
    ckdlObj.xmlDoc = ckdlObj.getXmlInfo(ckdlObj, father_sel_data_id, this_sel_obj.getAttribute("data_id"), this_sel_obj.getAttribute("index"));
    
    // 解析并拼装数据
    var item_info = ckdlObj.xmlDoc.getElementsByTagName("item");
    var length = item_info.length;
    for(var i = 0; i < length; i++) {
        var opt = new Option();
	    opt.value = item_info[i].getElementsByTagName("key")[0].firstChild.nodeValue;
	    opt.text = item_info[i].getElementsByTagName("value")[0].firstChild.nodeValue;
	    opt.selected = (opt.value == default_value);
	    this_sel_obj.options.add(opt);
    }
    
    // 当本级下拉框只有一个值 并且 设置了no属性 并且 不是最后一级下拉框, 则下级下拉框要自动加载数据
    if (ckdlObj.sel_id[this_sel_index].indexOf("|no") > -1 && parseInt(this_sel_index, 10)+1 < ckdlObj.sel_id.length) {
        var this_sel_obj = document.getElementById(ckdlObj.sel_id[this_sel_index].split("|")[0]);
        ckdlObj.fillData(ckdlObj, this_sel_obj);
    }
    
    // 当本级下拉框设置了默认值 并且 不是最后一级下拉框, 则下级下拉框要自动加载数据
    if (default_value != "" && parseInt(this_sel_index, 10)+1 < ckdlObj.sel_id.length) {
        var this_sel_obj = document.getElementById(ckdlObj.sel_id[this_sel_index].split("|")[0]);
        ckdlObj.fillData(ckdlObj, this_sel_obj);
    }
    
}

/**
  * 下拉框的onchange事件
  * ckdlObj: 下拉框对象实例
  * sel_obj: 下拉框对象
  */
CKDList.prototype.onChangeEvent = function(ckdlObj, sel_obj) {
    // 先将后面的下拉框清空
    ckdlObj.clearData(ckdlObj, sel_obj.getAttribute("index"));
    ckdlObj.fillData(ckdlObj, sel_obj);
}

/**
  * 获得xml数据
  * ckdlObj: 下拉框对象
  * father_sel_data_id: 父级下拉框数据源唯一标识
  * this_sel_data_id: 当前下拉框数据源唯一标识
  * this_sel_index: 当前下拉框位置
  * return xml数据
  */
CKDList.prototype.getXmlInfo = function(ckdlObj, father_sel_data_id, this_sel_data_id, this_sel_index) {
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
	var param = this.getAjaxServletParam(ckdlObj, father_sel_data_id, this_sel_data_id, this_sel_index);
    xmlHttp2.onreadystatechange = (btype != "Firefox") ? (xmlHandle) : (xmlHandle());
    xmlHttp2.open ("POST", ckdlObj.requestUrl, false);
    xmlHttp2.setRequestHeader("content-length", param.length); 
    xmlHttp2.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xmlHttp2.send(param);
    xmlHttp2.onreadystatechange = (btype!="Firefox") ? (xmlHandle) : (xmlHandle());
    return xmlDoc;
}

/**
  * 获得ajax的servlet的路径
  * ckdlObj: 下拉框对象
  * father_sel_data_id: 父级下拉框数据源唯一标识
  * this_sel_data_id: 当前下拉框数据源唯一标识
  * this_sel_index: 当前下拉框位置
  * return ajax的参数
  */
CKDList.prototype.getAjaxServletParam = function(ckdlObj, father_sel_data_id, this_sel_data_id, this_sel_index) {
    var param = "droplist_data_id="+this_sel_data_id+"&droplist_father_data_id="+father_sel_data_id+"&droplist_index="+this_sel_index;
    var keyValue = "";
    // 取父级下拉框的关键值
    if (this_sel_index > 0) {
        keyValue = document.getElementById(ckdlObj.sel_id[parseInt(this_sel_index, 10)-1].split("|")[0]).value;
    }
    param += "&droplist_keyValue="+keyValue;
    var formObj = document.getElementsByTagName("form");
    
    var length = formObj.length;
    for (var i = 0; i < length; i++) {
        param += "&"+ckdlObj.getFormQueryString(formObj[i])
    }
    
	ckdlObj.escapeParam(param);
	return ckdlObj.escapeParam(param);
}

/**
  * 将form表单中的控件值拼接成ajax的参数形式
  * frmObj: form对象
  * return 参数字符串
  */
CKDList.prototype.getFormQueryString = function(frmObj) { 
    var queryString = "", and = "";
    var item; 
    var itemValue;
    
    var length = frmObj.length;
    for(var i = 0; i < length; i++) {
        item = frmObj[i];
        if (item.name != "") {
            if (item.type == "select") {
                itemValue = item.options[item.selectedIndex].value;
            } else if (item.type == "checkbox" || item.type == "radio") {
                if (item.checked == false) {
                    continue;    
                }
                itemValue = item.value;
            } else if (item.type == "button" || item.type == "submit" || item.type == "reset" || item.type == "image") {
                continue;
            } else {
                itemValue = item.value;
            }
            itemValue = itemValue;
            queryString += and + item.name + "=" + itemValue;
            and = "&";
        }
    }
    return queryString;
}

/**
  * 将本级之后的下拉框数据清空
  * ckdlObj: 下拉框对象
  * this_sel_index: 当前下拉框位置
  */
CKDList.prototype.clearData = function(ckdlObj, this_sel_index) {
    var length = ckdlObj.sel_id.length;
    for(var i = parseInt(this_sel_index, 10)+1; i < length; i++) {
        var sel_obj = document.getElementById(ckdlObj.sel_id[i].split("|")[0]);
        sel_obj.length = 0;
    }
}

/**
  * 转换字符
  * param: 待转换的字符串
  * return: 转换后的字符串
  */
CKDList.prototype.escapeParam = function(param) {
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
  * 浏览器类型判断
  * return 浏览器类型字符串
  */
function getOs() {   
    var OsObject = "";   
    if(navigator.userAgent.indexOf("MSIE") > 0) {   
        return "MSIE"; // IE浏览器
    }
    if(isFirefox = navigator.userAgent.indexOf("Firefox") > 0) {   
        return "Firefox"; // Firefox浏览器
    }
    if(isSafari = navigator.userAgent.indexOf("Safari") > 0) {   
        return "Safari"; // Safan浏览器
    }
    if(isCamino = navigator.userAgent.indexOf("Camino") > 0){   
        return "Camino"; // Camino浏览器
    }
    if(isMozilla = navigator.userAgent.indexOf("Gecko/") > 0){   
        return "Gecko"; // Gecko浏览器
    }   
}
