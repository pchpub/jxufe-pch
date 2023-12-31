/*
 * jQuery验证插件消息提示本地化
 * Translated default messages for the jQuery validation plugin.
 * Locale: CN
 */
jQuery.extend(jQuery.validator.messages, {
        required: "必选字段",
		remote: "请修正该字段",
		email: "请输入正确格式的电子邮件",
		url: "请输入合法的网址",
		date: "请输入合法的日期",
		dateISO: "请输入合法的日期 (ISO).",
		number: "请输入合法的数字",
		digits: "只能输入整数",
		creditcard: "请输入合法的信用卡号",
		equalTo: "请再次输入相同的值",
		accept: "请输入拥有合法后缀名的字符串",
		maxlength: jQuery.validator.format("请输入一个长度最多是 {0} 的字符串"),
		minlength: jQuery.validator.format("请输入一个长度最少是 {0} 的字符串"),
		rangelength: jQuery.validator.format("请输入一个长度介于 {0} 和 {1} 之间的字符串"),
		range: jQuery.validator.format("请输入一个介于 {0} 和 {1} 之间的值"),
		max: jQuery.validator.format("请输入一个最大为 {0} 的值"),
		min: jQuery.validator.format("请输入一个最小为 {0} 的值")
});

/**
 * 表单验证时缺省设置
 */
jQuery.validator.setDefaults({
	// 设置验证触发事件  
    //focusInvalid: false,   
    onkeyup: false,  // 是否在敲击键盘时验证
    // 表单验证时定制错误消息提示方式
	errorPlacement: function(error, element) { 
	    //error.appendTo(element.parent());  
		jQuery("#divTip").html(error);
	    setTimeout(function(){jQuery("#divTip").html("");}, 3000);
	    var elementId = jQuery(element).attr("id");
	    setTimeout(function(){jQuery(element).focus();}, 3000);
	}
});

/**
 * 以下为验证方法的扩展
 */
/**
 * 字符验证
 */       
jQuery.validator.addMethod("stringCheck", function(value, element) {       
	return this.optional(element) || /^[\u0391-\uFFE5\w]+$/.test(value);
}, "只能包括中文字、英文字母、数字和下划线");   
  
// 中文字两个字节       
jQuery.validator.addMethod("byteRangeLength", function(value, element, param) {       
    var length = value.length;       
    for(var i = 0; i < value.length; i++){       
        if(value.charCodeAt(i) > 127){       
        length++;       
        }       
    }       
    return this.optional(element) || ( length >= param[0] && length <= param[1] );       
}, "请确保输入的值在{0}-{1}个字节之间(一个中文字算2个字节)");   
  
/**
 * 身份证号码验证 
 */      
jQuery.validator.addMethod("isIdCardNo", function(value, element) {   
	//var exp1 = /^[1-9]\\d{7}((0\\d)|(1[0-2]))(([0|1|2]\\d)|3[0-1])\\d{3}$/;  // 15位身份证
	//var exp2 = /^[1-9]\\d{5}[1-9]\\d{3}((0\\d)|(1[0-2]))(([0|1|2]\\d)|3[0-1])\\d{3}([\\d|x|X]{1})$/;  // 18位身份证
    //return this.optional(element) || (isIdCardNo(value));       
    return this.optional(element) || (isValidIdCardNo(value));       
}, "请正确输入您的身份证号码");    

/**
 * IP验证
 */
jQuery.validator.addMethod("isIP", function(value, element) {       
	var exp = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
    return this.optional(element) || exp.test(value);       
}, "请正确填写您的IP地址");

/**
 * 手机号码验证
 */       
jQuery.validator.addMethod("isMobile", function(value, element) {       
    var length = value.length;   
    var mobile = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|(19[0-9]{1})|(92[0-9]{1})|(98[0-9]{1}))+\d{8})$/;   
    return this.optional(element) || (length == 11 && mobile.test(value));       
}, "请正确填写您的手机号码");       
     
/**
 * 电话号码验证
 */       
jQuery.validator.addMethod("isTel", function(value, element) {       
    var tel = /^\d{3,4}-\d{7,9}$/;    //电话号码格式010-12345678   
    var tel2 = /^\d{7,9}$/;   // 不加区号的电话号码
    return this.optional(element) || (tel.test(value) || tel2.test(value));       
}, "请正确填写您的电话号码");   
  
/**
 * 联系电话(手机/电话皆可)验证
 */   
