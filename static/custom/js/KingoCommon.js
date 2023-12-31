/**
 * (kingo自定义部分始于680行,可用ctrl+L定位)
 * ==================================================================
 * 扩展String原型方法
 * @author qukj
 * @date 2012-03-19
 * @version 1.0
 * ==================================================================
 */
/**
 * 去掉左边(开始)的空白字符
 * @param string
 * @return
 */
String.prototype.trimStart=function(string)
{
    if (!string)
    {
        string="\\s+";
    }
    var trimStartPattern=new RegExp("^("+string+")+","g");
    return this.replace(trimStartPattern,"");
}

/**
 * 去掉右边(结尾)的空白字符
 * @param string
 * @return
 */
String.prototype.trimEnd=function(string)
{
    if (!string)
    {
        string="\\s+";
    }
    var trimEndPattern=new RegExp("("+string+")+$","g");
    return this.replace(trimEndPattern,"");
}

/**
 * 去掉首尾空白字符
 * @param string
 * @return
 */
String.prototype.trim=function(string)
{
    return this.trimStart(string).trimEnd(string);
}		

/**
 * 是否以指定字符开始
 * @param string
 * @return
 */
String.prototype.startsWith=function(string)
{
    if (!string)
    {
        string="\\s";
    }
    var startsWithPattern=new RegExp("^("+string+")","g");
    return startsWithPattern.test(this);
}

/**
 * 是否以指定字符结尾
 * @param string
 * @return
 */
String.prototype.endsWith=function(string)
{
    if (!string)
    {
        string="\\s";
    }
    var endsWithPattern=new RegExp("("+string+")$","g");
    return endsWithPattern.test(this);
}		

/**
 * 倒序
 * @return
 */
String.prototype.reverse=function(){
	return this.split("").reverse().join("");
}

/**
 * 是否包含指定字符
 * @param str 子字符串
 * @return
 */
String.prototype.isContains = function(str){
    return (this.indexOf(str) > -1);
}

/**
 * 判断是否为空
 * @return
 */
String.prototype.isEmpty = function(){
    return this == "";
}

/**
 * 判断是否是整数
 * @return
 */
String.prototype.isInt = function(){
    if (this == "NaN")
        return false;
    return this == parseInt(this).toString();
}

/**
 * 保留字母
 * @return
 */
String.prototype.getEn = function(){
    return this.replace(/[^A-Za-z]/g, "");
}

/**
 * 获取字节长度，一个中文字符算2个字符
 * @return
 */
String.prototype.byteLength = function(){
    return this.replace(/[^\x00-\xff]/g, "**").length;
}

/**
 * 从左截取指定长度的字串，一个中文字符算2个字符
 * @param n 截取长度
 * @return
 */
String.prototype.left = function(n){
    return this.slice(0, n);
}

/**
 * 从右截取指定长度的字串，一个中文字符算2个字符
 * @param n 截取长度
 * @return
 */
String.prototype.right = function(n){
    return this.slice(this.length - n);
}

/**
 * 获取字符串的Unicode编码
 * @return
 */
String.prototype.unicode = function(){
    var tmpArr = [];
    for (var i = 0; i < this.length; i++)
        tmpArr.push("&#" + this.charCodeAt(i) + ";");
    return tmpArr.join("");
}

/**
 * 指定位置插入字符串
 * @param index 插入位置
 * @param str 待插入的字符串
 * @return
 */
String.prototype.insert = function(index, str){
    return this.substring(0, index) + str + this.substr(index);
}

/**
 * 字符串格式化：用指定的参数值替换对应位置的参数
 * 原型方法,使用示例：
 * var a = "I Love {0}, and You Love {1},Where are {0}!";
 * alert(a.format("You","Me"));
 * 
 * @return
 */
String.prototype.format = function()
{
    var args = arguments;
    return this.replace(/\{(\d+)\}/g,              
        function(m,i){
            return args[i];
        });
}

/**
 * 字符串格式化：用指定的参数值替换对应位置的参数
 * 静态方法,使用示例：
 * var a = "I Love {0}, and You Love {1},Where are {0}!";
 * alert(String.format(a, "You","Me"));
 * 
 * @return
 */
String.format = function() {
    if( arguments.length == 0 )
        return null;
    var str = arguments[0];
    for(var i=1;i<arguments.length;i++) {
        var re = new RegExp('\\{' + (i-1) + '\\}','gm');
        str = str.replace(re, arguments[i]);
    }
    return str;
}

