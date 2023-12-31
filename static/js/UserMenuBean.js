//******************************************菜单类的对象类***************************************
function MenuBean(){
    this.codeno = "";
    this.appid = "";
    this.parentid = "";
    this.menucode = "";
    this.menuname = "";
    this.linkfile = "";
    this.iconpath = "";
    this.orderid = "";
    this.leftmenusflag = "";
    this.childmenuflag = "";
    this.iscanuse = 0;
    this.state = 1;
}
//菜单ID
MenuBean.prototype.setCodeno = function(codeno){
   this.codeno = codeno;
}
MenuBean.prototype.getCodeno = function(){
   return  this.codeno;
}
//应用系统名
MenuBean.prototype.setAppid = function(appid){
   this.appid = appid;
}
MenuBean.prototype.getAppid = function(){
   return  this.appid;
}
//菜单的父亲节点代码
MenuBean.prototype.setParentid = function(parentid){
   this.parentid = parentid;
}
MenuBean.prototype.getParentid = function(){
   return  this.parentid;
}
//菜单代码
MenuBean.prototype.setMenucode = function(menucode){
   this.menucode = menucode;
}
MenuBean.prototype.getMenucode = function(){
   return  this.menucode;
}
//菜单名
MenuBean.prototype.setMenuname = function(menuname){
   this.menuname = menuname;
}
MenuBean.prototype.getMenuname = function(){
   return  this.menuname;
}
//路径
MenuBean.prototype.setLinkfile = function(linkfile){
   this.linkfile = linkfile;
}
MenuBean.prototype.getLinkfile = function(){
   return  this.linkfile;
}
//图标
MenuBean.prototype.setIconpath = function(iconpath){
   this.iconpath = iconpath;
}
MenuBean.prototype.getIconpath = function(){
   return  this.iconpath;
}
//排序
MenuBean.prototype.setOrderid = function(orderid){
   this.orderid = orderid;
}
MenuBean.prototype.getOrderid = function(){
   return  this.orderid;
}
//是否在左边显示的标志
MenuBean.prototype.setLeftmenusflag = function(leftmenusflag){
   this.leftmenusflag = leftmenusflag;
}
MenuBean.prototype.getLeftmenusflag = function(){
   return  this.leftmenusflag;
}

//是否有子节点的标志，为1表示有子节点，为2表示这个节点的子节点需要在流程页面上显示（这个时候linkfile是为空）
MenuBean.prototype.setChildmenuflag = function(childmenuflag){
   this.childmenuflag = childmenuflag;
}
MenuBean.prototype.getChildmenuflag = function(){
   return  this.childmenuflag;
}

//该菜单用户是否可以用的标志
MenuBean.prototype.setIscanuse = function(iscanuse){
   this.iscanuse = iscanuse;
}
MenuBean.prototype.getIscanuse = function(){
   return  this.iscanuse;
}

//该菜单的禁用与启用
MenuBean.prototype.setState = function(state){
   this.state = state;
}
MenuBean.prototype.getState = function(){
   return  this.state;
}




//******************************************用户的可以操作菜单对象类***************************************
function UserMenuBean(){
     this.AllMenuArray = new Array();//所有菜单
     //this.UserMenuArray = new Array();//用户可操作菜单
     this.UserMenuBean_RequestUrl = "../taglib/PopMenuServlet.jsp";
     this.xmlDoc = null;
     this.InitMenu();
}

UserMenuBean.prototype.InitMenu = function(){
    this.xmlDoc = this.getMenuXmlInfo();//获取数据
    this.fillXmlValue();//把菜单数据放到数组里面去
}
/**
  * 获得基础数据
  * get base info
  */
UserMenuBean.prototype.getMenuXmlInfo = function () {
    var xmlHttpAllMenu; // = createXMLHttp();
    var xmlDoc;
	if (window.ActiveXObject) {
		xmlHttpAllMenu = new ActiveXObject("Microsoft.XMLHTTP");
	} else {
		if (window.XMLHttpRequest) {
			xmlHttpAllMenu = new XMLHttpRequest();
		}
	}
	function xmlHandle() {
	    if (xmlHttpAllMenu.readyState == 4) {
	        if (xmlHttpAllMenu.status == 200) {
	            xmlDoc = xmlHttpAllMenu.responseXML.documentElement;
			}
		}
	}
	var btype = getOsMenu();
	var param = "menucode=rongrong&menutype=init";
    xmlHttpAllMenu.onreadystatechange = (btype!="Firefox") ? (xmlHandle) : (xmlHandle());
    xmlHttpAllMenu.open ("POST", this.UserMenuBean_RequestUrl, false);
    xmlHttpAllMenu.setRequestHeader("content-length", param.length); 
    xmlHttpAllMenu.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xmlHttpAllMenu.send(param);
    xmlHttpAllMenu.onreadystatechange = (btype!="Firefox") ? (xmlHandle) : (xmlHandle());
    return xmlDoc;
}
/**
  * 初始化菜单数组
  * filtrate value
  */