jQuery.validator.addMethod("isPhone", function(value,element) {   
    var length = value.length;   
    var mobile = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|(19[0-9]{1})|(92[0-9]{1})|(98[0-9]{1}))+\d{8})$/; 
    var tel = /^\d{3,4}-\d{7,9}$/;   // 加区号的电话号码 :/^\d{3,4}-?\d{7,9}$/
    var tel2 = /^\d{7,9}$/;   // 不加区号的电话号码
    var tel3 = /^\d{3,4}-\d{7,9}-\d{1,6}$/;  //加分机号的电话号码
    var tel4 = /^\d{7,9}-\d{1,6}$/;  //加分机号的电话号码
    return this.optional(element) || (tel.test(value) || tel2.test(value) ||tel3.test(value) || tel4.test(value) || mobile.test(value)  );     
}, "请正确填写您的联系电话");   
/**
 * 带“-”数字
 */   
jQuery.validator.addMethod("isLf", function(value,element) {   
    var length = value.length;   
    var lf = /^\d{1,5}-\d{1,5}$/;   // 01-001
    var lf1 = /^\d{1,5}$/;   // 01
    //var lf2 = /^\d{1,5}-\d{1,5}-\d{1,5}$/;  //01-01-001
    return this.optional(element) || (lf.test(value) || lf1.test(value));     
}, "请正确填写楼层");        
/**
 * 邮政编码验证 
 */      
jQuery.validator.addMethod("isZipCode", function(value, element) {       
    var tel = /^[0-9]{6}$/;       
    return this.optional(element) || (tel.test(value));       
}, "请正确填写您的邮政编码");

/**
 * 网址验证扩展,不同于validator提供的url,可以不用输入http,https,ftp://等值
 */  
jQuery.validator.addMethod("isUrl", function(value, element) {   
	var test1 = /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i ;
    var test2 = /^(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i ;
	//return this.optional(element) || /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value);
    return this.optional(element) || test1.test(value) || test2.test(value) ;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
}, "请正确填写您的网址");

/**
 * 身份证号码验证-支持新的带x身份证
 * @param num
 * @return
 */
function isIdCardNo(num) 
 {
    var factorArr = new Array(7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2,1);
    var error;
    var varArray = new Array();
    var intValue;
    var lngProduct = 0;
    var intCheckDigit;
    var intStrLen = num.length;
    var idNumber = num;    
    // initialize
    if ((intStrLen != 15) && (intStrLen != 18)) {
        //error = "输入身份证号码长度不对！";
        //alert(error);
        //frmAddUser.txtIDCard.focus();
        return false;
    }    
    // check and set value
    for(i=0;i<intStrLen;i++) {
        varArray[i] = idNumber.charAt(i);
        if ((varArray[i] < '0' || varArray[i] > '9') && (i != 17)) {
            //error = "错误的身份证号码！.";
            //alert(error);
            //frmAddUser.txtIDCard.focus();
            return false;
        } else if (i < 17) {
            varArray[i] = varArray[i]*factorArr[i];
        }
    }
    if (intStrLen == 18) {
        //check date
        var date8 = idNumber.substring(6,14);
        /**
        if (checkDate(date8) == false) {
            //error = "身份证中日期信息不正确！.";
            //alert(error);
            return false;
        } */
        // calculate the sum of the products
        for(i=0;i<17;i++) {
            lngProduct = lngProduct + varArray[i];
        }        
        // calculate the check digit
        intCheckDigit = 12 - lngProduct % 11;
        //alert("lngProduct/intCheckDigit = " + lngProduct + "/" + intCheckDigit);
        switch (intCheckDigit) {
            case 10: //4
                intCheckDigit = 'X';
                break;
            case 11:
                intCheckDigit = 0;
               break;
            case 12:
                intCheckDigit = 1;
                break;
        }        
       // check last digit
        //alert(intCheckDigit + "/" + varArray[17].toUpperCase());
        if (varArray[17].toUpperCase() != intCheckDigit) {
            //error = "身份证效验位错误!正确为： " + intCheckDigit + ".";
            //alert(error);
            return false;
        }
    } 
    else{        //length is 15
        //check date
        var date6 = idNumber.substring(6,12);
        /**
        if (checkDate(date6) == false) {
            //alert("身份证日期信息有误！.");
            return false;
        }
        */
    }
    //alert ("Correct.");
    return true;
}

/** 
 * 身份证15位编码规则：dddddd yymmdd xx p  
 * dddddd：地区码  
 * yymmdd: 出生年月日  
 * xx: 顺序类编码，无法确定  
 * p: 性别，奇数为男，偶数为女 
 * <p /> 
 * 身份证18位编码规则：dddddd yyyymmdd xxx y  
 * dddddd：地区码  
 * yyyymmdd: 出生年月日  
 * xxx:顺序类编码，无法确定，奇数为男，偶数为女  
 * y: 校验码，该位数值可通过前17位计算获得 
 * <p /> 
 * 18位号码加权因子为(从右到左) Wi = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2,1 ] 
 * 验证位 Y = [ 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 ]  
 * 校验位计算公式：Y_P = mod( ∑(Ai×Wi),11 )  
 * i为身份证号码从右往左数的 2...18 位; Y_P为脚丫校验码所在校验码数组位置 
 *  
 */ 
var Wi = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1 ];// 加权因子  
var ValideCode = [ 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 ];// 身份证验证位值.10代表X  
function isValidIdCardNo(idCard) {  
    idCard = trim(idCard.replace(/ /g, ""));  
    if (idCard.length == 15) {  
        return isValidityBrithBy15IdCard(idCard);  
    } else if (idCard.length == 18) {  
        var a_idCard = idCard.split("");// 得到身份证数组  
        if(isValidityBrithBy18IdCard(idCard) && isTrueValidateCodeBy18IdCard(a_idCard)){  
            return true;  
        } else {  
            return false;  
        }  
    } else {  
        return false;  
    }  
}  

