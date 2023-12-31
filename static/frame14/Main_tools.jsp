



<html>
	<head>
		<title>工具栏</title>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		
		<style type="text/css">
			.bg-tools-marquee0,a {
			    background-image: none;
			    background-color: #FFF;
			    font-size: 12px;
			    font-family: "宋体";
			    color: #000;
			    text-decoration: none;
			}		
			a:hover{
				color:red;
			}
		</style>
		
		<script type="text/javascript" src="/frame/Main_tools.js"></script>
		<script type="text/javascript" src="/js/AjaxBase.js"></script>
		<script type="text/javascript" src="/js/Common.js"></script>
		<script type="text/javascript" src="/js/Window.js"></script>
		<script type="text/javascript" src="/js/Themes.js"></script>
		<script type="text/javascript" src="../js/Form.js"></script>
		<script type="text/javascript" src="/custom/js/jquery.js"></script>		
		<script type="text/javascript" src="../custom/js/jkingo.noprint.js"></script>
		<script type="text/javascript">

			Skin.loadSkin("themes/classical/css/blue/blue.css","/");
			
			// 加关注
			function addMyservice(menucode,menuname){
				//alert("menucode/menuname="+menucode+"/"+menuname);
				if (!confirm("您确信要将\""+menuname+"\"加为关注的服务？")){
					return false;
				}
			    // 初始化用户关注的服务
				var url = "/frame/menu/addMyservice.action";
				var params = "hidKey="+menucode;
				jQuery.ajax({
					type: "POST",
					url: url,
					data: params, 
					dataType: "text",
					success: setMyservice
				})	
				
				function setMyservice(response){
					//alert("setMyservice.response="+response);
					if(response=="1"){
                        var sp_define=document.getElementById("sp_define").innerHTML;
                        sp_define=sp_define.replace("addMyservice","delMyservice").replace("appraise.png","appraised.png").replace("title=\"关注\"","title=\"取消关注\"");//关注改成取消关注
                        document.getElementById("sp_define").innerHTML=sp_define;
						// 重新加载用户关注的服务
						parent.loadingUserDefinedMenus("addMyservice");
					}	
				}
			}
			//评价
			function appraiseMyservice2(menucode,menuname){
			    var width=window.document.body.offsetWidth;
				var title="服务评价";
				var json = {"_title":title,"_width":"70%","_height":"60%","_top":"10px","_left":(width*0.3)/2,"_isStop":true,"_isMove":true,"_imgsrc":"../images/"};
				var url = "Main.appraiseMenu.jsp?menucode="+menucode;
				cKWindow = new CKWindow(json);
				cKWindow.setSrc(url,"100%","100%");
				cKWindow.openWindow();	
			}
			function appraiseMyservice(menucode,menuname){
			     var url = "/frame14/Main.appraiseMenu.jsp?menucode="+menucode+"&menuname="+kutil.toUTF8(menuname);
	             var maxWidth="770"; 
	             var maxHeight="430"; 
	             myShowModalDialog(url, maxWidth, maxHeight, function (result) {
		         if (result != null) {
			      
		         }
	            });	
			}
function myShowModalDialog(url, width, height, fn) {
	if (navigator.userAgent.indexOf("IE") <= 0) {
		    window.returnCallBackValue354865588 = fn;
		     var paramsChrome = 'height=' + height + ', width=' + width + ', top=' + (((window.screen.height - height) / 2) - 50) +
		            ',left=' + ((window.screen.width - width) / 2) + ',toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no';
		    window.open(url, "newwindow", paramsChrome);
    }
	else {
		    var params = 'dialogWidth:' + width + 'px;dialogHeight:' + height + 'px;status:no;dialogLeft:'
		                 + ((window.screen.width - width) / 2) + 'px;dialogTop:' + (((window.screen.height - height) / 2) - 50) + 'px;';
		   var tempReturnValue = window.showModalDialog(url, "", params);
		     fn.call(window, tempReturnValue);
	 }
}
            function myReturnValue(value) {
                if(value=="appraise"){
                    var sp_define=document.getElementById("sp_define").innerHTML;
                    sp_define=sp_define.replace("focus.png","focused.png").replace("title=\"评价\"","title=\"查看评价\"");
                    document.getElementById("sp_define").innerHTML=sp_define;
                }
            }
            //取消关注
            function delMyservice(menucode,menuname){
                //alert("menucode/menuname="+menucode+"/"+menuname);
                if (!confirm("您确信要取消\""+menuname+"\"的关注？")){
                    return false;
                }
                // 初始化用户关注的服务
                var url = "/frame/menu/delMyservice.action";
                var params = "hidKey="+menucode;
                jQuery.ajax({
                    type: "POST",
                    url: url,
                    data: params,
                    dataType: "text",
                    success: setMyservice2
                })

                function setMyservice2(response){
                    var sp_define=document.getElementById("sp_define").innerHTML;
                    if(response=="1"){
                        sp_define=sp_define.replace("delMyservice","addMyservice").replace("appraised.png","appraise.png").replace("title=\"取消关注\"","title=\"关注\"");
                        document.getElementById("sp_define").innerHTML=sp_define;
                        // 重新加载用户关注的服务
                        parent.loadingUserDefinedMenus("addMyservice");
                    }
                }
            }
		</script>
		<link rel="stylesheet" type="text/css" href="/themes/classical/css/blue/blue.css"/>
	</head>
	
	<body topmargin="0" leftmargin="0" rightmargin="0">
		<table border="0" width="100%" height="30" border="0" style="border-collapse: collapse;margin:0px" cellpadding="0" cellspacing="0" id="menu" state=''>
			<tr>
				<td valign="center" width="85%" class="bg-tools-marquee0" id="banner_direction" style="background-color: #FFF; border: 1px solid #EEE;border-right: 0px solid #EEE; padding-left: 5px;">
					<MARQUEE scrollAmount="2" onmouseover="document.all.divMQ.stop()" onmouseout="document.all.divMQ.start()"
						id="divMQ" name="divMQ" scrollDelay="2" direction="left" style="width:100%"></MARQUEE>
				</td> 
				<td class="bg-tools-marquee0" id="banner_plusmenu" style="display: none; width：10%; text-align:center; font-family:SimHei; background-color: #FFF; border: 1px solid #EEE;border-left: 0px solid #EEE;">
					<a href="javascript:parent.showPlusMenu();">附加功能</a>
				</td>
				<td valign="center" width="10%" class="bg-tools-marquee0" id="banner_attention" style="background-color: #FFF; border: 1px solid #EEE;border-left: 0px solid #EEE; padding-right: 10px;">
					
				</td>
			</tr>
		</table>
		<iframe id="_download" name="_download" style="display:none" width="0px" height="0px"></iframe>		
			
	</body>
</html>

<script type="text/javascript">
    try {
        if(window.screen.width>800) {
            document.all.divMQ.width=600;
        }
    } catch(err) {}

    function getXMLHTTP(pURL, pStr) {
        try {
            var xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    	    xmlhttp.Open("POST", pURL, false);
    	    xmlhttp.Send("<root>"+pStr+"</root>");
    	    var sendXML=xmlhttp.ResponseText;
    	    //alert(sendXML);
    	    return sendXML;
    	} catch(e) {
    	    return e.description
    	}
    }
</script>

