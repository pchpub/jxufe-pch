



    var _deskey = '09305170399020223073008';
var _nowtime = '2023-12-31 10:36:42';
var _ssessionid = '210D2E69F52C42C07AD2E2AE7C43896B';
document.write("<script type='text/javascript' src='/custom/js/base64.js'></script>");
document.write("<script type='text/javascript' src='/custom/js/md5.js'></script>");
document.write("<script type='text/javascript' src='/custom/js/jkingo.des.js'></script>");
function b64_encode(data) { return base64encode(utf16to8(data)); } 
function b64_decode(data) { return utf8to16(base64decode(data)); } 
function md5(data) { return hex_md5(data); } 
function des_encode(data) { return strEnc(data, _deskey, null, null); } 
function des_decode(data) { return strDec(data, _deskey, null, null); } 
function getEncParams(params) { 
 var timestamp = _nowtime; 
 var token = md5(md5(params)+md5(timestamp)); 
 var _params = b64_encode(des_encode(params)); 
 _params = "params=" + _params + "&token="+token+"&timestamp="+timestamp; 
 return _params; 
 } 
function reloadScript00(id, jsfile){
 jsfile = jsfile + '?random='+Math.random(); 
 if (id=='kingo_encypt') document.getElementById('kingo_encypt').src = jsfile ; 
}
function reloadScript(id, jsfile){ 
 var oldS=document.getElementById(id); 
 if(oldS) oldS.parentNode.removeChild(oldS); 
 var t=document.createElement('script'); 
 if (new String(jsfile).indexOf('?') > -1){ 
 	jsfile = jsfile + '&random='+Math.random();  
 } else { 
 	jsfile = jsfile + '?random='+Math.random(); 
 }  
 t.src=jsfile; 
 t.type='text/javascript'; 
 t.id=id; 
 document.getElementsByTagName('head')[0].appendChild(t); 
}
var G_LOGIN_ID = 'kingo.guest';