/**
 * ================================================================== 
 * 类Java中的HashMap对象
 * @author qukj
 * @since 2012-03-19
 * ==================================================================
 */
function KMap(){
    this.elements = new Array();
 
    //获取MAP元素个数
    this.size = function(){
        return this.elements.length;
    }
 
    //判断MAP是否为空
    this.isEmpty = function(){
        return (this.elements.length < 1);
    }
 
    //删除MAP所有元素
    this.clear = function(){
        this.elements = new Array();
    }
 
    //向MAP中增加元素（key, value)
    this.put = function(_key, _value){
        this.elements.push({
            key: _key,
            value: _value
        });
    }
 
    //删除指定KEY的元素，成功返回True，失败返回False
    this.remove = function(_key){
        var bln = false;
        try {
            for (i = 0; i < this.elements.length; i++) {
                if (this.elements[i].key == _key) {
                    this.elements.splice(i, 1);
                    return true;
                }
            }
        }
        catch (e) {
            bln = false;
        }
        return bln;
    }
 
    //获取指定KEY的元素值VALUE，失败返回NULL
    this.get = function(_key){
        try {
         var result = null;
            for (i = 0; i < this.elements.length; i++) {
                if (this.elements[i].key == _key) {
                    result = this.elements[i].value;
                }
            }
            return result;
        }
        catch (e) {
            return null;
        }
    }
  
    //设置MAP中指定KEY元素的值VALUE, 失败返回NULL
    this.set = function(_key,_value){
     try{
      this.remove(_key);
      this.put(_key,_value);
     }catch(e){
      return null;
     }
    }
   
    //获取指定索引的元素（使用element.key，element.value获取KEY和VALUE），失败返回NULL
    this.element = function(_index){
        if (_index < 0 || _index >= this.elements.length) {
            return null;
        }
        return this.elements[_index];
    }
 
    //判断MAP中是否含有指定KEY的元素
    this.containsKey = function(_key){
        var bln = false;
        try {
            for (i = 0; i < this.elements.length; i++) {
                if (this.elements[i].key == _key) {
                    bln = true;
                }
            }
        }
        catch (e) {
            bln = false;
        }
        return bln;
    }
 
    //判断MAP中是否含有指定VALUE的元素
    this.containsValue = function(_value){
        var bln = false;
        try {
            for (i = 0; i < this.elements.length; i++) {
                if (this.elements[i].value == _value) {
                    bln = true;
                }
            }
        }
        catch (e) {
            bln = false;
        }
        return bln;
    }
 
    //获取MAP中所有VALUE的数组（ARRAY）
    this.values = function(){
        var arr = new Array();
        for (i = 0; i < this.elements.length; i++) {
            arr.push(this.elements[i].value);
        }
        return arr;
    }
 
    //获取MAP中所有KEY的数组（ARRAY）
    this.keys = function(){
        var arr = new Array();
        for (i = 0; i < this.elements.length; i++) {
            arr.push(this.elements[i].key);
        }
        return arr;
    }
}

/**
 * ================================================================== 
 * json与字符串的双向转换类
 * @author 
 * @since 2012-03-19
 * ==================================================================
 */
/*jslint evil: true */

/*members "", "\b", "\t", "\n", "\f", "\r", "\"", JSON, "\\", apply,
    call, charCodeAt, getUTCDate, getUTCFullYear, getUTCHours,
    getUTCMinutes, getUTCMonth, getUTCSeconds, hasOwnProperty, join,
    lastIndex, length, parse, prototype, push, replace, slice, stringify,
    test, toJSON, toString, valueOf
*/

"use strict";

// Create a JSON object only if one does not already exist. We create the
// methods in a closure to avoid creating global variables.

if (!this.JSON) {
    this.JSON = {};
}

