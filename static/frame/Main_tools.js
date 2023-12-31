var ie6=window.navigator.userAgent.indexOf('MSIE 6');

function openWinX(url,name,w,h){ 
var pop=window.open(url,name,"width=" + w + ",height=" + h + ",toolbar=no,menubar=no,scrollbars=yes,resizable=yes,location=no,status=no");
pop.moveTo((screen.width-w)/2,(screen.height-h)/2);
}

function openWinHome(url,name,w,h){ 
var pop;
if (window.screen.height>600){w+=100; h+=30;
pop=window.open(url,name,"width=" + w + ",height=" + h + ",toolbar=no,menubar=yes,scrollbars=yes,resizable=yes,location=no,status=no");
pop.moveTo((window.screen.width-w)/2,(window.screen.height-h)/2);
}else{
pop=window.open(url,name,"width=" + w + ",height=" + h + ",toolbar=no,menubar=yes,scrollbars=yes,resizable=yes,location=no,status=no");
pop.moveTo(0,20);
}
}

function Fresh(){try{
	if(parent.document.getElementById("frmDesk").width=='0')
	parent.frmMain.history.go(0);
	else parent.frmMain.history.go(0)	
}catch(e){}}

function Min(){try{hhctrl.Click();}catch(e){}} //最小化
function goDesktop(theID){
	parent.frames("frmMain").location.replace("../frame/Desktop.jsp");

	/*var pxW='100%';
	var objDesk=parent.document.getElementById("frmDesk");
	var objMain=parent.document.getElementById("frmMain");
	
	//if(window.screen.width>800) pxW='886';
	//if(ie6!=-1) pxW='100%';
	if(theID=='tree'){
		if(objDesk.offsetWidth != '0'){
			objDesk.width='0';
			objMain.width=pxW;
		}
	}else{
		if(objDesk.offsetWidth == '0'){ 
			objDesk.width=pxW;
			objMain.width='0';
			// if(parent.frames["frmMain"].location.href.substring(0,11)!='about:blank')
		}else{ 
			objDesk.width='0';
			objMain.width=pxW;
		}
	}*/
}

function DoMouse(theid)
{	
	return false;

	var id; var imgSRC;
	id = theid.state;
	if(id=='1'){theid.state='0'; theid.style.cursor='';
	imgSRC  = '../_style/default/tool/'+theid.alt+'.gif';
	}else{theid.state='1'; theid.style.cursor='hand';
	imgSRC  = '../_style/default/tool/'+theid.alt+'2.gif';
	}
	theid.src =imgSRC;
}

function MouseOver(spanId)
{
var objSpan = eval(spanId);
if(objSpan.style.color==RGB_NONE){objSpan.style.cursor='';return false;}

objSpan.style.cursor='hand';
if(objSpan.style.color!=RGB_CHECK){objSpan.style.color=RGB_OVER;}
}

function MouseOut(spanId)
{
var objSpan = eval(spanId); 
if(objSpan.style.color==RGB_NONE){return false;}
if(objSpan.style.color!=RGB_CHECK){objSpan.style.color=RGB_LINK;}
}