UserMenuBean.prototype.fillXmlValue = function () {
    var d1 = new Date();
    var info = this.xmlDoc.getElementsByTagName("info");
    var length = info.length;
    var max_length = 1;
    for(var i = 0; i < length; i++) {
        var codeno   = info[i].getElementsByTagName("codeno")[0].firstChild.nodeValue;
        var appid   = info[i].getElementsByTagName("appid")[0].firstChild.nodeValue;
        var parentid = info[i].getElementsByTagName("parentid")[0].firstChild.nodeValue;
        var menucode = info[i].getElementsByTagName("menucode")[0].firstChild.nodeValue;
        var menuname = info[i].getElementsByTagName("menuname")[0].firstChild.nodeValue;
        var linkfile = info[i].getElementsByTagName("linkfile")[0].firstChild.nodeValue;
        var iconpath = info[i].getElementsByTagName("iconpath")[0].firstChild.nodeValue;
        var orderid =  info[i].getElementsByTagName("orderid")[0].firstChild.nodeValue;
        var leftmenusflag = info[i].getElementsByTagName("leftmenusflag")[0].firstChild.nodeValue;
        var childmenuflag = info[i].getElementsByTagName("childmenuflag")[0].firstChild.nodeValue;
        var iscanuse = info[i].getElementsByTagName("iscanuse")[0].firstChild.nodeValue;
        var state = info[i].getElementsByTagName("state")[0].firstChild.nodeValue;
        var  mb = new MenuBean();
        if (codeno==null||codeno=="") continue;
        else  mb.setCodeno(codeno);
        mb.setAppid(appid);
        mb.setParentid(parentid);
        mb.setMenucode(menucode);
        mb.setMenuname(menuname);
        mb.setLinkfile(linkfile);
        mb.setIconpath(iconpath);
        mb.setOrderid(orderid);
        mb.setLeftmenusflag(leftmenusflag);
        mb.setChildmenuflag(childmenuflag);
        mb.setIscanuse(iscanuse);
        mb.setState(state);
        this.AllMenuArray.push(mb);
    }
    //alert("加载菜单完成--"+this.AllMenuArray.length);
}

/**
  * 根据父节点找到对应的子节点菜单(这里用于弹出菜单时候，所以要控制是否可以用的标志)
  * filtrate value
  */
UserMenuBean.prototype.getMenuItemsByParentID = function (OutParentID){
     var result = new Array();
     var allmenu = this.AllMenuArray;
     var come_in = false;//
     var come_in_parentid = "";
     for (var i=0;i<allmenu.length;i++){
         var menuitem = allmenu[i];
         var parentid = menuitem.getParentid();
         var iscanuse = menuitem.getIscanuse();
         var state = menuitem.getState();
         if (come_in&&come_in_parentid!=parentid) break;//这是因为后台是按照parentId排好了序的，为了提供效率做的改进
         if (parentid==OutParentID&&iscanuse=="1"&&state=="1"){//父节点相同且用户可以操作的菜单
             come_in = true;
             come_in_parentid = parentid;
             result.push(menuitem);
         }
     }
     return result;
}
/**
  * 根据父节点找到图形页面对应的菜单所有ID
  * filtrate value
  */
UserMenuBean.prototype.getMenuItemIdByParentForPicturePage = function (OutParentID){
     var result = new Array();
     var allmenu = this.AllMenuArray;
     var come_in = false;//
     var come_in_parentid = "";
     for (var i=0;i<allmenu.length;i++){
         var menuitem = allmenu[i];
         var parentid = menuitem.getParentid();
         var iscanuse = menuitem.getIscanuse();
         var childmenuflag = menuitem.getChildmenuflag();
         var menucode = menuitem.getMenucode();
         if (come_in&&come_in_parentid!=parentid) break;//这是因为后台是按照parentId排好了序的，为了提供效率做的改进
         if (parentid==OutParentID){//父节点相同且用户可以操作的菜单&&iscanuse=="1"
             come_in = true;
             come_in_parentid = parentid;
             if (childmenuflag=="2"){//就是页面的某个菜单的子菜单需要同时显示在页面流程图上的时候
                 var childmenuitems = this.getMenuItemsByParentIDForPicture(menucode);
                 if (childmenuitems!=null&&childmenuitems.length>0){
                    for (var j=0;j<childmenuitems.length;j++){
                        result.push(childmenuitems[j]);
                    }
                 }
             }else{//直接加入到结果
                result.push(menuitem);
             }
         }
     }
     return result;
}

/**
  * 根据父节点找到对应的子节点菜单(这个用于图形流程的页面上所以不需要过滤是否可以用标志)
  * filtrate value
  */
UserMenuBean.prototype.getMenuItemsByParentIDForPicture = function (OutParentID){
     var result = new Array();
     var allmenu = this.AllMenuArray;
     var come_in = false;//
     var come_in_parentid = "";
     for (var i=0;i<allmenu.length;i++){
         var menuitem = allmenu[i];
         var parentid = menuitem.getParentid();
         var iscanuse = menuitem.getIscanuse();
         if (come_in&&come_in_parentid!=parentid) break;//这是因为后台是按照parentId排好了序的，为了提供效率做的改进
         if (parentid==OutParentID){//父节点相同且用户可以操作的菜单
             come_in = true;
             come_in_parentid = parentid;
             result.push(menuitem);
         }
     }
     return result;
}

/**
 * 依据菜单代码获取对应的菜单项
 */
UserMenuBean.prototype.getMenuItemByMenucode = function (menucode){
	var allmenu = this.AllMenuArray;
    for (var i=0;i<allmenu.length;i++){
        var menuitem = allmenu[i];
        var currentMenucode = menuitem.getMenucode();
        if (currentMenucode == menucode){
        	return menuitem;
        }
    }
    return null;
}

// 浏览器类型判断
function getOsMenu() {   
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