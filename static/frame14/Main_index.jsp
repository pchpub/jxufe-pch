










<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<title>KingoMIS</title>
		<meta content="text/html; charset=utf-8" http-equiv=Content-Type>
		
		<link rel="stylesheet" type="text/css" href="/themes/default/MenuTree.css"></link>
		<link rel="stylesheet" type="text/css" href="/css/xtree.css"></link>
		<link rel="stylesheet" type="text/css" href="/css/ctl_popwinc.css"></link>
		<link rel="stylesheet" type="text/css" href="/common/popmsg/Ref_PopMessage.css"></link>

		<style media="print" type="text/css">
			.Noprint{display:none;}
			.PageNext{page-break-after: always;}
		</style>        
       
		<script type="text/javascript" src="/custom/js/base64.2.js"></script>       
		<script type="text/javascript" src="/js/Ref_XTree.js"></script>
		<script type="text/javascript" src="/js/AjaxBase.js"></script>
		<script type='text/javascript' src='/frame14/menus/js/LeftPopMenu.js?random=68.0'></script>

		<!--<script type="text/javascript" src="/frame14/menus/js/LeftPopMenu.js"></script>-->
		<script type="text/javascript" src="/js/Themes.js"></script>
		<script type="text/javascript" src="/js/Common.js"></script>
		<script type="text/javascript" src="/js/Window.js"></script>
		<script type="text/javascript" src="/common/popmsg/Ref_PopMessage.js?v=10.0"></script>
        <script type="text/javascript" src="/js/UserMenuBean.js"></script>
		<script type="text/javascript" src="/student/js/loadClassPath.js"></script>
		<script type="text/javascript" language="javascript">
			Skin.loadSkin("themes/classical/css/blue/blue.css","/");
		</script>

	 	<link rel="stylesheet" href="/custom/skin/blue/ymPrompt.css?v=94631170399019809009916" type="text/css"></link>
		<link rel="stylesheet" href="/custom/css/blue/KingoCommon.css?v=72464170399019809076444" type="text/css" />
		
	 	<style type="text/css">
			.leftmenu_content ul li{
				list-style-type: none;
				height:21px;
				line-height:21px;
				width: 100%;
				background-color:#F9F9F9;
				padding:3px;			
				margin-bottom: 2px;
				padding-left:10px;
				float:left;
				cursor: pointer;
				/* 不换行，超出部分...表示 
				white-space:nowrap;
				overflow:hidden;
				text-overflow:ellipsis;*/
			}
			a{
				color: black;
				text-decoration: none;
			}			
			a:hover{
				color:#FF0000;
			}	
			.ctltable{
				border-collapse: collapse;
				table-layout:fixed
			}
			.ctltable td#menuArea2 {
				text-overflow:ellipsis;
				overflow:hidden;
				white-space: nowrap;
			}
			#userDefined{
				max-height: 40px;
				border: 0px solid red;
			}
	 	</style>
	 	
		<style type="text/css">
			
	       #bgDiv {                 /*隐藏背景层*/
	            position: absolute;  /*绝对定位*/
	            left: 0px;
	            top: 0px;
	            background-color: black;
	            opacity: 0.3; /*设置不透明度，即可以看到层下面的内容，但是由于层的遮挡，背景是不可以进行操作的*/
	            display: none;
	        }
	 
	        #fgDiv {                 /*隐藏逻辑业务窗口层*/
	            position: absolute;  /*绝对定位*/
	            width: 270px;
	            max-height: 490px;
	            border: 1px solid #BBB;
	            background-color: #FFFFFF; /**#e7e7e7;*/
	            display: none;
	        }
	        
	        #fgDiv ul {
	        	margin-top: 10px;
	        	margin-bottom: 10px;
	        }
	        
			#fgDiv li {
				list-style: none;
			    position: relative;
			    display: inline-block;
			    *display: inline;
			    *zoom: 1;
			    vertical-align: top;
			    margin-left: 15px;
			    padding: 2px 0 4px;
			    width: 249px;
			    height: 22px;
			    line-height: 22px;
			    font-size: 14px;
			    color: #000;
				/* 不换行，超出部分...表示 */
				white-space:nowrap;
				overflow:hidden;
				text-overflow:ellipsis;
			}	        
			
		</style>	 	
	 	
	</head>

	<body leftmargin="0" topmargin="0" height="600px" rightmargin="0" bottommargin="0" style="margin-bottom: 5px;">
		<bgsound id="bgmid" src="" loop="1">
		<table border=0 cellPadding=0 cellSpacing=0
			style="HEIGHT:100%; WIDTH:100%"  class="Noprint">
			<tr>
				<td id="menuArea" style="HEIGHT:100%; border-right: 1px solid #EEE;" WIDTH=200px vAlign=top >
					<table style="width:100%;height:100%;padding:0px;margin:0px;border-collapse: collapse;" >
					    <tr id="userDefinedArea" style="height: 245px;">
						    <td style="vertical-align: top;">
						        <table style="width:100%;height:100%;" class="ctltable">
								    <tr style="height:40px;line-height: 40px;">
								      <td id="userDefined" class="leftmenu_header" title="管理关注的服务">
								      	<span style="float: left;color:white;">关注的服务</span>
								      	<span style="float: right; margin:13px 10px 0px 0px; ">
									      	<img src="img/actor_right.png"></img>
								      	</span>
								      </td>
								    </tr>
									<tr valign="top">
									    <td id="menuArea2" class="leftmenu_content">
									    	<ul>
									    		<li>
									    			<a href="javascript:void(0);">正在加载中......</a>
									    		</li>
									    	</ul>
									    </td>
									</tr>  
								</table>						
							</td>
						</tr>
						<tr style="height:8px;background-color: #FFF;"><td></td></tr>     
						<tr style="height:180px;">
						    <td id="normalUseArea">
						          <table style="width:100%;height:100%;">
                                     <tr style="height:40px;line-height: 40px;">
                                       <td id="userNormalUse" class="leftmenu_header" >
                                             	最近使用
                                        </td>
                                     </tr>
                                     <tr style="height:100px;">
                                        <td  valign="top">
                                            <div id="normal_use_menu" class="leftmenu_content">
										    	<ul>
										    		<li>
										    			<a href="javascript:void(0);">正在加载中......</a>
										    		</li>
										    	</ul>
                                             </div>
                                        </td>
                                     </tr>
                                  </table>	
						    </td>
						</tr>   
						<tr style="height:8px;background-color: #FFF;display:none"><td></td></tr>     
						<tr style="height:40px;line-height: 40px;background-color: #FFF;display:none">
								<td id="palmcampus" class="leftmenu_header" title0="手机查课表、传纸条、随手记、查考试、查成绩，免费下载青果掌上校园！">
                                   	 <span style="float: left;color:white;">待审核工作</span>
									 <span style="float: right; margin:13px 10px 0px 0px; ">
                                   	 	<img src="img/actor_right.png"></img>
                                   	 </span>
                                </td>
						</tr>
					</table>
				</td>
				<td class="bg-index-tree" align=middle vAlign=center rowspan=2 style="border:1px solid blue; background-color: blue; display: none;">
					<INPUT type=button id=PW class="bg-index-button-push" state='0' title='隐藏菜单树(A)' onclick="onhide(this)" accesskey="a">
				</td>
				<td HEIGHT="100%" style="border:1px solid #FFFFFF;" vAlign=middle>
					<table border=0 cellPadding=0 cellSpacing=1	style="HEIGHT:100%;WIDTH:100%">
						 <tr id="frmTool_info" style="display: '';">
				            <td align="center" vAlign=top  style="height:30px;padding:0px;margin:0px;">
                               <iframe id="frmTool" name="frmTool" src="/frame14/Main_tools.jsp" width='100%' height='30' scrolling='no' frameborder='0'></iframe>
				            </td>
				        </tr>
						<tr>
						   <td HEIGHT="100%" vAlign=middle onmouseover0="destoryPopMenuWhenNoAction();" colspan="3">
								<table border=0 cellPadding=0 cellSpacing=1	style="HEIGHT:100%;WIDTH:100%">
									<tr>
										<td HEIGHT="98%" vAlign=top align=center>
											<div id='msgForm' style='display:none_'>
												<table width='253' border='0' cellpadding='0' cellspacing='0' background='../common/popmsg/img/1_2.gif'>
													<tr>
														<td width='48'>
															<img src='/common/popmsg/img/1_1.gif' width='48' height='28'>
														</td>
														<td width='157'>
															<div id='divTTL' align='center' class='style1'>
																<br>
															</div>
														</td>
														<td width='48' valign='top'>
															<a href='#' onclick='closeDiv()'>
																<img src='/common/popmsg/img/1_4.gif' width='48' height='19' border=0>
															</a>
														</td>
													</tr>
												</table>
												<table width='253' border='0' cellpadding='0' cellspacing='0' background='/common/popmsg/img/1_7.gif'>
													<tr>
														<td width='4'>
															<img src='/common/popmsg/img/1_6.gif' width='6' height='110'>
														</td>
														<td width='240' valign='top'>
															<div id='divMsg' style='overflow:auto;width:245px;height:108px'></div>
														</td>
														<td width='4'>
															<img src='/common/popmsg/img/1_10.gif' width='4' height='110'>
														</td>
													</tr>
													<tr>
														<td width='253' height='1' colspan="3" background='/common/popmsg/img/1_12.gif'>
															<br>
														</td>
													</tr>
												</table>											
											</div>
											<div id="OnlineMessageDataXML" style="display:none"></div>
											<input type="hidden" id="hid_OnlineMessageCode">
											<input type="hidden" id="frmdesk_src" name="frmdesk_src" title="当前操作的页面路径" />
											<input type="hidden" id="menucode_current" name="menucode_current" title="当前操作的菜单id" />
											<input type="hidden" id="hid_PasswordPolicy" value="1">
											<iframe id="frmDesk" name="frmDesk" src="" width='100%' height='100%' scrolling="auto" frameborder='0' style="border:0px solid red;"></iframe>
											<iframe id="frmMain" name="frmMain" src="" width='0%' height='100%' scrolling='no' frameborder='0' ></iframe>
										</td>
									</tr>
								</table>
							</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
		
		<!--隐藏层在最顶层，放在最后-->
        <div id="bgDiv">   <!--隐藏层，背景遮挡层(半透明)-->
        </div>
        <div id="fgDiv">   <!--隐藏层，逻辑业务窗口层-->
        </div>

		<script type="text/javascript">
		
			_webRootPath="";
			_schoolCode="10421";
			_jsPath="/js/";
			_imagesPath="/images/";
			
		    var baseUrl = "";
			var splitTag = "→";
			var kingo_usermenubean = null;//整个用户可以使用的菜单封装的js类

			//var kingo_normal_use_menu = null;//最近使用功能封装的js类
			var kingo_list_normal_use_menuitem = null;
			var kingo_list_normal_count = 5;//常用功能最多显示的个数
			
			var imScanUrl="/online/message";
			var imMoreUrl = "";
			var imViewUrl="/online/message?hidOption=getDetailedMessage";
			var isinitOnlineMessage="1";
			
			var isOnlyRkjs = "0";
			var isOnlyStu = "1";
			
			// 如果用户密码不符合密码策略，先弹出修改密码窗口
			var isPasswordPolicy = document.getElementById("hid_PasswordPolicy").value ;
			
			var isAdmin = "0";
			var istop="1";
			var _usertype="STU";
			var G_SCHOOL_CODE="10421";
            var _curxn="2023";
            var _curxq_m="0";
			
		</script>
		
		<script type="text/javascript" src="/custom/js/jquery.js"></script>
		<script type="text/javascript" src="/custom/js/ymPrompt.js"></script>
		<script type='text/javascript' src='/frame14/js/Main_index.js?random=95.0'></script>

		<!-- <script type="text/javascript" src="/frame14/js/Main_index.js"></script>-->
		<script type="text/javascript" src="/js/main/main.js"></script>
		
	</body>
</html>