/** 
 * 判断身份证号码为18位时最后的验证位是否正确 
 * @param a_idCard 身份证号码数组 
 * @return 
 */ 
function isTrueValidateCodeBy18IdCard(a_idCard) {  
    var sum = 0; // 声明加权求和变量  
    if (a_idCard[17].toLowerCase() == 'x') {  
        a_idCard[17] = 10;// 将最后位为x的验证码替换为10方便后续操作  
    }  
    for ( var i = 0; i < 17; i++) {  
        sum += Wi[i] * a_idCard[i];// 加权求和  
    }  
    valCodePosition = sum % 11;// 得到验证码所位置  
    if (a_idCard[17] == ValideCode[valCodePosition]) {  
        return true;  
    } else {  
        return false;  
    }  
}  

/** 
 * 通过身份证判断是男是女 
 * @param idCard 15/18位身份证号码  
 * @return 'female'-女、'male'-男 
 */ 
function maleOrFemalByIdCard(idCard){  
    idCard = trim(idCard.replace(/ /g, ""));// 对身份证号码做处理。包括字符间有空格。  
    if(idCard.length==15){  
        if(idCard.substring(14,15)%2==0){  
            return 'female';  
        }else{  
            return 'male';  
        }  
    }else if(idCard.length ==18){  
        if(idCard.substring(14,17)%2==0){  
            return 'female';  
        }else{  
            return 'male';  
        }  
    }else{  
        return null;  
    }  
//  可对传入字符直接当作数组来处理  
// if(idCard.length==15){  
// alert(idCard[13]);  
// if(idCard[13]%2==0){  
// return 'female';  
// }else{  
// return 'male';  
// }  
// }else if(idCard.length==18){  
// alert(idCard[16]);  
// if(idCard[16]%2==0){  
// return 'female';  
// }else{  
// return 'male';  
// }  
// }else{  
// return null;  
// }  
}  
 /** 
  * 验证18位数身份证号码中的生日是否是有效生日 
  * @param idCard 18位书身份证字符串 
  * @return 
  */ 
function isValidityBrithBy18IdCard(idCard18){  
    var year =  idCard18.substring(6,10);  
    var month = idCard18.substring(10,12);  
    var day = idCard18.substring(12,14);  
    var temp_date = new Date(year,parseFloat(month)-1,parseFloat(day));  
    // 这里用getFullYear()获取年份，避免千年虫问题  
    if(temp_date.getFullYear()!=parseFloat(year)  
          ||temp_date.getMonth()!=parseFloat(month)-1  
          ||temp_date.getDate()!=parseFloat(day)){  
            return false;  
    }else{  
        return true;  
    }  
}  

/** 
 * 验证15位数身份证号码中的生日是否是有效生日 
 * @param idCard15 15位身份证字符串 
 * @return 
*/ 
function isValidityBrithBy15IdCard(idCard15){  
	var year =  idCard15.substring(6,8);  
    var month = idCard15.substring(8,10);  
    var day = idCard15.substring(10,12);  
    var temp_date = new Date(year,parseFloat(month)-1,parseFloat(day));  
    // 对于老身份证中的年龄则不需考虑千年虫问题而使用getYear()方法  
    if(temp_date.getYear()!=parseFloat(year)  
            ||temp_date.getMonth()!=parseFloat(month)-1  
            ||temp_date.getDate()!=parseFloat(day)){  
          return false;  
    }else{  
          return true;  
    }  
  }  
  
/**
 * 去掉字符串头尾空格 
 * @param str
 * @returns
 */
function trim(str) {  
    return str.replace(/(^\s*)|(\s*$)/g, "");  
}
