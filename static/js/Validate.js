/*******************************************************************************
 * 客户端表单数据验证函数 创建时间：2008-04-18 修改时间： 修 改 人：
 ******************************************************************************/

/*
* 引用外部对象列表：
* function:Trim()
*/

// //////////////////////////////////////////////////////////////////////////////////
// 判断是否含有空格
function CheckSpace(str) {
	var strlength;
	var k;
	var ch;
	strlength = str.length;
	for (k = 0; k <= strlength; k++) {
		ch = str.substring(k, k + 1);
		if (ch == " ") {
			return false;
		}
	}
	return true;
}

// 判断是否含有为中文
function CheckChinese(str) {
	if (escape(str).indexOf("%u") != -1)
		return true;
	else
		return false;
}

// 判断只允许中文
function IsOnlyChinese(str) {
	if (str.search(/^[\u4e00-\u9fa5]+$/) == -1)
		return false;
	else
		return true;
}

// 判断只允许英文
function IsOnlyEnglish(str) {
	if (str.search(/^[A-Za-z]+$/) == -1)
		return false;
	else
		return true;
}

// 判断只允许数字
function IsOnlyNumeric(str) {
	var reg = /^[\d]*$/;
	if (reg.test(Trim(str)))
		return true;
	else
		return false;
}

// /////////////////////////////////////////////////////////////////////////////////
// 验证整型
function IsInteger(str) {
	if (str.search(/^[-\+]?\d+$/) == -1)
		return false;
	else
		return true;
}

// 验证浮点型
function IsDouble(str) {
	if (str.search(/^[-\+]?\d+(\.\d+)?$/) == -1)
		return false;
	else
		return true;
}

// 验证Email
function IsEmail(str) {
	//if (str.search(/[^@]+@([a-zA-Z0-9-]+.)+([a-zA-Z0-9-]{2}|net|com|gov|mil|org|edu|int)$/) != -1)
	if (str.search( /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/) != -1) //Time:2013-12-31 Autor: Kingo230
		return true;
	else
		return false;
}
function IsEmail_debug(strEmail) { // ?
	var bflag = true;
	var s = strEmail;
	if (s.indexOf("'") != -1)
		bflag = false;
	if (s.indexOf('.') == -1)
		bflag = false;
	if (s.indexOf('@') == -1)
		bflag = false;
	else if (str.charAt(0) == '@')
		bflag = false;
	return bflag;
}

// 验证IP
function IsIP(strIP) {
	var exp = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
	var reg = strIP.match(exp);
	if (reg == null) return false;	
	return true;
}

// 验证电话号码
function IsTel(str) {
	var i, strlengh, tempchar;
	str = Trim(str);
	if (str == "")
		return false;
	strlength = str.length;
	for (i = 0; i < strlength; i++) {
		tempchar = str.substring(i, i + 1);
		if (!(tempchar == 0 || tempchar == 1 || tempchar == 2 || tempchar == 3
				|| tempchar == 4 || tempchar == 5 || tempchar == 6
				|| tempchar == 7 || tempchar == 8 || tempchar == 9 || tempchar == '-')) {
			return false;
		}
	}
	return true;
}

// 验证手机号码
function IsMobileTel(obj) {
	if (obj.length != 11) {
		return false;
	
	} else if (obj.substring(0, 2) != "13" && obj.substring(0, 2) != "14" 
	        && obj.substring(0, 2) != "15" && obj.substring(0, 2) != "16"
			&& obj.substring(0, 2) != "17" && obj.substring(0, 2) != "18"
			&& obj.substring(0, 2) != "19" && obj.substring(0, 2) != "92" 
			&& obj.substring(0, 2) != "98") {
		return false;
	
	} else if (isNaN(obj)) {
		return false;
	} else {
		return true;
	}
}
// ****************************************************************************** //
// 功能：计算字符串长度
// 传入参数：
// value： 要进行检查的字符串
// 传出结果： 字符串长度（如果是汉字，那么一个汉字的长度是2）
// ****************************************************************************** //
function getStrLen(value)
{ 
	var str,Num = 0;
	for (var i = 0; i < value.length; i++) {
		str = value.substring(i,i+1);
		if (str<="~") //对双字节字特殊处理
			Num+=1;
		else
			Num+=2;
	}
	return Num;
}
function chkZdcd(strname,obj,zfc){
	if(obj.value!=""){
		if(getStrLen(obj.value)>zfc){
			alert(strname+"不能超过"+zfc+"字符！");
			obj.value=obj.value.substring(0,zfc/2);
			obj.focus();
		}
	}
}
// //////////////////////////////////////////////////////////////////////////////////

function HtmlEncode(str) {
	str = str.replace(/&/g, '&amp;');
	str = str.replace(/</g, '&lt;');
	str = str.replace(/>/g, '&gt;');
	str = str.replace(/\'/g, '&#039;');
	str = str.replace(/\"/g, '&quot;');
	return str;
}

// 验证日期格式
function isDateFormat(obj)
{
	if(obj == null || obj.value == "")return;
	var flag = true;
	var getdate = obj.value;
	//判断输入格式是否正确
	if (getdate.search(/^[0-9]{4}-(0[1-9]|[1-9]|1[0-2])-((0[1-9]|[1-9])|1[0-9]|2[0-9]|3[0-1])$/) == -1) 
	{
       flag = false;
   	}
   	else
   	{
        var year=getdate.substr(0,getdate.indexOf('-'))  // 获得年
        //获得月份
		var transition_month=getdate.substr(0,getdate.lastIndexOf('-')); 
		var month=transition_month.substr(transition_month.lastIndexOf('-')+1,transition_month.length);
		if (month.indexOf('0') == 0)
			month=month.substr(1,month.length);
		//获得日期
		var day=getdate.substr(getdate.lastIndexOf('-')+1,getdate.length);
		if (day.indexOf('0') == 0)
			day=day.substr(1,day.length);
		//4,6,9,11月份天数不能超过30
        if ((month==4 || month==6 || month==9 || month==11) && (day>30)) 
        	flag=false;
        //判断2月份
		if (month==2){
			if (LeapYear(year))
				if (day>29 || day<1){flag=false;}
			else
				if (day>28 || day<1){flag=false;}
		}else{
			flag=true;
		}
  	}
	if (flag == false)
	{
	    alert("时间格式不正确!");
	    obj.focus();
	    return false;
	}
}

 //判断是否闰年
//参数		intYear 代表年份的值
//return	true: 是闰年	false: 不是闰年
function LeapYear(intYear) {
	if (intYear % 100 == 0) 
	{
		if (intYear % 400 == 0) { return true; }
	}
	else {
		if ((intYear % 4) == 0) { return true; }
	}
	return false;
}
