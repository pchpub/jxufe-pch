var msg_HTML='';
var msg_Flag='html';
var msg_Title='\u6700\u65b0\u6d88\u606f'; // 最新消息
var js_SysPosMsg_Closed='0';  //弹出的总开关
var js_SysPosMsg_HadRead='1'; //默认开启POPMsg(即已读,准备扫描下一条msg...)

var msg_divTop,msg_divLeft,msg_divWidth,msg_divHeight,msg_docHeight,msg_docWidth; 
var msg_TheObj,msg_objTimer;
//////////////////////////////////////////////////////////////////////////////////////
function Scan_POPMsg(pType){
	try{
		if(js_SysPosMsg_HadRead!='1') return false;
		if(imScanUrl=="") return false;
		
		var vXML='';var str='';	
		if(pType=='pop_im'){
			//Ajax.doPost(imScanUrl,"hidOption=getMessageInfo",getOnlineMessage);
			//Ajax.doPost(imScanUrl,"hidOption=getOnlineMessage",getOnlineMessage);
		}
	}catch(err){}
}

function getOnlineMessage(){
	//alert("this.responseText="+this.responseText);
	document.getElementById("OnlineMessageDataXML").innerHTML = this.responseText;
	showOnlineMessage();
}

function updateOnlineMessageStatus(flag){
	var xxdm;
	try{
		xxdm = document.getElementById("hid_OnlineMessageCode").value;
	}catch(e){
		xxdm = "";
	}
	if(xxdm != ""){
		Ajax.doPost(imScanUrl,"hidOption=updateMessageState&state="+flag+"&xxdm="+xxdm,null);
	}
}

function showOnlineMessage(){
	msg_HTML = '';
	msg_tips = '';	
	try{
        var recs = document.getElementById("OnlineMessageList").getElementsByTagName("OnlineMessage");
        if( recs.length > 0){
        	/**
        	在线消息示例数据：
        	<xml id='OnlineMessageList'>
				<OnlineMessage>
					<code><![CDATA[000044963]]></code>
					<title><![CDATA[发送消息测试2019071801]]></title>
					<content><![CDATA[发送消息测试2019071801]]></content>
				</OnlineMessage>
			</xml>
        	<code><![CDATA[000044963]]></code>
        	<!--[CDATA[000044963]]-->
        	&lt;![CDATA[发送消息测试2019071801]]&gt;
			*/
        	var _codeHtml = recs[0].childNodes[0].innerHTML;
        	var _titleHtml = recs[0].childNodes[1].innerHTML;
        	var _contentHtml = recs[0].childNodes[2].innerHTML;
        	var _code = _codeHtml.replace('<!--[CDATA[', '').replace(']]-->', '');
        	var _title = _titleHtml.replace('<!--[CDATA[', '').replace(']]-->', '');
        	var _content = _contentHtml.replace('<!--[CDATA[', '').replace(']]-->', '');
        	_code = _code.replace('&lt;![CDATA[', '').replace(']]&gt;', '');
        	_title = _title.replace('&lt;![CDATA[', '').replace(']]&gt;', '');
        	_content = _content.replace('&lt;![CDATA[', '').replace(']]&gt;', '');
        	//在线消息代码
        	/**
        	document.getElementById("hid_OnlineMessageCode").value = recs[0].childNodes[0].text;
        	var msgid=recs[0].childNodes[0].text;
        	var msg=recs[0].childNodes[2].text;
        	*/
        	document.getElementById("hid_OnlineMessageCode").value = _code;
        	var msgid=_code;
        	var msg=_content;
        	//alert("msgid="+msgid+"msg="+msg);
          	msg_HTML = recs[0].childNodes[1].text+"<br><br><a href='javascript:void(0)' onclick=viewMessageDetail('"+msgid+"')>"+msg+"</a>";
            msg_tips = "<a href='javascript:void(0)' onclick=showMessageTips('"+msgid+"','"+msg+"') id='showtips'>你有新消息!</a>";
            //alert(">> msg_tips = "+typeof(reValue)+":::"+msg_tips);
            //if(msg_HTML != '')showPopMSG(msg_Flag,msg_Title,msg_HTML);
            if(msg_HTML != ''){
            //if (typeof(reValue) != "undefined"){
            	// 新消息提示
            	//alert("msg_HTML="+msg_HTML);
			    var frmfoot = parent.document.getElementById("frmfoot").contentWindow.document ;
			    //frmfoot.getElementById("popmsg").innerHTML = "<font color='#FFF'>"+msg_tips+"</font>";  
			    frmfoot.getElementById("popmsg").innerHTML = msg_tips ;
			    // 提示消息1s闪一次
			    shakeMsg();           	
            }
        }
	}catch(e){}
}

function shakeMsg() {
    var frmfoot = parent.document.getElementById("frmfoot").contentWindow.document ;
	var _pop = frmfoot.getElementById('showtips');
	if (_pop){
	    if (!_pop.style.color) {
	        _pop.style.color = "red";
	    }
	    if (_pop.style.color == "red") {
	        _pop.style.color = "#FFFFFF";
	    } else {
	        _pop.style.color = "red";
	    }
	    timer = setTimeout("shakeMsg()", 1000);
    } else {
    	clearTimeout(timer);
    }
}
function stoptimer() {
    clearTimeout(timer);
} 