(function () {

    function f(n) {
        // Format integers to have at least two digits.
        return n < 10 ? '0' + n : n;
    }

    if (typeof Date.prototype.toJSON !== 'function') {

        Date.prototype.toJSON = function (key) {

            return isFinite(this.valueOf()) ?
                   this.getUTCFullYear()   + '-' +
                 f(this.getUTCMonth() + 1) + '-' +
                 f(this.getUTCDate())      + 'T' +
                 f(this.getUTCHours())     + ':' +
                 f(this.getUTCMinutes())   + ':' +
                 f(this.getUTCSeconds())   + 'Z' : null;
        };

        String.prototype.toJSON =
        Number.prototype.toJSON =
        Boolean.prototype.toJSON = function (key) {
            return this.valueOf();
        };
    }

    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap,
        indent,
        meta = {    // table of character substitutions
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"' : '\\"',
            '\\': '\\\\'
        },
        rep;


    function quote(string) {

// If the string contains no control characters, no quote characters, and no
// backslash characters, then we can safely slap some quotes around it.
// Otherwise we must also replace the offending characters with safe escape
// sequences.

        escapable.lastIndex = 0;
        return escapable.test(string) ?
            '"' + string.replace(escapable, function (a) {
                var c = meta[a];
                return typeof c === 'string' ? c :
                    '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
            }) + '"' :
            '"' + string + '"';
    }


    function str(key, holder) {

// Produce a string from holder[key].

        var i,          // The loop counter.
            k,          // The member key.
            v,          // The member value.
            length,
            mind = gap,
            partial,
            value = holder[key];

// If the value has a toJSON method, call it to obtain a replacement value.

        if (value && typeof value === 'object' &&
                typeof value.toJSON === 'function') {
            value = value.toJSON(key);
        }

// If we were called with a replacer function, then call the replacer to
// obtain a replacement value.

        if (typeof rep === 'function') {
            value = rep.call(holder, key, value);
        }

// What happens next depends on the value's type.

        switch (typeof value) {
        case 'string':
            return quote(value);

        case 'number':

// JSON numbers must be finite. Encode non-finite numbers as null.

            return isFinite(value) ? String(value) : 'null';

        case 'boolean':
        case 'null':

// If the value is a boolean or null, convert it to a string. Note:
// typeof null does not produce 'null'. The case is included here in
// the remote chance that this gets fixed someday.

            return String(value);

// If the type is 'object', we might be dealing with an object or an array or
// null.

        case 'object':

// Due to a specification blunder in ECMAScript, typeof null is 'object',
// so watch out for that case.

            if (!value) {
                return 'null';
            }

// Make an array to hold the partial results of stringifying this object value.

            gap += indent;
            partial = [];

// Is the value an array?

            if (Object.prototype.toString.apply(value) === '[object Array]') {

// The value is an array. Stringify every element. Use null as a placeholder
// for non-JSON values.

                length = value.length;
                for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value) || 'null';
                }

// Join all of the elements together, separated with commas, and wrap them in
// brackets.

                v = partial.length === 0 ? '[]' :
                    gap ? '[\n' + gap +
                            partial.join(',\n' + gap) + '\n' +
                                mind + ']' :
                          '[' + partial.join(',') + ']';
                gap = mind;
                return v;
            }

// If the replacer is an array, use it to select the members to be stringified.

            if (rep && typeof rep === 'object') {
                length = rep.length;
                for (i = 0; i < length; i += 1) {
                    k = rep[i];
                    if (typeof k === 'string') {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            } else {

// Otherwise, iterate through all of the keys in the object.

                for (k in value) {
                    if (Object.hasOwnProperty.call(value, k)) {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            }

// Join all of the member texts together, separated with commas,
// and wrap them in braces.

            v = partial.length === 0 ? '{}' :
                gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' +
                        mind + '}' : '{' + partial.join(',') + '}';
            gap = mind;
            return v;
        }
    }

// If the JSON object does not yet have a stringify method, give it one.

    if (typeof JSON.stringify !== 'function') {
        JSON.stringify = function (value, replacer, space) {

// The stringify method takes a value and an optional replacer, and an optional
// space parameter, and returns a JSON text. The replacer can be a function
// that can replace values, or an array of strings that will select the keys.
// A default replacer method can be provided. Use of the space parameter can
// produce text that is more easily readable.

            var i;
            gap = '';
            indent = '';

// If the space parameter is a number, make an indent string containing that
// many spaces.

            if (typeof space === 'number') {
                for (i = 0; i < space; i += 1) {
                    indent += ' ';
                }

// If the space parameter is a string, it will be used as the indent string.

            } else if (typeof space === 'string') {
                indent = space;
            }

// If there is a replacer, it must be a function or an array.
// Otherwise, throw an error.

            rep = replacer;
            if (replacer && typeof replacer !== 'function' &&
                    (typeof replacer !== 'object' ||
                     typeof replacer.length !== 'number')) {
                throw new Error('JSON.stringify');
            }

// Make a fake root object containing our value under the key of ''.
// Return the result of stringifying the value.

            return str('', {'': value});
        };
    }


// If the JSON object does not yet have a parse method, give it one.

    if (typeof JSON.parse !== 'function') {
        JSON.parse = function (text, reviver) {

// The parse method takes a text and an optional reviver function, and returns
// a JavaScript value if the text is a valid JSON text.

            var j;

            function walk(holder, key) {

// The walk method is used to recursively walk the resulting structure so
// that modifications can be made.

                var k, v, value = holder[key];
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }


// Parsing happens in four stages. In the first stage, we replace certain
// Unicode characters with escape sequences. JavaScript handles many characters
// incorrectly, either silently deleting them, or treating them as line endings.

            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function (a) {
                    return '\\u' +
                        ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }

// In the second stage, we run the text against regular expressions that look
// for non-JSON patterns. We are especially concerned with '()' and 'new'
// because they can cause invocation, and '=' because it can cause mutation.
// But just to be safe, we want to reject all unexpected forms.

// We split the second stage into 4 regexp operations in order to work around
// crippling inefficiencies in IE's and Safari's regexp engines. First we
// replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
// replace all simple value tokens with ']' characters. Third, we delete all
// open brackets that follow a colon or comma or that begin the text. Finally,
// we look to see that the remaining characters are only whitespace or ']' or
// ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.

            if (/^[\],:{}\s]*$/.
test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@').
replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

// In the third stage we use the eval function to compile the text into a
// JavaScript structure. The '{' operator is subject to a syntactic ambiguity
// in JavaScript: it can begin a block or an object literal. We wrap the text
// in parens to eliminate the ambiguity.
                j = eval('(' + text + ')');
// In the optional fourth stage, we recursively walk the new structure, passing
// each name/value pair to a reviver function for possible transformation.
                return typeof reviver === 'function' ?
                    walk({'': j}, '') : j;
            }

// If the text is not JSON parseable, then a SyntaxError is thrown.

            throw new SyntaxError('JSON.parse');
        };
    }
}());


/**
 * ==================================================================
 * kingo全局类，封装了通用的页面处理相关方法，可直接用[类名.方法名()]调用
 * create date : 2012-03-19
 * created by  : qukj
 * copyright   : 湖南青果软件有限公司 
 * ==================================================================
 */

/**
 * 定义框架JS脚本的层次结构
 */
var kingo = 
	{
		bean : {}, // 常用bean的封装
		util : {}, // 通用工具类
		form: {},  // Form表单处理通用类
		table: {}, // 表格处理通用类
		ajax: {},  // Ajax方法调用通用类
		ui : {},   // 通用UI构建类
		print: {},  // 打印处理类
		message: {} // 消息提示通用类
	} ;

var KingoWeb = Kingoweb = kingotable = ktable = kingo.table;   // web页面样式相关方法的通用封装类

/**
 * 更改当前行的背景色

 * param- obj 当前选定对象(this:如tr,li等)
 */
kingo.table.changeSelectedRow = function(obj) {
	jQuery(obj).siblings().removeClass("kingo_selected_row");
	jQuery(obj).addClass("kingo_selected_row");	
}

/**
 * 数据列表显示区标题行固定 
 */
kingo.table.setRowFixed = function(RowIndex){
	var e = event.srcElement;
	if (e.tagName != 'DIV') return;
	var oTab = e.children(0);
	var iTop = e.scrollTop;
	var iBor = parseInt(oTab.border);
	if (typeof(RowIndex) != 'number' || RowIndex < 0) RowIndex = 0;
	oTab.rows(RowIndex).style.left	= -iBor;
	oTab.rows(RowIndex).style.top	= iTop-iBor;
}

/**
 * 依据表格行和单元格名称获取单元格中的值
 * @param tr - 表格行对象
 * @param tdName - 单元格名称
 * @return 单元格中的值 
 */
kingo.table.getValue4TD = function (tr, tdName) {
	var tds = tr.cells, value = '';
	for(var i = 0; i < tds.length; i++) {
		if(tds[i].getAttribute('name') == tdName) {
			value = Trim(tds[i].innerHTML);
			break;
		}
	}
	return value ;
}

/**
 * 定位到页面的第一个输入项
 */
kingo.table.onloadingFocus = function() {
	jQuery("input[type='text']:first").focus();
}

//========================================================================================//

var KingoUtil = Kingoutil = kingoutil = kutil = kingo.util ;  // 工具类, 取了四个别名

/**
 * 定位到Form表单的第一个可视的输入框
 * (window.onload事件中调用)
 */
kingo.util.focusOnFirst = function () {
    if (document.forms.length > 0) {
        for (var i=0; i < document.forms[0].elements.length; i++) {
            var oField = document.forms[0].elements[i];
            if (oField.type != "hidden" && oField.type != "button") {
                oField.focus();
                return;
            }
        }
    }
};

/**
 * 输入项绑定回车键转Tab键功能
 */
kingo.util.enter2tab = function(inputDiv) {
	jQuery("#" + inputDiv + " input[type!='hidden']").keydown(function(){
		Kingoutil.return2tab();
	})
	jQuery("#" + inputDiv + " select").keydown(function(){
		Kingoutil.return2tab();
	})
}

/**
 * 定位到第一个输入项
 */
kingo.util.toFirstItem = function(inputId) {	
	jQuery("#" + inputId).focus();	
}
	
/**
 * 回车键转化为TAB键(IE适用)
 */
kingo.util.return2tab = function() {
	if (window.event.keyCode == 13) {
		window.event.keyCode = 9;
	}
}

/**
 * 判断某个变量值是否为空值
 * 
 */
kingo.util.isNull = function(initValue){
	if (initValue == null || initValue.length == 0) {
		return true;
	} else {
		return false;
	}
}

/**
 * 将字符串转化为UTF8的字符编码 
 * （前端做2次转码，后端做1次转码）
 */
kingo.util.toUTF8 = function(initValue) {
	if (initValue == null || initValue.length == 0) {
		return initValue;
	} else {
		return encodeURIComponent(encodeURIComponent(initValue));
	}
}

/**
 * 获取半角字符串的长度
 * (ascii字符统计为一个字符；汉字统计为2个字符)  
 */
kingo.util.getLengthB = function(str){
	var lenb = str.replace(/[^\x00-\xff]/g,'xx').length;
	return lenb;
}

/**
 * 获取字符串的长度
 * (ascii字符和汉字都统计为一个字符)  
 */
kingo.util.getLength = function(str){
	var len = str.length;
	return len;
}

/**
 * 下拉列表框加载

 * 
 *   selectId-选择框ID, 不带#
 *   comboBoxName-下拉列表框名称
 *   paramValue-初始值,可以不传
 *   isYXB - 是否部门权限过滤,可以不传,缺省为0
 *   isCDDW- 是否承担单位权限过滤,可以不传,缺省为0
 */
kingo.util.loadDropLists = function(selectId, comboBoxName, paramValue, isYXB, isCDDW) {
	// 初始化参数值
	// undefined：表示一个对象没有被定义或者没有被初始化。null：表示一个尚未存在的对象的占位符。	
	if ((typeof paramValue == "undefined") || (paramValue == null)) {
		paramValue = "";
	}
	if ((typeof isYXB == "undefined") || (isYXB == null)) {
		isYXB = "0";
	}
	if ((typeof isCDDW == "undefined") || (isCDDW == null)) {
		isCDDW = "0";
	}
	//alert(">> selid/comboBoxName/paramValue/isYXB/isCDDW = " + selectId + "/" + comboBoxName + "/"+ paramValue + "/" + isYXB + "/" + isCDDW );
	var url = _webRootPath + "frame/droplist/getDropLists.action";
	var data = {
				"comboBoxName" : comboBoxName,
				"paramValue"   : paramValue,
				"isYXB"  : isYXB,
				"isCDDW" : isCDDW
			  };
	jQuery.ajax({
		type: "POST",
		url: url,
		data: data,
		dataType: "json",
		success: function(data) {
			//alert(">> data = " + data);
			var rows = data;
			var seloption = jQuery("#" + selectId);
			seloption.empty();
			// 加上空行
			seloption.append("<option value=''></option>");
			/**
			jQuery.each(rows, function(i) {
				var row = rows[i];
				var str = "<option value='" + row['code'] + "'>" + row['name'] + "</option>";
				seloption.append(str);
			});
			*/
			var str ;
			jQuery.each(rows, function(i) {
				var row = rows[i];
				str += "<option value='" + row['code'] + "'>" + row['name'] + "</option>";
			});			
			seloption.append(str);
		} 
	});
}

/**
 * 下拉列表框加载
 * 
 *   selectId-选择框ID, 不带#
 *   comboBoxName-下拉列表框名称
 *   paramValue-初始值,可以不传
 *   initValue-初始值,可以不传
 */
kingo.util.loadDropListsWithInitValue = function(selectId, comboBoxName, paramValue, initValue) {
	//alert(">> loadDropListsWithInitValue = " + selectId + ":" + comboBoxName + ":" + paramValue + ":" + initValue);
	var url = _webRootPath + "frame/droplist/getDropLists.action";
	var data = {
				"comboBoxName" : comboBoxName,
				"paramValue"   : paramValue
			  };
	jQuery.ajax({
		type: "POST",
		url: url,
		data: data,
		dataType: "json",
		success: function(data) {
			//alert(">> data = " + data);
			var rows = data;
			var seloption = jQuery("#" + selectId);
			seloption.empty();
			// 加上空行
			seloption.append("<option value=''></option>");
			/**
			jQuery.each(rows, function(i) {
				var row = rows[i];
				var code = row['code'];
				var name = row['name'];
				var str = "<option value='" + code + "'>" + name + "</option>";
				if (initValue != null && initValue.length > 0 && initValue == code) {
					str = "<option value='" + code + "' selected='selected'>" + name + "</option>";
				}
				seloption.append(str);
			});
			*/
			var str ;
			jQuery.each(rows, function(i) {
				var row = rows[i];
				var code = row['code'];
				var name = row['name'];
				if (initValue != null && initValue.length > 0 && initValue == code) {
					str += "<option value='" + code + "' selected='selected'>" + name + "</option>";
				} else {
					str += "<option value='" + code + "'>" + name + "</option>";
				}
			});			
			seloption.append(str);
		} 
	});
}

/**
 * 下拉列表框加载
 * 
 *   selectId-选择框
 *   code-列表项value赋值项
 *   name-列表项显示项的赋值项
 *   url-加载目录书数据的url, 调用传入:解决url的上下文路径问题
 *   initValue-初始值,可以不传
 */
kingo.util.loadSelects = function(selectId, code, name, url, initValue) {
	//alert(">> selid/url/initValue = " + selectId + "/" + url + "/" + initValue);
	jQuery.ajax({
		type: "POST",
		url: url,
		data: null,
		dataType: "json",
		success: function(data) {
			//alert(">> data = " + data);
			var rows = data;
			var seloption = jQuery(selectId);
			seloption.empty();
			// 加上空行:请选择   
			//seloption.append("<option value=''>--请选择--</option>");
			seloption.append("<option value=''></option>");
			jQuery.each(rows, function(i) {
				var row = rows[i];
				var str = "<option value='" + row[code] + "'>" + row[name] + "</option>";
				if (initValue != null && initValue.length > 0 && initValue == row[code]) {
					str = "<option value='" + row[code] + "' selected='selected'>" + row[name] + "</option>";
				}
				seloption.append(str);
			});
		} 
	});
}	

/**
 * 指定访问路径和访问参数的Ajax调用
 * 
 * @param url 	   访问路径
 * @param params   URL附带的参数，可以是值对，也可以是JSON串

 * @param callback 回调函数
 * @param async    是否异步(缺省为true)
 * 
 */
kingo.util.doAjax = function(url, params, callback, async) {
	var isAsync = true;
	if (async){ 
		isAsync = async;
	} else {
		isAsync = true;
	}
	jQuery.ajax({
		type: "POST",
		url: url,
		data: params, 
		dataType: "json",
		async: isAsync,
		success: callback
	})		
} 

/**
 * 调用URL得到jsp页面输出流程，并将输出流追加到指定的DIV区域
 * @param url Action或JSP访问路径
 * @param params URL附带的参数，可以是值对，也可以是JSON串

 * @param todiv DIV区域ID
 *  
 */
kingo.util.doAjaxLoading = function(url, params, todiv) {
	jQuery.ajax({
		type: "POST",
		url: url,
		data: params, 
		dataType: "text",
		beforeSend: function() { Kingoutil.loading(todiv); },	
		success: function(data) {
			// 清空当前div
			jQuery("#" + todiv).empty();
			// 追加输出结果			
			jQuery("#" + todiv).html(data);
		}
	})		
} 

/**
 * 数据加载提示 
 * @param todiv DIV区域ID
 * @return
 */
kingo.util.loading = function(todiv) {
	jQuery("#" + todiv).empty();	
	jQuery("#" + todiv).append("<p><center><table><tr valign='middle'><td><img src='" + _webRootPath + "custom/images/animatedEllipse.gif'></img></td><td style='font-size:20px;'>&nbsp;loading......</td></tr></table></center></P>");
}

/**
 * 将数值(或字符)转化为2位小数表示 toFixed() ;

 * @param x 转换前的数值

 * @return f_x 转换后的数值

 */
kingo.util.convertTo2Digital = function (x)
{
	var f_x = parseFloat(x);
	if (isNaN(f_x))
	{
		alert('不是有效的数值!');
		return false;
	}
	f_x = Math.round(f_x*100)/100;
	var s_x = f_x.toString();
	var pos_decimal = s_x.indexOf('.');
	if (pos_decimal < 0)
	{
		pos_decimal = s_x.length;
		s_x += '.';
	}
	while (s_x.length <= pos_decimal + 2)
	{
		s_x += '0';
	}
	return s_x;
}


//======================打印服务处理类==========================//
var KingoPrint = Kingoprint = kingoprint = kprint = kingo.print ;

var LODOP; //声明为全局变量, 标识引用Lodop打印控件 

function getLodop(oOBJECT,oEMBED){
	/**************************
	  本函数根据浏览器类型决定采用哪个对象作为控件实例：
	  IE系列、IE内核系列的浏览器采用oOBJECT，
	  其它浏览器(Firefox系列、Chrome系列、Opera系列、Safari系列等)采用oEMBED。
	**************************/
	var installFile = _webRootPath + "custom/lodop/install_lodop.exe";
    var strHtml1="<br><font color='#FF00FF' style='font-size: 12px; font-family: 宋体;'>打印控件未安装!点击这里<a href='" + installFile + "'>执行安装</a>,安装后请刷新页面或重新进入。</font>";
    var strHtml2="<br><font color='#FF00FF' style='font-size: 12px; font-family: 宋体;'>打印控件需要升级!点击这里<a href='" + installFile + "'>执行升级</a>,升级后请重新进入。</font>";
    var strHtml3="<br><br><font color='#FF00FF' style='font-size: 12px; font-family: 宋体;'>注意：<br>1：如曾安装过Lodop旧版附件npActiveXPLugin,请在【工具】->【附加组件】->【扩展】中先卸它;<br>2：如果浏览器表现出停滞不动等异常，建议关闭其“plugin-container”(网上搜关闭方法)功能;</font>";
    var LODOP=oEMBED;		
	try{		     
	     if (navigator.appVersion.indexOf("MSIE")>=0) LODOP=oOBJECT;

	     if ((LODOP==null)||(typeof(LODOP.VERSION)=="undefined")) {
		 if (navigator.userAgent.indexOf('Firefox')>=0)
  	         document.documentElement.innerHTML=strHtml3+document.documentElement.innerHTML;
		 if (navigator.appVersion.indexOf("MSIE")>=0) document.write(strHtml1); else
		 document.documentElement.innerHTML=strHtml1+document.documentElement.innerHTML;
		 return LODOP; 
	     } else if (LODOP.VERSION<"6.0.5.4") {
		 if (navigator.appVersion.indexOf("MSIE")>=0) document.write(strHtml2); else
		 document.documentElement.innerHTML=strHtml2+document.documentElement.innerHTML; 
		 return LODOP;
	     }
	     //*****如下空白位置适合调用统一功能:*********	     
	     //*******************************************
	     return LODOP; 
	}catch(err){
	     document.documentElement.innerHTML="Error:"+strHtml1+document.documentElement.innerHTML;
	     return LODOP; 
	}
}

/**
 * 调用lodop控件进行打印预览：
 * 
 * strURL- 打印输出页面的URL串 ,如 "xxcx_jsjsfxx_date.jsp?id="+$("menuId").value ;
 * strTaskName - 打印任务名，
    		字符型参数，由开发者自主设定，未限制长度，字符要求符合Windows文件起名规则，
    		Lodop会根据该名记忆相关的打印设置、打印维护信息。
    		若strTaskName空，控件则不保存本地化信息，打印全部由页面程序控制。
 * intOrient - 打印方向  1-纵向，2-横向, 缺省为1
 * strPageName - 纸张名称, 缺省为A4
*/
kingo.print.preview = function(strURL, strTaskName, intOrient, strPageName){
	// 初始化参数值
	// undefined：表示一个对象没有被定义或者没有被初始化。null：表示一个尚未存在的对象的占位符。	
	if ((typeof strTaskName == "undefined") || (strTaskName == null)) {
		strTaskName = "KINGOSOFT高校教务网络系统2012版报表打印";
	}
	if ((typeof intOrient == "undefined") || (intOrient == null)) {
		intOrient = 1;   // 缺省打印方向：1-纵向
	}
	if (intOrient == "P") { intOrient = 1; }
	if (intOrient == "L") { intOrient = 2; }
	
	if ((typeof strPageName == "undefined") || (strPageName == null)) {
		strPageName = "A4";  // 缺省纸张名称：A4
	}
	LODOP=getLodop(document.getElementById('LODOP_OB'),document.getElementById('LODOP_EM'));  
	// 打印初始化: 初始化运行环境，清理异常打印遗留的系统资源，设定打印任务名。
	LODOP.PRINT_INIT(strTaskName);
	// 设定纸张大小: SET_PRINT_PAGESIZE(intOrient, PageWidth,PageHeight,strPageName) 参考PrintSample5.html
	// 设定打印纸张为固定纸张或自适应内容高，并设定相关大小值或纸张名及打印方向。(intOrient: 1-纵向，2-横向，strPageName: A4纸张)
	LODOP.SET_PRINT_PAGESIZE(intOrient, 0, 0, strPageName); 
	//增加超文本打印项（URL模式）：ADD_PRINT_URL(Top,Left,Width,Height,strURL)
	LODOP.ADD_PRINT_URL(30,0,"100%","100%",strURL);
	// 横向打印的预览默认旋转90度（正向显示）
	LODOP.SET_SHOW_MODE("LANDSCAPE_DEFROTATED",1);
	// 隐藏打印预览背景进纸版的图案
	LODOP.SET_SHOW_MODE("HIDE_PAPER_BOARD",1);
	// 在距上边界 1050 象素，左 370，宽为200，高为22  这样一个区域内打印页码及总页数。
	//LODOP.ADD_PRINT_TEXT("193mm", "48mm", 200, 22, "第 # 页    共 & 页");
    //LODOP.SET_PRINT_STYLEA(2, "ItemType", 2);
    //LODOP.SET_PRINT_STYLEA(2, "HOrient", 1);	
	// 打印预览
	LODOP.PREVIEW();	
};	

/**
 * 调用lodop控件进行直接打印：
 * 
 * strURL- 打印输出页面的URL串 ,如 "xxcx_jsjsfxx_date.jsp?id="+$("menuId").value ;
 * strTaskName - 打印任务名，
    		字符型参数，由开发者自主设定，未限制长度，字符要求符合Windows文件起名规则，
    		Lodop会根据该名记忆相关的打印设置、打印维护信息。
    		若strTaskName空，控件则不保存本地化信息，打印全部由页面程序控制。
 * intOrient - 打印方向  1-纵向，2-横向, 缺省为1
 * strPageName - 纸张名称, 缺省为A4
*/
kingo.print.print = function(strURL, strTaskName, intOrient, strPageName){
	// 初始化参数值
	// undefined：表示一个对象没有被定义或者没有被初始化。null：表示一个尚未存在的对象的占位符。	
	if ((typeof strTaskName == "undefined") || (strTaskName == null)) {
		strTaskName = "KINGOSOFT高校教务网络系统2012版报表打印";
	}
	if ((typeof intOrient == "undefined") || (intOrient == null)) {
		intOrient = 1;   // 缺省打印方向：1-纵向
	}
	if (intOrient == "P") { intOrient = 1; }
	if (intOrient == "L") { intOrient = 2; }
	
	if ((typeof strPageName == "undefined") || (strPageName == null)) {
		strPageName = "A4";  // 缺省纸张名称：A4
	}
	LODOP=getLodop(document.getElementById('LODOP_OB'),document.getElementById('LODOP_EM'));  
	// 打印初始化: 初始化运行环境，清理异常打印遗留的系统资源，设定打印任务名。
	LODOP.PRINT_INIT(strTaskName);
	// 设定纸张大小: SET_PRINT_PAGESIZE(intOrient, PageWidth,PageHeight,strPageName) 
	// 设定打印纸张为固定纸张或自适应内容高，并设定相关大小值或纸张名及打印方向。(intOrient: 1-纵向，2-横向，strPageName: A4纸张)
	LODOP.SET_PRINT_PAGESIZE(intOrient, 0, 0, strPageName); 
	//增加超文本打印项（URL模式）：ADD_PRINT_URL(Top,Left,Width,Height,strURL)
	LODOP.ADD_PRINT_URL(30,0,"100%","100%",strURL);
	// 直接打印
	LODOP.PRINT();	
};
//======================打印服务处理类==========================//

//======================提示消息公用类==========================//
var kmessage = kmsg = kingo.message ;

// 显示提示消息3秒钟
kingo.message.showTip = function(message) {
	var $divTip = jQuery("#divTip") ;
	if ($divTip) {
		$divTip.html(message);
		setTimeout(function(){$divTip.html("");}, 3000);
	} else {
		alert(message);
	}
}
