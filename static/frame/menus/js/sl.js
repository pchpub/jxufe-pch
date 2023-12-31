var sl = window.sl = {

	/*
	** <summary>
    ** 添加事件监听
    ** </summary>
	** <param name="target">监听对象</param>
	** <param name="eventType">事件类型</param>
	** <param name="handler">处理函数</param>
	*/
	addEventHandler:function(target, eventType, handler){
		if (target.addEventListener)
		{
			target.addEventListener(eventType, handler, false);
		} 
		else if (target.attachEvent) 
		{
			target.attachEvent("on" + eventType, handler);
		} 
		else 
		{
			target["on" + eventType] = handler;
		}
	} ,

	/*
	** <summary>
	** 构建字符串对象
	** </summary>
	*/
	stringBuilder:function(){
		this.arr = [];
		
		/*添加字符项目*/
		this.push = function(item){
			this.arr.push(item);
		};

		/*清空字符串*/
		this.clear = function(){
			this.arr.length = 0;
		};
		
		/*返回结果字符串*/
		this.toString = function(){
			return this.arr.join("");
		};
	}
};


/*
** <summary>
** 获取对象
** </summary>
** <param name="selector">选择参数</param>
** <param name="parentNode">父节点</param>
*/
sl.getElement = function(selector ,parentNode){
	/*
	selector参数解释(均支持以,隔开的多重选择)
	#)前缀根据id返回对象
	=)根据属性返回对象
	 )无符号则根据tagName返回对象
	*/

	/*#)前缀根据id返回对象*/
	var execId = function(selector){
		var selector = selector.replace(/#| /g ,"");
		var arr = selector.split(",") ,rets = [] ,temp;

		for (var i=0;i<arr.length ;i++ )
		{
			temp = document.getElementById(arr[i]);
			if (temp)
			{
				rets.push(temp);
			}
		}

		return (rets.length > 1)? rets : rets[0];
	};

	/*=)根据属性返回对象*/
	var execAttribute = function(selector ,parentNode){
		var parentNode = parentNode? parentNode : document;
		var objects = parentNode.getElementsByTagName("*");
		var arr = selector.split("=") ,rets = [] ,temp;

		for (var i=0;i<objects.length ;i++ )
		{
			if (objects[i].getAttribute(arr[0]) == arr[1])
			{
				rets.push(objects[i]);
			}
		}

		return (rets.length > 1)? rets : rets[0];
	};
	
	/*无符号则根据tagName返回对象*/
	var execTagName = function(selector ,parentNode){
		var parentNode = parentNode? parentNode : document;
		return parentNode.getElementsByTagName(selector);
	};

	/*分流处理*/
	if (selector.indexOf("#") != -1)
	{
		return execId(selector ,parentNode);
	}
	else if (selector.indexOf("=") != -1)
	{
		return execAttribute(selector ,parentNode);	
	}
	else
	{
		return execTagName(selector ,parentNode);
	}
};

/*
** <summary>
** ajax应用
** </summary>
** <param name="url">资源地址</param>
** <param name="callback">回调方法</param>
** <param name="method">请求方式</param>
** <param name="data">所发送数据</param>
*/
sl.ajax = function(url ,callback ,method ,data){
	var method = method ? method : "get";
	var data = data ? data : null;
	var url = (method == "get") ? (url +"?"+ data) : url;
	var http = window.ActiveXObject? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();
	
	var doGet = function(){
		http.open(method ,url ,false);
		http.setRequestHeader("If-Modified-Since" , "0" );
		http.send(null);
		callback(http.responseText);
	};
	
	var doPost = function(){
		http.open(method ,url ,false);
		http.setRequestHeader("content-length" ,data ?data.length : 0);
		http.setRequestHeader("Content-Type" ,"application/x-www-form-urlencoded");
		http.send(data);
		callback(http.responseText);
	};
	
	if (method == "post")
	{
		doPost();
	}
	else
	{
		doGet();
	}
	http = null;
};

/*
** <summary>
** URl参数处理
** </summary>
** <param name="arg">参数</param>
*/
sl.request = function(arg){
	/*根据参数返回值*/
	var queryString = function(arg){
		var uri = window.location.search;
		var re = new RegExp(""+ arg +"\=([^\&\?]*)", "ig");
		return ((uri.match(re))?(uri.match(re)[0].substr(arg.length+1)):null);
	};

	/*不传参数返回全部参数*/
	var queryStrings = function(){
		var uri = window.location.search;
		var re = /\w*\=([^\&\?]*)/ig;
		var retval=[];
		while ((arr = re.exec(uri)) != null)
		retval.push(arr[0]);
		return retval;
	};

	/*分流处理*/
	if (arg)
	{
		return queryString(arg);
	}
	else
	{
		return queryStrings();
	}
};

/*
** <summary>
** Cookie处理
** </summary>
** <param name="name">cookie键名</param>
** <param name="value">cookie键值</param>
** <param name="option">可选参数</param>
*/
sl.cookie = {
	/*设置cookie*/
	setCookie:function(name, value, option){ 
		var str = name +"="+ escape(value); 
		if(option){ 
			if(option.expireHours){ 
				var d = new Date(); 
				d.setTime(d.getTime()+option.expireHours*3600*1000); 
				str += "; expires="+d.toGMTString(); 
			} 
			if(option.path) str += "; path="+option.path; 
			if(option.domain) str += "; domain="+option.domain; 
			if(option.secure) str += "; true"; 
		}
		document.cookie = str; 
	} ,

	/*获取cookie*/
	getCookie:function(name){ 
		var arr = document.cookie.split("; "); 
		if(arr.length == 0) return ""; 
		for(var i=0; i <arr.length; i++)
		{ 
			tmp = arr[i].split("="); 
			if(tmp[0] == name)
			{
				return unescape(tmp[1]); 
			}
		} 
		return "";
	} ,

	/*删除cookie*/
	delCookie:function(name){ 
		this.setCookie(name,"",{expireHours:-1});
	} ,

	/*获取cookie长度*/
	getLength:function(){
		return document.cookie.split("; ").length;
	}
};

/*
** <summary>
** 获取鼠标位置
** </summary>
** <param name="e">事件对象</param>
*/
sl.getMousePos = function (e){
	var e = e?e : event;
	if (e.pageX || e.pageY)
	{
		return { x: e.pageX, y: e.pageY };
	}
	else
	{
		return { x: e.clientX + document.documentElement.scrollLeft - document.body.clientLeft,
				 y: e.clientY + document.documentElement.scrollTop  - document.body.clientTop 
		};
	}
};

/*
** <summary>
** 获取对象位置
** </summary>
** <param name="element">对象</param>
*/
sl.getElementPos = function(element){
	var offsetTop = element.offsetTop;
	var offsetLeft = element.offsetLeft;

	while(element = element.offsetParent) 
	{
		offsetTop += element.offsetTop;
		offsetLeft += element.offsetLeft;
	}
	
	return {x:offsetLeft ,y:offsetTop};
};