function getInnerText(el){
    if(el.innerText || el.innerText=="")return el.innerText;//IE下获取
    if(el.textContent || el.textContent=="")return el.textContent;//FF下获取
    if(el.hasChildNodes())return el.childNodes[0].value; //获取子结点元素值
}
	
			
function viewMessageDetail14(theID){
	try{
		//closeDiv();//随即关闭POP
		if(imViewUrl == "") return false;
		
		var Tform,vURL='',w=450,h=300;
		//vURL=imViewUrl+"?id="+theID;
		vURL=imViewUrl+"&id="+theID;
		eval("Tform='width="+w+",height="+h+",scrollbars=no,resizable=no'");
		var pop=window.open(vURL,'',Tform);
		pop.moveTo(0,0);
		//window.showModalDialog(vURL,Tform);
	}catch(err){}
}

function viewMessageDetail(theID){
	try{
		closeDiv();//随即关闭POP
		if(imViewUrl == "") return false;
		
		var Tform,vURL='',w=450,h=300;
		//vURL=imViewUrl+"?id="+theID;
		vURL=imViewUrl+"&id="+theID;
		eval("Tform='width="+w+",height="+h+",scrollbars=no,resizable=no'");
		var pop=window.open(vURL,'',Tform);
		pop.moveTo(0,0);
		//window.showModalDialog(vURL,Tform);
	}catch(err){}
}


function OpenPlacard(){
		if(imMoreUrl=="") return false;
		var sUrl = imMoreUrl;
		var PopVariable = 'width=700,height=400,resizable=yes,scrollbars=no,menubar=no,toolbar=no,status=no,location=no';
		var vP=window.open(sUrl,'popMSG', PopVariable);
		vP.moveTo(50,20);		
}

////////////////////////////////////////////////////////////////////////////////////////////
function showPopMSG(pFlag,pTitle,pMSG){
	//try{ 
		
		var isClose;
		isClose=js_SysPosMsg_Closed;
		
		if(isClose=='1') return false;
		if(pMSG=='') return false;
		
		msg_TheObj=document.getElementById('msgForm');
		msg_divTop = parseInt(msg_TheObj.style.top,10) 
		msg_divLeft = parseInt(msg_TheObj.style.left,10) 
		msg_divHeight = parseInt(msg_TheObj.offsetHeight,10) 
		msg_divWidth = parseInt(msg_TheObj.offsetWidth,10) 
		msg_docWidth = document.body.clientWidth; 
		msg_docHeight = document.body.clientHeight;
		msg_TheObj.style.top = parseInt(document.body.scrollTop,10) + msg_docHeight + 10; 
		msg_TheObj.style.left = parseInt(document.body.scrollLeft,10) + msg_docWidth - msg_divWidth;
		msg_TheObj.style.visibility='visible';
		
		msg_objTimer = window.setInterval('moveDiv()',1);
			
		
		if(pFlag=='html') document.getElementById('divMsg').innerHTML=pMSG;
		else if(pFlag=='text') document.getElementById('divMsg').innerText=pMSG;
		else document.getElementById('divMsg').innerText='(参数错误)';

		if(typeof(pTitle)=='undefined'||pTitle=='') pTitle='\u6700\u65b0\u6d88\u606f'; // 最新信息
		document.getElementById('divTTL').innerText=pTitle;
		
		document.getElementById("bgmid").src='../common/popmsg/wav/msg.wav';
		window.setTimeout("document.getElementById('bgmid').src='';",5000);
		js_SysPosMsg_HadRead='0';
		
		//更新是否弹出标志
		//updateOnlineMessageStatus("ytc");
	//}catch(e){}
} 

function moveDiv(){ 
	
	//try{ 
		if(parseInt(msg_TheObj.style.top,10) <= (msg_docHeight - msg_divHeight + parseInt(document.body.scrollTop,10))){ 
			window.clearInterval(msg_objTimer);
			msg_objTimer = window.setInterval('resizeDiv()',1);
		} 
		msg_divTop = parseInt(msg_TheObj.style.top,10);
		msg_TheObj.style.top = msg_divTop - 1;
	//}catch(e){} 
}

function resizeDiv(){ 
	//try{ 
		msg_divHeight = parseInt(msg_TheObj.offsetHeight,10) 
		msg_divWidth = parseInt(msg_TheObj.offsetWidth,10) 
		msg_docWidth = document.body.clientWidth; 
		msg_docHeight = document.body.clientHeight; 
		msg_TheObj.style.top = msg_docHeight - msg_divHeight + parseInt(document.body.scrollTop,10) 
		msg_TheObj.style.left = msg_docWidth - msg_divWidth + parseInt(document.body.scrollLeft,10) 
	//}catch(e){}
} 

function closeDiv(){
	//更新是否查看标志
	updateOnlineMessageStatus("ytc");
	msg_TheObj.style.visibility='hidden'; 
	if(msg_objTimer) window.clearInterval(msg_objTimer);
	msg_TheObj.style.bottom = 0; 
	js_SysPosMsg_HadRead = '1';
	//清除消息代码
	document.getElementById("hid_OnlineMessageCode").value = "";
}

function hidForm(){ 
	closeDiv();
	js_SysPosMsg_Closed='1';
} 
